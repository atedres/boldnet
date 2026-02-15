'use client';

import { ArrowLeft, CheckCircle, ChevronDown, Lightbulb, Megaphone, Plus, Star, Tv, Video, Zap, MousePointerClick, RefreshCw, CircleDollarSign, TrendingUp, UserPlus, Film, Bot, PenSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { FirebaseClientProvider } from '@/firebase';
import { motion } from 'framer-motion';
import { SiteLogo } from './personal-branding/components';
import Link from 'next/link';

const Section = ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <section className={`py-16 md:py-24 ${className}`} {...props}>
        <div className="container mx-auto px-4">
            {children}
        </div>
    </section>
);

const SectionTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <h2 className={`text-3xl md:text-5xl font-bold text-center font-headline ${className}`}>{children}</h2>
);


const HeroSection = () => (
    <Section className="bg-gray-900 text-white text-center !py-0">
        <div className="relative h-[50vh] md:h-[60vh] flex items-center justify-center">
            <Image src="https://picsum.photos/seed/ugc-hero/1200/800" layout="fill" objectFit="cover" alt="Video Shoot" className="opacity-30" />
            <div className="relative z-10">
                <div className="flex justify-center mb-4">
                    <SiteLogo />
                </div>
                <h1 className="text-3xl md:text-5xl font-bold max-w-3xl mx-auto">
                    BOLDNET ليست الخيار المناسب لك إذا كنت تبحث عن فيديوهات UGC عادية
                </h1>
            </div>
        </div>
    </Section>
);

const ProblemSection = () => (
    <Section className="bg-white">
        <div className="text-center">
            <div className="flex justify-center items-center gap-4">
                 <Image src="https://picsum.photos/seed/megaphone/200/200" width={150} height={150} alt="Megaphone" className="rounded-full" data-ai-hint="woman megaphone" />
                <div>
                    <h2 className="text-red-600 text-4xl md:text-6xl font-bold font-headline">الحل في BOLDNET</h2>
                    <p className="max-w-md mx-auto mt-2 text-gray-600">
                        لأن 95% من البراندات تفشل في تحقيق أهدافها التسويقية بسبب ضعف المحتوى البصري.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 max-w-3xl mx-auto mt-12">
                <div className="text-center"><MousePointerClick className="w-8 h-8 mx-auto text-red-600" /><p>CTR</p></div>
                <div className="text-center"><RefreshCw className="w-8 h-8 mx-auto text-red-600" /><p>CONV</p></div>
                <div className="text-center"><CircleDollarSign className="w-8 h-8 mx-auto text-red-600" /><p>AOV</p></div>
                <div className="text-center"><TrendingUp className="w-8 h-8 mx-auto text-red-600" /><p>ROAS</p></div>
                <div className="text-center"><UserPlus className="w-8 h-8 mx-auto text-red-600" /><p>C.ACQ</p></div>
            </div>
            <Button asChild size="lg" className="mt-12 bg-red-600 hover:bg-red-700 text-white text-lg">
                <Link href="#contact">خذ أفضل ما في السوق وبأقل تكلفة من BOLDNET</Link>
            </Button>
        </div>
    </Section>
);

const ChecklistSection = () => (
    <Section className="bg-red-600 text-white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <p>من خلال خبرة مدتها 3 سنوات في التجارة الإلكترونية، اكتشفنا أن أفضل الممارسات التسويقية هي:</p>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3"><CheckCircle /> فيديوهات إحترافية</li>
                    <li className="flex items-center gap-3"><CheckCircle /> محتوى متجدد</li>
                    <li className="flex items-center gap-3"><CheckCircle /> مواكبة الترند</li>
                </ul>
                <p>ولكن هذا ما سيكلفك...</p>
                 <ul className="space-y-3">
                    <li className="flex items-center gap-3"><ChevronDown /> تكلفة الإعلانات</li>
                    <li className="flex items-center gap-3"><ChevronDown /> فريق تسويق</li>
                    <li className="flex items-center gap-3"><ChevronDown /> توظيف وتدريب</li>
                </ul>
            </div>
            <div>
                <Image src="https://picsum.photos/seed/checklist-man/500/500" width={500} height={500} alt="Happy man" className="rounded-full" data-ai-hint="man laptop thumbs up"/>
            </div>
        </div>
    </Section>
);

const PainPointSection = () => (
    <Section className="bg-white">
        <div className="text-center mb-8">
            <p className="text-gray-500 text-lg">ما سئمت من هذا الوضع؟</p>
            <SectionTitle className="text-red-600">لهذا أغلب البراندات فيديوهاتها كلها متشابهة</SectionTitle>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
             <div>
                <Image src="https://picsum.photos/seed/confused-woman/500/500" width={500} height={500} alt="Confused woman" className="rounded-lg" data-ai-hint="woman confused phone" />
            </div>
            <div className="space-y-4">
                <Card className="p-4 bg-red-50 border-red-200"><p>تعرف أن المنافسين يقلدونها بعد مدة فقط</p></Card>
                <Card className="p-4 bg-red-50 border-red-200"><p>تضطر لدفع مبالغ ضخمة للمؤثرين</p></Card>
                <Card className="p-4 bg-red-50 border-red-200"><p>لا تجد صناع محتوى UGC</p></Card>
            </div>
        </div>
    </Section>
);

const FocusSection = () => (
    <Section className="bg-red-600 text-white">
         <SectionTitle>في BOLDNET نركز على العكس <Plus className="inline-block" /></SectionTitle>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="md:col-span-1 bg-white/10 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-4">كل ما عليك هو أن ترسل لنا منتجك والباقي علينا</h3>
                <p>نحن نتكفل بكل شيء من الألف إلى الياء لنوفر لك محتوى يبيع.</p>
            </div>
             <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Card className="bg-white/20 p-4 text-center"><PenSquare className="w-10 h-10 mx-auto mb-2" /><p>أفكار إبداعية</p></Card>
                <Card className="bg-white/20 p-4 text-center"><Users className="w-10 h-10 mx-auto mb-2" /><p>صناع محتوى</p></Card>
                <Card className="bg-white/20 p-4 text-center"><PenTool className="w-10 h-10 mx-auto mb-2" /><p>كتابة السيناريو</p></Card>
                <Card className="bg-white/20 p-4 text-center"><Camera className="w-10 h-10 mx-auto mb-2" /><p>تصوير احترافي</p></Card>
                <Card className="bg-white/20 p-4 text-center"><Lamp className="w-10 h-10 mx-auto mb-2" /><p>بناء الديكور</p></Card>
                <Card className="bg-white/20 p-4 text-center"><Film className="w-10 h-10 mx-auto mb-2" /><p>مونتاج احترافي</p></Card>
            </div>
        </div>
    </Section>
);

const MetaSection = () => (
    <Section className="bg-white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
                 <Image src="https://picsum.photos/seed/meta-guy/500/300" width={500} height={300} alt="Man with laptop" className="rounded-lg" data-ai-hint="man business suit laptop"/>
            </div>
            <div className="text-center">
                <Bot className="w-20 h-20 mx-auto text-blue-600 mb-4"/>
                <p className="bg-red-600 text-white p-4 rounded-lg text-lg">نعرف ما تريد META وهذا ما نوفره لها، لا نكتفي بالفيديو الجميل بل بفعاليته</p>
            </div>
        </div>
    </Section>
);

const TimelineSection = () => (
    <Section className="bg-white text-center">
        <Plus className="w-10 h-10 mx-auto text-red-600 bg-red-100 rounded-full p-2 mb-8" />
        <div className="relative max-w-sm mx-auto">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div className="space-y-12">
                <div className="relative flex items-center gap-8"><div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center z-10">1</div><p>استلام المنتج</p></div>
                <div className="relative flex items-center gap-8 flex-row-reverse"><div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center z-10">2</div><p>تحليل المنتج</p></div>
                <div className="relative flex items-center gap-8"><div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center z-10">3</div><p>التصوير</p></div>
                <div className="relative flex items-center gap-8 flex-row-reverse"><div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center z-10">4</div><p>المونتاج</p></div>
            </div>
        </div>
        <p className="mt-8 text-gray-600">وفي النهاية تحصل على فيديو إعلاني احترافي يبيع</p>
    </Section>
);

const WeDoEverythingSection = () => (
    <Section className="bg-red-100">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
                 <Image src="https://picsum.photos/seed/woman-camera/500/500" width={500} height={500} alt="Woman with camera" className="rounded-lg" data-ai-hint="woman laptop camera" />
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-red-600 font-headline mb-4">BOLDNET نقوم بكل شيء</h2>
                <ul className="space-y-3 text-gray-700">
                    <li>✓ فيديوهات إعلانية احترافية عالية الجودة</li>
                    <li>✓ فريق من صناع المحتوى والممثلين</li>
                    <li>✓ سيناريوهات وحوارات احترافية ومبيعية</li>
                    <li>✓ مونتاج احترافي وموسيقى بدون حقوق ملكية</li>
                </ul>
                 <Button asChild size="lg" className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white text-lg">
                    <Link href="#contact">لتطوير عملك</Link>
                </Button>
                <p className="text-center text-sm text-gray-500 mt-2">شاهد كيف سنساعدك في تحقيق أهدافك</p>
            </div>
        </div>
    </Section>
);

const GoalsSection = () => (
    <Section className="bg-white text-center">
        <SectionTitle className="text-red-600">أما إن كنت تريد</SectionTitle>
         <div className="relative max-w-2xl mx-auto mt-8">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center z-10"><Plus /></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16">
            <div className="bg-red-600 text-white p-4 rounded-lg">زيادة المبيعات</div>
            <div className="bg-red-600 text-white p-4 rounded-lg">الوعي</div>
            <div className="bg-red-600 text-white p-4 rounded-lg">CTR</div>
            <div className="bg-red-600 text-white p-4 rounded-lg">CVR</div>
        </div>
        <p className="mt-8 text-xl font-bold">أنت في المكان المناسب في الوقت المناسب</p>
    </Section>
);

function UgcOfferContent() {
    return (
        <main dir="rtl" className="bg-white text-gray-800 font-sans">
            <HeroSection />
            <ProblemSection />
            <ChecklistSection />
            <PainPointSection />
            <FocusSection />
            <MetaSection />
            <TimelineSection />
            <WeDoEverythingSection />
            <GoalsSection />
            <div id="contact">
                <Section className="bg-gray-100">
                    <h2 className="text-3xl font-bold text-center mb-8">تواصل معنا</h2>
                     <p className="text-center text-muted-foreground max-w-2xl mx-auto">
                        املأ النموذج أدناه وسيقوم فريقنا بالرد عليك في أقرب وقت ممكن لمناقشة كيف يمكننا مساعدتك في تحقيق أهدافك.
                    </p>
                    <div className="max-w-xl mx-auto mt-8">
                        {/* A simplified contact form can be placed here if needed */}
                         <Card className="p-8">
                            <Link href="/quote">
                                 <Button size="lg" className="w-full text-lg">اطلب عرض سعر الآن</Button>
                            </Link>
                        </Card>
                    </div>
                </Section>
            </div>
        </main>
    );
}

export default function UgcOfferPage() {
    return (
        <FirebaseClientProvider>
            <UgcOfferContent />
        </FirebaseClientProvider>
    );
}
