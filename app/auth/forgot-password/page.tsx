'use client';

import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftIcon, KeyRoundIcon, Loader2 } from 'lucide-react';

import { AuthCard } from '@/components/auth/auth-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormError } from '@/components/auth/form-error';
import { FormSuccess } from '@/components/auth/form-success';
import { toast } from 'sonner';

const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setError('');
    setSuccess('');
    setIsPending(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Reset password request:', values);
      toast('Check your email', {
        description: 'If you have an account, we sent you a reset link.',
      });
      setSuccess('If you have an account, we sent you a reset link.');
    } catch (error) {
      setError('Something went wrong. Please try again.');
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
        Forgot Password
      </h1>
      <p className="text-center text-sm text-muted-foreground">
        Enter your email to receive a password reset link
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
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isPending}
            {...form.register('email')}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-destructive">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit" className="w-full">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send Reset Link
        </Button>
      </form>
    </AuthCard>
  );
}
