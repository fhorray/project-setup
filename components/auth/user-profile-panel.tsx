import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User } from '@/lib/mock-user';
import { GeneralSettings } from './user-settings/general-settings';
import { SecuritySettings } from './user-settings/security-settings';
import { AppearanceSettings } from './user-settings/appearance-settings';
import { UserCard } from './user-card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface UserProfilePanelProps {
  user: User;
  onClose?: () => void;
  defaultTab?: string;
}

export function UserProfilePanel({ 
  user, 
  onClose,
  defaultTab = 'general' 
}: UserProfilePanelProps) {
  const [open, setOpen] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState(defaultTab);

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      setTimeout(onClose, 300); // Allow animation to complete
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="sm:max-w-lg w-full p-0 gap-0 overflow-y-auto">
        <SheetHeader className="px-4 py-3 flex-row items-center justify-between border-b">
          <SheetTitle>Profile Settings</SheetTitle>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>
        
        <div className="h-full flex flex-col">
          <div className="flex-none p-4 pb-0">
            <UserCard user={user} variant="horizontal" />
          </div>
          
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col h-full"
          >
            <TabsList className="grid grid-cols-3 px-4 py-2">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
            </TabsList>
            
            <div className="flex-1 overflow-y-auto p-4">
              <TabsContent value="general" className="mt-0 h-full">
                <GeneralSettings user={user} />
              </TabsContent>
              <TabsContent value="security" className="mt-0 h-full">
                <SecuritySettings user={user} />
              </TabsContent>
              <TabsContent value="appearance" className="mt-0 h-full">
                <AppearanceSettings user={user} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}