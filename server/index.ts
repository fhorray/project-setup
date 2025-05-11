import { Hono } from 'hono'
import { Bindings, Variables } from '@/types/binding';

// Import Middlewares
import authMiddleware from "@/server/middlewares/auth";
import corsMiddleware from "@/server/middlewares/cors";
import csrfMiddleware from "@/server/middlewares/csrf";
import { auth } from '@/lib/auth';

export const appRoutes = new Hono<{
  Variables: Variables;
  Bindings: Bindings;
}>().basePath('/api');

// Middlwares
appRoutes.use('*', corsMiddleware);

appRoutes.on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw));
appRoutes.use('*', authMiddleware);
// appRoutes.use('*', csrfMiddleware);

// Routes


export default appRoutes;