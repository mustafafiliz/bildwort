import Link from "next/link";
import { ObjectArt } from "@/components/illustrations/objects";
import { TOPICS, WORDS } from "@/content/vocabulary";
import { ReviewStart } from "@/components/vocab/ReviewStart";

export const metadata = { title: "Kelimeler · Bildwort" };

export default function VocabularyPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <ReviewStart />
      <h2 className="mt-12 text-xl font-bold">Konular</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {TOPICS.map((t) => (
          <Link key={t.id} href={`/vocabulary/${t.id}`} className="flex flex-col items-center rounded-[24px] bg-white p-4 text-center ring-1 ring-line hover:ring-ink-faint">
            <ObjectArt id={t.art} className="w-24" />
            <span className="mt-1 font-bold">{t.tr}</span>
            <span className="de text-sm text-ink-soft" lang="de">{t.de} · {WORDS.filter((w) => w.topic === t.id).length}</span>
          </Link>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-ink-soft" aria-label="Renk anahtarı">
        <span><b className="text-der">der</b> eril</span>
        <span><b className="text-die">die</b> dişil</span>
        <span><b className="text-das">das</b> nötr</span>
        <span><b className="text-pl">die</b> çoğul</span>
      </div>
    </div>
  );
}
