'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLanguage } from '@/app/context/language-context';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  const { t } = useLanguage();

  const title = "10× Your Profits in the next 6 Months with BoldNetDigital";
  const subtitle = "More Leads. More Sales. Real Growth.";
  const description = "We build marketing systems that generate qualified leads, convert them and help scale without limits.";
  const ctaText = "Get Started";

  return (
    <section className="relative bg-gradient-to-br from-[#1a052a] via-[#10031c] to-black text-white">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center min-h-screen px-4 md:px-6 pt-24 pb-12">
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-headline leading-tight tracking-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
            {subtitle}
          </p>
          <p className="text-lg text-muted-foreground/80 max-w-xl mx-auto lg:mx-0">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg">
              <Link href="#contact">{ctaText} <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
        <div className="relative w-full h-80 lg:h-full flex items-center justify-center">
            <Image 
                src="https://picsum.photos/seed/app-showcase/600/500"
                alt="App Showcase"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl shadow-primary/20 object-cover"
                data-ai-hint="app interface"
            />
        </div>
      </div>
    </section>
  );
}
