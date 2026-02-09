"use client";

import CallToActionButton from "@/app/components/ui/CallToActionButton";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const studios = [
  {
    title: "Digital Experience Studio",
    description:
      "We design and develop digital experiences that are intuitive, accessible, and performance-driven. Our focus is on creating websites and platforms that balance strong visual identity with usability, speed, and search engine visibility — ensuring long-term relevance in an ever-evolving digital landscape.",
    video: "/videos/animated_clip_1.mp4",
    href: "/digital-experience-studio",
  },
  {
    title: "Application Development Studio",
    description:
      "We design and develop digital experiences that are intuitive, accessible, and performance-driven. Our focus is on creating websites and platforms that balance strong visual identity with usability, speed, and search engine visibility — ensuring long-term relevance in an ever-evolving digital landscape.",
    video: "/videos/animated_clip_2.mp4",
    href: "/application-development-studio",
  },
  {
    title: "Growth & Branding Studio",
    description:
      "We design and develop digital experiences that are intuitive, accessible, and performance-driven. Our focus is on creating websites and platforms that balance strong visual identity with usability, speed, and search engine visibility — ensuring long-term relevance in an ever-evolving digital landscape.",
    video: "/videos/animated_clip_3.mp4",
    href: "/growth-branding-studio",
  },
];

export default function Studios() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !div1Ref.current || !div2Ref.current || !div3Ref.current) return;

    // Get video and content elements
    const video1 = div1Ref.current.querySelector('video');
    const video2 = div2Ref.current.querySelector('video');
    const video3 = div3Ref.current.querySelector('video');

    const content1 = div1Ref.current.querySelector('.content-wrapper');
    const content2 = div2Ref.current.querySelector('.content-wrapper');
    const content3 = div3Ref.current.querySelector('.content-wrapper');

    // Set initial state - all divs hidden except first
    // Use pointerEvents to allow clicks only on visible studio
    gsap.set(div1Ref.current, { opacity: 1, pointerEvents: 'auto' });
    gsap.set([div2Ref.current, div3Ref.current], { opacity: 0, pointerEvents: 'none' });

    // Set initial video and content scales - start small
    gsap.set([video1, content1], { scale: 1 });
    gsap.set([video2, video3, content2, content3], { scale: 0.3 });

    const viewportHeight = window.innerHeight;
    // Reduced scroll distance - Studio 3 fade out ke baad scroll khatam
    // Timeline ends right after Studio 3 fades out
    const endValue = viewportHeight * 2.0;

    // Create a timeline for the scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${endValue}px`,
        scrub: 0.5, // Smooth scrolling
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Studio 1: Visible at start, fades out and scales down
    tl.to(div1Ref.current, {
      opacity: 0,
      pointerEvents: 'none',
      duration: 0.5,
      ease: "power2.inOut",
      force3D: true,
    }, 0.3)
      .to([video1, content1], {
        scale: 0.3,
        duration: 0.5,
        ease: "power2.inOut",
        force3D: true,
      }, 0.3)
      // Studio 2: Fades in AFTER Studio 1 fades out
      .fromTo(div2Ref.current,
        { opacity: 0, pointerEvents: 'none', force3D: true },
        {
          opacity: 1,
          pointerEvents: 'auto',
          duration: 0.5,
          ease: "power2.inOut",
          force3D: true,
        }, 0.8)
      .fromTo([video2, content2],
        { scale: 0.3, force3D: true },
        {
          scale: 1,
          duration: 0.5,
          ease: "power2.inOut",
          force3D: true,
        }, 0.8)
      // Studio 2: Fades out and scales down
      .to(div2Ref.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.5,
        ease: "power2.inOut",
        force3D: true,
      }, 1.5)
      .to([video2, content2], {
        scale: 0.3,
        duration: 0.5,
        ease: "power2.inOut",
        force3D: true,
      }, 1.5)
      // Studio 3: Fades in AFTER Studio 2 fades out
      .fromTo(div3Ref.current,
        { opacity: 0, pointerEvents: 'none', force3D: true },
        {
          opacity: 1,
          pointerEvents: 'auto',
          duration: 0.5,
          ease: "power2.inOut",
          force3D: true,
        }, 2.0)
      .fromTo([video3, content3],
        { scale: 0.3, force3D: true },
        {
          scale: 1,
          duration: 0.5,
          ease: "power2.inOut",
          force3D: true,
        }, 2.0)
      // Studio 3: Stays visible, then fades out and scales down at the end
      .to(div3Ref.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.5,
        ease: "power2.inOut",
        force3D: true,
      }, 2.7)
      .to([video3, content3], {
        scale: 0.3,
        duration: 0.5,
        ease: "power2.inOut",
        force3D: true,
      }, 2.7);

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
          className="relative w-full h-screen"
        >
          {studios.map((studio, index) => {
            const divRef = index === 0 ? div1Ref : index === 1 ? div2Ref : div3Ref;
            return (
              <div
                ref={divRef}
                key={index}
                className="absolute top-1/2 left-0 right-0 -translate-y-1/2 w-full"
                style={{ willChange: 'opacity' }}
              >
                <div className={`flex flex-col items-start max-w-[1400px] ps-3 pe-3 md:ps-30 md:mt-[-140px] ${index === 1 ? "mx-auto" : index === 2 ? "ml-auto" : ""}`}>
                  {/* Background Video */}
                  <video
                    src={studio.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`absolute inset-0 object-cover mx-auto video-responsive-studios video-studio-${index}`}
                    style={{
                      left: index === 0 ? "-350px" : index === 1 ? "974px" : index === 2 ? "-150px" : "100px",
                      top: index === 0 ? "-380px" : index === 1 ? "-200px" : index === 2 ? "-150px" : "-150px",
                      width: index === 0 ? "720px" : index === 1 ? "461px" : index === 2 ? "420px" : "420px",
                      height: index === 0 ? "405px" : index === 1 ? "461px" : index === 2 ? "420px" : "420px",
                      zIndex: -1000,
                    }}
                  />

                  {/* Content */}
                  <div className={`content-wrapper relative z-20 w-full content-studio-${index === 0 ? "ps-0 lg:ps-[110px] lg:pt-0 content-studio-0" : index === 1 ? "ps-0 lg:ps-50 content-studio-1" : index === 2 ? "ps-0 lg:ps-115 content-studio-2" : "ps-0"}`}>
                    <h2 className={`text-[30px] md:text-[80px] font-[700] text-white leading-[1.2] sm:leading-[1.3] md:leading-[1.1] lg:leading-[1.05] xl:leading-[1.0] 2xl:leading-[0.95] mb-6 ${index === 0 ? 'studio-heading-0' : index === 1 ? 'studio-heading-1' : 'studio-heading-2'}`}>
                      {index === 0 ? (
                        <>
                          Digital<br />
                          Experience Studio
                        </>
                      ) : index === 1 ? (
                        <>
                          Application<br />
                          Development Studio
                        </>
                      ) : index === 2 ? (
                        <>
                          Growth &<br /> Branding Studio
                        </>
                      ) : (
                        studio.title
                      )}
                    </h2>
                    <p className="text-[16px] md:text-[20px] text-white mb-4 md:py-10 max-w-[730px] leading-[1.5] sm:leading-[1.6] md:leading-[1.65] lg:leading-[1.7] xl:leading-[1.65] 2xl:leading-[1.6]">
                      {studio.description}
                    </p>
                    <CallToActionButton 
                      variant="shiny" 
                      onClick={() => router.push(studio.href)}
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

