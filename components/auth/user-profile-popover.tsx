import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { UserAvatar } from './user-avatar';
import { User } from '@/lib/mock-user';
import { useAuth } from '@/hooks/use-auth';
import { formatDistanceToNow } from 'date-fns';
import { Settings, Mail, Clock, LogOut, ShieldCheck } from 'lucide-react';
import { UserProfilePanel } from './user-profile-panel';

interface UserProfilePopoverProps {
  user?: User;
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  showProfilePanel?: boolean;
}

export function UserProfilePopover({
  user: propUser,
  children,
  align = 'end',
  showProfilePanel = false,
}: UserProfilePopoverProps) {
  const { user: contextUser, signOut } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [showFullProfile, setShowFullProfile] = React.useState(showProfilePanel);
  
  const user = propUser || contextUser;

  if (!user) {
    return <>{children}</>;
  }

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

  const roleBadgeClass = getRoleBadgeColor(user.role);
  
  const lastActiveFormatted = user.lastActive
    ? formatDistanceToNow(new Date(user.lastActive), { addSuffix: true })
    : 'Unknown';

  if (showFullProfile) {
    return <UserProfilePanel user={user} onClose={() => setShowFullProfile(false)} />;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="w-80 p-0 backdrop-blur-sm animate-in"
        align={align}
        sideOffset={8}
      >
        <div className="p-4">
          <div className="flex items-center gap-4">
            <UserAvatar user={user} size="lg" showStatus />
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge variant="outline" className={roleBadgeClass}>
                  {user.role}
                </Badge>
                {user.preferences.twoFactorEnabled && (
                  <Badge variant="outline" className="bg-primary/10 text-primary-foreground text-xs ml-1">
                    <ShieldCheck className="mr-1 h-3 w-3" />
                    2FA
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Mail className="mr-2 h-4 w-4" />
              <span className="truncate">{user.email}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-2 h-4 w-4" />
              <span>Active {lastActiveFormatted}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="p-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => {
              setOpen(false);
              setShowFullProfile(true);
            }}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Profile settings</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-red-600 dark:text-red-400"
            onClick={() => {
              setOpen(false);
              signOut();
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}