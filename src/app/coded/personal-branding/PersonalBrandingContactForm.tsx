'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState, useMemo } from 'react';
import { Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, addDocumentNonBlocking, useMemoFirebase } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';

const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit comporter au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez saisir une adresse e-mail valide." }),
  phone: z.string().optional(),
  domain: z.string().min(2, { message: "Le domaine doit comporter au moins 2 caractères." }),
  need: z.string().min(10, { message: "Le besoin doit comporter au moins 10 caractères." }),
});

export function PersonalBrandingContactForm({ onOpenChange }: { onOpenChange: (isOpen: boolean) => void }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const contactFormSubmissionsCollection = useMemoFirebase(
    () => collection(firestore, 'contact_form_submissions'),
    [firestore]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      domain: '',
      need: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await addDocumentNonBlocking(contactFormSubmissionsCollection, {
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: `Domaine: ${values.domain}\n\nBesoin: ${values.need}`,
        submittedAt: serverTimestamp(),
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Oh oh ! Quelque chose s'est mal passé.",
        description: "Un problème est survenu avec votre demande. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {isSubmitted ? (
           <div className="text-center p-8">
              <Send className="mx-auto h-16 w-16 text-primary" />
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl font-headline mt-4">
                Merci !
              </h2>
              <p className="text-muted-foreground mt-2">
                Votre demande a bien été envoyée. Nous vous recontacterons dans les plus brefs délais.
              </p>
              <Button onClick={() => onOpenChange(false)} className="mt-6">Fermer</Button>
            </div>
        ) : (
            <>
            <DialogHeader>
              <DialogTitle className="font-headline tracking-tight text-3xl">Demande de consultation</DialogTitle>
              <DialogDescription>
                Remplissez ce formulaire pour obtenir votre consultation gratuite et découvrir comment nous pouvons vous aider.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                   <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>Nom complet</FormLabel><FormControl><Input placeholder="Samir berrada" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="votreemail@email.com" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel>Téléphone (Optionnel)</FormLabel><FormControl><Input placeholder="ex: 06 12 34 56 78" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="domain" render={({ field }) => (
                        <FormItem><FormLabel>Votre domaine d'activité</FormLabel><FormControl><Input placeholder="ex: Coaching, Immobilier, Dentiste..." {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="need" render={({ field }) => (
                        <FormItem><FormLabel>Votre besoin</FormLabel><FormControl><Textarea placeholder="Décrivez brièvement ce que vous cherchez à accomplir..." {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Envoi...
                      </>
                    ) : (
                      "Envoyer ma demande"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
            </>
        )}
      </DialogContent>
    </Dialog>
  );
}
