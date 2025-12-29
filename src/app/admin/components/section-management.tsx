'use client';
import { useState } from 'react';
import { collection, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layers, Trash2, Edit, Award, Zap, Target, Image as ImageIcon, MessageSquare, GripVertical } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const sectionTemplates = [
  {
    type: 'feature-grid',
    name: 'Feature Grid',
    description: 'A title with 3 columns, each with an icon, title, and text.',
    icon: <Layers className="w-8 h-8" />,
    defaultContent: {
      title: 'Our Amazing Features',
      columns: [
        { icon: 'award', title: 'Feature One', description: 'Description for feature one.' },
        { icon: 'zap', title: 'Feature Two', description: 'Description for feature two.' },
        { icon: 'target', title: 'Feature Three', description: 'Description for feature three.' },
      ],
    },
  },
  {
    type: 'cta',
    name: 'Call to Action',
    description: 'A section with a title, subtitle, and a button.',
    icon: <MessageSquare className="w-8 h-8" />,
    defaultContent: {
      title: 'Ready to Get Started?',
      subtitle: 'Join us now and take your project to the next level.',
      buttonText: 'Sign Up Today',
      buttonLink: '#contact',
    },
  },
  {
    type: 'text-image',
    name: 'Text & Image',
    description: 'A split layout with an image and text content.',
    icon: <ImageIcon className="w-8 h-8" />,
    defaultContent: {
      title: 'A Picture is Worth a Thousand Words',
      text: 'Describe your image or the point you want to make. This section is great for showcasing products or telling a story.',
      imageUrl: 'https://picsum.photos/seed/section1/600/400',
      imageHint: 'abstract tech',
      imagePosition: 'left',
      buttonText: 'Learn More',
      buttonLink: '#',
    },
  },
];

function SectionForm({ section, onComplete }: { section?: any; onComplete: () => void }) {
  const [content, setContent] = useState(section?.content || {});
  const [order, setOrder] = useState(section?.order || 0);
  const firestore = useFirestore();
  const { toast } = useToast();

  const handleContentChange = (field: string, value: any) => {
    setContent((prev: any) => ({ ...prev, [field]: value }));
  };
  
  const handleColumnChange = (index: number, field: string, value: string) => {
      const newColumns = [...(content.columns || [])];
      newColumns[index] = { ...newColumns[index], [field]: value };
      handleContentChange('columns', newColumns);
  }

  const handleSubmit = async () => {
    if (!section?.id) return; // Should not happen
    const docRef = doc(firestore, 'sections', section.id);
    try {
      await setDoc(docRef, { ...section, content, order }, { merge: true });
      toast({ title: 'Section Updated', description: 'Your section has been saved.' });
      onComplete();
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save the section.' });
    }
  };

  const renderFormFields = () => {
    switch (section.type) {
      case 'feature-grid':
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="title">Main Title</Label>
              <Input id="title" value={content.title} onChange={(e) => handleContentChange('title', e.target.value)} />
            </div>
            {content.columns?.map((col: any, index: number) => (
                <div key={index} className="grid gap-4 border p-4 rounded-md">
                    <h4 className="font-semibold">Column {index + 1}</h4>
                    <div className="grid gap-2">
                        <Label>Icon</Label>
                        <Select value={col.icon} onValueChange={(val) => handleColumnChange(index, 'icon', val)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="award">Award</SelectItem>
                                <SelectItem value="zap">Zap</SelectItem>
                                <SelectItem value="target">Target</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label>Title</Label>
                        <Input value={col.title} onChange={(e) => handleColumnChange(index, 'title', e.target.value)} />
                    </div>
                     <div className="grid gap-2">
                        <Label>Description</Label>
                        <Textarea value={col.description} onChange={(e) => handleColumnChange(index, 'description', e.target.value)} />
                    </div>
                </div>
            ))}
          </>
        );
      case 'cta':
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={content.title} onChange={(e) => handleContentChange('title', e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input id="subtitle" value={content.subtitle} onChange={(e) => handleContentChange('subtitle', e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="buttonText">Button Text</Label>
              <Input id="buttonText" value={content.buttonText} onChange={(e) => handleContentChange('buttonText', e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="buttonLink">Button Link</Label>
              <Input id="buttonLink" value={content.buttonLink} onChange={(e) => handleContentChange('buttonLink', e.target.value)} />
            </div>
          </>
        );
      case 'text-image':
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={content.title} onChange={(e) => handleContentChange('title', e.target.value)} />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="text">Text</Label>
              <Textarea id="text" value={content.text} onChange={(e) => handleContentChange('text', e.target.value)} />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" value={content.imageUrl} onChange={(e) => handleContentChange('imageUrl', e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="imageHint">Image AI Hint</Label>
              <Input id="imageHint" placeholder="e.g. abstract tech" value={content.imageHint} onChange={(e) => handleContentChange('imageHint', e.target.value)} />
            </div>
             <div className="grid gap-2">
                <Label>Image Position</Label>
                <Select value={content.imagePosition} onValueChange={(val) => handleContentChange('imagePosition', val)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="buttonText">Button Text (optional)</Label>
              <Input id="buttonText" value={content.buttonText} onChange={(e) => handleContentChange('buttonText', e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="buttonLink">Button Link (optional)</Label>
              <Input id="buttonLink" value={content.buttonLink} onChange={(e) => handleContentChange('buttonLink', e.target.value)} />
            </div>
          </>
        );
      default:
        return <p>This section type has no configurable content.</p>;
    }
  };

  return (
    <Dialog open onOpenChange={onComplete}>
        <DialogContent className="sm:max-w-[625px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>Edit Section</DialogTitle>
                <DialogDescription>Modify the content for your section.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="order">Order</Label>
                    <Input id="order" type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
                </div>
                {renderFormFields()}
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={onComplete}>Cancel</Button>
                <Button onClick={handleSubmit}>Save Changes</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}


export default function SectionManagement() {
  const firestore = useFirestore();
  const sectionsCollection = useMemoFirebase(() => collection(firestore, 'sections'), [firestore]);
  const { data: sections, isLoading } = useCollection(sectionsCollection);
  const { toast } = useToast();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<any | null>(null);
  const [deletingSection, setDeletingSection] = useState<any | null>(null);

  const handleAddSection = async (template: typeof sectionTemplates[0]) => {
    try {
      const newSection = {
        type: template.type,
        order: (sections?.length || 0) + 1,
        content: template.defaultContent,
      };
      await addDocumentNonBlocking(sectionsCollection, newSection);
      toast({ title: 'Section Added', description: `${template.name} has been added.` });
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not add the section.' });
    }
  };

  const handleDelete = async () => {
    if (!deletingSection) return;
    try {
      await deleteDoc(doc(firestore, 'sections', deletingSection.id));
      toast({ title: 'Section Deleted' });
      setDeletingSection(null);
    } catch (error) {
       console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not delete the section.' });
    }
  }

  const sortedSections = sections?.sort((a, b) => a.order - b.order);

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Dynamic Sections</CardTitle>
            <CardDescription>Add, edit, and reorder content sections on your homepage.</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
                <Button>Add New Section</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                 <DialogHeader>
                    <DialogTitle>Add a new section</DialogTitle>
                    <DialogDescription>Select a pre-designed template to add to your homepage.</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                    {sectionTemplates.map(template => (
                        <button key={template.type} onClick={() => handleAddSection(template)} className="text-left p-4 border rounded-lg hover:bg-accent transition-colors">
                            <div className="flex items-center gap-4">
                                {template.icon}
                                <div className="flex-1">
                                    <p className="font-semibold">{template.name}</p>
                                    <p className="text-sm text-muted-foreground">{template.description}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {isLoading && <p className="text-center">Loading sections...</p>}
          {!isLoading && (!sortedSections || sortedSections.length === 0) && (
            <p className="text-center text-muted-foreground py-8">No dynamic sections added yet.</p>
          )}
          <div className="space-y-4">
            {sortedSections?.map(section => {
               const template = sectionTemplates.find(t => t.type === section.type);
                return (
                    <Card key={section.id} className="flex items-center gap-4 p-4">
                        <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                        {template?.icon}
                        <div className="flex-1">
                            <p className="font-semibold">{template?.name || 'Unknown Section'}</p>
                            <p className="text-sm text-muted-foreground">Order: {section.order}</p>
                        </div>
                        <div className="flex items-center gap-2">
                             <Button variant="ghost" size="icon" onClick={() => setEditingSection(section)}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => setDeletingSection(section)}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                            </Button>
                        </div>
                    </Card>
                )
            })}
          </div>
        </CardContent>
      </Card>
      
      {editingSection && (
        <SectionForm 
            section={editingSection} 
            onComplete={() => setEditingSection(null)}
        />
      )}

      <AlertDialog open={!!deletingSection} onOpenChange={(isOpen) => !isOpen && setDeletingSection(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this section.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Delete Section
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
