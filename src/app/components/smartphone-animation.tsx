'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, animate } from 'framer-motion';
import { cn } from '@/lib/utils';

// New component for the animated screen content
const MoneyGrowthAnimation = () => {
    const count = useMotionValue(12345);
    const rounded = useTransform(count, (latest) =>
      new Intl.NumberFormat('en-US').format(Math.round(latest))
    );

    const [transactions, setTransactions] = useState<number[]>([]);
  
    useEffect(() => {
      const controls = animate(count, 15789, {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      });

      // Generate transaction amounts only on the client
      if (typeof window !== 'undefined') {
        setTransactions([
          Math.floor(Math.random() * 200) + 50,
          Math.floor(Math.random() * 200) + 50,
          Math.floor(Math.random() * 200) + 50,
        ]);
      }
  
      return () => controls.stop();
    }, [count]);
  
    return (
      <div className="w-full h-full p-3 flex flex-col justify-between text-white overflow-hidden">
        {/* Top section: Balance */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <p className="text-[0.6rem] text-red-200/70">Current Balance</p>
          <div className="flex items-baseline">
            <span className="text-lg font-semibold text-red-100">$</span>
            <motion.h1 className="text-3xl font-bold font-mono tabular-nums tracking-tighter">
              {rounded}
            </motion.h1>
            <span className="text-3xl font-bold font-mono tabular-nums tracking-tighter text-red-100">.00</span>
          </div>
        </motion.div>
  
        {/* Middle section: floating transactions */}
        <div className="relative h-24">
          {transactions.map((amount, i) => (
            <motion.div
              key={i}
              className="absolute w-full flex justify-center"
              style={{
                  left: `${(i * 30) + 5}%` // Stagger them horizontally
              }}
              animate={{
                y: [0, -80],
                opacity: [1, 0],
              }}
              transition={{
                delay: i * 0.8,
                duration: 3,
                repeat: Infinity,
                ease: "easeOut",
              }}
            >
              <div className="bg-green-500/20 border border-green-500/50 rounded-full px-2 py-0.5 text-xs text-green-300 inline-block">
                +${amount}
              </div>
            </motion.div>
          ))}
        </div>
  
        {/* Bottom section: placeholder UI */}
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <div className="space-y-1">
              <div className="h-2 w-3/4 bg-red-400/20 rounded-sm" />
              <div className="h-1.5 w-1/2 bg-red-400/20 rounded-sm" />
          </div>
          <div className="mt-2 h-6 w-full bg-white/5 rounded-sm" />
        </motion.div>
      </div>
    );
  };
  
const PhoneScreen = () => (
    <div className="absolute inset-[3px] rounded-[2rem] bg-gray-900 overflow-hidden">
        <MoneyGrowthAnimation />
    </div>
);

const PhoneMockup = React.forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative w-[150px] h-[300px] md:w-[200px] md:h-[400px] rounded-[2.5rem] bg-gray-800 p-2 shadow-2xl shadow-red-500/10 border-4 border-gray-900',
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
          <div className="absolute top-1/4 left-1/4 w-3/4 h-3/4 bg-red-600/30 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-red-400/20 rounded-full blur-[80px] animate-pulse [animation-delay:2s]" />
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
                        <div className="w-full h-full bg-red-400/50 rounded-t-sm"/>
                        <div className="w-full h-1/2 bg-red-400/50 rounded-t-sm"/>
                        <div className="w-full h-3/4 bg-red-400/50 rounded-t-sm"/>
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
