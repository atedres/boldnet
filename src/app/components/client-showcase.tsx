'use client';
import React, { useMemo } from 'react';
import { useLanguage } from '@/app/context/language-context';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import Image from 'next/image';

export default function ClientShowcase() {
  const { t } = useLanguage();
  const firestore = useFirestore();

  const clientsCollection = useMemoFirebase(
    () => collection(firestore, 'clients'),
    [firestore]
  );
  const { data: clients, isLoading: isLoadingClients } = useCollection(clientsCollection);

  const duplicatedClients = useMemo(() => {
    if (!clients) return [];
    // Duplicate the clients to ensure a seamless loop
    return [...clients, ...clients, ...clients, ...clients];
  }, [clients]);

  return (
    <section id="clients" className="w-full bg-transparent py-12 md:py-24">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2 font-headline tracking-tight text-white">
          {t('trustedBy')}
        </h2>
        <p className="text-center text-white/80 mb-12 max-w-2xl mx-auto">
          {t('clientShowcaseDescription')}
        </p>
        {isLoadingClients && (
          <div className="text-center text-white">Loading clients...</div>
        )}
        {clients && clients.length > 0 && (
          <div className="relative marquee-container">
            <div className="marquee">
              <div className="marquee-content">
                {duplicatedClients.map((client, index) => (
                  <div key={`${client.id}-${index}`} className="flex-shrink-0" style={{ width: '160px' }}>
                    <div className="flex aspect-square items-center justify-center p-6 flex-col gap-2 rounded-lg">
                      <Image
                        src={client.logoUrl}
                        alt={`${client.name} logo`}
                        width={100}
                        height={100}
                        className="object-contain grayscale hover:grayscale-0 transition-all brightness-0 invert"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
