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
}

export default function OfficeLocations({ className = "" }: OfficeLocationsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const offices: OfficeLocation[] = [
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
    <section ref={sectionRef} className={`bg-transparent text-white py-16 md:py-24 ${className}`}>
      <div className="max-w-[1294px] mx-auto global-section-padding office-locations-container">
        <div className="flex flex-col gap-8">
          {offices.map((office, index) => (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="padding-office-location-card office-location-card"
            >
              <h3 className="text-[24px] md:text-[41px] office-location-heading font-[300] mb-2 text-white">
                {office.city}
              </h3>
              <div>
                {office.address.map((line, lineIndex) => (
                  <p
                    key={lineIndex}
                    className="text-[14px] md:text-[26px] office-location-text text-white font-[300]"
                  >
                    {line}
                  </p>
                ))}
                <a
                  href={`mailto:${office.email}`}
                  className="block text-[14px] md:text-[26px] office-location-text text-white font-[300] hover:text-[#0DFCC1] transition-colors"
                >
                  {office.email}
                </a>
                <a
                  href={`tel:${office.phone.replace(/\s/g, "")}`}
                  className="block text-[14px] md:text-[26px] office-location-text text-white font-[300] hover:text-[#0DFCC1] transition-colors"
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
