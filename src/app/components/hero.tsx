'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLanguage } from '@/app/context/language-context';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Hero() {
  const { t } = useLanguage();

  const title = "10× Your Profits in the next 6 Months with BoldNetDigital";
  const subtitle = "More Leads. More Sales. Real Growth.";
  const description = "We build marketing systems that generate qualified leads, convert them and help scale without limits.";
  const ctaText = "Get Started";

  return (
    <section className={cn(
        "relative text-white",
        "bg-gradient-to-br from-red-700 via-black to-red-900",
        "bg-[length:200%_200%] animate-gradient"
    )}>
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center min-h-screen px-4 md:px-6 pt-24 pb-12">
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-headline leading-tight tracking-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-red-100/90 max-w-2xl mx-auto lg:mx-0">
            {subtitle}
          </p>
          <p className="text-lg text-red-100/70 max-w-xl mx-auto lg:mx-0">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg bg-white text-red-700 hover:bg-white/90 font-bold">
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
