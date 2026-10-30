import { NextResponse } from "next/server";
import { z } from "zod";
import { askJson, getClaude, NO_KEY_MESSAGE } from "@/lib/ai";
import { EXAMS_BY_ID } from "@/content/exams";

const Body = z.object({ examId: z.string(), taskId: z.string(), text: z.string().min(1).max(3000) });
const Out = z.object({
  score: z.number().min(0).max(10),
  summaryTr: z.string(),
  corrected: z.string(),
  good: z.array(z.string()).max(4),
  improve: z.array(z.string()).max(5),
});

/** Feedback for writing and speaking tasks, following the criteria of the chosen exam. */
export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  const exam = EXAMS_BY_ID[parsed.data.examId];
  const task = exam?.sections.flatMap((s) => s.tasks).find((t) => t.id === parsed.data.taskId);
  if (!exam || !task || (task.kind !== "write" && task.kind !== "speak")) return NextResponse.json({ error: "Görev bulunamadı" }, { status: 404 });
  if (!getClaude()) return NextResponse.json({ error: NO_KEY_MESSAGE }, { status: 503 });

  const brief =
    task.kind === "write"
      ? `Yazma görevi (${task.title}). Durum: ${task.situation}\nİçerik noktaları: ${task.points.join("; ")}\nUzunluk: ${task.words}`
      : `Konuşma görevi (${task.title}). Kart: ${task.card}\nNoktalar: ${task.points.join("; ")}`;

  const system = `Sen deneyimli bir ${exam.title} sınav değerlendiricisisin. Öğrenci Türk. Cevabı ${exam.provider} ${exam.level} ölçütlerine göre değerlendir:
görevin yerine getirilmesi (tüm noktalar var mı), metin düzeni ve bağlaçlar, kelime çeşitliliği, dilbilgisi doğruluğu${task.kind === "write" ? ", hitap ve kapanış gibi metin türü kuralları" : ""}.
Kısa ve cesaret verici ol. Türkçe yaz. "corrected" alanı öğrencinin metninin düzeltilmiş Almanca hâlidir (anlamı koru, sadece hataları düzelt).
SADECE JSON döndür: {"score": 0-10, "summaryTr": "tek cümle", "corrected": "...", "good": ["..."], "improve": ["kısa madde: hata → doğrusu (neden)"]}`;
  try {
    const out = Out.safeParse(await askJson(system, `${brief}\n\nÖğrencinin cevabı:\n${parsed.data.text}`, 1400));
    if (!out.success) throw new Error("format");
    return NextResponse.json(out.data);
  } catch {
    return NextResponse.json({ error: "Değerlendirme alınamadı. Lütfen tekrar dene." }, { status: 502 });
  }
}
