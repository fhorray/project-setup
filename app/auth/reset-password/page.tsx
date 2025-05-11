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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormError } from '@/components/auth/form-error';
import { FormSuccess } from '@/components/auth/form-success';
import { toast } from 'sonner';

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters',
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setError('');
    setSuccess('');
    setIsPending(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Reset password:', values);

      toast('Password reset successful', {
        description: 'Your password has been reset successfully.',
      });
      setSuccess('Your password has been reset successfully.');

      // Redirect to sign in page after successful password reset
      setTimeout(() => {
        router.push('/sign-in');
      }, 2000);
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
        Reset Password
      </h1>
      <p className="text-center text-sm text-muted-foreground">
        Enter your new password
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
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            autoComplete="new-password"
            disabled={isPending}
            {...form.register('password')}
          />
          {form.formState.errors.password && (
            <p className="text-sm text-destructive">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            placeholder="••••••••"
            type="password"
            autoComplete="new-password"
            disabled={isPending}
            {...form.register('confirmPassword')}
          />
          {form.formState.errors.confirmPassword && (
            <p className="text-sm text-destructive">
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit" className="w-full">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Reset Password
        </Button>
      </form>
    </AuthCard>
  );
}
