'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLanguage } from '@/app/context/language-context';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedDollarIcon } from './animated-dollar-icon';
import { BarChart, Percent, TrendingUp, DollarSign } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();

  const title = "10× Your Profits in the next 6 Months with BoldNetDigital";
  const subtitle = "More Leads. More Sales. Real Growth.";
  const description = "We build marketing systems that generate qualified leads, convert them and help scale without limits.";
  const ctaText = "Get Started";

  const fallingIcons = [
    { Icon: DollarSign, style: { left: '10%', animationDuration: '10s', animationDelay: '0s' } },
    { Icon: BarChart, style: { left: '20%', animationDuration: '12s', animationDelay: '3s' } },
    { Icon: TrendingUp, style: { left: '30%', animationDuration: '8s', animationDelay: '1s' } },
    { Icon: Percent, style: { left: '40%', animationDuration: '15s', animationDelay: '5s' } },
    { Icon: DollarSign, style: { left: '50%', animationDuration: '9s', animationDelay: '2s' } },
    { Icon: BarChart, style: { left: '60%', animationDuration: '11s', animationDelay: '4s' } },
    { Icon: TrendingUp, style: { left: '70%', animationDuration: '13s', animationDelay: '6s' } },
    { Icon: Percent, style: { left: '80%', animationDuration: '10s', animationDelay: '0.5s' } },
    { Icon: DollarSign, style: { left: '90%', animationDuration: '14s', animationDelay: '1.5s' } },
  ];

  return (
    <section className={cn(
        "relative text-white overflow-hidden",
        "bg-gradient-to-br from-primary via-red-800 to-black",
        "bg-[length:200%_200%] animate-gradient"
    )}>
       <div className="absolute inset-0 z-0">
        {fallingIcons.map(({ Icon, style }, index) => (
          <Icon 
            key={index}
            className="absolute top-[-10%] text-white/10 animate-fall"
            style={style}
            size={40}
          />
        ))}
      </div>

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center min-h-screen px-4 md:px-6 pt-24 pb-12 relative z-10">
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
            <AnimatedDollarIcon />
        </div>
      </div>
    </section>
  );
}
