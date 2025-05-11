import { Context, Next } from "hono";
import { cors } from 'hono/cors';


export default async (c: Context, next: Next) => {

  const corsMid = cors({
    origin: ["http://127.0.0.1:3000"],
    maxAge: 600,
    allowHeaders: ["Content-Type", "Authorization", "X-Signature", "X-Timestamp"],
    allowMethods: ["GET", "POST", "PATCH", "OPTIONS", "DELETE"],
    credentials: true,
  })

  return corsMid(c, next)
};