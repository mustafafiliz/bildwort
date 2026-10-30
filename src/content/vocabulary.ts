import type { TopicId, Word } from "./types";

export const TOPICS: { id: TopicId; de: string; tr: string; art: string }[] = [
  { id: "essen", de: "Essen und Trinken", tr: "Yiyecek ve içecek", art: "apfel" },
  { id: "zuhause", de: "Zu Hause", tr: "Evde", art: "sofa" },
  { id: "stadt", de: "In der Stadt", tr: "Şehirde", art: "bus" },
  { id: "menschen", de: "Menschen und Körper", tr: "İnsanlar ve vücut", art: "frau" },
  { id: "arbeit", de: "Arbeit und Schule", tr: "İş ve okul", art: "buch" },
  { id: "natur", de: "Natur und Tiere", tr: "Doğa ve hayvanlar", art: "katze" },
];

/**
 * Memory hooks use the colour method: picture the thing in its article colour
 * (der = blue, die = red, das = green), plus a sound or meaning link where one exists.
 */
export const WORDS: Word[] = [
  // Essen und Trinken
  { id: "apfel", de: "Apfel", article: "der", plural: "Äpfel", tr: "elma", example: "Ich esse einen Apfel.", exampleTr: "Bir elma yiyorum.", memory: "Mavi bir elma düşün. İngilizce “apple” ile aynı kökten: Apfel.", topic: "essen", level: "A1", art: "apfel" },
  { id: "brot", de: "Brot", article: "das", plural: "Brote", tr: "ekmek", example: "Das Brot ist frisch.", exampleTr: "Ekmek taze.", memory: "Yeşil bir somun ekmek hayal et. İngilizce “bread” ile akraba.", topic: "essen", level: "A1", art: "brot" },
  { id: "milch", de: "Milch", article: "die", plural: null, tr: "süt", example: "Ich trinke Milch.", exampleTr: "Süt içiyorum.", memory: "Kırmızı bir süt kutusu düşün. İngilizce “milk”: Milch.", topic: "essen", level: "A1", art: "milch" },
  { id: "kaese", de: "Käse", article: "der", plural: "Käse", tr: "peynir", example: "Der Käse kommt aus Holland.", exampleTr: "Peynir Hollanda'dan geliyor.", memory: "Mavi delikli bir peynir düşün. “Käse” → “kase”: peyniri kaseye koy.", topic: "essen", level: "A1", art: "kaese" },
  { id: "ei", de: "Ei", article: "das", plural: "Eier", tr: "yumurta", example: "Zum Frühstück esse ich ein Ei.", exampleTr: "Kahvaltıda bir yumurta yiyorum.", memory: "Yeşil bir yumurta düşün. “Ei” → “ay”: yumurta ay gibi yuvarlak.", topic: "essen", level: "A1", art: "ei" },
  { id: "banane", de: "Banane", article: "die", plural: "Bananen", tr: "muz", example: "Die Banane ist gelb.", exampleTr: "Muz sarı.", memory: "Kırmızı bir muz düşün. -e ile biten kelimeler çoğunlukla die.", topic: "essen", level: "A1", art: "banane" },
  { id: "kaffee", de: "Kaffee", article: "der", plural: "Kaffees", tr: "kahve", example: "Möchtest du einen Kaffee?", exampleTr: "Bir kahve ister misin?", memory: "Mavi bir fincanda kahve. Neredeyse Türkçe ile aynı: Kaffee.", topic: "essen", level: "A1", art: "kaffee" },
  { id: "wasser", de: "Wasser", article: "das", plural: null, tr: "su", example: "Ein Glas Wasser, bitte.", exampleTr: "Bir bardak su, lütfen.", memory: "Yeşil bir şişe su düşün. İngilizce “water”: Wasser.", topic: "essen", level: "A1", art: "wasser" },
  { id: "tomate", de: "Tomate", article: "die", plural: "Tomaten", tr: "domates", example: "Die Tomaten sind rot.", exampleTr: "Domatesler kırmızı.", memory: "Domates zaten kırmızı: die Tomate. -e sonu → die.", topic: "essen", level: "A1", art: "tomate" },
  { id: "fisch", de: "Fisch", article: "der", plural: "Fische", tr: "balık", example: "Am Freitag essen wir Fisch.", exampleTr: "Cuma günü balık yiyoruz.", memory: "Mavi denizde mavi bir balık: der Fisch. İngilizce “fish”.", topic: "essen", level: "A1", art: "fisch" },

  // Zu Hause
  { id: "tisch", de: "Tisch", article: "der", plural: "Tische", tr: "masa", example: "Das Buch liegt auf dem Tisch.", exampleTr: "Kitap masanın üstünde duruyor.", memory: "Mavi bir masa. “Tisch” → “tiş”: masaya dişini çarpma!", topic: "zuhause", level: "A1", art: "tisch" },
  { id: "stuhl", de: "Stuhl", article: "der", plural: "Stühle", tr: "sandalye", example: "Der Stuhl ist bequem.", exampleTr: "Sandalye rahat.", memory: "Mavi bir sandalye. “Stuhl” → “stool” (tabure).", topic: "zuhause", level: "A1", art: "stuhl" },
  { id: "bett", de: "Bett", article: "das", plural: "Betten", tr: "yatak", example: "Ich gehe um elf Uhr ins Bett.", exampleTr: "Saat on birde yatarım.", memory: "Yeşil çarşaflı bir yatak. İngilizce “bed”: Bett.", topic: "zuhause", level: "A1", art: "bett" },
  { id: "lampe", de: "Lampe", article: "die", plural: "Lampen", tr: "lamba", example: "Die Lampe ist kaputt.", exampleTr: "Lamba bozuk.", memory: "Kırmızı ışık saçan bir lamba. Türkçe ile neredeyse aynı.", topic: "zuhause", level: "A1", art: "lampe" },
  { id: "fenster", de: "Fenster", article: "das", plural: "Fenster", tr: "pencere", example: "Kannst du bitte das Fenster öffnen?", exampleTr: "Pencereyi açabilir misin lütfen?", memory: "Yeşil çerçeveli bir pencere. Çoğulu değişmez: die Fenster.", topic: "zuhause", level: "A1", art: "fenster" },
  { id: "tuer", de: "Tür", article: "die", plural: "Türen", tr: "kapı", example: "Die Tür ist offen.", exampleTr: "Kapı açık.", memory: "Kırmızı bir kapı. “Tür” → “tur”: tura kapıdan çıkılır.", topic: "zuhause", level: "A1", art: "tuer" },
  { id: "schrank", de: "Schrank", article: "der", plural: "Schränke", tr: "dolap", example: "Die Jacke hängt im Schrank.", exampleTr: "Ceket dolapta asılı.", memory: "Mavi, kocaman bir dolap. Çoğulda a → ä olur: die Schränke.", topic: "zuhause", level: "A1", art: "schrank" },
  { id: "sofa", de: "Sofa", article: "das", plural: "Sofas", tr: "kanepe", example: "Wir sitzen auf dem Sofa.", exampleTr: "Kanepede oturuyoruz.", memory: "Yeşil bir kanepe. Türkçe “sofa” ile aynı.", topic: "zuhause", level: "A1", art: "sofa" },
  { id: "uhr", de: "Uhr", article: "die", plural: "Uhren", tr: "saat", example: "Die Uhr hängt an der Wand.", exampleTr: "Saat duvarda asılı.", memory: "Kırmızı bir duvar saati. “Wie viel Uhr?” = Saat kaç?", topic: "zuhause", level: "A1", art: "uhr" },
  { id: "schluessel", de: "Schlüssel", article: "der", plural: "Schlüssel", tr: "anahtar", example: "Wo ist mein Schlüssel?", exampleTr: "Anahtarım nerede?", memory: "Mavi bir anahtar. “schließen” = kilitlemek → Schlüssel.", topic: "zuhause", level: "A1", art: "schluessel" },

  // In der Stadt
  { id: "auto", de: "Auto", article: "das", plural: "Autos", tr: "araba", example: "Mein Auto ist alt.", exampleTr: "Arabam eski.", memory: "Yeşil bir araba. “Oto” ile aynı.", topic: "stadt", level: "A1", art: "auto" },
  { id: "bus", de: "Bus", article: "der", plural: "Busse", tr: "otobüs", example: "Der Bus kommt um acht Uhr.", exampleTr: "Otobüs saat sekizde geliyor.", memory: "Mavi bir otobüs. Çoğulda “s” ikiye çıkar: Busse.", topic: "stadt", level: "A1", art: "bus" },
  { id: "fahrrad", de: "Fahrrad", article: "das", plural: "Fahrräder", tr: "bisiklet", example: "Ich fahre mit dem Fahrrad zur Arbeit.", exampleTr: "İşe bisikletle gidiyorum.", memory: "fahren (gitmek) + Rad (tekerlek) = Fahrrad. Rad → das.", topic: "stadt", level: "A1", art: "fahrrad" },
  { id: "bahnhof", de: "Bahnhof", article: "der", plural: "Bahnhöfe", tr: "tren istasyonu", example: "Der Bahnhof ist nicht weit.", exampleTr: "Tren istasyonu uzak değil.", memory: "Bahn (tren) + Hof (avlu). der Hof → der Bahnhof.", topic: "stadt", level: "A1", art: "bahnhof" },
  { id: "apotheke", de: "Apotheke", article: "die", plural: "Apotheken", tr: "eczane", example: "Die Apotheke ist neben der Bank.", exampleTr: "Eczane bankanın yanında.", memory: "Almanya'da eczane tabelası kırmızı A harfidir: die Apotheke.", topic: "stadt", level: "A1", art: "apotheke" },
  { id: "haus", de: "Haus", article: "das", plural: "Häuser", tr: "ev", example: "Das Haus hat einen Garten.", exampleTr: "Evin bir bahçesi var.", memory: "Yeşil bir ev. İngilizce “house”: Haus.", topic: "stadt", level: "A1", art: "haus" },
  { id: "strasse", de: "Straße", article: "die", plural: "Straßen", tr: "cadde, sokak", example: "Ich wohne in der Goethestraße.", exampleTr: "Goethe Caddesi'nde oturuyorum.", memory: "Kırmızı çizgili bir cadde. İngilizce “street”: Straße.", topic: "stadt", level: "A1", art: "strasse" },
  { id: "supermarkt", de: "Supermarkt", article: "der", plural: "Supermärkte", tr: "süpermarket", example: "Ich kaufe Brot im Supermarkt.", exampleTr: "Süpermarketten ekmek alıyorum.", memory: "der Markt → der Supermarkt. Bileşik isimde son kelime artikeli belirler.", topic: "stadt", level: "A1", art: "supermarkt" },

  // Menschen und Körper
  { id: "mann", de: "Mann", article: "der", plural: "Männer", tr: "adam, erkek", example: "Der Mann liest eine Zeitung.", exampleTr: "Adam gazete okuyor.", memory: "Mavi gömlekli bir adam. İngilizce “man”.", topic: "menschen", level: "A1", art: "mann" },
  { id: "frau", de: "Frau", article: "die", plural: "Frauen", tr: "kadın", example: "Die Frau arbeitet in einer Bank.", exampleTr: "Kadın bir bankada çalışıyor.", memory: "Kırmızı elbiseli bir kadın. Frau = Hanım (Frau Schmidt).", topic: "menschen", level: "A1", art: "frau" },
  { id: "kind", de: "Kind", article: "das", plural: "Kinder", tr: "çocuk", example: "Das Kind spielt im Garten.", exampleTr: "Çocuk bahçede oynuyor.", memory: "Yeşil çimlerde oynayan çocuk. “Kindergarten” = çocuk bahçesi.", topic: "menschen", level: "A1", art: "kind" },
  { id: "arzt", de: "Arzt", article: "der", plural: "Ärzte", tr: "doktor", example: "Ich habe morgen einen Termin beim Arzt.", exampleTr: "Yarın doktordan randevum var.", memory: "Mavi steteskoplu doktor. Kadın doktor: die Ärztin.", topic: "menschen", level: "A1", art: "arzt" },
  { id: "hand", de: "Hand", article: "die", plural: "Hände", tr: "el", example: "Wasch dir bitte die Hände!", exampleTr: "Lütfen ellerini yıka!", memory: "Kırmızı eldivenli bir el. İngilizce “hand” ile aynı.", topic: "menschen", level: "A1", art: "hand" },
  { id: "kopf", de: "Kopf", article: "der", plural: "Köpfe", tr: "baş, kafa", example: "Mein Kopf tut weh.", exampleTr: "Başım ağrıyor.", memory: "Mavi bir şapka takan kafa. “Kopf” → “kof”: kafaya top çarptı, kof!", topic: "menschen", level: "A1", art: "kopf" },
  { id: "auge", de: "Auge", article: "das", plural: "Augen", tr: "göz", example: "Sie hat blaue Augen.", exampleTr: "Onun mavi gözleri var.", memory: "Yeşil bir göz. -e ile bitse de istisna: das Auge.", topic: "menschen", level: "A1", art: "auge" },

  // Arbeit und Schule
  { id: "buch", de: "Buch", article: "das", plural: "Bücher", tr: "kitap", example: "Ich lese ein Buch.", exampleTr: "Bir kitap okuyorum.", memory: "Yeşil kapaklı bir kitap. İngilizce “book”: Buch.", topic: "arbeit", level: "A1", art: "buch" },
  { id: "stift", de: "Stift", article: "der", plural: "Stifte", tr: "kalem", example: "Hast du einen Stift?", exampleTr: "Kalemin var mı?", memory: "Mavi mürekkepli bir kalem. “Stift” → “stif”: dimdik kalem.", topic: "arbeit", level: "A1", art: "stift" },
  { id: "handy", de: "Handy", article: "das", plural: "Handys", tr: "cep telefonu", example: "Mein Handy ist leer.", exampleTr: "Telefonumun şarjı bitti.", memory: "Yeşil ekranlı telefon. Elde (Hand) taşınır: Handy.", topic: "arbeit", level: "A1", art: "handy" },
  { id: "computer", de: "Computer", article: "der", plural: "Computer", tr: "bilgisayar", example: "Ich arbeite am Computer.", exampleTr: "Bilgisayarda çalışıyorum.", memory: "Mavi ekranlı bilgisayar. Çoğulu değişmez: die Computer.", topic: "arbeit", level: "A1", art: "computer" },
  { id: "tasche", de: "Tasche", article: "die", plural: "Taschen", tr: "çanta", example: "Die Tasche ist schwer.", exampleTr: "Çanta ağır.", memory: "Kırmızı bir çanta. “Tasche” → “taşı”: çantayı taşı.", topic: "arbeit", level: "A1", art: "tasche" },
  { id: "brief", de: "Brief", article: "der", plural: "Briefe", tr: "mektup", example: "Ich schreibe einen Brief.", exampleTr: "Bir mektup yazıyorum.", memory: "Mavi zarfta bir mektup. Kısa (brief) bir not gibi.", topic: "arbeit", level: "A1", art: "brief" },

  // Natur und Tiere
  { id: "katze", de: "Katze", article: "die", plural: "Katzen", tr: "kedi", example: "Die Katze schläft auf dem Sofa.", exampleTr: "Kedi kanepede uyuyor.", memory: "Kırmızı tasmalı bir kedi. İngilizce “cat”: Katze.", topic: "natur", level: "A1", art: "katze" },
  { id: "hund", de: "Hund", article: "der", plural: "Hunde", tr: "köpek", example: "Der Hund spielt im Park.", exampleTr: "Köpek parkta oynuyor.", memory: "Mavi tasmalı bir köpek. İngilizce “hound” (av köpeği).", topic: "natur", level: "A1", art: "hund" },
  { id: "baum", de: "Baum", article: "der", plural: "Bäume", tr: "ağaç", example: "Der Baum ist sehr alt.", exampleTr: "Ağaç çok yaşlı.", memory: "Mavi gökyüzüne uzanan ağaç. “Baum” → “bom”: ağaç devrildi, bom!", topic: "natur", level: "A1", art: "baum" },
  { id: "blume", de: "Blume", article: "die", plural: "Blumen", tr: "çiçek", example: "Ich kaufe Blumen für meine Mutter.", exampleTr: "Annem için çiçek alıyorum.", memory: "Kırmızı bir çiçek. İngilizce “bloom” (açmak).", topic: "natur", level: "A1", art: "blume" },
  { id: "sonne", de: "Sonne", article: "die", plural: null, tr: "güneş", example: "Die Sonne scheint.", exampleTr: "Güneş parlıyor.", memory: "Kırmızı-turuncu bir güneş. İngilizce “sun”.", topic: "natur", level: "A1", art: "sonne" },
  { id: "regen", de: "Regen", article: "der", plural: null, tr: "yağmur", example: "Bei Regen bleibe ich zu Hause.", exampleTr: "Yağmurda evde kalırım.", memory: "Mavi yağmur damlaları. İngilizce “rain”: Regen.", topic: "natur", level: "A1", art: "regen" },
  { id: "karton", de: "Karton", article: "der", plural: "Kartons", tr: "karton kutu", example: "Die Katze sitzt im Karton.", exampleTr: "Kedi kutunun içinde oturuyor.", memory: "Mavi bantlı bir koli. Türkçe “karton” ile aynı.", topic: "zuhause", level: "A1", art: "karton" },
];

export const WORDS_BY_ID: Record<string, Word> = Object.fromEntries(WORDS.map((w) => [w.id, w]));

export function withArticle(w: Pick<Word, "article" | "de">) {
  return w.article ? `${w.article} ${w.de}` : w.de;
}
