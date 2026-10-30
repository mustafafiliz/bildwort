"use client";
import { useMemo, useRef, useState } from "react";
import clsx from "clsx";
import type { Article, Exercise } from "@/content/types";
import { Marked, plain } from "./Marked";
import { ObjectArt } from "@/components/illustrations/objects";
import { SpeakButton } from "@/components/ui/SpeakButton";

export type Answer = { correct: boolean; given: string; expected: string; prompt: string };

/** Text used to describe an exercise outside the view (mistake log, AI teacher). */
export function describeExercise(ex: Exercise): { prompt: string; expected: string } {
  switch (ex.kind) {
    case "choice":
      return { prompt: plain(ex.q), expected: ex.options[ex.answer] };
    case "article":
      return { prompt: `___ ${ex.word}`, expected: `${ex.answer} ${ex.word}` };
    case "order":
      return { prompt: `Sırala: ${ex.tr}`, expected: ex.words.join(" ") };
    case "type":
      return { prompt: plain(ex.q), expected: ex.answers[0] };
  }
}

/** Fill the blank of a question with the answer so it can be read aloud. */
export function filled(q: string, answer: string) {
  return plain(q).replace("___", answer).replace(/\s*\(.*?\)\s*$/, "").replace(/\s+([.?!,])/g, "$1").trim();
}

function seededShuffle<T>(arr: T[], seedText: string): T[] {
  let seed = 0;
  for (const ch of seedText) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  const out = [...arr];
  for (let attempt = 0; attempt < 5; attempt++) {
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    if (out.join(" ") !== arr.join(" ")) break;
  }
  return out;
}

const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ").replace(/[.!?]$/, "");

export function ExerciseView({ ex, onDone, continueLabel = "Devam" }: { ex: Exercise; onDone: (a: Answer) => void; continueLabel?: string }) {
  const [result, setResult] = useState<Answer | null>(null);
  const info = describeExercise(ex);

  const finish = (correct: boolean, given: string) => setResult({ correct, given, expected: info.expected, prompt: info.prompt });

  return (
    <div className="mx-auto w-full max-w-2xl">
      {ex.kind === "choice" && <Choice ex={ex} result={result} onAnswer={finish} />}
      {ex.kind === "article" && <ArticlePick ex={ex} result={result} onAnswer={finish} />}
      {ex.kind === "order" && <Order ex={ex} result={result} onAnswer={finish} />}
      {ex.kind === "type" && <TypeIn ex={ex} result={result} onAnswer={finish} />}

      {result && (
        <div
          role="status"
          className={clsx("anim-rise mt-6 rounded-3xl p-5", result.correct ? "bg-ok-soft" : "bg-bad-soft")}
        >
          <p className={clsx("text-lg font-bold", result.correct ? "text-ok" : "text-bad")}>
            {result.correct ? "Doğru!" : "Tam değil."}
          </p>
          {!result.correct && (
            <p className="mt-1">
              Doğru cevap: <b className="de text-lg" lang="de">{result.expected}</b>
            </p>
          )}
          <p className="mt-1 text-ink-soft">{ex.why}</p>
          <button
            type="button"
            autoFocus
            onClick={() => onDone(result)}
            className="mt-4 w-full rounded-full bg-ink py-3.5 text-lg font-bold text-paper sm:w-auto sm:px-10"
          >
            {continueLabel}
          </button>
        </div>
      )}
    </div>
  );
}

function Prompt({ q, tr, gap }: { q: string; tr?: string; gap?: React.ReactNode }) {
  return (
    <div className="text-center">
      <p className="text-3xl leading-snug sm:text-4xl">
        <Marked text={q} gap={gap} />
      </p>
      {tr && <p className="mt-2 text-ink-soft">{tr}</p>}
    </div>
  );
}

function GapFill({ text, state }: { text: string; state: "ok" | "bad" | "idle" }) {
  return (
    <span
      className={clsx(
        "mx-1 inline-block min-w-16 rounded-lg px-2 font-semibold",
        state === "ok" && "bg-ok-soft text-ok",
        state === "bad" && "bg-bad-soft text-bad line-through",
        state === "idle" && "border-b-[3px] border-ink-faint",
      )}
    >
      {text || " "}
    </span>
  );
}

function Choice({ ex, result, onAnswer }: { ex: Extract<Exercise, { kind: "choice" }>; result: Answer | null; onAnswer: (c: boolean, g: string) => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  const gap = picked === null ? undefined : <GapFill text={ex.options[picked]} state={picked === ex.answer ? "ok" : "bad"} />;
  return (
    <div>
      <Prompt q={ex.q} tr={ex.tr} gap={gap} />
      <div className={clsx("mt-8 grid gap-3", ex.options.length > 2 && ex.options.every((o) => o.length < 14) ? "grid-cols-3" : "grid-cols-1 sm:grid-cols-2")}>
        {ex.options.map((o, i) => {
          const state = result ? (i === ex.answer ? "ok" : i === picked ? "bad" : "idle") : "idle";
          return (
            <button
              key={o}
              type="button"
              disabled={!!result}
              onClick={() => {
                setPicked(i);
                onAnswer(i === ex.answer, o);
              }}
              className={clsx(
                "de rounded-2xl border-2 px-3 py-4 text-xl transition sm:text-2xl",
                state === "ok" && "border-ok bg-ok-soft text-ok",
                state === "bad" && "anim-shake border-bad bg-bad-soft text-bad",
                state === "idle" && "border-line bg-white enabled:hover:border-ink",
                result && state === "idle" && "opacity-50",
              )}
            >
              {o}
            </button>
          );
        })}
      </div>
      {result && (
        <div className="mt-4 flex justify-center">
          <SpeakButton text={filled(ex.q, ex.options[ex.answer])} label="Doğru cümleyi dinle" />
        </div>
      )}
    </div>
  );
}

const ARTICLE_STYLE: Record<Article, string> = {
  der: "border-der text-der bg-der-soft",
  die: "border-die text-die bg-die-soft",
  das: "border-das text-das bg-das-soft",
};

function ArticlePick({ ex, result, onAnswer }: { ex: Extract<Exercise, { kind: "article" }>; result: Answer | null; onAnswer: (c: boolean, g: string) => void }) {
  const [picked, setPicked] = useState<Article | null>(null);
  return (
    <div className="text-center">
      {ex.art ? <ObjectArt id={ex.art} className="mx-auto w-44 sm:w-56" title={ex.word} /> : <div className="h-6" />}
      <p className="de mt-2 text-4xl sm:text-5xl" lang="de">
        <span className={clsx("inline-block min-w-20 font-bold", result ? ARTICLE_STYLE[ex.answer].split(" ")[1] : "text-ink-faint")}>
          {result ? ex.answer : "___"}
        </span>{" "}
        {ex.word}
      </p>
      <div className="mt-8 grid grid-cols-3 gap-3">
        {(["der", "die", "das"] as Article[]).map((a) => (
          <button
            key={a}
            type="button"
            disabled={!!result}
            onClick={() => {
              setPicked(a);
              onAnswer(a === ex.answer, `${a} ${ex.word}`);
            }}
            className={clsx(
              "de rounded-2xl border-2 py-5 text-2xl font-bold transition sm:text-3xl",
              ARTICLE_STYLE[a],
              result && a !== ex.answer && a !== picked && "opacity-30",
              result && a === picked && a !== ex.answer && "anim-shake line-through",
              result && a === ex.answer && "ring-4 ring-ink/15",
            )}
          >
            {a}
          </button>
        ))}
      </div>
      {result && (
        <div className="mt-4 flex justify-center">
          <SpeakButton text={`${ex.answer} ${ex.word}`} />
        </div>
      )}
    </div>
  );
}

function Order({ ex, result, onAnswer }: { ex: Extract<Exercise, { kind: "order" }>; result: Answer | null; onAnswer: (c: boolean, g: string) => void }) {
  const pool = useMemo(() => seededShuffle(ex.words.map((w, i) => ({ w, i })), ex.words.join("|")), [ex.words]);
  const [chosen, setChosen] = useState<number[]>([]);
  const remaining = pool.filter((p) => !chosen.includes(p.i));
  const sentence = chosen.map((i) => ex.words[i]).join(" ");
  const correctText = ex.words.join(" ");
  return (
    <div>
      <p className="text-center text-lg text-ink-soft">Kelimeleri doğru sıraya koy</p>
      <p className="mt-1 text-center text-xl font-bold">{ex.tr}</p>
      <div
        className={clsx(
          "mt-6 flex min-h-20 flex-wrap items-center justify-center gap-2 rounded-3xl border-2 border-dashed p-3",
          result ? (result.correct ? "border-ok bg-ok-soft" : "border-bad bg-bad-soft") : "border-line bg-white",
        )}
        aria-label="Cevabın"
      >
        {chosen.length === 0 && <span className="text-ink-faint">Aşağıdaki kelimelere dokun</span>}
        {chosen.map((i, k) => (
          <button
            key={i}
            type="button"
            disabled={!!result}
            onClick={() => setChosen((c) => c.filter((x) => x !== i))}
            className="de anim-pop rounded-xl bg-ink px-3 py-2 text-xl text-paper"
          >
            <span className="sr-only">{k + 1}. </span>
            {ex.words[i]}
          </button>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {remaining.map((p) => (
          <button
            key={p.i}
            type="button"
            disabled={!!result}
            onClick={() => setChosen((c) => [...c, p.i])}
            className="de rounded-xl border-2 border-line bg-white px-3 py-2 text-xl hover:border-ink"
          >
            {p.w}
          </button>
        ))}
      </div>
      {!result && (
        <div className="mt-6 text-center">
          <button
            type="button"
            disabled={chosen.length !== ex.words.length}
            onClick={() => onAnswer(sentence === correctText, sentence)}
            className="rounded-full bg-ink px-10 py-3.5 text-lg font-bold text-paper disabled:opacity-30"
          >
            Kontrol et
          </button>
        </div>
      )}
      {result && (
        <div className="mt-4 flex justify-center">
          <SpeakButton text={correctText} label="Doğru cümleyi dinle" />
        </div>
      )}
    </div>
  );
}

function TypeIn({ ex, result, onAnswer }: { ex: Extract<Exercise, { kind: "type" }>; result: Answer | null; onAnswer: (c: boolean, g: string) => void }) {
  const [value, setValue] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const correct = (v: string) => ex.answers.some((a) => norm(a) === norm(v));
  const submit = () => value.trim() && onAnswer(correct(value), value.trim());
  const insert = (ch: string) => {
    setValue((v) => v + ch);
    input.current?.focus();
  };
  const gap = (
    <input
      ref={input}
      value={value}
      disabled={!!result}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && submit()}
      aria-label="Cevabını yaz"
      autoComplete="off"
      autoCapitalize="off"
      spellCheck={false}
      size={Math.max(6, value.length + 1)}
      className={clsx(
        "de mx-1 rounded-lg border-b-[3px] bg-white px-2 text-center outline-none focus:border-der",
        result ? (result.correct ? "border-ok text-ok" : "border-bad text-bad line-through") : "border-ink-faint",
      )}
    />
  );
  return (
    <div>
      <Prompt q={ex.q} tr={ex.tr} gap={gap} />
      {!result && (
        <>
          <div className="mt-6 flex justify-center gap-2">
            {["ä", "ö", "ü", "ß"].map((c) => (
              <button key={c} type="button" onClick={() => insert(c)} className="de h-11 w-11 rounded-xl border border-line bg-white text-xl">
                {c}
              </button>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button type="button" disabled={!value.trim()} onClick={submit} className="rounded-full bg-ink px-10 py-3.5 text-lg font-bold text-paper disabled:opacity-30">
              Kontrol et
            </button>
          </div>
        </>
      )}
      {result && (
        <div className="mt-4 flex justify-center">
          <SpeakButton text={filled(ex.q, ex.answers[0])} label="Doğru cümleyi dinle" />
        </div>
      )}
    </div>
  );
}
