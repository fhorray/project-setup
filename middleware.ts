import { NextRequest, NextResponse } from "next/server"
import { ROUTES, MAIN_URL } from "./routes"

const isAuthenticated = true;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // if route if private and user is not authenticated, redirect to login.
  if (ROUTES.private.includes(pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // if route is public and user is authenticated redirect to dashboard.
  if (ROUTES.public.includes(pathname) && isAuthenticated) {
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