'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftIcon, MailCheckIcon, Loader2 } from 'lucide-react';

import { AuthCard } from '@/components/auth/auth-card';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/auth/form-error';
import { FormSuccess } from '@/components/auth/form-success';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { toast } from 'sonner';

const verifyEmailSchema = z.object({
  code: z.string().min(6, {
    message: 'Verification code must be 6 digits',
  }),
});

type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;

export default function VerifyEmailPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = async (values: VerifyEmailFormValues) => {
    setError('');
    setSuccess('');
    setIsPending(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Verification code:', values);

      setSuccess('Your email has been successfully verified!');
      toast('Email verified', {
        description: 'Your email has been successfully verified.',
      });

      // Redirect to sign in page after successful verification
      setTimeout(() => {
        router.push('/auth/sign-in');
      }, 2000);
    } catch (error) {
      setError('Invalid verification code. Please try again.');
    } finally {
      setIsPending(false);
    }
  };

  const resendCode = async () => {
    toast('Code Resent', {
      description: 'A new verification code has been sent to your email.',
    });
  };

  const cardHeader = (
    <>
      <div className="flex justify-center">
        <div className="rounded-full bg-primary/10 p-2">
          <MailCheckIcon className="h-6 w-6 text-primary" />
        </div>
      </div>
      <h1 className="text-center text-2xl font-semibold tracking-tight">
        Verify Your Email
      </h1>
      <p className="text-center text-sm text-muted-foreground">
        Enter the 6-digit code sent to your email
      </p>
    </>
  );

  const cardFooter = (
    <div className="text-center text-sm">
      <Button variant="link" className="p-0" onClick={resendCode}>
        Didn't receive a code? Resend
      </Button>
      <div className="mt-2">
        <Link
          href="/auth/sign-in"
          className="flex items-center justify-center gap-1 text-primary underline-offset-4 hover:underline"
        >
          <ArrowLeftIcon className="h-3 w-3" />
          Back to sign in
        </Link>
      </div>
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
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit" className="w-full">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Verify Email
        </Button>
      </form>
    </AuthCard>
  );
}
