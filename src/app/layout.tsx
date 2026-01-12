import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/app/context/language-context';
import { FirebaseClientProvider } from '@/firebase';
import { ThemeProvider } from '@/app/components/theme-provider';
import DynamicTheme from './components/dynamic-theme';
import WhatsAppButton from './components/whatsapp-button';

export const metadata: Metadata = {
  title: 'BoldNet Digital',
  description: 'Amplify Your Brand. Dominate the Market.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
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
