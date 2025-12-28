'use client';

import { useState } from 'react';
import { collection } from 'firebase/firestore';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useFirestore, useMemoFirebase, addDocumentNonBlocking } from '@/firebase';

import { Button } from '@/components/ui/button';
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

function ClientUploader() {
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const firestore = useFirestore();

  const clientsCollection = useMemoFirebase(
    () => collection(firestore, 'clients'),
    [firestore]
  );

  const handleUpload = () => {
    if (!name || !logoUrl) {
      alert('Please provide a name and a logo URL.');
      return;
    }
    addDocumentNonBlocking(clientsCollection, {
      name,
      logoUrl,
      websiteUrl,
    });
    setName('');
    setLogoUrl('');
    setWebsiteUrl('');
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add New Client</CardTitle>
        <CardDescription>
          Upload a new client's logo and information.
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
        <div className="grid gap-2">
          <Label htmlFor="logoUrl">Logo URL</Label>
          <Input
            id="logoUrl"
            placeholder="https://example.com/logo.png"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
          />
        </div>
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
      <CardFooter>
        <Button className="w-full" onClick={handleUpload}>
          Add Client
        </Button>
      </CardFooter>
    </Card>
  );
}


export default function ClientManagement() {
    const firestore = useFirestore();
    const clientsCollection = useMemoFirebase(
        () => collection(firestore, 'clients'),
        [firestore]
    );

    const { data: clients, isLoading: isLoadingClients } = useCollection(clientsCollection);

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
            <ClientUploader />
            <div className="w-full">
                <h2 className="text-xl font-bold mt-8 mb-4 text-center">Current Clients</h2>
                {isLoadingClients && <p className="text-center">Loading clients...</p>}
                {!isLoadingClients && clients && clients.length === 0 && <p className="text-center text-muted-foreground">No clients added yet.</p>}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {clients?.map((client) => (
                        <Card key={client.id}>
                            <CardContent className="p-4 flex flex-col items-center justify-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={client.logoUrl}
                                    alt={client.name}
                                    className="h-16 w-16 object-contain mb-2"
                                />
                                <p className="text-sm font-medium text-center">
                                    {client.name}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
