import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { adminRoutes } from "../util/adminRoutes";
const DashboardHeader = () => {
  const location = useLocation();

  const currentRoute = adminRoutes.find((route) =>
    location.pathname.startsWith(route.url),
  );
  const title = currentRoute?.title || "Dashboard";
  return (
    <header className="flex h-(--header-height) items-center border-b border-border bg-background/80 backdrop-blur">
      <div className="flex w-full items-center gap-2 px-4 lg:px-6">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />

        <Separator orientation="vertical" className="mx-2 h-4 bg-border" />

        <h1 className="text-sm font-semibold text-foreground">{title}</h1>
      </div>
    </header>
  );
};

export default DashboardHeader;
