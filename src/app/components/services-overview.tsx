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
            <p className="max-w-[900px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t('servicesDescription')}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-2 mt-12">
          {services.map((service, index) => (
            <Card key={index} className="h-full bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:border-primary-foreground/50 transition-colors relative overflow-hidden group">
              <CardHeader>
                <div className="flex flex-col">
                  <CardTitle className="text-xl font-bold font-headline">{service.title}</CardTitle>
                  <CardDescription className="mt-2 text-primary-foreground/80">{service.description}</CardDescription>
                </div>
              </CardHeader>
              <div className="absolute -bottom-4 -right-4 text-8xl font-bold text-primary-foreground/10 group-hover:text-primary-foreground/20 transition-colors">
                0{index + 1}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
