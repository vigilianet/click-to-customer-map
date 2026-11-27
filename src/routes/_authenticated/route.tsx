import { createFileRoute, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import { LogOut, ShieldOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchIsAdmin } from "@/hooks/use-auth";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AppSidebar } from "@/components/app/app-sidebar";
import { ThemeToggle } from "@/components/app/theme-toggle";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (!user) throw redirect({ to: "/login" });
    const isAdmin = await fetchIsAdmin(user.id);
    return { user: { id: user.id, email: user.email ?? "" }, isAdmin };
  },
  pendingComponent: () => (
    <div className="flex min-h-screen items-center justify-center"><Skeleton className="h-8 w-40" /></div>
  ),
  component: AppLayout,
});

function AppLayout() {
  const { user, isAdmin } = Route.useRouteContext();
  const navigate = useNavigate();
  const logout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <ShieldOff className="size-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Accès réservé à l'administrateur.</p>
        <Button variant="outline" size="sm" onClick={logout}>Se déconnecter</Button>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b bg-background/80 px-3 backdrop-blur sm:px-6">
          <SidebarTrigger />
          <div className="ml-auto flex items-center gap-1">
            <span className="mr-2 hidden max-w-48 truncate text-sm text-muted-foreground sm:inline">{user.email}</span>
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={logout} aria-label="Se déconnecter">
              <LogOut className="size-4" />
            </Button>
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
