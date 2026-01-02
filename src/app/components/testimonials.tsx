'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
      <path fill="#4285F4" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#34A853" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#FBBC05" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.582-3.296-11.127-7.792l-6.571 4.819C9.656 40.083 16.318 44 24 44z" />
      <path fill="#EA4335" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 35.846 44 30.342 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
);

const StarRating = ({ rating, className }: { rating: number, className?: string }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${className} ${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600 fill-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };
  

const TestimonialCard = ({ testimonial }: { testimonial: any }) => (
    <Card className="bg-neutral-800/50 border-neutral-700 text-white flex flex-col h-full">
        <CardContent className="p-6 flex-grow flex flex-col">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Image
                        src={testimonial.avatarUrl}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                    />
                    <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-neutral-400">{testimonial.date}</p>
                    </div>
                </div>
                {testimonial.source?.toLowerCase() === 'google' && <GoogleIcon />}
            </div>
            <StarRating rating={testimonial.rating} />
            <p className="mt-4 text-neutral-300 flex-grow">{testimonial.review}</p>
        </CardContent>
    </Card>
);

export default function Testimonials() {
  const firestore = useFirestore();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const testimonialsCollection = useMemoFirebase(
    () => query(collection(firestore, 'testimonials'), orderBy('name')),
    [firestore]
  );
  const { data: testimonials, isLoading } = useCollection(testimonialsCollection);

  useEffect(() => {
    if (!api) return;
    
    setCurrent(api.selectedScrollSnap() + 1);

    const handleSelect = () => {
        setCurrent(api.selectedScrollSnap() + 1);
    };
    
    api.on('select', handleSelect);
    
    return () => {
        api.off('select', handleSelect);
    };
  }, [api]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  if (isLoading) {
    return <div className="text-center py-12 text-white">Chargement des témoignages...</div>;
  }

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#121212] text-white py-16 md:py-24">
      <div className="container mx-auto">
        <div className="text-center mb-12">
            <span className="text-sm font-bold text-neutral-400 tracking-widest uppercase">Témoignages</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 font-headline">Ce que nos clients disent de nous</h2>
        </div>

        <Carousel 
            setApi={setApi}
            opts={{
                align: 'start',
                loop: true,
            }}
            className="w-full relative"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4">
                <Button variant="outline" size="icon" className="rounded-full bg-transparent border-neutral-600 text-neutral-400 hover:bg-neutral-800 hover:text-white" onClick={scrollPrev}>
                    &lt;
                </Button>
                 <div className="text-sm text-neutral-400">
                    <span className="font-bold text-white">{String(current).padStart(2, '0')}</span>
                    /
                    <span>{String(testimonials.length).padStart(2, '0')}</span>
                </div>
                <Button variant="outline" size="icon" className="rounded-full bg-transparent border-neutral-600 text-neutral-400 hover:bg-neutral-800 hover:text-white" onClick={scrollNext}>
                    &gt;
                </Button>
            </div>
        </Carousel>
      </div>
    </section>
  );
}
