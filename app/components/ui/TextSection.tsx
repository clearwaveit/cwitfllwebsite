"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextSectionProps {
  paragraphs: (string | React.ReactNode)[];
  className?: string;
  firstParagraphClassName?: string;
}

export default function TextSection({
  paragraphs,
  className = "",
  firstParagraphClassName,
}: TextSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate each paragraph with stagger effect
      paragraphRefs.current.forEach((el, index) => {
        if (el) {
          gsap.set(el, { opacity: 0, y: 50 });
          tl.to(el, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            force3D: true,
          }, index === 0 ? 0 : "<0.2");
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [paragraphs]);

  return (
    <div ref={sectionRef} className={`flex justify-center w-full ${className}`}>
      <div className="w-full">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            ref={(el) => { paragraphRefs.current[index] = el; }}
            className={`text-white ${index === 0
                ? firstParagraphClassName || "text-[20px] md:text-[38px] font-[500] leading-tight paragraph-text"
                : "text-[14px] md:text-[20px] text-start font-light leading-relaxed mt-6 md:mt-8"
              }`}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

