'use client';

import React, { useEffect } from 'react';
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
    if (!bodyFont && !headlineFont) return;

    // Filter out potential empty font names and format for URL
    const fontFamilies = [headlineFont, bodyFont]
        .filter(Boolean) // Remove any falsy values
        .map(font => font.replace(/\s/g, '+') + ':wght@400;500;600;700');
    
    if (fontFamilies.length === 0) return;

    const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${fontFamilies.join('&family=')}&display=swap`;

    // Check if a link for Google Fonts already exists and update it
    let link = document.querySelector<HTMLLinkElement>('link[data-dynamic-gfonts]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.setAttribute('data-dynamic-gfonts', 'true');
      document.head.appendChild(link);
    }
    
    if (link.href !== googleFontsUrl) {
      link.href = googleFontsUrl;
    }

  }, [bodyFont, headlineFont]);

  return <DynamicFontVariables bodyFont={bodyFont} headlineFont={headlineFont} />;
}

export default DynamicFontLoader;
