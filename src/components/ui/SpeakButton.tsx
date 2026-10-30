"use client";
import { useState } from "react";
import clsx from "clsx";
import { speak } from "@/lib/speech";

export function SpeakButton({ text, label = "Dinle", className, size = "md" }: { text: string; label?: string; className?: string; size?: "sm" | "md" | "lg" }) {
  const [playing, setPlaying] = useState(false);
  const dim = size === "lg" ? "h-14 w-14" : size === "sm" ? "h-9 w-9" : "h-11 w-11";
  return (
    <button
      type="button"
      aria-label={`${label}: ${text}`}
      title={label}
      onClick={(e) => {
        e.stopPropagation();
        setPlaying(true);
        speak(text, { onEnd: () => setPlaying(false) });
        setTimeout(() => setPlaying(false), Math.max(1500, text.length * 90));
      }}
      className={clsx(
        "inline-flex shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-ink-faint active:scale-95",
        playing && "border-der text-der",
        dim,
        className,
      )}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
        <path d="M15.5 9a4 4 0 010 6M18 6.5a7.5 7.5 0 010 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={playing ? "opacity-100" : "opacity-60"} />
      </svg>
    </button>
  );
}
