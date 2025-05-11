'use client';

import Link from 'next/link';
import { useState } from 'react';
import { LockKeyholeIcon } from 'lucide-react';

import { AuthCard } from '@/components/auth/auth-card';
import { Button } from '@/components/ui/button';
import { UserAuthForm } from '@/components/auth/user-auth-form';
import { SocialButtons } from '@/components/auth/social-buttons';
import { Separator } from '@/components/ui/separator';

export default function SignInPage() {
  const [showMagicLink, setShowMagicLink] = useState(false);

  const toggleMagicLink = () => {
    setShowMagicLink(!showMagicLink);
  };

  const cardHeader = (
    <>
      <div className="flex justify-center">
        <div className="rounded-full bg-primary/10 p-2">
          <LockKeyholeIcon className="h-6 w-6 text-primary" />
        </div>
      </div>
      <h1 className="text-center text-2xl font-semibold tracking-tight">
        Welcome back
      </h1>
      <p className="text-center text-sm text-muted-foreground">
        Enter your credentials to sign in to your account
      </p>
    </>
  );

  const cardFooter = (
    <>
      <div className="flex w-full items-center gap-2 pt-2">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">OR</span>
        <Separator className="flex-1" />
      </div>
      {showMagicLink ? (
        <>
          <p className="text-center text-sm text-muted-foreground">
            Get a magic link sent to your email
          </p>
          <Button
            variant="outline"
            className="w-full"
            onClick={toggleMagicLink}
          >
            Use password
          </Button>
        </>
      ) : (
        <>
          <SocialButtons />
          <div className="text-center text-sm">
            <Button
              variant="link"
              className="h-auto p-0"
              onClick={toggleMagicLink}
            >
              Sign in with magic link
            </Button>
          </div>
        </>
      )}
      <div className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link
          href="/auth/sign-up"
          className="text-primary underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </div>
    </>
  );

  return (
    <AuthCard cardHeader={cardHeader} cardFooter={cardFooter}>
      {showMagicLink ? (
        <form className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Email
            </label>
            <input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Button
            type="button"
            className="w-full"
            onClick={() => {
              console.log('Magic link requested');
              window.location.href = '/magic-link';
            }}
          >
            Send Magic Link
          </Button>
        </form>
      ) : (
        <UserAuthForm type="login" />
      )}
    </AuthCard>
  );
}
