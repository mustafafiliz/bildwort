# Bildwort

Türkçe konuşanlar için resimlerle Almanca öğreten uygulama. Dersler, kelime kartları, yapay zekâ öğretmen, konuşma pratiği ve Goethe/telc sınav hazırlığı içerir.

## Kurulum

```bash
npm install                 # prisma generate otomatik çalışır
cp .env.example .env        # DATABASE_URL ve ANTHROPIC_API_KEY değerlerini gir
npx prisma migrate deploy   # tabloları oluşturur
npm run dev                 # http://localhost:3000
```

Production için:

```bash
npm run build
npm start
```

`next.config.ts` içinde `output: "standalone"` açık olduğu için uygulama Docker'da da çalışır, Vercel'de de. Vercel'de `DATABASE_URL` ve `ANTHROPIC_API_KEY` ortam değişkenlerini tanımla. Build komutu `prisma generate && next build`, migration için de bir kez `npx prisma migrate deploy` çalıştır.

## Ortam değişkenleri

| Değişken | Gerekli mi | Açıklama |
|---|---|---|
| `DATABASE_URL` | evet | PostgreSQL bağlantı adresi |
| `ANTHROPIC_API_KEY` | hayır | AI öğretmen, konuşma düzeltmeleri, kişisel alıştırmalar ve yazma/konuşma değerlendirmesi için |
| `ANTHROPIC_MODEL` | hayır | Varsayılan: `claude-sonnet-5-5` |

Anahtar yoksa da uygulama çalışır:

- Konuşma pratiğinde karşıdaki kişi hazır bir senaryoyu izler.
- Kişisel alıştırmalar, ilgili derslerin sorularından seçilir.
- Sınavların yazma ve konuşma bölümlerinde örnek cevap gösterilir.

API anahtarı yalnızca sunucuda kullanılır (`src/lib/ai.ts`, `server-only`).

## Yapı

```
src/
  app/                  Sayfalar (Öğren, Kelimeler, Pratik, Öğretmen, Sınav) ve /api route'ları
  content/              Tüm eğitim içeriği: dersler (A1–B1), 48 kelime, 7 konuşma senaryosu, 4 sınav
  components/
    illustrations/      Özgün SVG çizimler (nesneler ve karakterler)
    visuals/            Etkileşimli ders sahneleri (kedi–kutu odası, verme sahnesi, diyagramlar)
    lesson/             7 adımlı ders oynatıcısı, alıştırma türleri, renkli Almanca metin
    vocab/              Kelime kartı ve aralıklı tekrar (SM-2)
    teacher/ practice/ exam/
  lib/                  Prisma, anonim kullanıcı çerezi, Claude, konuşma (Web Speech API), Zustand store
prisma/                 Şema ve migration
```

## Renk sistemi

Renkler uygulamanın her yerinde aynıdır: derslerde, kartlarda, AI cevaplarında ve sınavlarda.

- Artikeller: **der** mavi, **die** kırmızı, **das** yeşil, **çoğul** sarı.
- Hâller: Akkusativ turuncu, Dativ mor.

Almanca metinlerde `[akk:einen Apfel]` biçimindeki işaretler `src/components/lesson/Marked.tsx` tarafından renklendirilir.

## Yeni içerik ekleme

- **Ders:** `src/content/lessons/*.ts` dosyalarına bir `Lesson` nesnesi ekle. Görsel için `VisualId` kayıtlarından birini kullan.
- **Kelime:** `src/content/vocabulary.ts` dosyasına ekle. Çizimi `src/components/illustrations/objects.tsx` içine aynı id ile koy.
- **Sınav görevi:** `src/content/exams.ts` dosyasına ekle.

## Notlar

- Kullanıcılar anonimdir ve httpOnly bir çerezle tanınır. İlerleme, kelime tekrarları, hatalar, AI sohbet geçmişi ve sınav sonuçları PostgreSQL'de saklanır.
- Mikrofon ve sesli okuma tarayıcının Web Speech API'sini kullanır. En iyi sonuç Chrome, Edge ve Safari'de alınır. Mikrofon yoksa cevap yazılabilir.
- Sınav materyalleri özgündür ve sınavların herkese açık biçimini örnek alır. Resmî örnek testlerle de çalışılması önerilir.
