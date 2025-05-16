import { Hono } from 'hono'
import { Bindings, Variables } from '@/types/binding';

// Import Middlewares
import authMiddleware from "@/server/middlewares/auth";
import corsMiddleware from "@/server/middlewares/cors";
import csrfMiddleware from "@/server/middlewares/csrf";
import { auth } from '@/lib/auth';

export const app = new Hono<{
  Variables: Variables;
  Bindings: Bindings;
}>().basePath('/api');

// Middlwares
app.use('*', corsMiddleware);

app.on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw));
app.use('*', authMiddleware);
// app.use('*', csrfMiddleware);

// Routes
app.get("/hello", async c => {
  return c.json({ message: "Hello from next.js!" })
})


export default app;