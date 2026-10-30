import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// Migrations need a direct connection. Neon on Vercel sets DATABASE_URL to the
// pooled address and DATABASE_URL_UNPOOLED to the direct one. The app itself
// keeps using the pooled DATABASE_URL at runtime.
const directUrl =
  process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL || env("DATABASE_URL");

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: directUrl },
});
