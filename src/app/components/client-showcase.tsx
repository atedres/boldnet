'use client';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Building, Factory, Globe, Network, Ship, Store } from 'lucide-react';
import { useLanguage } from '@/app/context/language-context';
import Autoplay from 'embla-carousel-autoplay';

const clients = [
  { name: 'QuantumCore', icon: Building },
  { name: 'StellarWorks', icon: Factory },
  { name: 'ApexIndustries', icon: Store },
  { name: 'NexusSolutions', icon: Ship },
  { name: 'ZenithEnterprises', icon: Globe },
  { name: 'FusionGroup', icon: Network },
  { name: 'PioneerTech', icon: Building },
  { name: 'SynergyCorp', icon: Factory },
];

export default function ClientShowcase() {
  const { t } = useLanguage();
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <section className="w-full bg-card py-12 md:py-24">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2 font-headline">
          {t('trustedBy')}
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {t('clientShowcaseDescription')}
        </p>
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
              <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
                <div className="p-1">
                  <div className="flex aspect-square items-center justify-center p-6 flex-col gap-2 bg-background rounded-lg">
                    <client.icon className="h-12 w-12 text-muted-foreground" />
                    <span className="text-sm font-semibold text-muted-foreground">
                      {client.name}
                    </span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
