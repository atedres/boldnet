'use client';

import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useTheme } from 'next-themes';

const DynamicTheme = () => {
  const firestore = useFirestore();
  const { resolvedTheme } = useTheme();
  
  const settingsDocRef = useMemoFirebase(() => doc(firestore, 'theme_settings', 'main'), [firestore]);
  const { data: themeSettings, isLoading } = useDoc(settingsDocRef);
  
  if (isLoading || !themeSettings) {
    return null;
  }

  const { primaryColor, backgroundColor } = themeSettings;

  // Define default light/dark values
  const defaultLight = {
    primary: '0 84.2% 60.2%',
    background: '0 0% 100%',
  };
  const defaultDark = {
    primary: '0 72.2% 50.6%',
    background: '224 71.4% 4.1%',
  };
  
  // Use DB value or default based on theme
  const finalPrimary = primaryColor || (resolvedTheme === 'dark' ? defaultDark.primary : defaultLight.primary);
  const finalBackground = backgroundColor || (resolvedTheme === 'dark' ? defaultDark.background : defaultLight.background);

  const css = `
    :root {
      --primary: ${finalPrimary};
    }
    body {
        --background: ${finalBackground};
    }
    .dark {
        --primary: ${primaryColor || defaultDark.primary};
    }
    .dark body {
        --background: ${backgroundColor || defaultDark.background};
    }
  `;

  return <style>{css}</style>;
};

export default DynamicTheme;
