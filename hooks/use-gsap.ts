"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useGSAPAnimation = () => {
  const timeline = useRef<GSAPTimeline | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    timeline.current = gsap.timeline();
    
    return () => {
      if (timeline.current) {
        timeline.current.kill();
      }
      
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return timeline.current;
};

export const useScrollAnimation = (
  elementRef: React.RefObject<HTMLElement>,
  options = {}
) => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!elementRef.current) return;
    
    const element = elementRef.current;
    
    const defaultOptions = {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    };
    
    const animOptions = { ...defaultOptions, ...options };
    
    const animation = gsap.from(element, animOptions);
    
    return () => {
      animation.kill();
      if (animOptions.scrollTrigger && 
          typeof animOptions.scrollTrigger !== 'string' &&
          'kill' in animOptions.scrollTrigger) {
        animOptions.scrollTrigger.kill();
      }
    };
  }, [elementRef, options]);
};