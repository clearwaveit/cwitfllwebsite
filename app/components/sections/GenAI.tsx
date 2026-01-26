"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CallToActionButton from "@/app/components/ui/CallToActionButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GenAI() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  // Video playback synced with scroll progress
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    // Pause video initially - we'll control it with scroll
    video.pause();

    // Target time for smooth interpolation
    let targetTime = 0;
    let currentTime = 0;
    let rafId: number;

    // Smooth interpolation function
    const smoothUpdate = () => {
      // Lerp (linear interpolation) for smooth transition
      const ease = 0.1; // Lower = smoother but slower, Higher = faster but less smooth
      currentTime += (targetTime - currentTime) * ease;

      // Only update if difference is significant
      if (Math.abs(targetTime - currentTime) > 0.01) {
        video.currentTime = currentTime;
      }

      rafId = requestAnimationFrame(smoothUpdate);
    };

    // Wait for video metadata to load to get duration
    const setupScrollSync = () => {
      const videoDuration = video.duration;
      if (!videoDuration || isNaN(videoDuration)) return;

      // Start smooth update loop
      rafId = requestAnimationFrame(smoothUpdate);

      // Create ScrollTrigger to sync video with scroll
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 80%", // Start when section enters viewport
        end: "bottom 20%", // End when section leaves viewport
        scrub: 1.5, // Smooth scrubbing with 1.5 second delay
        onUpdate: (self) => {
          // Set target time based on scroll progress (0 to 1)
          targetTime = self.progress * videoDuration;
        },
      });

      return trigger;
    };

    let trigger: ScrollTrigger | undefined;

    // If video is already loaded
    if (video.readyState >= 1) {
      trigger = setupScrollSync();
    } else {
      // Wait for metadata to load
      video.addEventListener('loadedmetadata', () => {
        trigger = setupScrollSync();
      });
    }

    return () => {
      if (trigger) trigger.kill();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // GSAP scroll animations
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

      // Animate video
      if (videoRef.current) {
        gsap.set(videoRef.current, { opacity: 0, scale: 0.9 });
        tl.to(videoRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        });
      }

      // Animate heading
      if (headingRef.current) {
        gsap.set(headingRef.current, { opacity: 0, y: 50 });
        tl.to(headingRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }, "<0.3");
      }

      // Animate button
      if (buttonRef.current) {
        gsap.set(buttonRef.current, { opacity: 0, y: 30 });
        tl.to(buttonRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }, "<0.2");
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black pt-24 pb-50 overflow-hidden">
      <div className="relative z-10 container-fluid mx-auto">
        <div className="space-y-32 md:space-y-20 h-full">
          {/* Main Content Div */}
          <div className="relative flex flex-col items-center max-w-[1494px] mx-auto h-full h-[400px] md:min-h-[800px] justify-center overflow-hidden">
            {/* Background Video */}
            <video
              ref={videoRef}
              src="/videos/animated_gen_ai_clip_2.mp4"
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 object-cover z-0 mx-auto video-responsive-gen-ai w-[900px] h-[400px] md:min-h-[900px]"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />

            {/* Content */}
            <div className="relative z-20 w-full flex flex-col items-center text-center gap-14 pt-100 lg:pt-200">
              <h2
                ref={headingRef}
                className="text-[20px] md:text-[60px] font-[400] text-white leading-tight md:leading-[60px]"
              >
                Redefining Businesses<br />
                with AI-as-a-Service
              </h2>
              {/* <p className="text-[14px] md:text-[20px] text-white mb-8 max-w-2xl md:px-0 px-12 leading-relaxed">
                Every transformation begins with guidance. Our AI-as-a-Service offering leads businesses into the new era of intelligence — where automation, data, and decision-making converge into seamless, future-ready systems.
              </p> */}
              <div ref={buttonRef}>
                <CallToActionButton variant="shiny" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

