'use client';

import { Instagram, Linkedin, Facebook, Zap, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/language-context';

export default function Footer() {
  const { t } = useLanguage();
  
  const navLinks = [
    { href: '#services', label: t('ourServices') },
    { href: '#funnel', label: t('highPerformanceFunnel') },
    { href: '#testimonials', label: t('testimonials') },
    { href: '#team', label: t('team') },
    { href: '#blog', label: t('blog') },
    { href: '#contact', label: t('contactUs') }
  ];

  return (
    <footer className="w-full bg-background dark:bg-gray-900 text-muted-foreground dark:text-gray-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground dark:text-white">BoldNet Digital</span>
            </div>
            <p className="max-w-sm mt-4 text-sm">
                Amplifiez votre marque. Dominez le marché. Nous aidons les entreprises ambitieuses à créer des expériences numériques qui génèrent des résultats.
            </p>
             <div className="flex mt-6 -mx-2">
              <a href="https://www.instagram.com/boldnetdigital/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="mx-2 text-muted-foreground dark:text-gray-400 transition-colors duration-300 hover:text-primary">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://web.facebook.com/profile.php?id=61580707476970" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="mx-2 text-muted-foreground dark:text-gray-400 transition-colors duration-300 hover:text-primary">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="mx-2 text-muted-foreground dark:text-gray-400 transition-colors duration-300 hover:text-primary">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-foreground dark:text-white uppercase">Navigation</h3>
            <div className="flex flex-col items-start mt-4 space-y-4">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} className="transition-colors duration-300 hover:underline hover:text-primary">{link.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-foreground dark:text-white uppercase">Contact</h3>
            <div className="flex flex-col items-start mt-4 space-y-4">
                <p className="flex items-center gap-2">
                    <Mail className="w-5 h-5"/>
                    <span>contact@boldnet.ma</span>
                </p>
                <p className="flex items-center gap-2">
                    <Phone className="w-5 h-5"/>
                    <span>+212 6 93 37 99 21</span>
                </p>
                 <p className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0"/>
                    <span>Technopark Casablanca, <br />P.S, Casablanca 20270, Maroc</span>
                </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-foreground dark:text-white uppercase">Légal</h3>
            <div className="flex flex-col items-start mt-4 space-y-4">
              <a href="#" className="transition-colors duration-300 hover:underline hover:text-primary">Mentions légales</a>
              <a href="#" className="transition-colors duration-300 hover:underline hover:text-primary">Politique de confidentialité</a>
            </div>
          </div>
        </div>

        <hr className="my-6 border-border dark:border-gray-700" />

        <div className="text-center">
          <p className="text-sm">
            {t('footerRights', new Date().getFullYear())}
          </p>
        </div>
      </div>
    </footer>
  );
}