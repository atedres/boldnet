'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/app/context/language-context';

const USFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 25" className="w-6 h-auto rounded-sm">
    <defs>
      <clipPath id="a">
        <path d="M0 0h50v25H0z" />
      </clipPath>
    </defs>
    <g clipPath="url(#a)">
      <path fill="#b22234" d="M0 0h50v25H0z" />
      <path stroke="#fff" strokeWidth="2" d="M0 2.5h50M0 7.5h50M0 12.5h50M0 17.5h50M0 22.5h50" />
      <path fill="#3c3b6e" d="M0 0h25v15H0z" />
      <path fill="#fff" d="m2.5 1.5 1 2.75-2.6-.9h3.2l-2.6.9zm5 0 1 2.75-2.6-.9h3.2l-2.6.9zm5 0 1 2.75-2.6-.9h3.2l-2.6.9zm5 0 1 2.75-2.6-.9h3.2l-2.6.9zm5 0 1 2.75-2.6-.9h3.2l-2.6.9zM5 4.5l1 2.75-2.6-.9h3.2l-2.6.9zm5 0 1 2.75-2.6-.9h3.2l-2.6.9zm5 0 1 2.75-2.6-.9h3.2l-2.6.9zm5 0 1 2.75-2.6-.9h3.2l-2.6.9zM2.5 7.5l1 2.75-2.6-.9h3.2l-2.6.9zm5 0 1 2.75-2.6-.9h3.2l-2.6.9zm5 0 1 2.75-2.6-.9h3.2l-2.6.9zm5 0 1 2.75-2.6-.9h3.2l-2.6.9zm5 0 1 2.75-2.6-.9h3.2l-2.6.9zM5 10.5l1 2.75-2.6-.9h3.2l-2.6.9zm5 0 1 2.75-2.6-.9h3.2l-2.6.9zm5 0 1 2.75-2.6-.9h3.2l-2.6.9zm5 0 1 2.75-2.6-.9h3.2l-2.6.9z" />
    </g>
  </svg>
);

const FranceFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="w-6 h-auto rounded-sm">
    <path fill="#fff" d="M0 0h900v600H0z"/>
    <path fill="#002654" d="M0 0h300v600H0z"/>
    <path fill="#ed2939" d="M600 0h300v600H600z"/>
  </svg>
);


export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {language === 'fr' ? <FranceFlag /> : <USFlag />}
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('fr')}>
          Français
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
