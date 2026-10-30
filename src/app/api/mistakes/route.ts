import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getOrCreateUserId } from "@/lib/user";

export async function GET() {
  const userId = await getOrCreateUserId();
  const mistakes = await prisma.mistake.findMany({ where: { userId, resolved: false }, orderBy: { createdAt: "desc" }, take: 60 });
  return NextResponse.json({ mistakes });
}

const Body = z.object({
  source: z.enum(["lesson", "exam", "speaking", "teacher", "vocab", "practice"]),
  topic: z.string().max(80),
  prompt: z.string().max(500),
  given: z.string().max(500),
  expected: z.string().max(500),
  note: z.string().max(500).optional(),
});

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  const userId = await getOrCreateUserId();
  // Do not store the same unresolved mistake twice.
  const existing = await prisma.mistake.findFirst({ where: { userId, resolved: false, prompt: parsed.data.prompt, expected: parsed.data.expected } });
  if (!existing) await prisma.mistake.create({ data: { ...parsed.data, userId } });
  return NextResponse.json({ ok: true });
}

const Patch = z.object({ id: z.string(), resolved: z.boolean() });
export async function PATCH(req: Request) {
  const parsed = Patch.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  const userId = await getOrCreateUserId();
  await prisma.mistake.updateMany({ where: { id: parsed.data.id, userId }, data: { resolved: parsed.data.resolved } });
  return NextResponse.json({ ok: true });
}
