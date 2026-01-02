'use client';

import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const DefaultLogo = ({ className }: {className?: string}) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("h-full w-full", className)}
    >
      <path d="M6.01,3.01L6.01,20.99L13.99,20.99C18.41,20.99 22,17.4 22,12C22,6.6,18.41,3.01,13.99,3.01L6.01,3.01ZM8.01,5.01L13.99,5.01C17.31,5.01 20,7.69 20,11C20,14.31 17.31,17 13.99,17L8.01,17L8.01,5.01Z" />
      <path d="M2,3.01L13,3.01L13,5.01L4,5.01L4,11L13,11L13,13L4,13L4,18.99L13,18.99L13,20.99L2,20.99L2,3.01Z" />
    </svg>
  );

export const SiteLogo = () => {
  const firestore = useFirestore();
  const { resolvedTheme } = useTheme();
  const settingsDocRef = useMemoFirebase(() => doc(firestore, 'theme_settings', 'main'), [firestore]);
  const { data: themeSettings, isLoading } = useDoc(settingsDocRef);

  if (isLoading) {
    return <div className="h-full w-full bg-muted rounded-md animate-pulse"></div>;
  }
  
  const isDark = resolvedTheme === 'dark';
  const useDarkLogo = themeSettings?.useDarkLogo;
  const darkLogoUrl = themeSettings?.logoUrlDark;
  const lightLogoUrl = themeSettings?.logoUrl;
  const logoTextColor = isDark ? 'text-white' : 'text-foreground';

  if (isDark && useDarkLogo && darkLogoUrl) {
    return <Image src={darkLogoUrl} alt="BoldNet Digital Logo" fill className="object-contain" />;
  }
  
  if (lightLogoUrl) {
    return <Image src={lightLogoUrl} alt="BoldNet Digital Logo" fill className="object-contain" />;
  }
  
  return <DefaultLogo className={logoTextColor} />;
}
