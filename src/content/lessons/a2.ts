import type { Lesson } from "../types";

export const A2_1: Lesson[] = [
  {
    slug: "dativ",
    level: "A2.1",
    title: "Ich gebe dem Mann einen Apfel",
    titleTr: "Dativ: -e hâli (kime?)",
    goalTr: "Alan kişi Dativ, verilen şey Akkusativ.",
    topic: "dativ",
    intro: {
      visual: "give-scene",
      sentence: "[nom:Ich] [verb:gebe] [dat:dem Mann] [akk:einen Apfel].",
      tr: "Adama bir elma veriyorum.",
      caption: "Kime veriyorum? → dem Mann (Dativ). Ne veriyorum? → einen Apfel (Akkusativ).",
    },
    explain: {
      visual: "dat-table",
      points: [
        "Dativ = alan kişi. Soru: Wem? (Kime?) Türkçedeki “-e/-a” hâli gibi: adama.",
        "der → dem, die → der, das → dem, çoğul → den (+n).",
        "ein → einem, eine → einer. Bazı fiiller hep Dativ ister: helfen, danken, gehören, gefallen.",
      ],
    },
    examples: [
      { de: "[nom:Ich] [verb:gebe] [dat:dem Mann] [akk:einen Apfel].", tr: "Adama bir elma veriyorum." },
      { de: "[nom:Sie] [verb:schenkt] [dat:der Frau] [akk:eine Blume].", tr: "Kadına bir çiçek hediye ediyor.", note: "die Frau → der Frau" },
      { de: "[nom:Wir] [verb:zeigen] [dat:dem Kind] [akk:das Buch].", tr: "Çocuğa kitabı gösteriyoruz." },
      { de: "[nom:Ich] [verb:helfe] [dat:meiner Mutter].", tr: "Anneme yardım ediyorum.", note: "helfen + Dativ" },
    ],
    vocab: ["mann", "frau", "kind", "apfel", "blume"],
    practice: [
      { kind: "choice", q: "Ich gebe ___ Frau den Schlüssel.", tr: "Kadına anahtarı veriyorum.", options: ["die", "der", "dem"], answer: 1, why: "die Frau → Dativ: der Frau." },
      { kind: "choice", q: "Er schenkt ___ Kind einen Ball.", tr: "Çocuğa bir top hediye ediyor.", options: ["das", "den", "dem"], answer: 2, why: "das Kind → Dativ: dem Kind." },
      { kind: "choice", q: "Ich helfe ___ Mann.", tr: "Adama yardım ediyorum.", options: ["den", "dem", "der"], answer: 1, why: "helfen Dativ ister: dem Mann." },
    ],
    test: [
      { kind: "choice", q: "Das Auto gehört ___ Frau.", tr: "Araba kadına ait.", options: ["die", "der", "den"], answer: 1, why: "gehören + Dativ: der Frau." },
      { kind: "choice", q: "Sie gibt ___ Kind einen Apfel.", tr: "Bir çocuğa bir elma veriyor.", options: ["ein", "einem", "einen"], answer: 1, why: "das Kind → ein → einem Kind." },
      { kind: "choice", q: "Wir schreiben ___ Freunden einen Brief.", tr: "Arkadaşlara bir mektup yazıyoruz.", options: ["den", "dem", "die"], answer: 0, why: "Çoğul Dativ: den Freunden (isim de -n alır)." },
      { kind: "type", q: "Ich danke ___ Arzt.", tr: "Doktora teşekkür ediyorum.", answers: ["dem"], why: "danken + Dativ, der Arzt → dem Arzt." },
    ],
  },
  {
    slug: "wechselpraepositionen",
    level: "A2.1",
    title: "Wo ist die Katze?",
    titleTr: "Wechselpräpositionen: Wo? / Wohin?",
    goalTr: "Durum (Wo?) → Dativ. Hareket (Wohin?) → Akkusativ.",
    topic: "wechselpraepositionen",
    intro: {
      visual: "room",
      sentence: "Die Katze ist [dat:auf dem Karton].",
      tr: "Kedi kutunun üstünde.",
      caption: "Bir edat seç, kedi oraya gitsin.",
    },
    explain: {
      visual: "wo-wohin",
      points: [
        "Dokuz edat iki hâl alabilir: in, an, auf, unter, über, neben, vor, hinter, zwischen.",
        "Wo? (Nerede?) bir yerde duruyorsa → Dativ: Die Katze ist auf dem Karton.",
        "Wohin? (Nereye?) bir yere gidiyorsa → Akkusativ: Die Katze springt auf den Karton.",
      ],
      rule: "Wo? → [dat:Dativ] (durum) · Wohin? → [akk:Akkusativ] (hareket)",
    },
    examples: [
      { de: "Die Katze ist [dat:im Karton].", tr: "Kedi kutunun içinde.", note: "im = in dem" },
      { de: "Die Katze springt [akk:in den Karton].", tr: "Kedi kutunun içine atlıyor." },
      { de: "Das Buch liegt [dat:auf dem Tisch].", tr: "Kitap masanın üstünde duruyor." },
      { de: "Ich lege das Buch [akk:auf den Tisch].", tr: "Kitabı masanın üstüne koyuyorum." },
    ],
    vocab: ["katze", "karton", "tisch", "sofa", "schrank", "bett"],
    practice: [
      { kind: "choice", q: "Die Katze sitzt unter ___ Tisch.", tr: "Kedi masanın altında oturuyor.", options: ["den", "dem"], answer: 1, why: "sitzen = durum (Wo?) → Dativ: unter dem Tisch." },
      { kind: "choice", q: "Die Katze springt auf ___ Sofa.", tr: "Kedi kanepenin üstüne atlıyor.", options: ["das", "dem"], answer: 0, why: "springen = hareket (Wohin?) → Akkusativ: auf das Sofa." },
      { kind: "choice", q: "Ich stelle die Lampe neben ___ Bett.", tr: "Lambayı yatağın yanına koyuyorum.", options: ["das", "dem"], answer: 0, why: "stellen = bir yere koymak (Wohin?) → Akkusativ: neben das Bett." },
    ],
    test: [
      { kind: "choice", q: "Der Hund liegt vor ___ Tür.", tr: "Köpek kapının önünde yatıyor.", options: ["die", "der"], answer: 1, why: "liegen = durum → Dativ: die Tür → vor der Tür." },
      { kind: "choice", q: "Ich hänge das Bild an ___ Wand.", tr: "Resmi duvara asıyorum.", options: ["die", "der"], answer: 0, why: "hängen (asmak) = hareket → Akkusativ: an die Wand." },
      { kind: "choice", q: "Die Tasche steht zwischen ___ .", tr: "Çanta sandalye ile masanın arasında duruyor.", options: ["dem Stuhl und dem Tisch", "den Stuhl und den Tisch"], answer: 0, why: "stehen = durum → Dativ: zwischen dem Stuhl und dem Tisch." },
      { kind: "type", q: "Wir gehen in ___ Supermarkt.", tr: "Süpermarkete gidiyoruz.", answers: ["den"], why: "gehen = hareket (Wohin?) → Akkusativ: in den Supermarkt." },
    ],
  },
  {
    slug: "perfekt",
    level: "A2.1",
    title: "Ich habe gegessen",
    titleTr: "Perfekt: geçmiş zaman",
    goalTr: "Geçmişi anlatmak için: haben/sein + Partizip II (sonda).",
    topic: "perfekt",
    intro: {
      visual: "perfekt-timeline",
      sentence: "Gestern [verb:habe] [nom:ich] einen Apfel [end:gegessen].",
      tr: "Dün bir elma yedim.",
      caption: "Konuşurken geçmiş için en çok Perfekt kullanılır.",
    },
    explain: {
      visual: "perfekt-bracket",
      points: [
        "haben veya sein 2. sırada çekilir. Partizip II cümlenin en sonuna gider.",
        "Düzenli fiiller: ge- + kök + -t → machen → gemacht. Düzensizler: ge- + … + -en → essen → gegessen.",
        "Hareket veya değişim (gehen, fahren, kommen, aufstehen) ve sein, bleiben → sein ile.",
      ],
    },
    examples: [
      { de: "[nom:Wir] [verb:haben] Deutsch [end:gelernt].", tr: "Almanca öğrendik." },
      { de: "[nom:Sie] [verb:ist] nach Berlin [end:gefahren].", tr: "O Berlin'e gitti.", note: "fahren → sein" },
      { de: "[nom:Ich] [verb:bin] zu Hause [end:geblieben].", tr: "Evde kaldım." },
      { de: "[verb:Hast] [nom:du] den Film [end:gesehen]?", tr: "Filmi izledin mi?" },
    ],
    vocab: ["apfel", "brief", "bahnhof", "bus"],
    practice: [
      { kind: "choice", q: "Ich ___ gestern Fußball gespielt.", tr: "Dün futbol oynadım.", options: ["habe", "bin"], answer: 0, why: "spielen hareket/yer değişimi değil → haben." },
      { kind: "choice", q: "Er ___ nach Hause gegangen.", tr: "O eve gitti.", options: ["hat", "ist"], answer: 1, why: "gehen = bir yerden bir yere hareket → sein." },
      { kind: "type", q: "Wir haben Pizza ___ . (essen)", tr: "Pizza yedik.", answers: ["gegessen"], why: "essen düzensiz: gegessen." },
    ],
    test: [
      { kind: "order", words: ["Ich", "habe", "gestern", "einen", "Brief", "geschrieben"], tr: "Dün bir mektup yazdım.", why: "habe 2. sırada, geschrieben en sonda." },
      { kind: "choice", q: "Sie ist um sieben Uhr ___ .", tr: "Saat yedide kalktı.", options: ["aufgestanden", "geaufstanden", "aufgesteht"], answer: 0, why: "Ayrılabilen fiillerde ge- ortaya girer: auf-ge-standen." },
      { kind: "choice", q: "Hast du den Film ___ ?", tr: "Filmi izledin mi?", options: ["gesehen", "gesieht", "sehen"], answer: 0, why: "sehen düzensiz: gesehen." },
      { kind: "choice", q: "Wir ___ mit dem Bus gefahren.", tr: "Otobüsle gittik.", options: ["haben", "sind"], answer: 1, why: "fahren = hareket → sein: wir sind gefahren." },
    ],
  },
];

export const A2_2: Lesson[] = [
  {
    slug: "weil",
    level: "A2.2",
    title: "…, weil ich müde bin",
    titleTr: "weil ve dass: fiil sona gider",
    goalTr: "weil ve dass ile başlayan yan cümlede çekimli fiil en sonda.",
    topic: "nebensatz",
    intro: {
      visual: "weil-merge",
      sentence: "Ich bleibe zu Hause, [conj:weil] es [end:regnet].",
      tr: "Evde kalıyorum, çünkü yağmur yağıyor.",
      caption: "İki cümleyi weil ile birleştir. Fiil sona kayar.",
    },
    explain: {
      points: [
        "weil = çünkü. Bir sebep verir.",
        "weil'den sonra fiil cümlenin en sonuna gider: …, weil es regnet.",
        "dass (ki, -dığını) aynı kuralı izler: Ich glaube, dass er kommt. Yan cümleden önce hep virgül.",
      ],
      rule: "Es [verb:regnet]. → …, [conj:weil] es [end:regnet].",
    },
    examples: [
      { de: "Ich lerne Deutsch, [conj:weil] ich in Deutschland arbeiten [end:möchte].", tr: "Almanca öğreniyorum, çünkü Almanya'da çalışmak istiyorum." },
      { de: "Er kommt nicht, [conj:weil] er krank [end:ist].", tr: "O gelmiyor, çünkü hasta." },
      { de: "Ich glaube, [conj:dass] der Bus gleich [end:kommt].", tr: "Bence otobüs birazdan gelir." },
      { de: "Sie sagt, [conj:dass] sie keine Zeit [end:hat].", tr: "Vakti olmadığını söylüyor." },
    ],
    vocab: ["regen", "bus", "arzt", "apotheke"],
    practice: [
      { kind: "order", words: ["weil", "ich", "müde", "bin"], tr: "çünkü yorgunum", why: "weil başta, çekimli fiil bin en sonda.", fixedFirst: true },
      { kind: "choice", q: "Ich gehe zum Arzt, weil ich Kopfschmerzen ___ .", tr: "Doktora gidiyorum, çünkü başım ağrıyor.", options: ["habe", "hab ich", "haben"], answer: 0, why: "weil → fiil sonda: …, weil ich Kopfschmerzen habe." },
      { kind: "choice", q: "Ich weiß, ___ du Recht hast.", tr: "Haklı olduğunu biliyorum.", options: ["weil", "dass"], answer: 1, why: "“-dığını” → dass. weil sebep bildirir." },
    ],
    test: [
      { kind: "choice", q: "Sie lernt viel, weil sie die Prüfung ___ .", tr: "Çok çalışıyor, çünkü sınavı geçmek istiyor.", options: ["bestehen will", "will bestehen"], answer: 0, why: "Modal fiil (will) en sona: …, weil sie die Prüfung bestehen will." },
      { kind: "order", words: ["dass", "er", "keine", "Zeit", "hat"], tr: "onun vakti olmadığını", why: "dass yan cümlesi: çekimli fiil hat en sonda.", fixedFirst: true },
      { kind: "choice", q: "Wir bleiben zu Hause, ___ es regnet.", tr: "Evde kalıyoruz, çünkü yağmur yağıyor.", options: ["weil", "dass"], answer: 0, why: "Sebep → weil." },
      { kind: "type", q: "Er sagt, dass er heute keine Zeit ___ . (haben)", tr: "Bugün vakti olmadığını söylüyor.", answers: ["hat"], why: "dass → fiil sonda, er → hat." },
    ],
  },
  {
    slug: "komparativ",
    level: "A2.2",
    title: "groß, größer, am größten",
    titleTr: "Karşılaştırma: Komparativ ve Superlativ",
    goalTr: "Karşılaştırma -er + als. En: am … -sten.",
    topic: "komparativ",
    intro: {
      visual: "comparison",
      sentence: "Der Hund ist [akk:größer] [conj:als] die Katze.",
      tr: "Köpek kediden daha büyük.",
      caption: "Üç ağaca bak: groß, größer, am größten.",
    },
    explain: {
      points: [
        "Daha …: sıfat + -er. Karşılaştırılan şey “als” ile gelir: größer als (…den daha büyük).",
        "En …: am + sıfat + -sten: am größten, am schnellsten.",
        "Kısa sıfatlar çoğu zaman Umlaut alır: alt → älter, jung → jünger. Düzensiz: gut → besser → am besten, gern → lieber → am liebsten.",
      ],
      rule: "groß → größ[akk:er] → am größ[akk:ten] · gut → [akk:besser] → am [akk:besten]",
    },
    examples: [
      { de: "Mein Bruder ist [akk:älter] [conj:als] ich.", tr: "Ağabeyim benden büyük." },
      { de: "Der Zug ist [akk:schneller] [conj:als] der Bus.", tr: "Tren otobüsten daha hızlı." },
      { de: "Ich trinke [akk:lieber] Tee [conj:als] Kaffee.", tr: "Çayı kahveye tercih ederim." },
      { de: "Im Winter ist es hier [akk:am kältesten].", tr: "Burası kışın en soğuk." },
    ],
    vocab: ["baum", "hund", "katze", "bus"],
    practice: [
      { kind: "choice", q: "Berlin ist ___ als München.", tr: "Berlin Münih'ten daha büyük.", options: ["groß", "größer", "am größten"], answer: 1, why: "Karşılaştırma + als → größer." },
      { kind: "choice", q: "Pizza schmeckt gut, aber Döner schmeckt ___ .", tr: "Pizza güzel ama döner daha güzel.", options: ["guter", "besser", "mehr gut"], answer: 1, why: "gut düzensiz: besser." },
      { kind: "type", q: "Meine Schwester ist ___ als ich. (jung)", tr: "Kız kardeşim benden küçük.", answers: ["jünger"], why: "jung → jünger (u → ü)." },
    ],
    test: [
      { kind: "choice", q: "Wer läuft ___ ?", tr: "En hızlı kim koşuyor?", options: ["am schnellsten", "schneller", "am schneller"], answer: 0, why: "En … → am schnellsten." },
      { kind: "choice", q: "Ich esse ___ Fisch als Fleisch.", tr: "Balığı ete tercih ederim.", options: ["gerner", "lieber", "mehr gern"], answer: 1, why: "gern → lieber → am liebsten." },
      { kind: "choice", q: "Der Koffer ist schwerer ___ die Tasche.", tr: "Bavul çantadan daha ağır.", options: ["wie", "als", "dann"], answer: 1, why: "Komparativ + als." },
      { kind: "type", q: "Das Wetter ist heute ___ als gestern. (warm)", tr: "Hava bugün dünden daha sıcak.", answers: ["wärmer"], why: "warm → wärmer (a → ä)." },
    ],
  },
  {
    slug: "reflexiv",
    level: "A2.2",
    title: "Ich freue mich",
    titleTr: "Dönüşlü fiiller",
    goalTr: "Eylem kişinin kendisine dönüyorsa: mich, dich, sich, uns, euch, sich.",
    topic: "reflexiv",
    intro: {
      visual: "reflexive",
      sentence: "[nom:Ich] [verb:wasche] [akk:mich].",
      tr: "Yıkanıyorum. (Kendimi yıkıyorum.)",
      caption: "Ok, kişinin kendisine geri dönüyor.",
    },
    explain: {
      points: [
        "Türkçedeki “-n” eki (yıkanmak, hazırlanmak) veya “kendimi” gibi düşün.",
        "Zamir kişiye göre değişir: ich → mich, du → dich, er/sie/es → sich, wir → uns, ihr → euch, sie/Sie → sich.",
        "Bazı fiiller hep dönüşlü: sich freuen (sevinmek), sich interessieren für (ilgilenmek), sich treffen (buluşmak).",
      ],
      rule: "ich … [akk:mich] · du … [akk:dich] · er … [akk:sich] · wir … [akk:uns] · ihr … [akk:euch]",
    },
    examples: [
      { de: "[nom:Du] [verb:freust] [akk:dich] auf das Wochenende.", tr: "Hafta sonunu dört gözle bekliyorsun." },
      { de: "[nom:Er] [verb:setzt] [akk:sich] auf das Sofa.", tr: "Kanepeye oturuyor." },
      { de: "[nom:Wir] [verb:treffen] [akk:uns] am Bahnhof.", tr: "İstasyonda buluşuyoruz." },
      { de: "[nom:Ich] [verb:interessiere] [akk:mich] für Musik.", tr: "Müzikle ilgileniyorum." },
    ],
    vocab: ["sofa", "bahnhof", "hand"],
    practice: [
      { kind: "choice", q: "Ich interessiere ___ für Fußball.", tr: "Futbolla ilgileniyorum.", options: ["mich", "mir", "sich"], answer: 0, why: "ich → mich." },
      { kind: "choice", q: "Freust du ___ auf den Urlaub?", tr: "Tatili dört gözle bekliyor musun?", options: ["sich", "dich", "mich"], answer: 1, why: "du → dich." },
      { kind: "type", q: "Wir treffen ___ um acht. ", tr: "Sekizde buluşuyoruz.", answers: ["uns"], why: "wir → uns." },
    ],
    test: [
      { kind: "choice", q: "Sie ärgert ___ über den Regen.", tr: "Yağmura sinirleniyor.", options: ["sich", "ihr", "sie"], answer: 0, why: "sie (o) → sich." },
      { kind: "choice", q: "Ihr müsst ___ beeilen!", tr: "Acele etmelisiniz!", options: ["uns", "euch", "sich"], answer: 1, why: "ihr → euch." },
      { kind: "order", words: ["Ich", "freue", "mich", "auf", "die", "Party"], tr: "Partiyi dört gözle bekliyorum.", why: "Fiil 2. sırada, dönüşlü zamir hemen arkasında." },
      { kind: "type", q: "Er wäscht ___ die Hände.", tr: "Ellerini yıkıyor.", answers: ["sich"], why: "er → sich. (Burada sich Dativ'dir ama er için şekli aynı.)" },
    ],
  },
];
