'use client';
import { DollarSign } from 'lucide-react';

export function AnimatedDollarIcon() {
  return (
    <div className="coin-container">
      <div className="coin">
        <div className="coin-face coin-front">
          <DollarSign className="w-1/2 h-1/2 text-yellow-200/80 drop-shadow-lg" />
        </div>
        <div className="coin-face coin-back">
           <DollarSign className="w-1/2 h-1/2 text-yellow-200/80 drop-shadow-lg" />
        </div>
      </div>
    </div>
  );
}
