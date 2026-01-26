"use client";

import { useRef, ReactNode } from "react";
import { useGSAP } from "@/app/hooks/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CallToActionButton from "../ui/CallToActionButton";
import Image, { StaticImageData } from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SplitContentSectionProps {
  title: string | ReactNode;
  description: string | ReactNode;
  buttonText?: string;
  image?: StaticImageData | string;
  imageAlt?: string;
  videoSrc?: string;
  videoElementClassName?: string;
  layout?: "content-left" | "content-right";
  contentMaxWidth?: string;
  imageMaxWidth?: string;
  imageClassName?: string;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export default function SplitContentSection({
  title,
  description,
  buttonText,
  image,
  imageAlt = "Content image",
  videoSrc,
  videoElementClassName = "object-contain",
  layout = "content-left",
  contentMaxWidth = "max-w-full",
  imageMaxWidth,
  imageClassName = "",
  className = "",
  contentClassName = "",
  titleClassName = "",
  descriptionClassName = "",
}: SplitContentSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

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

      // Animate image
      if (imageRef.current && image) {
        gsap.set(imageRef.current, {
          x: layout === "content-right" ? -50 : 50,
          opacity: 0,
          scale: 0.95,
        });
        tl.to(
          imageRef.current,
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

      // Animate video
      if (videoContainerRef.current && videoSrc) {
        gsap.set(videoContainerRef.current, {
          x: layout === "content-right" ? -50 : 50,
          opacity: 0,
          scale: 0.95,
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

      // Animate button
      if (buttonRef.current && buttonText && buttonText.trim() !== "") {
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
    [layout, image, videoSrc, buttonText]
  );

  const isContentRight = layout === "content-right";

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen bg-black py-20 md:py-32 overflow-hidden ${className}`}
    >
      <div className="h-full min-h-screens">
        <div
          className={`flex flex-col ${isContentRight ? "md:flex-row-reverse" : "md:flex-row"} ${contentMaxWidth} items-center justify-between h-full min-h-screen gap-8 md:gap-12`}
        >
          {/* Content Section */}
          <div
            ref={contentRef}
            className={`w-full md:max-w-full flex flex-col justify-end md:ps-42 space-y-6 md:space-y-8 ${contentClassName}`}
          >
            {/* Heading */}
            <h1
              ref={headingRef}
              className={`text-[32px] sm:text-[40px] md:text-[48px] lg:text-[60px] font-[700] text-white leading-tight ${titleClassName}`}
            >
              {title}
            </h1>

            {/* Description */}
            <div
              ref={descriptionRef}
              className={`text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] max-w-[706px] text-white leading-relaxed ${descriptionClassName}`}
            >
              {description}
            </div>

            {/* Contact Us Button */}
            {buttonText && (
              <div ref={buttonRef} className="pt-4">
                <CallToActionButton variant="shiny" className="rounded-full">
                  {buttonText}
                </CallToActionButton>
              </div>
            )}
          </div>

          {/* Image Section */}
          {image && (
            <div
              ref={imageRef}
              className={`w-full flex items-center justify-end ${imageClassName}`}
            >
              <div className={`relative w-full h-[600px] md:h-[700px] lg:h-[800px] ${imageMaxWidth} overflow-hidden`}>
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  className="object-cover object-left rounded-l-[20px] md:rounded-l-[30px]"
                  priority
                  unoptimized
                />
              </div>
            </div>
          )}

          {/* Video Section */}
          {videoSrc && (
            <div
              ref={videoContainerRef}
              className={`w-full flex items-center justify-end ${imageClassName}`}
            >
              <div className={`relative w-full h-[600px] md:h-[700px] lg:h-[800px] ${imageMaxWidth} overflow-hidden rounded-l-[20px] md:rounded-l-[30px]`}>
                <video
                  ref={videoRef}
                  src={videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={`w-full h-full ${videoElementClassName} rounded-l-[20px] md:rounded-l-[30px]`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

