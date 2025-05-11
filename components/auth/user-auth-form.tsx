'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { useAppForm } from '@/hooks/form-context';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { FormError } from './form-error';
import { FormSuccess } from './form-success';
import { authClient } from '@/lib/auth-client';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: 'login' | 'register';
}

const loginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters',
  }),
});

const registerSchema = z
  .object({
    name: z.string().min(1, {
      message: 'Name is required',
    }),
    email: z.string().email({
      message: 'Please enter a valid email address',
    }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters',
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export function UserAuthForm({ className, type, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [isPending, setIsPending] = useState(false);

  const form = useAppForm({
    defaultValues: {} as LoginFormValues | RegisterFormValues,
    onSubmit: async ({ value }) => {
      console.log(value);

      console.log(value);

      if (type === 'login') {
        // Simulate successful login
        toast('Success', {
          description: 'You have been logged in successfully!',
        });

        // Redirect to dashboard or home page after successful login
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        const values = value as RegisterFormValues;
        const { data, error } = await authClient.signUp.email(
          {
            ...values,
            callbackURL: '/dashboard',
          },
          {
            onRequest: (ctx) => {
              //show loading
              setIsPending(true);
            },
            onSuccess: (ctx) => {
              //redirect to the dashboard or sign in page
            },
            onError: (ctx) => {
              // display the error message
              setError(true);
            },
          },
        );

        // Simulate successful registration

        toast('Registration Successful', {
          description: 'Please check your email to verify your account.',
        });
      }
    },
  });

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form
        onSubmit={(e) => {
          e.preventDefault(), form.handleSubmit();
        }}
        className="space-y-4"
      >
        <div className="space-y-2">
          {type === 'register' && (
            <form.AppField
              name="name"
              children={(field) => <field.InputField id="name" label="Name" />}
            />
          )}
          <form.AppField
            name="email"
            children={(field) => <field.EmailField id="email" label="Email" />}
          />

          <form.AppField
            name="password"
            children={(field) => (
              <field.PasswordField
                id="password"
                label="Password"
                placeholder="••••••••"
              />
            )}
          />
          {type === 'login' && (
            <Button
              variant="link"
              className="h-auto p-0 text-xs"
              onClick={() => router.push('/auth/forgot-password')}
              type="button"
            >
              Forgot password?
            </Button>
          )}

          {type === 'register' && (
            <form.AppField
              name="confirmPassword"
              children={(field) => (
                <field.PasswordField
                  id="confirm-password"
                  label="Confirm Password"
                  placeholder="••••••••"
                />
              )}
            />
          )}
        </div>

        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}
