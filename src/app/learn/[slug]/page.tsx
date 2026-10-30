import { notFound } from "next/navigation";
import { LESSONS, LESSONS_BY_SLUG } from "@/content/lessons";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return LESSONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = LESSONS_BY_SLUG[slug];
  return { title: l ? `${l.titleTr} · Bildwort` : "Bildwort" };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = LESSONS_BY_SLUG[slug];
  if (!lesson) notFound();
  const i = LESSONS.indexOf(lesson);
  const n = LESSONS[i + 1];
  return <LessonPlayer lesson={lesson} next={n ? { slug: n.slug, titleTr: n.titleTr } : null} />;
}
