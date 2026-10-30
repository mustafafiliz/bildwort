import Link from "next/link";
import { SCENARIOS } from "@/content/scenarios";
import { ObjectArt } from "@/components/illustrations/objects";
import { Person } from "@/components/illustrations/people";
import { MistakeCount } from "@/components/practice/MistakeCount";

export const metadata = { title: "Pratik · Bildwort" };

export default function PracticePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <MistakeCount />

      <h2 className="mt-12 text-2xl font-bold">Konuşma pratiği</h2>
      <p className="text-ink-soft">Mikrofona bas, Almanca konuş. Karşındaki cevap verir, hatalarını düzeltir.</p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {SCENARIOS.map((s) => (
          <li key={s.id}>
            <Link href={`/practice/speak/${s.id}`} className="flex items-center gap-3 rounded-[24px] bg-white p-3 ring-1 ring-line hover:ring-ink-faint">
              <svg viewBox="-60 -215 120 225" className="h-20 w-12 shrink-0" aria-hidden>
                <Person x={0} y={0} look={s.partner.look} />
              </svg>
              <span className="flex-1">
                <span className="block font-bold">{s.titleTr}</span>
                <span className="de block text-ink-soft" lang="de">{s.titleDe}</span>
                <span className="text-xs text-ink-faint">{s.level}</span>
              </span>
              <ObjectArt id={s.props[0]} className="w-14 shrink-0" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
