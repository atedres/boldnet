'use client';
import { useUser, FirebaseClientProvider, useAuth, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogOut, LayoutDashboard, Users, Briefcase, Workflow, Layers } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';

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
import SectionManagement from '@/app/admin/components/section-management';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

type AdminSection = 'dashboard' | 'clients' | 'services' | 'funnel' | 'sections';

function SectionVisibilityControl() {
  const firestore = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(firestore, 'site_settings', 'visibility'), [firestore]);
  const { data: settings, isLoading } = useDoc(settingsRef);

  const handleToggle = async (section: keyof typeof settings, value: boolean) => {
    if (settingsRef) {
      await setDoc(settingsRef, { [section]: value }, { merge: true });
    }
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle>Section Visibility</CardTitle>
            <CardDescription>Control which sections are visible on your public website.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
             {isLoading ? <p>Loading settings...</p> : (
                <>
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <Label htmlFor="showServices">Services Section</Label>
                             <p className="text-xs text-muted-foreground">Show the services overview on the homepage.</p>
                        </div>
                        <Switch
                            id="showServices"
                            checked={settings?.showServices ?? true}
                            onCheckedChange={(value) => handleToggle('showServices', value)}
                        />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <Label htmlFor="showClients">Clients Section</Label>
                             <p className="text-xs text-muted-foreground">Show the client showcase on the homepage.</p>
                        </div>
                        <Switch
                            id="showClients"
                            checked={settings?.showClients ?? true}
                            onCheckedChange={(value) => handleToggle('showClients', value)}
                        />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <Label htmlFor="showFunnel">Expertise/Funnel Section</Label>
                             <p className="text-xs text-muted-foreground">Show the high-performance funnel on the homepage.</p>
                        </div>
                        <Switch
                            id="showFunnel"
                            checked={settings?.showFunnel ?? true}
                            onCheckedChange={(value) => handleToggle('showFunnel', value)}
                        />
                    </div>
                </>
             )}
        </CardContent>
    </Card>
  )
}


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
      case 'sections':
        return <SectionManagement />;
      case 'dashboard':
      default:
        return (
            <div className="text-center max-w-2xl w-full flex flex-col gap-8">
                <div>
                    <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>
                    <p className="text-muted-foreground mt-2">Use the sidebar to manage your site content.</p>
                </div>
                <SectionVisibilityControl />
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
                    onClick={() => setActiveSection('sections')}
                    isActive={activeSection === 'sections'}>
                    <Layers />
                    Sections
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
