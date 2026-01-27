'use client';
import { useState } from 'react';
import { collection, doc, deleteDoc, setDoc, writeBatch, serverTimestamp } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Edit2, Link as LinkIcon, Rss } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { ImageUpload } from '@/components/ui/image-upload';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const defaultLang = { en: '', fr: '' };

function BlogPostEditor({ post, onBack }: { post: any; onBack: () => void }) {
    const firestore = useFirestore();
    const { toast } = useToast();
    const [title, setTitle] = useState(post.title || defaultLang);
    const [slug, setSlug] = useState(post.slug);
    const [excerpt, setExcerpt] = useState(post.excerpt || defaultLang);
    const [imageUrl, setImageUrl] = useState(post.imageUrl || '');
    const [content, setContent] = useState(post.content || defaultLang);
    const [status, setStatus] = useState(post.status || 'draft');

    const handleSavePost = async () => {
        const docRef = doc(firestore, 'blog_posts', post.id);
        try {
            await setDoc(docRef, { 
                title, 
                slug, 
                excerpt, 
                imageUrl, 
                content,
                status,
                updatedAt: serverTimestamp() 
            }, { merge: true });
            toast({ title: 'Post Saved' });
        } catch(e) {
            console.error(e);
            toast({ variant: 'destructive', title: 'Error saving post' });
        }
    };
    
    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
             <div className="flex justify-between items-center">
                <Button onClick={onBack} variant="outline">Back to All Posts</Button>
                <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground capitalize">Status: {status}</div>
                    <Button onClick={handleSavePost}>Save Post</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <Card>
                        <CardContent className="pt-6">
                            <Tabs defaultValue="fr">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="fr">Titre (FR)</TabsTrigger>
                                    <TabsTrigger value="en">Title (EN)</TabsTrigger>
                                </TabsList>
                                <TabsContent value="fr">
                                    <Input placeholder="Titre de l'article" value={title.fr} onChange={(e) => setTitle(p => ({...p, fr: e.target.value}))} className="text-2xl h-14 font-bold border-0 shadow-none focus-visible:ring-0" />
                                </TabsContent>
                                <TabsContent value="en">
                                    <Input placeholder="Post Title" value={title.en} onChange={(e) => setTitle(p => ({...p, en: e.target.value}))} className="text-2xl h-14 font-bold border-0 shadow-none focus-visible:ring-0" />
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                    <Card className="flex-grow">
                        <CardContent className="pt-6 h-full">
                           <Tabs defaultValue="fr" className="h-full flex flex-col">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="fr">Contenu (FR)</TabsTrigger>
                                    <TabsTrigger value="en">Content (EN)</TabsTrigger>
                                </TabsList>
                                <TabsContent value="fr" className="flex-grow h-0"><RichTextEditor content={content.fr} onChange={(val) => setContent(p => ({...p, fr: val}))} /></TabsContent>
                                <TabsContent value="en" className="flex-grow h-0"><RichTextEditor content={content.en} onChange={(val) => setContent(p => ({...p, en: val}))} /></TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1 flex flex-col gap-8">
                    <Card>
                        <CardHeader><CardTitle>Post Settings</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-2">
                                <Label>Status</Label>
                                <Select value={status} onValueChange={setStatus}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label>URL Slug</Label>
                                <Input value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Excerpt</Label>
                                 <Tabs defaultValue="fr">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="fr">FR</TabsTrigger>
                                        <TabsTrigger value="en">EN</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="fr"><Textarea placeholder="Résumé de l'article..." value={excerpt.fr} onChange={(e) => setExcerpt(p => ({...p, fr: e.target.value}))} /></TabsContent>
                                    <TabsContent value="en"><Textarea placeholder="Short summary of the post..." value={excerpt.en} onChange={(e) => setExcerpt(p => ({...p, en: e.target.value}))} /></TabsContent>
                                </Tabs>
                            </div>
                            <ImageUpload label="Featured Image" value={imageUrl} onChange={setImageUrl} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
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
            title: { en: "New Blog Post", fr: "Nouvel article de blog" },
            slug: `new-post-${Date.now()}`,
            content: { en: "", fr: "" },
            excerpt: { en: "", fr: "" },
            status: 'draft',
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
                                <TableCell className="font-medium">{post.title?.en || post.title?.fr}</TableCell>
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
            <AlertDialogDescription>This will permanently delete the post "{deletingPost?.title?.en || deletingPost?.title?.fr}". This action cannot be undone.</AlertDialogDescription>
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
