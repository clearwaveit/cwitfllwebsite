// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useRef, useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// interface BlogItem {
//   category: string;
//   title: string;
//   description: string;
//   image?: string;
//   link?: string;
//   buttonText?: string;
//   buttonLink?: string;
// }

// interface BlogsProps {
//   sectionSubtitle?: string;
//   sectionTitle?: string;
//   sectionDescription?: string;
//   items?: BlogItem[];
// }

// export default function Blogs({ sectionTitle, items }: BlogsProps = {}) {
//   const blogs = items ?? [];
//   const title = sectionTitle?.trim() ?? "";
//   const sectionRef = useRef<HTMLElement>(null);
//   const titleRef = useRef<HTMLHeadingElement>(null);
//   const cardsRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!sectionRef.current || !cardsRef.current) return;

//     const titleEl = titleRef.current;
//     const cards = cardsRef.current.querySelectorAll('.blogs-card');

//     if (titleEl) gsap.set(titleEl, { opacity: 0, y: 50 });
//     gsap.set(cards, { opacity: 0, y: 80, scale: 0.9 });

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top 80%",
//         end: "bottom 20%",
//         toggleActions: "play none none reverse",
//       },
//     });

//     if (titleEl) {
//       tl.to(titleEl, {
//         opacity: 1,
//         y: 0,
//         duration: 0.8,
//         ease: "power3.out",
//       });
//     }

//     tl.to(cards, {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       duration: 0.8,
//       ease: "power3.out",
//       stagger: 0.2,
//     }, titleEl ? "-=0.4" : 0);

//     // Hover animations for cards
//     cards.forEach((card) => {
//       const cardElement = card as HTMLElement;

//       cardElement.addEventListener('mouseenter', () => {
//         gsap.to(cardElement, {
//           scale: 1.05,
//           y: -10,
//           duration: 0.3,
//           ease: "power2.out",
//         });
//       });

//       cardElement.addEventListener('mouseleave', () => {
//         gsap.to(cardElement, {
//           scale: 1,
//           y: 0,
//           duration: 0.3,
//           ease: "power2.out",
//         });
//       });
//     });

//     return () => {
//       tl.kill();
//       const triggers = ScrollTrigger.getAll();
//       triggers.forEach((trigger) => {
//         if (trigger.trigger === sectionRef.current) {
//           trigger.kill();
//         }
//       });
//     };
//   }, [blogs.length, title]);

//   if (!blogs.length) return null;

//   return (
//     <section ref={sectionRef} className="relative min-h-screen bg-black py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 overflow-hidden">
//       <div className="relative z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 global-section-padding blogs-section-content-container">
//         {title ? (
//           <h2 ref={titleRef} className="text-[22px] sm:text-[32px] md:text-[50px] lg:text-[65px] xl:text-[80px] font-[400] text-center text-white leading-[1.3] sm:leading-[1.33] md:leading-[1.25] lg:leading-[1.2] xl:leading-[1.27] 2xl:leading-[1.33] mb-6 sm:mb-8 md:mb-10 lg:mb-12">
//             {title}
//           </h2>
//         ) : null}

//         <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-10 blogs-cards-grid">
//           {blogs.map((blog, index) => {
//             const item = blog as BlogItem;
//             const card = (
//             <div className="relative flex flex-col w-full sm:w-auto md:w-full lg:w-auto xl:w-full 2xl:w-auto h-auto blogs-section blogs-card cursor-pointer border border-white">
//               <div className="relative w-full h-full min-h-[320px] flex items-center justify-center mb-0 overflow-hidden bg-[#1a1a1a]">
//                 {item.image ? (
//                   <Image
//                     src={item.image}
//                     alt={blog.title}
//                     fill
//                     className="object-cover"
//                     unoptimized={typeof item.image === "string"}
//                   />
//                 ) : null}
//               </div>
//               <div className="w-full h-auto  flex flex-col justify-center blogs-section-image blogs-card-content">
//                 <div className="flex flex-col justify-center items-start gap-2 sm:gap-3 md:gap-4 p-4 sm:p-6 md:p-8 lg:p-9 xl:p-10">
//                   <h3 className="text-white text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px] font-bold text-black leading-[1.3] sm:leading-[1.35] md:leading-[1.4] lg:leading-[1.35] xl:leading-[1.3] 2xl:leading-[1.25]">
//                     {blog.title}
//                   </h3>
//                   {blog.category?.trim() ? (
//                     <span className="text-white text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px] font-medium block">
//                       {blog.category}
//                     </span>
//                   ) : null}
//                   <p className="text-white text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] text-gray-700 leading-[1.5] sm:leading-[1.55] md:leading-[1.6] lg:leading-[1.65] xl:leading-[1.6] 2xl:leading-[1.55]">
//                     {blog.description}
//                   </p>
//                   {item.buttonText?.trim() &&
//                     (item.buttonLink?.trim() || item.link?.trim()) && (
//                       <Link
//                         href={(item.buttonLink?.trim() || item.link?.trim())!}
//                         className="inline-block mt-3 px-5 py-2 border border-white rounded-full text-white text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-300"
//                       >
//                         {item.buttonText.trim()}
//                       </Link>
//                     )}
//                 </div>
//               </div>
//             </div>
//             );
//             if (item.link) {
//               return (
//                 <Link key={index} href={item.link} className="contents">
//                   {card}
//                 </Link>
//               );
//             }
//             return <div key={index} className="contents">{card}</div>;
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { normalizeDescriptionHtml } from "@/app/lib/cms-description-html";
import { tooltipFromHtml } from "@/app/lib/tooltip-from-html";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BlogItem {
  category: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  buttonText?: string;
  buttonLink?: string;
}

interface BlogsProps {
  sectionSubtitle?: string;
  sectionTitle?: string;
  sectionDescription?: string;
  items?: BlogItem[];
  isCarousel?: boolean;
}

export default function Blogs({ sectionTitle, items, isCarousel }: BlogsProps = {}) {
  const blogs = items ?? [];
  const title = sectionTitle?.trim() ?? "";
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const carouselTweenRef = useRef<gsap.core.Tween | null>(null);

  const carouselBlogs = blogs.length > 1 ? [...blogs, ...blogs] : blogs;

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;
    if (isCarousel && !trackRef.current) return;

    const titleEl = titleRef.current;
    const cards = cardsRef.current.querySelectorAll(".blogs-card");

    if (titleEl) gsap.set(titleEl, { opacity: 0, y: 50 });
    gsap.set(cards, { opacity: 0, y: 80, scale: 0.9 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    if (titleEl) {
      tl.to(titleEl, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }

    tl.to(
      cards,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
      },
      titleEl ? "-=0.4" : 0
    );

    let removeCarouselHoverListeners: (() => void) | undefined;

    if (isCarousel && blogs.length > 1) {
      const track = trackRef.current;
      if (track) {
        const originalItems = track.querySelectorAll(
          '[data-carousel-original="true"]'
        ) as NodeListOf<HTMLElement>;

        const firstItem = originalItems[0];
        if (firstItem) {
          const trackStyles = window.getComputedStyle(track);
          const gap =
            parseFloat(trackStyles.gap || "0") ||
            parseFloat(trackStyles.columnGap || "0") ||
            0;

          const itemWidth = firstItem.offsetWidth;
          const singleSetWidth = (itemWidth + gap) * blogs.length;

          carouselTweenRef.current?.kill();

          carouselTweenRef.current = gsap.to(track, {
            x: -singleSetWidth,
            duration: 18,
            ease: "none",
            repeat: -1,
            modifiers: {
              x: (value) => {
                const currentX = parseFloat(value);
                return currentX <= -singleSetWidth
                  ? `${currentX + singleSetWidth}px`
                  : `${currentX}px`;
              },
            },
          });

          const tween = carouselTweenRef.current;
          const hoverRoot = cardsRef.current;
          if (tween && hoverRoot) {
            const pauseCarousel = () => {
              tween.pause();
            };
            const resumeCarousel = () => {
              tween.resume();
            };
            hoverRoot.addEventListener("mouseenter", pauseCarousel);
            hoverRoot.addEventListener("mouseleave", resumeCarousel);
            removeCarouselHoverListeners = () => {
              hoverRoot.removeEventListener("mouseenter", pauseCarousel);
              hoverRoot.removeEventListener("mouseleave", resumeCarousel);
            };
          }
        }
      }
    }

    return () => {
      removeCarouselHoverListeners?.();
      tl.kill();
      carouselTweenRef.current?.kill();

      const triggers = ScrollTrigger.getAll();
      triggers.forEach((trigger) => {
        if (trigger.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [blogs.length, title, isCarousel]);

  if (!blogs.length) return null;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 overflow-hidden"
    >
      <div className="relative z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 global-section-padding blogs-section-content-container">
        {title ? (
          <h2
            ref={titleRef}
            className={`text-[22px] sm:text-[32px] md:text-[50px] lg:text-[65px] xl:text-[80px] font-[400] ${isCarousel ? "text-left" : "text-center"} text-white leading-[1.3] sm:leading-[1.33] md:leading-[1.25] lg:leading-[1.2] xl:leading-[1.27] 2xl:leading-[1.33] mb-6 sm:mb-8 md:mb-10 lg:mb-12`}
          >
            {title}
          </h2>
        ) : null}

        {/* <div ref={cardsRef} className="overflow-hidden blogs-cards-grid">
          <div
            ref={trackRef}
            className="flex gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-10 will-change-transform"
          >
            {carouselBlogs.map((blog, index) => {
              const item = blog as BlogItem;
              const originalIndex = index % blogs.length;
              const isOriginal = index < blogs.length;

              const card = (
                <div className="relative flex flex-col w-full sm:w-auto md:w-full lg:w-auto xl:w-full 2xl:w-auto h-auto blogs-section blogs-card cursor-pointer border border-white">
                  <div className="relative w-full h-full min-h-[320px] flex items-center justify-center mb-0 overflow-hidden bg-[#1a1a1a]">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        unoptimized={typeof item.image === "string"}
                      />
                    ) : null}
                  </div>
                  <div className="w-full h-auto flex flex-col justify-center blogs-section-image blogs-card-content">
                    <div className="flex flex-col justify-center items-start gap-2 sm:gap-3 md:gap-4 p-4 sm:p-6 md:p-8 lg:p-9 xl:p-10">
                      <h3 className="text-white text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px] font-bold text-black leading-[1.3] sm:leading-[1.35] md:leading-[1.4] lg:leading-[1.35] xl:leading-[1.3] 2xl:leading-[1.25]">
                        {blog.title}
                      </h3>

                      {blog.category?.trim() ? (
                        <span className="text-white text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px] font-medium block">
                          {blog.category}
                        </span>
                      ) : null}

                      <p
                        className="text-white text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] text-gray-700 leading-[1.5] sm:leading-[1.55] md:leading-[1.6] lg:leading-[1.65] xl:leading-[1.6] 2xl:leading-[1.55]"
                        dangerouslySetInnerHTML={{ __html: normalizeDescriptionHtml(blog.description) }}
                      />

                      {item.buttonText?.trim() &&
                        (item.buttonLink?.trim() || item.link?.trim()) && (
                          <Link
                            href={
                              (item.buttonLink?.trim() || item.link?.trim())!
                            }
                            className="inline-block mt-3 px-5 py-2 border border-white rounded-full text-white text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-300"
                          >
                            {item.buttonText.trim()}
                          </Link>
                        )}
                    </div>
                  </div>
                </div>
              );

              return (
                <div
                  key={`${isOriginal ? "original" : "duplicate"}-${originalIndex}-${index}`}
                  data-carousel-original={isOriginal ? "true" : "false"}
                  className="shrink-0 w-full sm:w-[calc((100%-1.25rem)/2)] md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3.5rem)/3)] xl:w-[calc((100%-4rem)/3)] 2xl:w-[calc((100%-5rem)/3)]"
                >
                  {item.link ? (
                    <Link href={item.link} className="block h-full">
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
                </div>
              );
            })}
          </div>
        </div> */}
        <div ref={cardsRef} className="overflow-hidden blogs-cards-grid">
          {isCarousel ? (
            <div
              ref={trackRef}
              className="flex gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-10 will-change-transform"
            >
              {carouselBlogs.map((blog, index) => {
                const item = blog as BlogItem;
                const originalIndex = index % blogs.length;
                const isOriginal = index < blogs.length;

                const card = (
                  <div className="relative flex flex-col w-full sm:w-auto md:w-full lg:w-auto xl:w-full 2xl:w-auto h-auto blogs-section blogs-card cursor-pointer border border-white">
                    <div className="relative w-full h-full min-h-[320px] flex items-center justify-center mb-0 overflow-hidden bg-[#1a1a1a]">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={blog.title}
                          fill
                          className="object-cover"
                          unoptimized={typeof item.image === "string"}
                        />
                      ) : null}
                    </div>
                    <div className="w-full h-auto flex flex-col justify-center blogs-section-image blogs-card-content">
                      <div className="flex flex-col justify-center items-start gap-2 sm:gap-3 md:gap-4 p-4 sm:p-6 md:p-8 lg:p-9 xl:p-10">
                        <h3
                          className="line-clamp-1 w-full min-w-0 max-w-full overflow-hidden break-words text-[14px] font-bold leading-[1.3] text-white sm:text-[16px] sm:leading-[1.35] md:text-[18px] md:leading-[1.4] lg:text-[20px] lg:leading-[1.35] xl:text-[22px] xl:leading-[1.3] 2xl:text-[24px] 2xl:leading-[1.25]"
                          title={tooltipFromHtml(blog.title)}
                        >
                          {blog.title}
                        </h3>

                        {blog.category?.trim() ? (
                          <span className="text-white text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px] font-medium block">
                            {blog.category}
                          </span>
                        ) : null}

                        <p
                          className="line-clamp-3 overflow-hidden break-words text-[11px] font-normal leading-[1.5] text-white/90 sm:text-[12px] sm:leading-[1.55] md:text-[13px] md:leading-[1.6] lg:text-[14px] lg:leading-[1.65] xl:text-[15px] xl:leading-[1.6] 2xl:text-[16px] 2xl:leading-[1.55]"
                          title={tooltipFromHtml(normalizeDescriptionHtml(blog.description ?? ""))}
                          dangerouslySetInnerHTML={{ __html: normalizeDescriptionHtml(blog.description) }}
                        />

                        {item.buttonText?.trim() &&
                          (item.buttonLink?.trim() || item.link?.trim()) && (
                            <Link
                              href={(item.buttonLink?.trim() || item.link?.trim())!}
                              className="inline-block mt-3 px-5 py-2 border border-white rounded-full text-white text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-300"
                            >
                              {item.buttonText.trim()}
                            </Link>
                          )}
                      </div>
                    </div>
                  </div>
                );

                return (
                  <div
                    key={`${isOriginal ? "original" : "duplicate"}-${originalIndex}-${index}`}
                    data-carousel-original={isOriginal ? "true" : "false"}
                    className="shrink-0 w-full sm:w-[calc((100%-1.25rem)/2)] md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3.5rem)/3)] xl:w-[calc((100%-4rem)/3)] 2xl:w-[calc((100%-5rem)/3)]"
                  >
                    {item.link ? (
                      <Link href={item.link} className="block h-full">
                        {card}
                      </Link>
                    ) : (
                      card
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-10">
              {blogs.map((blog, index) => {
                const item = blog as BlogItem;

                const card = (
                  <div className="relative flex flex-col w-full h-auto blogs-section blogs-card cursor-pointer border border-white">
                    <div className="relative w-full h-full min-h-[320px] flex items-center justify-center mb-0 overflow-hidden bg-[#1a1a1a]">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={blog.title}
                          fill
                          className="object-cover"
                          unoptimized={typeof item.image === "string"}
                        />
                      ) : null}
                    </div>
                    <div className="w-full h-auto flex flex-col justify-center blogs-section-image blogs-card-content">
                      <div className="flex flex-col justify-center items-start gap-2 sm:gap-3 md:gap-4 p-4 sm:p-6 md:p-8 lg:p-9 xl:p-10">
                        <h3
                          className="line-clamp-1 w-full min-w-0 max-w-full overflow-hidden break-words text-[14px] font-bold leading-[1.3] text-white sm:text-[16px] sm:leading-[1.35] md:text-[18px] md:leading-[1.4] lg:text-[20px] lg:leading-[1.35] xl:text-[22px] xl:leading-[1.3] 2xl:text-[24px] 2xl:leading-[1.25]"
                          title={tooltipFromHtml(blog.title)}
                        >
                          {blog.title}
                        </h3>

                        {blog.category?.trim() ? (
                          <span className="text-white text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px] font-medium block">
                            {blog.category}
                          </span>
                        ) : null}

                        <p
                          className="line-clamp-3 overflow-hidden break-words text-[11px] font-normal leading-[1.5] text-white/90 sm:text-[12px] sm:leading-[1.55] md:text-[13px] md:leading-[1.6] lg:text-[14px] lg:leading-[1.65] xl:text-[15px] xl:leading-[1.6] 2xl:text-[16px] 2xl:leading-[1.55]"
                          title={tooltipFromHtml(normalizeDescriptionHtml(blog.description ?? ""))}
                          dangerouslySetInnerHTML={{ __html: normalizeDescriptionHtml(blog.description) }}
                        />

                        {item.buttonText?.trim() &&
                          (item.buttonLink?.trim() || item.link?.trim()) && (
                            <Link
                              href={(item.buttonLink?.trim() || item.link?.trim())!}
                              className="inline-block mt-3 px-5 py-2 border border-white rounded-full text-white text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-300"
                            >
                              {item.buttonText.trim()}
                            </Link>
                          )}
                      </div>
                    </div>
                  </div>
                );

                return item.link ? (
                  <Link key={index} href={item.link} className="block h-full">
                    {card}
                  </Link>
                ) : (
                  <div key={index}>{card}</div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
