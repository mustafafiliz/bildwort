import type { PersonLook } from "@/components/illustrations/people";
import { LOOKS } from "@/components/illustrations/people";

export type Line = { de: string; tr: string };
export type Scenario = {
  id: string;
  titleTr: string;
  titleDe: string;
  goalTr: string;
  level: "A1" | "A2" | "B1";
  partner: { name: string; roleTr: string; look: PersonLook };
  props: string[]; // object illustrations in the scene
  opener: Line;
  /** Used when the AI is not configured: the partner follows this script. */
  script: Line[];
  hints: Line[];
};

export const SCENARIOS: Scenario[] = [
  {
    id: "restaurant",
    titleTr: "Restoranda",
    titleDe: "Im Restaurant",
    goalTr: "İçecek ve yemek sipariş et, hesabı iste.",
    level: "A1",
    partner: { name: "Herr Braun", roleTr: "garson", look: LOOKS.kellner },
    props: ["kaffee", "brot"],
    opener: { de: "Guten Abend! Was möchten Sie trinken?", tr: "İyi akşamlar! Ne içmek istersiniz?" },
    script: [
      { de: "Gern. Und was möchten Sie essen?", tr: "Memnuniyetle. Peki ne yemek istersiniz?" },
      { de: "Sehr gute Wahl. Möchten Sie noch etwas?", tr: "Çok iyi bir seçim. Başka bir şey ister misiniz?" },
      { de: "Hier ist die Rechnung. Das macht achtzehn Euro fünfzig.", tr: "Buyurun hesap. Toplam on sekiz euro elli." },
      { de: "Vielen Dank und einen schönen Abend!", tr: "Çok teşekkürler, iyi akşamlar!" },
    ],
    hints: [
      { de: "Ich hätte gern ein Wasser, bitte.", tr: "Bir su rica ediyorum." },
      { de: "Ich nehme die Tomatensuppe.", tr: "Domates çorbasını alıyorum." },
      { de: "Die Rechnung, bitte.", tr: "Hesap lütfen." },
      { de: "Kann ich mit Karte zahlen?", tr: "Kartla ödeyebilir miyim?" },
    ],
  },
  {
    id: "supermarkt",
    titleTr: "Süpermarkette",
    titleDe: "Im Supermarkt",
    goalTr: "Bir ürünün yerini sor, fiyatını öğren.",
    level: "A1",
    partner: { name: "Frau Klein", roleTr: "satış görevlisi", look: LOOKS.lena },
    props: ["tomate", "milch", "banane"],
    opener: { de: "Hallo! Kann ich Ihnen helfen?", tr: "Merhaba! Size yardımcı olabilir miyim?" },
    script: [
      { de: "Die Tomaten sind in Gang drei, neben dem Obst.", tr: "Domatesler üçüncü koridorda, meyvelerin yanında." },
      { de: "Ja, die Milch steht im Kühlregal hinten links.", tr: "Evet, süt arkada solda soğutucu rafta." },
      { de: "Ein Kilo Tomaten kostet zwei Euro neunzig.", tr: "Bir kilo domates iki euro doksan." },
      { de: "Gern geschehen. Schönen Tag noch!", tr: "Rica ederim. İyi günler!" },
    ],
    hints: [
      { de: "Wo finde ich Tomaten?", tr: "Domatesleri nerede bulabilirim?" },
      { de: "Haben Sie auch Milch?", tr: "Süt de var mı?" },
      { de: "Was kostet ein Kilo?", tr: "Bir kilosu ne kadar?" },
      { de: "Danke schön!", tr: "Çok teşekkürler!" },
    ],
  },
  {
    id: "arzt",
    titleTr: "Doktorda",
    titleDe: "Beim Arzt",
    goalTr: "Şikâyetini anlat, ne zamandır sürdüğünü söyle.",
    level: "A2",
    partner: { name: "Dr. Weber", roleTr: "doktor", look: LOOKS.doktor },
    props: ["apotheke"],
    opener: { de: "Guten Tag! Was fehlt Ihnen denn?", tr: "İyi günler! Şikâyetiniz nedir?" },
    script: [
      { de: "Seit wann haben Sie die Schmerzen?", tr: "Ağrılar ne zamandan beri var?" },
      { de: "Haben Sie auch Fieber?", tr: "Ateşiniz de var mı?" },
      { de: "Ich schreibe Ihnen ein Rezept. Bleiben Sie bitte zwei Tage zu Hause.", tr: "Size bir reçete yazıyorum. Lütfen iki gün evde kalın." },
      { de: "Gute Besserung!", tr: "Geçmiş olsun!" },
    ],
    hints: [
      { de: "Ich habe Kopfschmerzen.", tr: "Başım ağrıyor." },
      { de: "Seit gestern.", tr: "Dünden beri." },
      { de: "Ja, ich habe ein bisschen Fieber.", tr: "Evet, biraz ateşim var." },
      { de: "Brauche ich eine Krankmeldung?", tr: "Hastalık raporuna ihtiyacım var mı?" },
    ],
  },
  {
    id: "kennenlernen",
    titleTr: "Yeni biriyle tanışma",
    titleDe: "Jemanden kennenlernen",
    goalTr: "Kendini tanıt: adın, nereden geldiğin, ne iş yaptığın.",
    level: "A1",
    partner: { name: "Jonas", roleTr: "yeni tanıştığın biri", look: LOOKS.jonas },
    props: ["kaffee"],
    opener: { de: "Hallo! Ich bin Jonas. Wie heißt du?", tr: "Merhaba! Ben Jonas. Senin adın ne?" },
    script: [
      { de: "Freut mich! Woher kommst du?", tr: "Memnun oldum! Nerelisin?" },
      { de: "Interessant! Und was machst du beruflich?", tr: "İlginç! Peki ne iş yapıyorsun?" },
      { de: "Wie lange lernst du schon Deutsch?", tr: "Ne zamandır Almanca öğreniyorsun?" },
      { de: "Du sprichst schon sehr gut! Bis bald!", tr: "Şimdiden çok iyi konuşuyorsun! Görüşmek üzere!" },
    ],
    hints: [
      { de: "Ich heiße Elif.", tr: "Benim adım Elif." },
      { de: "Ich komme aus der Türkei, aus Izmir.", tr: "Türkiye'den, İzmir'den geliyorum." },
      { de: "Ich arbeite als Krankenpflegerin.", tr: "Hemşire olarak çalışıyorum." },
      { de: "Seit einem Jahr.", tr: "Bir yıldır." },
    ],
  },
  {
    id: "arbeit",
    titleTr: "İş yerinde",
    titleDe: "Bei der Arbeit",
    goalTr: "Bir iş rica edildiğinde cevap ver, saati netleştir.",
    level: "A2",
    partner: { name: "Frau Schmidt", roleTr: "iş arkadaşın", look: LOOKS.ayse },
    props: ["computer", "brief"],
    opener: { de: "Guten Morgen! Haben Sie kurz Zeit?", tr: "Günaydın! Kısa bir vaktiniz var mı?" },
    script: [
      { de: "Wir haben um elf Uhr ein Meeting. Können Sie die Präsentation vorbereiten?", tr: "Saat on birde toplantımız var. Sunumu hazırlayabilir misiniz?" },
      { de: "Super. Schicken Sie sie mir bitte bis zehn Uhr?", tr: "Süper. Bana saat ona kadar gönderir misiniz?" },
      { de: "Vielen Dank, das ist sehr nett!", tr: "Çok teşekkürler, çok naziksiniz!" },
    ],
    hints: [
      { de: "Ja, natürlich.", tr: "Evet, tabii." },
      { de: "Wann genau ist das Meeting?", tr: "Toplantı tam olarak ne zaman?" },
      { de: "Ich schicke sie Ihnen gleich.", tr: "Size hemen gönderiyorum." },
      { de: "Kein Problem.", tr: "Sorun değil." },
    ],
  },
  {
    id: "termin",
    titleTr: "Randevu alma",
    titleDe: "Einen Termin machen",
    goalTr: "Telefonda randevu iste, gün ve saati kabul et.",
    level: "A2",
    partner: { name: "Frau Yıldız", roleTr: "muayenehane sekreteri", look: { ...LOOKS.ayse, top: "#5B8FD0" } },
    props: ["handy", "uhr"],
    opener: { de: "Praxis Dr. Weber, guten Tag. Was kann ich für Sie tun?", tr: "Dr. Weber muayenehanesi, iyi günler. Size nasıl yardımcı olabilirim?" },
    script: [
      { de: "Gern. Wann haben Sie Zeit?", tr: "Memnuniyetle. Ne zaman vaktiniz var?" },
      { de: "Am Donnerstag um neun Uhr ist noch etwas frei. Passt das?", tr: "Perşembe saat dokuzda hâlâ boş yer var. Uyar mı?" },
      { de: "Wie ist Ihr Name, bitte?", tr: "Adınız nedir, lütfen?" },
      { de: "Danke. Bitte bringen Sie Ihre Versichertenkarte mit.", tr: "Teşekkürler. Lütfen sigorta kartınızı getirin." },
    ],
    hints: [
      { de: "Ich möchte gern einen Termin machen.", tr: "Bir randevu almak istiyorum." },
      { de: "Am liebsten am Vormittag.", tr: "En iyisi öğleden önce." },
      { de: "Ja, das passt gut.", tr: "Evet, gayet uyar." },
      { de: "Mein Name ist Kaya.", tr: "Adım Kaya." },
    ],
  },
  {
    id: "wochenende",
    titleTr: "Hafta sonu planı",
    titleDe: "Das Wochenende planen",
    goalTr: "Bir arkadaşla birlikte bir şey planla.",
    level: "A2",
    partner: { name: "Emre", roleTr: "arkadaşın", look: LOOKS.emre },
    props: ["sonne", "fahrrad"],
    opener: { de: "Hey! Was machst du am Wochenende?", tr: "Selam! Hafta sonu ne yapıyorsun?" },
    script: [
      { de: "Wollen wir zusammen etwas machen?", tr: "Birlikte bir şey yapalım mı?" },
      { de: "Gute Idee! Treffen wir uns am Samstag um zwei?", tr: "İyi fikir! Cumartesi saat ikide buluşalım mı?" },
      { de: "Am Bahnhof ist gut. Dann bis Samstag!", tr: "İstasyon iyi olur. O zaman cumartesi görüşürüz!" },
    ],
    hints: [
      { de: "Ich habe noch keine Pläne.", tr: "Henüz bir planım yok." },
      { de: "Wollen wir ins Kino gehen?", tr: "Sinemaya gidelim mi?" },
      { de: "Am Samstag habe ich Zeit.", tr: "Cumartesi vaktim var." },
      { de: "Wo treffen wir uns?", tr: "Nerede buluşalım?" },
    ],
  },
];

export const SCENARIOS_BY_ID = Object.fromEntries(SCENARIOS.map((s) => [s.id, s]));
