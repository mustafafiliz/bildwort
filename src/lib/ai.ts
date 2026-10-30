import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { OBJECT_IDS } from "@/components/illustrations/objects";

/** The Claude client lives only on the server. The key never reaches the browser. */
let client: Anthropic | null = null;
export function getClaude(): Anthropic | null {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  client ??= new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  return client;
}
export const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";

export const NO_KEY_MESSAGE =
  "Yapay zekâ öğretmen şu an kapalı: sunucuda ANTHROPIC_API_KEY tanımlı değil. Dersler, kelimeler ve sınavlar bu olmadan da çalışır.";

/** Shared formatting contract: the client renders these tokens as colours and pictures. */
export const VISUAL_FORMAT = `
GÖRSEL BİÇİM KURALLARI (uygulama bunları renk ve resme çevirir):
- Almanca parçaları renk etiketleriyle işaretle: [nom:Ich], [akk:einen Apfel], [dat:dem Mann], [verb:esse], [end:gegessen] (sondaki fiil), [conj:weil], [der:der], [die:die], [das:das], [pl:die Äpfel].
- Renkler: der = mavi, die = kırmızı, das = yeşil, çoğul = sarı, Akkusativ = turuncu, Dativ = mor. Bu renklerden Türkçe bahsedebilirsin ("turuncu kısım").
- Kural gösterirken dönüşüm satırı yaz: "der → den" veya "ein → einen" (her biri ayrı satırda, başında "> " ile).
- Kelime resmi göstermek için tek başına bir satıra {{art:ID}} yaz. Sadece şu ID'ler var: ${OBJECT_IDS.join(", ")}.
- Kısa madde listeleri için satır başında "- " kullan. Başlık, tablo, kalın yazı (**) kullanma.
`;

export const TEACHER_SYSTEM = `Sen Bildwort'un Almanca öğretmenisin. Öğrenci Türk; seviye A1–B1.
KURALLAR:
- Açıklamaları Türkçe yap, örnekleri Almanca ver. Her Almanca örneğin altına kısa Türkçe çevirisini yaz.
- Çok kısa ol: en fazla 6–8 satır. Uzun gramer dersi verme. Önce bir örnek ve resim, sonra tek cümlelik kural.
- Basit dil kullan. Terimleri (Akkusativ, Dativ) kullanırsan Türkçe karşılığını ekle (-i hâli, -e hâli).
- Öğrenci Almanca bir cümle yazarsa: önce düzeltilmiş hâlini ver, sonra neden yanlış olduğunu tek cümleyle açıkla.
- Alıştırma istenirse 3 kısa soru sor ve cevapları öğrencinin cevabından sonra ver.
- Öğrencinin geçmiş hatalarını biliyorsun (aşağıda). Uygun olduğunda onlara değin ve onlara göre örnek seç.
- Tüm Almanca örnekler doğal ve dilbilgisel olarak kusursuz olmalı.
${VISUAL_FORMAT}`;

/** Extract the first JSON object from a model reply. */
export function extractJson(text: string): unknown {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }
}

export async function askJson(system: string, user: string, maxTokens = 1200): Promise<unknown> {
  const claude = getClaude();
  if (!claude) return null;
  const res = await claude.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    system,
    messages: [{ role: "user", content: user }],
  });
  const text = res.content.map((b) => (b.type === "text" ? b.text : "")).join("");
  return extractJson(text);
}
