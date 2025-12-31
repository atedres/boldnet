'use client';
import { useUser, FirebaseClientProvider, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogOut, LayoutDashboard, Users, Briefcase, Workflow, Layers, Palette, FileText, ChevronDown, Settings, Presentation, Code } from 'lucide-react';

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

type AdminSection = 'dashboard' | 'clients' | 'services' | 'funnel' | 'sections' | 'theme' | 'quotes' | 'landing-pages' | 'coded-landing-pages';

function AdminDashboard() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const auth = useAuth();
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [isSiteMenuOpen, setIsSiteMenuOpen] = useState(true);
  const [isLandingPageMenuOpen, setIsLandingPageMenuOpen] = useState(false);

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
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

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
      case 'landing-pages':
        return <LandingPageManagement />;
      case 'coded-landing-pages':
        return <CodedLandingPageManagement />;
      case 'dashboard':
      default:
        return (
            <div className="text-center max-w-2xl w-full flex flex-col gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome to your Dashboard</CardTitle>
                        <CardDescription>Use the sidebar to manage your site content. You can add, edit, reorder, and toggle the visibility of different sections of your public website.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Admin Panel</h2>
          </div>
        </SidebarHeader>
        <SidebarContent className="mt-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveSection('dashboard')}
                isActive={activeSection === 'dashboard'}
              >
                <LayoutDashboard />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton 
                    onClick={() => setActiveSection('quotes')}
                    isActive={activeSection === 'quotes'}>
                    <FileText />
                    Quotes
                </SidebarMenuButton>
            </SidebarMenuItem>
            
            <Collapsible open={isSiteMenuOpen} onOpenChange={setIsSiteMenuOpen}>
              <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start gap-2 px-2">
                      <Settings />
                      <span className="flex-1 text-left">Site & Content</span>
                      <ChevronDown className={cn("transform transition-transform duration-200", isSiteMenuOpen && "rotate-180")} />
                    </Button>
                  </CollapsibleTrigger>
              </SidebarMenuItem>

              <CollapsibleContent className="pl-6 space-y-1">
                <SidebarMenuItem>
                    <SidebarMenuButton 
                        onClick={() => setActiveSection('theme')}
                        isActive={activeSection === 'theme'}>
                        <Palette />
                        Theme
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton 
                        onClick={() => setActiveSection('sections')}
                        isActive={activeSection === 'sections'}>
                        <Layers />
                        Homepage Sections
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton 
                        onClick={() => setActiveSection('services')}
                        isActive={activeSection === 'services'}>
                        <Briefcase />
                        Services
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton 
                        onClick={() => setActiveSection('clients')}
                        isActive={activeSection === 'clients'}>
                        <Users />
                        Clients
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton 
                        onClick={() => setActiveSection('funnel')}
                        isActive={activeSection === 'funnel'}>
                        <Workflow />
                        Funnel Steps
                    </SidebarMenuButton>
                </SidebarMenuItem>
              </CollapsibleContent>
            </Collapsible>
            
             <Collapsible open={isLandingPageMenuOpen} onOpenChange={setIsLandingPageMenuOpen}>
              <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start gap-2 px-2">
                      <Presentation />
                      <span className="flex-1 text-left">Landing Pages</span>
                      <ChevronDown className={cn("transform transition-transform duration-200", isLandingPageMenuOpen && "rotate-180")} />
                    </Button>
                  </CollapsibleTrigger>
              </SidebarMenuItem>

              <CollapsibleContent className="pl-6 space-y-1">
                 <SidebarMenuItem>
                    <SidebarMenuButton 
                        onClick={() => setActiveSection('landing-pages')}
                        isActive={activeSection === 'landing-pages'}>
                        Dynamic Pages
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton 
                        onClick={() => setActiveSection('coded-landing-pages')}
                        isActive={activeSection === 'coded-landing-pages'}>
                        <Code className="mr-2" />
                        Coded Pages
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
                Logout
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-start gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger className="md:flex" />
            <h1 className="text-xl font-semibold capitalize">{activeSection.replace('-', ' ')}</h1>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="flex items-center justify-center">
            {renderContent()}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}


export default function Admin() {
  return (
    <FirebaseClientProvider>
      <AdminDashboard />
    </FirebaseClientProvider>
  );
}
