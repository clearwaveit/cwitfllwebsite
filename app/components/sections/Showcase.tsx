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

const sliderCards: SliderCard[] = [
  {
    type: "text",
    title: "10+ Years",
    subtitle: "of Digital Excellence",
    description: "Across UAE, UK & US markets",
  },
  {
    type: "image",
    image: clockImg,
    title: "300+ Projects",
    subtitle: "Delivered",
    description: "Across 25+ industries",
  },
  {
    type: "text",
    title: "AI-Driven",
    subtitle: "Automation",
    description: "Smart integrations in web & mobile solutions",
    backgroundColor: "bg-white",
    textColor: "text-black",
  },
  {
    type: "image",
    image: digitalImg,
    title: "End-to-End",
    subtitle: "Services",
    description: "Design, Development, SEO, SMM & Branding",
  },
  {
    type: "text",
    title: "3 Engangement Models",
    subtitle: "Solutions",
    description: "Classic / Agile / Venture",
  },
  {
    type: "image",
    image: lensImg,
    title: "Scalable Solutions",
    subtitle: "",
    description: "Built for startups to enterprise-level systems",
  },
];

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const gradientTextRef = useRef<HTMLSpanElement>(null);

  // Animate headline on scroll
  useGSAP(
    () => {
      if (!headlineRef.current) return;

      gsap.fromTo(
        headlineRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.25, // Minor delay
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
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
      <BeforeImage image={beforeImg} alt="Showcase" />

      {/* CWIT Logo 2 - At top of carousel, 1/4 in carousel */}
      <div className="absolute left-1/2 top-[calc(54vh+8rem-9rem)] -translate-x-1/2 max-w-[800px] w-full h-100 z-10">
        <Image
          src={cwitLogo2}
          alt="CWIT Logo"
          fill
          className="object-contain"
          unoptimized
        />
      </div>

      <div className="relative z-20 container mx-auto px-4">
        {/* Text Section - Centered vertically */}
        <div className="flex items-center justify-center h-[20vh] md:min-h-[50vh]">
          <div ref={headlineRef} className="text-left space-y-6">
            <h2 className="text-[#ffffff] text-[16px] sm:text-[26px] md:text-[34px] lg:text-[60px] leading-[30px] md:leading-[58px] lg:leading-[72px] font-[400] tracking-normal showcase-heading">
              Website Design Company in Dubai delivering
              <br />
              <span
                className="bg-clip-text text-[#D9D9D9] transition-all duration-500"
              >
                digital experiences powered by creativity and
              </span>
              <br />
              AI efficiency.
            </h2>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Slider Section - Full width */}
      <div className="relative z-20 w-full pt-32 pb-12">
        <HorizontalScrollSlider cards={sliderCards} />
      </div>
    </section>
  );
}

