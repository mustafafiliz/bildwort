import "server-only";
import { cookies } from "next/headers";
import { prisma } from "./db";

const COOKIE = "dp_uid";

/** Returns the learner id, creating an anonymous learner on first visit. Route handlers / server actions only. */
export async function getOrCreateUserId(): Promise<string> {
  const jar = await cookies();
  const existing = jar.get(COOKIE)?.value;
  if (existing) {
    const user = await prisma.user.findUnique({ where: { id: existing }, select: { id: true } });
    if (user) return user.id;
  }
  const user = await prisma.user.create({ data: {} });
  jar.set(COOKIE, user.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365 * 2,
  });
  return user.id;
}

/** Read-only lookup for server components (cannot set cookies). */
export async function getUserId(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(COOKIE)?.value ?? null;
}
