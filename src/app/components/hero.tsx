'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLanguage } from '@/app/context/language-context';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedDollarIcon } from './animated-dollar-icon';
import { BarChart, Percent, TrendingUp, DollarSign, Users, LucideProps } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const animationThemes = ['dollar', 'sales', 'clients'] as const;
type AnimationTheme = typeof animationThemes[number];

export default function Hero() {
  const { t } = useLanguage();
  const [animationTheme, setAnimationTheme] = useState<AnimationTheme>('dollar');

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationTheme(prevTheme => {
        const currentIndex = animationThemes.indexOf(prevTheme);
        const nextIndex = (currentIndex + 1) % animationThemes.length;
        return animationThemes[nextIndex];
      });
    }, 3000); // Change theme every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const title = "10× Your Profits in the next 6 Months with BoldNetDigital";
  const subtitle = "More Leads. More Sales. Real Growth.";
  const description = "We build marketing systems that generate qualified leads, convert them and help scale without limits.";
  const ctaText = "Get Started";

  const fallingIcons: Record<AnimationTheme, { Icon: React.FC<LucideProps>, style: React.CSSProperties }[]> = {
    dollar: [
      { Icon: DollarSign, style: { left: '10%', animationDuration: '10s' } },
      { Icon: DollarSign, style: { left: '30%', animationDuration: '8s', animationDelay: '1s' } },
      { Icon: DollarSign, style: { left: '50%', animationDuration: '9s', animationDelay: '2s' } },
      { Icon: DollarSign, style: { left: '70%', animationDuration: '13s', animationDelay: '6s' } },
      { Icon: DollarSign, style: { left: '90%', animationDuration: '14s', animationDelay: '1.5s' } },
    ],
    sales: [
      { Icon: BarChart, style: { left: '20%', animationDuration: '12s', animationDelay: '3s' } },
      { Icon: TrendingUp, style: { left: '40%', animationDuration: '15s', animationDelay: '5s' } },
      { Icon: Percent, style: { left: '60%', animationDuration: '11s', animationDelay: '4s' } },
      { Icon: TrendingUp, style: { left: '80%', animationDuration: '10s', animationDelay: '0.5s' } },
      { Icon: BarChart, style: { left: '95%', animationDuration: '9s', animationDelay: '2.5s' } },
    ],
    clients: [
      { Icon: Users, style: { left: '15%', animationDuration: '11s', animationDelay: '0s' } },
      { Icon: Users, style: { left: '35%', animationDuration: '14s', animationDelay: '2s' } },
      { Icon: Users, style: { left: '55%', animationDuration: '10s', animationDelay: '1s' } },
      { Icon: Users, style: { left: '75%', animationDuration: '12s', animationDelay: '4s' } },
      { Icon: Users, style: { left: '85%', animationDuration: '9s', animationDelay: '5s' } },
    ]
  };

  const renderFallingIcons = (theme: AnimationTheme) => {
    return fallingIcons[theme].map(({ Icon, style }, index) => (
        <Icon 
            key={`${theme}-${index}`}
            className="absolute top-[-10%] text-white/10 animate-fall"
            style={style}
            size={40}
        />
    ));
  }


  return (
    <section className={cn(
        "relative text-white overflow-hidden bg-transparent"
    )}>
       <div className="absolute inset-0 z-0">
        {Object.keys(fallingIcons).map((theme) => (
            <div key={theme} className={cn("absolute inset-0 transition-opacity duration-1000", animationTheme === theme ? "opacity-100" : "opacity-0")}>
                {renderFallingIcons(theme as AnimationTheme)}
            </div>
        ))}
      </div>

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center min-h-screen px-4 md:px-6 pt-32 pb-12 relative z-10">
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-headline leading-normal tracking-normal text-white">
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
            <AnimatedDollarIcon currentTheme={animationTheme} />
        </div>
      </div>
    </section>
  );
}
