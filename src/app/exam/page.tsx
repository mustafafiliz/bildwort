import Link from "next/link";
import clsx from "clsx";
import { EXAMS } from "@/content/exams";

export const metadata = { title: "Sınav hazırlığı · Bildwort" };

export default function ExamIndex() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold">Sınav hazırlığı</h1>
      <p className="mt-1 text-ink-soft">Goethe ve telc sınavlarının yapısı farklıdır. Hedeflediğin sınavı seç.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {EXAMS.map((e) => (
          <Link
            key={e.id}
            href={`/exam/${e.id}`}
            className={clsx("rounded-[28px] p-6 ring-1 transition hover:ring-ink-faint", e.provider === "Goethe" ? "bg-white ring-line" : "bg-surface ring-line")}
          >
            <span className={clsx("inline-block rounded-full px-3 py-1 text-sm font-bold", e.provider === "Goethe" ? "bg-das-soft text-das" : "bg-der-soft text-der")}>
              {e.provider}
            </span>
            <p className="mt-3 text-4xl font-bold">{e.level}</p>
            <p className="mt-1 font-bold">{e.title}</p>
            <p className="mt-2 text-sm text-ink-soft">{e.sections.map((s) => s.nameDe).join(", ")}</p>
          </Link>
        ))}
      </div>
      <div className="mt-10 grid gap-4 text-[0.95rem] sm:grid-cols-2">
        <div className="rounded-3xl bg-das-soft p-5">
          <p className="font-bold text-das">Goethe</p>
          <p className="mt-1">B1 modülerdir: her beceri ayrı alınabilir. Yazmada birden fazla kısa görev (A2: SMS ve e-posta, B1: üç metin) vardır.</p>
        </div>
        <div className="rounded-3xl bg-der-soft p-5">
          <p className="font-bold text-der">telc</p>
          <p className="mt-1">B1'de Sprachbausteine (boşluk doldurma) bölümü vardır. Yazmada tek bir mektup/e-posta, verilen noktalara göre yazılır.</p>
        </div>
      </div>
      <p className="mt-6 text-sm text-ink-faint">Tüm alıştırmalar Bildwort için özgün olarak yazılmıştır ve sınavların herkese açık biçimini örnek alır. Sınavdan önce resmî örnek testlere de bak.</p>
    </div>
  );
}
