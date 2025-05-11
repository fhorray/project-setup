# /server/routes

Each file defines and registers Hono routes for a specific domain.

Examples:

- `auth.ts` — Login, session
- `uploads.ts` — Uploads to Cloudflare R2

Rotas são montadas no `index.ts` final com:

```ts
app.route('/courses', coursesRoute);
```
