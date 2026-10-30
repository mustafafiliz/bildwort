import { Marked } from "@/components/lesson/Marked";
import { ObjectArt, OBJECTS } from "@/components/illustrations/objects";

/** Renders the AI teacher's lightweight visual format (see VISUAL_FORMAT in lib/ai.ts). */
export function RichText({ text }: { text: string }) {
  const lines = text.replace(/\*\*/g, "").split("\n");
  const out: React.ReactNode[] = [];
  let arts: string[] = [];
  const flushArts = (k: string) => {
    if (arts.length) {
      out.push(
        <div key={`a${k}`} className="my-2 flex flex-wrap gap-2">
          {arts.map((id, i) => (
            <ObjectArt key={i} id={id} className="w-24 rounded-2xl bg-surface p-1" />
          ))}
        </div>,
      );
      arts = [];
    }
  };
  lines.forEach((raw, i) => {
    const line = raw.trim();
    const art = line.match(/^\{\{art:([a-z]+)\}\}$/);
    if (art) {
      if (OBJECTS[art[1]]) arts.push(art[1]);
      return;
    }
    flushArts(String(i));
    if (!line) return;
    if (line.startsWith(">")) {
      const parts = line.slice(1).split("→").map((p) => p.trim());
      out.push(
        <div key={i} className="my-1.5 flex flex-wrap items-center gap-2 text-xl">
          {parts.map((p, k) => (
            <span key={k} className="flex items-center gap-2">
              {k > 0 && <span className="font-bold text-akk" aria-label="olur">→</span>}
              <span className={k === parts.length - 1 && parts.length > 1 ? "rounded-xl bg-akk-soft px-2.5 py-1" : "rounded-xl bg-white px-2.5 py-1 ring-1 ring-line"}>
                <Marked text={p} />
              </span>
            </span>
          ))}
        </div>,
      );
      return;
    }
    if (line.startsWith("- ")) {
      out.push(
        <p key={i} className="flex gap-2">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-faint" aria-hidden />
          <span>{withInline(line.slice(2))}</span>
        </p>,
      );
      return;
    }
    out.push(<p key={i}>{withInline(line)}</p>);
  });
  flushArts("end");
  return <div className="space-y-1.5 leading-relaxed">{out}</div>;
}

/** Inline: render [role:...] tokens in the serif German style; plain Turkish stays sans. */
function withInline(line: string) {
  if (!/\[\w+:[^\]]+\]/.test(line)) return line;
  return <Marked text={line} className="font-sans [&_span]:font-serif" />;
}
