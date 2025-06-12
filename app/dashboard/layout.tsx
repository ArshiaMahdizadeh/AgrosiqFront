"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  DollarSign, 
  Users, 
  Package, 
  Activity, 
  Search,
  User,
  Leaf,
  FileText,
  ChevronRight,
  Menu,
  QrCode,
  Calculator,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const sidebarLinks = [
  {
    title: "Reports",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Finance",
    href: "/dashboard/finance",
    icon: DollarSign,
  },
  {
    title: "Competitors",
    href: "/dashboard/competitors",
    icon: Users,
  },
  {
    title: "Inventory",
    href: "/dashboard/inventory",
    icon: Package,
  },
  {
    title: "Realtime",
    href: "/dashboard/realtime",
    icon: Activity,
  },
  {
    title: "Product Authenticity Tracking",
    href: "/dashboard/product-authenticity-tracking",
    icon: QrCode,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: TrendingUp,
  },
  {
    title: "Calculator",
    href: "/dashboard/calculator",
    icon: Calculator,
  },
  {
    title: "Search",
    href: "/dashboard/search",
    icon: Search,
  },
  {
    title: "Product Registration",
    href: "/dashboard/product-registration",
    icon: Leaf,
  },
  {
    title: "Document Management",
    href: "/dashboard/documents",
    icon: FileText,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];

function SidebarContent({ pathname, onClose }: { pathname: string; onClose?: () => void }) {
  return (
    <div className="h-full flex flex-col p-6">
      <div className="profile-section flex items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">John Doe</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Farm Manager</p>
        </div>
      </div>

      <nav className="flex-1 mt-6 overflow-y-auto scrollbar-left">
        <ul className="space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                    isActive && "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-300"
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.title}</span>
                  {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
        <p className="text-sm text-gray-600 dark:text-gray-400">© 2025 Agrosiq</p>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 border-r border-gray-200 dark:border-gray-800">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent pathname={pathname} onClose={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>

      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}