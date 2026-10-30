import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getOrCreateUserId } from "@/lib/user";
import { askJson, getClaude } from "@/lib/ai";
import { SCENARIOS_BY_ID } from "@/content/scenarios";

const Body = z.object({
  scenario: z.string(),
  history: z.array(z.object({ role: z.enum(["partner", "user"]), de: z.string().max(400) })).max(30),
  utterance: z.string().min(1).max(400),
});

const Reply = z.object({
  reply: z.string(),
  replyTr: z.string(),
  correction: z
    .object({ original: z.string(), corrected: z.string(), explanationTr: z.string() })
    .nullable(),
  done: z.boolean().optional(),
});

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  const sc = parsed.success ? SCENARIOS_BY_ID[parsed.data.scenario] : null;
  if (!parsed.success || !sc) return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  const { history, utterance } = parsed.data;
  const userTurns = history.filter((h) => h.role === "user").length;

  if (!getClaude()) {
    // Scripted partner: the conversation still works, without corrections.
    const line = sc.script[Math.min(userTurns, sc.script.length - 1)];
    return NextResponse.json({ reply: line.de, replyTr: line.tr, correction: null, done: userTurns >= sc.script.length - 1, scripted: true });
  }

  const system = `Sen bir Almanca konuşma pratiği partnerisin. Rolün: ${sc.partner.name} (${sc.partner.roleTr}). Sahne: ${sc.titleDe}. Öğrencinin hedefi: ${sc.goalTr}
Öğrenci Türk, seviye ${sc.level}. Kurallar:
- Rolde kal. Kısa, doğal, ${sc.level} seviyesinde Almanca cevap ver (en fazla 2 kısa cümle). Konuşmayı bir soruyla sürdür.
- Öğrencinin son cümlesinde dilbilgisi veya kelime hatası varsa "correction" doldur: original (öğrencinin cümlesi), corrected (doğal ve doğru hâli), explanationTr (tek kısa Türkçe cümle, ör. "geben + Dativ: der Mann → dem Mann"). Hata yoksa ya da sadece büyük/küçük harf veya noktalama farkı varsa correction = null.
- Konuşma görev tamamlanınca doğal bir şekilde biter; o zaman done = true.
SADECE şu JSON'u döndür: {"reply": "...", "replyTr": "...", "correction": null | {"original": "...", "corrected": "...", "explanationTr": "..."}, "done": false}`;

  const transcript = [...history, { role: "user", de: utterance }]
    .map((h) => `${h.role === "user" ? "Öğrenci" : sc.partner.name}: ${h.de}`)
    .join("\n");

  try {
    const json = Reply.safeParse(await askJson(system, `Konuşma:\n${transcript}\n\nŞimdi ${sc.partner.name} olarak cevap ver.`, 500));
    if (!json.success) throw new Error("format");
    if (json.data.correction) {
      const userId = await getOrCreateUserId();
      await prisma.mistake.create({
        data: {
          userId,
          source: "speaking",
          topic: `konuşma:${sc.id}`,
          prompt: sc.titleDe,
          given: json.data.correction.original,
          expected: json.data.correction.corrected,
          note: json.data.correction.explanationTr,
        },
      });
    }
    return NextResponse.json(json.data);
  } catch {
    return NextResponse.json({ error: "Cevap alınamadı. Lütfen tekrar dene." }, { status: 502 });
  }
}
