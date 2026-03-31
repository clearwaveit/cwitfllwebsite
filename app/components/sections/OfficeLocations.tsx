"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface OfficeLocation {
  city: string;
  address: string[];
  email: string;
  phone: string;
}

interface OfficeLocationsProps {
  className?: string;
  offices?: OfficeLocation[];
}

const DEFAULT_OFFICES: OfficeLocation[] = [
  {
    city: "Dubai",
    address: ["World Trade Center area", "Dubai, UAE"],
    email: "dubai@cwit.ae",
    phone: "+971 58 8279426",
  },
  {
    city: "London",
    address: ["East London", "London, UAE"],
    email: "lonodon@cwit.ae",
    phone: "+44 33 333 9426",
  },
  {
    city: "New York",
    address: ["East London", "London, UAE"],
    email: "lonodon@cwit.ae",
    phone: "+44 33 333 9426",
  },
];

export default function OfficeLocations({ className = "", offices = DEFAULT_OFFICES }: OfficeLocationsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate each office card with stagger effect
      cardRefs.current.forEach((el, index) => {
        if (el) {
          gsap.set(el, { opacity: 0, y: 50 });
          tl.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          }, index === 0 ? 0 : "<0.15");
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`bg-transparent text-white py-16 md:py-24 h-full flex items-center ${className}`}>
      <div className="max-w-[1294px] mx-auto office-locations-container w-full">
        <div className="flex flex-col sm:flex-col sm:items-center md:flex-row md:items-center md:justify-between lg:flex-col lg:items-center gap-8">
          {offices.map((office, index) => (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="flex flex-col items-center sm:items-center md:items-center lg:items-center office-location-card"
            >
              <h3 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] 2xl:text-[44px] leading-[28px] sm:leading-[32px] md:leading-[38px] lg:leading-[42px] xl:leading-[48px] 2xl:leading-[52px] office-location-heading font-[300] mb-2 text-white md:text-center">
                {office.city}
              </h3>
              <div className="flex flex-col items-center sm:items-center md:items-center lg:items-center md:text-center">
                {office.address.map((line, lineIndex) => (
                  <p
                    key={lineIndex}
                    className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px] leading-[16px] sm:leading-[18px] md:leading-[20px] lg:leading-[26px] xl:leading-[28px] 2xl:leading-[30px] office-location-text text-white font-[300]"
                  >
                    {line}
                  </p>
                ))}
                <a
                  href={`mailto:${office.email}`}
                  className="block text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px] leading-[16px] sm:leading-[18px] md:leading-[20px] lg:leading-[26px] xl:leading-[28px] 2xl:leading-[30px] office-location-text text-white font-[300] hover:text-[#0DFCC1] transition-colors"
                >
                  {office.email}
                </a>
                <a
                  href={`tel:${office.phone.replace(/\s/g, "")}`}
                  className="block text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px] leading-[16px] sm:leading-[18px] md:leading-[20px] lg:leading-[26px] xl:leading-[28px] 2xl:leading-[30px] office-location-text text-white font-[300] hover:text-[#0DFCC1] transition-colors"
                >
                  {office.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
