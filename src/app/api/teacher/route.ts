import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getOrCreateUserId } from "@/lib/user";
import { getClaude, MODEL, NO_KEY_MESSAGE, TEACHER_SYSTEM } from "@/lib/ai";

export async function GET() {
  const userId = await getOrCreateUserId();
  const messages = await prisma.teacherMessage.findMany({ where: { userId }, orderBy: { createdAt: "asc" }, take: 60, select: { id: true, role: true, content: true } });
  return NextResponse.json({ messages, enabled: Boolean(getClaude()) });
}

export async function DELETE() {
  const userId = await getOrCreateUserId();
  await prisma.teacherMessage.deleteMany({ where: { userId } });
  return NextResponse.json({ ok: true });
}

const Body = z.object({ message: z.string().min(1).max(2000), context: z.string().max(400).optional() });

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  const claude = getClaude();
  if (!claude) return NextResponse.json({ error: NO_KEY_MESSAGE }, { status: 503 });

  const userId = await getOrCreateUserId();
  const [history, mistakes, progress] = await Promise.all([
    prisma.teacherMessage.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 16 }),
    prisma.mistake.findMany({ where: { userId, resolved: false }, orderBy: { createdAt: "desc" }, take: 12 }),
    prisma.lessonProgress.findMany({ where: { userId, completed: true }, select: { lessonSlug: true } }),
  ]);

  const memory =
    mistakes.length > 0
      ? `\nÖĞRENCİNİN SON HATALARI (konu | soru | verdiği | doğrusu):\n${mistakes.map((m) => `- ${m.topic} | ${m.prompt} | ${m.given} | ${m.expected}`).join("\n")}`
      : "\nÖğrencinin kayıtlı hatası yok.";
  const done = progress.length ? `\nTamamlanan dersler: ${progress.map((p) => p.lessonSlug).join(", ")}` : "";
  const ctx = parsed.data.context ? `\nŞu an üzerinde çalıştığı konu: ${parsed.data.context}` : "";

  const messages = [
    ...history.reverse().map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
    { role: "user" as const, content: parsed.data.message },
  ];
  // The API needs alternating roles starting with "user".
  while (messages.length && messages[0].role !== "user") messages.shift();

  await prisma.teacherMessage.create({ data: { userId, role: "user", content: parsed.data.message } });

  const stream = await claude.messages.create({
    model: MODEL,
    max_tokens: 700,
    system: TEACHER_SYSTEM + memory + done + ctx,
    messages,
    stream: true,
  });

  const encoder = new TextEncoder();
  let full = "";
  const body = new ReadableStream({
    async start(controller) {
      try {
        for await (const ev of stream) {
          if (ev.type === "content_block_delta" && ev.delta.type === "text_delta") {
            full += ev.delta.text;
            controller.enqueue(encoder.encode(ev.delta.text));
          }
        }
        if (full.trim()) await prisma.teacherMessage.create({ data: { userId, role: "assistant", content: full } });
      } catch {
        controller.enqueue(encoder.encode("\n\nBağlantı kesildi. Lütfen tekrar dene."));
      } finally {
        controller.close();
      }
    },
  });
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" } });
}
