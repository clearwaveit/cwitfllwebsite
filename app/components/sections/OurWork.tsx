"use client";

import Image from "next/image";
import CallToActionButton from "@/app/components/ui/CallToActionButton";
import ourWorkImg from "@/app/assets/imgs/our_work_img.png";
import { StaticImageData } from "next/image";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface WorkItem {
  title: string;
  description: string;
  image: string | StaticImageData;
  category?: string;
}

interface OurWorkProps {
  title?: string;
  workItems: WorkItem[];
  ctaVariant?: "outline" | "filled" | "shiny";
  className?: string;
  showCTA?: boolean;
  useNewDesign?: boolean; // Toggle between old and new design
}

export default function OurWork({
  title,
  workItems,
  ctaVariant = "shiny",
  className = "",
  showCTA = true,
  useNewDesign = true,
}: OurWorkProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Horizontal scroll animation on page scroll - only for new design
  useEffect(() => {
    if (!useNewDesign || !sectionRef.current || !cardsContainerRef.current) return;

    const section = sectionRef.current;
    const cardsContainer = cardsContainerRef.current;

    // Set initial position
    gsap.set(cardsContainer, { x: 0 });

    // Calculate the total scroll distance
    const getScrollAmount = () => {
      const cardsWidth = cardsContainer.scrollWidth;
      const viewportWidth = window.innerWidth;
      // Return negative value to move everything left when scrolling down
      return -(cardsWidth - viewportWidth);
    };

    // Create the horizontal scroll animation
    const scrollTween = gsap.to(cardsContainer, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${Math.abs(getScrollAmount())}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [workItems, useNewDesign]);

  // Drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!cardsContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX);

    const currentX = gsap.getProperty(cardsContainerRef.current, "x") as number;
    setScrollLeft(currentX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !cardsContainerRef.current) return;
    e.preventDefault();

    const x = e.pageX;
    const walk = (x - startX) * 2;
    const newX = scrollLeft + walk;

    const cardsWidth = cardsContainerRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    const maxScroll = -(cardsWidth - viewportWidth);

    const clampedX = Math.max(maxScroll, Math.min(0, newX));

    gsap.to(cardsContainerRef.current, {
      x: clampedX,
      duration: 0,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!cardsContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX);

    const currentX = gsap.getProperty(cardsContainerRef.current, "x") as number;
    setScrollLeft(currentX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !cardsContainerRef.current) return;

    const x = e.touches[0].pageX;
    const walk = (x - startX) * 2;
    const newX = scrollLeft + walk;

    const cardsWidth = cardsContainerRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    const maxScroll = -(cardsWidth - viewportWidth);

    const clampedX = Math.max(maxScroll, Math.min(0, newX));

    gsap.to(cardsContainerRef.current, {
      x: clampedX,
      duration: 0,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // NEW DESIGN - Horizontal Scrolling
  if (useNewDesign) {
    return (
      <section
        ref={sectionRef}
        className={`relative min-h-screen bg-black overflow-hidden ${className}`}
      >
        {/* Mobile Layout - Vertical Stack */}
        <div className="flex flex-col md:hidden py-12 px-4">
          {/* Title */}
          <div className="mb-8">
            <h2 className="text-white">
              <span className="block text-[48px] sm:text-[60px] font-[700] leading-[0.85] tracking-tight">
                OUR
              </span>
              <span className="block text-[48px] sm:text-[60px] font-[700] leading-[0.85] tracking-tight">
                WORK
              </span>
            </h2>
          </div>

          {/* Cards - Vertical scroll on mobile */}
          <div className="flex flex-col gap-6">
            {workItems.map((item, index) => (
              <div
                key={index}
                className="w-full bg-black border border-[#C1C1C1] overflow-hidden flex flex-col"
              >
                {/* Category Tags */}
                {item.category && (
                  <div className="flex flex-col pt-10 px-4 pb-30">
                    {item.category.split('\n').map((cat, idx) => (
                      <span
                        key={idx}
                        className="text-white text-[10px] sm:text-[12px] uppercase tracking-[0.1em] font-[300]"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <div className="px-4 pb-2">
                  <h3 className="text-white text-[20px] sm:text-[24px] font-[400] leading-[1.2]">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="px-4 pb-10">
                  <p className="text-white text-[13px] sm:text-[14px] leading-[1.5] font-[300]">
                    {item.description}
                  </p>
                </div>

                {/* Image */}
                <div className="relative w-full h-[200px] sm:h-[240px] overflow-hidden">
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

          {/* CTA Button */}
          {showCTA && (
            <div className="mt-8 flex justify-center">
              <CallToActionButton variant={ctaVariant}>
                CALL TO ACTION
              </CallToActionButton>
            </div>
          )}
        </div>

        {/* Desktop/Tablet Layout - Horizontal Scroll */}
        <div className="hidden md:flex h-screen items-center overflow-hidden">
          {/* Single container for both title and cards that moves together */}
          <div
            ref={cardsContainerRef}
            className={`flex h-[910px] items-center will-change-transform our-work-container ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Left Side - Title and CTA */}
            <div className="flex-shrink-0 w-[280px] lg:w-[400px] xl:w-[520px] flex flex-col justify-center items-start pl-8 lg:pl-16 xl:pl-20 pr-6 lg:pr-10 py-12 our-work-title-container">
              <h2 className="text-white mb-12 lg:mb-16 xl:mb-20 our-work-title">
                <span className="block text-[70px] lg:text-[90px] xl:text-[120px] font-[300] leading-[0.85] tracking-tight our-work-title-text">
                  OUR
                </span>
                <span className="block text-[70px] lg:text-[90px] xl:text-[120px] font-[300] leading-[0.85] tracking-tight our-work-title-text">
                  WORK
                </span>
              </h2>
              {showCTA && (
                <CallToActionButton variant="shiny">
                  CALL TO ACTION
                </CallToActionButton>
              )}
            </div>

            {/* Cards */}
            <div className="flex items-center gap-4 lg:gap-2 pr-8 lg:pr-16 xl:pr-20 our-work-cards-container">
              {workItems.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[380px] lg:w-[480px] xl:w-[604px] h-auto bg-black border border-[#C1C1C1] overflow-hidden flex flex-col our-work-card"
                >
                  {/* Category Tags - Top */}
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
                    <h3 className="text-white text-[28px] lg:text-[34px] xl:text-[41px] font-[400] leading-[1.2] our-work-item-title">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="max-w-[460px] px-5 lg:px-8 pb-4 lg:pb-16">
                    <p className="text-white text-[15px] lg:text-[18px] xl:text-[22px] leading-[1.5] font-[300] our-work-item-description">
                      {item.description}
                    </p>
                  </div>

                  {/* Image - Bottom */}
                  <div className="relative w-full h-[220px] lg:h-[280px] xl:h-[342px] overflow-hidden our-work-item-image">
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
        </div>
      </section>
    );
  }

  // OLD DESIGN - Grid Layout (Hidden by default)
  return (
    <section className={`relative min-h-screen py-24 bg-black overflow-hidden ${className}`}>
      <div className="relative z-10">
        {/* Title Section */}
        <div className="flex justify-center mb-6 md:mb-10">
          <h2 className="text-[60px] md:text-[200px] font-graphik-light-weight-300 text-white">
            {title}
          </h2>
        </div>

        {/* Content Grid - 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-2 mb-10 mx-auto">
          {workItems.map((item, index) => (
            <div key={index} className="flex flex-col">
              {/* Image */}
              <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden mb-6 md:mb-10">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={957}
                  height={542}
                  className="object-cover w-[957px] h-[300px] md:w-[957px] md:h-[542px]"
                  unoptimized
                />
              </div>

              {/* Text Content */}
              <div className="text-white ps-6 md:pb-10 pb-6 md:pb-20 px-4 md:pe-0">
                <h3 className="text-[26px] md:text-[36px] font-light leading-[40px] md:leading-[48px] mb-3">
                  {item.title}
                </h3>
                <p className="text-[16px] md:text-[22px] leading-relaxed opacity-90">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Button */}
        {showCTA && (
          <div className="flex justify-center">
            <CallToActionButton variant="shiny" />
          </div>
        )}
      </div>
    </section>
  );
}

