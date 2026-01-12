'use client';

import { useLanguage } from '@/app/context/language-context';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import Image from 'next/image';
import { DynamicIcon } from '@/components/ui/dynamic-icon';

export default function FunnelDisplay() {
  const { t } = useLanguage();
  const firestore = useFirestore();

  const funnelStepsCollection = useMemoFirebase(
    () => query(collection(firestore, 'funnel_steps'), orderBy('order')),
    [firestore]
  );
  const { data: funnelSteps, isLoading: isLoadingSteps } = useCollection(funnelStepsCollection);
  
  const sortedSteps = funnelSteps;

  return (
    <section id="funnel" className="w-full py-12 md:py-24 lg:py-32 bg-transparent">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl font-headline text-white">
              {t('highPerformanceFunnel')}
            </h2>
            <p className="max-w-[900px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t('funnelDescription')}
            </p>
          </div>
        </div>
        <div className="relative mt-12 grid max-w-5xl mx-auto gap-8 md:grid-cols-2">
            {isLoadingSteps && (
              <>
                <div className="p-6 rounded-lg border">Loading...</div>
                <div className="p-6 rounded-lg border">Loading...</div>
              </>
            )}
           {sortedSteps?.map((step, index) => (
            <div 
              key={step.id} 
              className="relative flex items-start gap-6 p-6 rounded-lg border bg-card/10 text-white backdrop-blur-sm overflow-hidden shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                 {step.iconUrl ? (
                    <Image src={step.iconUrl} alt={t(step.name)} width={24} height={24} className="h-6 w-6 object-contain" />
                 ) : step.iconName ? (
                    <DynamicIcon iconName={step.iconName} className="h-6 w-6 text-primary" />
                 ) : (
                    <span className="text-xl font-bold text-primary">{step.order}</span>
                 )}
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold font-headline">{t(step.name)}</h3>
                <p className="text-white/80 mt-2">{t(step.description)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
