'use client';
import { DollarSign, TrendingUp, Users, LucideProps } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const icons: { name: 'dollar' | 'sales' | 'clients'; Icon: React.FC<LucideProps> }[] = [
    { name: 'dollar', Icon: DollarSign },
    { name: 'sales', Icon: TrendingUp },
    { name: 'clients', Icon: Users },
];

export function AnimatedDollarIcon({ onThemeChange }: { onThemeChange: (theme: 'dollar' | 'sales' | 'clients') => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % icons.length;
        onThemeChange(icons[nextIndex].name);
        return nextIndex;
      });
    }, 3000); // Change icon every 3 seconds

    return () => clearInterval(interval);
  }, [onThemeChange]);

  const { Icon } = icons[currentIndex];

  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center animate-float">
      <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl"></div>
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-white/20 to-transparent rounded-full border-2 border-white/30 backdrop-blur-sm">
        <div className="relative w-1/2 h-1/2">
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
