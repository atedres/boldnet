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
import { Input } from '@/components/ui/input';
import { useState, useMemo } from 'react';
import { Loader2, MailCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, addDocumentNonBlocking, useMemoFirebase } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';

export default function NewsletterSection({ content }: { content: any }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const newsletterSubmissionsCollection = useMemoFirebase(
    () => collection(firestore, 'newsletter_subscriptions'),
    [firestore]
  );

  const formSchema = useMemo(() => z.object({
    email: z.string().email({
      message: "Veuillez saisir une adresse e-mail valide.",
    }),
  }), []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await addDocumentNonBlocking(newsletterSubmissionsCollection, {
        ...values,
        subscribedAt: serverTimestamp(),
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Oh oh ! Quelque chose s'est mal passé.",
        description: "Un problème est survenu avec votre inscription. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <section id="newsletter" className="w-full py-12 md:py-24 lg:py-32 bg-transparent text-white">
        <div className="container text-center">
            <div className="mx-auto max-w-md space-y-4">
              <MailCheck className="mx-auto h-16 w-16 text-primary" />
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                Inscription réussie !
              </h2>
              <p className="text-white/80">
                Merci ! Vous êtes maintenant inscrit(e) à notre newsletter.
              </p>
            </div>
        </div>
      </section>
    );
  }

  return (
    <section id="newsletter" className="w-full py-12 md:py-24 lg:py-32 bg-transparent text-white">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl/tight font-headline">
            {content.title || 'Rejoignez notre newsletter'}
          </h2>
          <p className="mx-auto max-w-[600px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {content.subtitle || "Soyez au courant de nos offres, des actualités du digital, etc."}
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="votreemail@email.com" {...field} className="text-black" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-white text-red-600 hover:bg-white/90" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "S'abonner"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}

    