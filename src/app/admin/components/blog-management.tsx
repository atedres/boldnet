'use client';
import { useState } from 'react';
import { collection, doc, deleteDoc, setDoc, writeBatch, serverTimestamp } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layers, Trash2, Edit, Award, Zap, Target, ImageIcon, MessageSquare, GripVertical, Plus, Presentation, Link as LinkIcon, Edit2, Video, Rss } from 'lucide-react';
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

// Re-using section templates from landing page management for blog content
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
];


function BlogPostEditor({ post, onBack }: { post: any; onBack: () => void }) {
    const firestore = useFirestore();
    const { toast } = useToast();
    const [title, setTitle] = useState(post.title);
    const [slug, setSlug] = useState(post.slug);
    const [excerpt, setExcerpt] = useState(post.excerpt || '');
    const [imageUrl, setImageUrl] = useState(post.imageUrl || '');
    const [sections, setSections] = useState(post.content || []);

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingSection, setEditingSection] = useState<any | null>(null);
    const [deletingSection, setDeletingSection] = useState<any | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleSaveInfo = async () => {
        const docRef = doc(firestore, 'blog_posts', post.id);
        try {
            await setDoc(docRef, { title, slug, excerpt, imageUrl, updatedAt: serverTimestamp() }, { merge: true });
            toast({ title: 'Post Info Saved' });
        } catch(e) {
            console.error(e);
            toast({ variant: 'destructive', title: 'Error saving post info' });
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
        await updatePostContent(updatedSections);
        setIsAddDialogOpen(false);
    };

    const updatePostContent = async (newSections: any[]) => {
        const docRef = doc(firestore, 'blog_posts', post.id);
        try {
            await setDoc(docRef, { content: newSections, updatedAt: serverTimestamp() }, { merge: true });
            toast({ title: 'Post Content Updated' });
        } catch(e) {
            console.error(e);
            toast({ variant: 'destructive', title: 'Error updating content'});
        }
    }

    const handleDeleteSection = async () => {
        if (!deletingSection) return;
        const newSections = sections.filter((s:any) => s.id !== deletingSection.id);
        setSections(newSections);
        await updatePostContent(newSections);
        setDeletingSection(null);
    }
    
     const handleToggleVisibility = async (section: any) => {
        const newSections = sections.map((s:any) => s.id === section.id ? { ...s, visible: !(s.visible ?? true) } : s);
        setSections(newSections);
        await updatePostContent(newSections);
    }

    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = sections.findIndex((s:any) => s.id === active.id);
            const newIndex = sections.findIndex((s:any) => s.id === over?.id);
            const newSortedSections = arrayMove(sections, oldIndex, newIndex).map((s, index) => ({...s, order: index + 1}));
            setSections(newSortedSections);
            await updatePostContent(newSortedSections);
        }
    }
    
    const handleSectionUpdate = async (updatedSection: any) => {
        const newSections = sections.map((s:any) => s.id === updatedSection.id ? updatedSection : s);
        setSections(newSections);
        await updatePostContent(newSections);
        setEditingSection(null);
    }

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
            <Button onClick={onBack} variant="outline" className="self-start">Back to All Posts</Button>
            <Card>
                <CardHeader>
                    <CardTitle>Post Info</CardTitle>
                    <CardDescription>Edit the title, URL slug, and metadata for your blog post.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 grid gap-2">
                        <Label htmlFor="title">Post Title</Label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="slug">URL Slug</Label>
                        <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="A short summary of the post..." />
                    </div>
                    <div className="md:col-span-2">
                       <ImageUpload label="Featured Image" value={imageUrl} onChange={setImageUrl} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSaveInfo}>Save Post Info</Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Post Content</CardTitle>
                        <CardDescription>Add, edit, and reorder the content sections for this post.</CardDescription>
                    </div>
                     <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild><Button>Add Section</Button></DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                            <DialogHeader>
                                <DialogTitle>Add a new section</DialogTitle>
                                <DialogDescription>Select a template to add to your post.</DialogDescription>
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
                    <AlertDialogDescription>This action cannot be undone. This will permanently delete this section from the post.</AlertDialogDescription>
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
                    {section.visible === false ? <Rss className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={onEdit}><Edit className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={onDelete}><Trash2 className="h-4 w-4" /></Button>
            </div>
        </Card>
    );
}

function SectionForm({ section, onComplete, onSave }: { section: any; onComplete: () => void, onSave: (section: any) => void }) {
  const [content, setContent] = useState(section?.content || {});

  const handleContentChange = (field: string, value: any) => setContent((prev: any) => ({ ...prev, [field]: value }));
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

export default function BlogManagement() {
  const firestore = useFirestore();
  const blogPostsCollection = useMemoFirebase(() => collection(firestore, 'blog_posts'), [firestore]);
  const { data: posts, isLoading } = useCollection(blogPostsCollection);
  const { toast } = useToast();

  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [deletingPost, setDeletingPost] = useState<any | null>(null);

  const handleAddNew = async () => {
    try {
        const newPostData = {
            title: "New Blog Post",
            slug: `new-post-${Date.now()}`,
            content: [],
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };
        const docRef = await addDocumentNonBlocking(blogPostsCollection, newPostData);
        setEditingPost({id: docRef.id, ...newPostData});
    } catch(e) {
        console.error(e);
        toast({variant: 'destructive', title: 'Error creating post'});
    }
  }
  
  const handleDelete = async () => {
    if (!deletingPost) return;
    try {
      await deleteDoc(doc(firestore, 'blog_posts', deletingPost.id));
      toast({ title: 'Post Deleted' });
      setDeletingPost(null);
    } catch (error) {
       console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not delete the post.' });
    }
  }

  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/blog/${slug}`;
    navigator.clipboard.writeText(url);
    toast({title: "Link Copied!", description: url});
  }

  if (editingPost) {
    return <BlogPostEditor post={editingPost} onBack={() => setEditingPost(null)} />
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Blog Posts</CardTitle>
            <CardDescription>Create and manage your blog articles.</CardDescription>
          </div>
          <Button onClick={handleAddNew}><Plus className="mr-2 h-4 w-4" /> Add New Post</Button>
        </CardHeader>
        <CardContent>
          {isLoading && <p className="text-center py-8">Loading posts...</p>}
          {!isLoading && (!posts || posts.length === 0) && (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <Rss className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No Blog Posts Yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">Get started by creating your first blog post.</p>
                <div className="mt-6">
                    <Button onClick={handleAddNew}>
                        <Plus className="-ml-1 mr-2 h-5 w-5" />
                        Create Blog Post
                    </Button>
                </div>
            </div>
          )}
           {!isLoading && posts && posts.length > 0 && (
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
                        {posts.map((post: any) => (
                            <TableRow key={post.id}>
                                <TableCell className="font-medium">{post.title}</TableCell>
                                <TableCell className="text-muted-foreground">/blog/{post.slug}</TableCell>
                                <TableCell>{post.updatedAt ? format(post.updatedAt.toDate(), 'PPP') : 'N/A'}</TableCell>
                                <TableCell className="text-right">
                                     <Button variant="ghost" size="icon" title="Copy Link" onClick={() => copyLink(post.slug)}>
                                        <LinkIcon className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" title="Edit Post" onClick={() => setEditingPost(post)}>
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" title="Delete Post" onClick={() => setDeletingPost(post)}>
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
      
       <AlertDialog open={!!deletingPost} onOpenChange={(isOpen) => !isOpen && setDeletingPost(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete the post "{deletingPost?.title}". This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Delete Post</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
