'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Clapperboard,
  LayoutTemplate,
  Megaphone,
  PenTool,
} from 'lucide-react';
import { useLanguage } from '@/app/context/language-context';


export default function ServicesOverview() {
  const { t } = useLanguage();
  const services = [
    {
      icon: Clapperboard,
      title: t('ugcVideos'),
      description: t('ugcVideosDescription'),
    },
    {
      icon: LayoutTemplate,
      title: t('websiteLandingPages'),
      description: t('websiteLandingPagesDescription'),
    },
    {
      icon: PenTool,
      title: t('professionalPostDesign'),
      description: t('professionalPostDesignDescription'),
    },
    {
      icon: Megaphone,
      title: t('adsAdvertising'),
      description: t('adsAdvertisingDescription'),
    },
  ];
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
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
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
          {services.map((service, index) => (
            <Card key={index} className="h-full">
              <CardHeader className="items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
