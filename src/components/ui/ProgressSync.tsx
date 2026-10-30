"use client";
import { useEffect } from "react";
import { useProgress } from "@/lib/store";

/** Loads server progress once (also creates the anonymous learner cookie on first visit). */
export function ProgressSync() {
  const hydrate = useProgress((s) => s.hydrate);
  useEffect(() => {
    fetch("/api/progress")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && hydrate(d.lessons))
      .catch(() => {});
  }, [hydrate]);
  return null;
}
