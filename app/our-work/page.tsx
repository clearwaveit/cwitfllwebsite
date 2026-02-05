"use client";

import DigitalExperienceBanner from "@/app/components/sections/DigitalExperienceBanner"
import { WorkItem } from "../components/sections/OurWork";
import Accordion from "../components/sections/Accordion";
import ourWorkImg from "@/app/assets/imgs/our_work_img.png";
import vectorBg from "@/app/assets/imgs/Mask group (1).png";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutUsPage() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const defaultWorkItems: WorkItem[] = [
    {
      title: "The Oxford Institute",
      description: "70% increased in digital interaction of potential students looking for information",
      image: ourWorkImg,
      category: "EDUCATION\nTECH\nWEBSITE",
    },
    {
      title: "The Oxford Institute",
      description: "70% increased in digital interaction of potential students looking for information",
      image: ourWorkImg,
      category: "EDUCATION\nTECH\nWEBSITE",
    },
    {
      title: "The Oxford Institute",
      description: "70% increased in digital interaction of potential students looking for information",
      image: ourWorkImg,
      category: "EDUCATION\nTECH\nWEBSITE",
    },
    {
      title: "The Oxford Institute",
      description: "70% increased in digital interaction of potential students looking for information",
      image: ourWorkImg,
      category: "EDUCATION\nTECH\nWEBSITE",
    },
    {
      title: "The Oxford Institute",
      description: "70% increased in digital interaction of potential students looking for information",
      image: ourWorkImg,
      category: "EDUCATION\nTECH\nWEBSITE",
    },
    {
      title: "The Oxford Institute",
      description: "70% increased in digital interaction of potential students looking for information",
      image: ourWorkImg,
      category: "EDUCATION\nTECH\nWEBSITE",
    },
    {
      title: "The Oxford Institute",
      description: "70% increased in digital interaction of potential students looking for information",
      image: ourWorkImg,
      category: "EDUCATION\nTECH\nWEBSITE",
    },
    {
      title: "The Oxford Institute",
      description: "70% increased in digital interaction of potential students looking for information",
      image: ourWorkImg,
      category: "EDUCATION\nTECH\nWEBSITE",
    },
    {
      title: "The Oxford Institute",
      description: "70% increased in digital interaction of potential students looking for information",
      image: ourWorkImg,
      category: "EDUCATION\nTECH\nWEBSITE",
    },
    {
      title: "The Oxford Institute",
      description: "70% increased in digital interaction of potential students looking for information",
      image: ourWorkImg,
      category: "EDUCATION\nTECH\nWEBSITE",
    },
    {
      title: "The Oxford Institute",
      description: "70% increased in digital interaction of potential students looking for information",
      image: ourWorkImg,
      category: "EDUCATION\nTECH\nWEBSITE",
    },
    {
      title: "The Oxford Institute",
      description: "70% increased in digital interaction of potential students looking for information",
      image: ourWorkImg,
      category: "EDUCATION\nTECH\nWEBSITE",
    }
  ];

  useEffect(() => {
    if (!sectionRef.current || !cardsContainerRef.current) return;

    const cards = cardsContainerRef.current.querySelectorAll('.work-card');

    // Set initial state
    gsap.set(cards, { opacity: 0, y: 80, scale: 0.95 });

    // Create timeline for animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate cards with stagger
    tl.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
    });

    // Hover animations for cards
    cards.forEach((card) => {
      const cardElement = card as HTMLElement;
      
      cardElement.addEventListener('mouseenter', () => {
        gsap.to(cardElement, {
          scale: 1.02,
          y: -5,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      cardElement.addEventListener('mouseleave', () => {
        gsap.to(cardElement, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    return () => {
      tl.kill();
      const triggers = ScrollTrigger.getAll();
      triggers.forEach((trigger) => {
        if (trigger.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);
  return (
    <main className="min-h-screen">
      <DigitalExperienceBanner
        title={
          <>
            Our Work
          </>
        }
        description="Digital Experiences That Inspire and Perform"
        backgroundImage={{
          src: vectorBg.src,
          alt: "Background",
        }}
      />
      {/* Custom Grid Layout with New Design Cards - 3 per row */}
      <section ref={sectionRef} className="relative bg-black py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden">
        <div className="relative z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 max-w-[1920px]">
          {/* Grid - 3 cards per row */}
          <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {defaultWorkItems.map((item, index) => (
              <div
                key={index}
                onClick={() => window.open('/work-details', '_blank')}
                className="work-card bg-black border border-[#C1C1C1] overflow-hidden flex flex-col cursor-pointer"
              >
                {/* Category Tags */}
                {item.category && (
                  <div className="flex flex-col pt-4 lg:pt-10 px-5 lg:px-8 pb-40">
                    {item.category.split('\n').map((cat, idx) => (
                      <span
                        key={idx}
                        className="text-white text-[14px] lg:text-[20px] xl:text-[20px] uppercase tracking-[0.1em] font-[400]"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <div className="px-5 lg:px-8 pb-2 lg:pb-3">
                  <h3 className="text-white text-[28px] lg:text-[34px] xl:text-[41px] font-[400] leading-[1.2]">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="max-w-[460px] px-5 lg:px-8 pb-4 lg:pb-16">
                  <p className="text-white text-[15px] lg:text-[18px] xl:text-[22px] leading-[1.5] font-[400]">
                    {item.description}
                  </p>
                </div>

                {/* Image */}
                <div className="relative w-full h-[220px] lg:h-[260px] xl:h-[300px] 2xl:h-[320px] min-[1440px]:h-[335px] min-[1920px]:h-[342px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Accordion />
    </main>
  );
}

