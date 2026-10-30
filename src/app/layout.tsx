import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Nav } from "@/components/ui/Nav";
import { ProgressSync } from "@/components/ui/ProgressSync";

export const metadata: Metadata = {
  title: "Bildwort",
  description: "Almancayı resimlerle öğren. Görsel dersler, kelime kartları, yapay zekâ öğretmen ve sınav hazırlığı.",
};

export const viewport: Viewport = { themeColor: "#fcfbf8" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="min-h-dvh">
        <Nav />
        <ProgressSync />
        <main className="mx-auto w-full max-w-5xl px-4 pb-28 pt-4 sm:px-6 md:pb-16">{children}</main>
      </body>
    </html>
  );
}
