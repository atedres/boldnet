'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLanguage } from '@/app/context/language-context';
import { Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { cn } from '@/lib/utils';


export default function Hero() {
  const { t } = useLanguage();
  const firestore = useFirestore();
  const servicesCollection = useMemoFirebase(
    () => collection(firestore, 'services'),
    [firestore]
  );
  const { data: services } = useCollection(servicesCollection);

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


  return (
    <section className="container flex flex-col items-center justify-center gap-6 pb-12 pt-16 md:py-24 text-center">
      <div className="flex items-center gap-2 bg-muted px-4 py-1.5 rounded-full text-sm font-medium">
        <Zap className="h-4 w-4 text-primary" />
        <span>{t('tagline')}</span>
      </div>
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-7xl font-headline">
          {t('heroTitleLine1')}
          <br />
          {t('heroTitleLine2')}
        </h1>
        <div className="mt-6 inline-block h-16">
            <div className={cn(
                "bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold rounded-full px-8 py-3 text-2xl -rotate-3 transition-opacity duration-500",
                isFading ? "opacity-0" : "opacity-100"
              )}>
                {displayedService}
            </div>
        </div>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          <span dangerouslySetInnerHTML={{ __html: t('heroDescription') }} />
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <Button asChild size="lg" className="rounded-full bg-gray-900 text-white hover:bg-gray-800">
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
