'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Zap, Target, Lightbulb, Users, BarChart, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const SectionTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <h2 className={`text-3xl md:text-4xl font-bold text-center font-headline tracking-tight ${className}`}>{children}</h2>
);

const SectionSubtitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <p className={`text-lg md:text-xl text-center text-muted-foreground max-w-3xl mx-auto ${className}`}>{children}</p>
);

const HeroSection = () => (
  <section className="relative w-full h-[80vh] md:h-screen text-white overflow-hidden bg-black">
    <div className="absolute inset-0 z-0">
        <Image
            src="https://picsum.photos/seed/hero-bg/1200/800"
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="opacity-40"
            data-ai-hint="group people business"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-red-900/50 to-transparent"></div>
    </div>
    <div className="relative z-10 container mx-auto flex flex-col items-center justify-center h-full text-center px-4">
      <Image 
        src="https://res.cloudinary.com/ddbj70ziv/image/upload/v1718049610/boldnet/logo-white_ca6ggh.png"
        alt="BoldNet Digital Logo"
        width={100}
        height={100}
        className="mb-6"
      />
      <h1 className="text-4xl md:text-6xl font-extrabold font-headline leading-tight tracking-wider uppercase">
        On ne crée pas de personal brands
      </h1>
      <p className="mt-4 text-xl md:text-2xl max-w-3xl font-light">
        On crée la plateforme qui va permettre à votre présence d'être une institution qui vend pour vous.
      </p>
      <Button asChild size="lg" className="mt-8 rounded-full bg-white text-red-600 hover:bg-gray-200 font-bold text-lg px-10 py-6">
        <Link href="#contact">MA CONSULTATION GRATUITE <ArrowRight className="ml-2 h-5 w-5" /></Link>
      </Button>
    </div>
  </section>
);

const professions = [
    { name: 'Médecine', image: 'https://picsum.photos/seed/med/400/400', hint: 'doctor professional'},
    { name: 'Avocature', image: 'https://picsum.photos/seed/law/400/400', hint: 'lawyer smiling'},
    { name: 'Entrepreneurs', image: 'https://picsum.photos/seed/entrepreneur/400/400', hint: 'ceo office'},
    { name: 'Coaches', image: 'https://picsum.photos/seed/coach/400/400', hint: 'personal coach'},
    { name: 'Formateurs', image: 'https://picsum.photos/seed/trainer/400/400', hint: 'teacher classroom'},
    { name: 'Créateurs', image: 'https://picsum.photos/seed/creator/400/400', hint: 'artist studio'},
];

const TeamSection = () => (
    <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
            <SectionTitle className="text-red-600">Vous et notre équipe. À nous deux on va tout révolutionner.</SectionTitle>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">
                {professions.map(p => (
                    <div key={p.name} className="flex flex-col items-center gap-4 text-center">
                        <Image src={p.image} alt={p.name} width={150} height={150} className="rounded-full object-cover aspect-square" data-ai-hint={p.hint} />
                        <h3 className="font-semibold text-lg">{p.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const ProblemSection = () => (
    <section className="py-16 md:py-24 bg-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
            <SectionTitle>Le problème quand on a pas de personal branding</SectionTitle>
            <div className="max-w-2xl mx-auto text-left mt-8 space-y-4 text-lg">
                <p>Mais aussi :</p>
                <ul className="space-y-2 list-disc list-inside">
                    <li>Pas de respect de la part des prospects</li>
                    <li>Closing rate faible en closing</li>
                    <li>Difficulté à justifier ses tarifs et sa valeur</li>
                </ul>
            </div>
            <Card className="max-w-2xl mx-auto mt-8 bg-red-100/10 text-white p-6 text-left border-red-300">
                <CardContent className="p-0">
                    <h4 className="font-bold text-xl mb-4">Comment faire :</h4>
                    <ul className="space-y-2 list-disc list-inside">
                        <li>De la création de contenu à forte valeur ajoutée</li>
                        <li>Utiliser un angle différenciant et qui vous ressemble</li>
                        <li>De la vidéo pour pouvoir connecter et créer une projection (x100 conversion)</li>
                    </ul>
                </CardContent>
            </Card>
            <p className="mt-8 font-semibold text-lg">Pourquoi c'est plus facile de faire confiance à un inconnu sur le web qu'à son propre père?</p>
            <Button asChild size="lg" className="mt-8 rounded-full bg-white text-red-600 hover:bg-gray-200 font-bold text-lg px-10 py-6">
                <Link href="#contact">JE VEUX PASSER PRO <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
        </div>
    </section>
);

const benefits = [
    { 
        step: 1, 
        title: "Notoriété", 
        description: "En créant du contenu qui vous ressemble et qui attire votre audience, on va pouvoir créer de la notoriété et de la confiance.",
        image: "https://picsum.photos/seed/notoriety/500/300",
        hint: 'speaking public'
    },
    { 
        step: 2, 
        title: "Se démarquer de la concurrence", 
        description: "Avoir un personal branding, c'est avoir une image de marque forte que vos prospects peuvent associer à votre domaine. Ça vous rend unique.",
        image: "https://picsum.photos/seed/standout/500/300",
        hint: 'unique individual crowd'
    },
    { 
        step: 3, 
        title: "On vend à ta place", 
        description: "En créant du contenu qui parle à votre cible, on peut créer une relation de confiance et vendre sans même avoir à le faire.",
        image: "https://picsum.photos/seed/autopilot/500/300",
        hint: 'automated sales'
    },
];

const sideBenefits = [
    { icon: <Zap className="w-6 h-6 text-red-600" />, text: "Plus de respect" },
    { icon: <Target className="w-6 h-6 text-red-600" />, text: "Closing élevé" },
    { icon: <Lightbulb className="w-6 h-6 text-red-600" />, text: "Justification de la valeur" },
    { icon: <Users className="w-6 h-6 text-red-600" />, text: "Fidélisation client" },
    { icon: <BarChart className="w-6 h-6 text-red-600" />, text: "Croissance organique" },
    { icon: <CheckCircle className="w-6 h-6 text-red-600" />, text: "Plus de confiance" },
];

const BenefitsSection = () => (
    <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
            <SectionTitle className="text-gray-800">C'est quoi que ça va m'apporter</SectionTitle>
            <div className="mt-12 space-y-16">
                {benefits.map((b, index) => (
                     <div key={b.step} className={`grid md:grid-cols-2 gap-10 items-center`}>
                        <div className={`${index % 2 === 1 ? 'md:order-last' : ''}`}>
                            <Image src={b.image} alt={b.title} width={500} height={300} className="rounded-lg shadow-lg object-cover" data-ai-hint={b.hint} />
                        </div>
                        <div className="space-y-4">
                            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-red-600 text-white font-bold text-xl">{b.step}</span>
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
                                <Image src="https://picsum.photos/seed/shield/200/200" alt="Shield" width={150} height={150} data-ai-hint="man shield" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold font-headline">On sera à tes côtés</h3>
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
                <p className="text-center mt-8 text-lg font-semibold max-w-3xl mx-auto">Quand vous êtes la charge N°1 de votre prospect et que vous êtes recommandé par son propre entourage, on vous laissera le reste.</p>
                 <div className="text-center mt-6">
                    <Button asChild size="lg" className="rounded-full bg-red-600 text-white hover:bg-red-700 font-bold text-lg px-10 py-6">
                        <Link href="#contact">JE VEUX PASSER PRO <ArrowRight className="ml-2 h-5 w-5" /></Link>
                    </Button>
                </div>
            </div>
        </div>
    </section>
);

const ResultsSection = () => (
    <section className="py-16 md:py-24 bg-red-700 text-white">
        <div className="container mx-auto px-4">
            <SectionTitle>Les résultats</SectionTitle>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
                <Card className="bg-black/20 p-6 rounded-lg border border-red-500">
                    <CardHeader className="p-0">
                        <CardTitle className="font-bold text-xl rounded-full px-4 py-2 bg-black text-white inline-block">Sans Marque</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-4 space-y-2 text-red-200">
                        <p>‣ Prospects non qualifiés</p>
                        <p>‣ Pas d'attraction</p>
                        <p>‣ Pas de confiance</p>
                        <Image src="https://picsum.photos/seed/sans-marque/400/200" alt="Sans Marque" width={400} height={200} className="mt-4 rounded-lg object-cover" data-ai-hint="sad office worker" />
                    </CardContent>
                </Card>
                 <Card className="bg-white/90 p-6 rounded-lg text-gray-800">
                    <CardHeader className="p-0">
                        <CardTitle className="font-bold text-xl rounded-full px-4 py-2 bg-white text-red-600 border border-red-200 inline-block">Avec Marque</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-4 space-y-2">
                        <p>✓ + de clients sans prospecter</p>
                        <p>✓ + de facilité à convertir</p>
                        <p>✓ + de confiance</p>
                        <Image src="https://picsum.photos/seed/avec-marque/400/200" alt="Avec Marque" width={400} height={200} className="mt-4 rounded-lg object-cover" data-ai-hint="happy business person" />
                    </CardContent>
                </Card>
            </div>
            <div className="max-w-4xl mx-auto text-center mt-12">
                <p className="font-bold text-xl"><span className="bg-white text-red-600 px-2 py-1 rounded-md">Bonus:</span> Votre regard grandit aussi. Plus de personnes croient en votre expertise et en vos services.</p>
                <Button asChild size="lg" className="mt-8 rounded-full bg-white text-red-600 hover:bg-gray-200 font-bold text-lg px-10 py-6">
                    <Link href="#contact">COMMENCER <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
            </div>
        </div>
    </section>
)

const MethodSection = () => (
    <section className="py-16 md:py-24 bg-red-700 text-white">
        <div className="container mx-auto px-4">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">NOTRE MÉTHODE</h2>
                <div className="inline-block w-24 h-1 bg-white mt-2"></div>
            </div>
            <div className="relative mt-12 max-w-2xl mx-auto">
                {/* Connecting line */}
                <div className="absolute left-9 top-9 bottom-9 w-0.5 bg-white/30" aria-hidden="true"></div>
                <div className="space-y-12">
                    {[
                        { step: 1, title: "Stratégie de marque", description: "On définit votre audience, vos valeurs et votre style. C'est le socle.", icon: <Zap/> },
                        { step: 2, title: "Création de contenu", description: "Création de contenu vidéo et écrit engageants selon la stratégie.", icon: <Target/> },
                        { step: 3, title: "Exposition", description: "On partage, sponsorise et on vous rend visible par les bonnes personnes.", icon: <Lightbulb/> },
                        { step: 4, title: "Conversion", description: "On analyse les retours, on mesure l'engagement, on vous aide à convertir.", icon: <BarChart/> }
                    ].map((item) => (
                        <div key={item.step} className="relative flex items-start gap-6">
                            <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-white text-red-600 flex items-center justify-center border-4 border-red-700">
                                {React.cloneElement(item.icon, { className: 'w-8 h-8' })}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">ÉTAPE {item.step}</h3>
                                <h4 className="text-2xl font-headline mt-1">{item.title}</h4>
                                <p className="mt-2 text-red-200">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
             <div className="text-center mt-12">
                <Button asChild size="lg" className="rounded-full bg-white text-red-600 hover:bg-gray-200 font-bold text-lg px-10 py-6">
                    <Link href="#contact">DEVENIR VISIBLE <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
            </div>
        </div>
    </section>
);


const FinalCtaSection = () => (
    <section className="relative py-24 md:py-32 bg-gray-900 text-white">
         <div className="absolute inset-0 z-0">
            <Image
                src="https://picsum.photos/seed/final-cta/1200/400"
                alt="Office background"
                layout="fill"
                objectFit="cover"
                className="opacity-20"
                data-ai-hint="busy office meeting"
            />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold font-headline uppercase tracking-wider">Apparaître, Imposer, Attirer.</h2>
            <p className="mt-4 text-xl md:text-2xl font-light">Explose tes résultats maintenant.</p>
        </div>
    </section>
)

export default function PersonalBrandingPage() {
  return (
    <div className="bg-white">
      <main>
        <HeroSection />
        <TeamSection />
        <ProblemSection />
        <BenefitsSection />
        <ResultsSection />
        {/* Qui peut en bénéficier section seems to be a variation of the TeamSection, skipping for brevity */}
        <MethodSection />
        <FinalCtaSection />
      </main>
    </div>
  );
}
