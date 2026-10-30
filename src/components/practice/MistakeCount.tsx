"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export function MistakeCount() {
  const [n, setN] = useState<number | null>(null);
  useEffect(() => {
    fetch("/api/mistakes").then((r) => r.json()).then((d) => setN(d.mistakes.length)).catch(() => setN(0));
  }, []);
  return (
    <section className="rounded-[32px] bg-akk-soft p-6 sm:p-8">
      <h1 className="text-3xl font-bold">Hatalarından öğren</h1>
      <p className="mt-1 text-lg">
        {n === null ? "Hataların yükleniyor…" : n === 0 ? "Kayıtlı hatan yok. Bir ders veya test bitirince burada görünürler." : `${n} hatan seni bekliyor. Onlardan sana özel alıştırma hazırlayalım.`}
      </p>
      {n !== null && n > 0 && (
        <Link href="/practice/mistakes" className="mt-5 inline-block w-full rounded-full bg-ink py-4 text-center text-lg font-bold text-paper sm:w-auto sm:px-14">
          Hatalarımı çalış
        </Link>
      )}
    </section>
  );
}
