'use client';

import { Instagram, Linkedin, Twitter, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/app/context/language-context';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="w-full border-t">
      <div className="container flex items-center justify-between h-24 px-4 md:px-6">
        <div className="flex items-center gap-2">
           <Zap className="h-5 w-5 text-primary" />
          <p className="text-sm text-muted-foreground">
            {t('footerRights', new Date().getFullYear())}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <a href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="#" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
