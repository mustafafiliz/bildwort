"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { SCENARIOS_BY_ID } from "@/content/scenarios";
import { LOOKS, Person } from "@/components/illustrations/people";
import { INK, OBJECTS } from "@/components/illustrations/objects";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { MicIcon } from "@/components/teacher/TeacherChat";
import { canListen, listen, speak } from "@/lib/speech";

type Turn = {
  role: "partner" | "user";
  de: string;
  tr?: string;
  correction?: { original: string; corrected: string; explanationTr: string } | null;
};

export function SpeakingRoom({ id }: { id: string }) {
  const sc = SCENARIOS_BY_ID[id];
  const [turns, setTurns] = useState<Turn[]>([{ role: "partner", de: sc.opener.de, tr: sc.opener.tr }]);
  const [draft, setDraft] = useState("");
  const [listening, setListening] = useState(false);
  const [mic, setMic] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [scripted, setScripted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTr, setShowTr] = useState(false);
  const stop = useRef<() => void>(() => {});
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => setMic(canListen()), []);
  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [turns]);

  const lastPartner = [...turns].reverse().find((t) => t.role === "partner")!;
  const speakingNow = busy ? "partner" : turns[turns.length - 1].role === "user" ? "user" : "partner";

  const send = async (text: string) => {
    const utterance = text.trim();
    if (!utterance || busy) return;
    setError(null);
    setDraft("");
    const history = turns.map((t) => ({ role: t.role, de: t.de }));
    setTurns((t) => [...t, { role: "user", de: utterance }]);
    setBusy(true);
    try {
      const res = await fetch("/api/speak", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ scenario: id, history, utterance }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error ?? "Bir sorun oluştu.");
      setScripted(Boolean(d.scripted));
      setTurns((t) => {
        const copy = [...t];
        copy[copy.length - 1] = { ...copy[copy.length - 1], correction: d.correction };
        return [...copy, { role: "partner", de: d.reply, tr: d.replyTr }];
      });
      if (d.done) setDone(true);
      speak(d.reply);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const toggleMic = () => {
    if (listening) return stop.current();
    setError(null);
    setListening(true);
    let finalText = "";
    stop.current = listen({
      onText: (t, final) => {
        setDraft(t);
        if (final) finalText = t;
      },
      onEnd: () => {
        setListening(false);
        if (finalText) void send(finalText);
      },
      onError: (e) => {
        setListening(false);
        if (e === "not-allowed") setError("Mikrofon izni verilmedi. Cümleni aşağıya yazabilirsin.");
      },
    });
  };

  const corrections = turns.filter((t) => t.correction).length;

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/practice" className="text-sm text-ink-soft hover:text-ink">← Pratik</Link>
      <h1 className="mt-2 text-2xl font-bold">{sc.titleTr} <span className="de font-normal text-ink-soft" lang="de">· {sc.titleDe}</span></h1>
      <p className="text-ink-soft">{sc.goalTr}</p>

      {/* The scene: you on the left, your partner on the right */}
      <div className="mt-5 overflow-hidden rounded-[28px] bg-[#f4efe6]">
        <svg viewBox="0 0 600 300" className="block w-full" role="img" aria-label={`Sen ve ${sc.partner.name}`}>
          <rect x="0" y="260" width="600" height="40" fill="#e7dccb" />
          <path d="M0 260h600" stroke={INK} strokeWidth="3" />
          {sc.props.map((p, i) => (
            <g key={p} transform={`translate(${250 + i * 56} ${196}) scale(.3)`}>{OBJECTS[p]}</g>
          ))}
          <Person x={130} y={260} scale={0.95} look={LOOKS.ayse} armPose={speakingNow === "user" ? "wave" : "down"} mouth={listening ? "open" : "smile"} />
          <Person x={480} y={260} scale={0.95} look={sc.partner.look} facing="left" mouth={speakingNow === "partner" ? "open" : "smile"} />
          <text x="130" y="290" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="15" fill="#5b6573">Sen</text>
          <text x="480" y="290" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="15" fill="#5b6573">{sc.partner.name}</text>
        </svg>
      </div>

      {/* Partner's current line, big */}
      <div className="mt-5 flex items-start gap-3 rounded-3xl bg-white p-5 ring-1 ring-line">
        <SpeakButton text={lastPartner.de} />
        <div>
          <p className="de text-2xl leading-snug" lang="de">{busy ? "…" : lastPartner.de}</p>
          {showTr && !busy && lastPartner.tr && <p className="mt-1 text-ink-soft">{lastPartner.tr}</p>}
          <button type="button" onClick={() => setShowTr((s) => !s)} className="mt-1 text-sm font-bold text-ink-faint hover:text-ink">
            {showTr ? "Çeviriyi gizle" : "Türkçesini göster"}
          </button>
        </div>
      </div>

      {/* Controls */}
      {!done ? (
        <div className="mt-6 flex flex-col items-center">
          {mic && (
            <button
              type="button"
              onClick={toggleMic}
              disabled={busy}
              aria-pressed={listening}
              aria-label={listening ? "Dinlemeyi durdur" : "Konuşmaya başla"}
              className={clsx(
                "flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg transition disabled:opacity-40 [&_svg]:h-9 [&_svg]:w-9",
                listening ? "scale-110 bg-die ring-8 ring-die-soft" : "bg-ink",
              )}
            >
              <MicIcon />
            </button>
          )}
          <p className="mt-2 text-sm text-ink-soft">{listening ? "Dinliyorum… Almanca konuş." : mic ? "Bas ve konuş" : "Bu tarayıcıda mikrofon yok. Cümleni yaz."}</p>
          <form
            className="mt-4 flex w-full gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              void send(draft);
            }}
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="…veya buraya Almanca yaz"
              aria-label="Cevabın"
              lang="de"
              className="de min-w-0 flex-1 rounded-full border-2 border-line bg-white px-5 py-3 text-lg outline-none focus:border-der"
            />
            <button type="submit" disabled={busy || !draft.trim()} className="rounded-full bg-ink px-6 font-bold text-paper disabled:opacity-30">
              Gönder
            </button>
          </form>
          <div className="mt-4 flex flex-wrap justify-center gap-2" aria-label="Yardımcı cümleler">
            {sc.hints.map((h) => (
              <button key={h.de} type="button" onClick={() => setDraft(h.de)} title={h.tr} className="de rounded-full bg-surface px-3.5 py-1.5 text-[0.98rem] hover:bg-line" lang="de">
                {h.de}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="anim-rise mt-6 rounded-3xl bg-ok-soft p-5 text-center">
          <p className="text-xl font-bold">Konuşma tamamlandı!</p>
          <p className="mt-1">{corrections === 0 ? "Hiç düzeltme gerekmedi. Harika!" : `${corrections} cümlede düzeltme var. Aşağıda görebilirsin.`}</p>
          <button type="button" onClick={() => { setTurns([{ role: "partner", de: sc.opener.de, tr: sc.opener.tr }]); setDone(false); }} className="mt-4 rounded-full bg-ink px-8 py-3 font-bold text-paper">
            Baştan konuş
          </button>
        </div>
      )}

      {error && <p className="mt-4 rounded-2xl bg-bad-soft p-3 text-bad" role="alert">{error}</p>}
      {scripted && <p className="mt-4 text-center text-sm text-ink-faint">Yapay zekâ kapalı: karşındaki hazır bir senaryoyu izliyor ve düzeltme yapmıyor.</p>}

      {/* Transcript */}
      <h2 className="mt-10 text-lg font-bold">Konuşma metni</h2>
      <ol className="mt-3 space-y-3">
        {turns.map((t, i) => (
          <li key={i} className={clsx("flex", t.role === "user" ? "justify-end" : "justify-start")}>
            <div className={clsx("max-w-[85%] rounded-3xl px-4 py-3", t.role === "user" ? "bg-ink text-paper" : "bg-white ring-1 ring-line")}>
              <p className="de text-lg" lang="de">{t.de}</p>
              {t.role === "partner" && t.tr && <p className="text-sm text-ink-soft">{t.tr}</p>}
              {t.correction && (
                <div className="mt-2 rounded-2xl bg-paper p-3 text-ink">
                  <p className="text-sm font-bold text-akk">Düzeltme</p>
                  <p className="de text-lg text-ok" lang="de">{t.correction.corrected}</p>
                  <p className="text-sm text-ink-soft">{t.correction.explanationTr}</p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
      <div ref={end} />
    </div>
  );
}
