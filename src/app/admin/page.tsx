'use client';
import { useUser, FirebaseClientProvider, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogOut, LayoutDashboard, Users, Briefcase, Workflow, Layers, Palette, FileText, ChevronDown, Settings, Presentation, Code, Mail, Inbox, Star, UserSquare, Rss } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import ClientManagement from '@/app/admin/components/client-management';
import ServiceManagement from '@/app/admin/components/service-management';
import FunnelStepManagement from '@/app/admin/components/funnel-step-management';
import SectionManagement from '@/app/admin/components/section-management';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ThemeManagement from './components/theme-management';
import QuoteRequestManagement from './components/quote-request-management';
import { cn } from '@/lib/utils';
import LandingPageManagement from './components/landing-page-management';
import CodedLandingPageManagement from './components/coded-landing-page-management';
import { useLanguage } from '../context/language-context';
import LanguageSwitcher from '../components/language-switcher';
import { ThemeSwitcher } from '../components/theme-switcher';
import ContactSubmissionManagement from './components/contact-submission-management';
import TestimonialManagement from './components/testimonial-management';
import TeamManagement from './components/team-management';
import BlogManagement from './components/blog-management';
import PersonalBrandingManagement from './components/personal-branding-management';

type AdminSection = 'dashboard' | 'clients' | 'services' | 'funnel' | 'sections' | 'theme' | 'quotes' | 'contacts' | 'landing-pages' | 'coded-landing-pages' | 'testimonials' | 'team' | 'blog' | 'personal-branding';

function AdminDashboard() {
  const { user, isUserLoading } = useUser();
  const { t } = useLanguage();
  const router = useRouter();
  const auth = useAuth();
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [isSubmissionsMenuOpen, setIsSubmissionsMenuOpen] = useState(true);
  const [isSiteMenuOpen, setIsSiteMenuOpen] = useState(false);
  const [isLandingPageMenuOpen, setIsLandingPageMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add('admin-page');
    return () => {
      document.body.classList.remove('admin-page');
    };
  }, []);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = () => {
    if (auth) {
      auth.signOut();
    }
  };

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        Loading...
      </div>
    );
  }

  const sectionTitles: Record<AdminSection, string> = {
    dashboard: t('adminDashboard'),
    clients: t('adminClients'),
    services: t('adminServices'),
    funnel: t('adminFunnel'),
    sections: t('adminHomepageSections'),
    theme: t('adminTheme'),
    quotes: t('adminQuotes'),
    contacts: t('adminContacts'),
    'landing-pages': t('adminLandingPages'),
    'coded-landing-pages': t('adminCodedPages'),
    'personal-branding': 'Personal Branding Page',
    testimonials: 'Témoignages',
    team: 'Équipe',
    blog: 'Blog'
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'clients':
        return <ClientManagement />;
      case 'services':
        return <ServiceManagement />;
      case 'funnel':
        return <FunnelStepManagement />;
      case 'sections':
        return <SectionManagement />;
      case 'theme':
        return <ThemeManagement />;
      case 'quotes':
        return <QuoteRequestManagement />;
      case 'contacts':
        return <ContactSubmissionManagement />;
      case 'landing-pages':
        return <LandingPageManagement />;
      case 'coded-landing-pages':
        return <CodedLandingPageManagement />;
      case 'personal-branding':
        return <PersonalBrandingManagement onBack={() => setActiveSection('coded-landing-pages')} />;
      case 'testimonials':
        return <TestimonialManagement />;
      case 'team':
        return <TeamManagement />;
      case 'blog':
        return <BlogManagement />;
      case 'dashboard':
      default:
        return (
            <div className="text-center max-w-2xl w-full flex flex-col gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>{t('adminWelcome')}</CardTitle>
                        <CardDescription>{t('adminWelcomeDesc')}</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-sidebar-primary-foreground tracking-wider">BoldNet</h2>
          </div>
        </SidebarHeader>
        <SidebarContent className="mt-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveSection('dashboard')}
                isActive={activeSection === 'dashboard'}
                className="data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground"
              >
                <LayoutDashboard />
                {t('adminDashboard')}
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <Collapsible open={isSubmissionsMenuOpen} onOpenChange={setIsSubmissionsMenuOpen}>
              <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start gap-2 px-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                      <Inbox />
                      <span className="flex-1 text-left">{t('adminSubmissions')}</span>
                      <ChevronDown className={cn("transform transition-transform duration-200", isSubmissionsMenuOpen && "rotate-180")} />
                    </Button>
                  </CollapsibleTrigger>
              </SidebarMenuItem>

              <CollapsibleContent className="pl-6 space-y-1">
                <SidebarMenuItem>
                    <SidebarMenuButton 
                        onClick={() => setActiveSection('quotes')}
                        isActive={activeSection === 'quotes'}
                        className="data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground"
                        >
                        <FileText />
                        {t('adminQuotes')}
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton 
                        onClick={() => setActiveSection('contacts')}
                        isActive={activeSection === 'contacts'}
                        className="data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground"
                        >
                        <Mail />
                        {t('adminContacts')}
                    </SidebarMenuButton>
                </SidebarMenuItem>
              </CollapsibleContent>
            </Collapsible>
            
            <Collapsible open={isSiteMenuOpen} onOpenChange={setIsSiteMenuOpen}>
              <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start gap-2 px-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                      <Settings />
                      <span className="flex-1 text-left">{t('adminSiteContent')}</span>
                      <ChevronDown className={cn("transform transition-transform duration-200", isSiteMenuOpen && "rotate-180")} />
                    </Button>
                  </CollapsibleTrigger>
              </SidebarMenuItem>

              <CollapsibleContent className="pl-6 space-y-1">
                <SidebarMenuItem>
                    <SidebarMenuButton 
                        onClick={() => setActiveSection('theme')}
                        isActive={activeSection === 'theme'}
                        className="data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground"
                        >
                        <Palette />
                        {t('adminTheme')}
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton 
                        onClick={() => setActiveSection('sections')}
                        isActive={activeSection === 'sections'}
                        className="data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground"
                        >
                        <Layers />
                        {t('adminHomepageSections')}
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton 
                        onClick={() => setActiveSection('blog')}
                        isActive={activeSection === 'blog'}
                        className="data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground"
                        >
                        <Rss />
                        Blog
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton 
                        onClick={() => setActiveSection('services')}
                        isActive={activeSection === 'services'}
                        className="data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground"
                        >
                        <Briefcase />
                        {t('adminServices')}
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton 
                        onClick={() => setActiveSection('clients')}
                        isActive={activeSection === 'clients'}
                        className="data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground"
                        >
                        <Users />
                        {t('adminClients')}
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton 
                        onClick={() => setActiveSection('funnel')}
                        isActive={activeSection === 'funnel'}
                        className="data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground"
                        >
                        <Workflow />
                        {t('adminFunnel')}
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton 
                        onClick={() => setActiveSection('testimonials')}
                        isActive={activeSection === 'testimonials'}
                        className="data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground"
                        >
                        <Star />
                        Témoignages
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton 
                        onClick={() => setActiveSection('team')}
                        isActive={activeSection === 'team'}
                        className="data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground"
                        >
                        <UserSquare />
                        Équipe
                    </SidebarMenuButton>
                </SidebarMenuItem>
              </CollapsibleContent>
            </Collapsible>
            
             <Collapsible open={isLandingPageMenuOpen} onOpenChange={setIsLandingPageMenuOpen}>
              <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start gap-2 px-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                      <Presentation />
                      <span className="flex-1 text-left">{t('adminLandingPages')}</span>
                      <ChevronDown className={cn("transform transition-transform duration-200", isLandingPageMenuOpen && "rotate-180")} />
                    </Button>
                  </CollapsibleTrigger>
              </SidebarMenuItem>

              <CollapsibleContent className="pl-6 space-y-1">
                 <SidebarMenuItem>
                    <SidebarMenuButton 
                        onClick={() => setActiveSection('landing-pages')}
                        isActive={activeSection === 'landing-pages'}
                        className="data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground"
                        >
                        {t('adminDynamicPages')}
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton 
                        onClick={() => setActiveSection('coded-landing-pages')}
                        isActive={activeSection === 'coded-landing-pages'}
                        className="data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground"
                        >
                        <Code className="mr-2" />
                        {t('adminCodedPages')}
                    </SidebarMenuButton>
                </SidebarMenuItem>
              </CollapsibleContent>
            </Collapsible>

          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout}>
                <LogOut />
                {t('adminLogout')}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center justify-start gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger className="md:flex" />
            <h1 className="text-xl font-semibold capitalize flex-1">{sectionTitles[activeSection]}</h1>
            <div className="flex items-center gap-2">
                <ThemeSwitcher />
                <LanguageSwitcher />
            </div>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="flex items-start justify-center">
            {renderContent()}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
    </div>
  );
}


export default function Admin() {
  return (
    <FirebaseClientProvider>
        <AdminDashboard />
    </FirebaseClientProvider>
  );
}
