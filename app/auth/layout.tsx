import Image from 'next/image';
import { ModeToggle } from '@/components/ui/mode-toggle';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4 antialiased">
      <div className="absolute right-4 top-4 md:right-8 md:top-8">
        <ModeToggle />
      </div>
      <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[350px] md:w-[450px]">
        {children}
      </div>
    </div>
  );
}
