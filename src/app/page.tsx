'use client';

import Header from '@/app/components/header';
import Hero from '@/app/components/hero';
import DynamicSections from '@/app/components/dynamic-sections';
import Footer from '@/app/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-transparent">
      <Header />
      <main className="flex-1">
        <Hero />
        <DynamicSections />
      </main>
      <Footer />
    </div>
  );
}

    