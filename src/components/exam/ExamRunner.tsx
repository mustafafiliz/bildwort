"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { EXAMS_BY_ID, taskTotal, type AudioLine, type Exam, type ExamSection, type ExamTask } from "@/content/exams";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { MicIcon } from "@/components/teacher/TeacherChat";
import { canListen, listen, playLines, stopSpeaking } from "@/lib/speech";

type Results = Record<string, { score: number; total: number }>;

export function ExamRunner({ id }: { id: string }) {
  const exam = EXAMS_BY_ID[id];
  const router = useRouter();
  const taskId = useSearchParams().get("task");
  const [results, setResults] = useState<Results>({});

  useEffect(() => {
    fetch(`/api/exam?exam=${id}`).then((r) => r.json()).then((d) => setResults(d.results)).catch(() => {});
  }, [id, taskId]);

  const all = exam.sections.flatMap((s) => s.tasks.map((t) => ({ s, t })));
  const idx = all.findIndex((x) => x.t.id === taskId);
  if (idx >= 0) {
    const { s, t } = all[idx];
    const next = all[idx + 1];
    return (
      <TaskScreen
        key={t.id}
        exam={exam}
        section={s}
        task={t}
        onExit={() => router.push(`/exam/${id}`)}
        onNext={next ? () => router.push(`/exam/${id}?task=${next.t.id}`) : null}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/exam" className="text-sm text-ink-soft hover:text-ink">← Sınavlar</Link>
      <h1 className="mt-2 text-3xl font-bold">{exam.title}</h1>
      <ul className="mt-4 space-y-2">
        {exam.formatTr.map((f) => (
          <li key={f} className="flex gap-3">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-faint" aria-hidden />
            {f}
          </li>
        ))}
      </ul>
      {exam.sections.map((s) => (
        <section key={s.id} className="mt-8">
          <h2 className="flex items-baseline justify-between">
            <span className="text-xl font-bold">
              {s.nameDe} <span className="font-normal text-ink-soft">· {s.nameTr}</span>
            </span>
            <span className="text-sm text-ink-faint">{s.minutes}</span>
          </h2>
          <ul className="mt-3 divide-y divide-line rounded-3xl bg-white ring-1 ring-line">
            {s.tasks.map((t) => {
              const r = results[t.id];
              return (
                <li key={t.id}>
                  <Link href={`/exam/${id}?task=${t.id}`} className="flex items-center gap-4 px-5 py-4 hover:bg-surface">
                    <span className="flex-1">
                      <span className="de block font-bold" lang="de">{t.title}</span>
                      <span className="block text-sm text-ink-soft">{t.instructionTr}</span>
                    </span>
                    {r ? (
                      <span className={clsx("rounded-full px-3 py-1 text-sm font-bold", r.score / r.total >= 0.6 ? "bg-ok-soft text-ok" : "bg-akk-soft text-[#9a4f06]")}>
                        {r.score}/{r.total}
                      </span>
                    ) : (
                      <span className="text-sm text-ink-faint">Başla</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

function TaskScreen({ exam, section, task, onExit, onNext }: { exam: Exam; section: ExamSection; task: ExamTask; onExit: () => void; onNext: (() => void) | null }) {
  useEffect(() => () => stopSpeaking(), []);
  const save = (score: number, total: number, mistakes?: { prompt: string; given: string; expected: string; note?: string }[]) =>
    fetch("/api/exam", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ examId: exam.id, section: section.id, taskId: task.id, score, total, mistakes }),
    }).catch(() => {});

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <button type="button" onClick={onExit} className="text-sm text-ink-soft hover:text-ink">← {exam.title}</button>
        <span className="text-sm text-ink-faint">{section.nameDe} · {section.minutes}</span>
      </div>
      <h1 className="de mt-5 text-2xl font-bold" lang="de">{task.title}</h1>
      <p className="mt-1 text-ink-soft">{task.instructionTr}</p>
      <div className="mt-6">
        {(task.kind === "mc" || task.kind === "tf") && <Objective task={task} save={save} />}
        {task.kind === "gap" && <Gaps task={task} save={save} />}
        {(task.kind === "write" || task.kind === "speak") && <Productive exam={exam} task={task} save={save} />}
      </div>
      {onNext && (
        <div className="mt-10 border-t border-line pt-5 text-right">
          <button type="button" onClick={onNext} className="font-bold underline-offset-4 hover:underline">Sonraki görev</button>
        </div>
      )}
    </div>
  );
}

type Save = (score: number, total: number, mistakes?: { prompt: string; given: string; expected: string; note?: string }[]) => void;

function Source({ text, audio, revealScript }: { text?: string; audio?: AudioLine[]; revealScript: boolean }) {
  const [plays, setPlays] = useState(0);
  const [playing, setPlaying] = useState(false);
  if (text)
    return (
      <div className="de whitespace-pre-line rounded-3xl bg-white p-5 text-[1.12rem] leading-relaxed ring-1 ring-line" lang="de">
        {text}
      </div>
    );
  if (!audio) return null;
  return (
    <div className="rounded-3xl bg-white p-5 ring-1 ring-line">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => {
            if (playing) {
              stopSpeaking();
              setPlaying(false);
              return;
            }
            setPlaying(true);
            setPlays((p) => p + 1);
            playLines(audio, () => setPlaying(false));
          }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper"
          aria-label={playing ? "Durdur" : "Dinle"}
        >
          {playing ? (
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden><rect x="4" y="4" width="12" height="12" rx="2" fill="currentColor" /></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 20 20" aria-hidden><path d="M6 4l11 6-11 6z" fill="currentColor" /></svg>
          )}
        </button>
        <div>
          <p className="font-bold">{playing ? "Çalınıyor…" : "Metni dinle"}</p>
          <p className="text-sm text-ink-soft">Sınavda genelde iki kez dinlersin. Dinleme: {plays}</p>
        </div>
      </div>
      {revealScript && (
        <div className="mt-4 space-y-1.5 border-t border-line pt-4">
          <p className="text-sm font-bold text-ink-soft">Dinleme metni</p>
          {audio.map((l, i) => (
            <p key={i} className="de" lang="de">
              {l.speaker !== "N" && <b className="mr-1 font-sans text-sm text-ink-faint">{l.speaker}:</b>}
              {l.de}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function Objective({ task, save }: { task: Extract<ExamTask, { kind: "mc" | "tf" }>; save: Save }) {
  const items =
    task.kind === "mc"
      ? task.questions.map((q) => ({ label: q.q, options: q.options, answer: q.answer, why: q.why }))
      : task.statements.map((s) => ({ label: s.s, options: task.labels ?? ["Richtig", "Falsch"], answer: s.answer ? 0 : 1, why: s.why }));
  const [picked, setPicked] = useState<(number | null)[]>(items.map(() => null));
  const [checked, setChecked] = useState(false);
  const score = items.filter((it, i) => picked[i] === it.answer).length;

  const check = () => {
    setChecked(true);
    save(
      score,
      items.length,
      items.filter((it, i) => picked[i] !== it.answer).map((it) => ({ prompt: it.label, given: picked[items.indexOf(it)] !== null ? it.options[picked[items.indexOf(it)]!] : "—", expected: it.options[it.answer], note: it.why })),
    );
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Source text={task.text} audio={task.audio} revealScript={checked} />
      <div>
        <ol className="space-y-4">
          {items.map((it, i) => (
            <li key={i} className="rounded-3xl bg-surface p-4">
              <p className="de text-lg" lang="de">
                <span className="mr-2 font-sans text-sm font-bold text-ink-faint">{i + 1}</span>
                {it.label}
              </p>
              <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label={`Soru ${i + 1}`}>
                {it.options.map((o, k) => {
                  const sel = picked[i] === k;
                  const state = checked ? (k === it.answer ? "ok" : sel ? "bad" : "idle") : sel ? "sel" : "idle";
                  return (
                    <button
                      key={k}
                      type="button"
                      role="radio"
                      aria-checked={sel}
                      disabled={checked}
                      onClick={() => setPicked((p) => p.map((x, j) => (j === i ? k : x)))}
                      className={clsx(
                        "de rounded-xl border-2 px-3.5 py-2 text-left",
                        state === "sel" && "border-ink bg-ink text-paper",
                        state === "ok" && "border-ok bg-ok-soft text-ok",
                        state === "bad" && "border-bad bg-bad-soft text-bad line-through",
                        state === "idle" && "border-line bg-white",
                      )}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
              {checked && <p className="mt-2 text-sm text-ink-soft">{it.why}</p>}
            </li>
          ))}
        </ol>
        {!checked ? (
          <button type="button" disabled={picked.some((p) => p === null)} onClick={check} className="mt-6 w-full rounded-full bg-ink py-3.5 text-lg font-bold text-paper disabled:opacity-30">
            Cevapları kontrol et
          </button>
        ) : (
          <p className="mt-6 text-center text-2xl font-bold">{score} / {items.length}</p>
        )}
      </div>
    </div>
  );
}

function Gaps({ task, save }: { task: Extract<ExamTask, { kind: "gap" }>; save: Save }) {
  const [picked, setPicked] = useState<(number | null)[]>(task.gaps.map(() => null));
  const [checked, setChecked] = useState(false);
  const score = task.gaps.filter((g, i) => picked[i] === g.answer).length;
  const parts = task.text.split(/\((\d)\)/);
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="de whitespace-pre-line rounded-3xl bg-white p-5 text-[1.12rem] leading-relaxed ring-1 ring-line" lang="de">
        {parts.map((p, i) => {
          if (i % 2 === 0) return <span key={i}>{p}</span>;
          const g = Number(p) - 1;
          const val = picked[g];
          return (
            <span key={i} className={clsx("mx-0.5 rounded-md px-1.5 font-semibold", checked ? (val === task.gaps[g].answer ? "bg-ok-soft text-ok" : "bg-bad-soft text-bad") : "bg-akk-soft")}>
              ({p}) {val !== null ? task.gaps[g].options[val] : "……"}
            </span>
          );
        })}
      </div>
      <div>
        <ol className="space-y-3">
          {task.gaps.map((g, i) => (
            <li key={i} className="flex flex-wrap items-center gap-2 rounded-3xl bg-surface p-3">
              <span className="w-10 text-center font-bold text-ink-soft">{g.q}</span>
              {g.options.map((o, k) => (
                <button
                  key={k}
                  type="button"
                  disabled={checked}
                  onClick={() => setPicked((p) => p.map((x, j) => (j === i ? k : x)))}
                  className={clsx(
                    "de rounded-xl border-2 px-3 py-1.5",
                    checked ? (k === g.answer ? "border-ok bg-ok-soft text-ok" : picked[i] === k ? "border-bad bg-bad-soft text-bad" : "border-line bg-white opacity-50") : picked[i] === k ? "border-ink bg-ink text-paper" : "border-line bg-white",
                  )}
                >
                  {String.fromCharCode(97 + k)}) {o}
                </button>
              ))}
              {checked && <p className="w-full pl-12 text-sm text-ink-soft">{g.why}</p>}
            </li>
          ))}
        </ol>
        {!checked ? (
          <button
            type="button"
            disabled={picked.some((p) => p === null)}
            onClick={() => {
              setChecked(true);
              save(score, task.gaps.length, task.gaps.filter((g, i) => picked[i] !== g.answer).map((g) => ({ prompt: `Sprachbausteine ${g.q}`, given: picked[task.gaps.indexOf(g)] !== null ? g.options[picked[task.gaps.indexOf(g)]!] : "—", expected: g.options[g.answer], note: g.why })));
            }}
            className="mt-6 w-full rounded-full bg-ink py-3.5 text-lg font-bold text-paper disabled:opacity-30"
          >
            Cevapları kontrol et
          </button>
        ) : (
          <p className="mt-6 text-center text-2xl font-bold">{score} / {task.gaps.length}</p>
        )}
      </div>
    </div>
  );
}

type Feedback = { score: number; summaryTr: string; corrected: string; good: string[]; improve: string[] };

function Productive({ exam, task, save }: { exam: Exam; task: Extract<ExamTask, { kind: "write" | "speak" }>; save: Save }) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [fb, setFb] = useState<Feedback | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModel, setShowModel] = useState(false);
  const [listening, setListening] = useState(false);
  const [mic, setMic] = useState(false);
  const stop = useRef<() => void>(() => {});
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  useEffect(() => setMic(canListen()), []);

  const evaluate = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/exam/evaluate", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ examId: exam.id, taskId: task.id, text }) });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error);
      setFb(d);
      save(Math.round(d.score), taskTotal(task));
    } catch (e) {
      setError((e as Error).message || "Değerlendirme alınamadı.");
      setShowModel(true);
    } finally {
      setBusy(false);
    }
  };

  const toggleMic = () => {
    if (listening) return stop.current();
    setListening(true);
    const before = text;
    stop.current = listen({
      onText: (t) => setText((before ? before + " " : "") + t),
      onEnd: () => setListening(false),
      onError: () => setListening(false),
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl bg-white p-5 ring-1 ring-line">
        <p className="de text-lg" lang="de">{task.kind === "write" ? task.situation : task.card}</p>
        <ul className="mt-4 space-y-2">
          {task.points.map((p) => (
            <li key={p} className="de flex gap-2" lang="de">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-sm bg-akk" aria-hidden />
              {p}
            </li>
          ))}
        </ul>
        {task.kind === "write" && <p className="mt-4 text-sm text-ink-soft">Uzunluk: {task.words}</p>}
      </div>
      <div>
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={task.kind === "write" ? 10 : 7}
            lang="de"
            spellCheck={false}
            placeholder={task.kind === "write" ? "Metnini buraya yaz…" : "Mikrofona konuş ya da cevabını yaz…"}
            aria-label="Cevabın"
            className="de w-full rounded-3xl border-2 border-line bg-white p-4 text-lg outline-none focus:border-der"
          />
          <span className="absolute bottom-3 right-4 text-sm text-ink-faint">{words} kelime</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {task.kind === "speak" && mic && (
            <button type="button" onClick={toggleMic} aria-pressed={listening} className={clsx("flex items-center gap-2 rounded-full px-4 py-3 font-bold", listening ? "bg-die text-white" : "bg-surface")}>
              <MicIcon /> {listening ? "Durdur" : "Konuş"}
            </button>
          )}
          <button type="button" disabled={!text.trim() || busy} onClick={evaluate} className="flex-1 rounded-full bg-ink px-6 py-3 font-bold text-paper disabled:opacity-30">
            {busy ? "Değerlendiriliyor…" : "Değerlendir"}
          </button>
          <button type="button" onClick={() => setShowModel((s) => !s)} className="rounded-full border-2 border-line px-5 py-3 font-bold">
            {showModel ? "Örneği gizle" : "Örnek cevap"}
          </button>
        </div>
        {error && <p className="mt-3 rounded-2xl bg-akk-soft p-3 text-sm" role="alert">{error} Örnek cevapla kendi metnini karşılaştır: tüm noktalara değindin mi?</p>}
        {fb && (
          <div className="anim-rise mt-5 rounded-3xl bg-surface p-5">
            <p className="text-3xl font-bold">{fb.score}<span className="text-ink-faint"> / 10</span></p>
            <p className="mt-1">{fb.summaryTr}</p>
            {fb.good.length > 0 && (
              <ul className="mt-3 space-y-1 text-ok">{fb.good.map((g) => <li key={g}>+ {g}</li>)}</ul>
            )}
            {fb.improve.length > 0 && (
              <ul className="mt-2 space-y-1 text-[#9a4f06]">{fb.improve.map((g) => <li key={g}>→ {g}</li>)}</ul>
            )}
            <p className="mt-4 text-sm font-bold text-ink-soft">Düzeltilmiş metin</p>
            <p className="de mt-1 whitespace-pre-line" lang="de">{fb.corrected}</p>
          </div>
        )}
        {showModel && (
          <div className="anim-rise mt-5 rounded-3xl bg-ok-soft p-5">
            <div className="flex items-center justify-between">
              <p className="font-bold text-ok">Örnek cevap</p>
              <SpeakButton text={task.model.replace(/\n/g, " ")} size="sm" />
            </div>
            <p className="de mt-2 whitespace-pre-line" lang="de">{task.model}</p>
          </div>
        )}
      </div>
    </div>
  );
}
