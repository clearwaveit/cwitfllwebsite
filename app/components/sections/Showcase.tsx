"use client";

import { useGSAP } from "@/app/hooks/useGSAP";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import HorizontalScrollSlider, { SliderCard } from "@/app/components/ui/HorizontalScrollSlider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import BeforeImage from "@/app/components/ui/BeforeImage";
import beforeImg from "@/app/assets/imgs/__before.png";
import cwitLogo2 from "@/app/assets/imgs/cwit_logo_2.png";
import clockImg from "@/app/assets/imgs/clock_img.png";
import digitalImg from "@/app/assets/imgs/digital_img.png";
import lensImg from "@/app/assets/imgs/lens_img.png";

const DEFAULT_SLIDER_CARDS: SliderCard[] = [
  { type: "text", title: "10+ Years", subtitle: "of Digital Excellence", description: "Across teams in Dubai, the UK, and the US" },
  { type: "image", image: clockImg, title: "300+ Projects", subtitle: "Delivered", description: "" },
  { type: "text", title: "AI-Driven", subtitle: "Automation", description: "Intelligent workflows, automation, and AI integrations across digital platforms", backgroundColor: "bg-white", textColor: "text-black" },
  { type: "image", image: digitalImg, title: "End-to-End", subtitle: "Services", description: "Strategy, design, development, and growth" },
  { type: "text", title: "3 Engagement Models", subtitle: "", description: "Classic / Agile / Venture" },
  { type: "image", image: lensImg, title: "Scalable Solutions", subtitle: "", description: "Built for startups through to enterprise platforms" },
];

const DEFAULT_HEADLINE =
  "Clearwave is a website design company in Dubai delivering web design, web development, web application development, and mobile application development services for businesses building modern digital platforms.";

interface ShowcaseProps {
  headline?: string;
  cards?: SliderCard[];
  beforeImageSrc?: string;
  logoImageSrc?: string;
}

export default function Showcase({ headline, cards, beforeImageSrc, logoImageSrc }: ShowcaseProps = {}) {
  const displayHeadline = headline?.trim() || DEFAULT_HEADLINE;
  const displayCards = cards?.length ? cards : DEFAULT_SLIDER_CARDS;
  const displayBeforeImage = beforeImageSrc || beforeImg;
  const displayLogoImage = logoImageSrc || cwitLogo2;
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const gradientTextRef = useRef<HTMLSpanElement>(null);

  // Animate text reveal on scroll
  useGSAP(
    () => {
      if (!headlineRef.current) return;

      const text = headlineRef.current.querySelector("h2");
      if (!text) return;

      // Split text into words/chars if needed, or just animate opacity of the whole block
      // For the effect "text start appearing full opacity once you start scrolling":
      
      // Reset initial state
      gsap.set(text, { opacity: 0.3 }); // Start semi-transparent

      gsap.to(text, {
        opacity: 1,
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%", // Start fading in when section hits 60% of viewport
          end: "top 30%",   // Full opacity when section hits 30% of viewport
          scrub: true,      // Tie animation to scroll position
        }
      });
    },
    sectionRef,
    []
  );

  // Animate gradient colors based on scroll
  useGSAP(
    () => {
      if (!gradientTextRef.current || !sectionRef.current) return;

      const gradientColors = [
        { from: "#4ade80", to: "#14b8a6" }, // green-400 to teal-500
        { from: "#60a5fa", to: "#a855f7" }, // blue-400 to purple-500
        { from: "#f472b6", to: "#ef4444" }, // pink-400 to red-500
        { from: "#facc15", to: "#f97316" }, // yellow-400 to orange-500
        { from: "#22d3ee", to: "#3b82f6" }, // cyan-400 to blue-500
        { from: "#4ade80", to: "#14b8a6" }, // green-400 to teal-500
      ];

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        onUpdate: (self) => {
          const progress = self.progress;
          const colorIndex = Math.floor(progress * (gradientColors.length - 1));
          const colors = gradientColors[colorIndex];

          if (gradientTextRef.current) {
            gradientTextRef.current.style.backgroundImage = `linear-gradient(to right, ${colors.from}, ${colors.to})`;
          }
        },
      });
    },
    sectionRef,
    []
  );


  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black py-24 overflow-hidden"
    >
      {/* Before Image - Full width */}
      <BeforeImage image={displayBeforeImage} alt="Showcase" />

      {/* CWIT Logo 2 - At top of carousel, 1/4 in carousel */}
      <div className="absolute left-1/2 top-[calc(74vh+8rem-9rem)] -translate-x-1/2 md:max-w-[600px] max-w-[350px] w-full h-100 z-10">
        <Image
          src={displayLogoImage}
          alt="CWIT Logo"
          fill
          className="object-contain"
          unoptimized
        />
      </div>

      <div className="relative z-20 container mx-auto px-4">
        {/* Text Section - Centered vertically */}
        <div className="flex items-center justify-center h-[20vh] md:min-h-[70vh]">
          <div ref={headlineRef} className="text-left space-y-6 lg:max-w-[70%]">
            <h2 className="text-[#ffffff] text-[16px] sm:text-[26px] md:text-[34px] lg:text-[38px] leading-[30px] md:leading-[58px] lg:leading-[52px] font-[400] tracking-normal showcase-heading">
              {displayHeadline}
            </h2>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Slider Section - Full width */}
      <div className="relative z-20 w-full pt-32 pb-12">
        <HorizontalScrollSlider cards={displayCards} />
      </div>
    </section>
  );
}

