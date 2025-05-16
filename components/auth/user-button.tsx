import React, { useState } from 'react';
import { UserAvatar } from './user-avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LogOut,
  User,
  Settings,
  HelpCircle,
  Bell,
  Moon,
  Sun,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserProfilePopover } from './user-profile-popover';

interface UserButtonProps {
  variant?: 'default' | 'profile' | 'minimal';
  showName?: boolean;
  className?: string;
  onClick?: () => void;
}

export function UserButton({
  variant = 'default',
  showName = false,
  className,
  onClick,
}: UserButtonProps) {
  const { user, isLoading, signOut } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  if (isLoading) {
    return (
      <Button variant="ghost" size="icon" disabled className={className}>
        <Loader2 className="h-5 w-5 animate-spin" />
      </Button>
    );
  }

  if (!user) {
    return (
      <Button variant="outline" size="sm" className={className}>
        Sign in
      </Button>
    );
  }

  // Minimal variant (just avatar)
  if (variant === 'minimal') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn("rounded-full", className)}
            onClick={onClick}
          >
            <UserAvatar user={user} size="sm" />
          </Button>
        </DropdownMenuTrigger>
        <UserButtonDropdownContent signOut={signOut} />
      </DropdownMenu>
    );
  }

  // Profile variant (with popover)
  if (variant === 'profile') {
    return (
      <UserProfilePopover user={user}>
        <Button
          variant="ghost"
          size={showName ? "default" : "icon"}
          className={cn(
            "rounded-full transition-all",
            showName && "px-3",
            className
          )}
          onClick={onClick}
        >
          <UserAvatar user={user} size="sm" showStatus className="shrink-0" />
          {showName && (
            <span className="ml-2 text-sm font-medium line-clamp-1">
              {user.name}
            </span>
          )}
        </Button>
      </UserProfilePopover>
    );
  }

  // Default variant
  return (
    <DropdownMenu open={profileOpen} onOpenChange={setProfileOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={showName ? "default" : "icon"}
          className={cn(
            "rounded-full transition-all",
            showName && "px-3",
            className
          )}
          onClick={onClick}
        >
          <UserAvatar user={user} size="sm" showStatus className="shrink-0" />
          {showName && (
            <span className="ml-2 text-sm font-medium line-clamp-1">
              {user.name}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <UserButtonDropdownContent signOut={signOut} />
    </DropdownMenu>
  );
}

function UserButtonDropdownContent({ signOut }: { signOut: () => void }) {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DropdownMenuContent className="w-56" align="end" sideOffset={8} collisionPadding={8}>
      <div className="flex items-center gap-2 p-2">
        <UserAvatar user={user} size="sm" showStatus />
        <div className="flex flex-col space-y-0.5">
          <p className="text-sm font-medium line-clamp-1">{user.name}</p>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {user.email}
          </p>
        </div>
      </div>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bell className="mr-2 h-4 w-4" />
          <span>Notifications</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <HelpCircle className="mr-2 h-4 w-4" />
        <span>Help & Support</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        {user.preferences.theme === 'dark' ? (
          <Sun className="mr-2 h-4 w-4" />
        ) : (
          <Moon className="mr-2 h-4 w-4" />
        )}
        <span>Theme</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={signOut} className="text-red-600 dark:text-red-400">
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}