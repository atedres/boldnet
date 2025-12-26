'use client';

import {
  Globe,
  MousePointerClick,
  PlayCircle,
  TrendingUp,
} from 'lucide-react';
import { useLanguage } from '@/app/context/language-context';

export default function FunnelDisplay() {
  const { t } = useLanguage();
  const funnelSteps = [
    {
      icon: Globe,
      title: t('onlinePresence'),
      description:
        t('onlinePresenceDescription'),
    },
    {
      icon: PlayCircle,
      title: t('engagingVideos'),
      description:
        t('engagingVideosDescription'),
    },
    {
      icon: TrendingUp,
      title: t('strategicAdvertising'),
      description:
        t('strategicAdvertisingDescription'),
    },
    {
      icon: MousePointerClick,
      title: t('conversionFocusedWeb'),
      description:
        t('conversionFocusedWebDescription'),
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
              {t('highPerformanceFunnel')}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t('funnelDescription')}
            </p>
          </div>
        </div>
        <div className="relative mt-12 max-w-3xl mx-auto">
          <div className="absolute left-1/2 -translate-x-1/2 md:left-9 top-0 h-full w-0.5 bg-border -z-10" aria-hidden="true"></div>
          {funnelSteps.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-6 md:gap-8 mb-12 flex-col md:flex-row text-center md:text-left"
            >
              <div className="flex-shrink-0 w-20 h-20 rounded-full bg-card border-4 border-primary flex items-center justify-center mx-auto md:mx-0">
                <step.icon className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-headline">{step.title}</h3>
                <p className="text-muted-foreground mt-2">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
