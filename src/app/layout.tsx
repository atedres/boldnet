import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/app/context/language-context';
import { FirebaseClientProvider } from '@/firebase';
import { ThemeProvider } from '@/app/components/theme-provider';
import DynamicTheme from './components/dynamic-theme';
import WhatsAppButton from './components/whatsapp-button';
import { doc, getDoc } from 'firebase/firestore';
import { DynamicFontVariables } from './components/dynamic-font-variables';
import { getSdks } from '@/firebase/index.server';
import DynamicFontLoader from './components/dynamic-font-loader';

export const metadata: Metadata = {
  title: 'BoldNet Digital',
  description: 'Amplify Your Brand. Dominate the Market.',
};

async function getThemeSettings() {
  try {
    const { firestore } = await getSdks();
    const settingsDoc = await getDoc(doc(firestore, 'theme_settings', 'main'));
    if (settingsDoc.exists()) {
      return settingsDoc.data();
    }
  } catch (error) {
    console.error("Could not fetch theme settings on server:", error);
  }
  return null;
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeSettings = await getThemeSettings();
  const bodyFont = themeSettings?.bodyFontFamily || 'Inter';
  const headlineFont = themeSettings?.headlineFontFamily || 'Clash Display';

  const fontFamiliesForUrl = [
    headlineFont.replace(/\s/g, '+') + ':wght@400;500;600;700',
    bodyFont.replace(/\s/g, '+') + ':wght@400;500;600;700;800;900',
  ];
  
  const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${fontFamiliesForUrl.join('&family=')}&display=swap`;

  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@700,500,600,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <LanguageProvider>
              <DynamicTheme />
              <DynamicFontLoader />
              {children}
              <WhatsAppButton phoneNumber="+212719802571" />
              <Toaster />
            </LanguageProvider>
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
