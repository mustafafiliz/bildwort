"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LessonState = { step: number; completed: boolean; score: number; total: number };

type ProgressStore = {
  lessons: Record<string, LessonState>;
  loaded: boolean;
  hydrate: (rows: ({ lessonSlug: string } & LessonState)[]) => void;
  setStep: (slug: string, step: number) => void;
  complete: (slug: string, score: number, total: number) => void;
};

async function post(url: string, body: unknown) {
  try {
    await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  } catch {
    // Offline: the local copy in localStorage keeps the progress until the next sync.
  }
}

export const useProgress = create<ProgressStore>()(
  persist(
    (set, get) => ({
      lessons: {},
      loaded: false,
      hydrate: (rows) =>
        set((s) => {
          const lessons = { ...s.lessons };
          for (const r of rows) {
            const local = lessons[r.lessonSlug];
            lessons[r.lessonSlug] = {
              step: Math.max(local?.step ?? 0, r.step),
              completed: (local?.completed ?? false) || r.completed,
              score: r.completed ? r.score : local?.score ?? 0,
              total: r.completed ? r.total : local?.total ?? 0,
            };
          }
          return { lessons, loaded: true };
        }),
      setStep: (slug, step) => {
        const cur = get().lessons[slug] ?? { step: 0, completed: false, score: 0, total: 0 };
        set({ lessons: { ...get().lessons, [slug]: { ...cur, step } } });
        void post("/api/progress", { slug, step });
      },
      complete: (slug, score, total) => {
        set({ lessons: { ...get().lessons, [slug]: { step: 0, completed: true, score, total } } });
        void post("/api/progress", { slug, completed: true, score, total, step: 0 });
      },
    }),
    { name: "dp-progress", partialize: (s) => ({ lessons: s.lessons }) },
  ),
);

/** UI preferences that live only on this device. */
type Prefs = { showTranslations: boolean; toggleTranslations: () => void };
export const usePrefs = create<Prefs>()(
  persist(
    (set) => ({ showTranslations: true, toggleTranslations: () => set((s) => ({ showTranslations: !s.showTranslations })) }),
    { name: "dp-prefs" },
  ),
);

export async function recordMistake(m: { source: string; topic: string; prompt: string; given: string; expected: string; note?: string }) {
  await post("/api/mistakes", m);
}
