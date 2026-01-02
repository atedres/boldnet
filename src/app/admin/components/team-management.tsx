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
import { Edit, Trash2, GripVertical, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ImageUpload } from '@/components/ui/image-upload';
import Image from 'next/image';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


function MemberForm({ memberToEdit, onComplete, membersCount }: { memberToEdit?: any, onComplete: () => void, membersCount: number }) {
  const [name, setName] = useState(memberToEdit?.name || '');
  const [position, setPosition] = useState(memberToEdit?.position || '');
  const [imageUrl, setImageUrl] = useState(memberToEdit?.imageUrl || '');
  
  const firestore = useFirestore();
  const { toast } = useToast();

  const membersCollection = useMemoFirebase(
    () => collection(firestore, 'team_members'),
    [firestore]
  );

  const handleAction = async () => {
    if (!name || !position || !imageUrl) {
      toast({
        variant: 'destructive',
        title: 'Informations manquantes',
        description: 'Veuillez fournir un nom, une position et une image.',
      });
      return;
    }

    const memberData = { name, position, imageUrl };

    if (memberToEdit) {
      const docRef = doc(firestore, 'team_members', memberToEdit.id);
      await updateDoc(docRef, memberData);
      toast({ title: 'Membre mis à jour', description: `${name} a été mis à jour.` });
    } else {
      await addDocumentNonBlocking(membersCollection, { ...memberData, order: membersCount });
      toast({ title: 'Membre ajouté', description: `${name} a été ajouté.` });
    }
    
    onComplete();
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{memberToEdit ? 'Modifier le Membre' : 'Ajouter un Membre'}</CardTitle>
        <CardDescription>
          {memberToEdit ? 'Mettez à jour les détails de ce membre.' : "Ajoutez un nouveau membre à l'équipe."}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <ImageUpload 
            label="Photo du membre"
            value={imageUrl}
            onChange={setImageUrl}
            cropShape="round"
            aspectRatio={1}
        />
        <div className="grid gap-2">
          <Label htmlFor="name">Nom</Label>
          <Input
            id="name"
            placeholder="Jean Dupont"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
         <div className="grid gap-2">
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            placeholder="CEO, Développeur..."
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onComplete}>Annuler</Button>
        <Button onClick={handleAction}>
          {memberToEdit ? 'Mettre à jour' : 'Ajouter'}
        </Button>
      </CardFooter>
    </Card>
  );
}


function SortableMemberItem({ member, onEdit, onDelete }: { member: any; onEdit: () => void; onDelete: () => void; }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: member.id});
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <Card ref={setNodeRef} style={style} className="flex items-center gap-4 p-4 touch-none">
            <button {...attributes} {...listeners} className="cursor-grab"><GripVertical className="h-5 w-5 text-muted-foreground" /></button>
            <Image src={member.imageUrl} alt={member.name} width={40} height={40} className="rounded-full object-cover" />
            <div className="flex-1">
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.position}</p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={onEdit}><Edit className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={onDelete}><Trash2 className="h-4 w-4" /></Button>
            </div>
        </Card>
    );
}

export default function TeamManagement() {
    const firestore = useFirestore();
    const { toast } = useToast();
    const [editingMember, setEditingMember] = useState<any | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState<{id: string; name: string} | null>(null);

    const membersCollection = useMemoFirebase(
        () => collection(firestore, 'team_members'),
        [firestore]
    );

    const { data: members, isLoading: isLoadingMembers } = useCollection(membersCollection);
    
    const sortedMembers = members?.sort((a, b) => a.order - b.order) || [];

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const confirmDelete = async () => {
        if (!memberToDelete) return;
        try {
          await deleteDoc(doc(firestore, 'team_members', memberToDelete.id));
          toast({ title: 'Membre supprimé', description: `"${memberToDelete.name}" a été supprimé.` });
        } catch (error) {
          toast({ variant: 'destructive', title: 'Erreur', description: 'Impossible de supprimer le membre.' });
          console.error("Error deleting member:", error);
        } finally {
          setMemberToDelete(null);
        }
    };

    const handleEdit = (member: any) => {
        setEditingMember(member);
        setIsFormVisible(true);
    };
    
    const handleAddNew = () => {
        setEditingMember(null);
        setIsFormVisible(true);
    }

    const handleFormComplete = () => {
        setEditingMember(null);
        setIsFormVisible(false);
    };
    
    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (active.id !== over?.id && sortedMembers) {
            const oldIndex = sortedMembers.findIndex((s:any) => s.id === active.id);
            const newIndex = sortedMembers.findIndex((s:any) => s.id === over?.id);
            const newSortedMembers = arrayMove(sortedMembers, oldIndex, newIndex);
            
            const batch = writeBatch(firestore);
            newSortedMembers.forEach((member, index) => {
                const docRef = doc(firestore, "team_members", member.id);
                batch.update(docRef, { order: index });
            });
            
            try {
                await batch.commit();
                toast({ title: "Ordre mis à jour" });
            } catch (error) {
                console.error(error);
                toast({ variant: 'destructive', title: 'Erreur', description: "Impossible de réorganiser les membres." });
            }
        }
    }


    return (
        <>
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
                {isFormVisible ? (
                    <MemberForm memberToEdit={editingMember} onComplete={handleFormComplete} membersCount={members?.length || 0} />
                ) : (
                    <Card className="w-full">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Gérer l'Équipe</CardTitle>
                                <CardDescription>
                                    Ajoutez, modifiez, supprimez et réorganisez les membres de votre équipe.
                                </CardDescription>
                            </div>
                            <Button onClick={handleAddNew}><Plus className="mr-2 h-4 w-4" /> Ajouter un membre</Button>
                        </CardHeader>
                        <CardContent>
                             {isLoadingMembers && <p className="text-center">Chargement des membres...</p>}
                             {!isLoadingMembers && sortedMembers && sortedMembers.length === 0 && <p className="text-center text-muted-foreground py-8">Aucun membre ajouté pour le moment.</p>}
                             {!isLoadingMembers && sortedMembers && sortedMembers.length > 0 && (
                                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                    <SortableContext items={sortedMembers.map((m:any) => m.id)} strategy={verticalListSortingStrategy}>
                                        <div className="space-y-4">
                                            {sortedMembers.map((member) => (
                                                <SortableMemberItem 
                                                    key={member.id} 
                                                    member={member} 
                                                    onEdit={() => handleEdit(member)} 
                                                    onDelete={() => setMemberToDelete({id: member.id, name: member.name})}
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

            <AlertDialog open={!!memberToDelete} onOpenChange={(isOpen) => !isOpen && setMemberToDelete(null)}>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
                    <AlertDialogDescription>
                    Cette action est irréversible. Le membre
                    <span className="font-semibold"> {memberToDelete?.name} </span> 
                    sera définitivement supprimé.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
                    Supprimer
                    </AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
