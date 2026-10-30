/**
 * Original practice material modelled on the publicly described formats of
 * Goethe-Zertifikat A2/B1 and telc Deutsch A2/B1. All texts are written for Bildwort.
 * Formats change over time: learners should check the official model tests (Modellsatz / Übungstest).
 */

export type AudioLine = { speaker: "A" | "B" | "N"; de: string };
export type Mc = { q: string; options: string[]; answer: number; why: string };
export type Tf = { s: string; answer: boolean; why: string };

export type ExamTask =
  | { kind: "mc"; id: string; title: string; instructionTr: string; text?: string; audio?: AudioLine[]; questions: Mc[] }
  | { kind: "tf"; id: string; title: string; instructionTr: string; text?: string; audio?: AudioLine[]; labels?: [string, string]; statements: Tf[] }
  | { kind: "gap"; id: string; title: string; instructionTr: string; text: string; gaps: Mc[] }
  | { kind: "write"; id: string; title: string; instructionTr: string; situation: string; points: string[]; words: string; model: string }
  | { kind: "speak"; id: string; title: string; instructionTr: string; card: string; points: string[]; model: string };

export type SectionId = "lesen" | "sprachbausteine" | "hoeren" | "schreiben" | "sprechen";
export type ExamSection = { id: SectionId; nameDe: string; nameTr: string; minutes: string; tasks: ExamTask[] };
export type Exam = {
  id: string;
  provider: "Goethe" | "telc";
  level: "A2" | "B1";
  title: string;
  formatTr: string[];
  sections: ExamSection[];
};

const SECTION_NAMES: Record<SectionId, [string, string]> = {
  lesen: ["Lesen", "Okuma"],
  sprachbausteine: ["Sprachbausteine", "Dil yapıları"],
  hoeren: ["Hören", "Dinleme"],
  schreiben: ["Schreiben", "Yazma"],
  sprechen: ["Sprechen", "Konuşma"],
};
const sec = (id: SectionId, minutes: string, tasks: ExamTask[]): ExamSection => ({ id, nameDe: SECTION_NAMES[id][0], nameTr: SECTION_NAMES[id][1], minutes, tasks });

/* ======================= Goethe-Zertifikat A2 ======================= */
const GOETHE_A2: Exam = {
  id: "goethe-a2",
  provider: "Goethe",
  level: "A2",
  title: "Goethe-Zertifikat A2",
  formatTr: [
    "Dört bölüm: Lesen, Hören, Schreiben, Sprechen.",
    "Okuma ve dinlemede kısa gazete metinleri, e-postalar, ilanlar, anonslar ve telefon mesajları.",
    "Yazmada iki kısa mesaj: bir SMS ve bir e-posta.",
    "Konuşma çiftler hâlinde: kartlarla soru-cevap, kendinden bahsetme, birlikte bir şey planlama.",
  ],
  sections: [
    sec("lesen", "yakl. 30 dk.", [
      {
        kind: "mc",
        id: "ga2-l1",
        title: "Teil 1 · Zeitungstext",
        instructionTr: "Metni oku. Her soru için doğru cevabı seç: a, b veya c.",
        text: `Neues Café im Stadtpark

Seit Montag gibt es im Stadtpark ein neues Café. Es heißt „Parkblick“ und liegt direkt neben dem Spielplatz. Die Besitzerin, Anna Keller, hat früher zehn Jahre in einer Bäckerei gearbeitet. Deshalb backt sie alle Kuchen selbst.

Das Café ist jeden Tag von 9 bis 18 Uhr geöffnet, nur am Dienstag ist es geschlossen. Am Wochenende gibt es ein Frühstück für 8,50 Euro. Für Kinder unter sechs Jahren ist der Kakao kostenlos. Im Sommer kann man auch draußen auf der Terrasse sitzen.`,
        questions: [
          { q: "Das Café liegt …", options: ["neben dem Spielplatz.", "in einer Bäckerei.", "am Bahnhof."], answer: 0, why: "Metinde: „liegt direkt neben dem Spielplatz“." },
          { q: "Wann ist das Café geschlossen?", options: ["Am Montag.", "Am Dienstag.", "Am Wochenende."], answer: 1, why: "„nur am Dienstag ist es geschlossen“: sadece salı kapalı." },
          { q: "Was bekommen kleine Kinder gratis?", options: ["Ein Frühstück.", "Ein Stück Kuchen.", "Einen Kakao."], answer: 2, why: "kostenlos = ücretsiz: altı yaş altı çocuklara kakao bedava." },
        ],
      },
      {
        kind: "mc",
        id: "ga2-l4",
        title: "Teil 4 · Anzeigen",
        instructionTr: "Üç kişi bir şey arıyor. Her kişi için uygun ilanı seç. Uygun ilan yoksa „x“ seç.",
        text: `a) Deutschkurs am Abend: Montag und Mittwoch, 18–20 Uhr, Volkshochschule, 120 Euro für 10 Wochen.
b) Fahrrad zu verkaufen: Damenrad, 3 Jahre alt, sehr guter Zustand, 90 Euro. Tel. 0176 4455 210.
c) Wir suchen Aushilfe im Supermarkt: Samstag 8–14 Uhr, keine Erfahrung nötig.
d) Schwimmkurs für Kinder (5–8 Jahre): Freitag 15 Uhr im Hallenbad Nord.`,
        questions: [
          { q: "Mehmet möchte am Wochenende ein bisschen Geld verdienen.", options: ["a", "b", "c", "d", "x"], answer: 2, why: "c: cumartesi süpermarkette yardımcı aranıyor." },
          { q: "Olga arbeitet tagsüber und möchte ihr Deutsch verbessern.", options: ["a", "b", "c", "d", "x"], answer: 0, why: "a: akşam Almanca kursu, gündüz çalışan biri için uygun." },
          { q: "Familie Demir sucht einen Schwimmkurs für ihren Sohn. Er ist zwölf.", options: ["a", "b", "c", "d", "x"], answer: 4, why: "d sadece 5–8 yaş için. 12 yaşındaki çocuğa uygun ilan yok: x." },
        ],
      },
    ]),
    sec("hoeren", "yakl. 30 dk.", [
      {
        kind: "mc",
        id: "ga2-h1",
        title: "Teil 1 · Ansagen",
        instructionTr: "Kısa anonsları dinle. Her metin için doğru cevabı seç.",
        audio: [
          { speaker: "N", de: "Liebe Kundinnen und Kunden, heute gibt es in unserer Obstabteilung alle Äpfel zum halben Preis. Das Angebot gilt nur bis 16 Uhr." },
          { speaker: "N", de: "Hallo Lisa, hier ist Paul. Das Kino heute Abend beginnt nicht um acht, sondern schon um halb acht. Wir treffen uns also um sieben vor dem Eingang. Bis dann!" },
        ],
        questions: [
          { q: "Was ist heute billiger?", options: ["Bananen", "Äpfel", "Brot"], answer: 1, why: "„alle Äpfel zum halben Preis“: elmalar yarı fiyatına." },
          { q: "Wann treffen sich Lisa und Paul?", options: ["Um 19 Uhr.", "Um 19:30 Uhr.", "Um 20 Uhr."], answer: 0, why: "Film 19:30'da başlıyor, buluşma „um sieben“ = 19:00." },
        ],
      },
      {
        kind: "tf",
        id: "ga2-h4",
        title: "Teil 4 · Interview",
        instructionTr: "Bir radyo röportajı dinle. Cümleler doğru mu (Ja) yanlış mı (Nein)?",
        labels: ["Ja", "Nein"],
        audio: [
          { speaker: "A", de: "Frau Aydın, Sie fahren jeden Tag mit dem Fahrrad zur Arbeit. Warum?" },
          { speaker: "B", de: "Früher bin ich mit dem Auto gefahren, aber ich habe immer lange einen Parkplatz gesucht. Mit dem Fahrrad bin ich schneller." },
          { speaker: "A", de: "Und wenn es regnet?" },
          { speaker: "B", de: "Dann nehme ich den Bus. Aber das passiert nicht oft, vielleicht zweimal im Monat." },
          { speaker: "A", de: "Wie weit ist Ihr Weg?" },
          { speaker: "B", de: "Ungefähr sechs Kilometer. Ich brauche zwanzig Minuten." },
        ],
        statements: [
          { s: "Frau Aydın ist früher mit dem Auto zur Arbeit gefahren.", answer: true, why: "„Früher bin ich mit dem Auto gefahren.“" },
          { s: "Bei Regen fährt sie auch mit dem Fahrrad.", answer: false, why: "Yağmurda otobüse biniyor: „Dann nehme ich den Bus.“" },
          { s: "Sie braucht ungefähr zwanzig Minuten zur Arbeit.", answer: true, why: "„Ich brauche zwanzig Minuten.“" },
        ],
      },
    ]),
    sec("schreiben", "yakl. 30 dk.", [
      {
        kind: "write",
        id: "ga2-s1",
        title: "Teil 1 · SMS",
        instructionTr: "Arkadaşın Sara'ya bir SMS yaz. Üç noktanın hepsine değin.",
        situation: "Sie sind mit Ihrer Freundin Sara im Café verabredet. Ihr Bus hat Verspätung.",
        points: ["Entschuldigen Sie sich.", "Schreiben Sie, warum Sie später kommen.", "Schreiben Sie, wann Sie ankommen."],
        words: "20–30 Wörter",
        model: "Hallo Sara, es tut mir leid! Mein Bus hat Verspätung, weil es einen Unfall gab. Ich komme ungefähr um Viertel nach drei. Bestell dir schon einen Kaffee! Liebe Grüße, Elif",
      },
      {
        kind: "write",
        id: "ga2-s2",
        title: "Teil 2 · E-Mail",
        instructionTr: "Kurs öğretmenin Frau Hoffmann'a resmî bir e-posta yaz.",
        situation: "Sie können morgen nicht zum Deutschkurs kommen. Schreiben Sie Ihrer Kursleiterin, Frau Hoffmann.",
        points: ["Warum können Sie nicht kommen?", "Fragen Sie nach den Hausaufgaben.", "Wann kommen Sie wieder?"],
        words: "30–40 Wörter",
        model: "Liebe Frau Hoffmann, leider kann ich morgen nicht zum Kurs kommen, weil mein Sohn krank ist. Können Sie mir bitte die Hausaufgaben schicken? Am Donnerstag komme ich wieder. Vielen Dank! Viele Grüße, Murat Kaya",
      },
    ]),
    sec("sprechen", "yakl. 15 dk. (çiftler hâlinde)", [
      {
        kind: "speak",
        id: "ga2-sp1",
        title: "Teil 1 · Fragen zur Person",
        instructionTr: "Kartlardaki konulara göre partnerine soru sor ve onun sorularına cevap ver. Burada kendi cevaplarını söyle.",
        card: "Thema: Freizeit",
        points: ["Wochenende?", "Sport?", "Lieblingsessen?", "Urlaub?"],
        model: "Was machst du am Wochenende? – Am Wochenende treffe ich meine Freunde.\nTreibst du Sport? – Ja, ich gehe zweimal pro Woche schwimmen.\nWas ist dein Lieblingsessen? – Mein Lieblingsessen ist Linsensuppe.\nWohin fährst du im Urlaub? – Im Sommer fahre ich in die Türkei.",
      },
      {
        kind: "speak",
        id: "ga2-sp3",
        title: "Teil 3 · Gemeinsam etwas planen",
        instructionTr: "Bir arkadaşın için birlikte hediye almak istiyorsunuz. Takvimine bak ve uygun bir zaman öner.",
        card: "Sie möchten am Samstag zusammen ein Geschenk für Ihre Kollegin kaufen. Wann haben Sie beide Zeit?",
        points: ["Samstag 9–11 Uhr: Sport", "Samstag 12 Uhr: Mittagessen mit Familie", "Samstag ab 15 Uhr: frei"],
        model: "Wollen wir am Samstag zusammen ein Geschenk kaufen? Am Vormittag kann ich leider nicht, da mache ich Sport. Um zwölf esse ich mit meiner Familie. Hast du um drei Uhr Zeit? Wir können uns vor dem Kaufhaus treffen.",
      },
    ]),
  ],
};

/* ======================= telc Deutsch A2 ======================= */
const TELC_A2: Exam = {
  id: "telc-a2",
  provider: "telc",
  level: "A2",
  title: "telc Deutsch A2",
  formatTr: [
    "Yazılı sınav: Hören (yakl. 20 dk.), ardından Lesen ve Schreiben (birlikte yakl. 50 dk.).",
    "Sözlü sınav genelde iki aday ile, hazırlık süresi olmadan yakl. 15 dk.",
    "Kısmi sınav yok: tüm bölümler birlikte yapılır.",
    "Konuşmada tanışma, kendinden bahsetme ve birlikte bir şey planlama var.",
  ],
  sections: [
    sec("hoeren", "yakl. 20 dk.", [
      {
        kind: "mc",
        id: "ta2-h1",
        title: "Teil 1 · Telefonnachrichten",
        instructionTr: "Telefon mesajlarını dinle ve doğru cevabı seç.",
        audio: [
          { speaker: "N", de: "Guten Tag, hier ist die Praxis Dr. Neumann. Ihr Termin am Mittwoch muss leider ausfallen. Können Sie am Freitag um zehn Uhr kommen? Bitte rufen Sie uns kurz zurück." },
          { speaker: "N", de: "Hallo, hier ist Jan von nebenan. Ich habe ein Paket für dich angenommen. Du kannst es heute Abend nach sieben bei mir abholen." },
        ],
        questions: [
          { q: "Wann ist der neue Termin?", options: ["Am Mittwoch um 10 Uhr.", "Am Freitag um 10 Uhr.", "Am Freitag um 7 Uhr."], answer: 1, why: "„Können Sie am Freitag um zehn Uhr kommen?“" },
          { q: "Was soll die Person heute Abend machen?", options: ["Ein Paket abholen.", "Ein Paket zur Post bringen.", "Jan anrufen."], answer: 0, why: "abholen = gidip almak: paketi Jan'dan alacak." },
        ],
      },
      {
        kind: "tf",
        id: "ta2-h2",
        title: "Teil 2 · Gespräch",
        instructionTr: "Konuşmayı dinle. Cümleler doğru mu yanlış mı?",
        labels: ["Richtig", "Falsch"],
        audio: [
          { speaker: "A", de: "Sag mal, Selin, wohnst du noch in der Bahnhofstraße?" },
          { speaker: "B", de: "Nein, ich bin letzten Monat umgezogen. Die alte Wohnung war zu klein und zu laut." },
          { speaker: "A", de: "Und wie ist die neue Wohnung?" },
          { speaker: "B", de: "Sie hat drei Zimmer und einen Balkon. Die Miete ist ein bisschen höher, aber es ist sehr ruhig." },
        ],
        statements: [
          { s: "Selin wohnt noch in der Bahnhofstraße.", answer: false, why: "„ich bin letzten Monat umgezogen“: geçen ay taşındı." },
          { s: "Die alte Wohnung war laut.", answer: true, why: "„zu klein und zu laut“." },
          { s: "Die neue Wohnung ist billiger.", answer: false, why: "„Die Miete ist ein bisschen höher“: kira biraz daha yüksek." },
        ],
      },
    ]),
    sec("lesen", "Lesen + Schreiben yakl. 50 dk.", [
      {
        kind: "tf",
        id: "ta2-l1",
        title: "Teil 1 · Aushang im Haus",
        instructionTr: "Apartmandaki duyuruyu oku. Cümleler doğru mu yanlış mı?",
        labels: ["Richtig", "Falsch"],
        text: `Liebe Mieterinnen und Mieter,

am Donnerstag, den 14. November, wird von 8 bis 12 Uhr das Wasser im ganzen Haus abgestellt. Bitte füllen Sie vorher ein paar Flaschen mit Wasser.

Ab Dezember stehen die neuen Mülltonnen für Papier hinter dem Haus, nicht mehr im Hof.

Bei Fragen erreichen Sie den Hausmeister, Herrn Wolf, von Montag bis Freitag unter 0221 334 870.`,
        statements: [
          { s: "Am 14. November gibt es den ganzen Tag kein Wasser.", answer: false, why: "Sadece 8 ile 12 arası su kesik." },
          { s: "Die Papiertonnen stehen ab Dezember hinter dem Haus.", answer: true, why: "„Ab Dezember stehen die neuen Mülltonnen für Papier hinter dem Haus“." },
          { s: "Den Hausmeister kann man am Wochenende anrufen.", answer: false, why: "Kapıcıya sadece pazartesi–cuma ulaşılabiliyor." },
        ],
      },
      {
        kind: "mc",
        id: "ta2-l2",
        title: "Teil 2 · Anzeigen",
        instructionTr: "İlanları oku ve her soru için doğru ilanı seç.",
        text: `a) Zimmer frei! Möbliertes Zimmer in WG, 15 m², 380 Euro warm, ab sofort. Nichtraucher.
b) Gebrauchte Kinderkleidung: Samstag 10–14 Uhr Flohmarkt im Gemeindehaus. Alles 1–5 Euro.
c) Computerhilfe: Ich repariere Ihren Laptop zu Hause. Montag bis Samstag, auch abends.
d) Kochkurs „Türkische Küche“: 4 Abende, Dienstag 19 Uhr, 60 Euro inkl. Zutaten.`,
        questions: [
          { q: "Ihr Laptop ist kaputt und Sie haben nur abends Zeit.", options: ["a", "b", "c", "d"], answer: 2, why: "c: akşamları da evde laptop tamiri." },
          { q: "Sie suchen billige Sachen für Ihre Tochter.", options: ["a", "b", "c", "d"], answer: 1, why: "b: ikinci el çocuk kıyafetleri, 1–5 euro." },
        ],
      },
    ]),
    sec("schreiben", "Lesen + Schreiben yakl. 50 dk.", [
      {
        kind: "write",
        id: "ta2-s1",
        title: "Schreiben · Antwort auf eine Einladung",
        instructionTr: "Arkadaşın Tom seni doğum günü partisine davet etti. Ona cevap yaz ve dört noktanın hepsine değin.",
        situation: "Ihr Freund Tom hat Sie zu seiner Geburtstagsparty am Samstag eingeladen.",
        points: ["Danken Sie für die Einladung.", "Sagen Sie, ob Sie kommen.", "Fragen Sie, was Sie mitbringen sollen.", "Fragen Sie nach dem Weg."],
        words: "yakl. 30–40 Wörter",
        model: "Lieber Tom, vielen Dank für deine Einladung! Ich komme sehr gern zu deiner Party. Soll ich etwas mitbringen, vielleicht einen Salat? Und wie komme ich zu dir? Fährt ein Bus? Bis Samstag! Liebe Grüße, Ayşe",
      },
    ]),
    sec("sprechen", "yakl. 15 dk.", [
      {
        kind: "speak",
        id: "ta2-sp1",
        title: "Teil 1 · Kontaktaufnahme",
        instructionTr: "Kendini tanıt. Aşağıdaki konuların hepsinden kısaca bahset.",
        card: "Stellen Sie sich vor.",
        points: ["Name", "Alter", "Land / Wohnort", "Sprachen", "Beruf", "Hobby"],
        model: "Ich heiße Ayşe Demir und bin 29 Jahre alt. Ich komme aus der Türkei und wohne seit zwei Jahren in Köln. Ich spreche Türkisch, Englisch und ein bisschen Deutsch. Ich arbeite als Verkäuferin. In meiner Freizeit lese ich gern und gehe spazieren.",
      },
      {
        kind: "speak",
        id: "ta2-sp3",
        title: "Teil 3 · Gemeinsam etwas planen",
        instructionTr: "Bir kurs arkadaşınla birlikte kursun son günü için küçük bir parti planla. Öneri yap ve cevap ver.",
        card: "Sie möchten mit Ihrem Kurs ein kleines Abschlussfest machen.",
        points: ["Wann?", "Wo?", "Essen und Getränke?", "Wer macht was?"],
        model: "Wollen wir das Fest am letzten Kurstag machen? Wir können im Kursraum feiern. Jeder bringt etwas zu essen mit. Ich mache einen Kuchen. Kannst du die Getränke kaufen? Und wer fragt die Lehrerin?",
      },
    ]),
  ],
};

/* ======================= Goethe-Zertifikat B1 ======================= */
const GOETHE_B1: Exam = {
  id: "goethe-b1",
  provider: "Goethe",
  level: "B1",
  title: "Goethe-Zertifikat B1",
  formatTr: [
    "Modüler sınav: Lesen, Hören, Schreiben ve Sprechen ayrı ayrı veya birlikte alınabilir.",
    "Lesen beş, Hören dört bölümlüdür. Blog yazıları, ilanlar, görüşler, anonslar ve tartışmalar.",
    "Schreiben üç görev: samimi bir e-posta, bir forum yorumu ve kısa resmî bir mesaj.",
    "Sprechen: birlikte planlama, bir konuyu sunma ve sunum hakkında konuşma.",
  ],
  sections: [
    sec("lesen", "yakl. 65 dk.", [
      {
        kind: "tf",
        id: "gb1-l1",
        title: "Teil 1 · Blogeintrag",
        instructionTr: "Blog yazısını oku. Cümleler doğru mu yanlış mı?",
        labels: ["Richtig", "Falsch"],
        text: `Mein erstes Jahr in Leipzig

Vor einem Jahr bin ich für meine Ausbildung als Pflegefachfrau nach Leipzig gezogen. Am Anfang war alles schwierig: Ich kannte niemanden und mein Deutsch war noch nicht so gut. Bei der Arbeit haben die Kolleginnen schnell gesprochen, und ich habe oft nur die Hälfte verstanden.

Geholfen hat mir vor allem ein Sprachcafé, das jeden Donnerstag in der Stadtbibliothek stattfindet. Dort habe ich nicht nur besser Deutsch gelernt, sondern auch meine beste Freundin Marta kennengelernt. Inzwischen fühle ich mich hier wohl. Nur das Wetter im Winter vermisse ich nicht – ich freue mich schon auf meinen Urlaub in Antalya!`,
        statements: [
          { s: "Die Autorin macht in Leipzig eine Ausbildung.", answer: true, why: "„für meine Ausbildung als Pflegefachfrau“." },
          { s: "Am Anfang hat sie bei der Arbeit alles verstanden.", answer: false, why: "„oft nur die Hälfte verstanden“: çoğu zaman sadece yarısını anladı." },
          { s: "Sie hat ihre Freundin in einem Sprachcafé kennengelernt.", answer: true, why: "Dil kafesinde Marta ile tanıştı." },
          { s: "Sie findet den Winter in Leipzig schön.", answer: false, why: "Kış havasını özlemeyeceğini söylüyor: sevmiyor." },
        ],
      },
      {
        kind: "tf",
        id: "gb1-l4",
        title: "Teil 4 · Meinungen",
        instructionTr: "Bir gazete sorusuna verilen görüşleri oku. Kişi „Handyverbot in der Schule“ fikrine katılıyor mu (Ja) katılmıyor mu (Nein)?",
        labels: ["Ja", "Nein"],
        text: `Frage: Sollen Handys in der Schule verboten werden?

Lukas, 41: Meine Tochter schaut in jeder Pause auf ihr Handy und spricht kaum mit anderen Kindern. Ohne Handy würden die Kinder wieder mehr zusammen spielen.

Derya, 35: Ein Verbot ist keine Lösung. Die Kinder müssen lernen, vernünftig mit dem Handy umzugehen – und das lernen sie nicht, wenn man es einfach verbietet.

Frank, 58: Als Lehrer sehe ich jeden Tag, wie schlecht sich Schüler konzentrieren, wenn das Handy auf dem Tisch liegt. Im Unterricht sollte es in der Tasche bleiben, am besten den ganzen Schultag.`,
        statements: [
          { s: "Lukas", answer: true, why: "Telefonsuz çocukların daha çok birlikte oynayacağını düşünüyor: yasağa evet." },
          { s: "Derya", answer: false, why: "„Ein Verbot ist keine Lösung.“ Yasak çözüm değil diyor." },
          { s: "Frank", answer: true, why: "Telefonun bütün okul günü çantada kalmasını istiyor." },
        ],
      },
    ]),
    sec("hoeren", "yakl. 40 dk.", [
      {
        kind: "tf",
        id: "gb1-h1",
        title: "Teil 1 · Kurze Texte",
        instructionTr: "Kısa metinleri dinle. Cümleler doğru mu yanlış mı?",
        labels: ["Richtig", "Falsch"],
        audio: [
          { speaker: "N", de: "Achtung an Gleis fünf: Der Regionalexpress nach Dresden fährt heute wegen Bauarbeiten von Gleis acht ab. Bitte beachten Sie außerdem: Der Zug hat etwa fünfzehn Minuten Verspätung." },
          { speaker: "N", de: "Hallo Herr Schneider, hier spricht Carola Lenz von der Autowerkstatt. Ihr Wagen ist fertig. Leider war die Reparatur etwas teurer als gedacht, weil wir auch die Bremsen wechseln mussten. Sie können das Auto ab morgen früh abholen." },
        ],
        statements: [
          { s: "Der Zug nach Dresden fährt heute von einem anderen Gleis ab.", answer: true, why: "Beşinci peron yerine sekizinci perondan kalkıyor." },
          { s: "Herr Schneider kann sein Auto heute Abend abholen.", answer: false, why: "„ab morgen früh“: yarın sabahtan itibaren." },
          { s: "Die Reparatur kostet mehr als geplant.", answer: true, why: "„etwas teurer als gedacht“." },
        ],
      },
      {
        kind: "mc",
        id: "gb1-h4",
        title: "Teil 4 · Diskussion",
        instructionTr: "Bir radyo tartışmasını dinle. Kim ne söylüyor? Doğru kişiyi seç.",
        audio: [
          { speaker: "N", de: "Unser Thema heute: Homeoffice. Bei mir sind Frau Brandt und Herr Özkan." },
          { speaker: "A", de: "Ich arbeite seit drei Jahren zwei Tage pro Woche zu Hause. Ich spare viel Zeit, weil ich nicht pendeln muss." },
          { speaker: "B", de: "Das verstehe ich. Aber mir fehlt im Homeoffice der Kontakt zu den Kollegen. Viele gute Ideen entstehen in der Kaffeeküche." },
          { speaker: "A", de: "Für die Kontakte haben wir feste Bürotage. Das funktioniert bei uns gut." },
          { speaker: "B", de: "Außerdem ist meine Wohnung zu klein. Ich habe zu Hause keinen richtigen Schreibtisch." },
        ],
        questions: [
          { q: "Wer spart durch Homeoffice Zeit?", options: ["Moderator", "Frau Brandt", "Herr Özkan"], answer: 1, why: "İlk konuşan Frau Brandt: işe gidip gelmediği için zaman kazanıyor." },
          { q: "Wer vermisst die Kollegen?", options: ["Moderator", "Frau Brandt", "Herr Özkan"], answer: 2, why: "Herr Özkan: „mir fehlt … der Kontakt zu den Kollegen“." },
          { q: "Wer hat zu Hause keinen guten Arbeitsplatz?", options: ["Moderator", "Frau Brandt", "Herr Özkan"], answer: 2, why: "Herr Özkan'ın evi küçük, düzgün bir masası yok." },
        ],
      },
    ]),
    sec("schreiben", "yakl. 60 dk.", [
      {
        kind: "write",
        id: "gb1-s1",
        title: "Teil 1 · E-Mail an einen Freund",
        instructionTr: "Arkadaşına samimi bir e-posta yaz. Üç noktanın hepsine değin. Giriş ve kapanış cümlesi unutma.",
        situation: "Sie sind vor Kurzem in eine neue Stadt umgezogen. Schreiben Sie Ihrer Freundin Julia.",
        points: ["Beschreiben Sie: Wie gefällt Ihnen die neue Wohnung?", "Begründen Sie: Warum sind Sie umgezogen?", "Machen Sie einen Vorschlag für ein Treffen."],
        words: "yakl. 80 Wörter",
        model:
          "Liebe Julia,\nentschuldige, dass ich so lange nicht geschrieben habe, aber ich bin vor zwei Wochen nach Hamburg umgezogen! Meine neue Wohnung gefällt mir sehr gut. Sie ist hell, hat einen kleinen Balkon und liegt direkt an einem Park. Ich bin umgezogen, weil ich hier eine neue Stelle in einem Krankenhaus gefunden habe. Hast du nicht Lust, mich bald zu besuchen? Vielleicht am ersten Wochenende im Dezember? Dann zeige ich dir die Stadt.\nLiebe Grüße\nZeynep",
      },
      {
        kind: "write",
        id: "gb1-s3",
        title: "Teil 3 · Nachricht an die Kursleiterin",
        instructionTr: "Kurs öğretmenine kibar, resmî bir mesaj yaz. Hitap ve kapanışı unutma.",
        situation: "Sie können nächste Woche nicht am Kurs teilnehmen, weil Sie eine Fortbildung haben. Schreiben Sie Ihrer Kursleiterin, Frau Berger.",
        points: ["Entschuldigen Sie sich höflich.", "Nennen Sie den Grund.", "Bitten Sie um die Unterlagen."],
        words: "yakl. 40 Wörter",
        model: "Sehr geehrte Frau Berger,\nleider kann ich nächste Woche nicht am Kurs teilnehmen, da ich eine Fortbildung bei meiner Firma habe. Könnten Sie mir bitte die Unterlagen per E-Mail schicken? Vielen Dank für Ihr Verständnis.\nMit freundlichen Grüßen\nAli Şahin",
      },
    ]),
    sec("sprechen", "yakl. 15 dk.", [
      {
        kind: "speak",
        id: "gb1-sp1",
        title: "Teil 1 · Gemeinsam etwas planen",
        instructionTr: "Bir kurs arkadaşın hastanede. Onu birlikte ziyaret etmeyi planlayın: öneri yap, karşı öneriye tepki ver.",
        card: "Eine Kursteilnehmerin liegt im Krankenhaus. Sie möchten sie zusammen besuchen.",
        points: ["Wann besuchen?", "Wie hinfahren?", "Geschenk?", "Wer kommt noch mit?"],
        model: "Was hältst du davon, wenn wir Sara am Samstagnachmittag besuchen? Dann haben wir beide frei. Wir könnten mit der Straßenbahn fahren, die hält direkt vor dem Krankenhaus. Als Geschenk würde ich Blumen vorschlagen – oder lieber ein Buch? Vielleicht fragen wir auch die anderen aus dem Kurs, ob sie mitkommen möchten.",
      },
      {
        kind: "speak",
        id: "gb1-sp2",
        title: "Teil 2 · Ein Thema präsentieren",
        instructionTr: "Bir konuyu kısa bir sunumla anlat: kendi deneyimin, ülkendeki durum, artılar ve eksiler, kendi görüşün.",
        card: "Thema: Sollten Kinder schon im Kindergarten eine Fremdsprache lernen?",
        points: ["Eigene Erfahrungen", "Situation in Ihrem Heimatland", "Vor- und Nachteile", "Ihre Meinung"],
        model:
          "Ich spreche heute über das Thema „Fremdsprachen im Kindergarten“. Ich selbst habe erst mit zehn Jahren Englisch gelernt. In der Türkei bieten heute viele private Kindergärten Englisch an. Ein Vorteil ist, dass kleine Kinder Sprachen sehr leicht lernen. Ein Nachteil ist, dass es für manche Kinder zu viel sein kann. Meiner Meinung nach ist es gut, wenn es spielerisch passiert. Vielen Dank fürs Zuhören.",
      },
    ]),
  ],
};

/* ======================= telc Deutsch B1 ======================= */
const TELC_B1: Exam = {
  id: "telc-b1",
  provider: "telc",
  level: "B1",
  title: "telc Deutsch B1",
  formatTr: [
    "Yazılı sınav: Leseverstehen, Sprachbausteine, Hörverstehen, Schriftlicher Ausdruck.",
    "Sprachbausteine (dil yapıları) telc'e özgüdür: bir mektuptaki boşlukları dilbilgisi ve kelimelerle doldurursun.",
    "Yazmada bir mektup veya e-posta yazılır; verilen dört noktanın en az üçüne değinilir.",
    "Sözlü sınav çiftler hâlinde: tanışma, bir konu hakkında konuşma, birlikte bir şey planlama.",
  ],
  sections: [
    sec("lesen", "Lesen + Sprachbausteine yakl. 90 dk.", [
      {
        kind: "mc",
        id: "tb1-l1",
        title: "Leseverstehen Teil 1 · Überschriften",
        instructionTr: "Her kısa metin için en uygun başlığı seç.",
        text: `1) In vielen Städten bieten Bibliotheken jetzt nicht nur Bücher an. Man kann dort auch Werkzeug, Spiele oder sogar Nähmaschinen ausleihen – kostenlos mit dem Bibliotheksausweis.

2) Immer mehr Firmen erlauben ihren Mitarbeitern, im Sommer früher anzufangen. Wer um sechs Uhr beginnt, hat schon am frühen Nachmittag frei und kann die heißen Stunden draußen genießen.

3) Eine Umfrage zeigt: Fast die Hälfte der Deutschen kocht weniger als dreimal pro Woche selbst. Besonders junge Leute bestellen lieber Essen oder essen in der Kantine.`,
        questions: [
          { q: "Text 1", options: ["Mehr als Bücher leihen", "Bibliotheken werden teurer", "Neue Öffnungszeiten im Sommer"], answer: 0, why: "Kütüphanelerden kitap dışında şeyler de ödünç alınabiliyor." },
          { q: "Text 2", options: ["Weniger Urlaub für Angestellte", "Früher anfangen, früher Feierabend", "Hitze: Büros bleiben geschlossen"], answer: 1, why: "Erken başlayan erken çıkıyor." },
          { q: "Text 3", options: ["Junge Leute kochen am liebsten", "Kantinen schließen", "Selbst kochen wird seltener"], answer: 2, why: "İnsanların yarısına yakını haftada üçten az yemek yapıyor." },
        ],
      },
    ]),
    sec("sprachbausteine", "Lesen + Sprachbausteine yakl. 90 dk.", [
      {
        kind: "gap",
        id: "tb1-sb1",
        title: "Sprachbausteine Teil 1",
        instructionTr: "Mektubu oku. Her boşluk için doğru kelimeyi seç (a, b veya c).",
        text: `Liebe Frau Krüger,

vielen Dank für Ihre E-Mail. Ich freue mich sehr, (1) Sie mich zu Ihrem Sommerfest eingeladen haben. Leider kann ich nicht kommen, (2) ich an diesem Wochenende bei meinen Eltern in Bursa bin. Ich habe den Flug schon (3) drei Monaten gebucht.

Könnten Sie mir vielleicht ein paar Fotos (4)? Ich würde gern sehen, wie das Fest war.

Mit freundlichen Grüßen
Elif Arslan`,
        gaps: [
          { q: "(1)", options: ["dass", "ob", "wenn"], answer: 0, why: "sich freuen, dass … : -dığına sevinmek." },
          { q: "(2)", options: ["denn", "weil", "deshalb"], answer: 1, why: "Fiil (bin) sonda → yan cümle → weil. denn'den sonra fiil 2. sırada olurdu." },
          { q: "(3)", options: ["seit", "vor", "für"], answer: 1, why: "Geçmişte bir an: vor drei Monaten (üç ay önce)." },
          { q: "(4)", options: ["schicken", "geschickt", "schickt"], answer: 0, why: "Könnten Sie … + mastar sonda: schicken." },
        ],
      },
    ]),
    sec("hoeren", "yakl. 30 dk.", [
      {
        kind: "tf",
        id: "tb1-h1",
        title: "Hörverstehen Teil 1 · Globalverstehen",
        instructionTr: "Kısa haberleri dinle. Cümleler doğru mu yanlış mı?",
        labels: ["Richtig", "Falsch"],
        audio: [
          { speaker: "N", de: "Ab nächstem Monat fahren die Busse in der Innenstadt auch nachts. Die Linien 3 und 7 fahren dann bis zwei Uhr morgens im Halbstundentakt." },
          { speaker: "N", de: "Das Stadtfest am Wochenende muss wegen des schlechten Wetters verschoben werden. Ein neuer Termin wird noch bekannt gegeben." },
          { speaker: "N", de: "Das Schwimmbad am Stadtpark öffnet nach der Renovierung wieder. In der ersten Woche ist der Eintritt für alle Besucher frei." },
        ],
        statements: [
          { s: "Einige Buslinien fahren bald auch in der Nacht.", answer: true, why: "3 ve 7 numaralı hatlar gece ikiye kadar çalışacak." },
          { s: "Das Stadtfest findet am Wochenende statt.", answer: false, why: "Kötü hava yüzünden erteleniyor (verschoben)." },
          { s: "In der ersten Woche muss man im Schwimmbad nichts bezahlen.", answer: true, why: "„der Eintritt … frei“: giriş ücretsiz." },
        ],
      },
    ]),
    sec("schreiben", "yakl. 30 dk.", [
      {
        kind: "write",
        id: "tb1-s1",
        title: "Schriftlicher Ausdruck · Brief",
        instructionTr: "Bir arkadaşının mektubuna cevap yaz. Dört noktadan en az üçüne değin. Hitap, giriş, kapanış ve selamı unutma.",
        situation: "Ihre Freundin Nora hat geschrieben: Sie möchte im Frühling eine Woche Urlaub in Ihrer Stadt machen und fragt Sie um Rat.",
        points: ["Beste Reisezeit", "Was man unbedingt sehen muss", "Wo man günstig übernachten kann", "Ob Sie Zeit für ein Treffen haben"],
        words: "yakl. 100–150 Wörter",
        model:
          "Liebe Nora,\nvielen Dank für deinen Brief. Ich freue mich sehr, dass du meine Stadt besuchen möchtest! Am besten kommst du Ende April, dann ist es schon warm, aber noch nicht so voll. Du musst unbedingt die Altstadt und den Markt am Fluss sehen. Am Samstag gibt es dort frisches Obst und tolle Musik. Günstig übernachten kannst du in der Jugendherberge am Bahnhof, ein Bett kostet etwa 30 Euro. Natürlich habe ich Zeit für dich! Wir könnten zusammen essen gehen oder eine Radtour machen. Schreib mir bitte, wann genau du kommst.\nViele liebe Grüße\nDeine Hatice",
      },
    ]),
    sec("sprechen", "yakl. 15 dk. (çiftler hâlinde)", [
      {
        kind: "speak",
        id: "tb1-sp2",
        title: "Teil 2 · Gespräch über ein Thema",
        instructionTr: "Kısa bir metin okuduğunu düşün. Konuyu özetle, kendi deneyimini ve görüşünü söyle.",
        card: "Thema: Immer mehr Menschen kaufen Kleidung secondhand.",
        points: ["Worum geht es?", "Eigene Erfahrung", "Vorteile / Nachteile", "Ihre Meinung"],
        model:
          "In meinem Text geht es darum, dass immer mehr Menschen gebrauchte Kleidung kaufen. Ich habe auch schon einige Jacken auf dem Flohmarkt gekauft. Ein Vorteil ist, dass es billiger und besser für die Umwelt ist. Ein Nachteil ist, dass man nicht immer die richtige Größe findet. Ich finde den Trend gut, weil wir sowieso zu viel kaufen.",
      },
      {
        kind: "speak",
        id: "tb1-sp3",
        title: "Teil 3 · Gemeinsam etwas planen",
        instructionTr: "Bir arkadaşınla birlikte kurs için bir gezi planla. Öneri yap, öneriye cevap ver, birlikte karar ver.",
        card: "Sie möchten mit Ihrem Deutschkurs einen Ausflug machen.",
        points: ["Wohin?", "Wann?", "Wie fahren Sie?", "Essen?", "Kosten?"],
        model: "Ich schlage vor, dass wir an einen See fahren. Was meinst du? – Gute Idee, aber vielleicht ist es im Oktober zu kalt. – Stimmt. Dann lieber im Mai? Wir könnten mit dem Zug fahren, das ist günstig. Jeder bringt etwas zum Essen mit. Wenn wir ein Gruppenticket nehmen, kostet es nur zehn Euro pro Person.",
      },
    ]),
  ],
};

export const EXAMS: Exam[] = [GOETHE_A2, TELC_A2, GOETHE_B1, TELC_B1];
export const EXAMS_BY_ID: Record<string, Exam> = Object.fromEntries(EXAMS.map((e) => [e.id, e]));

export function taskTotal(t: ExamTask): number {
  switch (t.kind) {
    case "mc":
      return t.questions.length;
    case "tf":
      return t.statements.length;
    case "gap":
      return t.gaps.length;
    default:
      return 10; // productive tasks are scored out of 10
  }
}
