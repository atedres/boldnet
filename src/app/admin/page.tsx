'use client';
import { useUser, FirebaseClientProvider, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogOut, LayoutDashboard, Users, Briefcase, Workflow } from 'lucide-react';

import { Button } from '@/components/ui/button';
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
  SidebarMenuBadge,
} from '@/components/ui/sidebar';
import ClientManagement from '@/app/admin/components/client-management';
import ServiceManagement from '@/app/admin/components/service-management';
import FunnelStepManagement from '@/app/admin/components/funnel-step-management';

type AdminSection = 'dashboard' | 'clients' | 'services' | 'funnel';

function AdminDashboard() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const auth = useAuth();
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');

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
      case 'dashboard':
      default:
        return (
            <div className="text-center">
                <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>
                <p className="text-muted-foreground mt-2">Select a section from the sidebar to start managing your site content.</p>
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
            <SidebarMenuBadge>Beta</SidebarMenuBadge>
          </div>
        </SidebarHeader>
        <SidebarContent>
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
                onClick={() => setActiveSection('clients')}
                isActive={activeSection === 'clients'}
              >
                <Users />
                Clients
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
                    onClick={() => setActiveSection('funnel')}
                    isActive={activeSection === 'funnel'}>
                    <Workflow />
                    Funnel Steps
                </SidebarMenuButton>
            </SidebarMenuItem>
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
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-xl font-semibold capitalize">{activeSection}</h1>
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
