'use client';
import { DollarSign } from 'lucide-react';

export function AnimatedDollarIcon() {
  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center animate-float">
      <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl"></div>
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-white/20 to-transparent rounded-full border-2 border-white/30 backdrop-blur-sm">
        <DollarSign className="w-1/2 h-1/2 text-white drop-shadow-lg" />
      </div>
    </div>
  );
}
