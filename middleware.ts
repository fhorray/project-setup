import { NextRequest, NextResponse } from "next/server"
import { ROUTES, MAIN_URL } from "./routes"
import { getSessionCookie } from "better-auth/cookies";
import { APP_CONFIG } from "./constants";


export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const sessionCookie = getSessionCookie(request, {
    cookiePrefix: APP_CONFIG.PREFIX
  });


  if (!sessionCookie && !pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (sessionCookie && ROUTES.auth.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // if route if private and user is not authenticated, redirect to login.
  if (ROUTES.private.includes(pathname) && !sessionCookie) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // if route is public and user is authenticated redirect to dashboard.
  if (ROUTES.public.includes(pathname) && sessionCookie) {
    return NextResponse.redirect(new URL(MAIN_URL, request.url))
  }

  // if there's no problem, continue.
  return NextResponse.next()
};


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};