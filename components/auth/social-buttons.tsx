'use client';

import { Button } from '@/components/ui/button';
import { GithubIcon } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';

export function SocialButtons() {
  const handleSocialLogin = (provider: string) => {
    console.log(`Attempting to log in with ${provider}`);
    toast.success('Social Login', {
      description: `Attempting to login with ${provider}. This is a simulated action.`,
    });
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <Button
        variant="outline"
        onClick={() => handleSocialLogin('Google')}
        className="flex w-full items-center gap-2"
      >
        <FcGoogle className="h-5 w-5" />
        Continue with Google
      </Button>
      <Button
        variant="outline"
        onClick={() => handleSocialLogin('GitHub')}
        className="flex w-full items-center gap-2"
      >
        <GithubIcon className="h-5 w-5" />
        Continue with GitHub
      </Button>
    </div>
  );
}
