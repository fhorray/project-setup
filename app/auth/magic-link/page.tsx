'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeftIcon, MailCheckIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';

import { AuthCard } from '@/components/auth/auth-card';
import { Button } from '@/components/ui/button';
import { FormSuccess } from '@/components/auth/form-success';
import { toast } from 'sonner';

export default function MagicLinkPage() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(timer);
          router.push('/auth/sign-in');
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    toast('Magic Link Sent', {
      description: 'Check your email for the magic link.',
    });

    return () => clearInterval(timer);
  }, [router]);

  const cardHeader = (
    <>
      <div className="flex justify-center">
        <div className="rounded-full bg-primary/10 p-2">
          <MailCheckIcon className="h-6 w-6 text-primary" />
        </div>
      </div>
      <h1 className="text-center text-2xl font-semibold tracking-tight">
        Check Your Email
      </h1>
      <p className="text-center text-sm text-muted-foreground">
        We sent you a magic link to sign in
      </p>
    </>
  );

  const cardFooter = (
    <div className="text-center text-sm">
      <Link
        href="/auth/sign-in"
        className="flex items-center justify-center gap-1 text-primary underline-offset-4 hover:underline"
      >
        <ArrowLeftIcon className="h-3 w-3" />
        Back to sign in
      </Link>
    </div>
  );

  return (
    <AuthCard cardHeader={cardHeader} cardFooter={cardFooter}>
      <div className="flex flex-col items-center justify-center gap-6 py-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <MailCheckIcon className="h-10 w-10 text-primary" />
        </div>
        <FormSuccess message="If an account exists with this email, we've sent you a magic link!" />
        <p className="text-center text-sm text-muted-foreground">
          The magic link will expire in 10 minutes. If you don't see the email,
          check your spam folder.
        </p>
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Redirecting in {seconds} seconds...
          </p>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.push('/sign-in')}
        >
          Return to Sign In
        </Button>
      </div>
    </AuthCard>
  );
}
