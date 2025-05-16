import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { User } from 'better-auth';

interface UserAvatarProps {
  user?: Pick<User, 'name' | 'imageUrl' | 'status'> | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStatus?: boolean;
  className?: string;
}

export function UserAvatar({
  user,
  size = 'md',
  showStatus = false,
  className,
}: UserAvatarProps) {
  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Size mappings
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  // Status indicator position based on avatar size
  const statusSizeClasses = {
    sm: 'h-2.5 w-2.5 right-0 bottom-0',
    md: 'h-3 w-3 right-0 bottom-0',
    lg: 'h-3.5 w-3.5 right-0.5 bottom-0.5',
    xl: 'h-4 w-4 right-1 bottom-1',
  };

  // Status colors
  const statusColorClasses = {
    online: 'bg-emerald-500',
    busy: 'bg-red-500',
    away: 'bg-amber-500',
    offline: 'bg-gray-400',
  };

  if (!user) {
    return (
      <Avatar className={cn(sizeClasses[size], 'bg-muted', className)}>
        <AvatarFallback className="text-muted-foreground bg-secondary">
          ?
        </AvatarFallback>
      </Avatar>
    );
  }

  return (
    <div className="relative inline-block">
      <Avatar className={cn(sizeClasses[size], className)}>
        <AvatarImage src={user.imageUrl} alt={user.name} />
        <AvatarFallback className="bg-primary/10 text-primary">
          {getInitials(user.name)}
        </AvatarFallback>
      </Avatar>
      {showStatus && user.status && (
        <span
          className={cn(
            'absolute border-2 border-background rounded-full',
            statusSizeClasses[size],
            statusColorClasses[user.status],
          )}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
