'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLanguage } from '@/app/context/language-context';
import { Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCollection, useFirestore, useMemoFirebase, useDoc } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { cn } from '@/lib/utils';
import Image from 'next/image';


export default function Hero() {
  const { t } = useLanguage();
  const firestore = useFirestore();
  const servicesCollection = useMemoFirebase(
    () => collection(firestore, 'services'),
    [firestore]
  );
  const settingsDocRef = useMemoFirebase(() => doc(firestore, 'site_settings', 'main'), [firestore]);

  const { data: services } = useCollection(servicesCollection);
  const { data: heroSettings, isLoading: isLoadingSettings } = useDoc(settingsDocRef);


  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (services && services.length > 0) {
      const interval = setInterval(() => {
        setIsFading(true);
        setTimeout(() => {
          setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % services.length);
          setIsFading(false);
        }, 500); // fade-out duration
      }, 2500); // 2s display + 0.5s fade

      return () => clearInterval(interval);
    }
  }, [services]);

  const displayedService = services && services.length > 0 ? services[currentServiceIndex].name : t('heroSubtitle');

  const content = {
      tagline: heroSettings?.heroContent?.tagline || t('tagline'),
      title1: heroSettings?.heroContent?.title1 || t('heroTitleLine1'),
      title2: heroSettings?.heroContent?.title2 || t('heroTitleLine2'),
      description: heroSettings?.heroContent?.description || t('heroDescription'),
      imageUrl: heroSettings?.heroContent?.imageUrl,
  }

  if (isLoadingSettings) {
      return (
        <section className="container flex flex-col items-center justify-center gap-6 pb-12 pt-16 md:py-24 text-center">
            <div className="h-8 w-48 bg-muted rounded-full animate-pulse"></div>
            <div className="mx-auto max-w-5xl space-y-4">
                <div className="h-12 md:h-20 w-full bg-muted rounded-md animate-pulse"></div>
                <div className="h-12 md:h-20 w-3/4 mx-auto bg-muted rounded-md animate-pulse"></div>
            </div>
             <div className="h-16 w-64 bg-muted rounded-full animate-pulse mt-6"></div>
             <div className="h-7 w-full max-w-lg bg-muted rounded-md animate-pulse mt-6"></div>
        </section>
      )
  }

  return (
    <section className="relative container flex flex-col items-center justify-center gap-6 pb-12 pt-16 md:py-24 text-center isolate">
      {content.imageUrl && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={content.imageUrl}
            alt="Hero background"
            fill
            className="object-cover opacity-20"
            data-ai-hint="abstract background"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
      )}

      <div className="flex items-center gap-2 bg-muted px-4 py-1.5 rounded-full text-sm font-medium">
        <Zap className="h-4 w-4 text-primary" />
        <span>{content.tagline}</span>
      </div>
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-7xl font-headline">
          {content.title1}
          <br />
          {content.title2}
        </h1>
        <div className="mt-6 inline-block h-16">
            <div className={cn(
                "bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold rounded-full px-8 py-3 text-2xl transition-opacity duration-500",
                isFading ? "opacity-0" : "opacity-100"
              )}>
                {displayedService}
            </div>
        </div>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          <span dangerouslySetInnerHTML={{ __html: content.description }} />
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <Button asChild size="lg" className="rounded-full">
          <Link href="#contact">{t('startProject')}</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="rounded-full">
          <Link href="#clients">{t('seeRealizations')}</Link>
        </Button>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-6 mt-8 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
            <span className="font-bold text-blue-600 bg-blue-100 p-1 rounded">C</span>
            <span>{t('reviewSource1')}</span>
        </div>
        <div className="flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/><path d="M12 4v2"/><path d="M12 20v-2"/><path d="m4 12 2 0"/><path d="m20 12-2 0"/><path d="m6.34 6.34 1.416 1.414"/><path d="m17.66 17.66-1.414-1.414"/><path d="m17.66 6.34-1.414 1.414"/><path d="m6.34 17.66 1.414-1.414"/></svg>
            <span>{t('reviewSource2')}</span>
        </div>
      </div>
    </section>
  );
}
