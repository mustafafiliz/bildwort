/**
 * Original object illustrations for vocabulary.
 * Style: flat, muted fills with a single ink outline (like a printed textbook).
 * Every drawing uses a 200×200 viewBox so they can be swapped freely.
 */
import type { ReactNode } from "react";

export const INK = "#1E2733";
const s = { stroke: INK, strokeWidth: 4, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const thin = { ...s, strokeWidth: 3 };

// Shared muted palette
const C = {
  red: "#E2645B",
  redDark: "#B9443D",
  leaf: "#6FAE7B",
  leafDark: "#4E8A5B",
  wood: "#B9895B",
  woodDark: "#8C6440",
  cream: "#F6EBD3",
  bread: "#D9A25F",
  sky: "#9EC5E8",
  blue: "#5B8FD0",
  navy: "#3B5A8A",
  yellow: "#F2C94C",
  orange: "#EE9A4D",
  grey: "#C9CDD3",
  greyDark: "#8D95A1",
  white: "#FFFFFF",
  skin: "#E9B48F",
  skin2: "#C98D63",
  pink: "#EFA7B5",
  violet: "#9B87D1",
  teal: "#62B0A8",
  shadow: "rgba(30,39,51,0.08)",
};

const Ground = ({ w = 120, y = 178 }: { w?: number; y?: number }) => (
  <ellipse cx="100" cy={y} rx={w / 2} ry="7" fill={C.shadow} />
);

export const OBJECTS: Record<string, ReactNode> = {
  /* ---------- Essen & Trinken ---------- */
  apfel: (
    <g>
      <Ground w={110} />
      <path d="M100 62c-14-12-58-14-62 30-4 42 26 78 46 78 8 0 10-4 16-4s8 4 16 4c20 0 50-36 46-78-4-44-48-42-62-30z" fill={C.red} {...s} />
      <path d="M62 92c2-14 10-22 20-24" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity=".55" />
      <path d="M100 62c0-14 2-22 8-30" fill="none" {...s} stroke={C.woodDark} strokeWidth={5} />
      <path d="M106 44c10-16 30-18 40-12-6 14-24 22-40 12z" fill={C.leaf} {...s} />
    </g>
  ),
  brot: (
    <g>
      <Ground w={140} />
      <path d="M36 128c-8-40 26-66 64-66s72 26 64 66c-2 12-12 42-64 42s-62-30-64-42z" fill={C.bread} {...s} />
      <path d="M72 82l-10 22M100 76l-8 26M128 82l-8 22" fill="none" {...thin} stroke="#A26F35" />
      <path d="M50 140c30 10 70 10 100 0" fill="none" {...thin} stroke="#A26F35" opacity=".6" />
    </g>
  ),
  milch: (
    <g>
      <Ground w={90} />
      <path d="M70 70l10-26h40l10 26v100H70z" fill={C.white} {...s} />
      <path d="M80 44l20-14 20 14" fill={C.sky} {...s} />
      <rect x="70" y="96" width="60" height="44" fill={C.sky} {...thin} />
      <path d="M84 126c6-14 26-14 32 0" fill="none" {...thin} stroke={C.white} />
      <circle cx="100" cy="114" r="5" fill={C.white} />
    </g>
  ),
  kaese: (
    <g>
      <Ground w={140} />
      <path d="M30 130l120-60 20 40v40H30z" fill={C.yellow} {...s} />
      <path d="M30 130l120-60 20 40-140 20z" fill="#F7DA7A" {...s} />
      <circle cx="80" cy="148" r="8" fill="#E2B33A" />
      <circle cx="132" cy="140" r="6" fill="#E2B33A" />
      <circle cx="154" cy="156" r="5" fill="#E2B33A" />
      <circle cx="110" cy="110" r="5" fill="#E2B33A" />
    </g>
  ),
  ei: (
    <g>
      <Ground w={90} />
      <path d="M100 40c-28 0-46 52-46 82 0 30 20 48 46 48s46-18 46-48c0-30-18-82-46-82z" fill={C.cream} {...s} />
      <path d="M78 86c4-14 10-22 16-26" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
    </g>
  ),
  banane: (
    <g>
      <Ground w={130} />
      <path d="M40 70c6 56 52 88 112 70 6-2 6-10 0-12-46 8-82-14-94-62-2-8-18-6-18 4z" fill={C.yellow} {...s} />
      <path d="M58 72c10 38 40 58 82 62" fill="none" {...thin} stroke="#D9A72C" />
      <path d="M40 70l-6-12 14-4 6 12" fill={C.woodDark} {...thin} />
    </g>
  ),
  kaffee: (
    <g>
      <Ground w={130} />
      <path d="M52 86h88v40c0 26-20 44-44 44s-44-18-44-44z" fill={C.white} {...s} />
      <path d="M140 98c22 0 22 34 0 34" fill="none" {...s} />
      <ellipse cx="96" cy="86" rx="44" ry="8" fill="#7A4E2E" {...thin} />
      <path d="M80 66c-6-10 6-14 0-24M100 66c-6-10 6-14 0-24M120 66c-6-10 6-14 0-24" fill="none" {...thin} stroke={C.greyDark} />
    </g>
  ),
  wasser: (
    <g>
      <Ground w={90} />
      <path d="M86 30h28v18c0 8 18 16 18 34v80c0 6-4 10-10 10H78c-6 0-10-4-10-10V82c0-18 18-26 18-34z" fill="#D7EAF7" {...s} />
      <rect x="84" y="22" width="32" height="12" rx="3" fill={C.blue} {...thin} />
      <path d="M68 108c20-8 44 8 64 0v54c0 6-4 10-10 10H78c-6 0-10-4-10-10z" fill={C.sky} {...thin} />
      <path d="M80 92v40" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity=".7" />
    </g>
  ),
  tomate: (
    <g>
      <Ground w={120} />
      <path d="M100 66c-38 0-60 22-60 52s26 52 60 52 60-22 60-52-22-52-60-52z" fill={C.red} {...s} />
      <path d="M78 64l22 12 22-12-8 18 14 4-28 2-28-2 14-4z" fill={C.leaf} {...thin} />
      <path d="M100 66V50" {...s} stroke={C.leafDark} />
      <path d="M60 104c4-10 12-16 22-18" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity=".5" />
    </g>
  ),
  fisch: (
    <g>
      <Ground w={140} />
      <path d="M30 110c26-36 80-44 116 0-36 44-90 36-116 0z" fill={C.teal} {...s} />
      <path d="M146 110l26-24v48z" fill={C.teal} {...s} />
      <circle cx="58" cy="104" r="5" fill={INK} />
      <path d="M86 92c8 10 8 26 0 36M106 90c8 12 8 28 0 40" fill="none" {...thin} stroke="#3E8A82" />
    </g>
  ),

  /* ---------- Zuhause ---------- */
  tisch: (
    <g>
      <Ground w={160} y={176} />
      <rect x="24" y="82" width="152" height="18" rx="4" fill={C.wood} {...s} />
      <path d="M40 100v72M160 100v72" {...s} strokeWidth={8} stroke={C.woodDark} />
      <path d="M40 100v72M160 100v72" fill="none" {...s} strokeWidth={4} opacity="0" />
    </g>
  ),
  stuhl: (
    <g>
      <Ground w={110} y={178} />
      <path d="M64 30h56v84H64z" fill={C.wood} {...s} />
      <path d="M74 46h36M74 62h36M74 78h36" {...thin} stroke={C.woodDark} />
      <rect x="56" y="110" width="88" height="14" rx="4" fill={C.wood} {...s} />
      <path d="M66 124v52M134 124v52" {...s} strokeWidth={7} stroke={C.woodDark} />
    </g>
  ),
  bett: (
    <g>
      <Ground w={170} />
      <path d="M22 70v104M178 120v54" {...s} strokeWidth={7} stroke={C.woodDark} />
      <rect x="22" y="118" width="156" height="34" rx="4" fill={C.wood} {...s} />
      <rect x="30" y="100" width="148" height="22" rx="8" fill={C.white} {...s} />
      <rect x="34" y="84" width="42" height="22" rx="10" fill={C.white} {...s} />
      <path d="M80 100c30-14 70-14 98 0v22H80z" fill={C.sky} {...s} />
    </g>
  ),
  lampe: (
    <g>
      <Ground w={90} />
      <path d="M68 40h64l18 50H50z" fill={C.yellow} {...s} />
      <path d="M100 90v74" {...s} strokeWidth={6} />
      <ellipse cx="100" cy="168" rx="30" ry="8" fill={C.greyDark} {...s} />
      <path d="M70 108l-14 14M130 108l14 14M100 104v10" {...thin} stroke="#E2B33A" />
    </g>
  ),
  fenster: (
    <g>
      <rect x="40" y="30" width="120" height="140" rx="6" fill={C.sky} {...s} />
      <path d="M100 30v140M40 100h120" {...s} />
      <circle cx="132" cy="62" r="12" fill={C.yellow} />
      <path d="M50 84c10-8 22-8 32 0" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      <rect x="32" y="166" width="136" height="10" rx="3" fill={C.white} {...s} />
    </g>
  ),
  tuer: (
    <g>
      <Ground w={120} />
      <rect x="54" y="20" width="92" height="156" rx="4" fill={C.wood} {...s} />
      <rect x="68" y="36" width="64" height="50" rx="3" fill="none" {...thin} stroke={C.woodDark} />
      <rect x="68" y="98" width="64" height="62" rx="3" fill="none" {...thin} stroke={C.woodDark} />
      <circle cx="130" cy="98" r="6" fill={C.yellow} {...thin} />
    </g>
  ),
  schrank: (
    <g>
      <Ground w={140} />
      <rect x="40" y="20" width="120" height="150" rx="4" fill={C.wood} {...s} />
      <path d="M100 20v150" {...s} />
      <path d="M90 84v18M110 84v18" {...s} strokeWidth={6} />
      <path d="M48 170v8M152 170v8" {...s} strokeWidth={6} />
    </g>
  ),
  sofa: (
    <g>
      <Ground w={180} />
      <rect x="34" y="70" width="132" height="54" rx="14" fill={C.teal} {...s} />
      <rect x="20" y="96" width="34" height="62" rx="12" fill={C.teal} {...s} />
      <rect x="146" y="96" width="34" height="62" rx="12" fill={C.teal} {...s} />
      <rect x="54" y="116" width="92" height="42" rx="6" fill="#7CC2BA" {...s} />
      <path d="M100 116v42" {...thin} />
      <path d="M32 158v14M168 158v14" {...s} strokeWidth={6} />
    </g>
  ),
  uhr: (
    <g>
      <circle cx="100" cy="100" r="70" fill={C.white} {...s} strokeWidth={6} />
      <path d="M100 40v8M100 152v8M40 100h8M152 100h8" {...thin} />
      <path d="M100 100V62M100 100l26 18" {...s} strokeWidth={6} />
      <circle cx="100" cy="100" r="6" fill={C.red} />
    </g>
  ),
  schluessel: (
    <g>
      <Ground w={140} />
      <circle cx="62" cy="96" r="32" fill={C.yellow} {...s} />
      <circle cx="62" cy="96" r="12" fill="#fff" {...thin} />
      <path d="M92 96h80v14h-12v14h-14v-14h-12v14h-14v-14H92" fill={C.yellow} {...s} />
    </g>
  ),

  /* ---------- Stadt & Verkehr ---------- */
  auto: (
    <g>
      <Ground w={170} y={170} />
      <path d="M22 132v-24c0-8 6-14 14-16l20-4 18-24c4-5 9-8 16-8h40c7 0 12 3 16 8l18 24 16 4c8 2 14 8 14 16v24z" fill={C.red} {...s} />
      <path d="M82 64h22v26H66zM114 64h18l14 26h-32z" fill={C.sky} {...thin} />
      <circle cx="58" cy="140" r="18" fill={INK} />
      <circle cx="58" cy="140" r="7" fill={C.grey} />
      <circle cx="146" cy="140" r="18" fill={INK} />
      <circle cx="146" cy="140" r="7" fill={C.grey} />
    </g>
  ),
  bus: (
    <g>
      <Ground w={170} y={172} />
      <rect x="22" y="44" width="156" height="108" rx="14" fill={C.yellow} {...s} />
      <rect x="34" y="58" width="30" height="34" rx="4" fill={C.sky} {...thin} />
      <rect x="72" y="58" width="30" height="34" rx="4" fill={C.sky} {...thin} />
      <rect x="110" y="58" width="30" height="34" rx="4" fill={C.sky} {...thin} />
      <rect x="148" y="58" width="22" height="64" rx="4" fill={C.sky} {...thin} />
      <path d="M22 110h126" {...thin} />
      <circle cx="56" cy="154" r="15" fill={INK} />
      <circle cx="146" cy="154" r="15" fill={INK} />
    </g>
  ),
  fahrrad: (
    <g>
      <Ground w={170} y={170} />
      <circle cx="50" cy="128" r="34" fill="none" {...s} />
      <circle cx="150" cy="128" r="34" fill="none" {...s} />
      <path d="M50 128l34-50h50l16 50M84 78l20 50h46M104 128l30-50" fill="none" {...s} stroke={C.blue} strokeWidth={6} />
      <path d="M76 70h20M128 60l6 18 14-4" fill="none" {...s} />
      <circle cx="104" cy="128" r="6" fill={INK} />
    </g>
  ),
  bahnhof: (
    <g>
      <Ground w={180} />
      <path d="M20 84L100 34l80 50" fill={C.redDark} {...s} />
      <rect x="32" y="80" width="136" height="92" fill={C.cream} {...s} />
      <path d="M84 172v-46a16 16 0 0132 0v46z" fill={C.wood} {...s} />
      <circle cx="100" cy="66" r="12" fill={C.white} {...thin} />
      <path d="M100 66v-6M100 66l5 3" {...thin} />
      <rect x="44" y="100" width="26" height="24" fill={C.sky} {...thin} />
      <rect x="130" y="100" width="26" height="24" fill={C.sky} {...thin} />
    </g>
  ),
  apotheke: (
    <g>
      <Ground w={150} />
      <rect x="36" y="56" width="128" height="116" rx="4" fill={C.white} {...s} />
      <rect x="36" y="56" width="128" height="22" fill={C.red} {...s} />
      <path d="M100 92v44M78 114h44" stroke={C.red} strokeWidth="14" strokeLinecap="square" />
      <rect x="84" y="142" width="32" height="30" fill={C.sky} {...thin} />
    </g>
  ),
  haus: (
    <g>
      <Ground w={150} />
      <path d="M28 98l72-62 72 62" fill={C.red} {...s} />
      <rect x="44" y="92" width="112" height="80" fill={C.cream} {...s} />
      <rect x="62" y="110" width="28" height="26" fill={C.sky} {...thin} />
      <path d="M112 172v-50h28v50z" fill={C.wood} {...s} />
      <rect x="126" y="44" width="16" height="30" fill={C.redDark} {...thin} />
    </g>
  ),
  strasse: (
    <g>
      <path d="M70 20h60l50 160H20z" fill={C.greyDark} {...s} />
      <path d="M100 30v20M100 70v26M100 116v30M100 164v14" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
      <path d="M20 180L70 20M180 180L130 20" fill="none" {...s} />
    </g>
  ),
  supermarkt: (
    <g>
      <Ground w={170} />
      <path d="M26 72h148l-10 26H36z" fill={C.leaf} {...s} />
      <rect x="36" y="98" width="128" height="74" fill={C.cream} {...s} />
      <path d="M50 72v26M74 72v26M98 72v26M122 72v26M146 72v26" {...thin} stroke={C.leafDark} />
      <rect x="50" y="114" width="40" height="40" fill={C.sky} {...thin} />
      <rect x="104" y="114" width="46" height="58" fill={C.sky} {...thin} />
      <path d="M127 114v58" {...thin} />
      <rect x="62" y="38" width="76" height="22" rx="4" fill={C.white} {...thin} />
    </g>
  ),

  /* ---------- Menschen & Körper ---------- */
  mann: (
    <g>
      <Ground w={110} />
      <path d="M58 172v-46c0-24 18-38 42-38s42 14 42 38v46z" fill={C.blue} {...s} />
      <circle cx="100" cy="58" r="30" fill={C.skin} {...s} />
      <path d="M70 52c0-22 14-30 30-30s30 8 30 28c-10-6-20-10-34-10-10 0-20 4-26 12z" fill="#4A3426" {...thin} />
      <circle cx="90" cy="62" r="3.5" fill={INK} />
      <circle cx="110" cy="62" r="3.5" fill={INK} />
      <path d="M92 74c5 4 11 4 16 0" fill="none" {...thin} />
    </g>
  ),
  frau: (
    <g>
      <Ground w={110} />
      <path d="M64 48c0-24 16-34 36-34s36 10 36 34v52H64z" fill="#7A4A2E" {...s} />
      <path d="M58 172l8-48c4-22 18-34 34-34s30 12 34 34l8 48z" fill={C.red} {...s} />
      <circle cx="100" cy="60" r="28" fill={C.skin2} {...s} />
      <path d="M72 56c6-18 18-24 34-22 12 2 20 10 22 22-16 0-36-6-46-14-2 6-6 10-10 14z" fill="#7A4A2E" {...thin} />
      <circle cx="91" cy="64" r="3.5" fill={INK} />
      <circle cx="109" cy="64" r="3.5" fill={INK} />
      <path d="M93 75c4 3 10 3 14 0" fill="none" {...thin} />
    </g>
  ),
  kind: (
    <g>
      <Ground w={90} />
      <path d="M72 172v-36c0-18 12-28 28-28s28 10 28 28v36z" fill={C.yellow} {...s} />
      <circle cx="100" cy="76" r="32" fill={C.skin} {...s} />
      <path d="M68 74c0-22 14-32 32-32s32 10 32 30c-8-8-18-14-32-14-12 0-24 6-32 16z" fill="#C2783E" {...thin} />
      <circle cx="90" cy="82" r="3.5" fill={INK} />
      <circle cx="110" cy="82" r="3.5" fill={INK} />
      <path d="M92 94c5 4 11 4 16 0" fill="none" {...thin} />
    </g>
  ),
  arzt: (
    <g>
      <Ground w={110} />
      <path d="M56 172v-46c0-24 20-38 44-38s44 14 44 38v46z" fill={C.white} {...s} />
      <path d="M100 90v82" {...thin} />
      <path d="M84 96c-6 20-4 38 8 44" fill="none" {...thin} stroke={C.greyDark} />
      <circle cx="92" cy="142" r="6" fill={C.grey} {...thin} />
      <path d="M118 120h14M125 113v14" stroke={C.red} strokeWidth="5" strokeLinecap="round" />
      <circle cx="100" cy="58" r="28" fill={C.skin} {...s} />
      <path d="M72 54c2-20 14-28 28-28s26 8 28 28c-10-8-18-10-28-10s-20 2-28 10z" fill={C.greyDark} {...thin} />
      <rect x="84" y="56" width="32" height="12" rx="6" fill="none" {...thin} />
      <path d="M93 78c4 3 10 3 14 0" fill="none" {...thin} />
    </g>
  ),
  hand: (
    <g>
      <path d="M70 176v-48l-22-30c-6-8 4-18 12-10l16 18V46c0-10 14-10 14 0v52-64c0-10 14-10 14 0v64-56c0-10 14-10 14 0v58-44c0-10 14-10 14 0v76c0 22-14 44-34 44z" fill={C.skin} {...s} />
    </g>
  ),
  kopf: (
    <g>
      <path d="M78 150v28h44v-28" fill={C.skin} {...s} />
      <circle cx="100" cy="94" r="56" fill={C.skin} {...s} />
      <path d="M46 90c0-40 26-56 54-56s54 16 54 52c-14-14-34-22-54-22-22 0-40 10-54 26z" fill="#4A3426" {...thin} />
      <circle cx="82" cy="102" r="4.5" fill={INK} />
      <circle cx="118" cy="102" r="4.5" fill={INK} />
      <path d="M90 126c6 5 14 5 20 0" fill="none" {...thin} />
      <path d="M44 100c-8 0-8 18 2 18M156 100c8 0 8 18-2 18" fill={C.skin} {...thin} />
    </g>
  ),
  auge: (
    <g>
      <path d="M20 100c40-56 120-56 160 0-40 56-120 56-160 0z" fill={C.white} {...s} />
      <circle cx="100" cy="100" r="30" fill={C.blue} {...s} />
      <circle cx="100" cy="100" r="13" fill={INK} />
      <circle cx="110" cy="90" r="6" fill="#fff" />
      <path d="M56 54l-6-12M100 44V30M144 54l6-12" {...thin} />
    </g>
  ),

  /* ---------- Arbeit & Schule ---------- */
  buch: (
    <g>
      <Ground w={150} />
      <path d="M100 56c-20-14-50-16-70-10v114c20-6 50-4 70 10 20-14 50-16 70-10V46c-20-6-50-4-70 10z" fill={C.white} {...s} />
      <path d="M100 56v114" {...s} />
      <path d="M44 74c14-2 30 0 42 6M44 96c14-2 30 0 42 6M114 80c12-6 28-8 42-6M114 102c12-6 28-8 42-6" fill="none" {...thin} stroke={C.greyDark} />
      <path d="M30 160l-6 8c28-6 54-4 76 8 22-12 48-14 76-8l-6-8" fill={C.navy} {...thin} />
    </g>
  ),
  stift: (
    <g>
      <Ground w={140} />
      <path d="M40 150l90-90 22 22-90 90-30 8z" fill={C.yellow} {...s} />
      <path d="M130 60l12-12c6-6 16-6 22 0s6 16 0 22l-12 12z" fill={C.pink} {...s} />
      <path d="M40 150l22 22-30 8z" fill={C.cream} {...thin} />
      <path d="M32 180l4-12 6 6z" fill={INK} />
    </g>
  ),
  handy: (
    <g>
      <Ground w={90} />
      <rect x="62" y="22" width="76" height="150" rx="14" fill={INK} {...s} />
      <rect x="70" y="38" width="60" height="112" rx="4" fill={C.sky} />
      <rect x="78" y="50" width="20" height="20" rx="5" fill={C.yellow} />
      <rect x="102" y="50" width="20" height="20" rx="5" fill={C.leaf} />
      <rect x="78" y="76" width="20" height="20" rx="5" fill={C.red} />
      <rect x="102" y="76" width="20" height="20" rx="5" fill={C.violet} />
      <rect x="88" y="158" width="24" height="5" rx="2.5" fill={C.grey} />
    </g>
  ),
  computer: (
    <g>
      <Ground w={150} />
      <rect x="30" y="36" width="140" height="94" rx="8" fill={INK} {...s} />
      <rect x="40" y="46" width="120" height="74" rx="3" fill={C.sky} />
      <path d="M52 64h56M52 78h80M52 92h40" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
      <path d="M86 130l-8 30h44l-8-30" fill={C.grey} {...s} />
      <rect x="60" y="160" width="80" height="10" rx="4" fill={C.grey} {...s} />
    </g>
  ),
  tasche: (
    <g>
      <Ground w={130} />
      <path d="M72 70V56c0-16 12-26 28-26s28 10 28 26v14" fill="none" {...s} strokeWidth={6} />
      <path d="M40 74h120l-8 98H48z" fill={C.wood} {...s} />
      <path d="M40 74l60 34 60-34" fill="none" {...thin} stroke={C.woodDark} />
      <rect x="90" y="102" width="20" height="16" rx="3" fill={C.yellow} {...thin} />
    </g>
  ),
  brief: (
    <g>
      <rect x="24" y="52" width="152" height="104" rx="6" fill={C.white} {...s} />
      <path d="M24 58l76 56 76-56" fill="none" {...s} />
      <rect x="136" y="64" width="28" height="30" fill={C.red} {...thin} />
      <path d="M24 150l56-44M176 150l-56-44" fill="none" {...thin} stroke={C.greyDark} />
    </g>
  ),

  /* ---------- Natur & Tiere ---------- */
  katze: (
    <g>
      <Ground w={120} />
      <path d="M52 172c-6-40 10-74 48-74s54 34 48 74z" fill={C.orange} {...s} />
      <path d="M148 160c22 0 30-30 14-40" fill="none" {...s} stroke={C.orange} strokeWidth={10} />
      <path d="M148 160c22 0 30-30 14-40" fill="none" {...s} strokeWidth={4} opacity="0" />
      <path d="M62 66l-4-36 26 18h32l26-18-4 36c6 8 8 16 8 24 0 26-22 38-46 38s-46-12-46-38c0-8 2-16 8-24z" fill={C.orange} {...s} />
      <circle cx="86" cy="86" r="4.5" fill={INK} />
      <circle cx="114" cy="86" r="4.5" fill={INK} />
      <path d="M96 98l4 4 4-4" fill="none" {...thin} />
      <path d="M58 96h18M58 104l18-2M142 96h-18M142 104l-18-2" {...thin} strokeWidth={2} />
    </g>
  ),
  hund: (
    <g>
      <Ground w={130} />
      <path d="M50 172c0-40 20-62 52-62s48 22 48 62z" fill={C.wood} {...s} />
      <circle cx="100" cy="82" r="38" fill={C.wood} {...s} />
      <path d="M64 62c-18 4-22 36-10 48 8-6 12-26 10-48zM136 62c18 4 22 36 10 48-8-6-12-26-10-48z" fill={C.woodDark} {...thin} />
      <ellipse cx="100" cy="100" rx="18" ry="14" fill={C.cream} {...thin} />
      <ellipse cx="100" cy="94" rx="7" ry="5" fill={INK} />
      <circle cx="86" cy="76" r="4.5" fill={INK} />
      <circle cx="114" cy="76" r="4.5" fill={INK} />
    </g>
  ),
  baum: (
    <g>
      <Ground w={130} />
      <path d="M90 176v-56h20v56z" fill={C.woodDark} {...s} />
      <path d="M100 22c-34 0-56 26-54 54-14 10-14 40 8 48 14 6 26 2 46 2s32 4 46-2c22-8 22-38 8-48 2-28-20-54-54-54z" fill={C.leaf} {...s} />
      <path d="M76 60c6-8 14-12 24-12" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity=".4" />
    </g>
  ),
  blume: (
    <g>
      <Ground w={90} />
      <path d="M100 100v74" {...s} stroke={C.leafDark} strokeWidth={6} />
      <path d="M100 150c-20-2-30-16-30-28 16 0 28 10 30 28z" fill={C.leaf} {...thin} />
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="100" cy="64" rx="16" ry="26" fill={C.pink} {...thin} transform={`rotate(${a} 100 90)`} />
      ))}
      <circle cx="100" cy="90" r="14" fill={C.yellow} {...thin} />
    </g>
  ),
  sonne: (
    <g>
      {Array.from({ length: 12 }).map((_, i) => (
        <path key={i} d="M100 18v22" {...s} stroke={C.orange} strokeWidth={8} transform={`rotate(${i * 30} 100 100)`} />
      ))}
      <circle cx="100" cy="100" r="46" fill={C.yellow} {...s} />
    </g>
  ),
  regen: (
    <g>
      <path d="M52 106c-20 0-30-14-28-28 2-16 16-24 30-22 4-20 22-32 42-30 18 2 30 14 34 28 16-4 32 6 34 24 2 16-10 28-26 28z" fill={C.grey} {...s} />
      {[[56, 126], [92, 132], [128, 126], [74, 160], [110, 162], [146, 156]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y}l-6 14`} {...s} stroke={C.blue} strokeWidth={6} />
      ))}
    </g>
  ),
  karton: (
    <g>
      <Ground w={150} />
      <path d="M36 82h128v90H36z" fill={C.wood} {...s} />
      <path d="M36 82l-14-22h128l14 22M164 82l14-22" fill="#CFA073" {...s} />
      <path d="M86 82v24h28V82" fill="#CFA073" {...thin} />
    </g>
  ),
};

export const OBJECT_IDS = Object.keys(OBJECTS);

export function ObjectArt({ id, className, title }: { id: string; className?: string; title?: string }) {
  const art = OBJECTS[id];
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={title ?? id}>
      {title ? <title>{title}</title> : null}
      {art ?? <circle cx="100" cy="100" r="60" fill="#E3DFD6" />}
    </svg>
  );
}
