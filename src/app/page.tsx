'use client';

import Header from '@/app/components/header';
import Hero from '@/app/components/hero';
import ClientShowcase from '@/app/components/client-showcase';
import ServicesOverview from '@/app/components/services-overview';
import FunnelDisplay from '@/app/components/funnel-display';
import ContactSection from '@/app/components/contact-section';
import Footer from '@/app/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <ClientShowcase />
        <ServicesOverview />
        <FunnelDisplay />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
