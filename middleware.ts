import { NextRequest, NextResponse } from "next/server";
import { ROUTES, MAIN_URL } from "./routes";
import { getSessionCookie } from "better-auth/cookies";
import { APP_CONFIG } from "./constants";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionCookie = getSessionCookie(request, {
    cookiePrefix: APP_CONFIG.PREFIX,
  });

  // 1. Usuário não autenticado tentando acessar rota privada ou raiz
  if (!sessionCookie && !pathname.startsWith("/auth")) {
    // Evita redirecionar para a própria rota e criar loop
    if (pathname !== "/auth/sign-in") {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
  }

  // 2. Usuário autenticado tentando acessar rota de autenticação
  if (sessionCookie && ROUTES.auth.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 3. Acesso a rota privada sem sessão
  if (ROUTES.private.includes(pathname) && !sessionCookie) {
    if (pathname !== "/auth/login") {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
  }

  // 4. Acesso a rota pública com sessão ativa
  if (ROUTES.public.includes(pathname) && sessionCookie) {
    if (pathname !== MAIN_URL) {
      return NextResponse.redirect(new URL(MAIN_URL, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/|api/|trpc/|.*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
