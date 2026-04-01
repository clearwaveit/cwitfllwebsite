"use client";

import Image from "next/image";
import CallToActionButton from "@/app/components/ui/CallToActionButton";
import { StaticImageData } from "next/image";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface WorkItem {
  title: string;
  description: string;
  image: string | StaticImageData;
  popupImage?: string | StaticImageData;
  category?: string;
  websiteUrl?: string;
  /** Portfolio URL (e.g. /slug). When set, card click navigates here instead of opening modal. */
  link?: string;
}

interface OurWorkProps {
  title?: string;
  workItems: WorkItem[];
  ctaVariant?: "outline" | "filled" | "shiny";
  className?: string;
  showCTA?: boolean;
  useNewDesign?: boolean; // Toggle between old and new design
  cardClickAction?: "navigate" | "modal";
}

/** Portfolio base path: e.g. /work-details/example */
const PORTFOLIO_BASE = "/work-details";

function getPortfolioHref(link: string | undefined): string {
  if (!link?.trim()) return "/our-work";
  const raw = link.trim();
  if (raw.startsWith("/work-details/")) return raw;
  const slug = raw.replace(/^\/+|\/+$/g, "").replace(/^work\//, "").replace(/^work-details\//, "");
  if (!slug) return "/our-work";
  return `${PORTFOLIO_BASE}/${slug}`;
}

function getWorkItemNavigation(item: WorkItem): { type: "internal" | "external"; href: string } | null {
  if (item.link?.trim()) {
    return { type: "internal", href: getPortfolioHref(item.link) };
  }

  if (item.websiteUrl?.trim()) {
    return { type: "external", href: item.websiteUrl.trim() };
  }

  return null;
}

function getCategoryLines(category: string | undefined): string[] {
  if (!category?.trim()) return [];

  const normalized = category
    .replace(/&lt;br\s*\/?&gt;/gi, "\n")
    .replace(/\\n/g, "\n")
    .replace(/&#10;|&#x0*a;/gi, "\n")
    .replace(/&nbsp;/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>\s*<p>/gi, "\n")
    .replace(/<\/?(p|div|span)\b[^>]*>/gi, "");

  const lines = normalized
    .split(/\r?\n/)
    .map((line) => line.replace(/<[^>]+>/g, "").trim())
    .filter(Boolean);

  if (lines.length > 1) return lines;

  const words = (lines[0] ?? "").split(/\s+/).filter(Boolean);
  if (words.length > 1 && words.length <= 3) {
    return [words[0], words.slice(1).join(" ")].filter(Boolean);
  }

  return lines;
}

function getHorizontalScrollAmount(container: HTMLDivElement): number {
  const viewportWidth = window.innerWidth;
  const overflowShift = Math.min(0, viewportWidth - container.scrollWidth);
  const cardsWrapper = container.querySelector<HTMLElement>(".our-work-cards-container");
  const firstCard = cardsWrapper?.querySelector<HTMLElement>("[data-work-card]");

  if (!cardsWrapper || !firstCard) {
    return overflowShift;
  }

  const containerRect = container.getBoundingClientRect();
  const cardsWrapperRect = cardsWrapper.getBoundingClientRect();
  const firstCardStart = cardsWrapperRect.left - containerRect.left + firstCard.offsetLeft;
  const alignFirstCardShift = Math.min(0, -firstCardStart);

  return Math.min(overflowShift, alignFirstCardShift);
}

export default function OurWork({
  title,
  workItems,
  ctaVariant = "shiny",
  className = "",
  showCTA = true,
  useNewDesign = true,
  cardClickAction = "navigate",
}: OurWorkProps) {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const clickedCardIndexRef = useRef<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const previousSelectedItemRef = useRef<WorkItem | null>(null);

  const navigateToItem = (item: WorkItem) => {
    const target = getWorkItemNavigation(item);
    if (!target) return;

    if (target.type === "external") {
      if (cardClickAction !== "navigate") return;
      window.open(target.href, "_blank", "noopener,noreferrer");
      return;
    }

    router.push(target.href);
  };

  const openModalItem = (item: WorkItem) => {
    setIsImageLoading(true);
    setSelectedItem(item);
  };

  const isItemClickable = (item: WorkItem) => {
    if (item.link?.trim()) return true;
    if (cardClickAction === "modal") return true;
    return !!item.websiteUrl?.trim();
  };

  useEffect(() => {
    if (!selectedItem) return;
    const currentIndex = workItems.findIndex((item) => item === selectedItem);
    if (currentIndex === -1 || typeof window === "undefined") return;

    const preload = (item: WorkItem | undefined) => {
      if (!item) return;
      const img = new window.Image();
      const src =
        typeof item.popupImage === "string"
          ? item.popupImage
          : typeof item.image === "string"
            ? item.image
            : "";
      if (src) img.src = src;
    };

    preload(workItems[(currentIndex + 1) % workItems.length]);
    preload(workItems[(currentIndex - 1 + workItems.length) % workItems.length]);
  }, [selectedItem, workItems]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedItem) {
        setSelectedItem(null);
      } else if (e.key === "ArrowLeft" && selectedItem) {
        const currentIndex = workItems.findIndex((item) => item === selectedItem);
        const prevIndex = (currentIndex - 1 + workItems.length) % workItems.length;
        openModalItem(workItems[prevIndex]);
      } else if (e.key === "ArrowRight" && selectedItem) {
        const currentIndex = workItems.findIndex((item) => item === selectedItem);
        const nextIndex = (currentIndex + 1) % workItems.length;
        openModalItem(workItems[nextIndex]);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedItem, workItems]);

  useEffect(() => {
    const previousItem = previousSelectedItemRef.current;
    const shouldAnimateOpen =
      !!selectedItem &&
      !previousItem &&
      !!modalRef.current &&
      !!modalContentRef.current;

    if (shouldAnimateOpen && modalRef.current && modalContentRef.current) {
      gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        modalContentRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    }

    previousSelectedItemRef.current = selectedItem;
  }, [selectedItem]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedItem) return;
    const currentIndex = workItems.findIndex((item) => item === selectedItem);
    const prevIndex = (currentIndex - 1 + workItems.length) % workItems.length;
    openModalItem(workItems[prevIndex]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedItem) return;
    const currentIndex = workItems.findIndex((item) => item === selectedItem);
    const nextIndex = (currentIndex + 1) % workItems.length;
    openModalItem(workItems[nextIndex]);
  };

  const handleModalAction = () => {
    if (!selectedItem) return;
    if (selectedItem.websiteUrl) {
      window.open(selectedItem.websiteUrl, "_blank", "noopener,noreferrer");
      return;
    }
    if (selectedItem.link) {
      router.push(getPortfolioHref(selectedItem.link));
    }
  };

  // Horizontal scroll animation on page scroll - only for new design
  useEffect(() => {
    if (!useNewDesign || !sectionRef.current || !cardsContainerRef.current) return;

    const section = sectionRef.current;
    const cardsContainer = cardsContainerRef.current;

    // Set initial position
    gsap.set(cardsContainer, { x: 0 });

    // Calculate the total scroll distance
    const getScrollAmount = () => getHorizontalScrollAmount(cardsContainer);

    const initialScrollAmount = getScrollAmount();
    if (initialScrollAmount === 0) {
      return;
    }

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
    const card = (e.target as HTMLElement).closest("[data-work-card]");
    const idx = card?.getAttribute("data-index");
    clickedCardIndexRef.current = idx != null ? parseInt(idx, 10) : null;
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

    const maxScroll = getHorizontalScrollAmount(cardsContainerRef.current);

    const clampedX = Math.max(maxScroll, Math.min(0, newX));

    gsap.to(cardsContainerRef.current, {
      x: clampedX,
      duration: 0,
    });
  };

  const handleMouseUp = () => {
    if (cardsContainerRef.current) {
      const currentX = gsap.getProperty(cardsContainerRef.current, "x") as number;
      const moved = Math.abs(currentX - scrollLeft) > 3;
      if (!moved) {
        if (clickedCardIndexRef.current != null && workItems[clickedCardIndexRef.current]) {
          handleCardSelect(workItems[clickedCardIndexRef.current]);
        }
      }
    }
    clickedCardIndexRef.current = null;
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    clickedCardIndexRef.current = null;
    setIsDragging(false);
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!cardsContainerRef.current) return;
    const card = (e.target as HTMLElement).closest("[data-work-card]");
    const idx = card?.getAttribute("data-index");
    clickedCardIndexRef.current = idx != null ? parseInt(idx, 10) : null;
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

    const maxScroll = getHorizontalScrollAmount(cardsContainerRef.current);

    const clampedX = Math.max(maxScroll, Math.min(0, newX));

    gsap.to(cardsContainerRef.current, {
      x: clampedX,
      duration: 0,
    });
  };

  const handleTouchEnd = () => {
    if (cardsContainerRef.current) {
      const currentX = gsap.getProperty(cardsContainerRef.current, "x") as number;
      const moved = Math.abs(currentX - scrollLeft) > 3;
      if (!moved) {
        if (clickedCardIndexRef.current != null && workItems[clickedCardIndexRef.current]) {
          handleCardSelect(workItems[clickedCardIndexRef.current]);
        }
      }
    }
    clickedCardIndexRef.current = null;
    setIsDragging(false);
  };

  const handleCardSelect = (item: WorkItem) => {
    if (item.link?.trim()) {
      navigateToItem(item);
      return;
    }

    if (cardClickAction === "modal") {
      openModalItem(item);
      return;
    }

    navigateToItem(item);
  };

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
          <div className="flex flex-col gap-6 px-4 sm:px-5">
            {workItems.map((item, index) => (
              <div
                key={index}
                onClick={() => handleCardSelect(item)}
                className={`w-full bg-black border border-[#C1C1C1] overflow-hidden flex flex-col ${
                  isItemClickable(item) ? "cursor-pointer" : "cursor-default"
                }`}
              >
                {/* Category Tags */}
                {item.category && (
                  <div className="flex flex-col pt-10 px-4 pb-30">
                    {getCategoryLines(item.category).map((cat, idx) => (
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
                  <h3 className="text-white text-[20px] sm:text-[24px] font-[400] leading-[1.3] sm:leading-[1.35] md:leading-[1.4]">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="px-4 pb-10">
                  <p className="text-white text-[13px] sm:text-[14px] leading-[1.5] sm:leading-[1.6] md:leading-[1.7] font-[300]">
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
                    unoptimized={typeof item.image === "string"}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          {showCTA && (
            <div className="mt-8 flex justify-center">
              <CallToActionButton variant={ctaVariant}>
                Let&apos;s Talk
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
                  Let&apos;s Talk
                </CallToActionButton>
              )}
            </div>

            {/* Cards */}
            <div className="flex items-center gap-4 lg:gap-2 pr-8 lg:pr-16 xl:pr-20 our-work-cards-container">
              {workItems.map((item, index) => (
                <div
                  key={index}
                  data-work-card
                  data-index={index}
                  className={`flex-shrink-0 w-[380px] lg:w-[480px] xl:w-[604px] h-auto bg-black border border-[#C1C1C1] overflow-hidden flex flex-col our-work-card our-work-responsive-card ${
                    isItemClickable(item) ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  {/* Category Tags - Top */}
                  {item.category && (
                    <div className="flex flex-col pt-4 lg:pt-10 px-5 lg:px-8 pb-40 category-tags-container">
                      {getCategoryLines(item.category).map((cat, idx) => (
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
                    <h3 className="text-white text-[28px] lg:text-[34px] xl:text-[41px] font-[400] leading-[1.3] sm:leading-[1.35] md:leading-[1.4] lg:leading-[1.35] xl:leading-[1.3] our-work-item-title">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="max-w-[460px] px-5 lg:px-8 pb-4 lg:pb-16">
                    <p className="text-white text-[15px] lg:text-[18px] xl:text-[22px] leading-[1.5] sm:leading-[1.6] md:leading-[1.7] lg:leading-[1.65] xl:leading-[1.6] font-[400] our-work-item-description our-work-description">
                      {item.description}
                    </p>
                  </div>

                  {/* Image - Bottom */}
                  <div className="relative w-full h-[220px] lg:h-[260px] xl:h-[300px] 2xl:h-[320px] min-[1440px]:h-[335px] min-[1920px]:h-[342px] overflow-hidden our-work-item-image">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      unoptimized={typeof item.image === "string"}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {selectedItem && (
          <div
            ref={modalRef}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={() => setSelectedItem(null)}
          >
            <div
              ref={modalContentRef}
              className="relative w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-[110] bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10"
              >
                <span className="text-3xl font-light leading-none pb-1">×</span>
              </button>

              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-[110] bg-white/10 hover:bg-white/20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center backdrop-blur-sm group border border-white/10"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:-translate-x-0.5 transition-transform"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-[110] bg-white/10 hover:bg-white/20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center backdrop-blur-sm group border border-white/10"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:translate-x-0.5 transition-transform"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              <div className="relative w-full h-full max-w-[90vw] max-h-[85vh] flex items-center justify-center">
                {isImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                  </div>
                )}
                <Image
                  src={selectedItem.popupImage || selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  className={`object-contain drop-shadow-2xl transition-opacity duration-300 ${
                    isImageLoading ? "opacity-0" : "opacity-100"
                  }`}
                  unoptimized={typeof (selectedItem.popupImage || selectedItem.image) === "string"}
                  onLoad={() => setIsImageLoading(false)}
                />
              </div>

              <div className="absolute bottom-8 left-0 right-0 flex justify-center px-4">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-8 py-4 flex flex-col md:flex-row items-center gap-4 md:gap-8 max-w-3xl">
                  <div className="flex flex-col md:items-start items-center text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-bold text-white">{selectedItem.title}</h3>
                  </div>

                  <div className="flex-shrink-0">
                    {(selectedItem.websiteUrl || selectedItem.link) && (
                      <CallToActionButton variant="shiny" onClick={handleModalAction}>
                        {selectedItem.websiteUrl ? "Visit Website" : "View Project"}
                      </CallToActionButton>
                    )}
                  </div>
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
          <h2 className="text-[60px] md:text-[120px] lg:text-[140px] xl:text-[160px] 2xl:text-[180px] min-[1440px]:text-[190px] min-[1920px]:text-[200px] font-[400] text-white">
            {title}
          </h2>
        </div>

        {/* Content Grid - 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-2 mb-10 mx-auto px-4 sm:px-5 md:px-0">
          {workItems.map((item, index) => (
            <div key={index} className="flex flex-col">
              {/* Image */}
              <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[520px] min-[1440px]:h-[535px] min-[1920px]:h-[542px] overflow-hidden mb-6 md:mb-10">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={957}
                  height={542}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>

              {/* Text Content */}
              <div className="text-white ps-6 md:pb-10 pb-6 md:pb-20 px-4 md:pe-0">
                <h3 className="text-[26px] md:text-[32px] lg:text-[34px] xl:text-[36px] 2xl:text-[38px] min-[1440px]:text-[39px] min-[1920px]:text-[40px] font-light leading-[1.3] sm:leading-[1.35] md:leading-[1.4] lg:leading-[1.35] xl:leading-[1.3] 2xl:leading-[1.25] mb-3">
                  {item.title}
                </h3>
                <p className="text-[16px] md:text-[18px] lg:text-[19px] xl:text-[20px] 2xl:text-[21px] min-[1440px]:text-[21.5px] min-[1920px]:text-[22px] leading-[1.5] sm:leading-[1.6] md:leading-[1.7] lg:leading-[1.65] xl:leading-[1.6] 2xl:leading-[1.55] opacity-90">
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

