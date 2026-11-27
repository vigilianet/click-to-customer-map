import { Link, useRouterState } from "@tanstack/react-router";
import { BarChart3, BookOpen, Boxes, LayoutDashboard, Link2, Plug, Settings } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "./logo";

const items = [
  { to: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { to: "/saas", label: "SaaS", icon: Boxes },
  { to: "/affiliation", label: "Affiliation", icon: Link2 },
  { to: "/analytique", label: "Analytique", icon: BarChart3 },
  { to: "/integrations", label: "Intégrations", icon: Plug },
  { to: "/documentation", label: "Documentation", icon: BookOpen },
] as const;

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { setOpenMobile } = useSidebar();
  const close = () => setOpenMobile(false);
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-14 justify-center px-3">
        <Logo className="group-data-[collapsible=icon]:[&>span]:hidden" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {items.map((i) => (
                <SidebarMenuItem key={i.to}>
                  <SidebarMenuButton asChild isActive={path.startsWith(i.to)} tooltip={i.label}>
                    <Link to={i.to} onClick={close}>
                      <i.icon />
                      <span>{i.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={path.startsWith("/parametres")} tooltip="Paramètres">
              <Link to="/parametres" onClick={close}>
                <Settings />
                <span>Paramètres</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
