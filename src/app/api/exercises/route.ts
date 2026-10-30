import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getOrCreateUserId } from "@/lib/user";
import { askJson, getClaude, VISUAL_FORMAT } from "@/lib/ai";
import { LESSONS } from "@/content/lessons";
import type { Exercise } from "@/content/types";

const Ex = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("choice"), q: z.string(), tr: z.string().optional(), options: z.array(z.string()).min(2).max(4), answer: z.number().int().min(0), why: z.string() }),
  z.object({ kind: z.literal("type"), q: z.string(), tr: z.string().optional(), answers: z.array(z.string()).min(1), why: z.string() }),
]);
const Out = z.object({ exercises: z.array(Ex).min(1).max(8) });

/** Personalised exercises: AI-generated from the learner's mistakes, or matching lesson exercises as a fallback. */
export async function POST() {
  const userId = await getOrCreateUserId();
  const mistakes = await prisma.mistake.findMany({ where: { userId, resolved: false }, orderBy: { createdAt: "desc" }, take: 15 });
  if (mistakes.length === 0) return NextResponse.json({ exercises: [], source: "none" });

  if (getClaude()) {
    const system = `Sen Türk öğrenciler için Almanca alıştırma yazan bir öğretmensin. Öğrencinin hatalarına bak, aynı kuralları çalıştıran 5 YENİ alıştırma yaz (hataları kopyalama).
Biçim: "choice" (q içinde tam bir "___" boşluğu, 3 seçenek, answer = doğru seçeneğin indeksi) veya "type" (q içinde "___", answers = kabul edilen cevaplar). "tr" = cümlenin Türkçesi. "why" = tek kısa Türkçe açıklama.
q içinde renk etiketleri kullanabilirsin ama boşluğun kendisini etiketleme.
${VISUAL_FORMAT}
Her Almanca cümle kusursuz ve doğal olmalı. Seviye A1–A2.
SADECE JSON döndür: {"exercises": [...]}`;
    const list = mistakes.map((m) => `- konu: ${m.topic} | soru: ${m.prompt} | verdiği: ${m.given} | doğrusu: ${m.expected}`).join("\n");
    try {
      const out = Out.safeParse(await askJson(system, `Öğrencinin hataları:\n${list}`, 1600));
      if (out.success) {
        const valid = out.data.exercises.filter((e) => e.kind !== "choice" || e.answer < e.options.length);
        if (valid.length) return NextResponse.json({ exercises: valid, source: "ai" });
      }
    } catch {
      // fall through to the curated fallback
    }
  }

  const topics = new Set(mistakes.map((m) => m.topic));
  const pool: Exercise[] = LESSONS.filter((l) => topics.has(l.topic)).flatMap((l) => [...l.practice, ...l.test]);
  const fallback = (pool.length ? pool : LESSONS.slice(0, 3).flatMap((l) => l.test)).slice(0, 8);
  return NextResponse.json({ exercises: fallback, source: "lessons" });
}
