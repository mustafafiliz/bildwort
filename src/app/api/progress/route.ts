import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getOrCreateUserId } from "@/lib/user";
import { LESSONS_BY_SLUG } from "@/content/lessons";

export async function GET() {
  const userId = await getOrCreateUserId();
  const rows = await prisma.lessonProgress.findMany({ where: { userId } });
  return NextResponse.json({ lessons: rows.map(({ lessonSlug, step, completed, score, total }) => ({ lessonSlug, step, completed, score, total })) });
}

const Body = z.object({
  slug: z.string(),
  step: z.number().int().min(0).max(20).optional(),
  completed: z.boolean().optional(),
  score: z.number().int().min(0).optional(),
  total: z.number().int().min(0).optional(),
});

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success || !LESSONS_BY_SLUG[parsed.data.slug]) return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  const { slug, step, completed, score, total } = parsed.data;
  const userId = await getOrCreateUserId();
  const data = {
    ...(step !== undefined && { step }),
    ...(completed !== undefined && { completed }),
    ...(score !== undefined && { score }),
    ...(total !== undefined && { total }),
  };
  await prisma.lessonProgress.upsert({
    where: { userId_lessonSlug: { userId, lessonSlug: slug } },
    create: { userId, lessonSlug: slug, step: step ?? 0, completed: completed ?? false, score: score ?? 0, total: total ?? 0 },
    // A finished lesson stays finished when it is reopened.
    update: completed === undefined ? { step: data.step } : data,
  });
  return NextResponse.json({ ok: true });
}
