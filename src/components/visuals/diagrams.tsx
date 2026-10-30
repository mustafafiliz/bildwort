"use client";
import { useState } from "react";
import clsx from "clsx";
import { Marked, plain } from "@/components/lesson/Marked";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { OBJECTS } from "@/components/illustrations/objects";
import { useReducedMotion } from "@/lib/useReducedMotion";

/* ---------------- Akkusativ: der → den ---------------- */
export function AkkTransform() {
  const rows = [
    { g: "der", from: ["der", "ein", "kein"], to: ["den", "einen", "keinen"], changes: true, ex: "Apfel" },
    { g: "die", from: ["die", "eine"], to: ["die", "eine"], changes: false, ex: "Tomate" },
    { g: "das", from: ["das", "ein"], to: ["das", "ein"], changes: false, ex: "Buch" },
  ];
  const color: Record<string, string> = { der: "text-der", die: "text-die", das: "text-das" };
  return (
    <div className="mx-auto max-w-xl rounded-[24px] bg-surface p-4 sm:p-6">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-3 gap-y-1 text-center">
        <p className="text-sm font-bold text-ink-soft">Nominativ · kim/ne?</p>
        <span />
        <p className="text-sm font-bold text-akk">Akkusativ · kimi/neyi?</p>
        {rows.map((r) => (
          <div key={r.g} className="contents">
            <div className={clsx("de rounded-2xl bg-white py-3 text-xl sm:text-2xl", color[r.g])}>
              {r.from.map((f, i) => (
                <span key={f} className="font-semibold">
                  {i > 0 && <span className="text-ink-faint"> · </span>}
                  {f}
                </span>
              ))}
              <span className="block font-sans text-sm text-ink-faint">{r.ex}</span>
            </div>
            <svg width="54" height="24" viewBox="0 0 54 24" aria-hidden>
              <path
                d="M2 12h44M38 4l10 8-10 8"
                fill="none"
                stroke={r.changes ? "var(--color-akk)" : "var(--color-line)"}
                strokeWidth={r.changes ? 4 : 3}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={r.changes ? "anim-draw" : ""}
                style={{ ["--len" as string]: 70 }}
              />
            </svg>
            <div className={clsx("de rounded-2xl py-3 text-xl sm:text-2xl", r.changes ? "bg-akk-soft ring-2 ring-akk" : "bg-white")}>
              {r.to.map((f, i) => (
                <span key={f} className={clsx("font-semibold", r.changes ? "text-[#9a4f06]" : color[r.g])}>
                  {i > 0 && <span className="text-ink-faint"> · </span>}
                  {f}
                </span>
              ))}
              <span className="block font-sans text-sm text-ink-faint">{r.changes ? "değişir" : "aynı kalır"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Dativ table ---------------- */
export function DatTable() {
  const cols = [
    { g: "der", c: "text-der", nom: "der / ein", akk: "den / einen", dat: "dem / einem" },
    { g: "die", c: "text-die", nom: "die / eine", akk: "die / eine", dat: "der / einer" },
    { g: "das", c: "text-das", nom: "das / ein", akk: "das / ein", dat: "dem / einem" },
    { g: "Plural", c: "text-pl", nom: "die", akk: "die", dat: "den + -n" },
  ];
  return (
    <div className="mx-auto max-w-2xl overflow-x-auto rounded-[24px] bg-surface p-3 sm:p-5">
      <table className="de w-full min-w-[440px] border-separate border-spacing-1.5 text-center text-lg">
        <thead>
          <tr>
            <th className="font-sans text-sm text-ink-faint" />
            {cols.map((c) => (
              <th key={c.g} className={clsx("font-bold", c.c)}>{c.g}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="text-left font-sans text-sm font-bold">Nom.</th>
            {cols.map((c) => <td key={c.g} className="rounded-xl bg-white py-2">{c.nom}</td>)}
          </tr>
          <tr>
            <th className="text-left font-sans text-sm font-bold text-akk">Akk.<span className="block font-normal text-ink-faint">Was?</span></th>
            {cols.map((c) => <td key={c.g} className="rounded-xl bg-akk-soft py-2">{c.akk}</td>)}
          </tr>
          <tr>
            <th className="text-left font-sans text-sm font-bold text-dat">Dat.<span className="block font-normal text-ink-faint">Wem?</span></th>
            {cols.map((c) => <td key={c.g} className="rounded-xl bg-dat-soft py-2 font-semibold text-dat">{c.dat}</td>)}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- Wo? / Wohin? ---------------- */
export function WoWohin() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-[24px] bg-dat-soft p-5">
        <p className="text-lg font-bold text-dat">Wo? → Dativ</p>
        <p className="text-sm text-ink-soft">Nerede? Bir yerde duruyor.</p>
        <svg viewBox="0 0 200 120" className="mx-auto my-3 w-full max-w-[220px]" aria-hidden>
          <rect x="60" y="60" width="80" height="50" rx="4" fill="#B9895B" stroke="#1E2733" strokeWidth="3" />
          <circle cx="100" cy="42" r="16" fill="#EE9A4D" stroke="#1E2733" strokeWidth="3" />
          <path d="M100 6l-7-10a9 9 0 1114 0z" transform="translate(0 4)" fill="var(--color-dat)" />
        </svg>
        <p className="text-xl"><Marked text="Sie ist [dat:auf dem Karton]." /></p>
      </div>
      <div className="rounded-[24px] bg-akk-soft p-5">
        <p className="text-lg font-bold text-[#9a4f06]">Wohin? → Akkusativ</p>
        <p className="text-sm text-ink-soft">Nereye? Bir yere gidiyor.</p>
        <svg viewBox="0 0 200 120" className="mx-auto my-3 w-full max-w-[220px]" aria-hidden>
          <rect x="100" y="60" width="80" height="50" rx="4" fill="#B9895B" stroke="#1E2733" strokeWidth="3" />
          <circle cx="36" cy="94" r="16" fill="#EE9A4D" stroke="#1E2733" strokeWidth="3" opacity=".45" />
          <path d="M44 74C60 20 110 14 132 40" fill="none" stroke="var(--color-akk)" strokeWidth="4" strokeDasharray="7 7" strokeLinecap="round" />
          <circle cx="140" cy="42" r="16" fill="#EE9A4D" stroke="#1E2733" strokeWidth="3" />
        </svg>
        <p className="text-xl"><Marked text="Sie springt [akk:auf den Karton]." /></p>
      </div>
    </div>
  );
}

/* ---------------- Perfekt ---------------- */
export function PerfektTimeline() {
  return (
    <div className="overflow-hidden rounded-[28px] bg-[#f4efe6] p-4 sm:p-6">
      <svg viewBox="0 0 600 220" className="block w-full" role="img" aria-label="Gestern habe ich einen Apfel gegessen.">
        <path d="M40 150h520" stroke="#1E2733" strokeWidth="4" strokeLinecap="round" />
        <path d="M548 140l14 10-14 10" fill="none" stroke="#1E2733" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="180" cy="150" r="10" fill="var(--color-akk)" />
        <circle cx="440" cy="150" r="10" fill="#1E2733" />
        <text x="180" y="190" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="22" fontWeight="600">gestern</text>
        <text x="440" y="190" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="22" fontWeight="600">heute</text>
        <text x="180" y="212" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="14" fill="#5b6573">dün</text>
        <text x="440" y="212" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="14" fill="#5b6573">bugün</text>
        {/* apple core = done */}
        <g transform="translate(140 34) scale(.4)">
          <path d="M64 50c8-14 64-14 72 0 4 10-6 20-18 26 10 16 10 40 0 54 12 6 22 16 18 26-8 14-64 14-72 0-4-10 6-20 18-26-10-14-10-38 0-54-12-6-22-16-18-26z" fill="#F6EBD3" stroke="#1E2733" strokeWidth="6" strokeLinejoin="round" />
          <path d="M64 50c8-14 64-14 72 0-10 8-62 8-72 0zM64 156c8 14 64 14 72 0-10-8-62-8-72 0z" fill="#E2645B" stroke="#1E2733" strokeWidth="6" strokeLinejoin="round" />
          <circle cx="94" cy="100" r="4" fill="#5b3b23" /><circle cx="106" cy="112" r="4" fill="#5b3b23" />
          <path d="M100 40c0-14 2-22 8-30" stroke="#8C6440" strokeWidth="7" strokeLinecap="round" />
        </g>
        <path d="M440 120c-60-60-180-60-250-6" fill="none" stroke="var(--color-ink-faint)" strokeWidth="3" strokeDasharray="6 8" />
        <g transform="translate(410 60) scale(.3)">{OBJECTS.mann}</g>
      </svg>
    </div>
  );
}

export function PerfektBracket() {
  return (
    <div className="mx-auto max-w-2xl rounded-[24px] bg-surface p-5">
      <div className="de flex flex-wrap items-start justify-center gap-2 text-2xl sm:text-3xl" lang="de">
        <span className="rounded-xl bg-nom-soft px-3 py-2">Ich</span>
        <span className="flex flex-wrap items-center gap-2 rounded-b-2xl border-2 border-t-0 border-ink px-2 pb-3">
          <span className="rounded-xl bg-ink px-3 py-2 font-semibold text-paper">habe</span>
          <span className="px-1 py-2 text-ink-soft">gestern einen Apfel</span>
          <span className="rounded-xl bg-ink px-3 py-2 font-semibold text-paper">
            <span className="text-[#f6b26b]">ge</span>gess<span className="text-[#f6b26b]">en</span>
          </span>
        </span>
      </div>
      <p className="mt-2 text-center text-sm text-ink-soft">Cümle köşeli bir parantez gibi: fiilin iki parçası diğer kelimeleri kucaklar.</p>
      <div className="mt-3 grid grid-cols-2 gap-3 text-center text-sm">
        <p><b>2. sıra:</b> haben / sein</p>
        <p><b>en son:</b> Partizip II</p>
      </div>
      <div className="mt-4 grid gap-2 text-center sm:grid-cols-3">
        {[
          ["machen", "gemacht", "düzenli: ge-…-t"],
          ["essen", "gegessen", "düzensiz: ge-…-en"],
          ["aufstehen", "aufgestanden", "ayrılabilen: auf-ge-…"],
        ].map(([a, b, n]) => (
          <div key={a} className="rounded-2xl bg-white p-3">
            <p className="de text-lg">{a} → <b>{b}</b></p>
            <p className="text-xs text-ink-soft">{n}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Konjugation (interactive) ---------------- */
const PERSONS = [
  { p: "ich", end: "e", tr: "ben" },
  { p: "du", end: "st", tr: "sen" },
  { p: "er/sie/es", end: "t", tr: "o" },
  { p: "wir", end: "en", tr: "biz" },
  { p: "ihr", end: "t", tr: "siz" },
  { p: "sie/Sie", end: "en", tr: "onlar / siz (resmî)" },
];
export function Conjugation() {
  const [i, setI] = useState(0);
  const cur = PERSONS[i];
  const reduced = useReducedMotion();
  const firstPerson = cur.p.split("/")[0];
  return (
    <div className="rounded-[28px] bg-[#f4efe6] p-5 sm:p-8">
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Kişi seç">
        {PERSONS.map((x, k) => (
          <button
            key={x.p}
            type="button"
            aria-pressed={i === k}
            onClick={() => setI(k)}
            className={clsx("de rounded-full border px-4 py-2 text-lg transition", i === k ? "border-ink bg-ink text-paper" : "border-line bg-white")}
          >
            {x.p}
          </button>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-center gap-3" aria-live="polite">
        <p className="de text-4xl sm:text-6xl" lang="de">
          <span className="text-ink-soft">{firstPerson} </span>
          <span className="rounded-xl bg-white px-2">lern</span>
          <span key={cur.end + i} className={clsx("inline-block font-bold text-akk", !reduced && "anim-pop")}>
            {cur.end}
          </span>
        </p>
        <SpeakButton text={`${firstPerson} lern${cur.end}`} />
      </div>
      <p className="mt-3 text-center text-ink-soft">
        {cur.tr} → kök <b>lern-</b> + <b className="text-akk">-{cur.end}</b>
      </p>
    </div>
  );
}

/* ---------------- Verb auf Platz 2 (interactive) ---------------- */
export function VerbPosition() {
  const [front, setFront] = useState(false);
  const reduced = useReducedMotion();
  const words = front
    ? [{ w: "Morgens", k: "t" }, { w: "trinke", k: "v" }, { w: "ich", k: "s" }, { w: "Kaffee.", k: "o" }]
    : [{ w: "Ich", k: "s" }, { w: "trinke", k: "v" }, { w: "morgens", k: "t" }, { w: "Kaffee.", k: "o" }];
  const style: Record<string, string> = {
    s: "bg-nom-soft",
    v: "bg-ink text-paper",
    t: "bg-akk-soft text-[#9a4f06]",
    o: "bg-white",
  };
  return (
    <div className="rounded-[28px] bg-[#f4efe6] p-5 sm:p-8">
      <div className="mx-auto grid max-w-2xl grid-cols-4 gap-2 text-center">
        {[1, 2, 3, 4].map((n) => (
          <p key={n} className={clsx("text-sm font-bold", n === 2 ? "text-ink" : "text-ink-faint")}>{n}.</p>
        ))}
        {words.map((x) => (
          <div
            key={x.w.toLowerCase().replace(".", "")}
            className={clsx("de rounded-2xl px-2 py-4 text-xl sm:text-3xl", style[x.k], !reduced && "anim-pop")}
          >
            {x.w}
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={() => setFront((f) => !f)} className="rounded-full bg-ink px-5 py-2.5 font-bold text-paper">
          {front ? "“ich” başa gelsin" : "“morgens” başa gelsin"}
        </button>
        <SpeakButton text={words.map((w) => w.w).join(" ")} />
      </div>
      <p className="mt-3 text-center text-ink-soft">Fiil (siyah kutu) hep 2. sırada kalıyor.</p>
    </div>
  );
}

/* ---------------- weil: verb moves to the end ---------------- */
export function WeilMerge() {
  const [merged, setMerged] = useState(false);
  const reduced = useReducedMotion();
  const sentence = merged ? "Ich bleibe zu Hause, [conj:weil] es [end:regnet]." : "Ich bleibe zu Hause. Es [verb:regnet].";
  return (
    <div className="rounded-[28px] bg-[#f4efe6] p-5 sm:p-8">
      <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-2 text-xl sm:text-3xl" lang="de">
        <span className="de rounded-2xl bg-white px-3 py-3">Ich bleibe zu Hause{merged ? "," : "."}</span>
        {merged && <span className={clsx("de rounded-2xl bg-surface px-3 py-3 font-semibold italic text-ink-soft", !reduced && "anim-pop")}>weil</span>}
        {merged ? (
          <>
            <span className="de rounded-2xl bg-white px-3 py-3">es</span>
            <span className={clsx("de rounded-2xl bg-ink px-3 py-3 text-paper", !reduced && "anim-rise")}>regnet.</span>
          </>
        ) : (
          <>
            <span className="de rounded-2xl bg-white px-3 py-3">Es</span>
            <span className="de rounded-2xl bg-ink px-3 py-3 text-paper">regnet.</span>
          </>
        )}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={() => setMerged((m) => !m)} className="rounded-full bg-ink px-5 py-2.5 font-bold text-paper">
          {merged ? "Ayır" : "weil ile birleştir"}
        </button>
        <SpeakButton text={plain(sentence)} />
      </div>
      <div className="mt-5 flex justify-center gap-6">
        <svg viewBox="0 0 200 120" className="w-28" aria-hidden>{OBJECTS.regen}</svg>
        <svg viewBox="0 0 200 200" className="w-24" aria-hidden>{OBJECTS.haus}</svg>
      </div>
    </div>
  );
}
