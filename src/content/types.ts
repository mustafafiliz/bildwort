export type Level = "A1" | "A2.1" | "A2.2" | "B1";
export const LEVELS: Level[] = ["A1", "A2.1", "A2.2", "B1"];

export type Article = "der" | "die" | "das";

/**
 * Marked German text. Inline tokens like [akk:einen Apfel] are coloured by role.
 * Roles: nom, akk, dat, verb, der, die, das, pl, prep, conj, end (verb at the end), gap, mark.
 * "___" renders as a blank to fill.
 */
export type Marked = string;

export type Word = {
  id: string;
  de: string;
  article: Article | null;
  plural: string | null; // without article, null = no common plural
  tr: string;
  example: string;
  exampleTr: string;
  memory: string; // Turkish memory hook
  topic: TopicId;
  level: "A1" | "A2";
  art: string; // illustration id
};

export type TopicId = "essen" | "zuhause" | "stadt" | "menschen" | "arbeit" | "natur";

export type Exercise =
  | { kind: "choice"; q: Marked; tr?: string; options: string[]; answer: number; why: string }
  | { kind: "article"; word: string; art?: string; answer: Article; why: string }
  | { kind: "order"; words: string[]; tr: string; why: string; fixedFirst?: boolean }
  | { kind: "type"; q: Marked; tr?: string; answers: string[]; why: string; hint?: string };

export type VisualId =
  | "article-trio"
  | "conjugation"
  | "verb-position"
  | "eat-scene"
  | "akk-transform"
  | "kein-nicht"
  | "plural"
  | "give-scene"
  | "dat-table"
  | "room"
  | "wo-wohin"
  | "perfekt-timeline"
  | "perfekt-bracket"
  | "weil-merge"
  | "comparison"
  | "reflexive"
  | "relative"
  | "passive"
  | "wish";

export type Lesson = {
  slug: string;
  level: Level;
  title: string; // German, short
  titleTr: string; // Turkish
  goalTr: string; // one-line learning objective (Turkish)
  topic: string; // used for mistakes + AI teacher context
  intro: { visual: VisualId; sentence: Marked; tr: string; caption: string };
  explain: { visual?: VisualId; points: string[]; rule?: Marked };
  examples: { de: Marked; tr: string; note?: string }[];
  vocab: string[]; // word ids
  practice: Exercise[];
  test: Exercise[];
};
