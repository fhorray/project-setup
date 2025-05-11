import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AuthCardProps {
  children: React.ReactNode;
  cardHeader?: React.ReactNode;
  cardFooter?: React.ReactNode;
  className?: string;
}

export function AuthCard({
  children,
  cardHeader,
  cardFooter,
  className,
}: AuthCardProps) {
  return (
    <Card className={cn('w-full max-w-md shadow-lg', className)}>
      {cardHeader && (
        <CardHeader className="space-y-1">{cardHeader}</CardHeader>
      )}
      <CardContent className="pt-4">{children}</CardContent>
      {cardFooter && (
        <CardFooter className="flex flex-col items-center justify-center gap-2 pt-0">
          {cardFooter}
        </CardFooter>
      )}
    </Card>
  );
}
