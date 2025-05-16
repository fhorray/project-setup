'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

import { ArrowRightIcon, LogOutIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const { data, isPending } = authClient.useSession();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="text-xl font-semibold">Auth System</div>
          <div className="flex items-center gap-4">
            {data?.session ? (
              <>
                <Avatar>
                  <AvatarImage
                    src={
                      data.user.image ??
                      `https://api.dicebear.com/6.x/initials/svg?seed=${data.user.name}`
                    }
                  />
                </Avatar>
                <Button
                  size={'icon'}
                  variant={'outline'}
                  onClick={() => {
                    authClient.signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          window.location.pathname = '/auth/sign-in';
                        },
                      },
                    });
                  }}
                >
                  <LogOutIcon />
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/sign-in">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Initial Project Setup Application
              </h1>
              <p className="text-muted-foreground md:text-xl">
                A complete initial project with authentication, backend with
                hono, and more.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/auth/sign-up">
                  <Button size="lg" className="w-full min-[400px]:w-auto">
                    Get Started
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/auth/sign-in">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full min-[400px]:w-auto"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-lg border border-border bg-muted/40 p-10">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-md border bg-card p-4 shadow-sm">
                  <h3 className="font-semibold">Email Sign-In</h3>
                  <p className="text-sm text-muted-foreground">
                    Traditional email and password authentication
                  </p>
                </div>
                <div className="rounded-md border bg-card p-4 shadow-sm">
                  <h3 className="font-semibold">Social Providers</h3>
                  <p className="text-sm text-muted-foreground">
                    Sign in with Google and GitHub
                  </p>
                </div>
                <div className="rounded-md border bg-card p-4 shadow-sm">
                  <h3 className="font-semibold">Magic Links</h3>
                  <p className="text-sm text-muted-foreground">
                    Passwordless authentication via email
                  </p>
                </div>
                <div className="rounded-md border bg-card p-4 shadow-sm">
                  <h3 className="font-semibold">Two-Factor Auth</h3>
                  <p className="text-sm text-muted-foreground">
                    Additional security with 2FA codes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
