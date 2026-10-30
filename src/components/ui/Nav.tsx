"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const ITEMS = [
  { href: "/", label: "Öğren", icon: IconLearn, match: (p: string) => p === "/" || p.startsWith("/learn") },
  { href: "/vocabulary", label: "Kelimeler", icon: IconCards, match: (p: string) => p.startsWith("/vocabulary") },
  { href: "/practice", label: "Pratik", icon: IconTalk, match: (p: string) => p.startsWith("/practice") },
  { href: "/teacher", label: "Öğretmen", icon: IconTeacher, match: (p: string) => p.startsWith("/teacher") },
  { href: "/exam", label: "Sınav", icon: IconExam, match: (p: string) => p.startsWith("/exam") },
];

export function Nav() {
  const path = usePathname() ?? "/";
  return (
    <>
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Bildwort ana sayfa">
          <Logo />
          <span className="text-lg font-bold tracking-tight">Bildwort</span>
        </Link>
        <nav aria-label="Ana menü" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {ITEMS.map((it) => {
              const active = it.match(path);
              return (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "rounded-full px-4 py-2 text-[0.95rem] transition-colors",
                      active ? "bg-ink text-paper" : "text-ink-soft hover:bg-surface hover:text-ink",
                    )}
                  >
                    {it.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {/* Mobile tab bar: five items, nothing else. */}
      <nav aria-label="Ana menü" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur md:hidden">
        <ul className="mx-auto grid max-w-md grid-cols-5 pb-[env(safe-area-inset-bottom)]">
          {ITEMS.map((it) => {
            const active = it.match(path);
            const Icon = it.icon;
            return (
              <li key={it.href}>
                <Link
                  href={it.href}
                  aria-current={active ? "page" : undefined}
                  className={clsx("flex flex-col items-center gap-1 py-2.5 text-[0.72rem]", active ? "text-ink" : "text-ink-faint")}
                >
                  <Icon active={active} />
                  {it.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

function Logo() {
  // Three article colours stacked like the pages of a book.
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden>
      <rect x="3" y="4" width="16" height="22" rx="3" fill="var(--color-das)" />
      <rect x="8" y="4" width="16" height="22" rx="3" fill="var(--color-die)" />
      <rect x="13" y="4" width="14" height="22" rx="3" fill="var(--color-der)" />
    </svg>
  );
}

type IconProps = { active: boolean };
const sw = (a: boolean) => ({ stroke: "currentColor", strokeWidth: a ? 2.2 : 1.8, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const });
function IconLearn({ active }: IconProps) {
  return <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden><path d="M12 6c-2-1.5-5-2-8-1v13c3-1 6-.5 8 1 2-1.5 5-2 8-1V5c-3-1-6-.5-8 1zM12 6v13" {...sw(active)} /></svg>;
}
function IconCards({ active }: IconProps) {
  return <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden><rect x="4" y="7" width="13" height="13" rx="2" {...sw(active)} /><path d="M8 4h10a2 2 0 012 2v10" {...sw(active)} /></svg>;
}
function IconTalk({ active }: IconProps) {
  return <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden><path d="M4 6h11v8H9l-4 3v-3H4zM15 10h5v7h-1v3l-3-3h-4v-2" {...sw(active)} /></svg>;
}
function IconTeacher({ active }: IconProps) {
  return <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden><circle cx="12" cy="8" r="3.5" {...sw(active)} /><path d="M5 20c0-4 3-6.5 7-6.5s7 2.5 7 6.5" {...sw(active)} /></svg>;
}
function IconExam({ active }: IconProps) {
  return <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden><rect x="5" y="3.5" width="14" height="17" rx="2" {...sw(active)} /><path d="M8.5 9l1.8 1.8L14 7.5M8.5 15h7" {...sw(active)} /></svg>;
}
