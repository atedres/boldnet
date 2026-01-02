'use client';
import { useState } from 'react';
import { collection, doc, deleteDoc, setDoc, writeBatch } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layers, Trash2, Edit, Award, Zap, Target, ImageIcon, MessageSquare, GripVertical, Briefcase, Users, Workflow, EyeOff, Eye, Plus, Video, Home, Star, UserSquare } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { ImageUpload } from '@/components/ui/image-upload';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import HeroManagement from './hero-management';


const sectionTemplates = [
  {
    type: 'hero',
    name: 'Hero Section',
    description: 'The main hero section of the homepage.',
    icon: <Home className="w-8 h-8" />,
    isStatic: true,
    isHero: true,
  },
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
  {
    type: 'youtube-gallery',
    name: 'YouTube Video Gallery',
    description: 'Display a list of YouTube videos with titles and descriptions.',
    icon: <Video className="w-8 h-8" />,
    defaultContent: {
      title: 'Our Latest Work',
      videos: [
        { youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', title: 'Project Showcase 1', description: 'An overview of our first major project, highlighting the key features and outcomes.' },
        { youtubeUrl: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ', title: 'Client Testimonial', description: 'A satisfied client shares their experience working with our team.' },
      ],
    },
  },
  {
    type: 'services-overview',
    name: 'Services Overview',
    description: 'Displays the main services section.',
    icon: <Briefcase className="w-8 h-8" />,
    defaultContent: {},
    isStatic: true,
  },
  {
    type: 'client-showcase',
    name: 'Client Showcase',
    description: 'Displays the scrolling client logo section.',
    icon: <Users className="w-8 h-8" />,
    defaultContent: {},
    isStatic: true,
  },
  {
    type: 'funnel-display',
    name: 'Funnel / Expertise',
    description: 'Displays the funnel/process steps section.',
    icon: <Workflow className="w-8 h-8" />,
    defaultContent: {},
    isStatic: true,
  },
  {
    type: 'testimonials',
    name: 'Testimonials',
    description: 'Displays the client testimonials carousel.',
    icon: <Star className="w-8 h-8" />,
    defaultContent: {},
    isStatic: true,
  },
   {
    type: 'team',
    name: 'Team Section',
    description: 'Displays the team members.',
    icon: <UserSquare className="w-8 h-8" />,
    defaultContent: {},
    isStatic: true,
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

  const handleVideoChange = (index: number, field: string, value: string) => {
    const newVideos = [...(content.videos || [])];
    newVideos[index] = { ...newVideos[index], [field]: value };
    handleContentChange('videos', newVideos);
  };

  const handleAddVideo = () => {
      const newVideos = [...(content.videos || []), { youtubeUrl: '', title: 'New Video', description: '' }];
      handleContentChange('videos', newVideos);
  };

  const handleRemoveVideo = (index: number) => {
      const newVideos = [...(content.videos || [])];
      newVideos.splice(index, 1);
      handleContentChange('videos', newVideos);
  };

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
             <ImageUpload
                label="Image"
                value={content.imageUrl}
                onChange={(url) => handleContentChange('imageUrl', url)}
             />
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
      case 'youtube-gallery':
        return (
            <>
                <div className="grid gap-2">
                    <Label htmlFor="title">Main Title</Label>
                    <Input id="title" value={content.title} onChange={(e) => handleContentChange('title', e.target.value)} />
                </div>
                <div className="space-y-4">
                    {content.videos?.map((video: any, index: number) => (
                        <div key={index} className="grid gap-4 border p-4 rounded-md relative">
                            <h4 className="font-semibold">Video {index + 1}</h4>
                            <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 h-6 w-6"
                                onClick={() => handleRemoveVideo(index)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            <div className="grid gap-2">
                                <Label>YouTube URL</Label>
                                <Input value={video.youtubeUrl} onChange={(e) => handleVideoChange(index, 'youtubeUrl', e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
                            </div>
                            <div className="grid gap-2">
                                <Label>Title</Label>
                                <Input value={video.title} onChange={(e) => handleVideoChange(index, 'title', e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Description</Label>
                                <Textarea value={video.description} onChange={(e) => handleVideoChange(index, 'description', e.target.value)} />
                            </div>
                        </div>
                    ))}
                    <Button variant="outline" onClick={handleAddVideo}>
                        <Plus className="mr-2 h-4 w-4" /> Add Video
                    </Button>
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

function SortableSectionItem({ section, onEdit, onDelete, onToggleVisibility }: { section: any; onEdit: () => void; onDelete: () => void; onToggleVisibility: () => void; }) {
    const template = sectionTemplates.find(t => t.type === section.type);
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: section.id, disabled: !!template?.isHero });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    
    const isHeroSection = template?.isHero;

    return (
        <Card ref={setNodeRef} style={style} className="flex items-center gap-4 p-4 touch-none">
            <button {...attributes} {...listeners} className={isHeroSection ? "cursor-not-allowed text-muted-foreground/50" : "cursor-grab"}>
              <GripVertical className="h-5 w-5" />
            </button>
            {template?.icon}
            <div className="flex-1">
                <p className="font-semibold">{template?.name || 'Unknown Section'}</p>
                <p className="text-sm text-muted-foreground">Type: {section.type} | Order: {section.order}</p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={onToggleVisibility} disabled={isHeroSection}>
                    {section.visible === false ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">Toggle Visibility</span>
                </Button>
                 {(!template?.isStatic || isHeroSection) && (
                    <Button variant="ghost" size="icon" onClick={onEdit}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                    </Button>
                 )}
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={onDelete} disabled={isHeroSection}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                </Button>
            </div>
        </Card>
    );
}

export default function SectionManagement() {
  const firestore = useFirestore();
  const sectionsCollection = useMemoFirebase(() => collection(firestore, 'sections'), [firestore]);
  const { data: sections, isLoading } = useCollection(sectionsCollection);
  const { toast } = useToast();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<any | null>(null);
  const [editingHero, setEditingHero] = useState(false);
  const [deletingSection, setDeletingSection] = useState<any | null>(null);
  
  const sortedSections = sections?.sort((a, b) => a.order - b.order);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddSection = async (template: typeof sectionTemplates[0]) => {
    if (template.isHero) {
        setEditingHero(true);
        setIsAddDialogOpen(false);
        return;
    }
    
    // Prevent adding static sections if they already exist
    if (template.isStatic && sections?.some(s => s.type === template.type)) {
        toast({
            variant: 'destructive',
            title: 'Section already exists',
            description: `The "${template.name}" section can only be added once.`,
        });
        return;
    }
    
    try {
      const newSection = {
        type: template.type,
        order: (sections?.length || 0) + 1,
        content: template.defaultContent || {},
        visible: true, // Default to visible
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

  const handleToggleVisibility = async (section: any) => {
    const docRef = doc(firestore, 'sections', section.id);
    try {
        await setDoc(docRef, { visible: !(section.visible ?? true) }, { merge: true });
        toast({ title: 'Visibility Updated' });
    } catch(error) {
        console.error(error);
        toast({ variant: 'destructive', title: 'Error', description: 'Could not update visibility.' });
    }
  }
  
  const handleEditSection = (section: any) => {
    if (section.type === 'hero') {
      setEditingHero(true);
    } else {
      setEditingSection(section);
    }
  }

  async function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;
    
    if (active.id !== over?.id && sortedSections) {
      const oldIndex = sortedSections.findIndex(s => s.id === active.id);
      const newIndex = sortedSections.findIndex(s => s.id === over?.id);
      
      const newSortedSections = arrayMove(sortedSections, oldIndex, newIndex);
      
      const batch = writeBatch(firestore);
      newSortedSections.forEach((section, index) => {
        const docRef = doc(firestore, "sections", section.id);
        batch.update(docRef, { order: index });
      });
      
      try {
        await batch.commit();
        toast({ title: "Sections reordered successfully." });
      } catch (error) {
        console.error(error);
        toast({ variant: 'destructive', title: 'Error', description: 'Could not reorder the sections.' });
      }
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Homepage Content</CardTitle>
            <CardDescription>Add, edit, and reorder all sections on your homepage.</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
                <Button>Add New Section</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                 <DialogHeader>
                    <DialogTitle>Add a new section</DialogTitle>
                    <DialogDescription>Select a template to add to your homepage.</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                    {sectionTemplates.map(template => (
                        <button key={template.type} onClick={() => handleAddSection(template)} className="text-left p-4 border rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                         disabled={!template.isHero && template.isStatic && sections?.some(s => s.type === template.type)}>
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
            <p className="text-center text-muted-foreground py-8">No sections added yet. Click "Add New Section" to get started.</p>
          )}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sortedSections?.map(s => s.id) || []}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {sortedSections?.map(section => (
                   <SortableSectionItem 
                        key={section.id} 
                        section={section}
                        onEdit={() => handleEditSection(section)}
                        onDelete={() => setDeletingSection(section)}
                        onToggleVisibility={() => handleToggleVisibility(section)}
                    />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </CardContent>
      </Card>
      
      {editingHero && (
        <HeroManagement onComplete={() => setEditingHero(false)} />
      )}
      
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
    </div>
  );
}
