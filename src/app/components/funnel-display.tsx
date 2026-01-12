'use client';
import { Button } from '@/components/ui/button';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { ArrowRight, BarChart, Compass, Lightbulb, Target } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { DynamicIcon } from '@/components/ui/dynamic-icon';
import { PersonalBrandingContactForm } from '../coded/personal-branding/PersonalBrandingContactForm';

const SectionTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <h2 className={cn("text-3xl md:text-4xl font-bold text-center font-headline text-white", className)}>{children}</h2>
  );

export default function FunnelDisplay({ content }: { content: any }) {
    const firestore = useFirestore();
    const pageDocRef = useMemoFirebase(() => doc(firestore, 'personal_branding_pages', 'main'), [firestore]);
    const { data: pageContent } = useDoc(pageDocRef);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleOpenForm = () => setIsFormOpen(true);
    
    const timelineContent = pageContent?.timelineMethod;

    const defaultSteps = [
        { stepTitle: 'ÉTAPE 1', title: 'DÉCOUVERTE', description: 'On explore votre histoire.. vos objectifs et votre public.', iconName: 'Compass', position: 'right' },
        { stepTitle: 'ÉTAPE 2', title: 'STRATÉGIE', description: 'On crée votre positionnement et votre contenu pour attirer les bons clients.', iconName: 'Target', position: 'left' },
        { stepTitle: 'ÉTAPE 3', title: 'EXÉCUTION', description: 'Scénario.. tournage.. montage.. réseaux sociaux.. site web.. tout est fait pour vous.', iconName: 'Lightbulb', position: 'right' },
        { stepTitle: 'ÉTAPE 4', title: 'RÉSULTATS', description: '• Visibilité\n• Prospects\n• Moins de pub\n• Plus de revenus\n• Votre réputation devient votre moteur.', iconName: 'BarChart', position: 'left' },
    ];
    const steps = timelineContent?.steps?.length ? timelineContent.steps : defaultSteps;
    
    return (
        <section id="funnel" className="py-16 md:py-24 bg-red-700/20 text-white relative overflow-hidden backdrop-blur-sm">
             <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '1.5rem 1.5rem' }}></div>
            <div className="container mx-auto px-4 relative z-10">
                
                <SectionTitle className="mb-4">{content?.title || "NOTRE METHODE"}</SectionTitle>
                <div className="w-24 h-1 bg-white/50 mx-auto mb-16"></div>

                <div className="relative max-w-2xl mx-auto">
                    {/* The connecting line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-12 bottom-12 w-1 bg-white/20 rounded-full hidden md:block"></div>

                    {steps.map((step: any, index: number) => (
                        <div key={index} className={cn("flex items-center w-full mb-8 md:mb-0", step.position === 'right' ? 'justify-start' : 'justify-end')}>
                             <div className={cn("flex md:w-1/2 items-center", step.position === 'right' ? 'flex-row' : 'flex-row-reverse')}>
                                {/* Icon Circle */}
                                <div className="relative z-10 flex-shrink-0">
                                    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
                                        <DynamicIcon iconName={step.iconName || 'HelpCircle'} className="w-12 h-12 text-red-600" />
                                    </div>
                                </div>
                                {/* Content */}
                                <div className={cn("p-4 w-full", step.position === 'right' ? 'text-left' : 'text-right')}>
                                    <h3 className="font-bold text-lg uppercase tracking-wide">{step.stepTitle || `ÉTAPE ${index + 1}`}</h3>
                                    <h4 className="font-bold text-xl uppercase text-red-200">{step.title}</h4>
                                    <p className="mt-2 text-sm whitespace-pre-line">{step.description}</p>
                                </div>
                             </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button onClick={handleOpenForm} size="lg" className="rounded-full bg-white text-red-600 hover:bg-gray-200 font-bold text-lg px-10 py-6">
                        {content?.ctaButtonText || "EN SAVOIR PLUS"} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
                 {isFormOpen && <PersonalBrandingContactForm onOpenChange={setIsFormOpen} />}
            </div>
        </section>
    )
}
