import {
  CircleGauge,
  LibraryBig,
  Users,
  ChartBarStacked,
  Package,
  Sparkle,
} from "lucide-react";

export const adminRoutes = [
  { title: "Dashboard", url: "/admin/dashboard", icon: CircleGauge },
  { title: "Books", url: "/admin/books", icon: LibraryBig },
  { title: "Authors", url: "/admin/authors", icon: Users },
  { title: "Categories", url: "/admin/categories", icon: ChartBarStacked },
  { title: "Orders", url: "/admin/orders", icon: Package },
  { title: "Featured", url: "/admin/featured", icon: Sparkle },
];
