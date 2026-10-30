import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOrCreateUserId } from "@/lib/user";
import { WORDS } from "@/content/vocabulary";

const NEW_PER_SESSION = 8;

/** Returns the review queue: due cards first, then a few new words. */
export async function GET(req: Request) {
  const topic = new URL(req.url).searchParams.get("topic");
  const userId = await getOrCreateUserId();
  const states = await prisma.cardState.findMany({ where: { userId } });
  const now = new Date();
  const byKey = new Map(states.map((s) => [`${s.wordId}:${s.direction}`, s]));
  const pool = topic ? WORDS.filter((w) => w.topic === topic) : WORDS;

  const due = states
    .filter((s) => s.due <= now && pool.some((w) => w.id === s.wordId))
    .sort((a, b) => a.due.getTime() - b.due.getTime())
    .map((s) => ({ wordId: s.wordId, direction: s.direction, isNew: false }));

  // Turkish → German unlocks once the German → Turkish card was answered correctly once.
  const unlocked = pool
    .filter((w) => (byKey.get(`${w.id}:de-tr`)?.reps ?? 0) >= 1 && !byKey.has(`${w.id}:tr-de`))
    .map((w) => ({ wordId: w.id, direction: "tr-de", isNew: true }));

  const fresh = pool
    .filter((w) => !byKey.has(`${w.id}:de-tr`))
    .slice(0, NEW_PER_SESSION)
    .map((w) => ({ wordId: w.id, direction: "de-tr", isNew: true }));

  const queue = [...due, ...unlocked.slice(0, 6), ...fresh];
  const learned = states.filter((s) => s.direction === "de-tr" && s.reps >= 1).length;
  const dueCount = due.length;
  return NextResponse.json({ queue, learned, dueCount, total: WORDS.length });
}
