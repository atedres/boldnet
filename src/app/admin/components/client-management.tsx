'use client';

import { useState } from 'react';
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useFirestore, useMemoFirebase, addDocumentNonBlocking } from '@/firebase';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ImageUpload } from '@/components/ui/image-upload';
import Image from 'next/image';

function ClientForm({ clientToEdit, onComplete }: { clientToEdit?: any, onComplete: () => void }) {
  const [name, setName] = useState(clientToEdit?.name || '');
  const [logoUrl, setLogoUrl] = useState(clientToEdit?.logoUrl || '');
  const [websiteUrl, setWebsiteUrl] = useState(clientToEdit?.websiteUrl || '');
  const firestore = useFirestore();
  const { toast } = useToast();

  const clientsCollection = useMemoFirebase(
    () => collection(firestore, 'clients'),
    [firestore]
  );

  const handleAction = async () => {
    if (!name || !logoUrl) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide a name and a logo URL.',
      });
      return;
    }

    const clientData = { name, logoUrl, websiteUrl };

    if (clientToEdit) {
      const docRef = doc(firestore, 'clients', clientToEdit.id);
      await updateDoc(docRef, clientData);
      toast({ title: 'Client Updated', description: `${name} has been successfully updated.` });
    } else {
      await addDocumentNonBlocking(clientsCollection, clientData);
      toast({ title: 'Client Added', description: `${name} has been successfully added.` });
    }
    
    setName('');
    setLogoUrl('');
    setWebsiteUrl('');
    onComplete();
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{clientToEdit ? 'Edit Client' : 'Add New Client'}</CardTitle>
        <CardDescription>
          {clientToEdit ? 'Update the details for this client.' : "Add a new client to your showcase."}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Client Name</Label>
          <Input
            id="name"
            placeholder="Acme Inc."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <ImageUpload 
            label="Client Logo"
            value={logoUrl}
            onChange={setLogoUrl}
        />
        <div className="grid gap-2">
          <Label htmlFor="websiteUrl">Website URL (optional)</Label>
          <Input
            id="websiteUrl"
            placeholder="https://acmeinc.com"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onComplete}>Cancel</Button>
        <Button onClick={handleAction}>
          {clientToEdit ? 'Update Client' : 'Add Client'}
        </Button>
      </CardFooter>
    </Card>
  );
}


export default function ClientManagement() {
    const firestore = useFirestore();
    const { toast } = useToast();
    const [editingClient, setEditingClient] = useState<any | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [clientToDelete, setClientToDelete] = useState<{id: string; name: string} | null>(null);

    const clientsCollection = useMemoFirebase(
        () => collection(firestore, 'clients'),
        [firestore]
    );

    const { data: clients, isLoading: isLoadingClients } = useCollection(clientsCollection);
    
    const confirmDelete = async () => {
        if (!clientToDelete) return;
        try {
          await deleteDoc(doc(firestore, 'clients', clientToDelete.id));
          toast({ title: 'Client Deleted', description: `"${clientToDelete.name}" has been removed.` });
        } catch (error) {
          toast({ variant: 'destructive', title: 'Error', description: 'Could not delete the client.' });
          console.error("Error deleting client:", error);
        } finally {
          setClientToDelete(null);
        }
    };

    const handleEdit = (client: any) => {
        setEditingClient(client);
        setIsFormVisible(true);
    };
    
    const handleAddNew = () => {
        setEditingClient(null);
        setIsFormVisible(true);
    }

    const handleFormComplete = () => {
        setEditingClient(null);
        setIsFormVisible(false);
    };


    return (
        <>
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
                {isFormVisible ? (
                    <ClientForm clientToEdit={editingClient} onComplete={handleFormComplete} />
                ) : (
                    <Card className="w-full">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Manage Clients</CardTitle>
                                <CardDescription>
                                    Add, edit, or delete the clients in your showcase.
                                </CardDescription>
                            </div>
                            <Button onClick={handleAddNew}>Add New Client</Button>
                        </CardHeader>
                        <CardContent>
                             {isLoadingClients && <p className="text-center">Loading clients...</p>}
                             {!isLoadingClients && clients && clients.length === 0 && <p className="text-center text-muted-foreground py-8">No clients added yet.</p>}
                             {!isLoadingClients && clients && clients.length > 0 && (
                                 <Table>
                                     <TableHeader>
                                         <TableRow>
                                             <TableHead className="w-[80px]">Logo</TableHead>
                                             <TableHead>Name</TableHead>
                                             <TableHead>Website</TableHead>
                                             <TableHead className="text-right">Actions</TableHead>
                                         </TableRow>
                                     </TableHeader>
                                     <TableBody>
                                        {clients.map((client) => (
                                            <TableRow key={client.id}>
                                                <TableCell>
                                                    <Image src={client.logoUrl} alt={client.name} width={40} height={40} className="rounded-md object-contain" />
                                                </TableCell>
                                                <TableCell className="font-medium">{client.name}</TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    <a href={client.websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                        {client.websiteUrl}
                                                    </a>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(client)}>
                                                        <Edit className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => setClientToDelete({id: client.id, name: client.name})}>
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Delete</span>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                     </TableBody>
                                 </Table>
                             )}
                        </CardContent>
                    </Card>
                )}
            </div>

            <AlertDialog open={!!clientToDelete} onOpenChange={(isOpen) => !isOpen && setClientToDelete(null)}>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the
                    <span className="font-semibold"> {clientToDelete?.name} </span> 
                    client.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
                    Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
