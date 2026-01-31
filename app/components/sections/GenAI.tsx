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

    // iOS-specific setup
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('playsinline', 'true');
    
    // Ensure video is visible on iOS
    video.style.display = 'block';
    video.style.visibility = 'visible';
    video.style.opacity = '1';

    // Pause video initially - we'll control it with scroll
    video.pause();
    video.currentTime = 0;

    let trigger: ScrollTrigger | undefined;
    let isSetup = false;

    // Wait for video to be fully ready before setting up ScrollTrigger
    const setupScrollSync = () => {
      // Prevent multiple setups
      if (isSetup) return;
      
      const videoDuration = video.duration;
      if (!videoDuration || isNaN(videoDuration) || videoDuration === 0) {
        // If duration not ready, try again after a short delay
        setTimeout(setupScrollSync, 100);
        return;
      }

      // Ensure video is at start
      video.currentTime = 0;
      video.pause();

      // Calculate section height for scroll distance
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      // Use section height for scroll distance
      const scrollDistance = sectionHeight + viewportHeight;

      // Create ScrollTrigger to sync video with scroll
      trigger = ScrollTrigger.create({
        trigger: section,
        start: "top center", // Start when section reaches center
        end: `+=${scrollDistance}px`, // End after scrolling through section
        scrub: true, // Direct scrubbing - video plays exactly as scroll progresses
        onUpdate: (self) => {
          // Set video time based on scroll progress (0 to 1)
          const progress = self.progress;
          const targetTime = progress * videoDuration;
          
          // Update video time directly for precise scrubbing
          if (Math.abs(video.currentTime - targetTime) > 0.1) {
            video.currentTime = targetTime;
          }
        },
        onEnter: () => {
          // When section enters center, ensure video is at start
          video.currentTime = 0;
          video.pause();
        },
        onLeave: () => {
          // When leaving, pause at current position
          video.pause();
        },
        onEnterBack: () => {
          // When scrolling back, ensure video is at correct position
          // Video will continue from where scroll progress is
        },
        onLeaveBack: () => {
          // When scrolling back past start, reset to beginning
          video.currentTime = 0;
          video.pause();
        },
      });

      // Refresh ScrollTrigger to ensure it's properly initialized
      ScrollTrigger.refresh();
      isSetup = true;
    };

    // Wait for video to be fully ready (canplaythrough is better than loadedmetadata)
    const handleCanPlay = () => {
      setupScrollSync();
    };

    // If video is already ready
    if (video.readyState >= 3) { // HAVE_FUTURE_DATA or HAVE_ENOUGH_DATA
      setupScrollSync();
    } else {
      // Wait for video to be ready to play
      video.addEventListener('canplaythrough', handleCanPlay, { once: true });
      // Also listen for loadedmetadata as fallback
      video.addEventListener('loadedmetadata', () => {
        // Double check duration is available
        if (video.duration && !isNaN(video.duration) && video.duration > 0) {
          setupScrollSync();
        }
      }, { once: true });
    }

    return () => {
      if (trigger) trigger.kill();
      video.removeEventListener('canplaythrough', handleCanPlay);
    };
  }, []);

  // iOS video loading fix
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force video to load on iOS
    const loadVideo = () => {
      video.load();
      // Ensure video is visible
      video.style.display = 'block';
      video.style.visibility = 'visible';
    };

    // Try to load immediately
    loadVideo();

    // Also try after a short delay for iOS
    const timeout = setTimeout(loadVideo, 100);

    return () => clearTimeout(timeout);
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
        <div className="space-y-20 sm:space-y-24 md:space-y-20 lg:space-y-20 h-full">
          {/* Main Content Div */}
          <div className="relative flex flex-col items-center h-full min-h-[300px] sm:min-h-[400px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] justify-center overflow-hidden">
            {/* Background Video */}
            <video
              ref={videoRef}
              src="/videos/animated_gen_ai_clip_2.mp4"
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 object-cover z-0 w-full h-full video-responsive-gen-ai"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
              onLoadedMetadata={(e) => {
                // Ensure video is ready on iOS
                const video = e.currentTarget;
                if (video) {
                  video.setAttribute('webkit-playsinline', 'true');
                  video.pause();
                  video.currentTime = 0;
                }
              }}
            />

            {/* Content */}
            <div className="relative z-20 w-full flex flex-col items-center text-center gap-8 sm:gap-10 md:gap-12 lg:gap-14 pt-100 sm:pt-100 md:pt-100 lg:pt-140 xl:pt-180 2xl:pt-200">
              <h2
                ref={headingRef}
                className="text-[20px] sm:text-[28px] md:text-[32px] lg:text-[45px] xl:text-[55px] 2xl:text-[60px] font-[400] text-white leading-tight sm:leading-[35px] md:leading-[40px] lg:leading-[55px] xl:leading-[65px] 2xl:leading-[70px]"
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

