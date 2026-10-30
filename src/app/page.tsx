import Link from "next/link";
import { Visual } from "@/components/visuals/Visual";
import { LESSONS } from "@/content/lessons";
import { currentLesson, getServerProgress } from "@/lib/progress-server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { rows } = await getServerProgress();
  const { lesson, done, resumeStep } = currentLesson(rows);
  const index = LESSONS.findIndex((l) => l.slug === lesson.slug);
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm text-ink-soft">
        {lesson.level} · Ders {index + 1} / {LESSONS.length}
        {done.size > 0 && <span className="text-ink-faint"> · {done.size} ders tamamlandı</span>}
      </p>
      <h1 className="mt-1 text-3xl font-bold sm:text-4xl">{lesson.titleTr}</h1>
      <p className="de mt-1 text-xl text-ink-soft" lang="de">{lesson.title}</p>

      <div className="mt-6">
        <Visual id={lesson.intro.visual} />
      </div>

      <p className="mx-auto mt-6 max-w-xl text-center text-xl">{lesson.goalTr}</p>

      <div className="mt-8 flex flex-col items-center gap-4">
        <Link href={`/learn/${lesson.slug}`} className="w-full rounded-full bg-ink py-4 text-center text-lg font-bold text-paper sm:w-auto sm:px-20">
          {resumeStep > 0 ? "Kaldığın yerden devam et" : "Derse başla"}
        </Link>
        <Link href="/learn" className="text-ink-soft underline-offset-4 hover:text-ink hover:underline">
          Tüm dersler
        </Link>
      </div>
    </div>
  );
}
