import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getOrCreateUserId } from "@/lib/user";
import { EXAMS_BY_ID } from "@/content/exams";

export async function GET(req: Request) {
  const examId = new URL(req.url).searchParams.get("exam") ?? undefined;
  const userId = await getOrCreateUserId();
  const rows = await prisma.examResult.findMany({ where: { userId, ...(examId && { examId }) }, orderBy: { createdAt: "desc" } });
  // Keep only the latest attempt per task.
  const latest: Record<string, { score: number; total: number }> = {};
  for (const r of rows) if (!latest[r.taskId]) latest[r.taskId] = { score: r.score, total: r.total };
  return NextResponse.json({ results: latest });
}

const Body = z.object({
  examId: z.string(),
  section: z.string(),
  taskId: z.string(),
  score: z.number().int().min(0),
  total: z.number().int().min(1),
  mistakes: z.array(z.object({ prompt: z.string().max(400), given: z.string().max(200), expected: z.string().max(200), note: z.string().max(300).optional() })).max(10).optional(),
});

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success || !EXAMS_BY_ID[parsed.data.examId]) return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  const { examId, section, taskId, score, total, mistakes } = parsed.data;
  const userId = await getOrCreateUserId();
  await prisma.examResult.create({ data: { userId, examId, section, taskId, score, total } });
  if (mistakes?.length) {
    await prisma.mistake.createMany({ data: mistakes.map((m) => ({ ...m, userId, source: "exam", topic: `${examId}:${section}` })) });
  }
  return NextResponse.json({ ok: true });
}
