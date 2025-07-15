
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";
import UserMenu from "@/components/auth/UserMenu";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  
  const getPageTitle = (pathname: string) => {
    const routes: Record<string, string> = {
      "/": "Dashboard",
      "/receitas": "Receitas",
      "/despesas": "Despesas", 
      "/compras": "Compras",
      "/clientes": "Clientes",
      "/fornecedores": "Fornecedores",
      "/relatorios": "Relatórios",
      "/metas": "Metas",
      "/configuracoes/usuarios": "Usuários",
      "/configuracoes/perfil": "Meu Perfil",
    };
    return routes[pathname] || "Página";
  };

  const getBreadcrumbs = (pathname: string) => {
    if (pathname.startsWith('/configuracoes/')) {
      return {
        section: "Configurações",
        page: getPageTitle(pathname)
      };
    }
    return {
      section: "E2L Automação",
      page: getPageTitle(pathname)
    };
  };

  const breadcrumbs = getBreadcrumbs(location.pathname);

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">
                  {breadcrumbs.section}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{breadcrumbs.page}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            <UserMenu />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </div>
      </SidebarInset>
    </>
  );
}
