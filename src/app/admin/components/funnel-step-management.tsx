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
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/ui/image-upload';
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
import Image from 'next/image';

function FunnelStepForm({ stepToEdit, onComplete }: { stepToEdit?: any, onComplete: () => void }) {
  const [name, setName] = useState(stepToEdit?.name || '');
  const [description, setDescription] = useState(stepToEdit?.description || '');
  const [iconUrl, setIconUrl] = useState(stepToEdit?.iconUrl || '');
  const [order, setOrder] = useState(stepToEdit?.order || 0);
  const firestore = useFirestore();
  const { toast } = useToast();

  const funnelStepsCollection = useMemoFirebase(
    () => collection(firestore, 'funnel_steps'),
    [firestore]
  );

  const handleAction = async () => {
    if (!name || !description) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide a name and a description.',
      });
      return;
    }

    const stepData = { name, description, iconUrl, order };

    if (stepToEdit) {
      const docRef = doc(firestore, 'funnel_steps', stepToEdit.id);
      await updateDoc(docRef, stepData);
      toast({ title: 'Funnel Step Updated', description: `${name} has been successfully updated.` });
    } else {
      await addDocumentNonBlocking(funnelStepsCollection, stepData);
      toast({ title: 'Funnel Step Added', description: `${name} has been successfully added.` });
    }
    
    setName('');
    setDescription('');
    setIconUrl('');
    setOrder(0);
    onComplete();
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{stepToEdit ? 'Edit Funnel Step' : 'Add New Funnel Step'}</CardTitle>
        <CardDescription>
          {stepToEdit ? 'Update the details for this step.' : "Add a new step to your high-performance funnel."}
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
        <ImageUpload 
            label="Icon (optional)"
            value={iconUrl}
            onChange={setIconUrl}
        />
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
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onComplete}>Cancel</Button>
        <Button onClick={handleAction}>
          {stepToEdit ? 'Update Step' : 'Add Step'}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function FunnelStepManagement() {
    const firestore = useFirestore();
    const { toast } = useToast();
    const [editingStep, setEditingStep] = useState<any | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [stepToDelete, setStepToDelete] = useState<{id: string; name: string} | null>(null);

    const funnelStepsCollection = useMemoFirebase(
        () => collection(firestore, 'funnel_steps'),
        [firestore]
    );

    const { data: funnelSteps, isLoading: isLoadingSteps } = useCollection(funnelStepsCollection);
    
    const sortedSteps = funnelSteps?.sort((a, b) => a.order - b.order);

    const confirmDelete = async () => {
        if (!stepToDelete) return;
        try {
          await deleteDoc(doc(firestore, 'funnel_steps', stepToDelete.id));
          toast({ title: 'Step Deleted', description: `"${stepToDelete.name}" has been removed.` });
        } catch (error) {
          toast({ variant: 'destructive', title: 'Error', description: 'Could not delete the step.' });
          console.error("Error deleting funnel step:", error);
        } finally {
          setStepToDelete(null);
        }
    };

    const handleEdit = (step: any) => {
        setEditingStep(step);
        setIsFormVisible(true);
    };
    
    const handleAddNew = () => {
        setEditingStep(null);
        setIsFormVisible(true);
    }

    const handleFormComplete = () => {
        setEditingStep(null);
        setIsFormVisible(false);
    };

    return (
        <>
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
                {isFormVisible ? (
                    <FunnelStepForm stepToEdit={editingStep} onComplete={handleFormComplete} />
                ) : (
                    <Card className="w-full">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Manage Funnel Steps</CardTitle>
                                <CardDescription>
                                    Add, edit, or delete the steps in your funnel.
                                </CardDescription>
                            </div>
                            <Button onClick={handleAddNew}>Add New Step</Button>
                        </CardHeader>
                        <CardContent>
                             {isLoadingSteps && <p className="text-center">Loading steps...</p>}
                             {!isLoadingSteps && sortedSteps && sortedSteps.length === 0 && <p className="text-center text-muted-foreground py-8">No steps added yet.</p>}
                             {!isLoadingSteps && sortedSteps && sortedSteps.length > 0 && (
                                 <Table>
                                     <TableHeader>
                                         <TableRow>
                                             <TableHead className="w-[50px]">Order</TableHead>
                                             <TableHead className="w-[80px]">Icon</TableHead>
                                             <TableHead>Name</TableHead>
                                             <TableHead>Description</TableHead>
                                             <TableHead className="text-right">Actions</TableHead>
                                         </TableRow>
                                     </TableHeader>
                                     <TableBody>
                                        {sortedSteps.map((step) => (
                                            <TableRow key={step.id}>
                                                <TableCell className="font-medium">{step.order}</TableCell>
                                                <TableCell>
                                                    {step.iconUrl ? (
                                                        <Image src={step.iconUrl} alt={step.name} width={40} height={40} className="rounded-md object-contain" />
                                                    ) : (
                                                        <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center text-muted-foreground text-xs">No Icon</div>
                                                    )}
                                                </TableCell>
                                                <TableCell className="font-medium">{step.name}</TableCell>
                                                <TableCell className="text-muted-foreground max-w-xs truncate">{step.description}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(step)}>
                                                        <Edit className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => setStepToDelete({id: step.id, name: step.name})}>
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

            <AlertDialog open={!!stepToDelete} onOpenChange={(isOpen) => !isOpen && setStepToDelete(null)}>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the
                    <span className="font-semibold"> {stepToDelete?.name} </span> 
                    funnel step.
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
