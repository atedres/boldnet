'use client';

import { useEffect } from 'react';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { DynamicFontVariables } from './dynamic-font-variables';

function DynamicFontLoader() {
  const firestore = useFirestore();
  const settingsDocRef = useMemoFirebase(() => doc(firestore, 'theme_settings', 'main'), [firestore]);
  const { data: themeSettings } = useDoc(settingsDocRef);

  const bodyFont = themeSettings?.bodyFontFamily || 'Inter';
  const headlineFont = themeSettings?.headlineFontFamily || 'Clash Display';

  useEffect(() => {
    const fontFamiliesForUrl = [
      headlineFont.replace(/\s/g, '+') + ':wght@400;500;600;700',
      bodyFont.replace(/\s/g, '+') + ':wght@400;500;600;700;800;900',
    ];
    const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${fontFamiliesForUrl.join('&family=')}&display=swap`;

    // Check if the link already exists
    if (document.querySelector(`link[href="${googleFontsUrl}"]`)) {
      return;
    }
    
    const link = document.createElement('link');
    link.href = googleFontsUrl;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
        // Optional: cleanup the link tag if the component unmounts
        // document.head.removeChild(link);
    }
  }, [bodyFont, headlineFont]);

  return <DynamicFontVariables bodyFont={bodyFont} headlineFont={headlineFont} />;
}

export default DynamicFontLoader;
