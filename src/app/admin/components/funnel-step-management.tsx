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

function FunnelStepUploader() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [order, setOrder] = useState(0);
  const firestore = useFirestore();

  const funnelStepsCollection = useMemoFirebase(
    () => collection(firestore, 'funnel_steps'),
    [firestore]
  );

  const handleUpload = () => {
    if (!name || !description) {
      alert('Please provide a name and a description.');
      return;
    }
    addDocumentNonBlocking(funnelStepsCollection, { name, description, iconUrl, order });
    setName('');
    setDescription('');
    setIconUrl('');
    setOrder(0);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add New Funnel Step</CardTitle>
        <CardDescription>
          Add a step to your high-performance funnel.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Step Name</Label>
          <Input
            id="name"
            placeholder="e.g., Online Presence"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the step..."
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
        <div className="grid gap-2">
          <Label htmlFor="order">Order</Label>
          <Input
            id="order"
            type="number"
            placeholder="1"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleUpload}>
          Add Funnel Step
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function FunnelStepManagement() {
    const firestore = useFirestore();
    const funnelStepsCollection = useMemoFirebase(
        () => collection(firestore, 'funnel_steps'),
        [firestore]
    );

    const { data: funnelSteps, isLoading: isLoadingSteps } = useCollection(funnelStepsCollection);
    
    const sortedSteps = funnelSteps?.sort((a, b) => a.order - b.order);

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
            <FunnelStepUploader />
             <div className="w-full">
                <h2 className="text-xl font-bold mt-8 mb-4 text-center">Current Funnel Steps</h2>
                {isLoadingSteps && <p className="text-center">Loading steps...</p>}
                {!isLoadingSteps && sortedSteps && sortedSteps.length === 0 && <p className="text-center text-muted-foreground">No funnel steps added yet.</p>}
                <div className="space-y-4">
                    {sortedSteps?.map((step) => (
                        <Card key={step.id}>
                            <CardHeader className="flex flex-row items-center gap-4">
                                {step.iconUrl && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={step.iconUrl} alt={step.name} className="h-10 w-10" />
                                )}
                                <div className="flex-1">
                                    <CardTitle>{step.name} (Order: {step.order})</CardTitle>
                                    <CardDescription>{step.description}</CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
