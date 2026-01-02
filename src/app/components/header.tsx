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
import { useState } from 'react';

const DefaultLogo = ({className}: {className?: string}) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("h-8 w-8 text-foreground", className)}
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
  
  const logoClassName = "h-8 w-8 dark:h-10 dark:w-10 object-contain transition-all";

  if (isDark && useDarkLogo && darkLogoUrl) {
    return <Image src={darkLogoUrl} alt="BoldNet Digital Logo" width={40} height={40} className={logoClassName} />;
  }

  if (lightLogoUrl) {
    return <Image src={lightLogoUrl} alt="BoldNet Digital Logo" width={isDark ? 40 : 32} height={isDark ? 40 : 32} className={logoClassName} />;
  }
  
  return <DefaultLogo className={logoClassName} />;
}

export default function Header() {
    const { t } = useLanguage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <SiteLogo />
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
          <Button asChild className="hidden md:flex rounded-full">
            <Link href="#contact">{t('discuss')}</Link>
          </Button>
           <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
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
                    <Link href="#clients" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t('trustedBy')}</Link>
                    <Link href="#funnel" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t('highPerformanceFunnel')}</Link>
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
