

import { Context, Next } from "hono";
import { csrf } from 'hono/csrf';

export default async (c: Context, next: Next) => {

  const csrfMiddleware = csrf({
    origin: ["http://127.0.0.1:3000"],
  });

  return csrfMiddleware(c, next);
};


