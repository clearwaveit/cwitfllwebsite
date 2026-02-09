"use client";

import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@/app/hooks/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const accordionItems = [
  {
    id: 1,
    title: "What strategies do you use for optimizing website speed and performance?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor. Morbi bibendum velit vel justo tristique dapibus et nec eros. Etiam lacinia, risus et elementum vehicula, justo justo pulvinar nunc, eu auctor massa turpis vel ex. Integer faucibus dolor nibh, eu aliquet mauris mollis a. Aenean sodales ultricies leo eu elementum.",
  },
  {
    id: 2,
    title: "How do you ensure data security and privacy for websites operating within Dubai's legal framework?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor. Morbi bibendum velit vel justo tristique dapibus et nec eros. Etiam lacinia, risus et elementum vehicula, justo justo pulvinar nunc, eu auctor massa turpis vel ex. Integer faucibus dolor nibh, eu aliquet mauris mollis a. Aenean sodales ultricies leo eu elementum.",
  },
  {
    id: 3,
    title: "What are your capabilities in creating multilingual websites, particularly in Arabic and English?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor. Morbi bibendum velit vel justo tristique dapibus et nec eros. Etiam lacinia, risus et elementum vehicula, justo justo pulvinar nunc, eu auctor massa turpis vel ex. Integer faucibus dolor nibh, eu aliquet mauris mollis a. Aenean sodales ultricies leo eu elementum.",
  },
  {
    id: 4,
    title: "How do you approach search engine optimization (SEO) for the MENA region, particularly?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor. Morbi bibendum velit vel justo tristique dapibus et nec eros. Etiam lacinia, risus et elementum vehicula, justo justo pulvinar nunc, eu auctor massa turpis vel ex. Integer faucibus dolor nibh, eu aliquet mauris mollis a. Aenean sodales ultricies leo eu elementum.",
  },
  {
    id: 5,
    title: "What post-launch support and maintenance services do you offer for websites?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor. Morbi bibendum velit vel justo tristique dapibus et nec eros. Etiam lacinia, risus et elementum vehicula, justo justo pulvinar nunc, eu auctor massa turpis vel ex. Integer faucibus dolor nibh, eu aliquet mauris mollis a. Aenean sodales ultricies leo eu elementum.",
  },
  {
    id: 6,
    title: "What is your experience with creating websites for Dubai's real estate and tourism sector?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor. Morbi bibendum velit vel justo tristique dapibus et nec eros. Etiam lacinia, risus et elementum vehicula, justo justo pulvinar nunc, eu auctor massa turpis vel ex. Integer faucibus dolor nibh, eu aliquet mauris mollis a. Aenean sodales ultricies leo eu elementum.",
  },
  {
    id: 7,
    title: "How do you tailor e-commerce solutions for the retail and shopping industry?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor. Morbi bibendum velit vel justo tristique dapibus et nec eros. Etiam lacinia, risus et elementum vehicula, justo justo pulvinar nunc, eu auctor massa turpis vel ex. Integer faucibus dolor nibh, eu aliquet mauris mollis a. Aenean sodales ultricies leo eu elementum.",
  },
  {
    id: 8,
    title: "What measures do you take to optimize websites for high traffic during Dubai's peak tourist seasons?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor. Morbi bibendum velit vel justo tristique dapibus et nec eros. Etiam lacinia, risus et elementum vehicula, justo justo pulvinar nunc, eu auctor massa turpis vel ex. Integer faucibus dolor nibh, eu aliquet mauris mollis a. Aenean sodales ultricies leo eu elementum.",
  },
];

export default function Accordion() {
  const [openItems, setOpenItems] = useState<number[]>([1]); // First item expanded by default
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const plusIconRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const minusIconRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const toggleItem = (id: number) => {
    const contentEl = contentRefs.current[id];
    const plusIconEl = plusIconRefs.current[id];
    const minusIconEl = minusIconRefs.current[id];

    if (!contentEl || !plusIconEl || !minusIconEl) return;

    const isOpen = openItems.includes(id);

    if (isOpen) {
      // Close animation
      gsap.to(contentEl, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          contentEl.style.display = "none";
        },
      });

      // Hide minus, show plus
      gsap.to(minusIconEl, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
        onComplete: () => {
          minusIconEl.style.display = "none";
          plusIconEl.style.display = "flex";
          gsap.to(plusIconEl, {
            opacity: 1,
            duration: 0.2,
            ease: "power2.inOut",
          });
        },
      });

      setOpenItems(openItems.filter((itemId) => itemId !== id));
    } else {
      // Open animation
      contentEl.style.display = "block";

      // Get natural height
      const height = contentEl.scrollHeight;
      contentEl.style.height = "0px";
      contentEl.style.opacity = "0";

      gsap.to(contentEl, {
        height: height,
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut",
      });

      // Hide plus, show minus
      gsap.to(plusIconEl, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
        onComplete: () => {
          plusIconEl.style.display = "none";
          minusIconEl.style.display = "flex";
          gsap.to(minusIconEl, {
            opacity: 1,
            duration: 0.2,
            ease: "power2.inOut",
          });
        },
      });

      setOpenItems([...openItems, id]);
    }
  };

  // Initialize state - first item open, others closed
  useGSAP(() => {
    Object.keys(contentRefs.current).forEach((key) => {
      const id = Number(key);
      const el = contentRefs.current[id];
      const plusIconEl = plusIconRefs.current[id];
      const minusIconEl = minusIconRefs.current[id];

      if (el) {
        if (id === 1) {
          // First item: keep it open
          el.style.display = "block";
          el.style.height = "auto";
          el.style.opacity = "1";

          // Set icons for first item
          if (plusIconEl) {
            plusIconEl.style.display = "none";
            plusIconEl.style.opacity = "0";
          }
          if (minusIconEl) {
            minusIconEl.style.display = "flex";
            minusIconEl.style.opacity = "1";
          }
        } else {
          // Other items: keep them closed
          el.style.height = "0px";
          el.style.opacity = "0";
          el.style.display = "none";

          // Set icons for other items
          if (plusIconEl) {
            plusIconEl.style.display = "flex";
            plusIconEl.style.opacity = "1";
          }
          if (minusIconEl) {
            minusIconEl.style.display = "none";
            minusIconEl.style.opacity = "0";
          }
        }
      }
    });
  });

  // ScrollTrigger animations for section entrance
  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !itemsContainerRef.current) return;

    const title = titleRef.current;
    const accordionItems = itemsContainerRef.current.querySelectorAll('.accordion-item');

    // Set initial state
    gsap.set(title, { opacity: 0, y: 50 });
    gsap.set(accordionItems, { opacity: 0, y: 60, scale: 0.95 });

    // Create timeline for animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate title
    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    // Animate accordion items with stagger (one by one like blogs)
    tl.to(accordionItems, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.2,
    }, "-=0.4");

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
    <section ref={sectionRef} className="relative min-h-screen bg-black py-24 overflow-hidden">
      <div className="relative z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 global-section-padding accordion-content-container">
        <h2 ref={titleRef} className="text-[28px] sm:text-[32px] md:text-[40px] lg:text-[44px] xl:text-[48px] 2xl:text-[52px] min-[1440px]:text-[54px] min-[1920px]:text-[55px] font-[500] text-white leading-[1.2] sm:leading-[1.25] md:leading-[1.3] lg:leading-[1.35] xl:leading-[1.4] 2xl:leading-[1.45] mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16 accordion-heading">
          FAQ's
        </h2>

        <div ref={itemsContainerRef} className="space-y-3">
          {accordionItems.map((item) => {
            const isOpen = openItems.includes(item.id);

            return (
              <div
                key={item.id}
                className={`accordion-item overflow-hidden rounded-[10px] ${isOpen ? 'rounded-[10px] border border-[#0DFCC1]' : 'border-0'}`}
              >
                {/* Accordion Header - Dark Grey Rectangle */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`w-full flex items-center justify-between px-6 py-5 text-left border border-[#4E4E4E] transition-colors duration-300 ${isOpen ? 'rounded-t-[10px] rounded-b-none' : 'rounded-[10px]'}`}
                >
                  <h3 className={`text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[19px] min-[1440px]:text-[20px] min-[1920px]:text-[22px] pr-8 accordion-title ${isOpen ? 'text-white font-bold' : 'text-white font-medium'}`}>
                    {item.title}
                  </h3>

                  {/* Plus Icon */}
                  <div
                    ref={(el) => {
                      plusIconRefs.current[item.id] = el;
                    }}
                    className="flex-shrink-0 w-6 h-6 flex items-center justify-center"
                    style={{ display: isOpen ? 'none' : 'flex', opacity: isOpen ? 0 : 1 }}
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>

                  {/* Minus Icon */}
                  <div
                    ref={(el) => {
                      minusIconRefs.current[item.id] = el;
                    }}
                    className="flex-shrink-0 w-6 h-6 flex items-center justify-center"
                    style={{ display: isOpen ? 'flex' : 'none', opacity: isOpen ? 1 : 0 }}
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M20 12H4"
                      />
                    </svg>
                  </div>
                </button>

                {/* Accordion Content */}
                <div
                  ref={(el) => {
                    contentRefs.current[item.id] = el;
                  }}
                  className="overflow-hidden"
                  style={item.id === 1 ? { display: 'block', height: 'auto', opacity: 1 } : { display: 'none', height: '0px', opacity: 0 }}
                >
                  <div className={`p-6 ${isOpen ? 'rounded-b-[10px]' : 'bg-black'}`}>
                    <p className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[17px] min-[1440px]:text-[18px] min-[1920px]:text-[18px] text-white leading-[1.5] sm:leading-[1.55] md:leading-[1.6] lg:leading-[1.65] xl:leading-[1.6] 2xl:leading-[1.55] accordion-content">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

