"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { WORDS_BY_ID, withArticle } from "@/content/vocabulary";
import { ObjectArt } from "@/components/illustrations/objects";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { ARTICLE_BG, ARTICLE_TEXT } from "@/components/lesson/Marked";
import { speak } from "@/lib/speech";

type Card = { wordId: string; direction: "de-tr" | "tr-de"; isNew: boolean };
type Grade = 0 | 3 | 4 | 5;

const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

export function ReviewSession() {
  const topic = useSearchParams().get("topic");
  const [queue, setQueue] = useState<Card[] | null>(null);
  const [i, setI] = useState(0);
  const [done, setDone] = useState({ right: 0, total: 0 });

  useEffect(() => {
    fetch(`/api/cards${topic ? `?topic=${topic}` : ""}`)
      .then((r) => r.json())
      .then((d) => setQueue(d.queue))
      .catch(() => setQueue([]));
  }, [topic]);

  const grade = (card: Card, g: Grade, given?: string) => {
    void fetch("/api/cards/review", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ wordId: card.wordId, direction: card.direction, grade: g, given }),
    });
    setDone((d) => ({ right: d.right + (g >= 3 ? 1 : 0), total: d.total + 1 }));
    // A forgotten card comes back at the end of this session.
    if (g === 0 && queue) setQueue([...queue, { ...card, isNew: false }]);
    setI((x) => x + 1);
  };

  if (!queue) return <p className="py-20 text-center text-ink-soft">Kartlar hazırlanıyor…</p>;
  if (i >= queue.length)
    return (
      <div className="mx-auto max-w-md py-10 text-center">
        <ObjectArt id="sonne" className="mx-auto w-40" />
        <h1 className="mt-4 text-3xl font-bold">{queue.length === 0 ? "Şimdilik tekrar yok" : "Bugünlük bitti!"}</h1>
        {done.total > 0 && <p className="mt-2 text-lg">{done.right} / {done.total} kart doğru.</p>}
        <p className="mt-2 text-ink-soft">Kartlar, unutmaya başladığın anda geri gelir. Yarın tekrar uğra.</p>
        <Link href="/vocabulary" className="mt-8 inline-block rounded-full bg-ink px-10 py-3.5 font-bold text-paper">Kelimelere dön</Link>
      </div>
    );

  const card = queue[i];
  return (
    <div className="mx-auto max-w-xl">
      <div className="flex items-center gap-3">
        <Link href="/vocabulary" aria-label="Tekrardan çık" className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft hover:bg-surface">
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </Link>
        <div className="h-2 flex-1 rounded-full bg-line" role="progressbar" aria-valuenow={i} aria-valuemax={queue.length}>
          <div className="h-2 rounded-full bg-ink transition-all" style={{ width: `${(i / queue.length) * 100}%` }} />
        </div>
        <span className="text-sm text-ink-soft">{i + 1}/{queue.length}</span>
      </div>
      {card.direction === "de-tr" ? <Recall key={`${i}`} card={card} onGrade={(g) => grade(card, g)} /> : <Produce key={`${i}`} card={card} onGrade={(g, given) => grade(card, g, given)} />}
    </div>
  );
}

/** German → Turkish: look at the picture and the word, recall the meaning. */
function Recall({ card, onGrade }: { card: Card; onGrade: (g: Grade) => void }) {
  const w = WORDS_BY_ID[card.wordId];
  const [shown, setShown] = useState(false);
  const a = w.article ?? "der";
  useEffect(() => {
    speak(withArticle(w));
  }, [w]);
  return (
    <div className="mt-6 text-center">
      <p className="text-sm font-bold text-ink-soft">{card.isNew ? "Yeni kelime" : "Almanca → Türkçe"}</p>
      <div className={clsx("mt-3 rounded-[32px] px-6 pb-6 pt-3", w.article ? ARTICLE_BG[a] : "bg-surface")}>
        <ObjectArt id={w.art} className="mx-auto w-48 sm:w-56" title={w.de} />
        <div className="flex items-center justify-center gap-3">
          <p className="de text-5xl" lang="de">
            {w.article && <b className={ARTICLE_TEXT[a]}>{w.article} </b>}
            {w.de}
          </p>
          <SpeakButton text={withArticle(w)} />
        </div>
        {w.plural && <p className="mt-1 text-ink-soft">Çoğul: <span className="de" lang="de"><b className="text-pl">die</b> {w.plural}</span></p>}
      </div>
      {!shown ? (
        <button type="button" onClick={() => setShown(true)} className="mt-8 w-full rounded-full bg-ink py-4 text-lg font-bold text-paper sm:w-auto sm:px-16">
          Anlamını göster
        </button>
      ) : (
        <div className="anim-rise mt-6">
          <p className="text-3xl font-bold">{w.tr}</p>
          <p className="de mt-2 text-lg" lang="de">{w.example}</p>
          <p className="text-ink-soft">{w.exampleTr}</p>
          <p className="mx-auto mt-3 max-w-sm text-sm text-ink-soft">{w.memory}</p>
          <p className="mt-6 text-sm font-bold text-ink-soft">Ne kadar iyi biliyordun?</p>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {([
              [0, "Bilmedim", "border-bad text-bad"],
              [3, "Zor", "border-akk text-[#9a4f06]"],
              [4, "Bildim", "border-ok text-ok"],
              [5, "Çok kolay", "border-der text-der"],
            ] as [Grade, string, string][]).map(([g, label, cls]) => (
              <button key={g} type="button" onClick={() => onGrade(g)} className={clsx("rounded-2xl border-2 bg-white py-3 font-bold", cls)}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** Turkish → German: write the word with its article. */
function Produce({ card, onGrade }: { card: Card; onGrade: (g: Grade, given: string) => void }) {
  const w = WORDS_BY_ID[card.wordId];
  const [value, setValue] = useState("");
  const [result, setResult] = useState<null | { grade: Grade; msg: string }>(null);
  const input = useRef<HTMLInputElement>(null);
  const a = w.article ?? "der";

  const check = () => {
    const v = norm(value);
    const target = norm(withArticle(w));
    const parts = v.split(" ");
    const noun = norm(w.de);
    let res: { grade: Grade; msg: string };
    if (v === target) res = { grade: 4, msg: "Doğru!" };
    else if (parts[parts.length - 1] === noun && w.article && parts[0] !== w.article) res = { grade: 3, msg: `Kelime doğru, artikel yanlış: ${w.article}` };
    else if (!w.article && v === noun) res = { grade: 4, msg: "Doğru!" };
    else if (parts[parts.length - 1] === noun) res = { grade: 3, msg: `Artikeli de yaz: ${withArticle(w)}` };
    else res = { grade: 0, msg: `Doğrusu: ${withArticle(w)}` };
    setResult(res);
    speak(withArticle(w));
  };

  return (
    <div className="mt-6 text-center">
      <p className="text-sm font-bold text-ink-soft">Türkçe → Almanca · artikeliyle yaz</p>
      <p className="mt-8 text-5xl font-bold">{w.tr}</p>
      <input
        ref={input}
        autoFocus
        value={value}
        disabled={!!result}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && (result ? onGrade(result.grade, value) : value.trim() && check())}
        placeholder="der / die / das …"
        aria-label="Almancasını artikeliyle yaz"
        autoCapitalize="off"
        autoComplete="off"
        spellCheck={false}
        className="de mt-8 w-full rounded-2xl border-2 border-line bg-white px-4 py-4 text-center text-3xl outline-none focus:border-der"
      />
      {!result && (
        <div className="mt-3 flex justify-center gap-2">
          {["ä", "ö", "ü", "ß"].map((c) => (
            <button key={c} type="button" onClick={() => { setValue((v) => v + c); input.current?.focus(); }} className="de h-11 w-11 rounded-xl border border-line bg-white text-xl">{c}</button>
          ))}
        </div>
      )}
      {!result ? (
        <button type="button" disabled={!value.trim()} onClick={check} className="mt-6 w-full rounded-full bg-ink py-4 text-lg font-bold text-paper disabled:opacity-30 sm:w-auto sm:px-16">
          Kontrol et
        </button>
      ) : (
        <div className={clsx("anim-rise mt-6 rounded-3xl p-5", result.grade >= 4 ? "bg-ok-soft" : result.grade === 3 ? "bg-akk-soft" : "bg-bad-soft")}>
          <ObjectArt id={w.art} className="mx-auto w-28" />
          <p className="de text-3xl" lang="de">{w.article && <b className={ARTICLE_TEXT[a]}>{w.article} </b>}{w.de}</p>
          <p className="mt-1 font-bold">{result.msg}</p>
          <button type="button" autoFocus onClick={() => onGrade(result.grade, value)} className="mt-4 rounded-full bg-ink px-10 py-3 font-bold text-paper">
            Devam
          </button>
        </div>
      )}
    </div>
  );
}
