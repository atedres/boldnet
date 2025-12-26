'use client';
import React, { useMemo } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useLanguage } from '@/app/context/language-context';
import Autoplay from 'embla-carousel-autoplay';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import Image from 'next/image';

export default function ClientShowcase() {
  const { t } = useLanguage();
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const firestore = useFirestore();
  const clientsCollection = useMemoFirebase(
    () => collection(firestore, 'clients'),
    [firestore]
  );
  const { data: clients, isLoading } = useCollection(clientsCollection);

  return (
    <section className="w-full bg-card py-12 md:py-24">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2 font-headline">
          {t('trustedBy')}
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {t('clientShowcaseDescription')}
        </p>
        {isLoading && (
          <div className="text-center">Loading clients...</div>
        )}
        {clients && clients.length > 0 && (
          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {clients.map((client, index) => (
                <CarouselItem
                  key={client.id || index}
                  className="md:basis-1/3 lg:basis-1/5"
                >
                  <div className="p-1">
                    <a href={client.websiteUrl} target="_blank" rel="noopener noreferrer" className="block">
                      <div className="flex aspect-square items-center justify-center p-6 flex-col gap-2 bg-background rounded-lg transition-transform hover:scale-105">
                        <Image
                          src={client.logoUrl}
                          alt={`${client.name} logo`}
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                        <span className="text-sm font-semibold text-muted-foreground text-center">
                          {client.name}
                        </span>
                      </div>
                    </a>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        )}
      </div>
    </section>
  );
}
