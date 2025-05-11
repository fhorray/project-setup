# /server/db

Uses Drizzle ORM for strong typing and SQL schema migrations.

### Structure

- `schema/` — Schemas for users, courses, lessons, etc.
- `index.ts` — Exports the Drizzle connection
- `seed.ts` — Initial seed (optional)
- `drizzle.config.ts` — Drizzle CLI configuration

Run Drizzle commands via:

```bash
npx drizzle-kit push
```
