import "server-only";
import { prisma } from "./db";
import { getUserId } from "./user";
import { LESSONS } from "@/content/lessons";

/** Server-side progress lookup for pages (read-only, never creates a learner). */
export async function getServerProgress() {
  const userId = await getUserId();
  if (!userId) return { rows: [] as { lessonSlug: string; step: number; completed: boolean }[] };
  try {
    const rows = await prisma.lessonProgress.findMany({ where: { userId }, select: { lessonSlug: true, step: true, completed: true, updatedAt: true }, orderBy: { updatedAt: "desc" } });
    return { rows };
  } catch {
    return { rows: [] };
  }
}

export function currentLesson(rows: { lessonSlug: string; step: number; completed: boolean }[]) {
  const done = new Set(rows.filter((r) => r.completed).map((r) => r.lessonSlug));
  // A started but unfinished lesson wins; otherwise the first lesson not yet finished.
  const started = rows.find((r) => !r.completed && r.step > 0);
  const lesson = (started && LESSONS.find((l) => l.slug === started.lessonSlug)) || LESSONS.find((l) => !done.has(l.slug)) || LESSONS[0];
  return { lesson, done, resumeStep: started && started.lessonSlug === lesson.slug ? started.step : 0 };
}
