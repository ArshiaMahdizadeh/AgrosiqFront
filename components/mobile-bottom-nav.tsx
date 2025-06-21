"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Home,
  User,
  Search,
  BarChart3,
  ChevronUp,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function MobileBottomNav() {
  const pathname = usePathname();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    {
      href: "/",
      icon: Home,
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/dashboard",
      icon: BarChart3,
      label: "Dashboard",
      active:
        pathname.startsWith("/dashboard") &&
        !["/dashboard/search", "/dashboard/profile"].includes(pathname),
    },
    {
      href: "/dashboard/search",
      icon: Search,
      label: "Search",
      active: pathname === "/dashboard/search",
    },
    {
      href: "/dashboard/profile",
      icon: User,
      label: "Profile",
      active: pathname === "/dashboard/profile",
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="fixed bottom-0 left-0 right-0 z-20 md:hidden"
      >
        {/* Gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        {/* Back to Top Button */}
        {showScrollTop && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex justify-center mb-3"
          >
            <Button
              onClick={scrollToTop}
              size="sm"
              className="bg-primary/95 hover:bg-primary text-white rounded-full shadow-lg backdrop-blur-sm border border-white/10 h-10 w-10 p-0 transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Back to top"
            >
              <ChevronUp className="h-5 w-5" />
            </Button>
          </motion.div>
        )}

        {/* Bottom Navigation Bar */}
        <div className="relative mx-4 mb-4">
          <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl" />

          <div className="relative px-6 py-3">
            <div className="flex items-center justify-between">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 min-w-0 group",
                    item.active
                      ? "text-primary"
                      : "text-gray-600 dark:text-gray-400 hover:text-primary"
                  )}
                >
                  {item.active && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-primary/10 rounded-xl"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}

                  <div
                    className={cn(
                      "relative flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300",
                      item.active
                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                        : "group-hover:bg-primary/10"
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {item.active && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full border-2 border-white dark:border-gray-900"
                      />
                    )}
                  </div>

                  <span
                    className={cn(
                      "text-xs font-medium truncate transition-all duration-300",
                      item.active
                        ? "text-primary font-semibold"
                        : "text-gray-600 dark:text-gray-400"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="h-safe-area-inset-bottom" />
        </div>

        {/* Floating Action Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-20 right-6"
        >
          <Button
            size="icon"
            className="bg-secondary hover:bg-secondary/90 text-white rounded-full shadow-lg h-12 w-12 transition-all duration-300 border-2 border-white/20"
            aria-label="Quick actions"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
