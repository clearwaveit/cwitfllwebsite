"use client";

import { useEffect, useRef, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // Scroll duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame to GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP's lag smoothing for better performance with Lenis
    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  // Scroll to top on pathname change (navigation)
  useEffect(() => {
    // First, immediately reset scroll position using native scroll (instant)
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    
    // Also reset document.documentElement.scrollTop and document.body.scrollTop
    if (typeof document !== "undefined") {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    // Then use Lenis for smooth scroll if available
    if (lenisRef.current) {
      // Small delay to ensure DOM is ready, then scroll with Lenis
      setTimeout(() => {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, {
            immediate: false,
            duration: 0.3,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }, 10);
    }

    // Refresh ScrollTrigger after a short delay to ensure DOM is ready
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  }, [pathname]);

  return <>{children}</>;
}
