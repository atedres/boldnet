'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLanguage } from '@/app/context/language-context';

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="container grid place-content-center gap-6 pb-8 pt-6 md:py-10 text-center">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl font-headline">
          {t('amplifyYourBrand')}
          <br />
          <span className="text-primary">{t('dominateTheMarket')}</span>
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg text-muted-foreground">
          {t('heroDescription')}
        </p>
      </div>
      <div className="flex justify-center gap-4">
        <Button asChild size="lg">
          <Link href="#contact">{t('getStarted')}</Link>
        </Button>
      </div>
    </section>
  );
}
