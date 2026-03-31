"use client";

import { useGSAP } from "@/app/hooks/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DEFAULT_HERO_VIDEO_DESKTOP_WEBM = "/videos/bannervideo.webm";
const DEFAULT_HERO_VIDEO_DESKTOP_MP4 = "/videos/bannervideo.mp4";
const DEFAULT_HERO_VIDEO_MOBILE_MP4 = "/videos/Mainmobile.mp4";
const DEFAULT_HERO_POSTER = "/imgs/hero_img_1.png";

const HERO_VIDEO_LG_MIN = "(min-width: 1024px)";

interface HeroProps {
  videoSrc?: string;
  imageSrc?: string;
  videoSrcMobile?: string;
  imageSrcMobile?: string;
  title?: string;
  subtitle?: string;
}

export default function Hero({
  videoSrc,
  imageSrc,
  videoSrcMobile,
  imageSrcMobile,
  title,
  subtitle,
}: HeroProps = {}) {
  const customVideoSrc = videoSrc?.trim() || "";
  const hasCustomVideo = customVideoSrc.length > 0;
  const cmsPoster = imageSrc?.trim() || "";
  /** Desktop full-bleed image when there is no desktop CMS video */
  const useImageDesktop = !customVideoSrc && !!cmsPoster;

  const mobileCmsVideo = videoSrcMobile?.trim() || "";
  const mobileCmsPoster = imageSrcMobile?.trim() || "";
  const mobileVideoPlayback =
    mobileCmsVideo || customVideoSrc || DEFAULT_HERO_VIDEO_MOBILE_MP4;
  const hasMobileCustomUpload = !!(mobileCmsVideo || customVideoSrc);
  const mobilePosterEffective = mobileCmsPoster || cmsPoster || DEFAULT_HERO_POSTER;
  /** Mobile full-bleed image when there is no video source on mobile (no mobile upload, no desktop video) */
  const useImageMobile =
    !mobileCmsVideo &&
    !customVideoSrc &&
    !!(mobileCmsPoster || (useImageDesktop && cmsPoster));

  const [desktopFallback, setDesktopFallback] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  const getAllHeroVideos = (): HTMLVideoElement[] =>
    [videoRef.current, mobileVideoRef.current].filter(Boolean) as HTMLVideoElement[];

  const getVisibleHeroVideos = (): HTMLVideoElement[] => {
    if (typeof window === "undefined") return [];
    const desktop = videoRef.current;
    const mobile = mobileVideoRef.current;
    if (window.matchMedia(HERO_VIDEO_LG_MIN).matches) {
      if (useImageDesktop || !desktop) return [];
      return [desktop];
    }
    if (useImageMobile || !mobile) return [];
    return [mobile];
  };

  // Video play/pause based on section visibility (only when using video)
  useEffect(() => {
    if (useImageDesktop && useImageMobile) return;
    const section = heroRef.current;
    if (!section) return;

    const safePlay = (v: HTMLVideoElement) => {
      try {
        void v.play();
      } catch {
        // mobile autoplay can be blocked in some browsers
      }
    };

    const pauseAll = () => {
      getAllHeroVideos().forEach((v) => v.pause());
    };

    pauseAll();

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "60% top",
      onEnter: () => {
        setTimeout(() => {
          getVisibleHeroVideos().forEach((v) => safePlay(v));
        }, 1500);
      },
      onLeave: () => {
        pauseAll();
      },
      onEnterBack: () => {
        getVisibleHeroVideos().forEach((v) => safePlay(v));
      },
      onLeaveBack: () => {
        pauseAll();
      },
    });

    const opacityTween = gsap.to(getAllHeroVideos(), {
      opacity: 0,
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "60% top",
        scrub: true,
      },
    });

    const mq = window.matchMedia(HERO_VIDEO_LG_MIN);
    const onBreakpoint = () => {
      pauseAll();
      ScrollTrigger.refresh();
      getVisibleHeroVideos().forEach((v) => safePlay(v));
    };
    mq.addEventListener("change", onBreakpoint);

    return () => {
      mq.removeEventListener("change", onBreakpoint);
      trigger.kill();
      if (opacityTween.scrollTrigger) opacityTween.scrollTrigger.kill();
    };
  }, [useImageDesktop, useImageMobile, customVideoSrc, mobileCmsVideo]);

  const hasText = !!(title?.trim() || subtitle?.trim());

  useGSAP(
    () => {
      const tl = gsap.timeline();
      const mediaNodes = heroRef.current?.querySelectorAll(".hero-bg-media");
      if (mediaNodes?.length) {
        tl.from(Array.from(mediaNodes), {
          opacity: 0,
          scale: 1.1,
          duration: 1.5,
          ease: "power2.out",
        });
      }

      if (!hasText) return;

      if (titleRef.current) {
        tl.from(
          titleRef.current,
          { y: 50, opacity: 0, duration: 1, ease: "power3.out" },
          "-=1"
        );
      }
      if (subtitleRef.current) {
        tl.from(
          subtitleRef.current,
          { y: 30, opacity: 0, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        );
      }
    },
    heroRef,
    [hasText, useImageDesktop, useImageMobile, title, subtitle]
  );

  const mobileImgSrc = mobileCmsPoster || (useImageDesktop ? cmsPoster : "");

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex items-center justify-center h-screen md:min-h-screen overflow-hidden w-full"
    >
      <div className="absolute inset-0 z-0 w-full h-full">
        {useImageDesktop ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc!}
            alt=""
            className="hero-bg-media hidden lg:block w-full h-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload="auto"
            poster={cmsPoster || DEFAULT_HERO_POSTER}
            className="hero-bg-media hidden lg:block w-full h-full object-cover"
            onError={() => {
              if (!hasCustomVideo) setDesktopFallback(true);
            }}
          >
            {hasCustomVideo ? (
              <source src={customVideoSrc} type="video/mp4" />
            ) : desktopFallback ? (
              <source src={DEFAULT_HERO_VIDEO_MOBILE_MP4} type="video/mp4" />
            ) : (
              <>
                <source src={DEFAULT_HERO_VIDEO_DESKTOP_WEBM} type="video/webm" />
                <source src={DEFAULT_HERO_VIDEO_DESKTOP_MP4} type="video/mp4" />
              </>
            )}
          </video>
        )}

        {useImageMobile ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mobileImgSrc}
            alt=""
            className="hero-bg-media lg:hidden w-full h-full object-cover"
          />
        ) : (
          <video
            key={
              hasMobileCustomUpload
                ? `m-${mobileCmsVideo || customVideoSrc}`
                : "m-default"
            }
            ref={mobileVideoRef}
            loop
            muted
            playsInline
            preload="auto"
            poster={mobilePosterEffective}
            className="hero-bg-media lg:hidden w-full h-full object-cover"
          >
            <source src={mobileVideoPlayback} type="video/mp4" />
          </video>
        )}
      </div>

      {hasText && (
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 w-full pointer-events-none">
          <div className="mx-auto max-w-4xl text-center">
            {title?.trim() ? (
              <h1
                ref={titleRef}
                className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
              >
                {title.trim()}
              </h1>
            ) : null}
            {subtitle?.trim() ? (
              <p
                ref={subtitleRef}
                className="text-lg leading-relaxed text-white/90 sm:text-xl md:text-2xl whitespace-pre-line"
              >
                {subtitle.trim()}
              </p>
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
}
