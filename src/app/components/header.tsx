'use client'

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LanguageSwitcher from '@/app/components/language-switcher';
import { ThemeSwitcher } from './theme-switcher';
import { useLanguage } from '@/app/context/language-context';
import { doc } from 'firebase/firestore';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';

const DefaultLogo = ({className}: {className?: string}) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("h-8 w-8", className)}
    >
      <path d="M6.01,3.01L6.01,20.99L13.99,20.99C18.41,20.99 22,17.4 22,12C22,6.6,18.41,3.01,13.99,3.01L6.01,3.01ZM8.01,5.01L13.99,5.01C17.31,5.01 20,7.69 20,11C20,14.31 17.31,17 13.99,17L8.01,17L8.01,5.01Z" />
      <path d="M2,3.01L13,3.01L13,5.01L4,5.01L4,11L13,11L13,13L4,13L4,18.99L13,18.99L13,20.99L2,20.99L2,3.01Z" />
    </svg>
  );

const SiteLogo = () => {
  const firestore = useFirestore();
  const { resolvedTheme } = useTheme();
  const settingsDocRef = useMemoFirebase(() => doc(firestore, 'theme_settings', 'main'), [firestore]);
  const { data: themeSettings, isLoading } = useDoc(settingsDocRef);
  const isDark = resolvedTheme === 'dark';

  if (isLoading) {
    return <div className="h-8 w-8 bg-muted rounded-md animate-pulse"></div>;
  }
  
  const useDarkLogo = themeSettings?.useDarkLogo;
  const darkLogoUrl = themeSettings?.logoUrlDark;
  const lightLogoUrl = themeSettings?.logoUrl;
  
  const logoClassName = "h-8 w-8 object-contain transition-all";
  const logoTextColor = 'text-white';


  if (isDark && useDarkLogo && darkLogoUrl) {
    return <Image src={darkLogoUrl} alt="BoldNet Digital Logo" width={32} height={32} className={logoClassName} />;
  }

  if (lightLogoUrl) {
    return <Image src={lightLogoUrl} alt="BoldNet Digital Logo" width={32} height={32} className={cn(logoClassName, 'dark:brightness-0 dark:invert-0 brightness-0 invert')}/>;
  }
  
  return <DefaultLogo className={cn(logoClassName, logoTextColor)} />;
}

export default function Header() {
    const { t } = useLanguage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinkClasses = "text-white/90 hover:text-white transition-colors font-medium";

  return (
    <header className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled ? 'bg-black/50 backdrop-blur-sm' : 'bg-transparent'
    )}>
      <div className="container flex h-20 items-center">
        <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center space-x-2">
            <SiteLogo />
            </Link>
        </div>
        
        <nav className="hidden md:flex items-center justify-center gap-6 text-sm flex-1">
            <Link href="#services" className={navLinkClasses}>
                {t('ourServices')}
            </Link>
             <Link href="#funnel" className={navLinkClasses}>
                {t('highPerformanceFunnel')}
            </Link>
             <Link href="#testimonials" className={navLinkClasses}>
                {t('testimonials')}
            </Link>
            <Link href="#team" className={navLinkClasses}>
                {t('team')}
            </Link>
             <Link href="#blog" className={navLinkClasses}>
                {t('blog')}
            </Link>
             <Link href="#contact" className={navLinkClasses}>
                {t('contactUs')}
            </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <Button asChild className="hidden md:flex rounded-full bg-white text-primary hover:bg-white/90">
            <Link href="#contact">{t('discuss')}</Link>
          </Button>
           <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10 hover:text-white">
                    <Menu />
                    <span className="sr-only">Open menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <div className="flex flex-col gap-6 pt-10">
                    <Link href="/" className="flex items-center space-x-2 mb-4">
                        <SiteLogo />
                    </Link>
                    <Link href="#services" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t('ourServices')}</Link>
                    <Link href="#funnel" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t('highPerformanceFunnel')}</Link>
                    <Link href="#testimonials" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t('testimonials')}</Link>
                    <Link href="#team" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t('team')}</Link>
                    <Link href="#blog" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t('blog')}</Link>
                    <Link href="#contact" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t('contactUs')}</Link>
                     <Button asChild className="mt-4">
                        <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)}>{t('discuss')}</Link>
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
        </div>
      </div>
    </header>
  );
}
