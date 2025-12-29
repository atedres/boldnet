'use client';
import { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { useFirestore, useDoc, useMemoFirebase, setDocumentNonBlocking } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';

export default function ThemeManagement() {
  const firestore = useFirestore();
  const { toast } = useToast();

  const settingsDocRef = useMemoFirebase(() => doc(firestore, 'theme_settings', 'main'), [firestore]);
  const { data: themeSettings, isLoading } = useDoc(settingsDocRef);

  const [logoUrl, setLogoUrl] = useState('');
  const [primaryColor, setPrimaryColor] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');

  useEffect(() => {
    if (themeSettings) {
      setLogoUrl(themeSettings.logoUrl || '');
      setPrimaryColor(themeSettings.primaryColor || '');
      setBackgroundColor(themeSettings.backgroundColor || '');
    }
  }, [themeSettings]);

  const handleSave = async () => {
    try {
        const settingsToSave = {
            logoUrl,
            primaryColor,
            backgroundColor
        };
      await setDoc(settingsDocRef, settingsToSave, { merge: true });
      toast({ title: 'Theme Saved', description: 'Your new theme settings have been applied.' });
    } catch (error) {
      console.error('Error saving theme:', error);
      toast({
        variant: 'destructive',
        title: 'Error Saving Theme',
        description: 'Could not save your theme settings.',
      });
    }
  };

  const handleReset = () => {
      setLogoUrl('');
      setPrimaryColor('0 84.2% 60.2%');
      setBackgroundColor('0 0% 100%');
      toast({title: "Reset", description: "Values have been reset. Click save to apply."})
  }

  if (isLoading) {
      return <p>Loading theme settings...</p>
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Theme Customization</CardTitle>
          <CardDescription>
            Customize the look and feel of your website. Changes will apply globally after saving.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ImageUpload
            label="Site Logo"
            value={logoUrl}
            onChange={setLogoUrl}
          />
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Primary Color (HSL)</Label>
            <Input
              id="primaryColor"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              placeholder="e.g., 0 84.2% 60.2%"
            />
             <p className="text-sm text-muted-foreground">This controls buttons and highlights. Use HSL format: `Hue Saturation% Lightness%`.</p>
          </div>
           <div className="space-y-2">
            <Label htmlFor="backgroundColor">Background Color (HSL)</Label>
            <Input
              id="backgroundColor"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              placeholder="e.g., 0 0% 100%"
            />
             <p className="text-sm text-muted-foreground">This is the main site background. Use HSL format: `Hue Saturation% Lightness%`.</p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleReset}>Reset to Default</Button>
            <Button onClick={handleSave}>Save Theme</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
