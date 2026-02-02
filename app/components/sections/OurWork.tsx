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
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

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

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedItem) {
        setSelectedItem(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedItem]);

  // Animate modal
  useEffect(() => {
    if (selectedItem && modalRef.current && modalContentRef.current) {
      gsap.fromTo(modalRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(modalContentRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [selectedItem]);

  // NEW DESIGN - Horizontal Scrolling
  if (useNewDesign) {
    return (
      <section
        ref={sectionRef}
        className={`relative min-h-screen bg-black overflow-hidden ${className}`}
      >
        {/* Mobile Layout - Vertical Stack */}
        <div className="flex flex-col md:hidden py-12 md:py-20">
          {/* Title */}
          <div className="mb-8 flex justify-center">
            <h2 className="text-white our-work-mobile-heading text-center">
              <span className="inline text-[48px] sm:text-[60px] font-[700] leading-[0.85] tracking-tight">
                OUR{" "}
              </span>
              <span className="inline text-[48px] sm:text-[60px] font-[700] leading-[0.85] tracking-tight">
                WORK
              </span>
            </h2>
          </div>

          {/* Cards - Vertical scroll on mobile */}
          <div className="flex flex-col gap-6">
            {workItems.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedItem(item)}
                className="w-full bg-black border border-[#C1C1C1] overflow-hidden flex flex-col cursor-pointer"
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
            className={`flex h-[910px] items-center will-change-transform our-work-container our-work-responsive-container ${
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
              <h2 className="text-white mb-12 lg:mb-16 xl:mb-20 our-work-title our-work-desktop-heading">
                <span className="block text-[70px] lg:text-[90px] xl:text-[128px] font-[700] leading-[0.85] tracking-tight our-work-title-text">
                  OUR
                </span>
                <span className="block text-[70px] lg:text-[90px] xl:text-[128px] font-[700] leading-[0.85] tracking-tight our-work-title-text">
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
                  onClick={() => setSelectedItem(item)}
                  className="flex-shrink-0 w-[380px] lg:w-[480px] xl:w-[604px] h-auto bg-black border border-[#C1C1C1] overflow-hidden flex flex-col our-work-card our-work-responsive-card cursor-pointer"
                >
                  {/* Category Tags - Top */}
                  {item.category && (
                    <div className="flex flex-col pt-4 lg:pt-10 px-5 lg:px-8 pb-40 category-tags-container">
                      {item.category.split('\n').map((cat, idx) => (
                        <span
                          key={idx}
                          className="text-white text-[14px] lg:text-[20px] xl:text-[20px] uppercase tracking-[0.1em] font-[400] category-text"
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
                    <p className="text-white text-[15px] lg:text-[18px] xl:text-[22px] leading-[1.5] font-[400] our-work-item-description our-work-description">
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

        {/* Modal/Popup */}
        {selectedItem && (
          <div 
            ref={modalRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <div 
              ref={modalContentRef}
              className="relative bg-zinc-900 rounded-lg max-w-4xl w-full mx-4 p-8 md:p-12 border border-[#BFBFBF] max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors text-2xl font-bold z-10"
              >
                ×
              </button>

              {/* Modal Content */}
              <div className="space-y-6">
                {/* Image */}
                <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                
                <div>
                  {/* Category */}
                  {selectedItem.category && (
                    <div className="mb-4">
                      {selectedItem.category.split('\n').map((cat, idx) => (
                        <span
                          key={idx}
                          className="text-white text-sm md:text-base uppercase tracking-[0.1em] font-[400] block"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {selectedItem.title}
                  </h3>

                  {/* Description */}
                  <p className="text-lg md:text-xl text-white leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
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

