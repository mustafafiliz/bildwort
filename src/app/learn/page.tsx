import Link from "next/link";
import clsx from "clsx";
import { LEVELS } from "@/content/types";
import { LEVEL_INFO, LESSONS, lessonsFor } from "@/content/lessons";
import { currentLesson, getServerProgress } from "@/lib/progress-server";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dersler · Bildwort" };

export default async function LearnIndex() {
  const { rows } = await getServerProgress();
  const { lesson: current, done } = currentLesson(rows);
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold">Dersler</h1>
      <p className="mt-1 text-ink-soft">Her ders yedi kısa adımdan oluşur: resim, açıklama, örnek, kelime, alıştırma, test, hatalar.</p>
      {LEVELS.map((level) => (
        <section key={level} className="mt-10">
          <h2 className="flex items-baseline gap-3 text-xl font-bold">
            {level}
            <span className="text-base font-normal text-ink-soft">{LEVEL_INFO[level].tr}</span>
          </h2>
          <ol className="mt-3 divide-y divide-line rounded-3xl bg-white ring-1 ring-line">
            {lessonsFor(level).map((l) => {
              const n = LESSONS.indexOf(l) + 1;
              const isDone = done.has(l.slug);
              const isCurrent = l.slug === current.slug;
              return (
                <li key={l.slug}>
                  <Link href={`/learn/${l.slug}`} className="flex items-center gap-4 px-4 py-4 hover:bg-surface sm:px-5">
                    <span
                      className={clsx(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                        isDone ? "bg-ok text-white" : isCurrent ? "bg-akk text-white" : "bg-surface text-ink-soft",
                      )}
                      aria-label={isDone ? "Tamamlandı" : isCurrent ? "Sıradaki ders" : undefined}
                    >
                      {isDone ? (
                        <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden><path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      ) : (
                        n
                      )}
                    </span>
                    <span className="flex-1">
                      <span className="block font-bold">{l.titleTr}</span>
                      <span className="de block text-ink-soft" lang="de">{l.title}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
