import { adminRoutes } from "../util/adminRoutes";
import { Leaf, User, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logout } from "@/features/auth/pages/forms/Logout";

import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/authStore";

const DashboardSidebar = ({ ...props }) => {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const getCustomer = useAuthStore((state) => state.customer);
  let customer = null;
  if (user) {
    customer = getCustomer?.customer;
  }
  const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    const firstLetters = words.map((word) => word.charAt(0));
    return firstLetters.join("");
  };
  const initials = getInitials(customer?.name).toUpperCase();
  return (
    <Sidebar
      collapsible="offcanvas"
      className="bg-sidebar text-sidebar-foreground border-r border-sidebar-border"
      {...props}>
      {/* ================= HEADER ================= */}
      <SidebarHeader className="border-b border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-2 hover:bg-accent">
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Leaf className="size-5 text-primary" />
                <span className="tracking-tight">Leaf & Ledger</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ================= CONTENT ================= */}
      <SidebarContent>
        <SidebarMenu className="px-2 py-2">
          {adminRoutes.map((item) => {
            const isActive = location.pathname.startsWith(item.url);

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className="group transition-colors">
                  <Link
                    to={item.url}
                    className={`
                flex items-center gap-2 rounded-md px-2 py-2 text-sm
                ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }
              `}>
                    <item.icon
                      className={`size-4 ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* ================= FOOTER ================= */}
      <SidebarFooter className="border-t border-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="hover:bg-accent rounded-md p-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar className="size-8">
                      <AvatarImage
                        src={customer?.image?.url}
                        alt={customer?.name}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-xs">
                      <span className="text-foreground font-medium">
                        {customer?.name || "Admin"}
                      </span>
                      <span className="text-muted-foreground">
                        {`Role: ${user?.role}`}
                      </span>
                    </div>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2">
                      <User className="size-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      to="/admin/settings"
                      className="flex items-center gap-2">
                      <Settings className="size-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Logout />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
