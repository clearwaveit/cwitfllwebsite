"use client";

import { useRef, ReactNode } from "react";
import { useGSAP } from "@/app/hooks/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BeforeImage from "@/app/components/ui/BeforeImage";
import CallToActionButton from "@/app/components/ui/CallToActionButton";
import { StaticImageData } from "next/image";

const videoSrc = "/videos/animated_clip_1.mp4";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface FeatureCard {
  title: string | ReactNode;
  description: string | ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
  className?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
}

interface AppStartToEndProps {
  title?: string | ReactNode;
  description?: string | ReactNode;
  buttonText?: string;
  contentMaxWidth?: string;
  videoMaxWidth?: string;
  className?: string;
  layout?: "default" | "with-cards";
  cards?: FeatureCard[];
  videoSrc?: string;
  videoTopOffset?: string;
  padding?: string;
  videoRightOffset?: string;
  backgroundImage?: StaticImageData;
  backgroundImageAlt?: string;
  videoPosition?: "left" | "right";
  contentTextAlign?: "left" | "right";
}

export default function AppStartToEnd({
  title,
  description,
  buttonText = "CONTACT US",
  contentMaxWidth,
  videoMaxWidth = "max-w-[900px]",
  className = "",
  layout = "default",
  cards,
  videoSrc: customVideoSrc,
  videoTopOffset,
  padding,
  videoRightOffset,
  backgroundImage,
  backgroundImageAlt = "Background",
  videoPosition = "right",
  contentTextAlign = "left",
}: AppStartToEndProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const bottomButtonRef = useRef<HTMLDivElement>(null);

  const hasCards = layout === "with-cards" && cards && cards.length > 0;
  const finalVideoSrc = customVideoSrc || videoSrc;

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

      // Animate video
      if (videoContainerRef.current) {
        gsap.set(videoContainerRef.current, {
          x: 50,
          opacity: 0,
          scale: 0.9,
        });
        tl.to(
          videoContainerRef.current,
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
          },
          "-=0.6"
        );
      }

      // Animate cards
      if (hasCards && cardsRef.current) {
        const cardElements = cardsRef.current.children;
        gsap.set(cardElements, {
          y: 30,
          opacity: 0,
        });
        tl.to(
          cardElements,
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

      // Animate bottom button (when cards are present)
      if (hasCards && bottomButtonRef.current) {
        gsap.set(bottomButtonRef.current, {
          y: 20,
          opacity: 0,
        });
        tl.to(
          bottomButtonRef.current,
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
    [hasCards, cards]
  );

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen bg-black overflow-hidden ${padding} ${className}`}
    >
      {/* Background Image with gradient */}
      {backgroundImage && (
        <div className="app-start-to-end-background-image">
          <BeforeImage image={backgroundImage} alt={backgroundImageAlt} />
        </div>
      )}

      {/* Video - Behind everything */}
      <div
        ref={videoContainerRef}
        className={`absolute ${videoTopOffset || ""} ${videoPosition === "left" ? `left-0 ${videoRightOffset || "pl-4 md:pl-8"}` : `${videoRightOffset || "right-0 pr-4 md:pr-8"}`} inset-0 z-10 flex items-center ${videoPosition === "left" ? "justify-start" : "justify-end"}`}
      >
        <div className={`relative w-full ${videoMaxWidth} h-[400px] md:h-[600px] app-start-to-end-video-container`}>
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

      <div className="relative z-30 container mx-auto h-full min-h-screen app-start-to-end-content-container">
        <div className={`flex flex-col ${hasCards ? "md:flex-col" : "md:flex-row"} ${contentMaxWidth} ${hasCards ? "items-start" : "items-center"} justify-center h-full min-h-screen py-20 md:py-0`}>
          {/* Top Section - Content and Video Layout */}
          <div className={`flex flex-col ${hasCards ? "" : "md:flex-row"} w-full ${hasCards ? "items-start" : "items-center"} justify-between ${hasCards ? "mb-12 md:mb-16" : ""}`}>
            {/* Content Section - Always on left side */}
            {/* Content Section - Always positioned on left side */}
            <div
              ref={contentRef}
              className={`w-full ${hasCards ? "md:max-w-full" : "md:max-w-full"} ${videoPosition === "left" && "md:ps-72"} flex flex-col justify-center space-y-6 md:space-y-8 relative z-30 ${contentTextAlign === "right" ? "md:text-right md:items-end" : "md:text-left md:items-start"}`}
            >
              {/* Heading */}
              {title && (
                <h1
                  ref={headingRef}
                  className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[60px] font-[700] text-white leading-tight app-start-to-end-title"
                >
                  {title}
                </h1>
              )}

              {/* Description */}
              {description && (
                <div
                  ref={descriptionRef}
                  className="text-[14px] sm:text-[16px] md:text-[20px] text-white leading-relaxed max-w-full app-start-to-end-description"
                >
                  {description}
                </div>
              )}

              {/* Contact Us Button - Only show in default layout or when no cards */}
              {!hasCards && buttonText && (
                <div ref={buttonRef} className="pt-4">
                  <CallToActionButton variant="shiny" className="rounded-full">
                    {buttonText}
                  </CallToActionButton>
                </div>
              )}
            </div>

            {/* Right Side - Spacer for video visibility in default layout */}
            {!hasCards && (
              <div className="w-full md:w-1/2 hidden md:block" />
            )}
          </div>

          {/* Bottom Section - Cards (only when layout is "with-cards") */}
          {hasCards && (
            <div className="w-full flex flex-col space-y-8 md:space-y-12">
              {/* Cards Grid */}
              <div
                ref={cardsRef}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
              >
                {cards?.map((card, index) => {
                  const bgColor = card.bgColor || "bg-[#1a1a1a]";
                  const textColor = card.textColor || "text-white";
                  const borderColor = card.borderColor || "border-transparent";
                  const hoverBorderColor = card.hoverBorderColor || "hover:border-[#555555]";
                  const cardTitleClassName = card.titleClassName || `${textColor} text-[18px] md:text-[24px] lg:text-[30px] font-bold mb-3 md:mb-20 app-start-to-end-card-title`;
                  const cardDescriptionClassName = card.descriptionClassName || `${textColor} text-[14px] md:text-[16px] lg:text-[20px] app-start-to-end-card-description`;
                  const cardContainerClassName = card.className || "";

                  return (
                    <div
                      key={index}
                      className={`${bgColor} border ${borderColor} rounded-[10px] p-6 md:p-10 ${hoverBorderColor} transition-all duration-300 ${cardContainerClassName}`}
                    >
                      <h3 className={cardTitleClassName}>
                        {card.title}
                      </h3>
                      <p className={cardDescriptionClassName}>
                        {card.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Contact Us Button - Bottom Left */}
              {buttonText && (
                <div ref={bottomButtonRef} className="pt-4">
                  <CallToActionButton variant="shiny" className="rounded-full">
                    {buttonText}
                  </CallToActionButton>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

