'use client';
import { DollarSign, TrendingUp, Users, LucideProps } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const icons: { name: 'dollar' | 'sales' | 'clients'; Icon: React.FC<LucideProps> }[] = [
    { name: 'dollar', Icon: DollarSign },
    { name: 'sales', Icon: TrendingUp },
    { name: 'clients', Icon: Users },
];

const themeToIndex: Record<'dollar' | 'sales' | 'clients', number> = {
    dollar: 0,
    sales: 1,
    clients: 2,
};

export function AnimatedDollarIcon({ currentTheme }: { currentTheme: 'dollar' | 'sales' | 'clients' }) {
  const currentIndex = themeToIndex[currentTheme];
  const { Icon } = icons[currentIndex];

  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center animate-float" style={{ perspective: '1000px' }}>
      <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl"></div>
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-white/20 to-transparent rounded-full border-2 border-white/30 backdrop-blur-sm">
        <div className="relative w-1/2 h-1/2" style={{ transformStyle: 'preserve-3d', transform: 'rotateY(-25deg) rotateX(10deg)' }}>
            {icons.map(({ Icon, name }, index) => (
                 <Icon
                    key={name}
                    className={cn(
                        "absolute w-full h-full text-white drop-shadow-lg transition-opacity duration-500",
                        currentIndex === index ? "opacity-100" : "opacity-0"
                    )}
                />
            ))}
        </div>
      </div>
    </div>
  );
}
