"use client";
import { useState } from "react";
import clsx from "clsx";
import { INK } from "@/components/illustrations/objects";
import { Marked, plain } from "@/components/lesson/Marked";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Prep = "in" | "auf" | "unter" | "neben" | "vor" | "hinter" | "zwischen";
type Mode = "wo" | "wohin";

const PREPS: { id: Prep; tr: string }[] = [
  { id: "in", tr: "içinde" },
  { id: "auf", tr: "üstünde" },
  { id: "unter", tr: "altında" },
  { id: "neben", tr: "yanında" },
  { id: "vor", tr: "önünde" },
  { id: "hinter", tr: "arkasında" },
  { id: "zwischen", tr: "arasında" },
];

const SENTENCES: Record<Prep, Record<Mode, { de: string; tr: string }>> = {
  in: {
    wo: { de: "Die Katze ist [dat:im Karton].", tr: "Kedi kutunun içinde. (im = in dem)" },
    wohin: { de: "Die Katze springt [akk:in den Karton].", tr: "Kedi kutunun içine atlıyor." },
  },
  auf: {
    wo: { de: "Die Katze ist [dat:auf dem Karton].", tr: "Kedi kutunun üstünde." },
    wohin: { de: "Die Katze springt [akk:auf den Karton].", tr: "Kedi kutunun üstüne atlıyor." },
  },
  unter: {
    wo: { de: "Die Katze ist [dat:unter dem Karton].", tr: "Kedi kutunun altında." },
    wohin: { de: "Die Katze kriecht [akk:unter den Karton].", tr: "Kedi kutunun altına giriyor." },
  },
  neben: {
    wo: { de: "Die Katze ist [dat:neben dem Karton].", tr: "Kedi kutunun yanında." },
    wohin: { de: "Die Katze setzt sich [akk:neben den Karton].", tr: "Kedi kutunun yanına oturuyor." },
  },
  vor: {
    wo: { de: "Die Katze ist [dat:vor dem Karton].", tr: "Kedi kutunun önünde." },
    wohin: { de: "Die Katze setzt sich [akk:vor den Karton].", tr: "Kedi kutunun önüne oturuyor." },
  },
  hinter: {
    wo: { de: "Die Katze ist [dat:hinter dem Karton].", tr: "Kedi kutunun arkasında." },
    wohin: { de: "Die Katze läuft [akk:hinter den Karton].", tr: "Kedi kutunun arkasına koşuyor." },
  },
  zwischen: {
    wo: { de: "Die Katze ist [dat:zwischen den Kartons].", tr: "Kedi kutuların arasında." },
    wohin: { de: "Die Katze läuft [akk:zwischen die Kartons].", tr: "Kedi kutuların arasına koşuyor." },
  },
};

// Cat anchor = bottom centre, in scene coordinates.
const CAT_POS: Record<Prep, { x: number; y: number; s: number }> = {
  in: { x: 320, y: 302, s: 0.95 },
  auf: { x: 320, y: 252, s: 1 },
  unter: { x: 320, y: 330, s: 0.9 },
  neben: { x: 452, y: 330, s: 1 },
  vor: { x: 320, y: 372, s: 1.12 },
  hinter: { x: 336, y: 272, s: 0.86 },
  zwischen: { x: 320, y: 330, s: 1 },
};

export function Room({ compact = false }: { compact?: boolean }) {
  const [prep, setPrep] = useState<Prep>("auf");
  const [prev, setPrev] = useState<Prep>("neben");
  const [mode, setMode] = useState<Mode>("wo");
  const reduced = useReducedMotion();

  const choose = (p: Prep) => {
    if (p === prep) return;
    setPrev(prep);
    setPrep(p);
  };

  const cat = CAT_POS[prep];
  const from = CAT_POS[prev];
  const sentence = SENTENCES[prep][mode];
  const boxShift = prep === "zwischen" ? -110 : 0;
  const transition = reduced ? "none" : "transform 0.7s cubic-bezier(.34,1.3,.5,1)";

  const catEl = (
    <g style={{ transform: `translate(${cat.x}px, ${cat.y}px) scale(${cat.s})`, transition }}>
      <Cat tailOnly={false} hideTail={prep === "unter"} />
    </g>
  );

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-[28px] bg-[#f4efe6]">
        <svg viewBox="0 0 640 400" overflow="visible" className={clsx("mx-auto block w-full", compact ? "max-h-[300px]" : "max-h-[420px]")} role="img" aria-label={plain(sentence.de)}>
          {/* room */}
          <rect x="-600" y="-50" width="1840" height="380" fill="#f4efe6" />
          <rect x="-600" y="330" width="1840" height="120" fill="#e7dccb" />
          <path d="M-600 330h1840" stroke={INK} strokeWidth="3" />
          {/* window */}
          <rect x="70" y="60" width="110" height="120" rx="6" fill="#d7e8f5" stroke={INK} strokeWidth="3" />
          <path d="M125 60v120M70 120h110" stroke={INK} strokeWidth="3" />
          {/* picture */}
          <rect x="470" y="70" width="90" height="66" rx="4" fill="#fff" stroke={INK} strokeWidth="3" />
          <path d="M480 126l24-28 18 18 12-10 16 20z" fill="#9EC5E8" />

          {/* motion path for Wohin? */}
          {mode === "wohin" && prev !== prep && (
            <path
              key={`${prev}-${prep}`}
              d={`M${from.x} ${from.y - 40} Q ${(from.x + cat.x) / 2} ${Math.min(from.y, cat.y) - 140} ${cat.x} ${cat.y - 40}`}
              fill="none"
              stroke="var(--color-akk)"
              strokeWidth="4"
              strokeDasharray="10 10"
              strokeLinecap="round"
              markerEnd="url(#arrowAkk)"
              opacity=".9"
            />
          )}
          <defs>
            <marker id="arrowAkk" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0l10 5-10 5z" fill="var(--color-akk)" />
            </marker>
          </defs>

          {/* second box for "zwischen" */}
          <g style={{ opacity: prep === "zwischen" ? 1 : 0, transform: `translate(${prep === "zwischen" ? 110 : 40}px, 0px)`, transition: reduced ? "none" : "opacity .4s, transform .6s" }}>
            <Box x={320} />
          </g>

          {(prep === "hinter" || prep === "unter") && catEl}
          <g style={{ transform: `translate(${boxShift}px, 0px)`, transition }}>
            {prep === "in" ? <BoxBack x={320} /> : null}
          </g>
          {prep === "in" && catEl}
          <g style={{ transform: `translate(${boxShift}px, 0px)`, transition }}>
            {prep === "unter" ? <BoxUpsideDown x={320} /> : <Box x={320} open={prep === "in"} />}
          </g>
          {prep === "unter" && (
            <g transform="translate(320 330)">
              <path d="M58 -4c22 0 34-10 36-26" fill="none" stroke={INK} strokeWidth="16" strokeLinecap="round" />
              <path d="M58 -4c22 0 34-10 36-26" fill="none" stroke="#EE9A4D" strokeWidth="9" strokeLinecap="round" />
            </g>
          )}
          {prep !== "hinter" && prep !== "in" && prep !== "unter" && catEl}

          {/* state pin for Wo? */}
          {mode === "wo" && (
            <g style={{ transform: `translate(${cat.x}px, ${cat.y - 100 * cat.s - 18}px)`, transition }}>
              <path d="M0 0l-9-14a11 11 0 1118 0z" fill="var(--color-dat)" />
              <circle cx="0" cy="-19" r="4" fill="#fff" />
            </g>
          )}
        </svg>

        {/* Wo / Wohin switch */}
        <div className="absolute left-3 top-3 flex rounded-full bg-white/90 p-1 shadow-sm ring-1 ring-line">
          {(["wo", "wohin"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={clsx(
                "rounded-full px-3.5 py-1.5 text-sm font-bold transition",
                mode === m ? (m === "wo" ? "bg-dat text-white" : "bg-akk text-white") : "text-ink-soft",
              )}
            >
              {m === "wo" ? "Wo? · Dativ" : "Wohin? · Akk."}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2" role="group" aria-label="Edat seç">
        {PREPS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => choose(p.id)}
            aria-pressed={prep === p.id}
            className={clsx(
              "de min-w-[4.5rem] rounded-2xl border px-3 py-2 text-lg transition",
              prep === p.id ? "border-ink bg-ink text-paper" : "border-line bg-white hover:border-ink-faint",
            )}
          >
            {p.id}
            <span className={clsx("block font-sans text-xs", prep === p.id ? "text-paper/70" : "text-ink-faint")}>{p.tr}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-3 text-center" aria-live="polite">
        <div>
          <p className="text-2xl sm:text-3xl">
            <Marked text={sentence.de} />
          </p>
          <p className="mt-1 text-ink-soft">{sentence.tr}</p>
        </div>
        <SpeakButton text={plain(sentence.de)} />
      </div>
    </div>
  );
}

function Box({ x, open }: { x: number; open?: boolean }) {
  return (
    <g transform={`translate(${x} 330)`}>
      <ellipse cx="0" cy="2" rx="70" ry="6" fill="rgba(30,39,51,.08)" />
      <path d="M-60 -80h120v80h-120z" fill="#B9895B" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      {open ? (
        <>
          <path d="M-60 -80l-22 -26M60 -80l22 -26" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M-60 -80l-22 -26 0 0" fill="none" />
          <path d="M-60 -80l-26 -24 6 -6 20 30z" fill="#CFA073" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <path d="M60 -80l26 -24 -6 -6 -20 30z" fill="#CFA073" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        </>
      ) : (
        <>
          <path d="M-60 -80l14 -18h92l14 18z" fill="#CFA073" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M-14 -80v22h28v-22" fill="#d8b28a" stroke={INK} strokeWidth="2.5" />
        </>
      )}
    </g>
  );
}

function BoxBack({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 330)`}>
      <path d="M-60 -80l14 -18h92l14 18z" fill="#7d5a3a" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
    </g>
  );
}

function BoxUpsideDown({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 330)`}>
      <ellipse cx="0" cy="2" rx="70" ry="6" fill="rgba(30,39,51,.08)" />
      <path d="M-60 -86h120v86h-120z" fill="#B9895B" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M-60 0l-18 6M60 0l18 6" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M-30 -60h60" stroke="#8C6440" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

/** Sitting cat, anchor at bottom centre. About 100 units tall. */
function Cat({ hideTail }: { tailOnly?: boolean; hideTail?: boolean }) {
  const s = { stroke: INK, strokeWidth: 3.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  return (
    <g>
      {!hideTail && (
        <>
          <path d="M26 -8c26 2 36-20 26-36" fill="none" stroke={INK} strokeWidth="17" strokeLinecap="round" />
          <path d="M26 -8c26 2 36-20 26-36" fill="none" stroke="#EE9A4D" strokeWidth="10" strokeLinecap="round" />
        </>
      )}
      <path d="M-30 0c-4-34 8-56 30-56s34 22 30 56z" fill="#EE9A4D" {...s} />
      <path d="M-12 0v-16M12 0v-16" {...s} strokeWidth={3} />
      <path d="M-26 -78l-2 -24 16 12h24l16 -12 -2 24c4 6 5 10 5 16 0 18-14 26-31 26s-31-8-31-26c0-6 1-10 5-16z" fill="#EE9A4D" {...s} />
      <circle cx="-9" cy="-70" r="3.2" fill={INK} />
      <circle cx="9" cy="-70" r="3.2" fill={INK} />
      <path d="M-3 -62l3 3 3-3" fill="none" {...s} strokeWidth={2.5} />
    </g>
  );
}
