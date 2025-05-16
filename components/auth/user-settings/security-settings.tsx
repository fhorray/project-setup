import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { User } from '@/lib/mock-user';
import { useAuth } from '@/hooks/use-auth';
import { Shield, Key, AlertTriangle, Smartphone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SecuritySettingsProps {
  user: User;
}

export function SecuritySettings({ user }: SecuritySettingsProps) {
  const { updateUserPreferences } = useAuth();
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(
    user.preferences.twoFactorEnabled
  );
  const [showTwoFactorSetup, setShowTwoFactorSetup] = React.useState(false);
  const [verificationCode, setVerificationCode] = React.useState('');

  // Toggle two-factor authentication
  const handleToggleTwoFactor = (checked: boolean) => {
    if (checked && !twoFactorEnabled) {
      setShowTwoFactorSetup(true);
    } else if (!checked && twoFactorEnabled) {
      setTwoFactorEnabled(false);
      updateUserPreferences({
        twoFactorEnabled: false,
      });
    }
  };

  // Simulate enabling 2FA
  const handleEnableTwoFactor = () => {
    if (verificationCode === '123456') {
      setTwoFactorEnabled(true);
      updateUserPreferences({
        twoFactorEnabled: true,
      });
      setShowTwoFactorSetup(false);
    }
  };

  // Generate a mock QR code for 2FA setup (in real app, this would be a real QR code from the backend)
  const qrCodeUrl = 'https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Security Settings</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Manage your account security settings and authentication methods.
        </p>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-base">Security Status</CardTitle>
              </div>
              <div className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full">
                {twoFactorEnabled ? 'Good' : 'Basic'}
              </div>
            </div>
            <CardDescription>
              Your account security is {twoFactorEnabled ? 'good' : 'basic'}. 
              {!twoFactorEnabled && ' We recommend enabling two-factor authentication.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            {/* This would typically show security score, last login, etc. */}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="twoFactor">Two-factor authentication (2FA)</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account with 2FA.
              </p>
            </div>
            <Switch
              id="twoFactor"
              checked={twoFactorEnabled}
              onCheckedChange={handleToggleTwoFactor}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h2 className="text-lg font-semibold mb-2">Change Password</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Update your password to keep your account secure.
        </p>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" />
          </div>
        </div>

        <div className="mt-4">
          <Button variant="outline">Update Password</Button>
        </div>
      </div>

      <Separator />

      <div>
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          Danger Zone
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Permanently delete your account and all associated data.
        </p>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove all your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive text-destructive-foreground">
                Delete Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Two-Factor Authentication Setup Dialog */}
      <AlertDialog open={showTwoFactorSetup} onOpenChange={setShowTwoFactorSetup}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Set Up Two-Factor Authentication</AlertDialogTitle>
            <AlertDialogDescription>
              Scan the QR code with an authenticator app like Google Authenticator, then enter the 6-digit code below.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="flex flex-col items-center py-4">
            <img 
              src={qrCodeUrl} 
              alt="Two-factor authentication QR code" 
              className="w-40 h-40 mb-4"
            />
            <div className="text-xs text-center text-muted-foreground mb-4">
              Unable to scan? Use this code: <span className="font-mono bg-muted p-1 rounded">ABCDEF123456</span>
            </div>
            <div className="w-full space-y-2">
              <Label htmlFor="verificationCode">Verification Code</Label>
              <Input 
                id="verificationCode" 
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="123456"
                maxLength={6}
                className="tracking-widest text-center"
              />
              <p className="text-xs text-muted-foreground">
                For this demo, enter <span className="font-mono">123456</span>
              </p>
            </div>
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleEnableTwoFactor}>
              Verify and Enable
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}