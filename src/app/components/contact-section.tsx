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
import { Textarea } from '@/components/ui/textarea';
import { useState, useMemo } from 'react';
import { Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/app/context/language-context';

export default function ContactSection() {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const formSchema = useMemo(() => z.object({
    name: z.string().min(2, {
      message: t('nameMinLength'),
    }),
    email: z.string().email({
      message: t('invalidEmail'),
    }),
    message: z.string().min(10, {
      message: t('messageMinLength'),
    }),
  }), [t]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(values);
    
    // Simulate success/error
    const isSuccess = Math.random() > 0.2; // 80% success rate
    
    setIsSubmitting(false);

    if (isSuccess) {
      setIsSubmitted(true);
    } else {
      toast({
        variant: "destructive",
        title: t('submissionErrorTitle'),
        description: t('submissionErrorMessage'),
      });
    }
  }

  if (isSubmitted) {
    return (
      <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container text-center">
            <div className="mx-auto max-w-md space-y-4">
              <Send className="mx-auto h-16 w-16 text-primary" />
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                {t('submissionSuccessTitle')}
              </h2>
              <p className="text-muted-foreground">
                {t('submissionSuccessMessage')}
              </p>
            </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
            {t('letsBuildSomethingBold')}
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {t('contactFormDescription')}
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm lg:max-w-lg space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-left">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('name')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('yourName')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('email')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('yourEmail')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('message')}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t('tellUsAboutProject')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('sending')}
                  </>
                ) : (
                  t('sendMessage')
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
