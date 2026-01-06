'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Lightbulb, BarChart, ArrowRight, PenTool, Video, Image as ImageIcon, Speaker, MessageSquare, Globe, Compass, Target } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useMemo } from 'react';
import { SiteLogo } from './components';
import { FirebaseClientProvider, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { DynamicIcon } from '@/components/ui/dynamic-icon';
import { PersonalBrandingContactForm } from './PersonalBrandingContactForm';

const SectionTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <h2 className={cn("text-3xl md:text-4xl font-bold text-center font-headline", className)}>{children}</h2>
);

const SectionSubtitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <p className={`text-lg md:text-xl text-center text-muted-foreground max-w-3xl mx-auto ${className}`}>{children}</p>
);

const HeroSection = ({ content, onCtaClick }: { content: any, onCtaClick: () => void }) => (
  <section className="relative w-full h-[80vh] md:h-screen text-white overflow-hidden bg-black">
    <div className="absolute inset-0 z-0">
        <Image
            src={content?.backgroundImageUrl || "https://picsum.photos/seed/hero-bg/1200/800"}
            alt="Background"
            fill
            className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-red-900/50 to-transparent"></div>
    </div>
    <div className="relative z-10 container mx-auto flex flex-col items-center justify-center h-full text-center px-4">
      <div 
        className="mb-6 relative"
        style={{ 
            width: content?.logoSize || 96, 
            height: content?.logoSize || 96 
        }}
      >
        {content?.logoSvg ? (
          <div className="w-full h-full text-white" dangerouslySetInnerHTML={{ __html: content.logoSvg }} />
        ) : (
          <SiteLogo />
        )}
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold font-headline leading-tight tracking-wider uppercase">
        {content?.title || "On ne crée pas de personal brands"}
      </h1>
      <p className="mt-4 text-xl md:text-2xl max-w-3xl font-light">
        {content?.subtitle || "On crée la plateforme qui va permettre à votre présence d'être une institution qui vend pour vous."}
      </p>
      <Button onClick={onCtaClick} size="lg" className="mt-8 rounded-full bg-white text-red-600 hover:bg-gray-200 font-bold text-lg px-10 py-6">
        {content?.ctaButtonText || "MA CONSULTATION GRATUITE"} <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  </section>
);

const ProfessionsSection = ({ content }: { content: any }) => (
    <section className="py-16 md:py-24 relative">
         {content?.backgroundImageUrl && (
            <Image
                src={content.backgroundImageUrl}
                alt="Professions background"
                fill
                className="object-cover z-0 opacity-10"
            />
        )}
        <div className="container mx-auto px-4 relative z-10">
            <SectionTitle className="text-red-600">
                {content?.title || "Vous êtes expert dans votre domaine:"}
            </SectionTitle>
            <div className="grid grid-cols-3 gap-6 md:gap-8 mt-12 max-w-4xl mx-auto">
                {(content?.professions || []).map((p: any, index: number) => (
                    <div key={index} className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-xl group">
                        <Image src={p.image || "https://picsum.photos/seed/prof${index}/300/400"} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                        <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl drop-shadow-md">{p.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const ProblemSection = ({ content, onCtaClick }: { content: any, onCtaClick: () => void }) => (
    <section className="py-16 md:py-24 bg-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
            <SectionTitle className="mb-8">{content?.title || "Le problème quand on a pas de personal branding"}</SectionTitle>
            <div className="max-w-2xl mx-auto text-left mt-8 space-y-4 text-lg">
                <p>{content?.mainPoint || "Mais aussi :"}</p>
                <ul className="space-y-2 list-disc list-inside">
                    {(content?.listItems || []).map((item: string, i: number) => <li key={i}>{item}</li>)}
                </ul>
            </div>
            <Card className="max-w-2xl mx-auto mt-8 bg-white text-gray-800 p-6 text-left border-red-300">
                <CardContent className="p-0">
                    <h4 className="font-bold text-xl mb-4">{content?.howToTitle || "Comment faire :"}</h4>
                    <ul className="space-y-2 list-disc list-inside">
                        {(content?.howToListItems || []).map((item: string, i: number) => <li key={i}>{item}</li>)}
                    </ul>
                </CardContent>
            </Card>
            <p className="mt-8 font-semibold text-lg">{content?.question || "Pourquoi c'est plus facile de faire confiance à un inconnu sur le web qu'à son propre père?"}</p>
            <Button onClick={onCtaClick} size="lg" className="mt-8 rounded-full bg-white text-red-600 hover:bg-gray-200 font-bold text-lg px-10 py-6">
                {content?.ctaButtonText || "JE VEUX PASSER PRO"} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </div>
    </section>
);

const ExpertiseSection = ({ content }: { content: any }) => (
    <section className="relative py-24 md:py-32 bg-gray-800 text-white">
        <div className="absolute inset-0 z-0">
            <Image
                src={content?.backgroundImageUrl || "https://picsum.photos/seed/expertise/1200/500"}
                alt="Expertise background"
                fill
                className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
            <p className="text-xl md:text-2xl font-light">{content?.title || "C'est ainsi que nous faisons de vous:"}</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold font-headline flex items-center justify-center gap-6">
                <span className="tracking-wider">{content?.subtitle || "l'expert incontournable dans votre domaine"}</span>
            </h2>
        </div>
    </section>
);

const BeneficiariesSection = ({ content, onCtaClick }: { content: any, onCtaClick: () => void }) => {
    if (!content?.items?.length) return null;

    return (
        <section className="py-16 md:py-24 bg-[#fff4f2]">
            <div className="container mx-auto px-4">
                 <div className="flex items-center justify-center mb-12">
                    <div className="h-px flex-grow bg-red-200"></div>
                    <SectionTitle className="text-red-600 mx-4 flex-shrink-0">{content?.title || 'QUI PEUT EN BÉNÉFICIER?'}</SectionTitle>
                    <div className="h-px flex-grow bg-red-200"></div>
                </div>
                <div className="space-y-12 max-w-2xl mx-auto">
                    {(content.items || []).map((item: any, index: number) => (
                        <div key={index} className="relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-lg">
                                 <Image 
                                    src={item.imageUrl || "https://picsum.photos/seed/beneficiary/600/400"}
                                    alt={item.name}
                                    width={600}
                                    height={400}
                                    className="w-full object-cover"
                                 />
                            </div>
                            <div 
                                className="absolute top-4 left-4 bg-red-600 text-white font-bold text-lg px-6 py-2 rounded-lg"
                                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 85% 100%, 0 100%)' }}
                            >
                                {item.name}
                            </div>
                            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md max-w-[60%]">
                                <p className="text-gray-700 text-sm md:text-base">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {(content.conclusion || content.ctaButtonText) && (
                    <div className="text-center mt-12 max-w-2xl mx-auto">
                        {content.conclusion && (
                            <p className="text-lg font-semibold text-red-600">{content.conclusion}</p>
                        )}
                        {content.ctaButtonText && (
                             <Button onClick={onCtaClick} size="lg" className="rounded-full bg-red-600 text-white hover:bg-red-700 font-bold text-lg px-10 py-6 mt-6">
                                {content.ctaButtonText} <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

const ResultsSection = ({ content, onCtaClick }: { content: any, onCtaClick: () => void }) => (
    <section className="py-16 md:py-24 bg-red-700 text-white">
        <div className="container mx-auto px-4">
            <SectionTitle className="mb-16">{content?.title || "LES RÉSULTATS?"}</SectionTitle>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12 relative">
                {/* Connecting Lines */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[calc(100%-8rem)] h-20 border-t-2 border-l-2 border-r-2 border-white/50 rounded-t-full"></div>
                <div className="absolute top-[6.5rem] left-1/4 h-[calc(100%-12rem)] w-px bg-white/50"></div>
                <div className="absolute top-[6.5rem] right-1/4 h-[calc(100%-12rem)] w-px bg-white/50"></div>


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
                <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-10 h-10 bg-white text-red-600 rounded-full flex items-center justify-center font-bold text-sm">VS</div>
            </div>

            <div className="max-w-4xl mx-auto text-center mt-16">
                <p className="font-bold text-xl md:text-2xl"><span className="bg-white text-red-600 px-3 py-1 rounded-md">Bonus:</span> {content?.bonus || "Votre impact grandit aussi. Plus de personnes profitent de votre expertise et de vos services."}</p>
                <Button onClick={onCtaClick} size="lg" className="mt-8 rounded-full bg-white text-red-600 hover:bg-gray-200 font-bold text-lg px-10 py-6">
                    {content?.ctaButtonText || "COMMENÇONS!"} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
        </div>
    </section>
)

const MethodSection = ({ content, onCtaClick }: { content: any, onCtaClick: () => void }) => {
    return (
        <section className="py-16 md:py-24 bg-[#fff4f2]">
            <div className="container mx-auto px-4">
                <div className="space-y-8 max-w-4xl mx-auto">
                    {(content?.steps || []).map((step: any, index: number) => (
                        <Card key={index} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg relative overflow-visible border-none">
                             <div className="absolute -top-6 right-4 w-12 h-12 bg-red-600 text-white flex items-center justify-center rounded-full text-xl font-bold z-10">
                                {index + 1}
                            </div>
                            <div className={cn("flex flex-row gap-6 items-center")}>
                                {step.imageUrl && (
                                    <div className="w-24 md:w-40 flex-shrink-0">
                                        <Image src={step.imageUrl} alt={step.title} width={400} height={300} className="rounded-lg object-contain"/>
                                    </div>
                                )}
                                <div className={cn("flex-grow", !step.imageUrl && "text-center")}>
                                    <h3 className="text-2xl font-bold font-headline text-red-600">{step.title}</h3>
                                    
                                    {step.description && <p className="mt-2 text-muted-foreground">{step.description}</p>}

                                    {step.subSteps && step.subSteps.length > 0 && (
                                        <div className={cn("grid gap-2 mt-6", "grid-cols-3")}>
                                            {step.subSteps.map((sub: any, subIndex: number) => (
                                                <div key={subIndex} className="text-center p-2">
                                                    <div className="w-12 h-12 mx-auto flex items-center justify-center">
                                                        <DynamicIcon iconName={sub.iconName || 'PenTool'} className="w-8 h-8 text-red-600" />
                                                    </div>
                                                    <p className="mt-2 text-sm font-semibold text-gray-600">{sub.name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
                 <div className="text-center mt-12 max-w-2xl mx-auto">
                    <p className="text-lg font-semibold text-red-600">{content?.conclusion}</p>
                    <Button onClick={onCtaClick} size="lg" className="rounded-full bg-red-600 text-white hover:bg-red-700 font-bold text-lg px-10 py-6 mt-6">
                        {content?.ctaButtonText || "MA CONSULTATION GRATUITE"} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

const TimelineMethodSection = ({ content, onCtaClick }: { content: any, onCtaClick: () => void }) => {
    const defaultSteps = [
        { stepTitle: 'ÉTAPE 1', title: 'DÉCOUVERTE', description: 'On explore votre histoire.. vos objectifs et votre public.', iconName: 'Compass', position: 'right' },
        { stepTitle: 'ÉTAPE 2', title: 'STRATÉGIE', description: 'On crée votre positionnement et votre contenu pour attirer les bons clients.', iconName: 'Target', position: 'left' },
        { stepTitle: 'ÉTAPE 3', title: 'EXÉCUTION', description: 'Scénario.. tournage.. montage.. réseaux sociaux.. site web.. tout est fait pour vous.', iconName: 'Lightbulb', position: 'right' },
        { stepTitle: 'ÉTAPE 4', title: 'RÉSULTATS', description: '• Visibilité\n• Prospects\n• Moins de pub\n• Plus de revenus\n• Votre réputation devient votre moteur.', iconName: 'BarChart3', position: 'left' },
    ];
    const steps = content?.steps?.length ? content.steps : defaultSteps;
    
    return (
        <section className="py-16 md:py-24 bg-red-700 text-white relative overflow-hidden">
             <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '1.5rem 1.5rem' }}></div>
            <div className="container mx-auto px-4 relative z-10">
                
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
                    <Button onClick={onCtaClick} size="lg" className="rounded-full bg-white text-red-600 hover:bg-gray-200 font-bold text-lg px-10 py-6">
                        {content?.ctaButtonText || "EN SAVOIR PLUS"} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    )
}

const FinalCtaSection = ({ content }: { content: any }) => (
    <section className="relative py-24 md:py-32 bg-gray-900 text-white">
         <div className="absolute inset-0 z-0">
            <Image
                src={content?.backgroundImageUrl || "https://picsum.photos/seed/final-cta/1200/400"}
                alt="Office background"
                fill
                className="opacity-20 object-cover"
            />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold font-headline uppercase tracking-wider">{content?.title || "Apparaître, Imposer, Attirer."}</h2>
            <p className="mt-4 text-xl md:text-2xl font-light">{content?.subtitle || "Explose tes résultats maintenant."}</p>
        </div>
    </section>
)

const sectionComponents: Record<string, React.FC<any>> = {
    hero: HeroSection,
    team: ProfessionsSection,
    problem: ProblemSection,
    expertise: ExpertiseSection,
    results: ResultsSection,
    beneficiaries: BeneficiariesSection,
    timelineMethod: TimelineMethodSection,
    method: MethodSection,
    finalCta: FinalCtaSection,
};

const DEFAULT_SECTION_ORDER = [
    'hero',
    'team',
    'problem',
    'expertise',
    'results',
    'beneficiaries',
    'timelineMethod',
    'method',
    'finalCta',
];

function PersonalBrandingContent() {
    const firestore = useFirestore();
    const pageDocRef = useMemoFirebase(() => doc(firestore, 'personal_branding_pages', 'main'), [firestore]);
    const { data: pageContent, isLoading } = useDoc(pageDocRef);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleOpenForm = () => setIsFormOpen(true);

    const sectionOrder = useMemo(() => pageContent?.sectionOrder || DEFAULT_SECTION_ORDER, [pageContent]);


    if (isLoading) {
        return (
            <div className="space-y-8">
                <Skeleton className="h-screen w-full" />
                <Skeleton className="h-96 w-full" />
                <Skeleton className="h-96 w-full" />
            </div>
        )
    }

  return (
    <div className="bg-white">
      <main>
        {sectionOrder.map((sectionKey: string) => {
            const Component = sectionComponents[sectionKey];
            if (!Component || !pageContent?.[sectionKey]) {
                return null;
            }
            const content = pageContent[sectionKey];
            
            // The FinalCtaSection is the only one without a CTA button.
            const onCtaClick = sectionKey !== 'finalCta' ? handleOpenForm : undefined;

            return <Component key={sectionKey} content={content} onCtaClick={onCtaClick} />;
        })}
      </main>
      {isFormOpen && <PersonalBrandingContactForm onOpenChange={setIsFormOpen} />}
    </div>
  );
}

export default function PersonalBrandingPage() {
    return (
        <FirebaseClientProvider>
            <PersonalBrandingContent />
        </FirebaseClientProvider>
    )
}

    