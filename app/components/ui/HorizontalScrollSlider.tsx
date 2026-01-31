"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface SliderCard {
  type: "text" | "image";
  title: string;
  subtitle?: string;
  description?: string;
  marketInfo?: string;
  image?: any;
  backgroundColor?: string;
  textColor?: string;
}

interface HorizontalScrollSliderProps {
  cards: SliderCard[];
  className?: string;
  cardClassName?: string;
  onCardClick?: (card: SliderCard, index: number) => void;
}

export default function HorizontalScrollSlider({
  cards,
  className = "",
  cardClassName = "",
  onCardClick,
}: HorizontalScrollSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);

  // Horizontal scroll animation on page scroll
  useEffect(() => {
    if (!containerRef.current || !sliderRef.current) return;

    const container = containerRef.current;
    const slider = sliderRef.current;

    // Calculate the total scroll distance
    const getScrollAmount = () => {
      const sliderWidth = slider.scrollWidth;
      const containerWidth = container.offsetWidth;
      return -(sliderWidth - containerWidth);
    };

    // Create the horizontal scroll animation
    const scrollTween = gsap.to(slider, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "center center",
        end: () => `+=${Math.abs(getScrollAmount())}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [cards]);

  // Drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    hasDraggedRef.current = false;
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setDragStartPos({ x: e.pageX, y: e.pageY });

    // Get the current x position from GSAP
    const currentX = gsap.getProperty(sliderRef.current, "x") as number;
    setScrollLeft(currentX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();

    const dragDistance = Math.sqrt(
      Math.pow(e.pageX - dragStartPos.x, 2) + Math.pow(e.pageY - dragStartPos.y, 2)
    );
    
    // If moved more than 5px, consider it a drag
    if (dragDistance > 5) {
      hasDraggedRef.current = true;
    }

    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiply for faster drag
    const newX = scrollLeft + walk;

    // Calculate boundaries
    const sliderWidth = sliderRef.current.scrollWidth;
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const maxScroll = -(sliderWidth - containerWidth);

    // Clamp the value
    const clampedX = Math.max(maxScroll, Math.min(0, newX));

    gsap.to(sliderRef.current, {
      x: clampedX,
      duration: 0,
    });
  };

  const handleMouseUp = () => {
    const wasDragging = hasDraggedRef.current;
    setIsDragging(false);
    // Reset after a short delay to allow click handler to check
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 100);
    return wasDragging;
  };

  // Handle card click
  const handleCardClick = (e: React.MouseEvent, index: number) => {
    // Only trigger if it wasn't a drag
    if (!hasDraggedRef.current && onCardClick) {
      e.stopPropagation();
      e.preventDefault();
      onCardClick(cards[index], index);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    hasDraggedRef.current = false;
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setDragStartPos({ x: e.touches[0].pageX, y: e.touches[0].pageY });

    const currentX = gsap.getProperty(sliderRef.current, "x") as number;
    setScrollLeft(currentX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const dragDistance = Math.sqrt(
      Math.pow(e.touches[0].pageX - dragStartPos.x, 2) + 
      Math.pow(e.touches[0].pageY - dragStartPos.y, 2)
    );
    
    // If moved more than 5px, consider it a drag
    if (dragDistance > 5) {
      hasDraggedRef.current = true;
    }

    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    const newX = scrollLeft + walk;

    const sliderWidth = sliderRef.current.scrollWidth;
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const maxScroll = -(sliderWidth - containerWidth);

    const clampedX = Math.max(maxScroll, Math.min(0, newX));

    gsap.to(sliderRef.current, {
      x: clampedX,
      duration: 0,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // Reset after a short delay to allow tap handler to check
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 100);
  };

  // Handle card tap
  const handleCardTap = (e: React.TouchEvent, index: number) => {
    // Only trigger if it wasn't a drag
    if (!hasDraggedRef.current && onCardClick) {
      e.stopPropagation();
      e.preventDefault();
      onCardClick(cards[index], index);
    }
  };

  const renderCard = (card: SliderCard, index: number) => {
    if (card.type === "image" && card.image) {
      return (
        <div
          key={index}
          data-card-index={index}
          onClick={(e) => handleCardClick(e, index)}
          onTouchEnd={(e) => handleCardTap(e, index)}
          className={`flex-shrink-0 rounded-[10px] cursor-pointer will-change-transform ${cardClassName}`}
        >
          <div className="relative h-[299px] md:h-[499px] w-[236px] md:w-[436px] flex flex-col justify-between border border-[#BFBFBF] rounded-[10px] overflow-hidden">
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-black/80" />
            {/* Top text section */}
            <div className="relative z-10 p-6 text-white">
              <h3 className="text-[20px] md:text-[30px] font-bold text-white">{card.title}</h3>
              {card.subtitle && (
                <p className="text-[20px] md:text-[30px] text-white">{card.subtitle}</p>
              )}
            </div>
            {/* Bottom text section */}
            {card.description && (
              <div className="relative z-10 p-6 text-white">
                <p className="text-[14px] md:text-[22px] text-white/70">{card.description}</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Text card
    const bgColor = card.backgroundColor || "bg-zinc-900";
    const customTextColor = card.textColor;
    const isWhiteBg = bgColor === "bg-white" || bgColor === "white";
    const isLightBg = bgColor === "bg-zinc-200" || bgColor === "bg-gray-200" || bgColor === "bg-zinc-100" || bgColor === "bg-gray-100" || bgColor === "bg-[#E3E3E3]";
    const isDarkBg = bgColor === "bg-zinc-900" || bgColor === "bg-zinc-800" || bgColor === "bg-black";

    const titleColor = customTextColor || (isWhiteBg || isLightBg ? "text-black" : isDarkBg ? "text-white" : "text-white");
    const descColor = customTextColor ? (customTextColor === "text-black" ? "text-black/70" : "text-white/70") : (isWhiteBg || isLightBg ? "text-black/70" : isDarkBg ? "text-white/70" : "text-white/70");

    return (
      <div
        key={index}
        data-card-index={index}
        onClick={(e) => handleCardClick(e, index)}
        onTouchEnd={(e) => handleCardTap(e, index)}
        className={`flex-shrink-0 rounded-[10px] cursor-pointer will-change-transform ${cardClassName}`}
      >
        <div className={`h-[221px] md:h-[321px] w-[236px] md:w-[436px] p-8 flex flex-col justify-between border border-[#BFBFBF] rounded-[10px] ${bgColor}`}>
          <div>
            <h3 className={`text-[20px] md:text-[30px] font-bold mb-1 ${titleColor}`}>
              {card.title}
            </h3>
            {card.subtitle && (
              <p className={`text-[20px] md:text-[30px] mb-2 ${titleColor}`}>
                {card.subtitle}
              </p>
            )}
          </div>
          <div>
            {card.description && (
              <p className={`text-[16px] md:text-[22px] ${descColor}`}>
                {card.description}
              </p>
            )}
            {card.marketInfo && (
              <p className={`text-[16px] md:text-[22px] ${descColor}`}>
                {card.marketInfo}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={sliderRef}
        className={`flex gap-6 px-4 md:px-10 will-change-transform ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ width: "fit-content" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {cards.map((card, index) => renderCard(card, index))}
      </div>
    </div>
  );
}
