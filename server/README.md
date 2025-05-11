# /server

Contains all **backend logic** for the API (Hono), DB, and services.

### Subfolders

- `routes/` — Each file defines a Hono router for a domain (auth, courses, lessons, etc.)
- `services/` — Pure logic functions reused across routes
- `middlewares/` — Reusable middleware (auth, error handler)
- `db/` — Drizzle ORM schemas and client
- `lib/` — Utilities, helpers (R2, JWT, zod)

The main Hono app is defined in `routes/index.ts` and imported into `/app/api/route.ts`
