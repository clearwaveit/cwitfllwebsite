"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ourClientsImg from "@/app/assets/imgs/clients_img_brands.png";
import Image from "next/image";
import TextSection from "@/app/components/ui/TextSection";

const clients = [
  { logo: ourClientsImg }
];

export default function OurClients() {
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Track image loading
  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

  // Infinite carousel animation - only start after images are loaded
  useEffect(() => {
    if (!carouselTrackRef.current || !imagesLoaded) return;

    const track = carouselTrackRef.current;
    const items = Array.from(track.children) as HTMLElement[];

    if (items.length === 0) return;

    // Calculate width of one set of items (half of total since we duplicated)
    const firstSetItems = items.slice(0, clients.length);
    const itemWidth = firstSetItems[0]?.offsetWidth || window.innerWidth;
    const gap = 0; // No gap for full width images
    const itemTotalWidth = itemWidth + gap;
    const setWidth = itemTotalWidth * clients.length;

    // Kill any existing animation before creating new one
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Create infinite scroll animation with seamless loop
    animationRef.current = gsap.to(track, {
      x: -setWidth * 2,
      duration: 60,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => {
          const num = parseFloat(x);
          // Wrap seamlessly when passing first set - no pause or jump
          if (num <= -setWidth) {
            return (num + setWidth) + "px";
          }
          return x;
        }
      },
    });

    return () => {
      if (animationRef.current) animationRef.current.kill();
    };
  }, [imagesLoaded]);

  return (
    <section className="relative bg-black py-20 md:py-34 pt-0 overflow-hidden">
      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-0">
        {/* Title Section - Top Left */}
        {/* <div className="mb-8 md:mb-10 w-full max-w-[1494px] mx-auto global-section-padding">
          <h2 className="text-[30px] md:text-[50px] font-light text-white leading-[60px] md:leading-[80px]">
            Our Clients
          </h2>
        </div> */}

        {/* Infinite Carousel */}
        <div className="overflow-hidden w-full">
          <div
            ref={carouselTrackRef}
            className="flex will-change-transform"
            style={{ width: "fit-content" }}
          >
            {/* First set of images */}
            {clients.map((client, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-full mx-8"
              >
                <Image
                  src={client.logo}
                  alt="Client Logo"
                  width={1464}
                  height={234}
                  className="w-full h-auto object-contain"
                  unoptimized
                  onLoad={handleImageLoad}
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {clients.map((client, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-full mx-8"
              >
                <Image
                  src={client.logo}
                  alt="Client Logo"
                  width={1464}
                  height={234}
                  className="w-full h-auto object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

