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


export default function HeroManagement({ onComplete }: { onComplete: () => void }) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const settingsDocRef = useMemoFirebase(() => doc(firestore, 'site_settings', 'main'), [firestore]);
  const { data: settings, isLoading } = useDoc(settingsDocRef);

  const [tagline, setTagline] = useState('');
  const [title1, setTitle1] = useState('');
  const [title2, setTitle2] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (settings?.heroContent) {
      const { tagline, title1, title2, description, imageUrl } = settings.heroContent;
      setTagline(tagline || '');
      setTitle1(title1 || '');
      setTitle2(title2 || '');
      setDescription(description || '');
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
                        <Label htmlFor="tagline">Tagline</Label>
                        <Input id="tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} />
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title1">Title (Line 1)</Label>
                            <Input id="title1" value={title1} onChange={(e) => setTitle1(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="title2">Title (Line 2)</Label>
                            <Input id="title2" value={title2} onChange={(e) => setTitle2(e.target.value)} />
                        </div>
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
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
