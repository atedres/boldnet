'use client';
import { useState } from 'react';
import { collection, doc, deleteDoc, setDoc, writeBatch, serverTimestamp } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layers, Trash2, Edit, Award, Zap, Target, ImageIcon, MessageSquare, GripVertical, Briefcase, Users, Workflow, EyeOff, Eye, Plus, Presentation, Link as LinkIcon, Edit2, Copy } from 'lucide-react';
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import Link from 'next/link';

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


function LandingPageEditor({ page, onBack }: { page: any; onBack: () => void }) {
    const firestore = useFirestore();
    const { toast } = useToast();
    const [title, setTitle] = useState(page.title);
    const [slug, setSlug] = useState(page.slug);
    const [sections, setSections] = useState(page.content || []);

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingSection, setEditingSection] = useState<any | null>(null);
    const [deletingSection, setDeletingSection] = useState<any | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleSaveInfo = async () => {
        const docRef = doc(firestore, 'landing_pages', page.id);
        try {
            await setDoc(docRef, { title, slug, updatedAt: serverTimestamp() }, { merge: true });
            toast({ title: 'Page Info Saved' });
        } catch(e) {
            console.error(e);
            toast({ variant: 'destructive', title: 'Error saving page info' });
        }
    };
    
    const handleAddSection = async (template: typeof sectionTemplates[0]) => {
        const newSection = {
            id: doc(collection(firestore, '_')).id, // Generate a unique ID
            type: template.type,
            content: template.defaultContent || {},
            visible: true,
            order: sections.length + 1,
        };
        const updatedSections = [...sections, newSection];
        setSections(updatedSections);
        await updatePageContent(updatedSections);
        setIsAddDialogOpen(false);
    };

    const updatePageContent = async (newSections: any[]) => {
        const docRef = doc(firestore, 'landing_pages', page.id);
        try {
            await setDoc(docRef, { content: newSections, updatedAt: serverTimestamp() }, { merge: true });
            toast({ title: 'Page Content Updated' });
        } catch(e) {
            console.error(e);
            toast({ variant: 'destructive', title: 'Error updating content'});
        }
    }

    const handleDeleteSection = async () => {
        if (!deletingSection) return;
        const newSections = sections.filter((s:any) => s.id !== deletingSection.id);
        setSections(newSections);
        await updatePageContent(newSections);
        setDeletingSection(null);
    }
    
     const handleToggleVisibility = async (section: any) => {
        const newSections = sections.map((s:any) => s.id === section.id ? { ...s, visible: !(s.visible ?? true) } : s);
        setSections(newSections);
        await updatePageContent(newSections);
    }

    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = sections.findIndex((s:any) => s.id === active.id);
            const newIndex = sections.findIndex((s:any) => s.id === over?.id);
            const newSortedSections = arrayMove(sections, oldIndex, newIndex).map((s, index) => ({...s, order: index + 1}));
            setSections(newSortedSections);
            await updatePageContent(newSortedSections);
        }
    }
    
    const handleSectionUpdate = async (updatedSection: any) => {
        const newSections = sections.map((s:any) => s.id === updatedSection.id ? updatedSection : s);
        setSections(newSections);
        await updatePageContent(newSections);
        setEditingSection(null);
    }

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
            <Button onClick={onBack} variant="outline" className="self-start">Back to All Pages</Button>
            <Card>
                <CardHeader>
                    <CardTitle>Page Info</CardTitle>
                    <CardDescription>Edit the title and URL slug for your landing page.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Page Title</Label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="slug">URL Slug</Label>
                        <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSaveInfo}>Save Page Info</Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Page Content</CardTitle>
                        <CardDescription>Add, edit, and reorder the content sections for this page.</CardDescription>
                    </div>
                     <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild><Button>Add Section</Button></DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                            <DialogHeader>
                                <DialogTitle>Add a new section</DialogTitle>
                                <DialogDescription>Select a template to add to your page.</DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                                {sectionTemplates.map(template => (
                                    <button key={template.type} onClick={() => handleAddSection(template)} className="text-left p-4 border rounded-lg hover:bg-accent transition-colors">
                                        <div className="flex items-center gap-4">
                                            {template.icon}
                                            <div>
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
                    {sections.length === 0 ? (
                         <p className="text-center text-muted-foreground py-8">No sections added yet.</p>
                    ) : (
                         <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={sections.map((s:any) => s.id)} strategy={verticalListSortingStrategy}>
                                <div className="space-y-4">
                                {sections.map((section: any) => (
                                    <SortableSectionItem
                                        key={section.id}
                                        section={section}
                                        onEdit={() => setEditingSection(section)}
                                        onDelete={() => setDeletingSection(section)}
                                        onToggleVisibility={() => handleToggleVisibility(section)}
                                    />
                                ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    )}
                </CardContent>
            </Card>

            {editingSection && (
                <SectionForm 
                    section={editingSection} 
                    onComplete={() => setEditingSection(null)}
                    onSave={handleSectionUpdate}
                />
            )}
            
            <AlertDialog open={!!deletingSection} onOpenChange={(isOpen) => !isOpen && setDeletingSection(null)}>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone. This will permanently delete this section from the page.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteSection} className="bg-destructive hover:bg-destructive/90">Delete Section</AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}


function SortableSectionItem({ section, onEdit, onDelete, onToggleVisibility }: { section: any; onEdit: () => void; onDelete: () => void; onToggleVisibility: () => void; }) {
    const template = sectionTemplates.find(t => t.type === section.type);
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: section.id});
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <Card ref={setNodeRef} style={style} className="flex items-center gap-4 p-4 touch-none">
            <button {...attributes} {...listeners} className="cursor-grab"><GripVertical className="h-5 w-5 text-muted-foreground" /></button>
            {template?.icon}
            <div className="flex-1">
                <p className="font-semibold">{template?.name || 'Unknown Section'}</p>
                <p className="text-sm text-muted-foreground">Type: {section.type}</p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={onToggleVisibility}>
                    {section.visible === false ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={onEdit}><Edit className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={onDelete}><Trash2 className="h-4 w-4" /></Button>
            </div>
        </Card>
    );
}

function SectionForm({ section, onComplete, onSave }: { section: any; onComplete: () => void, onSave: (section: any) => void }) {
  const [content, setContent] = useState(section?.content || {});
  const { toast } = useToast();

  const handleContentChange = (field: string, value: any) => setContent((prev: any) => ({ ...prev, [field]: value }));
  const handleColumnChange = (index: number, field: string, value: string) => {
      const newColumns = [...(content.columns || [])];
      newColumns[index] = { ...newColumns[index], [field]: value };
      handleContentChange('columns', newColumns);
  }

  const handleSubmit = () => {
    onSave({ ...section, content });
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
      default:
        return <p>This section type has no configurable content.</p>;
    }
  };

  return (
    <Dialog open onOpenChange={onComplete}>
        <DialogContent className="sm:max-w-[625px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>Edit Section Content</DialogTitle>
                <DialogDescription>Modify the content for this section.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">{renderFormFields()}</div>
            <DialogFooter>
                <Button variant="outline" onClick={onComplete}>Cancel</Button>
                <Button onClick={handleSubmit}>Save Changes</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}


export default function LandingPageManagement() {
  const firestore = useFirestore();
  const landingPagesCollection = useMemoFirebase(() => collection(firestore, 'landing_pages'), [firestore]);
  const { data: pages, isLoading } = useCollection(landingPagesCollection);
  const { toast } = useToast();

  const [editingPage, setEditingPage] = useState<any | null>(null);
  const [deletingPage, setDeletingPage] = useState<any | null>(null);

  const handleAddNew = async () => {
    try {
        const newPageData = {
            title: "New Landing Page",
            slug: `new-page-${Date.now()}`,
            content: [],
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };
        const docRef = await addDocumentNonBlocking(landingPagesCollection, newPageData);
        setEditingPage({id: docRef.id, ...newPageData});
    } catch(e) {
        console.error(e);
        toast({variant: 'destructive', title: 'Error creating page'});
    }
  }
  
  const handleDelete = async () => {
    if (!deletingPage) return;
    try {
      await deleteDoc(doc(firestore, 'landing_pages', deletingPage.id));
      toast({ title: 'Page Deleted' });
      setDeletingPage(null);
    } catch (error) {
       console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not delete the page.' });
    }
  }

  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/lp/${slug}`;
    navigator.clipboard.writeText(url);
    toast({title: "Link Copied!", description: url});
  }

  if (editingPage) {
    return <LandingPageEditor page={editingPage} onBack={() => setEditingPage(null)} />
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Landing Pages</CardTitle>
            <CardDescription>Create and manage standalone landing pages.</CardDescription>
          </div>
          <Button onClick={handleAddNew}><Plus className="mr-2 h-4 w-4" /> Add New Page</Button>
        </CardHeader>
        <CardContent>
          {isLoading && <p className="text-center py-8">Loading pages...</p>}
          {!isLoading && (!pages || pages.length === 0) && (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <Presentation className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No Landing Pages Yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">Get started by creating your first landing page.</p>
                <div className="mt-6">
                    <Button onClick={handleAddNew}>
                        <Plus className="-ml-1 mr-2 h-5 w-5" />
                        Create Landing Page
                    </Button>
                </div>
            </div>
          )}
           {!isLoading && pages && pages.length > 0 && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Last Updated</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pages.map((page: any) => (
                            <TableRow key={page.id}>
                                <TableCell className="font-medium">{page.title}</TableCell>
                                <TableCell className="text-muted-foreground">/lp/{page.slug}</TableCell>
                                <TableCell>{page.updatedAt ? format(page.updatedAt.toDate(), 'PPP') : 'N/A'}</TableCell>
                                <TableCell className="text-right">
                                     <Button variant="ghost" size="icon" title="Copy Link" onClick={() => copyLink(page.slug)}>
                                        <LinkIcon className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" title="Edit Page" onClick={() => setEditingPage(page)}>
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" title="Delete Page" onClick={() => setDeletingPage(page)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </CardContent>
      </Card>
      
       <AlertDialog open={!!deletingPage} onOpenChange={(isOpen) => !isOpen && setDeletingPage(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete the page "{deletingPage?.title}". This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Delete Page</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
