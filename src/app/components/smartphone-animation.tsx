'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

// Abstract UI components
const UIGraph = () => (
  <div className="w-full h-full p-2 space-y-1">
    <div className="h-2 w-3/4 bg-gray-600/50 rounded-sm" />
    <div className="h-1.5 w-1/2 bg-gray-600/50 rounded-sm" />
    <div className="flex items-end h-16 pt-2 gap-0.5">
      <motion.div className="w-full bg-cyan-400/50" style={{ height: '40%' }} />
      <motion.div className="w-full bg-cyan-400/70" style={{ height: '60%' }} />
      <motion.div className="w-full bg-cyan-400" style={{ height: '80%' }} />
      <motion.div className="w-full bg-cyan-400/70" style={{ height: '70%' }} />
      <motion.div className="w-full bg-cyan-400/50" style={{ height: '50%' }} />
      <motion.div className="w-full bg-cyan-400/30" style={{ height: '30%' }} />
      <motion.div className="w-full bg-cyan-400/50" style={{ height: '50%' }} />
      <motion.div className="w-full bg-cyan-400/70" style={{ height: '65%' }} />
    </div>
  </div>
);

const UICard = () => (
  <div className="w-full h-full p-2 space-y-1.5 rounded-lg bg-white/5">
    <div className="h-3 w-1/2 bg-gray-500/50 rounded-sm" />
    <div className="h-2 w-3/4 bg-gray-500/50 rounded-sm" />
    <div className="h-2 w-2/3 bg-gray-500/50 rounded-sm" />
  </div>
);

const PhoneScreen = () => (
  <div className="absolute inset-[3px] rounded-[2rem] bg-gray-900 p-2 space-y-2 overflow-hidden">
    <UIGraph />
    <UICard />
  </div>
);

const PhoneMockup = React.forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative w-[150px] h-[300px] md:w-[200px] md:h-[400px] rounded-[2.5rem] bg-gray-800 p-2 shadow-2xl shadow-fuchsia-500/10 border-4 border-gray-900',
      className
    )}
    style={{
      transformStyle: 'preserve-3d',
    }}
  >
    <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-gray-700 to-gray-900" />
    {children || <PhoneScreen />}
    <div className="absolute top-1/2 -left-1 h-12 w-0.5 rounded-l-sm bg-gray-600" />
    <div className="absolute top-1/4 -right-1 h-8 w-0.5 rounded-r-sm bg-gray-600" />
    <div className="absolute top-1/3 -right-1 h-8 w-0.5 rounded-r-sm bg-gray-600" />
  </div>
));
PhoneMockup.displayName = "PhoneMockup";

const GlassCard = React.forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => (
  <div
    ref={ref}
    className={cn(
      'absolute rounded-2xl border border-white/10 bg-white/5 shadow-xl',
      'backdrop-blur-md',
      className
    )}
  >
    {children}
  </div>
));
GlassCard.displayName = "GlassCard";

const SmartphoneAnimation = () => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 100 };

    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Parallax transformations for different layers
    const rotateX = useTransform(ySpring, [-0.5, 0.5], ['10deg', '-10deg']);
    const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-10deg', '10deg']);
    
    // Main Phone
    const phoneTranslateX = useTransform(xSpring, [-0.5, 0.5], [-20, 20]);
    const phoneTranslateY = useTransform(ySpring, [-0.5, 0.5], [-20, 20]);
    const phoneRotateX = useTransform(ySpring, [-0.5, 0.5], ['25deg', '-25deg']);
    const phoneRotateY = useTransform(xSpring, [-0.5, 0.5], ['-25deg', '25deg']);

    // Secondary Phone
    const phone2TranslateX = useTransform(xSpring, [-0.5, 0.5], [-40, 40]);
    const phone2TranslateY = useTransform(ySpring, [-0.5, 0.5], [-40, 40]);
    const phone2RotateX = useTransform(ySpring, [-0.5, 0.5], ['20deg', '-20deg']);
    const phone2RotateY = useTransform(xSpring, [-0.5, 0.5], ['-20deg', '20deg']);
    
    // Cards
    const card1TranslateX = useTransform(xSpring, [-0.5, 0.5], [40, -40]);
    const card1TranslateY = useTransform(ySpring, [-0.5, 0.5], [40, -40]);
    const card2TranslateX = useTransform(xSpring, [-0.5, 0.5], [-50, 50]);
    const card2TranslateY = useTransform(ySpring, [-0.5, 0.5], [60, -60]);

  return (
    <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
            transformStyle: 'preserve-3d',
            rotateX,
            rotateY,
        }}
        className="relative w-full h-full flex items-center justify-center"
    >
      {/* Background Glows */}
      <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-3/4 h-3/4 bg-violet-500/50 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-cyan-400/30 rounded-full blur-[80px] animate-pulse [animation-delay:2s]" />
      </div>
        
        <motion.div
            style={{ 
                transformStyle: 'preserve-3d',
                transform: 'translateZ(20px)'
            }}
            className="relative"
        >
            {/* Secondary Phone */}
            <motion.div
                style={{
                    translateX: phone2TranslateX,
                    translateY: phone2TranslateY,
                    rotateX: phone2RotateX,
                    rotateY: phone2RotateY,
                    transform: 'translateZ(-40px) rotateY(15deg) rotateX(-10deg)',
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
                <PhoneMockup className="!w-[120px] !h-[240px] md:!w-[160px] md:!h-[320px] opacity-70" />
            </motion.div>
            
            {/* Main Phone */}
            <motion.div
                style={{
                    translateX: phoneTranslateX,
                    translateY: phoneTranslateY,
                    rotateX: phoneRotateX,
                    rotateY: phoneRotateY,
                    transform: 'translateZ(50px)',
                }}
                className="relative"
            >
                <PhoneMockup />
            </motion.div>

            {/* Glass Cards */}
            <motion.div
                style={{ translateX: card1TranslateX, translateY: card1TranslateY, transform: 'translateZ(100px)'}}
                className="absolute top-[10%] -left-[30%]"
            >
                 <GlassCard className="w-32 h-20 p-2">
                    <div className="w-full h-1/2 flex gap-0.5 items-end">
                        <div className="w-full h-full bg-cyan-400/50 rounded-t-sm"/>
                        <div className="w-full h-1/2 bg-cyan-400/50 rounded-t-sm"/>
                        <div className="w-full h-3/4 bg-cyan-400/50 rounded-t-sm"/>
                    </div>
                </GlassCard>
            </motion.div>

             <motion.div
                style={{ translateX: card2TranslateX, translateY: card2TranslateY, transform: 'translateZ(-20px)'}}
                className="absolute bottom-0 -right-[40%]"
            >
                 <GlassCard className="w-40 h-24 p-2">
                    <div className="w-full h-full space-y-1">
                        <div className="h-2 w-full bg-white/10 rounded-sm" />
                        <div className="h-2 w-3/4 bg-white/10 rounded-sm" />
                        <div className="h-2 w-full bg-white/10 rounded-sm" />
                         <div className="h-2 w-2/3 bg-white/10 rounded-sm" />
                    </div>
                </GlassCard>
            </motion.div>
        </motion.div>
    </motion.div>
  );
};

export default SmartphoneAnimation;
