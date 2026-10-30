"use client";
import type { VisualId } from "@/content/types";
import { Room } from "./Room";
import {
  ArticleTrio,
  ComparisonVisual,
  EatScene,
  GiveScene,
  KeinNicht,
  PassiveVisual,
  PluralVisual,
  ReflexiveVisual,
  RelativeVisual,
  WishVisual,
} from "./scenes";
import { AkkTransform, Conjugation, DatTable, PerfektBracket, PerfektTimeline, VerbPosition, WeilMerge, WoWohin } from "./diagrams";

const REGISTRY: Record<VisualId, React.ComponentType> = {
  "article-trio": ArticleTrio,
  conjugation: Conjugation,
  "verb-position": VerbPosition,
  "eat-scene": EatScene,
  "akk-transform": AkkTransform,
  "kein-nicht": KeinNicht,
  plural: PluralVisual,
  "give-scene": GiveScene,
  "dat-table": DatTable,
  room: Room,
  "wo-wohin": WoWohin,
  "perfekt-timeline": PerfektTimeline,
  "perfekt-bracket": PerfektBracket,
  "weil-merge": WeilMerge,
  comparison: ComparisonVisual,
  reflexive: ReflexiveVisual,
  relative: RelativeVisual,
  passive: PassiveVisual,
  wish: WishVisual,
};

export function Visual({ id }: { id: VisualId }) {
  const C = REGISTRY[id];
  return <C />;
}
