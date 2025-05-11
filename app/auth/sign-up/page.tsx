import Link from 'next/link';
import { UserPlusIcon } from 'lucide-react';

import { AuthCard } from '@/components/auth/auth-card';
import { UserAuthForm } from '@/components/auth/user-auth-form';
import { SocialButtons } from '@/components/auth/social-buttons';
import { Separator } from '@/components/ui/separator';

export default function SignUpPage() {
  const cardHeader = (
    <>
      <h1 className="text-center text-2xl font-semibold tracking-tight">
        Create an account
      </h1>
      <p className="text-center text-sm text-muted-foreground">
        Enter your details to create your account
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
      <SocialButtons />
      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link
          href="/auth/sign-in"
          className="text-primary underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </div>
    </>
  );

  return (
    <AuthCard cardHeader={cardHeader} cardFooter={cardFooter}>
      <UserAuthForm type="register" />
    </AuthCard>
  );
}
