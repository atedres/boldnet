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
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useMemo } from 'react';
import { Loader2, ArrowRight, ArrowLeft, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/app/context/language-context';
import { useFirestore, addDocumentNonBlocking, useMemoFirebase } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';
import { Progress } from '@/components/ui/progress';

const QuoteForm = () => {
    const { t } = useLanguage();
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const firestore = useFirestore();

    const quoteRequestsCollection = useMemoFirebase(
        () => collection(firestore, 'quote_requests'),
        [firestore]
    );

    const formSchema = useMemo(() => z.object({
        serviceNeeded: z.string().min(1, { message: t('fieldRequired') }),
        industry: z.string().min(1, { message: t('fieldRequired') }),
        businessSize: z.string().min(1, { message: t('fieldRequired') }),
        timeline: z.string().min(1, { message: t('fieldRequired') }),
        budget: z.string().min(1, { message: t('fieldRequired') }),
        contactName: z.string().min(2, { message: t('nameMinLength') }),
        businessName: z.string().min(2, { message: t('businessNameMinLength') }),
        email: z.string().email({ message: t('invalidEmail') }),
        phone: z.string().optional(),
      }), [t]);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            serviceNeeded: '',
            industry: '',
            businessSize: '',
            timeline: '',
            budget: '',
            contactName: '',
            businessName: '',
            email: '',
            phone: '',
        },
    });

    const nextStep = async () => {
        const fieldsToValidate: (keyof z.infer<typeof formSchema>)[] = currentStep === 0 
            ? ['serviceNeeded', 'industry', 'businessSize', 'timeline', 'budget']
            : ['contactName', 'businessName', 'email'];
        
        const isValid = await form.trigger(fieldsToValidate);
        if (isValid) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => prev - 1);
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            await addDocumentNonBlocking(quoteRequestsCollection, {
                ...values,
                submittedAt: serverTimestamp(),
            });
            setIsSubmitted(true);
        } catch (error) {
            console.error("Error submitting form:", error);
            toast({
                variant: "destructive",
                title: t('submissionErrorTitle'),
                description: t('submissionErrorMessage'),
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    const steps = [
        {
            title: t('quoteStep1Title'),
            description: t('quoteStep1Description'),
            fields: ['serviceNeeded', 'industry', 'businessSize', 'timeline', 'budget']
        },
        {
            title: t('quoteStep2Title'),
            description: t('quoteStep2Description'),
            fields: ['contactName', 'businessName', 'email', 'phone']
        }
    ];

    if (isSubmitted) {
        return (
          <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container text-center">
                <div className="mx-auto max-w-md space-y-4">
                  <Send className="mx-auto h-16 w-16 text-primary" />
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                    {t('quoteSuccessTitle')}
                  </h2>
                  <p className="text-muted-foreground">
                    {t('quoteSuccessMessage')}
                  </p>
                </div>
            </div>
          </section>
        );
      }


    return (
        <div className="container max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline tracking-tight text-3xl">{steps[currentStep].title}</CardTitle>
                    <CardDescription>{steps[currentStep].description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Progress value={(currentStep + 1) / steps.length * 100} className="mb-8" />
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {currentStep === 0 && (
                                <>
                                <FormField control={form.control} name="serviceNeeded" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('serviceNeeded')}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder={t('selectPlaceholder')} /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                <SelectItem value="website_landing_pages">{t('websiteLandingPages')}</SelectItem>
                                                <SelectItem value="ugc_videos">{t('ugcVideos')}</SelectItem>
                                                <SelectItem value="post_design">{t('professionalPostDesign')}</SelectItem>
                                                <SelectItem value="ads_advertising">{t('adsAdvertising')}</SelectItem>
                                                <SelectItem value="automation_ai">{t('automationAI')}</SelectItem>
                                                <SelectItem value="other">{t('other')}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="industry" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('industry')}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder={t('selectPlaceholder')} /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                <SelectItem value="ecommerce">{t('industry_ecommerce')}</SelectItem>
                                                <SelectItem value="real_estate">{t('industry_real_estate')}</SelectItem>
                                                <SelectItem value="health_wellness">{t('industry_health_wellness')}</SelectItem>
                                                <SelectItem value="tech_saas">{t('industry_tech_saas')}</SelectItem>
                                                <SelectItem value="local_business">{t('industry_local_business')}</SelectItem>
                                                <SelectItem value="other">{t('other')}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                 <FormField control={form.control} name="businessSize" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('businessSize')}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder={t('selectPlaceholder')} /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                <SelectItem value="solo">{t('businessSize_solo')}</SelectItem>
                                                <SelectItem value="2_10">{t('businessSize_2_10')}</SelectItem>
                                                <SelectItem value="11_50">{t('businessSize_11_50')}</SelectItem>
                                                <SelectItem value="50_plus">{t('businessSize_50_plus')}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="timeline" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('timeline')}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder={t('selectPlaceholder')} /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                <SelectItem value="urgent">{t('timeline_urgent')}</SelectItem>
                                                <SelectItem value="2_4_weeks">{t('timeline_2_4_weeks')}</SelectItem>
                                                <SelectItem value="1_3_months">{t('timeline_1_3_months')}</SelectItem>
                                                <SelectItem value="flexible">{t('timeline_flexible')}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="budget" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('budget')}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder={t('selectPlaceholder')} /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                <SelectItem value="under_500">{"< 500€"}</SelectItem>
                                                <SelectItem value="500_2000">{"500€ - 2,000€"}</SelectItem>
                                                <SelectItem value="2000_5000">{"2,000€ - 5,000€"}</SelectItem>
                                                <SelectItem value="5000_plus">{"> 5,000€"}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                </>
                            )}
                            {currentStep === 1 && (
                                <>
                                <FormField control={form.control} name="contactName" render={({ field }) => (
                                    <FormItem><FormLabel>{t('contactName')}</FormLabel><FormControl><Input placeholder={t('contactNamePlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="businessName" render={({ field }) => (
                                    <FormItem><FormLabel>{t('businessName')}</FormLabel><FormControl><Input placeholder={t('businessNamePlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem><FormLabel>{t('email')}</FormLabel><FormControl><Input placeholder={t('yourEmail')} {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="phone" render={({ field }) => (
                                    <FormItem><FormLabel>{t('phone')} ({t('optional')})</FormLabel><FormControl><Input placeholder="+33 6 12 34 56 78" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                </>
                            )}
                            <div className="flex justify-between pt-4">
                                {currentStep > 0 && <Button type="button" variant="outline" onClick={prevStep}><ArrowLeft className="mr-2 h-4 w-4" />{t('previous')}</Button>}
                                <div />
                                {currentStep < steps.length - 1 && <Button type="button" onClick={nextStep}>{t('next')}<ArrowRight className="ml-2 h-4 w-4" /></Button>}
                                {currentStep === steps.length - 1 && <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t('sending')}</> : <>{t('submitQuote')}<Send className="ml-2 h-4 w-4" /></>}
                                </Button>}
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default QuoteForm;
