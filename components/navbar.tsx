"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Plane as Plant, Menu, X } from "lucide-react";
import gsap from "gsap";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline>();

  // Initialize animations
  useEffect(() => {
    gsap.set(mobileMenuRef.current, { x: "100%" });
    gsap.set(overlayRef.current, { opacity: 0 });

    animationRef.current = gsap.timeline({ paused: true })
      .to(overlayRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: "power1.out"
      })
      .to(mobileMenuRef.current, {
        x: 0,
        duration: 0.3,
        ease: "power2.out"
      }, "-=0.1");

    return () => {
      animationRef.current?.kill();
    };
  }, []);

  // Handle menu state changes
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      // Show elements immediately
      gsap.set([overlayRef.current, mobileMenuRef.current], { display: "block" });
      animationRef.current?.play();
    } else {
      animationRef.current?.reverse().then(() => {
        // Hide elements after animation completes
        gsap.set([overlayRef.current, mobileMenuRef.current], { display: "none" });
        document.body.style.overflow = "unset";
      });
    }
  }, [mobileMenuOpen]);

  const toggleMenu = () => {
    // Immediate state update
    setMobileMenuOpen(prev => !prev);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <Button variant="outline" className="dark:text-gray-900" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button variant="default" className="bg-primary hover:bg-primary-600 text-white" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button - NOW WORKING PROPERLY */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
            className="ml-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 md:hidden z-40 hidden"
        onClick={toggleMenu}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className="fixed top-0 right-0 w-[300px] h-screen bg-white dark:bg-gray-900 shadow-xl md:hidden z-50 overflow-y-auto hidden"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col min-h-screen">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <Plant className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-primary dark:text-primary-100">
                Agrosiq
              </span>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <div className="space-y-1">
              <Link href="/" className="block px-4 py-3 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-100 dark:text-gray-200 dark:hover:text-primary-300 dark:hover:bg-gray-800 transition-colors" onClick={toggleMenu}>
                Home
              </Link>
              <Link href="/product-registration" className="block px-4 py-3 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-100 dark:text-gray-200 dark:hover:text-primary-300 dark:hover:bg-gray-800 transition-colors" onClick={toggleMenu}>
                Register Product
              </Link>
              <Link href="/verify-authenticity" className="block px-4 py-3 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-100 dark:text-gray-200 dark:hover:text-primary-300 dark:hover:bg-gray-800 transition-colors" onClick={toggleMenu}>
                Verify Authenticity
              </Link>
            </div>
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-center dark:text-gray-900" asChild onClick={toggleMenu}>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button variant="default" className="w-full bg-primary hover:bg-primary-600 text-white justify-center" asChild onClick={toggleMenu}>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}