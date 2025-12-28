'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useLanguage } from '@/app/context/language-context';

export default function ServicesOverview() {
  const { t } = useLanguage();
  const services = [
    {
      title: t('ugcVideos'),
      description: t('ugcVideosDescription'),
    },
    {
      title: t('websiteLandingPages'),
      description: t('websiteLandingPagesDescription'),
    },
    {
      title: t('professionalPostDesign'),
      description: t('professionalPostDesignDescription'),
    },
    {
      title: t('adsAdvertising'),
      description: t('adsAdvertisingDescription'),
    },
  ];
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
              {t('ourServices')}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t('servicesDescription')}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-2 mt-12">
          {services.map((service, index) => (
            <Card key={index} className="h-full bg-card border-border/60 hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-start gap-4">
                 <div className="text-4xl font-bold text-primary">0{index + 1}</div>
                <div>
                    <CardTitle className="mt-0">{service.title}</CardTitle>
                    <CardDescription className="mt-2">{service.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
