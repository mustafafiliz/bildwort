"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { RichText } from "./RichText";
import { LOOKS, Person } from "@/components/illustrations/people";
import { canListen, listen } from "@/lib/speech";

type Msg = { id?: string; role: "user" | "assistant"; content: string };

const STARTERS = [
  "Akkusativ'i bir resimle anlat",
  "Wo? ve Wohin? farkı ne?",
  "Düzelt: Ich gebe der Mann ein Apfel.",
  "Hatalarıma göre bana 3 soru sor",
];

export function TeacherChat() {
  const params = useSearchParams();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [input, setInput] = useState(params.get("q") ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [mic, setMic] = useState(false);
  const stopRef = useRef<() => void>(() => {});
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/teacher")
      .then((r) => r.json())
      .then((d) => {
        setMessages(d.messages);
        setEnabled(d.enabled);
      })
      .catch(() => setEnabled(false));
  }, []);

  useEffect(() => setMic(canListen()), []);
  useEffect(() => {
    // scrollIntoView may return a Promise in newer browsers; never return it from an effect.
    end.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const send = async (text: string) => {
    const message = text.trim();
    if (!message || busy) return;
    setError(null);
    setInput("");
    setBusy(true);
    setMessages((m) => [...m, { role: "user", content: message }, { role: "assistant", content: "" }]);
    try {
      const res = await fetch("/api/teacher", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message, context: params.get("topic") ?? undefined }),
      });
      if (!res.ok || !res.body) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error ?? "Öğretmene ulaşılamadı. Lütfen tekrar dene.");
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = dec.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: copy[copy.length - 1].content + chunk };
          return copy;
        });
      }
    } catch (e) {
      setError((e as Error).message);
      setMessages((m) => m.slice(0, -1));
    } finally {
      setBusy(false);
    }
  };

  const toggleMic = () => {
    if (listening) {
      stopRef.current();
      return;
    }
    setListening(true);
    stopRef.current = listen({
      onText: (t) => setInput(t),
      onEnd: () => setListening(false),
      onError: () => setListening(false),
    });
  };

  const clear = async () => {
    await fetch("/api/teacher", { method: "DELETE" });
    setMessages([]);
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col">
      <div className="flex items-center gap-4">
        <svg viewBox="-60 -215 120 225" className="h-24 w-16 shrink-0" aria-hidden>
          <Person x={0} y={0} scale={1} look={LOOKS.lena} armPose="wave" />
        </svg>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Öğretmenin Lena</h1>
          <p className="text-ink-soft">Kısa, Türkçe açıklamalar. Hatalarını hatırlar.</p>
        </div>
        {messages.length > 0 && (
          <button type="button" onClick={clear} className="text-sm text-ink-faint hover:text-ink">
            Sohbeti temizle
          </button>
        )}
      </div>

      {enabled === false && (
        <p className="mt-6 rounded-2xl bg-akk-soft p-4 text-[0.95rem]">
          Yapay zekâ öğretmen bu sunucuda henüz açık değil (ANTHROPIC_API_KEY eksik). Dersler, kelime kartları ve sınavlar normal çalışır.
        </p>
      )}

      <div className="mt-6 space-y-4" aria-live="polite">
        {messages.length === 0 && enabled !== false && (
          <div className="rounded-3xl bg-surface p-5">
            <p className="text-lg">Merhaba! Ne öğrenmek istersin? Almanca bir cümle yazarsan düzeltirim.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {STARTERS.map((s) => (
                <button key={s} type="button" onClick={() => send(s)} className="rounded-full bg-white px-4 py-2 text-left ring-1 ring-line hover:ring-ink-faint">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={m.id ?? i} className={clsx("flex", m.role === "user" ? "justify-end" : "justify-start")}>
            <div className={clsx("max-w-[88%] rounded-3xl px-5 py-3.5 text-[1.05rem]", m.role === "user" ? "bg-ink text-paper" : "bg-white ring-1 ring-line")}>
              {m.role === "assistant" ? (
                m.content ? <RichText text={m.content} /> : <span className="inline-flex gap-1 py-2" aria-label="Yazıyor"><Dot /><Dot d={150} /><Dot d={300} /></span>
              ) : (
                <p className="whitespace-pre-wrap">{m.content}</p>
              )}
            </div>
          </div>
        ))}
        <div ref={end} />
      </div>

      {error && <p className="mt-4 rounded-2xl bg-bad-soft p-3 text-bad" role="alert">{error}</p>}

      <form
        className="sticky bottom-20 mt-6 flex items-end gap-2 rounded-[28px] bg-white p-2 shadow-[0_2px_12px_rgba(30,39,51,.08)] ring-1 ring-line md:bottom-4"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
      >
        {mic && (
          <button
            type="button"
            onClick={toggleMic}
            aria-pressed={listening}
            aria-label={listening ? "Dinlemeyi durdur" : "Almanca konuş"}
            className={clsx("flex h-12 w-12 shrink-0 items-center justify-center rounded-full", listening ? "bg-die text-white" : "bg-surface text-ink")}
          >
            <MicIcon />
          </button>
        )}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send(input);
            }
          }}
          rows={1}
          placeholder="Bir soru sor veya Almanca bir cümle yaz"
          aria-label="Mesajın"
          className="max-h-40 min-h-12 flex-1 resize-none bg-transparent px-2 py-3 outline-none"
        />
        <button type="submit" disabled={busy || !input.trim() || enabled === false} className="h-12 shrink-0 rounded-full bg-ink px-5 font-bold text-paper disabled:opacity-30">
          Gönder
        </button>
      </form>
    </div>
  );
}

function Dot({ d = 0 }: { d?: number }) {
  return <span className="h-2 w-2 animate-bounce rounded-full bg-ink-faint" style={{ animationDelay: `${d}ms` }} />;
}

export function MicIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" />
      <path d="M6 11a6 6 0 0012 0M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
