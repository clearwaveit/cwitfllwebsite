"use client";

import { useRef, ReactNode } from "react";
import { useGSAP } from "@/app/hooks/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CallToActionButton from "../ui/CallToActionButton";
import Image from "next/image";
import { StaticImageData } from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ServiceCard {
  title: string;
  description: string;
  textColor?: string;
  bgColor?: string;
}

interface AppWhyOptProps {
  videoSrc?: string;
  videoTopOffset?: string;
  videoPosition?: "left" | "right";
  videoRightOffset?: string;
  videoMaxWidth?: string;
  title: string | ReactNode;
  paragraphs?: (string | ReactNode)[];
  services?: ServiceCard[];
  buttonText?: string;
  icon?: StaticImageData | string;
  iconAlt?: string;
  backgroundImage?: StaticImageData | string;
  backgroundImageAlt?: string;
  backgroundImageClassName?: string;
  backgroundOverlay?: boolean;
  backgroundOverlayClassName?: string;
  className?: string;
  contentMaxWidth?: string;
}

export default function AppWhyOpt({
  videoSrc: customVideoSrc,
  videoTopOffset,
  videoPosition = "right",
  videoRightOffset,
  videoMaxWidth = "max-w-[900px]",
  title,
  paragraphs,
  services,
  buttonText,
  icon,
  iconAlt = "icon",
  backgroundImage,
  backgroundImageAlt = "Background",
  backgroundImageClassName = "",
  backgroundOverlay = false,
  backgroundOverlayClassName = "",
  className = "",
  contentMaxWidth = "max-w-full",
}: AppWhyOptProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const finalVideoSrc = customVideoSrc;

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

      // Animate paragraphs
      if (paragraphsRef.current) {
        const paragraphElements = paragraphsRef.current.children;
        gsap.set(paragraphElements, {
          y: 30,
          opacity: 0,
        });
        tl.to(
          paragraphElements,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15,
          },
          "-=0.5"
        );
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
          "-=0.4"
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
          "-=0.3"
        );
      }
    },
    sectionRef,
    []
  );

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen bg-black py-20 md:py-42 overflow-hidden ${className}`}
    >
      {/* Video - Behind everything */}
      {finalVideoSrc && (
        <div
          ref={videoContainerRef}
          className={`absolute ${videoTopOffset || ""} ${videoPosition === "left" ? `left-0 ${videoRightOffset || "pl-4 md:pl-8"}` : `${videoRightOffset || "right-0 pr-4 md:pr-8"}`} inset-0 z-10 flex items-center ${videoPosition === "left" ? "justify-start" : "justify-end"}`}
        >
          <div className={`relative w-full ${videoMaxWidth} h-[400px] md:h-[600px]`}>
            <video
              ref={videoRef}
              src={finalVideoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
      <div className={`relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 ${videoPosition === "left" && "md:ps-72"}`}>
        {icon && (
          <Image
            src={icon}
            alt={iconAlt}
            width={100}
            height={100}
            className="w-auto h-auto"
          />
        )}
        <div className={`${videoPosition === "left" && "md:ps-72"}`}>
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[60px] font-[700] text-white mb-8 md:mb-12 leading-tight max-w-[1300px]"
        >
          {title}
        </h2>

        {/* Paragraphs */}
        {paragraphs && paragraphs.length > 0 && (
          <div ref={paragraphsRef} className={`mb-12 md:mb-24 space-y-4 md:space-y-6 ${contentMaxWidth}`}>
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-[14px] sm:text-[16px] md:text-[20px] font-[350] text-white leading-normal"
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}
        </div>

        {/* Service Cards Grid - 4 cards horizontal */}
        {services && Array.isArray(services) && services.length > 0 && (
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {services.map((service, index) => {
              const bgColor = service.bgColor || "bg-[#1a1a1a]";
              const textColor = service.textColor || "text-white";
              const descColor = textColor === "text-black" ? "text-black/70" : "text-white/70";

              return (
                <div
                  key={index}
                  className={`${bgColor} flex flex-col justify-between items-start gap-8 md:gap-30 border border-[#BFBFBF] rounded-[10px] py-6 md:pt-8 md:pb-12 px-6 md:px-6 hover:border-[#BFBFBF] transition-all duration-300`}
                >
                  <h3 className={`${textColor} text-[18px] md:text-[30px] font-[700] mb-3 md:mb-4`}>
                    {service.title}
                  </h3>
                  <p className={`${descColor} ${textColor} text-[14px] md:text-[20.5px] font-[350] leading-normal`}>
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Contact Us Button */}
        {buttonText && buttonText.trim() !== "" && (
          <div ref={buttonRef} className="flex justify-center mt-12 md:mt-16">
            <CallToActionButton variant="shiny" className="rounded-full">
              {buttonText}
            </CallToActionButton>
          </div>
        )}
      </div>

      {/* Background Image - Full Width (when services are not provided) */}
      {backgroundImage && (!services || !Array.isArray(services) || services.length === 0) && (
        <div ref={cardsRef} className="relative w-screen h-[146px] md:h-[748px] left-1/2 -translate-x-1/2">
          {/* Background Image */}
          <Image
            src={backgroundImage}
            alt={backgroundImageAlt}
            fill
            className={`object-contain ${backgroundImageClassName}`}
            priority
            unoptimized
          />
          {/* Optional Overlay */}
          {backgroundOverlay && (
            <div className={`absolute inset-0 bg-black/50 ${backgroundOverlayClassName}`} />
          )}
        </div>
      )}
    </section>
  );
}

