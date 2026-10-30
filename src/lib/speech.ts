"use client";
/**
 * Browser speech helpers. Text-to-speech uses the Web Speech API with a German voice;
 * speech-to-text uses SpeechRecognition where the browser offers it (Chrome, Edge, Safari).
 */

let cachedVoice: SpeechSynthesisVoice | null | undefined;

function germanVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  if (cachedVoice !== undefined && cachedVoice !== null) return cachedVoice;
  const voices = window.speechSynthesis.getVoices();
  const de = voices.filter((v) => v.lang?.toLowerCase().startsWith("de"));
  cachedVoice = de.find((v) => /google|natural|neural|anna|helena|katja/i.test(v.name)) ?? de[0] ?? null;
  return cachedVoice;
}

export function canSpeak() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speak(text: string, opts: { rate?: number; pitch?: number; onEnd?: () => void; queue?: boolean } = {}) {
  if (!canSpeak()) return;
  const synth = window.speechSynthesis;
  if (!opts.queue) synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "de-DE";
  u.rate = opts.rate ?? 0.9;
  u.pitch = opts.pitch ?? 1;
  const v = germanVoice();
  if (v) u.voice = v;
  if (opts.onEnd) u.onend = opts.onEnd;
  synth.speak(u);
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = undefined;
  };
}

type Recognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

export function canListen() {
  if (typeof window === "undefined") return false;
  const w = window as unknown as Record<string, unknown>;
  return Boolean(w.SpeechRecognition || w.webkitSpeechRecognition);
}

/** Starts listening. Returns a stop function. */
export function listen(handlers: {
  onText: (text: string, final: boolean) => void;
  onEnd: () => void;
  onError: (error: string) => void;
}): () => void {
  const w = window as unknown as Record<string, new () => Recognition>;
  const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
  if (!Ctor) {
    handlers.onError("unsupported");
    return () => {};
  }
  const rec = new Ctor();
  rec.lang = "de-DE";
  rec.interimResults = true;
  rec.continuous = false;
  rec.onresult = (e) => {
    let text = "";
    let final = false;
    for (let i = 0; i < e.results.length; i++) {
      text += e.results[i][0].transcript;
      if (e.results[i].isFinal) final = true;
    }
    handlers.onText(text.trim(), final);
  };
  rec.onerror = (e) => handlers.onError(e.error);
  rec.onend = () => handlers.onEnd();
  rec.start();
  return () => rec.stop();
}

/** Reads a dialogue line by line with a different pitch per speaker. */
export function playLines(lines: { speaker: string; de: string }[], onEnd?: () => void) {
  if (!canSpeak()) return onEnd?.();
  window.speechSynthesis.cancel();
  const pitch: Record<string, number> = { A: 1.15, B: 0.8, N: 1 };
  lines.forEach((l, i) =>
    speak(l.de, { queue: true, pitch: pitch[l.speaker] ?? 1, rate: 0.88, onEnd: i === lines.length - 1 ? onEnd : undefined }),
  );
}

export function stopSpeaking() {
  if (canSpeak()) window.speechSynthesis.cancel();
}
