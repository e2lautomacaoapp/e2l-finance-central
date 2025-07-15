
import { 
  LayoutDashboard, 
  TrendingUp, 
  TrendingDown, 
  ShoppingCart, 
  Users, 
  Building2, 
  FileText, 
  Target,
  Settings,
  UserCog
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePermissions } from "@/hooks/usePermissions";

const mainMenuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Receitas", url: "/receitas", icon: TrendingUp },
  { title: "Despesas", url: "/despesas", icon: TrendingDown },
  { title: "Compras", url: "/compras", icon: ShoppingCart },
  { title: "Clientes", url: "/clientes", icon: Users },
  { title: "Fornecedores", url: "/fornecedores", icon: Building2 },
  { title: "Relatórios", url: "/relatorios", icon: FileText },
  { title: "Metas", url: "/metas", icon: Target },
];

const configMenuItems = [
  { title: "Usuários", url: "/configuracoes/usuarios", icon: Users },
  { title: "Meu Perfil", url: "/configuracoes/perfil", icon: UserCog },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { isAdmin, loading } = usePermissions();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 w-full text-left transition-colors duration-200 ${
      isActive 
        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
    }`;

  if (loading) {
    return (
      <Sidebar className={`${collapsed ? "w-16" : "w-64"} border-r border-sidebar-border`}>
        <SidebarContent className="bg-sidebar">
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center justify-center">
              <div className="h-8 w-8 bg-e2l-secondary rounded-lg animate-pulse"></div>
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} border-r border-sidebar-border`}>
      <SidebarContent className="bg-sidebar">
        {/* Logo/Brand */}
        <div className="p-4 border-b border-sidebar-border">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-e2l-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E2L</span>
              </div>
              <span className="font-semibold text-sidebar-foreground">Finance Central</span>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="h-8 w-8 bg-e2l-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E2L</span>
              </div>
            </div>
          )}
        </div>

        {/* Menu Principal */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs font-medium uppercase tracking-wider px-4 py-2">
            {!collapsed && "Menu Principal"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Menu Configurações - Apenas para Admins */}
        {isAdmin() && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs font-medium uppercase tracking-wider px-4 py-2">
              {!collapsed && "Configurações"}
            </SidebarGroupLabel>
            
            <SidebarGroupContent>
              <SidebarMenu>
                {configMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        className={getNavCls}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
