'use client';

import { useState } from 'react';
import { collection, deleteDoc, doc, updateDoc, writeBatch } from 'firebase/firestore';
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
import { Edit, Trash2, GripVertical, Plus, GalleryHorizontal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ImageUpload } from '@/components/ui/image-upload';
import Image from 'next/image';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


function ItemForm({ itemToEdit, onComplete, itemsCount }: { itemToEdit?: any, onComplete: () => void, itemsCount: number }) {
  const [title, setTitle] = useState(itemToEdit?.title || '');
  const [description, setDescription] = useState(itemToEdit?.description || '');
  const [imageUrl, setImageUrl] = useState(itemToEdit?.imageUrl || '');
  const [videoUrl, setVideoUrl] = useState(itemToEdit?.videoUrl || '');
  
  const firestore = useFirestore();
  const { toast } = useToast();

  const itemsCollection = useMemoFirebase(
    () => collection(firestore, 'portfolio_items'),
    [firestore]
  );

  const handleAction = async () => {
    if (!title || !imageUrl) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide a title and an image.',
      });
      return;
    }

    const itemData = { title, description, imageUrl, videoUrl };

    if (itemToEdit) {
      const docRef = doc(firestore, 'portfolio_items', itemToEdit.id);
      await updateDoc(docRef, itemData);
      toast({ title: 'Item Updated', description: `${title} has been updated.` });
    } else {
      await addDocumentNonBlocking(itemsCollection, { ...itemData, order: itemsCount });
      toast({ title: 'Item Added', description: `${title} has been added.` });
    }
    
    onComplete();
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{itemToEdit ? 'Edit Item' : 'Add New Item'}</CardTitle>
        <CardDescription>
          {itemToEdit ? 'Update the details for this portfolio item.' : "Add a new item to your portfolio."}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <ImageUpload 
            label="Image Thumbnail"
            value={imageUrl}
            onChange={setImageUrl}
        />
        <div className="grid gap-2">
          <Label htmlFor="videoUrl">YouTube Video URL (optional)</Label>
          <Input
            id="videoUrl"
            placeholder="https://www.youtube.com/watch?v=..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>
         <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="A short description of the project..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onComplete}>Cancel</Button>
        <Button onClick={handleAction}>
          {itemToEdit ? 'Update Item' : 'Add Item'}
        </Button>
      </CardFooter>
    </Card>
  );
}


function SortableItem({ item, onEdit, onDelete }: { item: any; onEdit: () => void; onDelete: () => void; }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: item.id});
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <Card ref={setNodeRef} style={style} className="flex items-center gap-4 p-4 touch-none">
            <button {...attributes} {...listeners} className="cursor-grab"><GripVertical className="h-5 w-5 text-muted-foreground" /></button>
            <Image src={item.imageUrl} alt={item.title} width={60} height={40} className="rounded-md object-cover" />
            <div className="flex-1">
                <p className="font-semibold">{item.title}</p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={onEdit}><Edit className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={onDelete}><Trash2 className="h-4 w-4" /></Button>
            </div>
        </Card>
    );
}

export default function PortfolioManagement() {
    const firestore = useFirestore();
    const { toast } = useToast();
    const [editingItem, setEditingItem] = useState<any | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<{id: string; title: string} | null>(null);

    const itemsCollection = useMemoFirebase(
        () => collection(firestore, 'portfolio_items'),
        [firestore]
    );

    const { data: items, isLoading: isLoadingItems } = useCollection(itemsCollection);
    
    const sortedItems = items?.sort((a, b) => a.order - b.order) || [];

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const confirmDelete = async () => {
        if (!itemToDelete) return;
        try {
          await deleteDoc(doc(firestore, 'portfolio_items', itemToDelete.id));
          toast({ title: 'Item Deleted', description: `"${itemToDelete.title}" has been removed.` });
        } catch (error) {
          toast({ variant: 'destructive', title: 'Error', description: 'Could not delete the item.' });
          console.error("Error deleting item:", error);
        } finally {
          setItemToDelete(null);
        }
    };

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setIsFormVisible(true);
    };
    
    const handleAddNew = () => {
        setEditingItem(null);
        setIsFormVisible(true);
    }

    const handleFormComplete = () => {
        setEditingItem(null);
        setIsFormVisible(false);
    };
    
    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (active.id !== over?.id && sortedItems) {
            const oldIndex = sortedItems.findIndex((s:any) => s.id === active.id);
            const newIndex = sortedItems.findIndex((s:any) => s.id === over?.id);
            const newSortedItems = arrayMove(sortedItems, oldIndex, newIndex);
            
            const batch = writeBatch(firestore);
            newSortedItems.forEach((item, index) => {
                const docRef = doc(firestore, "portfolio_items", item.id);
                batch.update(docRef, { order: index });
            });
            
            try {
                await batch.commit();
                toast({ title: "Order Updated" });
            } catch (error) {
                console.error(error);
                toast({ variant: 'destructive', title: 'Error', description: "Could not reorder items." });
            }
        }
    }


    return (
        <>
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
                {isFormVisible ? (
                    <ItemForm itemToEdit={editingItem} onComplete={handleFormComplete} itemsCount={items?.length || 0} />
                ) : (
                    <Card className="w-full">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Manage Portfolio</CardTitle>
                                <CardDescription>
                                    Add, edit, delete, and reorder your portfolio items.
                                </CardDescription>
                            </div>
                            <Button onClick={handleAddNew}><Plus className="mr-2 h-4 w-4" /> Add Item</Button>
                        </CardHeader>
                        <CardContent>
                             {isLoadingItems && <p className="text-center">Loading items...</p>}
                             {!isLoadingItems && sortedItems && sortedItems.length === 0 && (
                                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                                    <GalleryHorizontal className="mx-auto h-12 w-12 text-muted-foreground" />
                                    <h3 className="mt-4 text-lg font-semibold">No Portfolio Items Yet</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">Get started by adding your first project.</p>
                                    <div className="mt-6">
                                        <Button onClick={handleAddNew}>
                                            <Plus className="-ml-1 mr-2 h-5 w-5" />
                                            Add Portfolio Item
                                        </Button>
                                    </div>
                                </div>
                             )}
                             {!isLoadingItems && sortedItems && sortedItems.length > 0 && (
                                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                    <SortableContext items={sortedItems.map((m:any) => m.id)} strategy={verticalListSortingStrategy}>
                                        <div className="space-y-4">
                                            {sortedItems.map((item) => (
                                                <SortableItem 
                                                    key={item.id} 
                                                    item={item} 
                                                    onEdit={() => handleEdit(item)} 
                                                    onDelete={() => setItemToDelete({id: item.id, title: item.title})}
                                                />
                                            ))}
                                        </div>
                                    </SortableContext>
                                </DndContext>
                             )}
                        </CardContent>
                    </Card>
                )}
            </div>

            <AlertDialog open={!!itemToDelete} onOpenChange={(isOpen) => !isOpen && setItemToDelete(null)}>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                    This action is irreversible. The item
                    <span className="font-semibold"> {itemToDelete?.title} </span> 
                    will be permanently deleted.
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

    