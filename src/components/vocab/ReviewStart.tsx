"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ObjectArt } from "@/components/illustrations/objects";

export function ReviewStart() {
  const [data, setData] = useState<{ queue: unknown[]; learned: number; dueCount: number; total: number } | null>(null);
  useEffect(() => {
    fetch("/api/cards").then((r) => r.json()).then(setData).catch(() => {});
  }, []);
  return (
    <section className="rounded-[32px] bg-der-soft p-6 text-center sm:p-8">
      <div className="flex justify-center -space-x-6">
        <ObjectArt id="apfel" className="w-24 -rotate-6" />
        <ObjectArt id="lampe" className="w-24" />
        <ObjectArt id="buch" className="w-24 rotate-6" />
      </div>
      <h1 className="mt-2 text-3xl font-bold">Kelime kartları</h1>
      <p className="mt-1 text-lg">
        {data
          ? data.queue.length > 0
            ? `Bugün ${data.queue.length} kart seni bekliyor.`
            : "Bugünlük hepsi bu. Yarın tekrar gel."
          : "Kartlar hazırlanıyor…"}
      </p>
      {data && <p className="text-sm text-ink-soft">{data.learned} / {data.total} kelime öğrenildi</p>}
      <Link href="/vocabulary/review" className="mt-6 inline-block w-full rounded-full bg-ink py-4 text-lg font-bold text-paper sm:w-auto sm:px-16">
        Tekrara başla
      </Link>
    </section>
  );
}
