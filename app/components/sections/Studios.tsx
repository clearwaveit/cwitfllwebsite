"use client";

import CallToActionButton from "@/app/components/ui/CallToActionButton";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DEFAULT_DESCRIPTION = "As we are adept in developing visual and verbal excellence, we make sure your brand is highlighted with a user-friendly, accessible and adaptive user interface that will make your website relevant in this ever-evolving prospect.";

const DEFAULT_STUDIOS = [
  { title: "Digital Experience Studio", description: DEFAULT_DESCRIPTION, video: "/videos/animated_clip_1.mp4", href: "/digital-experience-studio" },
  { title: "Application Development Studio", description: DEFAULT_DESCRIPTION, video: "/videos/animated_clip_2.mp4", href: "/application-development-studio" },
  { title: "Growth & Branding Studio", description: DEFAULT_DESCRIPTION, video: "/videos/animated_clip_3.mp4", href: "/growth-branding-studio" },
];

interface StudioItem {
  title: string;
  description: string;
  video: string;
  href: string;
}

interface StudiosProps {
  studios?: StudioItem[];
}

const STUDIO_INDICES = [0, 1, 2] as const;

export default function Studios({ studios: studiosProp }: StudiosProps = {}) {
  const fromCms = studiosProp?.length ? studiosProp.slice(0, 3) : [];
  // Slot 0 = Digital (clip_1), slot 1 = Application (clip_2), slot 2 = Growth (clip_3). Base = DEFAULT_STUDIOS, overlay CMS per index.
  const studios: typeof DEFAULT_STUDIOS = [0, 1, 2].map((i) => {
    const base = DEFAULT_STUDIOS[i];
    const cms = fromCms[i];
    if (!cms) return base;
    const cmsVideo = (cms.video ?? "").trim();
    const isCmsVideoUrl = cmsVideo.length > 0 && (cmsVideo.startsWith("http") || cmsVideo.startsWith("/"));
    return {
      title: (cms.title?.trim()) || base.title,
      description: (cms.description?.trim()) || base.description,
      video: isCmsVideoUrl ? cmsVideo : base.video,
      href: base.href,
    };
  }) as typeof DEFAULT_STUDIOS;
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const divRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  const getStudio = (index: number): StudioItem => studios[index] ?? DEFAULT_STUDIOS[index];
  const getHref = (index: number): string => DEFAULT_STUDIOS[index]?.href ?? "/";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const container = section.querySelector("[data-studios-container]");
    if (!container) return;

    const div1Ref = container.querySelector("[data-studio-index='0']") as HTMLDivElement | null;
    const div2Ref = container.querySelector("[data-studio-index='1']") as HTMLDivElement | null;
    const div3Ref = container.querySelector("[data-studio-index='2']") as HTMLDivElement | null;

    if (!div1Ref || !div2Ref || !div3Ref) return;

    const video1 = div1Ref.querySelector("video");
    const video2 = div2Ref.querySelector("video");
    const video3 = div3Ref.querySelector("video");
    const content1 = div1Ref.querySelector(".content-wrapper");
    const content2 = div2Ref.querySelector(".content-wrapper");
    const content3 = div3Ref.querySelector(".content-wrapper");

    // Stacking: visible card must be on top so content and click match. Use z-index.
    gsap.set(div1Ref, { opacity: 1, pointerEvents: "auto", visibility: "visible", zIndex: 10 });
    gsap.set(div2Ref, { opacity: 0, pointerEvents: "none", visibility: "visible", zIndex: 0 });
    gsap.set(div3Ref, { opacity: 0, pointerEvents: "none", visibility: "visible", zIndex: 0 });
    gsap.set([video1, content1].filter(Boolean), { scale: 1, opacity: 1, visibility: "visible" });
    gsap.set([video2, video3, content2, content3].filter(Boolean), { scale: 0.3, opacity: 1, visibility: "visible" });

    const viewportHeight = window.innerHeight;
    const endValue = viewportHeight * 2.0;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${endValue}px`,
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Studio 0: fade out, put behind
    tl.to(div1Ref, { opacity: 0, pointerEvents: "none", zIndex: 0, duration: 0.5, ease: "power2.inOut", force3D: true }, 0.3);
    tl.to([video1, content1].filter(Boolean), { scale: 0.3, duration: 0.5, ease: "power2.inOut", force3D: true }, 0.3);

    // Studio 1: bring on top, fade in
    tl.to(div2Ref, { zIndex: 10 }, 0.75);
    tl.fromTo(div2Ref, { opacity: 0, pointerEvents: "none", force3D: true }, { opacity: 1, pointerEvents: "auto", duration: 0.5, ease: "power2.inOut", force3D: true }, 0.8);
    tl.fromTo([video2, content2].filter(Boolean), { scale: 0.3, force3D: true }, { scale: 1, duration: 0.5, ease: "power2.inOut", force3D: true }, 0.8);
    tl.to(div2Ref, { opacity: 0, pointerEvents: "none", zIndex: 0, duration: 0.5, ease: "power2.inOut", force3D: true }, 1.5);
    tl.to([video2, content2].filter(Boolean), { scale: 0.3, duration: 0.5, ease: "power2.inOut", force3D: true }, 1.5);

    // Studio 2 (index 2): bring on top, fade in – ensure third card visible
    tl.to(div3Ref, { zIndex: 10 }, 1.95);
    tl.fromTo(div3Ref, { opacity: 0, pointerEvents: "none", force3D: true }, { opacity: 1, pointerEvents: "auto", duration: 0.5, ease: "power2.inOut", force3D: true }, 2.0);
    tl.fromTo([video3, content3].filter(Boolean), { scale: 0.3, force3D: true }, { scale: 1, duration: 0.5, ease: "power2.inOut", force3D: true }, 2.0);
    tl.to(div3Ref, { opacity: 0, pointerEvents: "none", zIndex: 0, duration: 0.5, ease: "power2.inOut", force3D: true }, 2.7);
    tl.to([video3, content3].filter(Boolean), { scale: 0.3, duration: 0.5, ease: "power2.inOut", force3D: true }, 2.7);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill();
      });
    };
  }, [studios.length]);

  return (
    <section ref={sectionRef} className="relative bg-black pt-24 overflow-hidden" style={{ minHeight: '100vh' }}>
      {/* Background Image - Right Side - Hidden temporarily */}
      {/* <div
        ref={imageRef}
        style={{
          margin: '0 auto',
          willChange: 'transform',
        }}
        className="w-[1920px] max-w-full left-0 md:left-[700px] absolute right-0 top-0 bottom-0 w-1/2 z-10">
        <Image
          src={maskGroupImg}
          alt="Background"
          className="object-cover object-right h-[452px] md:h-[1562px] mask-studio-image"
          unoptimized
        />
      </div> */}

      <div className="relative z-1 w-full h-screen flex items-center justify-center">
        <div
          ref={containerRef}
          data-studios-container
          className="relative w-full h-screen"
        >
          {STUDIO_INDICES.map((index) => {
            const studio = getStudio(index);
            const divRef = divRefs[index];
            return (
              <div
                ref={divRef}
                key={index}
                data-studio-index={index}
                className="absolute top-1/2 left-0 right-0 -translate-y-1/2 w-full"
                style={{ willChange: 'opacity' }}
              >
                <div className={`relative flex flex-col items-start max-w-[1400px] ps-3 pe-3 md:ps-38 md:mt-[-140px] ${index === 1 ? "mx-auto" : index === 2 ? "ml-auto" : ""}`}>
                  {/* Video: index 0 top-right (manta), index 1 right (orb), index 2 left (rocket) */}
                  <video
                    src={studio.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`absolute inset-0 object-cover mx-auto video-responsive-studios video-studio-${index}`}
                    style={{
                      left: index === 0 ? "150px" : index === 1 ? "774px" : index === 2 ? "-650px" : "100px",
                      top: index === 0 ? "-190px" : index === 1 ? "-100px" : index === 2 ? "-20px" : "-150px",
                      width: index === 0 ? "720px" : index === 1 ? "461px" : index === 2 ? "420px" : "420px",
                      height: index === 0 ? "405px" : index === 1 ? "461px" : index === 2 ? "420px" : "420px",
                      zIndex: -1000,
                    }}
                  />

                  {/* Content - all three left-aligned to match DEFAULT_STUDIOS screenshot */}
                  <div className={`content-wrapper relative z-20 w-full ${index === 0 ? "ps-0 lg:ps-8 lg:pt-0 content-studio-0" : index === 1 ? "ps-0 lg:ps-26 content-studio-1" : index === 2 ? "ps-0 lg:ps-100 content-studio-2" : "ps-0"}`}>
                    <h2 className={`text-[30px] md:text-[80px] font-[700] text-white leading-[32px] md:leading-[80px] ${index === 0 ? "studio-heading-0" : index === 1 ? "studio-heading-1" : "studio-heading-2"}`}>
                      {index === 0 ? (
                        (() => {
                          const t = studio.title || DEFAULT_STUDIOS[0].title;
                          const first = t.split(" ")[0] || "Digital";
                          const second = t.split(" ").slice(1).join(" ") || "Experience Studio";
                          return <>{first}<br />{second}</>;
                        })()
                      ) : index === 1 ? (
                        (() => {
                          const t = studio.title || DEFAULT_STUDIOS[1].title;
                          const first = t.split(" ")[0] || "Application";
                          const second = t.split(" ").slice(1).join(" ") || "Development Studio";
                          return <>{first}<br />{second}</>;
                        })()
                      ) : index === 2 ? (
                        (() => {
                          const t = studio.title || DEFAULT_STUDIOS[2].title;
                          const first = t.startsWith("Growth &") ? "Growth &" : t.split(" ")[0] || "Growth &";
                          const second = t.startsWith("Growth &") ? t.slice(8).trim() : t.split(" ").slice(1).join(" ") || "Branding Studio";
                          return <>{first}<br />{second}</>;
                        })()
                      ) : (
                        studio.title || DEFAULT_STUDIOS[index]?.title || "Studio"
                      )}
                    </h2>
                    <p className="text-[16px] md:text-[18px] text-white py-8 max-w-[730px] leading-relaxed">
                      {studio.description || DEFAULT_STUDIOS[index]?.description || ""}
                    </p>
                    <CallToActionButton 
                      variant="shiny" 
                      onClick={() => router.push(getHref(index))}
                    />
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

