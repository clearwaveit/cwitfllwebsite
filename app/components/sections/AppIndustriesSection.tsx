"use client";

import { useRef, ReactNode } from "react";
import { useGSAP } from "@/app/hooks/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CallToActionButton from "@/app/components/ui/CallToActionButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface IndustryCard {
  title: string;
  description: string;
  padding?: string;
  bgColor?: string;
  textColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

interface IndustriesSectionProps {
  title: string | ReactNode;
  description?: string | ReactNode;
  industries: IndustryCard[];
  buttonText?: string;
  className?: string;
}

export default function IndustriesSection({
  title,
  description,
  industries,
  buttonText,
  className = "",
}: IndustriesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

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

      // Animate heading
      if (headingRef.current) {
        gsap.set(headingRef.current, {
          y: 50,
          opacity: 0,
        });
        tl.to(headingRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        });
      }

      // Animate cards
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.set(cards, {
          y: 30,
          opacity: 0,
        });
        tl.to(
          cards,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
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
    },
    sectionRef,
    []
  );

  return (
    <section
      ref={sectionRef}
      className={`relative h-full md:min-h-screen bg-black pb-20 md:py-32 overflow-hidden ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 industries-section-content-container">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold text-white mb-12 md:mb-16"
        >
          {title}
        </h2>
        {description && (
          <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-normal text-white mb-12 md:mb-16">
            {description}
          </p>
        )}
        {/* Cards Grid - 2x3 */}
        {industries && industries.length > 0 && (
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-40"
          >
            {industries.map((industry, index) => {
              const bgColor = industry.bgColor || "bg-[#1a1a1a]";
              const padding = industry.padding || "p-6 md:p-8";
              const borderColor = industry.borderColor || "border-transparent";
              const hoverBorderColor = industry.hoverBorderColor || "hover:border-[#555555]";
              const titleColor = industry.titleColor || industry.textColor || "text-white";
              const descriptionColor = industry.descriptionColor || industry.textColor || "text-white";
              const cardClassName = industry.className || "";
              const titleClassName = industry.titleClassName || "";
              const descriptionClassName = industry.descriptionClassName || "";

              return (
                <div
                  key={index}
                  className={`${bgColor} border ${borderColor} rounded-[10px] ${padding} ${hoverBorderColor} transition-all duration-300 ${cardClassName}`}
                >
                  <h3 className={`${titleColor} text-[20px] md:text-[30px] font-[700] mb-4 md:mb-6 ${titleClassName}`}>
                    {industry.title}
                  </h3>
                  <p className={`${descriptionColor} text-[14px] md:text-[20px] font-[300] leading-normal ${descriptionClassName}`}>
                    {industry.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Contact Us Button */}
        {buttonText && (
          <div ref={buttonRef} className="flex justify-center">
            <CallToActionButton variant="shiny" className="rounded-full">
              {buttonText}
            </CallToActionButton>
          </div>
        )}
      </div>
    </section>
  );
}

