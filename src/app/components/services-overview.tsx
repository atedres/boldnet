'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useLanguage } from '@/app/context/language-context';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code2, Bot } from 'lucide-react';
import Link from 'next/link';
import { useFirestore, useMemoFirebase, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';


const AdIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M16.63,5.87C17.53,4.97 19.03,4.97 19.93,5.87C20.83,6.77 20.83,8.27 19.93,9.17L18.5,10.6L13.4,5.5L14.83,4.07C15.73,3.17 17.23,3.17 18.13,4.07L16.63,5.87M2.25,18.53L4.18,20.45L12.72,11.9L10.8,9.98L2.25,18.53M9.4,11.4L12,14L6.03,20H4V17.97L9.4,11.4Z" />
    </svg>
);

const serviceData = [
  {
    icon: <Code2 />,
    titleKey: 'websiteLandingPages',
    descriptionKey: 'websiteLandingPagesDescription',
    featuresKeys: [
      'featureWeb1',
      'featureWeb2',
      'featureWeb3',
      'featureWeb4',
    ],
  },
  {
    icon: <AdIcon />,
    titleKey: 'adsAdvertising',
    descriptionKey: 'adsAdvertisingDescription',
    featuresKeys: [
      'featureAds1',
      'featureAds2',
      'featureAds3',
      'featureAds4',
    ],
  },
  {
    icon: <Bot />,
    titleKey: 'automationAI',
    descriptionKey: 'automationAIDescription',
    featuresKeys: [
        'featureAuto1',
        'featureAuto2',
        'featureAuto3',
        'featureAuto4',
        'featureAuto5'
    ]
  },
];


export default function ServicesOverview() {
  const { t } = useLanguage();
  const firestore = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(firestore, 'site_settings', 'visibility'), [firestore]);
  const { data: settings, isLoading } = useDoc(settingsRef);

  if (isLoading) {
      return (
          <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-background text-foreground">
              <div className="container px-4 md:px-6 text-center">Loading...</div>
          </section>
      )
  }

  if (settings && settings.showServices === false) {
    return null;
  }
  
  return (
    <section 
        id="services" 
        className="w-full py-12 md:py-24 lg:py-32 bg-background text-foreground"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-foreground">
              {t('ourServices')}
            </h2>
            <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-muted-foreground">
              {t('servicesDescription')}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
            {serviceData.map((service, index) => (
                 <Card key={index} className="bg-card text-card-foreground flex flex-col h-full shadow-lg hover:shadow-2xl transition-all duration-300 group hover:bg-primary hover:text-primary-foreground rounded-xl sm:rounded-2xl md:rounded-3xl">
                    <CardHeader className="items-start gap-4">
                        <div className="bg-gray-900 text-white p-3 rounded-lg group-hover:bg-white group-hover:text-primary transition-colors">
                            {service.icon}
                        </div>
                        <CardTitle className="text-xl font-bold font-headline">{t(service.titleKey)}</CardTitle>
                        <CardDescription className="text-muted-foreground group-hover:text-primary-foreground/80">{t(service.descriptionKey)}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <ul className="space-y-2 text-sm text-muted-foreground group-hover:text-primary-foreground/80">
                            {service.featuresKeys.map((featureKey, fIndex) => (
                                <li key={fIndex} className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary/50 group-hover:bg-primary-foreground"></span>
                                    {t(featureKey)}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter className="flex-col items-stretch gap-4 mt-auto pt-6">
                        <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 group-hover:bg-white group-hover:text-primary transition-colors">
                            <ArrowRight className="mr-2 h-4 w-4" /> Demander un devis
                        </Button>
                        <Button variant="link" className="text-muted-foreground hover:text-primary group-hover:text-primary-foreground/80 group-hover:hover:text-primary-foreground" asChild>
                            <Link href="#">
                                En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
