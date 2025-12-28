'use client';

import { useLanguage } from '@/app/context/language-context';

export default function FunnelDisplay() {
  const { t } = useLanguage();
  const funnelSteps = [
    {
      title: t('onlinePresence'),
      description: t('onlinePresenceDescription'),
    },
    {
      title: t('engagingVideos'),
      description: t('engagingVideosDescription'),
    },
    {
      title: t('strategicAdvertising'),
      description: t('strategicAdvertisingDescription'),
    },
    {
      title: t('conversionFocusedWeb'),
      description: t('conversionFocusedWebDescription'),
    },
  ];

  return (
    <section id="funnel" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
              {t('highPerformanceFunnel')}
            </h2>
            <p className="max-w-[900px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t('funnelDescription')}
            </p>
          </div>
        </div>
        <div className="relative mt-12 grid max-w-5xl mx-auto gap-8 md:grid-cols-2">
           {funnelSteps.map((step, index) => (
            <div key={index} className="flex items-start gap-6 p-6 rounded-lg border border-primary-foreground/20 bg-primary-foreground/10">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-foreground/10 border-2 border-primary-foreground/50 flex items-center justify-center">
                 <span className="text-xl font-bold text-primary-foreground">{index + 1}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold font-headline">{step.title}</h3>
                <p className="text-primary-foreground/80 mt-2">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
