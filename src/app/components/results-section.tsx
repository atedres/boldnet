'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { SiteLogo } from '../coded/personal-branding/components';
import { cn } from '@/lib/utils';
import { PersonalBrandingContactForm } from '../coded/personal-branding/PersonalBrandingContactForm';

const SectionTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <h2 className={cn("text-3xl md:text-4xl font-bold text-center font-headline", className)}>{children}</h2>
);
  
export default function ResultsSection({ content }: { content?: any }) {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleOpenForm = () => setIsFormOpen(true);
    
    if (!content) {
        return null;
    }
    
    return (
        <section className="py-16 md:py-24 bg-red-700/20 text-white backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <SectionTitle className="mb-16">{content?.title || "LES RÉSULTATS?"}</SectionTitle>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12 relative">
                    {/* Connecting Lines */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[calc(100%-8rem)] h-20 border-t-2 border-l-2 border-r-2 border-white/50 rounded-t-full hidden md:block"></div>
                    <div className="absolute top-[6.5rem] left-1/4 h-[calc(100%-12rem)] w-px bg-white/50 hidden md:block"></div>
                    <div className="absolute top-[6.5rem] right-1/4 h-[calc(100%-12rem)] w-px bg-white/50 hidden md:block"></div>


                    <div className="relative z-10">
                        <div className="text-center mb-4">
                            <span className="font-bold text-xl rounded-full px-6 py-2 bg-black text-white inline-block shadow-lg">{content?.withoutTitle || "Avant Boldnet"}</span>
                        </div>
                        <Card className="bg-black/20 p-6 rounded-lg border border-red-500 text-center h-full">
                            <CardContent className="p-0 mt-4 space-y-4 text-red-200">
                                {(content?.withoutItems || []).map((item: string, i: number) => <p key={i} className="text-lg">{item}</p>)}
                                <div className="relative aspect-video mt-4 rounded-lg overflow-hidden">
                                    <Image src={content?.withoutImage || "https://picsum.photos/seed/sans-marque/400/225"} alt="Sans Marque" layout="fill" className="object-cover" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="relative z-10">
                        <div className="text-center mb-4">
                            <span className="font-bold text-xl rounded-full px-6 py-2 bg-white text-red-600 inline-block shadow-lg">{content?.withTitle || "Après Boldnet"}</span>
                        </div>
                        <Card className="bg-white/90 p-6 rounded-lg text-gray-800 text-center h-full">
                            <CardContent className="p-0 mt-4 space-y-2">
                                {(content?.withItems || []).map((item: string, i: number) => <p key={i} className="text-lg">✓ {item}</p>)}
                                <div className="relative aspect-video mt-4 rounded-lg overflow-hidden">
                                    <Image src={content?.withImage || "https://picsum.photos/seed/avec-marque/400/225"} alt="Avec Marque" layout="fill" className="object-cover" />
                                    <div className="absolute top-2 right-2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                                        <SiteLogo />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-10 h-10 bg-white text-red-600 rounded-full flex items-center justify-center font-bold text-sm hidden md:flex">VS</div>
                </div>

                <div className="max-w-4xl mx-auto text-center mt-20">
                    <p className="font-bold text-xl md:text-2xl"><span className="bg-white text-red-600 px-3 py-1 rounded-md">Bonus:</span> {content?.bonus || "Votre impact grandit aussi. Plus de personnes profitent de votre expertise et de vos services."}</p>
                    <Button onClick={handleOpenForm} size="lg" className="mt-8 rounded-full bg-white text-red-600 hover:bg-gray-200 font-bold text-lg px-10 py-6">
                        {content?.ctaButtonText || "COMMENÇONS!"} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
            {isFormOpen && <PersonalBrandingContactForm onOpenChange={setIsFormOpen} />}
        </section>
    )
}
