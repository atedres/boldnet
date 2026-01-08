'use client';

import Header from '@/app/components/header';
import Hero from '@/app/components/hero';
import DynamicSections from '@/app/components/dynamic-sections';
import ContactSection from '@/app/components/contact-section';
import Footer from '@/app/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 -mt-20">
        <Hero />
        <DynamicSections />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
