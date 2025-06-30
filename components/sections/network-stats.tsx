"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Package, Globe, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  {
    title: "Active Farmers",
    value: 2500,
    icon: Users,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Verified Shipments",
    value: 15820,
    icon: Package,
    color: "bg-secondary/10 text-secondary",
  },
  {
    title: "Countries Covered",
    value: 42,
    icon: Globe,
    color: "bg-accent/10 text-accent-700",
  },
  {
    title: "Quality Certifications",
    value: 8,
    icon: Award,
    color: "bg-primary/10 text-primary",
  },
];

export default function NetworkStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
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
      
      gsap.from(".stat-card", {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.6,
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
      
      counterRefs.current.forEach((ref, index) => {
        if (ref) {
          let startValue = 0;
          const endValue = stats[index].value;
          const duration = 2;
          
          ScrollTrigger.create({
            trigger: ref,
            start: "top 80%",
            onEnter: () => {
              const obj = { value: startValue };
              gsap.to(obj, {
                value: endValue,
                duration: duration,
                ease: "power2.out",
                onUpdate: () => {
                  if (ref) {
                    ref.textContent = Math.round(obj.value).toLocaleString();
                  }
                },
              });
            },
            once: true,
          });
        }
      });
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-950 overflow-hidden relative"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-50 to-transparent dark:from-gray-900 dark:to-transparent"></div>
      <div className="absolute -left-4 top-1/3 w-8 h-32 bg-secondary/10 rounded-full transform -rotate-45 blur-2xl"></div>
      <div className="absolute right-0 bottom-1/4 w-12 h-40 bg-primary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Network Statistics
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our growing ecosystem of farmers, exporters, and global partners ensuring 
            quality agricultural products and verified exports.
          </p>
        </div>

        <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="stat-card border-none shadow-md hover:shadow-lg transition-shadow group">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className={`p-3 rounded-full ${stat.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {stat.title}
                </h3>
                <span 
                  ref={el => (counterRefs.current[index] = el)}
                  className="text-4xl font-bold text-primary dark:text-primary-300"
                >
                  0
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}