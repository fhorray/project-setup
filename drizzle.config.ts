
import dotenv from 'dotenv';
import { defineConfig } from "drizzle-kit";

dotenv.config({
  path: ".dev.vars"

})

export default defineConfig({
  dialect: "postgresql",
  out: "./server/db/migrations",
  schema: "./server/db/schema/index.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
