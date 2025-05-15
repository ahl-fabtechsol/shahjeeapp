import {
  Home,
  Users,
  Store,
  ShoppingBag,
  AlertTriangle,
  BarChart2,
  FileText,
  Settings,
  Lock,
  ShoppingCart,
  Package,
  Heart,
  User,
  Truck,
  MessageSquare,
} from "lucide-react";

const adminRoutes = [
  {
    title: "Dashboard",
    url: "/dashboard/admin",
    icon: Home,
  },
  {
    title: "User Management",
    url: "/dashboard/admin/users",
    icon: Users,
  },
  {
    title: "Order Management",
    url: "/dashboard/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Content Moderation",
    url: "/dashboard/admin/moderation",
    icon: AlertTriangle,
  },
  {
    title: "Analytics",
    url: "/dashboard/admin/analytics",
    icon: BarChart2,
  },
  {
    title: "System Settings",
    url: "/dashboard/admin/settings",
    icon: Settings,
  },
  {
    title: "Feedbacks",
    url: "/dashboard/admin/feedbacks",
    icon: MessageSquare,
  },
  {
    title: "Visit Site",
    url: "/",
    icon: Store,
  },
];

const buyerRoutes = [
  {
    title: "Dashboard",
    url: "/dashboard/buyer",
    icon: Home,
  },
  {
    title: "Orders",
    url: "/dashboard/buyer/orders",
    icon: ShoppingCart,
  },
  {
    title: "Wishlist",
    url: "/dashboard/buyer/wishlist",
    icon: Heart,
  },
  {
    title: "Profile",
    url: "/dashboard/buyer/profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "/dashboard/buyer/settings",
    icon: Settings,
  },
  {
    title: "Visit Site",
    url: "/",
    icon: Store,
  },
];

const sellerRoutes = [
  {
    title: "Dashboard",
    url: "/dashboard/seller",
    icon: Home,
  },
  {
    title: "Products",
    url: "/dashboard/seller/products",
    icon: Package,
  },
  {
    title: "Deals",
    url: "/dashboard/seller/deals",
    icon: ShoppingBag,
  },
  {
    title: "Orders",
    url: "/dashboard/seller/orders",
    icon: ShoppingCart,
  },
  {
    title: "Followers",
    url: "/dashboard/seller/followers",
    icon: Users,
  },
  {
    title: "Feedbacks",
    url: "/dashboard/seller/feedbacks",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    url: "/dashboard/seller/settings",
    icon: Settings,
  },
  {
    title: "Visit Site",
    url: "/",
    icon: Store,
  },
];

export const allRoutes = {
  admin: adminRoutes,
  buyer: buyerRoutes,
  seller: sellerRoutes,
};
