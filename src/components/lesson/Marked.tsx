import clsx from "clsx";
import { Fragment } from "react";

/** Colour for every grammar role. Used everywhere German text appears. */
export const ROLE_CLASS: Record<string, string> = {
  der: "text-der font-semibold",
  die: "text-die font-semibold",
  das: "text-das font-semibold",
  pl: "text-pl font-semibold",
  nom: "rounded-md bg-nom-soft px-1 -mx-0.5 box-decoration-clone",
  akk: "rounded-md bg-akk-soft px-1 -mx-0.5 text-[#9a4f06] box-decoration-clone",
  dat: "rounded-md bg-dat-soft px-1 -mx-0.5 text-dat box-decoration-clone",
  verb: "font-semibold underline decoration-2 decoration-ink/40 underline-offset-[5px]",
  end: "font-semibold underline decoration-2 decoration-ink/40 underline-offset-[5px] decoration-wavy",
  conj: "font-semibold italic text-ink-soft",
  prep: "font-semibold",
  mark: "rounded-md bg-akk-soft px-1",
};

const TOKEN = /\[(\w+):([^\]]+)\]|___/g;

export function parseMarked(text: string): { role: string | null; text: string }[] {
  const out: { role: string | null; text: string }[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ role: null, text: text.slice(last, i) });
    if (m[0] === "___") out.push({ role: "gap", text: "" });
    else out.push({ role: m[1], text: m[2] });
    last = i + m[0].length;
  }
  if (last < text.length) out.push({ role: null, text: text.slice(last) });
  return out;
}

/** Strip markup: "[akk:einen Apfel]" → "einen Apfel". */
export function plain(text: string) {
  return text.replace(/\[(\w+):([^\]]+)\]/g, "$2");
}

export function Marked({ text, className, gap }: { text: string; className?: string; gap?: React.ReactNode }) {
  return (
    <span className={clsx("de", className)} lang="de">
      {parseMarked(text).map((p, i) =>
        p.role === "gap" ? (
          <Fragment key={i}>
            {gap ?? <span className="mx-1 inline-block w-16 border-b-[3px] border-ink-faint align-baseline" aria-label="boşluk" />}
          </Fragment>
        ) : p.role ? (
          <span key={i} className={ROLE_CLASS[p.role] ?? ""}>
            {p.text}
          </span>
        ) : (
          <Fragment key={i}>{p.text}</Fragment>
        ),
      )}
    </span>
  );
}

export const ARTICLE_TEXT: Record<string, string> = { der: "text-der", die: "text-die", das: "text-das" };
export const ARTICLE_BG: Record<string, string> = { der: "bg-der-soft", die: "bg-die-soft", das: "bg-das-soft" };
export const ARTICLE_FILL: Record<string, string> = { der: "bg-der", die: "bg-die", das: "bg-das" };
