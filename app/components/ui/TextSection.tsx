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
          start: "top 70%",
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
            delay: index === 0 ? 0.15 : 0, // Minor delay for first paragraph
          }, index === 0 ? 0.15 : "<0.2");
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
                ? firstParagraphClassName || "text-[18px] sm:text-[24px] md:text-[30px] lg:text-[34px] xl:text-[38px] font-[500] leading-[1.2] md:leading-[40px] lg:leading-[1.25] paragraph-text"
                : "text-[12px] sm:text-[16px] md:text-[18px] lg:text-[19px] xl:text-[20px] text-start font-light leading-relaxed mt-6 md:mt-8"
              }`}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

