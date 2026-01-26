"use client";

import { useRef } from "react";
import { useGSAP } from "@/app/hooks/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Carousel, { CarouselCard } from "@/app/components/ui/Carousel";
import TextSection from "../ui/TextSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const servicesCards: CarouselCard[] = [
  {
    type: "text",
    title: "UI/UX Design",
    description: "add value to your digital presence",
    marketInfo: "Across UAE, UK & US markets",
    backgroundColor: "bg-zinc-900",
    textColor: "text-white",
  },
  {
    type: "text",
    title: "Ecommerce Solutions",
    description: "Smart integrations in web & mobile solutions",
    backgroundColor: "bg-[#E3E3E3]",
    textColor: "text-black",
  },
  {
    type: "text",
    title: "Website Development",
    subtitle: "of Digital Excellence",
    marketInfo: "Across UAE, UK & US markets",
    backgroundColor: "bg-black",
    textColor: "text-white",
  },
  {
    type: "text",
    title: "CMS & Integrations",
    subtitle: "Automation",
    description: "Smart integrations in web & mobile solutions",
    backgroundColor: "bg-[#E3E3E3]",
    textColor: "text-black",
  },
  {
    type: "text",
    title: "AI-Driven",
    subtitle: "Automation",
    description: "Smart integrations in web & mobile solutions",
    backgroundColor: "bg-zinc-100",
    textColor: "text-black",
  },
];

export default function DigitalExperienceServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Animate heading on scroll
  useGSAP(
    () => {
      if (!headingRef.current) return;

      gsap.fromTo(
        headingRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    sectionRef,
    []
  );

  // Animate carousel on scroll
  useGSAP(
    () => {
      if (!carouselRef.current) return;

      gsap.fromTo(
        carouselRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.3,
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

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden isolate"
    >
      <div className="relative z-20 mx-auto">
        {/* Carousel Section */}
        <div ref={carouselRef} className="relative z-20 w-full overflow-hidden py-8">
          <Carousel cards={servicesCards} speed={60} pauseOnHover={true} />
        </div>
        {/* Text Section */}
        <TextSection
          paragraphs={[
            "ClearWave, one of the best agencies in Dubai, we design and develop websites, e-commerce platforms, and digital experiences in Dubai that are crafted to captivate, built to perform, and ready to grow.",
            "As we are adept in developing visual and verbal excellence,  we make sure your brand is highlighted with a user-friendly, accessible and adaptive user interface that will make your website relevant in this ever-evolving prospect."
          ]}
          className="py-12 md:py-64 text-section-padding w-full max-w-[1330px]"
        />
      </div>
    </section>
  );
}

