"use client";

import { useGSAP } from "@/app/hooks/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video play/pause based on section visibility
  useEffect(() => {
    const video = videoRef.current;
    const section = heroRef.current;

    if (!video || !section) return;

    // Initially pause the video
    video.pause();

    // Create ScrollTrigger for video play/pause
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "60% top", // 40% scrolled out means 60% still visible
      onEnter: () => {
        // Delay video play by 1.5s when entering
        setTimeout(() => {
          video.play();
        }, 1500);
      },
      onLeave: () => {
        // Pause when 40% of section has scrolled out
        video.pause();
      },
      onEnterBack: () => {
        // Resume video when scrolling back to 40% point
        video.play();
      },
      onLeaveBack: () => {
        video.pause();
      },
    });

    // Create opacity animation tied to scroll
    const opacityTween = gsap.to(video, {
      opacity: 0,
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "60% top",
        scrub: true,
      },
    });

    return () => {
      trigger.kill();
      if (opacityTween.scrollTrigger) opacityTween.scrollTrigger.kill();
    };
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Animate video
      if (videoRef.current) {
        tl.from(videoRef.current, {
          opacity: 0,
          scale: 1.1,
          duration: 1.5,
          ease: "power2.out",
        });
      }

      // Animate title
      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=1")
        // Animate subtitle
        .from(
          subtitleRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5"
        )
        // Animate buttons
        .from(
          buttonRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );
    },
    heroRef,
    []
  );

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex items-center justify-center h-[300px] md:min-h-screen overflow-hidden w-full"
    >
      {/* Hero Background Video */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <video
          ref={videoRef}
          src="/videos/hero_banner.mp4"
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* Sticky Bar at Bottom */}
      {/* <div 
        className="absolute bottom-4 md:bottom-6 z-20 w-full py-3 px-4 md:py-1 md:px-6"
        style={{ backgroundColor: '#2dfdc3' }}
      >
        <div className="container mx-auto">
          <p className="text-black text-sm md:text-base font-medium text-center">
            Creating Exceptional Digital Experiences With Cutting-Edge Technology
          </p>
        </div>
      </div> */}
      
      {/* Content Overlay */}
      {/* <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mx-auto max-w-4xl text-center">
          <h1
            ref={titleRef}
            className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Welcome to{" "}
            <span className="bg-gradient-to-r from-white to-zinc-200 bg-clip-text text-transparent">
              Your Journey
            </span>
          </h1>
          <p
            ref={subtitleRef}
            className="mb-12 text-lg leading-relaxed text-white/90 sm:text-xl md:text-2xl"
          >
            Creating beautiful experiences with modern web technologies and
            smooth animations
          </p>
          <div ref={buttonRef} className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-semibold text-zinc-900 transition-all duration-300 hover:bg-zinc-100">
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-zinc-100 to-zinc-200 transition-transform duration-300 group-hover:translate-x-0"></span>
            </button>
            <button className="rounded-full border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-white/10">
              Learn More
            </button>
          </div>
        </div>
      </div> */}
    </section>
  );
}

