'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftIcon, KeyRoundIcon, Loader2 } from 'lucide-react';

import { AuthCard } from '@/components/auth/auth-card';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/auth/form-error';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { toast } from 'sonner';

const twoFactorSchema = z.object({
  code: z.string().min(6, {
    message: 'Code must be 6 digits',
  }),
});

type TwoFactorFormValues = z.infer<typeof twoFactorSchema>;

export default function TwoFactorPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>('');

  const form = useForm<TwoFactorFormValues>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = async (values: TwoFactorFormValues) => {
    setError('');
    setIsPending(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Two-factor code:', values);

      toast('Two-factor authentication successful', {
        description: 'You have been successfully authenticated.',
      });

      // Redirect to dashboard after successful 2FA
      router.push('/dashboard');
    } catch (error) {
      setError('Invalid code. Please try again.');
    } finally {
      setIsPending(false);
    }
  };

  const cardHeader = (
    <>
      <div className="flex justify-center">
        <div className="rounded-full bg-primary/10 p-2">
          <KeyRoundIcon className="h-6 w-6 text-primary" />
        </div>
      </div>
      <h1 className="text-center text-2xl font-semibold tracking-tight">
        Two-Factor Authentication
      </h1>
      <p className="text-center text-sm text-muted-foreground">
        Enter the 6-digit code from your authenticator app
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <InputOTP
            maxLength={6}
            value={form.watch('code') || ''}
            onChange={(value) => form.setValue('code', value)}
            render={({ slots }) => (
              <InputOTPGroup>
                {slots.map((slot, index) => (
                  <InputOTPSlot key={index} index={index} {...slot} />
                ))}
              </InputOTPGroup>
            )}
          />
          {form.formState.errors.code && (
            <p className="text-sm text-destructive">
              {form.formState.errors.code.message}
            </p>
          )}
        </div>
        <FormError message={error} />
        <Button disabled={isPending} type="submit" className="w-full">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Verify
        </Button>
      </form>
    </AuthCard>
  );
}
