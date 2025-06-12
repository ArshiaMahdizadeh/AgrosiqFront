"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Section entrance animation
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });
      
      // Form animation
      gsap.from(formRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });
    });
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section
      ref={sectionRef}
      className="py-20 bg-primary text-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-white/5 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-secondary/10 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={contentRef}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Grow Your Agricultural Exports?
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Join our network of farmers and exporters to access global markets, 
            real-time analytics, and ensure the authenticity of your products.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link href="/register" className="flex items-center gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white bg-white/10 border-white hover:text-black hover:bg-white" asChild>
              <Link href="/product-registration">Register Product</Link>
            </Button>
          </div>
          
          <div className="pt-4 border-t border-white/20">
            <h3 className="text-xl font-semibold mb-4">
              Subscribe to Our Newsletter
            </h3>
            <form 
              ref={formRef}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white"
              />
              <Button type="submit" className="bg-white text-primary hover:bg-white/90 whitespace-nowrap">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}