import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { User } from '@/lib/mock-user';
import { useAuth } from '@/hooks/use-auth';
import { Sun, Moon, Laptop, Check, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppearanceSettingsProps {
  user: User;
}

export function AppearanceSettings({ user }: AppearanceSettingsProps) {
  const { updateUserPreferences } = useAuth();
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'system'>(
    user.preferences.theme
  );
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [fontSize, setFontSize] = React.useState('medium');
  const [accentColor, setAccentColor] = React.useState('default');

  // Update theme preference
  const handleThemeChange = (value: 'light' | 'dark' | 'system') => {
    setTheme(value);
    updateUserPreferences({
      theme: value,
    });
  };

  // Accent color options
  const accentColors = [
    { name: 'Default', value: 'default', class: 'bg-primary' },
    { name: 'Purple', value: 'purple', class: 'bg-purple-500' },
    { name: 'Blue', value: 'blue', class: 'bg-blue-500' },
    { name: 'Green', value: 'green', class: 'bg-emerald-500' },
    { name: 'Orange', value: 'orange', class: 'bg-orange-500' },
    { name: 'Pink', value: 'pink', class: 'bg-pink-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Appearance</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Customize the look and feel of the application.
        </p>

        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium mb-3">Theme</div>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                className={cn(
                  'h-auto flex flex-col items-center justify-between py-3 px-4 gap-2',
                  theme === 'light' ? 'border-primary' : 'border-input'
                )}
                onClick={() => handleThemeChange('light')}
              >
                <Sun className="h-6 w-6 mb-2" />
                <div className="text-xs font-normal">Light</div>
                {theme === 'light' && (
                  <div className="absolute top-2 right-2">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                className={cn(
                  'h-auto flex flex-col items-center justify-between py-3 px-4 gap-2',
                  theme === 'dark' ? 'border-primary' : 'border-input'
                )}
                onClick={() => handleThemeChange('dark')}
              >
                <Moon className="h-6 w-6 mb-2" />
                <div className="text-xs font-normal">Dark</div>
                {theme === 'dark' && (
                  <div className="absolute top-2 right-2">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </Button>
              <Button
                variant={theme === 'system' ? 'default' : 'outline'}
                className={cn(
                  'h-auto flex flex-col items-center justify-between py-3 px-4 gap-2',
                  theme === 'system' ? 'border-primary' : 'border-input'
                )}
                onClick={() => handleThemeChange('system')}
              >
                <Laptop className="h-6 w-6 mb-2" />
                <div className="text-xs font-normal">System</div>
                {theme === 'system' && (
                  <div className="absolute top-2 right-2">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-2">
          <Palette className="h-5 w-5" />
          Accent Color
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Choose the primary accent color for buttons and interactive elements.
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {accentColors.map((color) => (
            <button
              key={color.value}
              className={cn(
                'relative h-14 rounded-md flex flex-col items-center justify-center border-2',
                accentColor === color.value ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-muted-foreground/10',
                'transition-all duration-150'
              )}
              onClick={() => setAccentColor(color.value)}
            >
              <span className={cn('h-6 w-6 rounded-full', color.class)} />
              <span className="text-xs mt-1">{color.name}</span>
              {accentColor === color.value && (
                <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground h-4 w-4 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h2 className="text-lg font-semibold mb-2">Text Size</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Adjust the size of text throughout the application.
        </p>

        <RadioGroup
          value={fontSize}
          onValueChange={setFontSize}
          className="grid grid-cols-1 sm:grid-cols-3 gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="small" id="fontSize-small" />
            <Label htmlFor="fontSize-small" className="text-sm">Small</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="fontSize-medium" />
            <Label htmlFor="fontSize-medium" className="text-base">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="large" id="fontSize-large" />
            <Label htmlFor="fontSize-large" className="text-lg">Large</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <div>
        <h2 className="text-lg font-semibold mb-2">Accessibility</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Customize accessibility settings for your experience.
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reducedMotion">Reduced motion</Label>
              <p className="text-sm text-muted-foreground">
                Reduce the amount of animations throughout the interface.
              </p>
            </div>
            <Switch
              id="reducedMotion"
              checked={reducedMotion}
              onCheckedChange={setReducedMotion}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Save changes</Button>
      </div>
    </div>
  );
}