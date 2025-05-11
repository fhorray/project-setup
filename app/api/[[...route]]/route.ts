import { Hono } from 'hono'
import { handle } from 'hono/vercel'

// app/api/route.ts
import { appRoutes } from '@/server'


const app = appRoutes;

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
export const PATCH = handle(app)