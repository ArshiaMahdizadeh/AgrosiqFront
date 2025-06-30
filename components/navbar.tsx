"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Plane as Plant, Menu, X } from "lucide-react";
import gsap from "gsap";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    if (mobileMenuOpen) {
      gsap.fromTo(
        ".mobile-menu",
        {
          x: "100%",
          opacity: 0,
        },
        {
          x: "0%",
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
        }
      );

      gsap.to(".menu-overlay", {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(".mobile-menu", {
        x: "100%",
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      });

      gsap.to(".menu-overlay", {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Plant className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-primary dark:text-primary-100">
            Agrosiq
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary-300 transition-colors">
            Home
          </Link>
          <Link href="/product-registration" className="text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary-300 transition-colors">
            Register Product
          </Link>
          <Link href="/verify-authenticity" className="text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary-300 transition-colors">
            Verify Authenticity
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" className="text-white bg-white/10 border-white hover:text-black hover:bg-white" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button variant="default" className="bg-primary hover:bg-primary-600 text-white" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="ml-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="menu-overlay fixed inset-0 bg-black/50 opacity-0 md:hidden z-60"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div 
        className={`mobile-menu fixed top-0 right-0 w-[300px] h-screen bg-white dark:bg-gray-900 shadow-xl transform translate-x-full md:hidden z-50 overflow-y-auto z-60`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex flex-col min-h-screen">
          {/* Menu Header with Close Button */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Plant className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-primary dark:text-primary-100">
                Agrosiq
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeMobileMenu}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4">
            <div className="space-y-1">
              <Link
                href="/"
                className="block px-4 py-3 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-100 dark:text-gray-200 dark:hover:text-primary-300 dark:hover:bg-gray-800 transition-colors"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                href="/product-registration"
                className="block px-4 py-3 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-100 dark:text-gray-200 dark:hover:text-primary-300 dark:hover:bg-gray-800 transition-colors"
                onClick={closeMobileMenu}
              >
                Register Product
              </Link>
              <Link
                href="/verify-authenticity"
                className="block px-4 py-3 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-100 dark:text-gray-200 dark:hover:text-primary-300 dark:hover:bg-gray-800 transition-colors"
                onClick={closeMobileMenu}
              >
                Verify Authenticity
              </Link>
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="space-y-2">
              <Button variant="outline" asChild className="w-full justify-center border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200">
                <Link href="/sign-in" onClick={closeMobileMenu}>Sign In</Link>
              </Button>
              <Button variant="default" className="w-full bg-primary hover:bg-primary-600 text-white justify-center" asChild>
                <Link href="/register" onClick={closeMobileMenu}>Register</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}