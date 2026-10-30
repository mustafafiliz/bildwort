"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import type { Exercise, Lesson } from "@/content/types";
import { Visual } from "@/components/visuals/Visual";
import { Marked, plain } from "./Marked";
import { ExerciseView, type Answer } from "./ExerciseView";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { WordTile } from "@/components/vocab/WordCard";
import { WORDS_BY_ID } from "@/content/vocabulary";
import { recordMistake, useProgress } from "@/lib/store";

const STEPS = ["Görsel giriş", "Kısa açıklama", "Örnekler", "Kelimeler", "Alıştırma", "Mini test", "Hataların"];

type Wrong = { ex: Exercise; answer: Answer };

export function LessonPlayer({ lesson, next }: { lesson: Lesson; next: { slug: string; titleTr: string } | null }) {
  const router = useRouter();
  const saved = useProgress((s) => s.lessons[lesson.slug]);
  const setStep = useProgress((s) => s.setStep);
  const complete = useProgress((s) => s.complete);

  const [step, setLocalStep] = useState(0);
  const [sub, setSub] = useState(0);
  const [wrong, setWrong] = useState<Wrong[]>([]);
  const [testScore, setTestScore] = useState(0);
  const [retry, setRetry] = useState<Wrong[] | null>(null);
  const [resumeChecked, setResumeChecked] = useState(false);

  // Resume where the learner stopped (practice and test restart from their first question).
  useEffect(() => {
    if (resumeChecked) return;
    if (saved && !saved.completed && saved.step > 0 && saved.step < 6) setLocalStep(saved.step);
    setResumeChecked(true);
  }, [saved, resumeChecked]);

  const go = (n: number) => {
    setLocalStep(n);
    setSub(0);
    if (n < 6) setStep(lesson.slug, n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onAnswer = (ex: Exercise, a: Answer, phase: "practice" | "test") => {
    if (!a.correct) {
      setWrong((w) => [...w, { ex, answer: a }]);
      void recordMistake({ source: "lesson", topic: lesson.topic, prompt: a.prompt, given: a.given, expected: a.expected, note: ex.why });
    } else if (phase === "test") setTestScore((s) => s + 1);
    const list = phase === "practice" ? lesson.practice : lesson.test;
    if (sub + 1 < list.length) setSub(sub + 1);
    else go(phase === "practice" ? 5 : 6);
  };

  const finish = () => {
    complete(lesson.slug, testScore, lesson.test.length);
    router.push(next ? `/learn/${next.slug}` : "/learn");
  };

  const vocab = useMemo(() => lesson.vocab.map((id) => WORDS_BY_ID[id]).filter(Boolean), [lesson.vocab]);

  return (
    <div className="mx-auto max-w-3xl">
      {/* Top bar: close + seven-step progress */}
      <div className="flex items-center gap-3">
        <Link href="/learn" aria-label="Dersten çık" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink-soft hover:bg-surface">
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Link>
        <ol className="flex flex-1 gap-1.5" aria-label="Ders adımları">
          {STEPS.map((label, i) => (
            <li key={label} className="flex-1">
              <button
                type="button"
                onClick={() => i < step && go(i)}
                disabled={i >= step}
                aria-current={i === step ? "step" : undefined}
                aria-label={`${i + 1}. ${label}`}
                className={clsx("block h-2 w-full rounded-full transition-colors", i < step ? "bg-ink" : i === step ? "bg-akk" : "bg-line")}
              />
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        <span className="font-bold text-ink">{STEPS[step]}</span>
        <span className="text-ink-faint"> · {lesson.level} · </span>
        <span className="de" lang="de">{lesson.title}</span>
      </p>

      <section className="mt-6" key={`${step}-${sub}`}>
        {step === 0 && (
          <div className="anim-rise">
            <Visual id={lesson.intro.visual} />
            {lesson.intro.visual !== "room" && lesson.intro.visual !== "give-scene" && (
              <div className="mt-6 flex items-center justify-center gap-3 text-center">
                <div>
                  <p className="text-3xl sm:text-4xl"><Marked text={lesson.intro.sentence} /></p>
                  <p className="mt-1 text-ink-soft">{lesson.intro.tr}</p>
                </div>
                <SpeakButton text={plain(lesson.intro.sentence).replaceAll(" · ", ", ")} />
              </div>
            )}
            <p className="mx-auto mt-5 max-w-xl text-center text-lg">{lesson.intro.caption}</p>
          </div>
        )}

        {step === 1 && (
          <div className="anim-rise">
            {lesson.explain.visual && <Visual id={lesson.explain.visual} />}
            <ul className="mx-auto mt-6 max-w-xl space-y-3 text-lg">
              {lesson.explain.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-akk" aria-hidden />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            {lesson.explain.rule && (
              <p className="mx-auto mt-6 max-w-xl rounded-2xl bg-surface px-5 py-4 text-center text-xl leading-relaxed">
                <Marked text={lesson.explain.rule} />
              </p>
            )}
          </div>
        )}

        {step === 2 && <Examples lesson={lesson} />}

        {step === 3 && (
          <div className="anim-rise">
            <p className="mb-4 text-center text-lg">Resme dokun, Türkçesini gör. Sesi dinle.</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {vocab.map((w) => (
                <WordTile key={w.id} word={w} />
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <p className="mb-6 text-center text-sm font-bold text-ink-soft">Alıştırma {sub + 1} / {lesson.practice.length}</p>
            <ExerciseView key={`p${sub}`} ex={lesson.practice[sub]} onDone={(a) => onAnswer(lesson.practice[sub], a, "practice")} />
          </div>
        )}

        {step === 5 && (
          <div>
            <p className="mb-6 text-center text-sm font-bold text-ink-soft">Mini test {sub + 1} / {lesson.test.length}</p>
            <ExerciseView key={`t${sub}`} ex={lesson.test[sub]} onDone={(a) => onAnswer(lesson.test[sub], a, "test")} />
          </div>
        )}

        {step === 6 && (
          <Review
            lesson={lesson}
            wrong={wrong}
            score={testScore}
            retry={retry}
            setRetry={setRetry}
            onFinish={finish}
            next={next}
          />
        )}
      </section>

      {step < 4 && (
        <div className="mt-10 flex justify-center">
          <button type="button" onClick={() => go(step + 1)} className="w-full rounded-full bg-ink py-4 text-lg font-bold text-paper sm:w-auto sm:px-16">
            {step === 3 ? "Alıştırmaya başla" : "Devam"}
          </button>
        </div>
      )}
    </div>
  );
}

function Examples({ lesson }: { lesson: Lesson }) {
  const [shown, setShown] = useState<Record<number, boolean>>({});
  return (
    <div className="anim-rise">
      <p className="mb-5 text-center text-lg">Oku ve dinle. Türkçesini görmeden önce anlamaya çalış.</p>
      <ul className="space-y-3">
        {lesson.examples.map((e, i) => (
          <li key={e.de} className="flex items-start gap-3 rounded-3xl bg-white p-4 ring-1 ring-line sm:p-5">
            <SpeakButton text={plain(e.de)} />
            <div className="flex-1">
              <p className="text-2xl leading-snug sm:text-[1.7rem]"><Marked text={e.de} /></p>
              {shown[i] ? (
                <p className="mt-1 text-ink-soft">{e.tr}</p>
              ) : (
                <button type="button" onClick={() => setShown((s) => ({ ...s, [i]: true }))} className="mt-1 text-sm font-bold text-ink-faint underline-offset-4 hover:text-ink hover:underline">
                  Türkçesini göster
                </button>
              )}
              {e.note && <p className="mt-2 inline-block rounded-full bg-surface px-3 py-1 text-sm">{e.note}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Review({
  lesson,
  wrong,
  score,
  retry,
  setRetry,
  onFinish,
  next,
}: {
  lesson: Lesson;
  wrong: Wrong[];
  score: number;
  retry: Wrong[] | null;
  setRetry: (w: Wrong[] | null) => void;
  onFinish: () => void;
  next: { slug: string; titleTr: string } | null;
}) {
  const [i, setI] = useState(0);
  const [fixed, setFixed] = useState(0);
  const total = lesson.test.length;

  if (retry) {
    if (i >= retry.length) {
      return (
        <div className="anim-rise text-center">
          <p className="text-2xl font-bold">{fixed} / {retry.length} hata düzeldi.</p>
          <button type="button" onClick={onFinish} className="mt-8 rounded-full bg-ink px-12 py-4 text-lg font-bold text-paper">
            Dersi bitir
          </button>
        </div>
      );
    }
    return (
      <div>
        <p className="mb-6 text-center text-sm font-bold text-ink-soft">Tekrar {i + 1} / {retry.length}</p>
        <ExerciseView
          key={`r${i}`}
          ex={retry[i].ex}
          onDone={(a) => {
            if (a.correct) setFixed((f) => f + 1);
            setI(i + 1);
          }}
        />
      </div>
    );
  }

  return (
    <div className="anim-rise">
      <div className="text-center">
        <p className="text-sm font-bold text-ink-soft">Mini test sonucu</p>
        <p className="mt-1 text-6xl font-bold">
          {score}<span className="text-ink-faint"> / {total}</span>
        </p>
        <p className="mt-2 text-lg">{score === total ? "Harika, hiç hata yok!" : score >= total / 2 ? "İyi iş. Hatalarına bir bakalım." : "Sorun değil. Hatalar öğrenmenin parçası."}</p>
      </div>

      {wrong.length > 0 && (
        <ul className="mt-8 space-y-3">
          {wrong.map((w, k) => (
            <li key={k} className="rounded-3xl bg-white p-4 ring-1 ring-line">
              <p className="de text-lg" lang="de">{w.answer.prompt}</p>
              <p className="mt-1 text-sm">
                <span className="text-bad line-through">{w.answer.given}</span>
                <span className="mx-2 text-ink-faint">→</span>
                <b className="de text-ok" lang="de">{w.answer.expected}</b>
              </p>
              <p className="mt-1 text-sm text-ink-soft">{w.ex.why}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        {wrong.length > 0 && (
          <button type="button" onClick={() => setRetry(wrong)} className="w-full rounded-full border-2 border-ink px-8 py-3.5 text-lg font-bold sm:w-auto">
            Hatalarımı tekrar çöz
          </button>
        )}
        <button type="button" onClick={onFinish} className="w-full rounded-full bg-ink px-10 py-4 text-lg font-bold text-paper sm:w-auto">
          {next ? "Bitir ve sonraki derse geç" : "Dersi bitir"}
        </button>
      </div>
      {next && <p className="mt-3 text-center text-sm text-ink-soft">Sıradaki: {next.titleTr}</p>}
      <p className="mt-6 text-center text-sm text-ink-soft">
        Hataların kaydedildi. <Link href="/practice" className="font-bold underline underline-offset-4">Pratik</Link> ve{" "}
        <Link href="/teacher" className="font-bold underline underline-offset-4">Öğretmen</Link> bölümleri bunları kullanır.
      </p>
    </div>
  );
}
