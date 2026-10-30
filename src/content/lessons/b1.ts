import type { Lesson } from "../types";

export const B1: Lesson[] = [
  {
    slug: "relativsatz",
    level: "B1",
    title: "Der Mann, der dort steht",
    titleTr: "İlgi cümleleri (Relativsätze)",
    goalTr: "Bir ismi açıklayan yan cümle. Zamir artikele benzer, fiil sona gider.",
    topic: "relativsatz",
    intro: {
      visual: "relative",
      sentence: "Das ist der Mann, [conj:der] neben mir [end:wohnt].",
      tr: "Bu, yanımda oturan adam.",
      caption: "Ok, açıklanan isme geri gidiyor.",
    },
    explain: {
      points: [
        "Türkçede “-en/-an, -dığı” ile söylediğimiz yapı: yanımda oturan adam.",
        "İlgi zamiri ismin artikeline benzer: der, die, das, çoğulda die. Akkusativ: den. Dativ: dem, der, dem, denen.",
        "Hâli yan cümledeki görevi belirler. Fiil en sona gider.",
      ],
      rule: "der Mann, [conj:der] … (Nom) · der Film, [conj:den] ich sehe (Akk) · der Mann, [conj:dem] ich helfe (Dat)",
    },
    examples: [
      { de: "Die Frau, [conj:die] dort [end:steht], ist Ärztin.", tr: "Orada duran kadın doktor." },
      { de: "Das Buch, [conj:das] ich [end:lese], ist spannend.", tr: "Okuduğum kitap heyecanlı." },
      { de: "Der Film, [conj:den] ich gesehen [end:habe], war gut.", tr: "İzlediğim film güzeldi.", note: "sehen + Akk → den" },
      { de: "Das sind die Kollegen, [conj:mit denen] ich [end:arbeite].", tr: "Bunlar birlikte çalıştığım meslektaşlar." },
    ],
    vocab: ["mann", "frau", "buch", "bus"],
    practice: [
      { kind: "choice", q: "Das ist das Kind, ___ im Garten spielt.", tr: "Bu, bahçede oynayan çocuk.", options: ["der", "die", "das"], answer: 2, why: "das Kind, yan cümlede özne → das." },
      { kind: "choice", q: "Die Tasche, ___ ich gekauft habe, ist rot.", tr: "Satın aldığım çanta kırmızı.", options: ["die", "der", "den"], answer: 0, why: "die Tasche, kaufen + Akk; dişilde Akk = die." },
      { kind: "choice", q: "Der Bus, ___ um acht Uhr kommt, ist immer voll.", tr: "Saat sekizde gelen otobüs hep dolu.", options: ["den", "der", "dem"], answer: 1, why: "der Bus, yan cümlede özne → der." },
    ],
    test: [
      { kind: "choice", q: "Der Kollege, ___ ich gestern getroffen habe, ist nett.", tr: "Dün buluştuğum meslektaş kibar.", options: ["der", "den", "dem"], answer: 1, why: "treffen + Akk, der Kollege → den." },
      { kind: "choice", q: "Der Mann, ___ ich helfe, ist mein Nachbar.", tr: "Yardım ettiğim adam komşum.", options: ["den", "dem", "der"], answer: 1, why: "helfen + Dativ → dem." },
      { kind: "order", words: ["die", "ich", "gestern", "gekauft", "habe"], tr: "dün satın aldığım (dişil)", why: "Zamir başta, çekimli fiil habe en sonda.", fixedFirst: true },
      { kind: "type", q: "Die Leute, ___ hier wohnen, sind freundlich.", tr: "Burada oturan insanlar cana yakın.", answers: ["die"], why: "Çoğul, özne → die." },
    ],
  },
  {
    slug: "passiv",
    level: "B1",
    title: "Das Auto wird repariert",
    titleTr: "Edilgen çatı (Passiv)",
    goalTr: "Kimin yaptığı önemli değilse: werden + Partizip II.",
    topic: "passiv",
    intro: {
      visual: "passive",
      sentence: "Das Auto [verb:wird] [end:repariert].",
      tr: "Araba tamir ediliyor.",
      caption: "Düğmeye bas: odak tamirciden arabaya kayar.",
    },
    explain: {
      points: [
        "Türkçedeki “-ıl/-ın” eki gibi: tamir edilir, yapılır, konuşulur.",
        "Şimdiki zaman: werden (2. sırada) + Partizip II (sonda): Das Auto wird repariert.",
        "Geçmiş: wurde + Partizip II: Das Haus wurde 1990 gebaut. Yapan kişi gerekirse “von + Dativ”.",
      ],
      rule: "[verb:wird] … [end:repariert] · [verb:wurde] … [end:gebaut]",
    },
    examples: [
      { de: "Die Briefe [verb:werden] heute [end:verschickt].", tr: "Mektuplar bugün gönderiliyor." },
      { de: "Hier [verb:wird] Deutsch [end:gesprochen].", tr: "Burada Almanca konuşulur." },
      { de: "Das Haus [verb:wurde] 1990 [end:gebaut].", tr: "Ev 1990'da inşa edildi." },
      { de: "Das Auto [verb:wird] [dat:von dem Mechaniker] [end:repariert].", tr: "Araba tamirci tarafından tamir ediliyor." },
    ],
    vocab: ["auto", "haus", "brief", "fenster"],
    practice: [
      { kind: "choice", q: "Die Pizza ___ gleich gebracht.", tr: "Pizza birazdan getiriliyor.", options: ["wird", "werden", "ist"], answer: 0, why: "die Pizza tekil → wird." },
      { kind: "choice", q: "Die Fenster ___ jeden Montag geputzt.", tr: "Pencereler her pazartesi temizlenir.", options: ["wird", "werden"], answer: 1, why: "Çoğul (die Fenster) → werden." },
      { kind: "type", q: "Das Auto wird ___ . (waschen)", tr: "Araba yıkanıyor.", answers: ["gewaschen"], why: "waschen → gewaschen." },
    ],
    test: [
      { kind: "choice", q: "Das Museum ___ 1900 gebaut.", tr: "Müze 1900'de inşa edildi.", options: ["wird", "wurde"], answer: 1, why: "Geçmiş → wurde." },
      { kind: "order", words: ["Die", "Tür", "wird", "um", "22", "Uhr", "geschlossen"], tr: "Kapı saat 22'de kapatılır.", why: "wird 2. sırada, geschlossen sonda." },
      { kind: "choice", q: "In der Schweiz ___ vier Sprachen gesprochen.", tr: "İsviçre'de dört dil konuşulur.", options: ["wird", "werden"], answer: 1, why: "vier Sprachen çoğul → werden." },
      { kind: "type", q: "Der Brief wurde gestern ___ . (schreiben)", tr: "Mektup dün yazıldı.", answers: ["geschrieben"], why: "schreiben → geschrieben." },
    ],
  },
  {
    slug: "konjunktiv2",
    level: "B1",
    title: "Wenn ich Zeit hätte …",
    titleTr: "Konjunktiv II: dilek ve kibar rica",
    goalTr: "Hayal, dilek ve kibar istek: würde + mastar, hätte, wäre, könnte.",
    topic: "konjunktiv2",
    intro: {
      visual: "wish",
      sentence: "Wenn ich Zeit [end:hätte], [verb:würde] ich [end:reisen].",
      tr: "Vaktim olsaydı seyahat ederdim.",
      caption: "Balonun içi hayal, dışı gerçek.",
    },
    explain: {
      points: [
        "Gerçek olmayan durumlar için: Türkçedeki “-saydı … -ırdı” gibi.",
        "Çoğu fiil: würde + mastar (sonda): Ich würde reisen.",
        "Kısa formlar: haben → hätte, sein → wäre, können → könnte. Kibar rica: Könnten Sie …? Ich hätte gern …",
      ],
      rule: "haben → [verb:hätte] · sein → [verb:wäre] · können → [verb:könnte] · machen → [verb:würde] … machen",
    },
    examples: [
      { de: "Ich [verb:hätte] gern einen Kaffee.", tr: "Bir kahve rica ediyorum.", note: "kibar sipariş" },
      { de: "[verb:Könnten] Sie mir bitte [end:helfen]?", tr: "Bana yardım edebilir misiniz lütfen?" },
      { de: "An deiner Stelle [verb:würde] ich zum Arzt [end:gehen].", tr: "Yerinde olsam doktora giderdim." },
      { de: "Wenn ich reich [end:wäre], [verb:würde] ich ein Haus [end:kaufen].", tr: "Zengin olsaydım bir ev alırdım." },
    ],
    vocab: ["kaffee", "haus", "arzt", "sonne"],
    practice: [
      { kind: "choice", q: "Wenn ich reich ___, würde ich viel reisen.", tr: "Zengin olsaydım çok seyahat ederdim.", options: ["wäre", "war", "bin"], answer: 0, why: "sein → wäre." },
      { kind: "type", q: "Ich ___ gern ein Glas Wasser. (haben)", tr: "Bir bardak su rica ediyorum.", answers: ["hätte"], why: "Kibar istek: Ich hätte gern …" },
      { kind: "choice", q: "___ Sie bitte das Fenster öffnen?", tr: "Pencereyi açabilir misiniz lütfen?", options: ["Könnten", "Konnten", "Gekonnt"], answer: 0, why: "Kibar rica → Könnten Sie …?" },
    ],
    test: [
      { kind: "choice", q: "An deiner Stelle ___ ich mehr schlafen.", tr: "Yerinde olsam daha çok uyurdum.", options: ["würde", "wurde", "werde"], answer: 0, why: "Tavsiye → würde + mastar." },
      { kind: "choice", q: "Wenn ich Zeit ___, käme ich mit.", tr: "Vaktim olsaydı ben de gelirdim.", options: ["habe", "hätte", "hatte"], answer: 1, why: "haben → hätte." },
      { kind: "order", words: ["Ich", "würde", "gern", "Spanisch", "lernen"], tr: "İspanyolca öğrenmek isterdim.", why: "würde 2. sırada, mastar lernen sonda." },
      { kind: "type", q: "Es ___ schön, wenn du mitkommen würdest. (sein)", tr: "Sen de gelsen güzel olurdu.", answers: ["wäre"], why: "sein → wäre." },
    ],
  },
];
