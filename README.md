# Project Setup

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), using the **App Router** and **Hono** for API routing.

## 🧪 Tech Stack

- [Next.js 15](https://nextjs.org)
- [Hono](https://hono.dev) (integrated in `/app/api/route.ts`)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Better Auth](https://www.better-auth.com/)
- [TailwindCSS](https://tailwindcss.com)
- Deploy: [Cloudflare Pages](https://cloudflare.com)

## 🚀 Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the admin panel.

---

## 📁 Folder Structure Overview

<details>
  <summary>📁 `app/` - App Router Pages and UI</summary>
  <pre>
  ├── layout.tsx                    # Layout component for shared page structure
  ├── page.tsx                      # Main landing page/dashboard
  ├── login/                        # Login page
  ├── [anyDomain]/                  # Pages related to specific domains (e.g., users, items, etc.)
  │   ├── page.tsx
  │   └── [specificId]/             # Specific entity or detail page (e.g., edit item)
  │       ├── layout.tsx
  │       ├── page.tsx
  │       ├── submodules/
  │       ├── settings/
  └── api/                          # API via Hono (single handler)
      └── route.ts                  # Hono entry point (with all routes chained)
  </pre>
</details>

<details>
  <summary>📁 `server/` - Backend Logic (DB, Services, Auth, etc.)</summary>
  <pre>
  ├── routes/                       # Hono routes organized by domain
  │   ├── auth.ts                   # Authentication routes
  │   ├── [anyDomain].ts            # Domain-specific routes
  │   └── index.ts                 # Registers all routes in a Hono app
  ├── services/                     # Business logic (pure, without HTTP)
  │   ├── [service].service.ts      # Domain-specific service logic
  ├── middlewares/                 # Hono middlewares (auth, error handling, etc.)
  │   ├── auth.ts                   # Authentication middleware
  │   ├── error-handler.ts          # Error handling middleware
  │   └── cors.ts                   # Cross-Origin Resource Sharing (CORS) middleware
  ├── db/                           # Drizzle ORM + schema
  │   ├── schema/                   # Database schemas
  │   │   ├── users.ts              # User schema
  │   │   ├── items.ts              # Generic item schema
  │   │   └── ...
  │   ├── index.ts                  # Drizzle connection
  │   ├── drizzle.config.ts         # Drizzle CLI configuration
  │   └── seed.ts                   # Initial seed file (optional)
  ├── lib/                          # Helpers and external integrations
  │   ├── file-upload.ts            # File upload and signed URLs
  │   ├── jwt.ts                    # JWT utilities
  │   ├── zod-schemas.ts            # Zod schema validation
  │   └── utils.ts                  # Utility functions
  </pre>
</details>

<details>
  <summary>📁 `features/` - Domain-specific Components/Flows</summary>
  <pre>
  ├── editor/                       # UI and logic for tiptap editor
  ├── file-upload/                  # File upload components with previews and integrations
  └── ...
  </pre>
</details>

<details>
  <summary>📁 `components/` - Reusable Components</summary>
  <pre>
  ├── ui/                            # Shadcnui components (buttons, inputs, modals, etc.)
  ├── form/                          # Form components with `FieldWrapper`, `LabelArea`, `FieldError`, etc.
  └── layout/                         # Layout components like Header, Sidebar, etc.
  </pre>
</details>

<details>
  <summary>📁 `tests/` - Tests</summary>
  <pre>
  ├── e2e/                            # End-to-end tests
  ├── unit/                           # Unit tests
  └── mocks/                          # Mock data for tests
  </pre>
</details>

<details>
  <summary>📁 `public/` - Static Assets</summary>
  <pre>
  └── (public assets like images, icons, etc.)
  </pre>
</details>

<details>
  <summary>Configuration Files</summary>
  <pre>
  ├── .env                           # Environment variables
  ├── drizzle.config.ts              # Drizzle ORM CLI configuration
  ├── tailwind.config.ts             # TailwindCSS configuration
  ├── tsconfig.json                  # TypeScript configuration
  ├── next.config.js                 # Next.js configuration
  └── package.json                   # Project dependencies and scripts
  </pre>
</details>

---

## 📡 API (via Hono)

All API routes are defined using [Hono](https://hono.dev) inside the `server/routes/` directory and mounted in `app/api/route.ts`.

---

# 🔐 Auth

Authentication is handled using [Better-auth](https://www.better-auth.com/), a robust solution for JWT-based authentication. Admin routes are protected using bearer tokens, and login/logout functionality is defined in `server/routes/auth.ts`.

### How it works:

- **Better-auth integration**: Provides easy-to-use functions for login, registration, and session management.
- **Middleware**: Auth middleware is placed in `server/middlewares/auth.ts` to protect sensitive routes.
