'use client';
import { useState } from 'react';
import { collection, serverTimestamp } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Plus, Code } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';

export default function CodedLandingPageManagement() {
  const firestore = useFirestore();
  const codedPagesCollection = useMemoFirebase(() => collection(firestore, 'coded_landing_pages'), [firestore]);
  const { data: pages, isLoading } = useCollection(codedPagesCollection);
  const { toast } = useToast();

  const handleAddNew = async () => {
    try {
        const newPageData = {
            title: `New Coded Page ${Date.now()}`,
            slug: `coded-page-${Date.now()}`,
            createdAt: serverTimestamp(),
        };
        await addDocumentNonBlocking(codedPagesCollection, newPageData);
        toast({ title: 'Coded Page Created', description: 'You can now manage its content.' });
    } catch(e) {
        console.error(e);
        toast({variant: 'destructive', title: 'Error creating coded page'});
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Coded Landing Pages</CardTitle>
            <CardDescription>Manage metadata for manually coded pages.</CardDescription>
          </div>
          <Button onClick={handleAddNew}><Plus className="mr-2 h-4 w-4" /> Add New</Button>
        </CardHeader>
        <CardContent>
          {isLoading && <p className="text-center py-8">Loading coded pages...</p>}
          {!isLoading && (!pages || pages.length === 0) && (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <Code className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No Coded Pages Yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">Add a new coded page to manage its metadata.</p>
                <div className="mt-6">
                    <Button onClick={handleAddNew}>
                        <Plus className="-ml-1 mr-2 h-5 w-5" />
                        Add Coded Page
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
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pages.map((page: any) => (
                            <TableRow key={page.id}>
                                <TableCell className="font-medium">{page.title}</TableCell>
                                <TableCell className="text-muted-foreground">/{page.slug}</TableCell>
                                <TableCell>{page.createdAt ? format(page.createdAt.toDate(), 'PPP') : 'N/A'}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" disabled>
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
