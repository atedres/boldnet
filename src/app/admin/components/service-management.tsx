'use client';

import { useState } from 'react';
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
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

function ServiceUploader({ serviceToEdit, onComplete }: { serviceToEdit?: any, onComplete: () => void }) {
  const [name, setName] = useState(serviceToEdit?.name || '');
  const [description, setDescription] = useState(serviceToEdit?.description || '');
  const [iconUrl, setIconUrl] = useState(serviceToEdit?.iconUrl || '');
  const firestore = useFirestore();
  const { toast } = useToast();

  const servicesCollection = useMemoFirebase(
    () => collection(firestore, 'services'),
    [firestore]
  );

  const handleUpload = async () => {
    if (!name || !description) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide a name and a description.',
      });
      return;
    }

    const serviceData = { name, description, iconUrl };

    if (serviceToEdit) {
      const docRef = doc(firestore, 'services', serviceToEdit.id);
      await updateDoc(docRef, serviceData);
      toast({ title: 'Service Updated', description: `${name} has been successfully updated.` });
    } else {
      await addDocumentNonBlocking(servicesCollection, serviceData);
      toast({ title: 'Service Added', description: `${name} has been successfully added.` });
    }

    setName('');
    setDescription('');
    setIconUrl('');
    onComplete();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{serviceToEdit ? 'Edit Service' : 'Add New Service'}</CardTitle>
        <CardDescription>
          {serviceToEdit ? `Editing the service: ${serviceToEdit.name}` : 'Add a new service offered by your agency.'}
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
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onComplete}>Cancel</Button>
        <Button onClick={handleUpload}>
          {serviceToEdit ? 'Update Service' : 'Add Service'}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function ServiceManagement() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [editingService, setEditingService] = useState<any | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const servicesCollection = useMemoFirebase(
    () => collection(firestore, 'services'),
    [firestore]
  );

  const { data: services, isLoading: isLoadingServices } = useCollection(servicesCollection);

  const handleDelete = async (serviceId: string, serviceName: string) => {
    if (window.confirm(`Are you sure you want to delete the service "${serviceName}"?`)) {
      try {
        await deleteDoc(doc(firestore, 'services', serviceId));
        toast({ title: 'Service Deleted', description: `"${serviceName}" has been removed.` });
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not delete the service.' });
        console.error("Error deleting service:", error);
      }
    }
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setIsFormVisible(true);
  };
  
  const handleAddNew = () => {
    setEditingService(null);
    setIsFormVisible(true);
  }

  const handleFormComplete = () => {
    setEditingService(null);
    setIsFormVisible(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
      {isFormVisible ? (
        <ServiceUploader serviceToEdit={editingService} onComplete={handleFormComplete} />
      ) : (
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Manage Services</CardTitle>
              <CardDescription>
                Add, edit, or delete the services your agency offers.
              </CardDescription>
            </div>
            <Button onClick={handleAddNew}>Add New Service</Button>
          </CardHeader>
          <CardContent>
            {isLoadingServices && <p className="text-center">Loading services...</p>}
            {!isLoadingServices && services && services.length === 0 && <p className="text-center text-muted-foreground">No services added yet.</p>}
            
            {!isLoadingServices && services && services.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.name}</TableCell>
                      <TableCell className="text-muted-foreground max-w-sm truncate">{service.description}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(service.id, service.name)}>
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
  );
}
