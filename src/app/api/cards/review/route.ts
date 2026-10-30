import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getOrCreateUserId } from "@/lib/user";
import { review } from "@/lib/srs";
import { WORDS_BY_ID, withArticle } from "@/content/vocabulary";

const Body = z.object({
  wordId: z.string(),
  direction: z.enum(["de-tr", "tr-de"]),
  grade: z.union([z.literal(0), z.literal(3), z.literal(4), z.literal(5)]),
  given: z.string().max(100).optional(),
});

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success || !WORDS_BY_ID[parsed.data.wordId]) return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  const { wordId, direction, grade, given } = parsed.data;
  const userId = await getOrCreateUserId();
  const key = { userId_wordId_direction: { userId, wordId, direction } };
  const cur = (await prisma.cardState.findUnique({ where: key })) ?? { ease: 2.5, interval: 0, reps: 0, lapses: 0 };
  const next = review(cur, grade);
  await prisma.cardState.upsert({ where: key, create: { userId, wordId, direction, ...next }, update: next });
  if (grade === 0) {
    const w = WORDS_BY_ID[wordId];
    await prisma.mistake.create({
      data: {
        userId,
        source: "vocab",
        topic: `kelime:${w.topic}`,
        prompt: direction === "de-tr" ? withArticle(w) : w.tr,
        given: given ?? "(bilinmedi)",
        expected: direction === "de-tr" ? w.tr : withArticle(w),
      },
    });
  }
  return NextResponse.json({ ok: true, due: next.due });
}
