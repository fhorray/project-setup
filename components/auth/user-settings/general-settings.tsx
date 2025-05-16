import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { UserAvatar } from '../user-avatar';
import { User } from '@/lib/mock-user';
import { useAuth } from '@/hooks/use-auth';
import { AlertCircle, Camera, Save } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface GeneralSettingsProps {
  user: User;
}

export function GeneralSettings({ user }: GeneralSettingsProps) {
  const { updateUserPreferences } = useAuth();
  const [name, setName] = React.useState(user.name);
  const [email, setEmail] = React.useState(user.email);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(
    user.preferences.notifications
  );
  const [saved, setSaved] = React.useState(false);

  const handleSave = () => {
    // Update notifications preference
    updateUserPreferences({
      notifications: notificationsEnabled,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Profile Information</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Update your profile information and manage your account settings.
        </p>

        {saved && (
          <Alert className="mb-4 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
            <Save className="h-4 w-4" />
            <AlertDescription>Your settings have been saved successfully.</AlertDescription>
          </Alert>
        )}

        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <UserAvatar user={user} size="xl" />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 bottom-0 rounded-full h-7 w-7 bg-background text-muted-foreground"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h3 className="text-sm font-medium">{user.name}</h3>
                <p className="text-xs text-muted-foreground">{user.email}</p>
                <p className="text-xs mt-1">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h2 className="text-lg font-semibold mb-2">Notification Settings</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Configure how you receive notifications and updates.
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Enable notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications about updates and activity.
              </p>
            </div>
            <Switch
              id="notifications"
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save changes</Button>
      </div>
    </div>
  );
}