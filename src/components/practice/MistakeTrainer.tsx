"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Exercise } from "@/content/types";
import { ExerciseView } from "@/components/lesson/ExerciseView";
import { recordMistake } from "@/lib/store";

type Mistake = { id: string; topic: string; prompt: string; given: string; expected: string; note: string | null; source: string };

export function MistakeTrainer() {
  const [mistakes, setMistakes] = useState<Mistake[] | null>(null);
  const [mode, setMode] = useState<"list" | "loading" | "drill">("list");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [source, setSource] = useState("");
  const [i, setI] = useState(0);
  const [right, setRight] = useState(0);

  useEffect(() => {
    fetch("/api/mistakes").then((r) => r.json()).then((d) => setMistakes(d.mistakes)).catch(() => setMistakes([]));
  }, []);

  const start = async () => {
    setMode("loading");
    const d = await fetch("/api/exercises", { method: "POST" }).then((r) => r.json()).catch(() => ({ exercises: [] }));
    setExercises(d.exercises);
    setSource(d.source);
    setI(0);
    setRight(0);
    setMode("drill");
  };

  const resolve = async (id: string) => {
    await fetch("/api/mistakes", { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ id, resolved: true }) });
    setMistakes((m) => m?.filter((x) => x.id !== id) ?? null);
  };

  if (mode === "loading") return <p className="py-20 text-center text-lg text-ink-soft">Sana özel alıştırmalar hazırlanıyor…</p>;

  if (mode === "drill") {
    if (i >= exercises.length)
      return (
        <div className="mx-auto max-w-md py-10 text-center">
          <p className="text-5xl font-bold">{right}<span className="text-ink-faint"> / {exercises.length}</span></p>
          <p className="mt-2 text-lg">Hatalarını düzelttiğini düşünüyorsan listeden “Öğrendim” diyebilirsin.</p>
          <button type="button" onClick={() => setMode("list")} className="mt-8 rounded-full bg-ink px-10 py-3.5 font-bold text-paper">Listeye dön</button>
        </div>
      );
    return (
      <div className="mx-auto max-w-3xl">
        <p className="mb-6 text-center text-sm font-bold text-ink-soft">
          {source === "ai" ? "Yapay zekânın senin için yazdığı" : "Hatalarına uygun"} alıştırma {i + 1} / {exercises.length}
        </p>
        <ExerciseView
          key={i}
          ex={exercises[i]}
          onDone={(a) => {
            if (a.correct) setRight((r) => r + 1);
            else void recordMistake({ source: "practice", topic: "kişisel alıştırma", prompt: a.prompt, given: a.given, expected: a.expected, note: exercises[i].why });
            setI(i + 1);
          }}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/practice" className="text-sm text-ink-soft hover:text-ink">← Pratik</Link>
      <h1 className="mt-2 text-3xl font-bold">Hataların</h1>
      {mistakes === null ? (
        <p className="mt-6 text-ink-soft">Yükleniyor…</p>
      ) : mistakes.length === 0 ? (
        <p className="mt-6 text-lg">Açık hatan kalmadı. Harika!</p>
      ) : (
        <>
          <button type="button" onClick={start} className="mt-5 w-full rounded-full bg-ink py-4 text-lg font-bold text-paper sm:w-auto sm:px-12">
            Bana özel alıştırma hazırla
          </button>
          <ul className="mt-8 space-y-3">
            {mistakes.map((m) => (
              <li key={m.id} className="rounded-3xl bg-white p-4 ring-1 ring-line">
                <p className="text-xs font-bold text-ink-faint">{m.topic}</p>
                <p className="de mt-1 text-lg" lang="de">{m.prompt}</p>
                <p className="mt-1">
                  <span className="text-bad line-through">{m.given}</span>
                  <span className="mx-2 text-ink-faint">→</span>
                  <b className="de text-ok" lang="de">{m.expected}</b>
                </p>
                {m.note && <p className="mt-1 text-sm text-ink-soft">{m.note}</p>}
                <div className="mt-3 flex gap-4 text-sm font-bold">
                  <button type="button" onClick={() => resolve(m.id)} className="text-ok hover:underline">Öğrendim</button>
                  <Link href={`/teacher?q=${encodeURIComponent(`Bunu neden yanlış yaptım? "${m.prompt}" → ben "${m.given}" dedim, doğrusu "${m.expected}".`)}`} className="text-ink-soft hover:underline">
                    Öğretmene sor
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
