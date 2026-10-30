/** SM-2 spaced repetition. grade: 0 = forgot, 3 = hard, 4 = good, 5 = easy. */
export type SrsState = { ease: number; interval: number; reps: number; lapses: number };

export function review(state: SrsState, grade: 0 | 3 | 4 | 5, now = new Date()): SrsState & { due: Date } {
  let { ease, interval, reps, lapses } = state;
  if (grade < 3) {
    reps = 0;
    lapses += 1;
    interval = 0; // see it again in this session / in 10 minutes
  } else {
    reps += 1;
    interval = reps === 1 ? 1 : reps === 2 ? (grade === 5 ? 4 : 3) : Math.round(interval * ease * (grade === 3 ? 0.8 : grade === 5 ? 1.3 : 1));
  }
  ease = Math.max(1.3, ease + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)));
  const due = new Date(now.getTime() + (interval === 0 ? 10 * 60 * 1000 : interval * 24 * 60 * 60 * 1000));
  return { ease, interval, reps, lapses, due };
}
