"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
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
  Truck,
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
    title: "Shipping",
    href: "/dashboard/shipping",
    icon: Truck,
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
    <div className="h-full flex flex-col p-6 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="profile-section flex items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
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
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 shadow-md">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-white dark:bg-gray-900">
          <SidebarContent pathname={pathname} onClose={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header with Theme Toggle */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Dashboard
            </h1>
          </div>
          <ThemeToggle />
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto pb-20 md:pb-0 bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}