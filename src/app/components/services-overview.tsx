'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { useLanguage } from '@/app/context/language-context';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';

export default function ServicesOverview() {
  const { t } = useLanguage();
  const firestore = useFirestore();
  const servicesCollection = useMemoFirebase(
    () => collection(firestore, 'services'),
    [firestore]
  );
  const { data: services, isLoading } = useCollection(servicesCollection);

  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
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
           {isLoading && (
            <>
              <Card className="h-full bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
                <CardHeader><CardTitle>Loading...</CardTitle></CardHeader>
              </Card>
              <Card className="h-full bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
                <CardHeader><CardTitle>Loading...</CardTitle></CardHeader>
              </Card>
            </>
           )}
          {services?.map((service, index) => (
            <Card key={service.id} className="h-full bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:border-primary-foreground/50 transition-colors relative overflow-hidden group">
              <CardHeader>
                <div className="flex flex-col">
                  <CardTitle className="text-xl font-bold font-headline">{service.name}</CardTitle>
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
