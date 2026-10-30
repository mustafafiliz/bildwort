import Link from "next/link";
import { notFound } from "next/navigation";
import { TOPICS, WORDS } from "@/content/vocabulary";
import { TopicBrowser } from "@/components/vocab/TopicBrowser";

export function generateStaticParams() {
  return TOPICS.map((t) => ({ topic: t.id }));
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const t = TOPICS.find((x) => x.id === topic);
  if (!t) notFound();
  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/vocabulary" className="text-sm text-ink-soft hover:text-ink">← Kelimeler</Link>
      <h1 className="mt-2 text-3xl font-bold">{t.tr}</h1>
      <p className="de text-lg text-ink-soft" lang="de">{t.de}</p>
      <TopicBrowser words={WORDS.filter((w) => w.topic === t.id)} topic={t.id} />
    </div>
  );
}
