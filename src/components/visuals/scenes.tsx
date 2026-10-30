"use client";
import { useState } from "react";
import clsx from "clsx";
import { INK, OBJECTS } from "@/components/illustrations/objects";
import { LOOKS, Person, Bubble } from "@/components/illustrations/people";
import { Marked, plain } from "@/components/lesson/Marked";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { useReducedMotion } from "@/lib/useReducedMotion";

const Frame = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={clsx("overflow-hidden rounded-[28px] bg-[#f4efe6]", className)}>{children}</div>
);

/** An object illustration placed inside a larger scene. */
function Obj({ id, x, y, size }: { id: string; x: number; y: number; size: number }) {
  return <g transform={`translate(${x - size / 2} ${y - size / 2}) scale(${size / 200})`}>{OBJECTS[id]}</g>;
}

function Label({ x, y, text, color, soft, anchor = "middle" }: { x: number; y: number; text: string; color: string; soft: string; anchor?: "start" | "middle" | "end" }) {
  const w = text.length * 11 + 26;
  const rx = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
  return (
    <g>
      <rect x={rx} y={y - 22} width={w} height="34" rx="17" fill={soft} />
      <text x={rx + w / 2} y={y + 1} textAnchor="middle" fontFamily="var(--font-serif)" fontSize="20" fontWeight="600" fill={color}>
        {text}
      </text>
    </g>
  );
}

/* ---------------- Artikel ---------------- */
export function ArticleTrio() {
  const items = [
    { id: "apfel", a: "der", w: "Apfel", c: "var(--color-der)", soft: "var(--color-der-soft)" },
    { id: "lampe", a: "die", w: "Lampe", c: "var(--color-die)", soft: "var(--color-die-soft)" },
    { id: "buch", a: "das", w: "Buch", c: "var(--color-das)", soft: "var(--color-das-soft)" },
  ];
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-5">
      {items.map((it, i) => (
        <div key={it.id} className="anim-rise flex flex-col items-center rounded-[24px] pb-4 pt-3" style={{ background: it.soft, animationDelay: `${i * 120}ms` }}>
          <svg viewBox="0 0 200 200" className="w-full max-w-[180px]" aria-hidden>
            {OBJECTS[it.id]}
          </svg>
          <p className="de text-xl sm:text-3xl" lang="de">
            <span className="font-bold" style={{ color: it.c }}>{it.a}</span> {it.w}
          </p>
          <SpeakButton text={`${it.a} ${it.w}`} size="sm" className="mt-2" />
        </div>
      ))}
    </div>
  );
}

/* ---------------- Akkusativ: eating ---------------- */
export function EatScene() {
  const reduced = useReducedMotion();
  return (
    <Frame>
      <svg viewBox="0 0 600 360" className="block w-full" role="img" aria-label="Bir kadın elma yiyor: Ich esse einen Apfel.">
        <rect x="0" y="300" width="600" height="60" fill="#e7dccb" />
        <path d="M0 300h600" stroke={INK} strokeWidth="3" />
        {/* table */}
        <rect x="300" y="214" width="230" height="16" rx="4" fill="#B9895B" stroke={INK} strokeWidth="3.5" />
        <path d="M320 230v70M510 230v70" stroke="#8C6440" strokeWidth="9" strokeLinecap="round" />
        {/* fruit bowl */}
        <path d="M400 214c0-22 70-22 70 0z" fill="#fff" stroke={INK} strokeWidth="3" />
        <Obj id="apfel" x={420} y={190} size={44} />
        <Obj id="banane" x={452} y={192} size={46} />
        <Person
          x={220}
          y={300}
          scale={1.12}
          look={LOOKS.ayse}
          armPose="eat"
          animate={!reduced}
          held={<g transform="translate(-18 -18) scale(.18)">{OBJECTS.apfel}</g>}
        />
        <Label x={220} y={66} text="Ich" color={INK} soft="var(--color-nom-soft)" />
        <Label x={360} y={120} text="einen Apfel" color="#9a4f06" soft="var(--color-akk-soft)" />
        <path d="M332 134c-10 10-14 14-20 18" stroke="var(--color-akk)" strokeWidth="3" fill="none" strokeLinecap="round" markerEnd="url(#eatArrow)" />
        <defs>
          <marker id="eatArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0l10 5-10 5z" fill="var(--color-akk)" />
          </marker>
        </defs>
      </svg>
    </Frame>
  );
}

/* ---------------- Dativ: giving ---------------- */
const RECEIVERS = [
  { id: "mann", dat: "dem Mann", tr: "adama", look: LOOKS.jonas, scale: 1.12 },
  { id: "frau", dat: "der Frau", tr: "kadına", look: LOOKS.ayse, scale: 1.08 },
  { id: "kind", dat: "dem Kind", tr: "çocuğa", look: { ...LOOKS.emre, top: "#F2C94C" }, scale: 0.82 },
] as const;
const GIFTS = [
  { id: "apfel", akk: "einen Apfel", tr: "bir elma" },
  { id: "blume", akk: "eine Blume", tr: "bir çiçek" },
  { id: "buch", akk: "ein Buch", tr: "bir kitap" },
] as const;

export function GiveScene() {
  const [r, setR] = useState(0);
  const [g, setG] = useState(0);
  const reduced = useReducedMotion();
  const rec = RECEIVERS[r];
  const gift = GIFTS[g];
  const giverHand = { x: 170 + 70 * 1.1, y: 300 - 96 * 1.1 };
  const recHand = { x: 430 - 70 * rec.scale, y: 300 - 96 * rec.scale };
  const sentence = `[nom:Ich] [verb:gebe] [dat:${rec.dat}] [akk:${gift.akk}].`;
  return (
    <div>
      <Frame>
        <svg viewBox="0 0 600 360" className="block w-full" role="img" aria-label={plain(sentence)}>
          <rect x="0" y="300" width="600" height="60" fill="#e7dccb" />
          <path d="M0 300h600" stroke={INK} strokeWidth="3" />
          <Person x={170} y={300} scale={1.1} look={LOOKS.lena} armPose="forward" />
          <Person x={430} y={300} scale={rec.scale} look={rec.look} facing="left" armPose="forward" />
          <g key={`${r}-${g}`}>
            <g transform={`translate(${giverHand.x - 22} ${giverHand.y - 36})`}>
              {!reduced && (
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values={`${giverHand.x - 22} ${giverHand.y - 36};${giverHand.x - 22} ${giverHand.y - 36};${recHand.x - 22} ${recHand.y - 36};${recHand.x - 22} ${recHand.y - 36}`}
                  keyTimes="0;0.25;0.7;1"
                  dur="2.6s"
                  repeatCount="indefinite"
                />
              )}
              <g transform="scale(.22)">{OBJECTS[gift.id]}</g>
            </g>
          </g>
          <Label x={170} y={66} text="Ich" color={INK} soft="var(--color-nom-soft)" />
          <Label x={300} y={262} text={`Was? ${gift.akk}`} color="#9a4f06" soft="var(--color-akk-soft)" />
          <Label x={430} y={300 - 210 * rec.scale - 6} text={`Wem? ${rec.dat}`} color="var(--color-dat)" soft="var(--color-dat-soft)" />
        </svg>
      </Frame>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Picker label="Kime? (Wem?)" tone="dat" options={RECEIVERS.map((x) => x.dat)} value={r} onChange={setR} />
        <Picker label="Ne? (Was?)" tone="akk" options={GIFTS.map((x) => x.akk)} value={g} onChange={setG} />
      </div>
      <div className="mt-5 flex items-center justify-center gap-3 text-center" aria-live="polite">
        <div>
          <p className="text-2xl sm:text-3xl"><Marked text={sentence} /></p>
          <p className="mt-1 text-ink-soft">{`${rec.tr[0].toUpperCase()}${rec.tr.slice(1)} ${gift.tr} veriyorum.`}</p>
        </div>
        <SpeakButton text={plain(sentence)} />
      </div>
    </div>
  );
}

function Picker({ label, tone, options, value, onChange }: { label: string; tone: "dat" | "akk"; options: readonly string[]; value: number; onChange: (i: number) => void }) {
  return (
    <div role="group" aria-label={label}>
      <p className={clsx("mb-1.5 text-sm font-bold", tone === "dat" ? "text-dat" : "text-akk")}>{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o, i) => (
          <button
            key={o}
            type="button"
            aria-pressed={value === i}
            onClick={() => onChange(i)}
            className={clsx(
              "de rounded-full border px-3.5 py-1.5 text-[1.05rem] transition",
              value === i ? (tone === "dat" ? "border-dat bg-dat text-white" : "border-akk bg-akk text-white") : "border-line bg-white hover:border-ink-faint",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Plural ---------------- */
export function PluralVisual() {
  const [many, setMany] = useState(false);
  const reduced = useReducedMotion();
  return (
    <div>
      <Frame>
        <svg viewBox="0 30 600 250" className="block w-full" role="img" aria-label={many ? "die Äpfel" : "der Apfel"}>
          <rect x="0" y="250" width="600" height="50" fill="#e7dccb" />
          <path d="M0 250h600" stroke={INK} strokeWidth="3" />
          {[0, 1, 2, 3].map((i) => {
            const show = i === 0 || many;
            const x = many ? 150 + i * 100 : 300;
            return (
              <g key={i} style={{ transform: `translate(${x - 80}px, 90px)`, opacity: show ? 1 : 0, transition: reduced ? "none" : "transform .6s ease, opacity .4s" }}>
                <g transform="scale(.8)">{OBJECTS.apfel}</g>
              </g>
            );
          })}
        </svg>
      </Frame>
      <div className="mt-5 flex items-center justify-center gap-4">
        <button type="button" onClick={() => setMany((m) => !m)} className="rounded-full bg-ink px-5 py-2.5 font-bold text-paper">
          {many ? "Bir tane göster" : "Çoğalt"}
        </button>
        <p className="de text-3xl" lang="de" aria-live="polite">
          {many ? (
            <>
              <span className="font-bold text-pl">die</span> <span>Ä</span>pfel
            </>
          ) : (
            <>
              <span className="font-bold text-der">der</span> Apfel
            </>
          )}
        </p>
        <SpeakButton text={many ? "die Äpfel" : "der Apfel"} />
      </div>
    </div>
  );
}

/* ---------------- kein / nicht ---------------- */
export function KeinNicht() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-[24px] bg-surface p-4">
        <svg viewBox="0 0 200 200" className="mx-auto w-40" aria-hidden>{OBJECTS.katze}</svg>
        <p className="mt-1 text-center text-xl"><Marked text="Das ist [akk:kein] Hund." /></p>
        <p className="text-center text-sm text-ink-soft">İsim → <b>kein</b></p>
      </div>
      <div className="rounded-[24px] bg-surface p-4">
        <svg viewBox="0 0 200 200" className="mx-auto w-40" aria-hidden>
          <ellipse cx="100" cy="178" rx="65" ry="7" fill="rgba(30,39,51,.08)" />
          <path d="M52 86h88v40c0 26-20 44-44 44s-44-18-44-44z" fill="#fff" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
          <path d="M140 98c22 0 22 34 0 34" fill="none" stroke={INK} strokeWidth="4" />
          <ellipse cx="96" cy="86" rx="44" ry="8" fill="#7A4E2E" stroke={INK} strokeWidth="3" />
          {/* thermometer showing "cold" */}
          <g transform="translate(166 22)">
            <rect x="-7" y="0" width="14" height="70" rx="7" fill="#fff" stroke={INK} strokeWidth="3" />
            <circle cx="0" cy="78" r="12" fill="var(--color-der)" stroke={INK} strokeWidth="3" />
            <rect x="-3" y="52" width="6" height="22" fill="var(--color-der)" />
          </g>
        </svg>
        <p className="mt-1 text-center text-xl"><Marked text="Der Kaffee ist [akk:nicht] heiß." /></p>
        <p className="text-center text-sm text-ink-soft">Sıfat, fiil → <b>nicht</b></p>
      </div>
    </div>
  );
}

/* ---------------- Komparativ ---------------- */
export function ComparisonVisual() {
  const steps = [
    { h: 0.55, w: "groß", tr: "büyük" },
    { h: 0.8, w: "größer", tr: "daha büyük" },
    { h: 1.08, w: "am größten", tr: "en büyük" },
  ];
  return (
    <Frame>
      <svg viewBox="0 0 600 340" className="block w-full" role="img" aria-label="groß, größer, am größten">
        <rect x="0" y="270" width="600" height="70" fill="#e7dccb" />
        <path d="M0 270h600" stroke={INK} strokeWidth="3" />
        {steps.map((s, i) => {
          const size = 220 * s.h;
          const x = 120 + i * 180;
          return (
            <g key={i} className="anim-rise" style={{ animationDelay: `${i * 160}ms` }}>
              <g transform={`translate(${x - size / 2} ${270 - size * 0.89}) scale(${size / 200})`}>{OBJECTS.baum}</g>
              <text x={x} y={310} textAnchor="middle" fontFamily="var(--font-serif)" fontSize="24" fontWeight="600" fill={i === 0 ? INK : "#9a4f06"}>
                {s.w}
              </text>
              <text x={x} y={332} textAnchor="middle" fontFamily="var(--font-sans)" fontSize="15" fill="#5b6573">
                {s.tr}
              </text>
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

/* ---------------- Reflexiv ---------------- */
export function ReflexiveVisual() {
  return (
    <Frame>
      <svg viewBox="0 0 600 340" className="block w-full" role="img" aria-label="Ich wasche mich.">
        <rect x="0" y="300" width="600" height="40" fill="#e7dccb" />
        <path d="M0 300h600" stroke={INK} strokeWidth="3" />
        {/* mirror */}
        <rect x="380" y="70" width="140" height="190" rx="70" fill="#dfeef7" stroke={INK} strokeWidth="4" />
        <g opacity=".45" clipPath="url(#mirrorClip)">
          <Person x={450} y={330} scale={1} look={LOOKS.emre} facing="left" armPose="up" />
        </g>
        <clipPath id="mirrorClip">
          <rect x="384" y="74" width="132" height="182" rx="66" />
        </clipPath>
        <Person x={220} y={300} scale={1.08} look={LOOKS.emre} armPose="up" />
        {/* the arrow returns to the same person */}
        <path d="M250 96c60-50 140-30 120 40-12 40-80 50-110 16" fill="none" stroke="var(--color-akk)" strokeWidth="4" strokeLinecap="round" strokeDasharray="0" markerEnd="url(#reflArrow)" />
        <defs>
          <marker id="reflArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0l10 5-10 5z" fill="var(--color-akk)" />
          </marker>
        </defs>
        <Label x={160} y={56} text="ich" color={INK} soft="var(--color-nom-soft)" />
        <Label x={330} y={56} text="mich" color="#9a4f06" soft="var(--color-akk-soft)" />
      </svg>
    </Frame>
  );
}

/* ---------------- Relativsatz ---------------- */
export function RelativeVisual() {
  return (
    <Frame>
      <svg viewBox="0 0 600 340" className="block w-full" role="img" aria-label="Das ist der Mann, der neben mir wohnt.">
        <rect x="0" y="300" width="600" height="40" fill="#e7dccb" />
        <path d="M0 300h600" stroke={INK} strokeWidth="3" />
        {/* her house and the neighbour's house, side by side */}
        <g transform="translate(40 150) scale(.75)">{OBJECTS.haus}</g>
        <g transform="translate(330 150) scale(.75)">{OBJECTS.haus}</g>
        <Person x={210} y={300} scale={0.82} look={LOOKS.ayse} armPose="forward" />
        <Person x={500} y={300} scale={0.82} look={LOOKS.jonas} facing="left" armPose="wave" />
        <path d="M282 220c60-10 120-10 160 0" fill="none" stroke="var(--color-ink-faint)" strokeWidth="3" strokeDasharray="6 7" />
        {/* the relative clause hangs off the noun it describes */}
        <Label x={500} y={44} text="der Mann" color="var(--color-der)" soft="var(--color-der-soft)" />
        <path d="M500 62v20" stroke="var(--color-ink-soft)" strokeWidth="3" />
        <Label x={420} y={104} text="…, der neben mir wohnt" color={INK} soft="#fff" />
        <path d="M500 122v12" stroke="var(--color-ink-soft)" strokeWidth="3" markerEnd="url(#relArrow)" />
        <defs>
          <marker id="relArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0l10 5-10 5z" fill="var(--color-ink-soft)" />
          </marker>
        </defs>
      </svg>
    </Frame>
  );
}

/* ---------------- Passiv ---------------- */
export function PassiveVisual() {
  const [passive, setPassive] = useState(false);
  const reduced = useReducedMotion();
  const sentence = passive ? "[nom:Das Auto] [verb:wird] [end:repariert]." : "[nom:Der Mechaniker] [verb:repariert] [akk:das Auto].";
  return (
    <div>
      <Frame>
        <svg viewBox="0 0 600 320" className="block w-full" role="img" aria-label={plain(sentence)}>
          <rect x="0" y="270" width="600" height="50" fill="#e7dccb" />
          <path d="M0 270h600" stroke={INK} strokeWidth="3" />
          <g style={{ opacity: passive ? 0.18 : 1, transition: reduced ? "none" : "opacity .6s" }}>
            <Person x={160} y={270} scale={1} look={{ ...LOOKS.kellner, top: "#3B5A8A", bottom: "#3B5A8A" }} armPose="forward" />
            <g transform="translate(222 158) rotate(30)">
              <rect x="-6" y="0" width="12" height="54" rx="4" fill="#8D95A1" stroke={INK} strokeWidth="3" />
              <path d="M-14 -4a14 14 0 0028 0l-6 0-2 8h-12l-2-8z" fill="#8D95A1" stroke={INK} strokeWidth="3" />
            </g>
          </g>
          <g style={{ transform: passive ? "translate(200px, 8px) scale(1.4)" : "translate(270px, 64px) scale(1.1)", transformOrigin: "0 0", transition: reduced ? "none" : "transform .7s ease" }}>
            <g transform="scale(1.1)">{OBJECTS.auto}</g>
          </g>
        </svg>
      </Frame>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-center">
        <button type="button" onClick={() => setPassive((p) => !p)} className="rounded-full bg-ink px-5 py-2.5 font-bold text-paper">
          {passive ? "Etken (Aktiv) göster" : "Edilgen (Passiv) yap"}
        </button>
        <p className="text-2xl" aria-live="polite"><Marked text={sentence} /></p>
        <SpeakButton text={plain(sentence)} />
      </div>
    </div>
  );
}

/* ---------------- Konjunktiv II ---------------- */
export function WishVisual() {
  return (
    <Frame>
      <svg viewBox="0 0 600 340" className="block w-full" role="img" aria-label="Wenn ich Zeit hätte, würde ich reisen.">
        <rect x="0" y="300" width="600" height="40" fill="#e7dccb" />
        <path d="M0 300h600" stroke={INK} strokeWidth="3" />
        {/* reality: desk and computer */}
        <rect x="60" y="220" width="220" height="14" rx="4" fill="#B9895B" stroke={INK} strokeWidth="3.5" />
        <path d="M80 234v66M260 234v66" stroke="#8C6440" strokeWidth="9" strokeLinecap="round" />
        <g transform="translate(180 152) scale(.36)">{OBJECTS.computer}</g>
        <g transform="translate(70 168) scale(.28)">{OBJECTS.uhr}</g>
        <Person x={130} y={300} scale={0.95} look={LOOKS.lena} />
        {/* dream bubble */}
        <circle cx="200" cy="96" r="7" fill="#fff" stroke={INK} strokeWidth="3" />
        <circle cx="226" cy="74" r="11" fill="#fff" stroke={INK} strokeWidth="3" />
        <path d="M262 40c10-30 70-34 90-10 20-22 80-14 90 14 34 0 52 40 30 64 22 26-6 70-40 58-12 30-80 34-98 8-28 20-78 4-80-30-34-6-36-64 8-74z" fill="#fff" stroke={INK} strokeWidth="3.5" />
        <rect x="290" y="150" width="190" height="20" fill="#F2C94C" opacity=".0" />
        <g transform="translate(296 34) scale(.34)">{OBJECTS.sonne}</g>
        <path d="M290 150c40-16 120-16 180 0" fill="none" stroke="#5B8FD0" strokeWidth="6" strokeLinecap="round" />
        <path d="M430 148v-62l40 52z" fill="#fff" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M408 150h66l-9 13h-48z" fill="#C23B5B" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <text x="400" y="252" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="22" fontWeight="600" fill={INK}>
          würde reisen
        </text>
        <text x="170" y="330" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="15" fill="#5b6573">gerçek</text>
        <text x="400" y="274" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="15" fill="#5b6573">hayal</text>
      </svg>
    </Frame>
  );
}

export { Bubble };
