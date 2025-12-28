import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LanguageSwitcher from '@/app/components/language-switcher';
import { ThemeSwitcher } from './theme-switcher';

const BDLogo = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6 text-primary"
    >
      <path d="M6.01,3.01L6.01,20.99L13.99,20.99C18.41,20.99 22,17.4,22,12C22,6.6,18.41,3.01,13.99,3.01L6.01,3.01ZM8.01,5.01L13.99,5.01C17.31,5.01 20,7.69 20,11C20,14.31 17.31,17 13.99,17L8.01,17L8.01,5.01Z" />
      <path d="M2,3.01L13,3.01L13,5.01L4,5.01L4,11L13,11L13,13L4,13L4,18.99L13,18.99L13,20.99L2,20.99L2,3.01Z" />
    </svg>
  );

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <BDLogo />
          <span className="font-bold inline-block font-headline">
            BoldNet Digital
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <Button asChild>
            <Link href="#contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
