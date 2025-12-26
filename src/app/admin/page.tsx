'use client';
import { useAuth, useMemoFirebase, FirebaseClientProvider } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { collection, query, where } from 'firebase/firestore';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useFirestore } from '@/firebase';

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
import { addDocumentNonBlocking } from '@/firebase';

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

function AdminPage() {
  const { user, isUserLoading } = useAuth();
  const router = useRouter();

  const firestore = useFirestore();
  const clientsCollection = useMemoFirebase(
    () => collection(firestore, 'clients'),
    [firestore]
  );

  const { data: clients, isLoading: isLoadingClients } =
    useCollection(clientsCollection);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <ClientUploader />

          <div className="w-full max-w-4xl">
            <h2 className="text-xl font-bold mt-8 mb-4">Current Clients</h2>
            {isLoadingClients && <p>Loading clients...</p>}
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
        </main>
      </div>
    </div>
  );
}

export default function Admin() {
  return (
    <FirebaseClientProvider>
      <AdminPage />
    </FirebaseClientProvider>
  );
}
