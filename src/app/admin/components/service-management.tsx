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
import { Textarea } from '@/components/ui/textarea';

function ServiceUploader() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const firestore = useFirestore();

  const servicesCollection = useMemoFirebase(
    () => collection(firestore, 'services'),
    [firestore]
  );

  const handleUpload = () => {
    if (!name || !description) {
      alert('Please provide a name and a description.');
      return;
    }
    addDocumentNonBlocking(servicesCollection, { name, description, iconUrl });
    setName('');
    setDescription('');
    setIconUrl('');
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add New Service</CardTitle>
        <CardDescription>
          Add a new service offered by your agency.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Service Name</Label>
          <Input
            id="name"
            placeholder="e.g., UGC Videos"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the service..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="iconUrl">Icon URL (optional)</Label>
          <Input
            id="iconUrl"
            placeholder="https://example.com/icon.png"
            value={iconUrl}
            onChange={(e) => setIconUrl(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleUpload}>
          Add Service
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function ServiceManagement() {
    const firestore = useFirestore();
    const servicesCollection = useMemoFirebase(
        () => collection(firestore, 'services'),
        [firestore]
    );

    const { data: services, isLoading: isLoadingServices } = useCollection(servicesCollection);

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
            <ServiceUploader />
             <div className="w-full">
                <h2 className="text-xl font-bold mt-8 mb-4 text-center">Current Services</h2>
                {isLoadingServices && <p className="text-center">Loading services...</p>}
                 {!isLoadingServices && services && services.length === 0 && <p className="text-center text-muted-foreground">No services added yet.</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {services?.map((service) => (
                        <Card key={service.id}>
                            <CardHeader>
                                {service.iconUrl && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={service.iconUrl} alt={service.name} className="h-10 w-10 mx-auto mb-2" />
                                )}
                                <CardTitle className="text-center">{service.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground text-center">
                                    {service.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
