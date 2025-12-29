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
    <section id="funnel" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-foreground">
              {t('highPerformanceFunnel')}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
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
              className="flex items-start gap-6 p-6 rounded-lg border border-border bg-card text-card-foreground animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s`, opacity: 0 }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-muted border-2 border-border flex items-center justify-center">
                 {step.iconName ? (
                    <DynamicIcon iconName={step.iconName || 'HelpCircle'} className="h-6 w-6 text-muted-foreground" />
                 ) : (
                    <span className="text-xl font-bold text-primary">{step.order}</span>
                 )}
              </div>
              <div>
                <h3 className="text-xl font-bold font-headline">{step.name}</h3>
                <p className="text-muted-foreground mt-2">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
