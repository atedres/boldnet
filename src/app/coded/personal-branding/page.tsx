'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Zap, Target, Lightbulb, Users, BarChart, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SiteLogo } from './components';
import { FirebaseClientProvider, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

const SectionTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <h2 className={`text-3xl md:text-4xl font-bold text-center font-headline tracking-tight ${className}`}>{children}</h2>
);

const SectionSubtitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <p className={`text-lg md:text-xl text-center text-muted-foreground max-w-3xl mx-auto ${className}`}>{children}</p>
);

const HeroSection = ({ content }: { content: any }) => (
  <section className="relative w-full h-[80vh] md:h-screen text-white overflow-hidden bg-black">
    <div className="absolute inset-0 z-0">
        <Image
            src={content?.backgroundImageUrl || "https://picsum.photos/seed/hero-bg/1200/800"}
            alt="Background"
            fill
            className="opacity-40 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-red-900/50 to-transparent"></div>
    </div>
    <div className="relative z-10 container mx-auto flex flex-col items-center justify-center h-full text-center px-4">
      <div className="w-24 h-24 mb-6 relative">
        {content?.logoUrl ? <Image src={content.logoUrl} alt="Page Logo" fill className="object-contain" /> : <SiteLogo />}
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold font-headline leading-tight tracking-wider uppercase">
        {content?.title || "On ne crée pas de personal brands"}
      </h1>
      <p className="mt-4 text-xl md:text-2xl max-w-3xl font-light">
        {content?.subtitle || "On crée la plateforme qui va permettre à votre présence d'être une institution qui vend pour vous."}
      </p>
      <Button asChild size="lg" className="mt-8 rounded-full bg-white text-red-600 hover:bg-gray-200 font-bold text-lg px-10 py-6">
        <Link href="#contact">{content?.ctaButtonText || "MA CONSULTATION GRATUITE"} <ArrowRight className="ml-2 h-5 w-5" /></Link>
      </Button>
    </div>
  </section>
);

const TeamSection = ({ content }: { content: any }) => (
    <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
            <SectionTitle className="text-red-600">{content?.title || "Vous et notre équipe. À nous deux on va tout révolutionner."}</SectionTitle>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">
                {(content?.professions || []).map((p: any) => (
                    <div key={p.name} className="flex flex-col items-center gap-4 text-center">
                        <Image src={p.image || "https://picsum.photos/seed/placeholder/150/150"} alt={p.name} width={150} height={150} className="rounded-full object-cover aspect-square" />
                        <h3 className="font-semibold text-lg">{p.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const ProblemSection = ({ content }: { content: any }) => (
    <section className="py-16 md:py-24 bg-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
            <SectionTitle>{content?.title || "Le problème quand on a pas de personal branding"}</SectionTitle>
            <div className="max-w-2xl mx-auto text-left mt-8 space-y-4 text-lg">
                <p>{content?.mainPoint || "Mais aussi :"}</p>
                <ul className="space-y-2 list-disc list-inside">
                    {(content?.listItems || []).map((item: string, i: number) => <li key={i}>{item}</li>)}
                </ul>
            </div>
            <Card className="max-w-2xl mx-auto mt-8 bg-red-100/10 text-white p-6 text-left border-red-300">
                <CardContent className="p-0">
                    <h4 className="font-bold text-xl mb-4">{content?.howToTitle || "Comment faire :"}</h4>
                    <ul className="space-y-2 list-disc list-inside">
                        {(content?.howToListItems || []).map((item: string, i: number) => <li key={i}>{item}</li>)}
                    </ul>
                </CardContent>
            </Card>
            <p className="mt-8 font-semibold text-lg">{content?.question || "Pourquoi c'est plus facile de faire confiance à un inconnu sur le web qu'à son propre père?"}</p>
            <Button asChild size="lg" className="mt-8 rounded-full bg-white text-red-600 hover:bg-gray-200 font-bold text-lg px-10 py-6">
                <Link href="#contact">{content?.ctaButtonText || "JE VEUX PASSER PRO"} <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
        </div>
    </section>
);

const sideBenefits = [
    { icon: <Zap className="w-6 h-6 text-red-600" />, text: "Plus de respect" },
    { icon: <Target className="w-6 h-6 text-red-600" />, text: "Closing élevé" },
    { icon: <Lightbulb className="w-6 h-6 text-red-600" />, text: "Justification de la valeur" },
    { icon: <Users className="w-6 h-6 text-red-600" />, text: "Fidélisation client" },
    { icon: <BarChart className="w-6 h-6 text-red-600" />, text: "Croissance organique" },
    { icon: <CheckCircle className="w-6 h-6 text-red-600" />, text: "Plus de confiance" },
];

const BenefitsSection = ({ content }: { content: any }) => (
    <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
            <SectionTitle className="text-gray-800">{content?.title || "C'est quoi que ça va m'apporter"}</SectionTitle>
            <div className="mt-12 space-y-16">
                {(content?.mainBenefits || []).map((b: any, index: number) => (
                     <div key={index} className={`grid md:grid-cols-2 gap-10 items-center`}>
                        <div className={`${index % 2 === 1 ? 'md:order-last' : ''}`}>
                            <Image src={b.image || "https://picsum.photos/seed/benefit/500/300"} alt={b.title} width={500} height={300} className="rounded-lg shadow-lg object-cover" />
                        </div>
                        <div className="space-y-4">
                            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-red-600 text-white font-bold text-xl">{index + 1}</span>
                            <h3 className="text-2xl font-bold font-headline mt-2">{b.title}</h3>
                            <p className="text-muted-foreground">{b.description}</p>
                        </div>
                    </div>
                ))}
            </div>
             <div className="mt-20">
                <Card className="max-w-3xl mx-auto p-8 border-2 border-red-200">
                    <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-shrink-0">
                                <Image src={content?.sideBenefitsImage || "https://picsum.photos/seed/shield/150/150"} alt="Shield" width={150} height={150} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold font-headline">{content?.sideBenefitsTitle || "On sera à tes côtés"}</h3>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    {sideBenefits.map(sb => (
                                        <div key={sb.text} className="flex items-center gap-3">
                                            {sb.icon}
                                            <span className="font-medium">{sb.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <p className="text-center mt-8 text-lg font-semibold max-w-3xl mx-auto">{content?.conclusion || "Quand vous êtes la charge N°1 de votre prospect et que vous êtes recommandé par son propre entourage, on vous laissera le reste."}</p>
                 <div className="text-center mt-6">
                    <Button asChild size="lg" className="rounded-full bg-red-600 text-white hover:bg-red-700 font-bold text-lg px-10 py-6">
                        <Link href="#contact">{content?.ctaButtonText || "JE VEUX PASSER PRO"} <ArrowRight className="ml-2 h-5 w-5" /></Link>
                    </Button>
                </div>
            </div>
        </div>
    </section>
);

const ResultsSection = ({ content }: { content: any }) => (
    <section className="py-16 md:py-24 bg-red-700 text-white">
        <div className="container mx-auto px-4">
            <SectionTitle>{content?.title || "Les résultats"}</SectionTitle>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
                <Card className="bg-black/20 p-6 rounded-lg border border-red-500">
                    <CardHeader className="p-0">
                        <CardTitle className="font-bold text-xl rounded-full px-4 py-2 bg-black text-white inline-block">{content?.withoutTitle || "Sans Marque"}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-4 space-y-2 text-red-200">
                        {(content?.withoutItems || []).map((item: string, i: number) => <p key={i}>‣ {item}</p>)}
                        <Image src={content?.withoutImage || "https://picsum.photos/seed/sans-marque/400/200"} alt="Sans Marque" width={400} height={200} className="mt-4 rounded-lg object-cover" />
                    </CardContent>
                </Card>
                 <Card className="bg-white/90 p-6 rounded-lg text-gray-800">
                    <CardHeader className="p-0">
                        <CardTitle className="font-bold text-xl rounded-full px-4 py-2 bg-white text-red-600 border border-red-200 inline-block">{content?.withTitle || "Avec Marque"}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-4 space-y-2">
                        {(content?.withItems || []).map((item: string, i: number) => <p key={i}>✓ {item}</p>)}
                        <Image src={content?.withImage || "https://picsum.photos/seed/avec-marque/400/200"} alt="Avec Marque" width={400} height={200} className="mt-4 rounded-lg object-cover" />
                    </CardContent>
                </Card>
            </div>
            <div className="max-w-4xl mx-auto text-center mt-12">
                <p className="font-bold text-xl"><span className="bg-white text-red-600 px-2 py-1 rounded-md">Bonus:</span> {content?.bonus || "Votre regard grandit aussi. Plus de personnes croient en votre expertise et en vos services."}</p>
                <Button asChild size="lg" className="mt-8 rounded-full bg-white text-red-600 hover:bg-gray-200 font-bold text-lg px-10 py-6">
                    <Link href="#contact">{content?.ctaButtonText || "COMMENCER"} <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
            </div>
        </div>
    </section>
)

const methodIcons = [<Zap/>, <Target/>, <Lightbulb/>, <BarChart/>];

const MethodSection = ({ content }: { content: any }) => (
    <section className="py-16 md:py-24 bg-red-700 text-white">
        <div className="container mx-auto px-4">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">{content?.title || "NOTRE MÉTHODE"}</h2>
                <div className="inline-block w-24 h-1 bg-white mt-2"></div>
            </div>
            <div className="relative mt-12 max-w-2xl mx-auto">
                {/* Connecting line */}
                <div className="absolute left-9 top-9 bottom-9 w-0.5 bg-white/30" aria-hidden="true"></div>
                <div className="space-y-12">
                    {(content?.steps || []).map((item: any, index: number) => (
                        <div key={index} className="relative flex items-start gap-6">
                            <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-white text-red-600 flex items-center justify-center border-4 border-red-700">
                                {React.cloneElement(methodIcons[index % methodIcons.length], { className: 'w-8 h-8' })}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">ÉTAPE {index + 1}</h3>
                                <h4 className="text-2xl font-headline mt-1">{item.title}</h4>
                                <p className="mt-2 text-red-200">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
             <div className="text-center mt-12">
                <Button asChild size="lg" className="rounded-full bg-white text-red-600 hover:bg-gray-200 font-bold text-lg px-10 py-6">
                    <Link href="#contact">{content?.ctaButtonText || "DEVENIR VISIBLE"} <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
            </div>
        </div>
    </section>
);


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

function PersonalBrandingContent() {
    const firestore = useFirestore();
    const pageDocRef = useMemoFirebase(() => doc(firestore, 'personal_branding_pages', 'main'), [firestore]);
    const { data: pageContent, isLoading } = useDoc(pageDocRef);

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
        <HeroSection content={pageContent?.hero} />
        <TeamSection content={pageContent?.team} />
        <ProblemSection content={pageContent?.problem} />
        <BenefitsSection content={pageContent?.benefits} />
        <ResultsSection content={pageContent?.results} />
        <MethodSection content={pageContent?.method} />
        <FinalCtaSection content={pageContent?.finalCta} />
      </main>
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
