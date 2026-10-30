"use client";
import { useState } from "react";
import Link from "next/link";
import type { Word } from "@/content/types";
import { WordCard, WordTile } from "./WordCard";

export function TopicBrowser({ words, topic }: { words: Word[]; topic: string }) {
  const [open, setOpen] = useState<number | null>(null);
  if (open !== null) {
    const w = words[open];
    return (
      <div className="mt-6">
        <WordCard key={w.id} word={w} />
        <div className="mt-8 flex items-center justify-center gap-3">
          <button type="button" onClick={() => setOpen(null)} className="rounded-full border-2 border-line px-6 py-3 font-bold">Tümü</button>
          <button
            type="button"
            onClick={() => setOpen((open + 1) % words.length)}
            className="rounded-full bg-ink px-10 py-3.5 font-bold text-paper"
          >
            Sonraki kelime
          </button>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {words.map((w, i) => (
          <WordTile key={w.id} word={w} onOpen={() => setOpen(i)} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href={`/vocabulary/review?topic=${topic}`} className="inline-block rounded-full bg-ink px-10 py-3.5 font-bold text-paper">
          Bu konuyu kartlarla çalış
        </Link>
      </div>
    </>
  );
}
