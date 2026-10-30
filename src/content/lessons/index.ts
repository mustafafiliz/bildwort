import type { Lesson, Level } from "../types";
import { A1 } from "./a1";
import { A2_1, A2_2 } from "./a2";
import { B1 } from "./b1";

export const LESSONS: Lesson[] = [...A1, ...A2_1, ...A2_2, ...B1];
export const LESSONS_BY_SLUG: Record<string, Lesson> = Object.fromEntries(LESSONS.map((l) => [l.slug, l]));

export const LEVEL_INFO: Record<Level, { tr: string }> = {
  A1: { tr: "Başlangıç" },
  "A2.1": { tr: "Temel – 1. kısım" },
  "A2.2": { tr: "Temel – 2. kısım" },
  B1: { tr: "Orta" },
};

export function lessonsFor(level: Level) {
  return LESSONS.filter((l) => l.level === level);
}
