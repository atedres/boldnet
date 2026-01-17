'use client';
import { TrendingUp, Users, LucideProps } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const iconComponents: { name: 'dollar' | 'sales' | 'clients'; component: React.ReactNode }[] = [
    {
        name: 'dollar',
        component: (
            <Image
                src="https://res.cloudinary.com/ddbj70ziv/image/upload/v1718824749/coin_sszq3p.png"
                alt="Dollar Coin"
                layout="fill"
                objectFit="contain"
                className="drop-shadow-lg"
            />
        ),
    },
    {
        name: 'sales',
        component: <TrendingUp className="w-full h-full text-white drop-shadow-lg" />,
    },
    {
        name: 'clients',
        component: <Users className="w-full h-full text-white drop-shadow-lg" />,
    },
];

const themeToIndex: Record<'dollar' | 'sales' | 'clients', number> = {
    dollar: 0,
    sales: 1,
    clients: 2,
};

export function AnimatedDollarIcon({ currentTheme }: { currentTheme: 'dollar' | 'sales' | 'clients' }) {
  const currentIndex = themeToIndex[currentTheme];

  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center animate-float" style={{ perspective: '1000px' }}>
      <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl"></div>
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-white/20 to-transparent rounded-full border-2 border-white/30 backdrop-blur-sm">
        <div className="relative w-1/2 h-1/2" style={{ transformStyle: 'preserve-3d', transform: 'rotateY(-25deg) rotateX(10deg)' }}>
            {iconComponents.map(({ component, name }, index) => (
                 <div
                    key={name}
                    className={cn(
                        "absolute inset-0 transition-opacity duration-500",
                        currentIndex === index ? "opacity-100" : "opacity-0"
                    )}
                >
                    {component}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
