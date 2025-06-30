"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowDown, ChevronDown, Sprout } from "lucide-react";
import gsap from "gsap";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.6,
      });

      gsap.to(".floating-leaf", {
        y: -15,
        rotation: 5,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
      });

      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        opacity: 0.5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Floating leaves */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-leaf absolute top-1/4 left-1/5 w-16 h-16 opacity-60">
            <Sprout className="w-full h-full text-secondary-300" />
          </div>
          <div className="floating-leaf absolute top-1/3 right-1/4 w-20 h-20 opacity-40">
            <Sprout className="w-full h-full text-secondary-400" />
          </div>
          <div className="floating-leaf absolute bottom-1/3 left-1/3 w-12 h-12 opacity-50">
            <Sprout className="w-full h-full text-secondary-200" />
          </div>
        </div>

        {/* Wave animation */}
        <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
          <svg className="absolute bottom-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="0.3" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <div ref={textRef}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Smart and Reliable <br />
            <span className="text-secondary-400">Agricultural Exports</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Connecting farmers to global markets with traceability, 
            transparency, and technology-driven solutions.
          </p>
        </div>

        <div 
  ref={ctaRef} 
  className="flex flex-wrap justify-center gap-4 px-4 overflow-x-auto w-full"
>
  <Link href="/product-registration" className="flex-shrink-0">
    <Button 
      size="lg" 
      className="bg-primary hover:bg-primary-700 text-white font-medium whitespace-nowrap"
      aria-label="Register your agricultural product"
    >
      Register Product
    </Button>
  </Link>
  <Link href="/verify-authenticity" className="flex-shrink-0">
    <Button 
      size="lg" 
      variant="outline" 
      className="text-white bg-white/10 border-white hover:text-black hover:bg-white whitespace-nowrap"
      aria-label="Verify product authenticity"
    >
      Verify Authenticity
    </Button>
  </Link>
</div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white cursor-pointer"
        onClick={scrollToContent}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium">Scroll Down</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </div>
      </div>
    </div>
  );
}