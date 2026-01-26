"use client";

import { ReactNode, useRef } from "react";
import { useGSAP } from "@/app/hooks/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image, { StaticImageData } from "next/image";
import CallToActionButton from "./CallToActionButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface StatItem {
  label: string;
  value: string;
  labelClassName?: string;
  valueClassName?: string;
}

interface HeroBannerProps {
  // Badge (optional) - small text above title like "FEBRUARY 8, 2024"
  badge?: string | ReactNode;
  badgeClassName?: string;
  // Title (optional)
  title?: string | ReactNode;
  titleClassName?: string;
  // Description (optional)
  description?: string | ReactNode;
  descriptionClassName?: string;
  // Button (optional)
  buttonText?: string;
  buttonClassName?: string;
  // Content layout
  titleMaxWidth?: string;
  descriptionMaxWidth?: string;
  contentClassName?: string;
  // Background (optional)
  backgroundImage?: StaticImageData | string;
  backgroundImageAlt?: string;
  backgroundImageClassName?: string;
  // Overlay options (optional)
  showOverlay?: boolean; // Enable solid overlay (default: true when backgroundImage exists)
  overlayClassName?: string;
  gradientOverlay?: boolean; // Enable gradient overlay (top light, bottom dark)
  gradientOverlayClassName?: string;
  // Stats (optional)
  stats?: StatItem[];
  statsContainerClassName?: string;
  // Section styling
  className?: string;
  minHeight?: string;
  height?: string; // Fixed height option
  // Content alignment
  contentAlign?: "left" | "right"; // Align content to left or right side
}

export default function HeroBanner({
  badge,
  badgeClassName = "",
  title,
  titleClassName = "",
  description,
  descriptionClassName = "",
  buttonText,
  buttonClassName = "",
  titleMaxWidth = "",
  descriptionMaxWidth = "",
  contentClassName = "",
  backgroundImage,
  backgroundImageAlt = "Banner background",
  backgroundImageClassName = "",
  showOverlay = true,
  overlayClassName = "bg-black/40",
  gradientOverlay = false,
  gradientOverlayClassName = "",
  stats,
  statsContainerClassName = "",
  className = "",
  minHeight = "100vh",
  height,
  contentAlign = "left",
}: HeroBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate badge
      if (badgeRef.current) {
        gsap.set(badgeRef.current, {
          y: 20,
          opacity: 0,
        });
        tl.to(badgeRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      }

      // Animate heading
      if (headingRef.current) {
        gsap.set(headingRef.current, {
          y: 50,
          opacity: 0,
        });
        tl.to(
          headingRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }

      // Animate description
      if (descriptionRef.current) {
        gsap.set(descriptionRef.current, {
          y: 30,
          opacity: 0,
        });
        tl.to(
          descriptionRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5"
        );
      }

      // Animate button
      if (buttonRef.current) {
        gsap.set(buttonRef.current, {
          y: 20,
          opacity: 0,
        });
        tl.to(
          buttonRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }

      // Animate stats
      if (statsRef.current) {
        const statElements = statsRef.current.children;
        gsap.set(statElements, {
          y: 30,
          opacity: 0,
        });
        tl.to(
          statElements,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15,
          },
          "-=0.4"
        );
      }
    },
    sectionRef,
    []
  );

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        minHeight: height ? undefined : minHeight,
        height: height || undefined,
      }}
    >
      {/* Background Image (optional) */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src={backgroundImage}
            alt={backgroundImageAlt}
            fill
            className={`w-full h-full ${backgroundImageClassName || "object-cover"}`}
            priority
            unoptimized
          />
          {/* Solid Overlay (optional) */}
          {!gradientOverlay && showOverlay && (
            <div className={`absolute inset-0 ${overlayClassName}`} />
          )}
          {/* Gradient Overlay - top light, bottom dark (optional) */}
          {gradientOverlay && (
            <div
              className={`absolute inset-0 ${gradientOverlayClassName}`}
              style={{
                background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)"
              }}
            />
          )}
        </div>
      )}

      {/* Content Container - Takes full height with flex layout */}
      <div
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col h-full"
        style={{
          minHeight: height ? undefined : minHeight,
          height: height ? "100%" : undefined
        }}
      >
        {/* Content - Title & Description (vertically centered) */}
        <div className={`flex-1 flex flex-col justify-center ${contentAlign === "right" ? "items-end text-right" : ""} ${contentClassName}`}>
          {/* Badge (optional) */}
          {badge && (
            <span
              ref={badgeRef}
              className={`text-[12px] sm:text-[14px] md:text-[16px] font-[500] text-white/80 uppercase tracking-wider mb-4 md:mb-6 ${badgeClassName}`}
            >
              {badge}
            </span>
          )}

          {/* Title (optional) */}
          {title && (
            <h1
              ref={headingRef}
              className={`${titleMaxWidth} font-[700] text-white leading-tight mb-6 md:mb-8 ${titleClassName || "text-[32px] sm:text-[40px] md:text-[50px] lg:text-[60px]"}`}
            >
              {title}
            </h1>
          )}

          {/* Description (optional) */}
          {description && (
            <p
              ref={descriptionRef}
              className={`${descriptionMaxWidth} text-[14px] sm:text-[16px] md:text-[20px] font-[500] text-white/90 leading-relaxed max-w-[600px] ${descriptionClassName}`}
            >
              {description}
            </p>
          )}

          {/* Button (optional) */}
          {buttonText && buttonText.trim() !== "" && (
            <div ref={buttonRef} className={`mt-8 md:mt-10 ${buttonClassName}`}>
              <CallToActionButton variant="shiny" className="rounded-full">
                {buttonText}
              </CallToActionButton>
            </div>
          )}
        </div>

        {/* Bottom Content - Stats (optional, positioned at bottom) */}
        {stats && stats.length > 0 && (
          <div
            ref={statsRef}
            className={`grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pb-12 md:pb-20 ${statsContainerClassName}`}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p
                  className={`text-[12px] sm:text-[14px] md:text-[20px] font-[500] text-white/70 mb-2 ${stat.labelClassName || ""}`}
                >
                  {stat.label}
                </p>
                <p
                  className={`text-[36px] sm:text-[48px] md:text-[60px] lg:text-[80px] font-[500] text-white leading-none ${stat.valueClassName || ""}`}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
