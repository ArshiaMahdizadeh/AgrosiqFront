"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });
      
      gsap.from([videoRef.current, textRef.current], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
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
    <section ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div ref={videoRef} className="relative rounded-xl overflow-hidden aspect-video shadow-lg">
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10 group">
                <Button 
                  className="bg-primary/90 hover:bg-primary text-white rounded-full h-16 w-16 flex items-center justify-center group-hover:scale-110 transition-transform" 
                  size="icon"
                  aria-label="Play"
                  onClick={() => {
                    console.log("Play video");
                  }}
                >
                  <Play className="h-8 w-8" />
                </Button>
              </div>
              
              {/* Video thumbnail */}
              <div ref={videoRef} className="relative rounded-xl overflow-hidden aspect-video shadow-lg">
  <div className="relative w-full h-full">
    <Image 
      src="https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg"
      alt="Agricultural exports video thumbnail"
      fill
      className="object-cover"
    />
  </div>

  {isPlaying ? (
    <iframe
      className="absolute top-0 left-0 w-full h-full z-20"
      src="https://www.youtube.com/embed/uINxlCBj-5Y?autoplay=1"
      title="Agrosiq Video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  ) : (
    <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10 group">
      <Button 
        className="bg-primary/90 hover:bg-primary text-white rounded-full h-16 w-16 flex items-center justify-center group-hover:scale-110 transition-transform" 
        size="icon"
        aria-label="Play"
        onClick={() => setIsPlaying(true)}
      >
        <Play className="h-8 w-8" />
      </Button>
    </div>
  )}
</div>

            </div>

            <div ref={textRef}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Discover How Agrosiq Works
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Learn how our platform connects farmers with global markets, ensures product authenticity, and provides real-time market intelligence for agricultural exports.
              </p>
              
              <Card className="bg-white/50 dark:bg-gray-800/50 shadow-sm border-none mb-6">
                <CardContent className="p-4">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary text-lg font-bold">01.</span>
                      <span className="text-gray-700 dark:text-gray-300">Register your agricultural products on our platform</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary text-lg font-bold">02.</span>
                      <span className="text-gray-700 dark:text-gray-300">Access real-time market data and price forecasts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary text-lg font-bold">03.</span>
                      <span className="text-gray-700 dark:text-gray-300">Connect with verified buyers from around the world</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary text-lg font-bold">04.</span>
                      <span className="text-gray-700 dark:text-gray-300">Ensure authenticity and traceability for your exports</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Button className="bg-primary hover:bg-primary-700 text-white">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}