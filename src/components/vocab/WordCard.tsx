"use client";
import { useState } from "react";
import clsx from "clsx";
import type { Word } from "@/content/types";
import { ObjectArt } from "@/components/illustrations/objects";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { ARTICLE_BG, ARTICLE_TEXT } from "@/components/lesson/Marked";
import { withArticle } from "@/content/vocabulary";

/** The full "Der Apfel" view: big picture, coloured article, plural, Turkish on demand, example and memory hook. */
export function WordCard({ word, revealed: revealedProp }: { word: Word; revealed?: boolean }) {
  const [revealed, setRevealed] = useState(revealedProp ?? false);
  const a = word.article ?? "der";
  return (
    <article className="mx-auto w-full max-w-xl text-center">
      <div className={clsx("rounded-[32px] px-6 pb-6 pt-4", word.article ? ARTICLE_BG[a] : "bg-surface")}>
        <ObjectArt id={word.art} className="anim-float mx-auto w-52 sm:w-64" title={word.de} />
        <div className="flex items-center justify-center gap-3">
          <h2 className="de text-5xl sm:text-6xl" lang="de">
            {word.article && <span className={clsx("font-bold", ARTICLE_TEXT[a])}>{word.article} </span>}
            {word.de}
          </h2>
          <SpeakButton text={withArticle(word)} size="lg" />
        </div>
        <p className="mt-2 text-ink-soft">
          {word.plural ? (
            <>
              Çoğul: <span className="de text-lg" lang="de"><b className="text-pl">die</b> {word.plural}</span>
            </>
          ) : (
            "Genelde çoğulu kullanılmaz"
          )}
        </p>
      </div>

      <div className="mt-5">
        {revealed ? (
          <p className="anim-rise text-3xl font-bold">{word.tr}</p>
        ) : (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="rounded-full border-2 border-dashed border-ink-faint px-6 py-3 text-lg text-ink-soft hover:border-ink hover:text-ink"
          >
            Önce tahmin et, sonra Türkçesini göster
          </button>
        )}
      </div>

      <div className="mt-6 flex items-start justify-center gap-3 text-left">
        <div>
          <p className="de text-2xl" lang="de">{word.example}</p>
          {revealed && <p className="text-ink-soft">{word.exampleTr}</p>}
        </div>
        <SpeakButton text={word.example} size="sm" className="mt-1" />
      </div>

      <p className="mx-auto mt-6 flex max-w-md items-start gap-2 rounded-2xl bg-surface p-4 text-left text-[0.98rem]">
        <svg width="22" height="22" viewBox="0 0 24 24" className="mt-0.5 shrink-0" aria-hidden>
          <path d="M12 3a6 6 0 00-3.5 10.9V17h7v-3.1A6 6 0 0012 3zM9.5 20h5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span>
          <span className="sr-only">Hafıza ipucu: </span>
          {word.memory}
        </span>
      </p>
    </article>
  );
}

/** Small tile for grids. Tapping shows the Turkish meaning. */
export function WordTile({ word, onOpen }: { word: Word; onOpen?: () => void }) {
  const [flipped, setFlipped] = useState(false);
  const a = word.article ?? "der";
  return (
    <div className={clsx("relative flex flex-col items-center rounded-[24px] p-3 text-center", word.article ? ARTICLE_BG[a] : "bg-surface")}>
      <button type="button" onClick={() => (onOpen ? onOpen() : setFlipped((f) => !f))} className="flex w-full flex-col items-center" aria-label={`${withArticle(word)}${onOpen ? " — aç" : " — Türkçesini göster"}`}>
        <ObjectArt id={word.art} className="w-24 sm:w-28" />
        <p className="de text-xl" lang="de">
          {word.article && <b className={ARTICLE_TEXT[a]}>{word.article} </b>}
          {word.de}
        </p>
        <p className={clsx("text-sm", flipped || onOpen ? "text-ink-soft" : "text-transparent select-none")}>{word.tr}</p>
      </button>
      <SpeakButton text={withArticle(word)} size="sm" className="absolute right-2 top-2" />
    </div>
  );
}
