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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Star, StarHalf, Trash2, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ImageUpload } from '@/components/ui/image-upload';
import Image from 'next/image';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => {
          const ratingValue = i + 1;
          return (
            <Star
              key={i}
              className={`h-4 w-4 ${
                ratingValue <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              }`}
            />
          );
        })}
      </div>
    );
  };

function TestimonialForm({ testimonialToEdit, onComplete }: { testimonialToEdit?: any, onComplete: () => void }) {
  const [name, setName] = useState(testimonialToEdit?.name || '');
  const [review, setReview] = useState(testimonialToEdit?.review || '');
  const [rating, setRating] = useState<number>(testimonialToEdit?.rating || 5);
  const [avatarUrl, setAvatarUrl] = useState(testimonialToEdit?.avatarUrl || '');
  const [source, setSource] = useState(testimonialToEdit?.source || 'Manual');
  const [position, setPosition] = useState(testimonialToEdit?.position || '');

  const firestore = useFirestore();
  const { toast } = useToast();

  const testimonialsCollection = useMemoFirebase(
    () => collection(firestore, 'testimonials'),
    [firestore]
  );

  const handleAction = async () => {
    if (!name || !review || !avatarUrl) {
      toast({
        variant: 'destructive',
        title: 'Informations manquantes',
        description: 'Veuillez fournir un nom, un avis et une image d\'avatar.',
      });
      return;
    }

    const testimonialData = { name, review, rating, avatarUrl, source, position };

    if (testimonialToEdit) {
      const docRef = doc(firestore, 'testimonials', testimonialToEdit.id);
      await updateDoc(docRef, testimonialData);
      toast({ title: 'Témoignage mis à jour', description: `L'avis de ${name} a été mis à jour.` });
    } else {
      await addDocumentNonBlocking(testimonialsCollection, testimonialData);
      toast({ title: 'Témoignage ajouté', description: `L'avis de ${name} a été ajouté.` });
    }
    
    onComplete();
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{testimonialToEdit ? 'Modifier le Témoignage' : 'Ajouter un Témoignage'}</CardTitle>
        <CardDescription>
          {testimonialToEdit ? 'Mettez à jour les détails de ce témoignage.' : "Ajoutez un nouvel avis client."}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <ImageUpload 
            label="Avatar du client"
            value={avatarUrl}
            onChange={setAvatarUrl}
            cropShape="round"
            aspectRatio={1}
        />
        <div className="grid gap-2">
          <Label htmlFor="name">Nom du client</Label>
          <Input
            id="name"
            placeholder="Jean Dupont"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
         <div className="grid gap-2">
          <Label htmlFor="position">Position (ex: CEO)</Label>
          <Input
            id="position"
            placeholder="CEO, Fondateur..."
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="review">Avis</Label>
          <Textarea
            id="review"
            placeholder="C'était une expérience incroyable..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label>Note</Label>
          <RadioGroup value={String(rating)} onValueChange={(val) => setRating(Number(val))} className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map(val => (
                <div key={val} className="flex items-center space-x-2">
                     <RadioGroupItem value={String(val)} id={`r-${val}`} />
                     <Label htmlFor={`r-${val}`} className="flex items-center gap-1">{val} <Star className="w-4 h-4 text-yellow-400" /></Label>
                </div>
            ))}
          </RadioGroup>
        </div>
        <div className="grid grid-cols-1 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="source">Source (ex: Google)</Label>
                <Input id="source" value={source} onChange={e => setSource(e.target.value)} />
            </div>
        </div>

      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onComplete}>Annuler</Button>
        <Button onClick={handleAction}>
          {testimonialToEdit ? 'Mettre à jour' : 'Ajouter'}
        </Button>
      </CardFooter>
    </Card>
  );
}


export default function TestimonialManagement() {
    const firestore = useFirestore();
    const { toast } = useToast();
    const [editingTestimonial, setEditingTestimonial] = useState<any | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [testimonialToDelete, setTestimonialToDelete] = useState<{id: string; name: string} | null>(null);

    const testimonialsCollection = useMemoFirebase(
        () => collection(firestore, 'testimonials'),
        [firestore]
    );

    const { data: testimonials, isLoading: isLoadingTestimonials } = useCollection(testimonialsCollection);
    
    const confirmDelete = async () => {
        if (!testimonialToDelete) return;
        try {
          await deleteDoc(doc(firestore, 'testimonials', testimonialToDelete.id));
          toast({ title: 'Témoignage supprimé', description: `L'avis de "${testimonialToDelete.name}" a été supprimé.` });
        } catch (error) {
          toast({ variant: 'destructive', title: 'Erreur', description: 'Impossible de supprimer le témoignage.' });
          console.error("Error deleting testimonial:", error);
        } finally {
          setTestimonialToDelete(null);
        }
    };

    const handleEdit = (testimonial: any) => {
        setEditingTestimonial(testimonial);
        setIsFormVisible(true);
    };
    
    const handleAddNew = () => {
        setEditingTestimonial(null);
        setIsFormVisible(true);
    }

    const handleFormComplete = () => {
        setEditingTestimonial(null);
        setIsFormVisible(false);
    };


    return (
        <>
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
                {isFormVisible ? (
                    <TestimonialForm testimonialToEdit={editingTestimonial} onComplete={handleFormComplete} />
                ) : (
                    <Card className="w-full">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Gérer les Témoignages</CardTitle>
                                <CardDescription>
                                    Ajoutez, modifiez ou supprimez les avis de vos clients.
                                </CardDescription>
                            </div>
                            <Button onClick={handleAddNew}>Ajouter un avis</Button>
                        </CardHeader>
                        <CardContent>
                             {isLoadingTestimonials && <p className="text-center">Chargement des témoignages...</p>}
                             {!isLoadingTestimonials && testimonials && testimonials.length === 0 && <p className="text-center text-muted-foreground py-8">Aucun témoignage ajouté pour le moment.</p>}
                             {!isLoadingTestimonials && testimonials && testimonials.length > 0 && (
                                 <Table>
                                     <TableHeader>
                                         <TableRow>
                                             <TableHead className="w-[80px]">Avatar</TableHead>
                                             <TableHead>Nom</TableHead>
                                             <TableHead>Position</TableHead>
                                             <TableHead>Note</TableHead>
                                             <TableHead>Avis</TableHead>
                                             <TableHead className="text-right">Actions</TableHead>
                                         </TableRow>
                                     </TableHeader>
                                     <TableBody>
                                        {testimonials.map((testimonial) => (
                                            <TableRow key={testimonial.id}>
                                                <TableCell>
                                                    <Image src={testimonial.avatarUrl} alt={testimonial.name} width={40} height={40} className="rounded-full object-cover" />
                                                </TableCell>
                                                <TableCell className="font-medium">{testimonial.name}</TableCell>
                                                <TableCell className="text-muted-foreground">{testimonial.position}</TableCell>
                                                <TableCell>
                                                    <StarRating rating={testimonial.rating} />
                                                </TableCell>
                                                <TableCell className="text-muted-foreground max-w-xs truncate">
                                                  {testimonial.review}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(testimonial)}>
                                                        <Edit className="h-4 w-4" />
                                                        <span className="sr-only">Modifier</span>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => setTestimonialToDelete({id: testimonial.id, name: testimonial.name})}>
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Supprimer</span>
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

            <AlertDialog open={!!testimonialToDelete} onOpenChange={(isOpen) => !isOpen && setTestimonialToDelete(null)}>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
                    <AlertDialogDescription>
                    Cette action est irréversible. Le témoignage de
                    <span className="font-semibold"> {testimonialToDelete?.name} </span> 
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
