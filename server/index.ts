import { Hono } from 'hono'
import { Bindings, Variables } from '@/types/binding';

// Import Middlewares
import authMiddleware from "@/server/middlewares/auth";
import corsMiddleware from "@/server/middlewares/cors";
import csrfMiddleware from "@/server/middlewares/csrf";

export const appRoutes = new Hono<{
  Variables: Variables;
  Bindings: Bindings;
}>().basePath('/api');

// Middlwares
appRoutes.use('*', authMiddleware);
appRoutes.use('*', corsMiddleware);
// appRoutes.use('*', csrfMiddleware);

// Routes


export default appRoutes;