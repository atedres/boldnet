'use client'

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LanguageSwitcher from '@/app/components/language-switcher';
import { ThemeSwitcher } from './theme-switcher';
import { useLanguage } from '@/app/context/language-context';

const BDLogo = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-8 w-8 text-foreground"
    >
      <path d="M6.01,3.01L6.01,20.99L13.99,20.99C18.41,20.99 22,17.4 22,12C22,6.6,18.41,3.01,13.99,3.01L6.01,3.01ZM8.01,5.01L13.99,5.01C17.31,5.01 20,7.69 20,11C20,14.31 17.31,17 13.99,17L8.01,17L8.01,5.01Z" />
      <path d="M2,3.01L13,3.01L13,5.01L4,5.01L4,11L13,11L13,13L4,13L4,18.99L13,18.99L13,20.99L2,20.99L2,3.01Z" />
    </svg>
  );

export default function Header() {
    const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <BDLogo />
          <span className="font-bold text-lg inline-block font-headline">
            BoldNet Digital
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="#services" className="transition-colors hover:text-foreground/80 text-foreground/80 font-medium">
                {t('ourServices')}
            </Link>
            <Link href="#clients" className="transition-colors hover:text-foreground/80 text-foreground/80 font-medium">
                {t('trustedBy')}
            </Link>
             <Link href="#funnel" className="transition-colors hover:text-foreground/80 text-foreground/80 font-medium">
                {t('highPerformanceFunnel')}
            </Link>
             <Link href="#contact" className="transition-colors hover:text-foreground/80 text-foreground/80 font-medium">
                {t('contactUs')}
            </Link>
        </nav>

        <div className="flex items-center justify-end space-x-2">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <Button asChild className="hidden md:flex bg-gray-900 text-white hover:bg-gray-800 rounded-full">
            <Link href="#contact">{t('discuss')}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
