'use client';
import { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/ui/image-upload';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const defaultLang = { en: '', fr: '' };

export default function HeroManagement({ onComplete }: { onComplete: () => void }) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const settingsDocRef = useMemoFirebase(() => doc(firestore, 'site_settings', 'main'), [firestore]);
  const { data: settings, isLoading } = useDoc(settingsDocRef);

  const [tagline, setTagline] = useState(defaultLang);
  const [title1, setTitle1] = useState(defaultLang);
  const [title2, setTitle2] = useState(defaultLang);
  const [description, setDescription] = useState(defaultLang);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (settings?.heroContent) {
      const { tagline, title1, title2, description, imageUrl } = settings.heroContent;
      setTagline(tagline || defaultLang);
      setTitle1(title1 || defaultLang);
      setTitle2(title2 || defaultLang);
      setDescription(description || defaultLang);
      setImageUrl(imageUrl || '');
    }
  }, [settings]);

  const handleSave = async () => {
    try {
      const heroContent = { tagline, title1, title2, description, imageUrl };
      await setDoc(settingsDocRef, { heroContent }, { merge: true });
      toast({ title: 'Hero Section Saved' });
      onComplete();
    } catch (error) {
      console.error('Error saving hero content:', error);
      toast({
        variant: 'destructive',
        title: 'Error Saving',
        description: 'Could not save the hero section content.',
      });
    }
  };
  
  return (
    <Dialog open onOpenChange={onComplete}>
        <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
                <DialogTitle>Edit Hero Section</DialogTitle>
                <DialogDescription>Modify the content of the main section of your homepage.</DialogDescription>
            </DialogHeader>
            
            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : (
                <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
                    <div className="grid gap-2">
                        <Label>Tagline</Label>
                        <Tabs defaultValue="fr" className="w-full">
                            <TabsList className="grid w-full grid-cols-2"><TabsTrigger value="fr">Français</TabsTrigger><TabsTrigger value="en">English</TabsTrigger></TabsList>
                            <TabsContent value="fr"><Input value={tagline.fr} onChange={(e) => setTagline(p => ({...p, fr: e.target.value}))} /></TabsContent>
                            <TabsContent value="en"><Input value={tagline.en} onChange={(e) => setTagline(p => ({...p, en: e.target.value}))} /></TabsContent>
                        </Tabs>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label>Title (Line 1)</Label>
                            <Tabs defaultValue="fr" className="w-full">
                                <TabsList className="grid w-full grid-cols-2"><TabsTrigger value="fr">Français</TabsTrigger><TabsTrigger value="en">English</TabsTrigger></TabsList>
                                <TabsContent value="fr"><Input value={title1.fr} onChange={(e) => setTitle1(p => ({...p, fr: e.target.value}))} /></TabsContent>
                                <TabsContent value="en"><Input value={title1.en} onChange={(e) => setTitle1(p => ({...p, en: e.target.value}))} /></TabsContent>
                            </Tabs>
                        </div>
                        <div className="grid gap-2">
                            <Label>Title (Line 2)</Label>
                             <Tabs defaultValue="fr" className="w-full">
                                <TabsList className="grid w-full grid-cols-2"><TabsTrigger value="fr">Français</TabsTrigger><TabsTrigger value="en">English</TabsTrigger></TabsList>
                                <TabsContent value="fr"><Input value={title2.fr} onChange={(e) => setTitle2(p => ({...p, fr: e.target.value}))} /></TabsContent>
                                <TabsContent value="en"><Input value={title2.en} onChange={(e) => setTitle2(p => ({...p, en: e.target.value}))} /></TabsContent>
                            </Tabs>
                        </div>
                    </div>
                     <div className="grid gap-2">
                        <Label>Description</Label>
                        <Tabs defaultValue="fr" className="w-full">
                            <TabsList className="grid w-full grid-cols-2"><TabsTrigger value="fr">Français</TabsTrigger><TabsTrigger value="en">English</TabsTrigger></TabsList>
                            <TabsContent value="fr"><Textarea value={description.fr} onChange={(e) => setDescription(p => ({...p, fr: e.target.value}))} /></TabsContent>
                            <TabsContent value="en"><Textarea value={description.en} onChange={(e) => setDescription(p => ({...p, en: e.target.value}))} /></TabsContent>
                        </Tabs>
                    </div>
                     <ImageUpload
                        label="Background Image (optional)"
                        value={imageUrl}
                        onChange={setImageUrl}
                    />
                </div>
            )}
            
            <DialogFooter>
                <Button variant="outline" onClick={onComplete}>Cancel</Button>
                <Button onClick={handleSave} disabled={isLoading}>Save Changes</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
