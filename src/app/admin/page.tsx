'use client';
import { useUser, useMemoFirebase, FirebaseClientProvider, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { collection } from 'firebase/firestore';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useFirestore } from '@/firebase';
import { LogOut } from 'lucide-react';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

function ImageUploader() {
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Add Site Image</CardTitle>
                <CardDescription>
                    Add a new image to be used on the site.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
               <div className="grid gap-2">
                 <Label htmlFor="imageUrl">Image URL</Label>
                 <Input id="imageUrl" placeholder="https://example.com/image.png" />
               </div>
                <div className="grid gap-2">
                    <Label htmlFor="imageDescription">Description</Label>
                    <Input id="imageDescription" placeholder="A descriptive name for the image" />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" disabled>Add Image (Coming Soon)</Button>
            </CardFooter>
        </Card>
    );
}

function AdminPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const auth = useAuth();

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
  
  const handleLogout = () => {
    if(auth) {
      auth.signOut();
    }
  }

  if (isUserLoading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <Button variant="outline" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
            </Button>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 items-center">
            <Tabs defaultValue="clients" className="w-full max-w-4xl">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="clients">Our Clients</TabsTrigger>
                    <TabsTrigger value="images">Site Images</TabsTrigger>
                </TabsList>
                <TabsContent value="clients">
                    <div className="flex flex-col items-center gap-8 mt-4">
                        <ClientUploader />
                        <div className="w-full">
                            <h2 className="text-xl font-bold mt-8 mb-4 text-center">Current Clients</h2>
                            {isLoadingClients && <p className="text-center">Loading clients...</p>}
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
                </TabsContent>
                <TabsContent value="images">
                     <div className="flex flex-col items-center gap-8 mt-4">
                        <ImageUploader />
                    </div>
                </TabsContent>
            </Tabs>
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
