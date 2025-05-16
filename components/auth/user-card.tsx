import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { User } from '@/lib/mock-user';
import { UserAvatar } from './user-avatar';
import { cn } from '@/lib/utils';
import { MoreHorizontal, Mail, ShieldCheck } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface UserCardProps {
  user: User;
  variant?: 'default' | 'compact' | 'horizontal';
  className?: string;
  actions?: React.ReactNode;
  onClick?: () => void;
}

export function UserCard({
  user,
  variant = 'default',
  className,
  actions,
  onClick,
}: UserCardProps) {
  // Format the last active time
  const lastActiveFormatted = user.lastActive
    ? formatDistanceToNow(new Date(user.lastActive), { addSuffix: true })
    : 'Unknown';

  // Role badge color
  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'editor':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'viewer':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  // Compact variant
  if (variant === 'compact') {
    return (
      <Card className={cn("overflow-hidden", className)} onClick={onClick}>
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <UserAvatar user={user} size="sm" showStatus />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <Badge variant="outline" className={cn('ml-2 text-xs', getRoleBadgeColor(user.role))}>
                  {user.role}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Horizontal variant
  if (variant === 'horizontal') {
    return (
      <Card className={cn("overflow-hidden", className)} onClick={onClick}>
        <div className="p-4 flex items-center gap-4">
          <UserAvatar user={user} size="lg" showStatus />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold truncate">{user.name}</h3>
              <Badge variant="outline" className={cn('text-xs', getRoleBadgeColor(user.role))}>
                {user.role}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" />
              {user.email}
            </p>
            <p className="text-xs text-muted-foreground">
              Active {lastActiveFormatted}
            </p>
          </div>
          <div className="flex-shrink-0">
            {actions || (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View profile</DropdownMenuItem>
                  <DropdownMenuItem>Send message</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)} onClick={onClick}>
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 h-12" />
      <div className="px-4 pb-5 pt-0 -mt-6">
        <div className="flex justify-between items-start mb-3">
          <UserAvatar user={user} size="lg" showStatus />
          <Badge variant="outline" className={cn('mt-6 text-xs', getRoleBadgeColor(user.role))}>
            {user.role}
          </Badge>
        </div>
        <h3 className="font-semibold">{user.name}</h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
          <Mail className="h-3.5 w-3.5" />
          <span className="truncate">{user.email}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Active {lastActiveFormatted}
        </p>
        <Separator className="my-3" />
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{user.preferences.twoFactorEnabled ? '2FA Enabled' : '2FA Disabled'}</span>
          </div>
          <span className="text-muted-foreground">Member since {new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      {actions && <CardFooter className="bg-muted/50 px-4 py-2">{actions}</CardFooter>}
    </Card>
  );
}