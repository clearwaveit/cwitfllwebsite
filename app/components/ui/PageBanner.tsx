"use client";

import { ReactNode, useRef } from "react";
import { useGSAP } from "@/app/hooks/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PageBannerProps {
  title: string | ReactNode;
  className?: string;
  minHeight?: string;
  maxWidth?: string;
}

export default function PageBanner({
  title,
  className = "",
  minHeight = "300px",
  maxWidth,
}: PageBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!headingRef.current || !sectionRef.current) return;

      // Set initial state
      gsap.set(headingRef.current, {
        y: 50,
        opacity: 0,
      });

      // Animate heading on scroll into view
      gsap.to(headingRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    sectionRef,
    []
  );

  return (
    <section
      ref={sectionRef}
      className={`relative bg-[#3A3A3A] flex items-center justify-start w-full ${className}`}
      style={{
        minHeight: minHeight,
      }}
    >
      <div className=" px-4 sm:px-6 lg:px-8 w-full global-section-padding">
        <div className={`${maxWidth} mx-auto page-banner-content-container`}>
          <h1
            ref={headingRef}
            className="text-[40px] md:text-[96px] font-[700] text-white leading-[44px] md:leading-[80px] page-banner-title"
          >
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}

