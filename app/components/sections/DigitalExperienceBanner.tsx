"use client";

import Image from "next/image";
import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface DigitalExperienceBannerProps {
  title?: string | ReactNode;
  description?: string;
  videoSrc?: string;
  contactForm?: ReactNode;
  backgroundImage?: {
    src: string;
    alt: string;
    style?: React.CSSProperties;
  };
  className?: string;
  minHeight?: string;
}

export default function DigitalExperienceBanner({
  title,
  description,
  videoSrc,
  contactForm,
  backgroundImage,
  className = "",
  minHeight = "1080px",
}: DigitalExperienceBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);
  const vectorRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Create a master timeline for entrance animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Set initial states for all elements
      if (vectorRef.current) {
        gsap.set(vectorRef.current, {
          opacity: 0,
          scale: 1.1,
        });
        // Animate vector background
        tl.to(vectorRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
        });
      }

      if (overlayRef.current) {
        gsap.set(overlayRef.current, {
          opacity: 0,
        });
        // Animate overlay
        tl.to(
          overlayRef.current,
          {
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
          },
          "<0.2"
        );
      }

      // Animate video
      if (videoSrc && videoRef.current) {
        gsap.set(videoRef.current, {
          opacity: 0,
          scale: 0.9,
          x: 50,
        });
        tl.to(
          videoRef.current,
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 1.2,
            ease: "power2.out",
          },
          "<0.3"
        );
      }

      // Animate contact form
      if (contactForm && contactFormRef.current) {
        gsap.set(contactFormRef.current, {
          opacity: 0,
          scale: 0.95,
          x: 50,
        });
        tl.to(
          contactFormRef.current,
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 1.2,
            ease: "power2.out",
          },
          "<0.3"
        );
      }

      // Animate content wrapper
      if (contentWrapperRef.current) {
        gsap.set(contentWrapperRef.current, {
          opacity: 0,
        });
        tl.to(
          contentWrapperRef.current,
          {
            opacity: 1,
            duration: 0.5,
            ease: "power1.out",
          },
          "<0.2"
        );
      }

      // Animate heading
      if (headingRef.current) {
        gsap.set(headingRef.current, {
          opacity: 0,
          y: 50,
        });
        tl.to(
          headingRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "<0.3"
        );
      }

      // Animate description text
      if (description && textRef.current) {
        gsap.set(textRef.current, {
          opacity: 0,
          y: 30,
        });
        tl.to(
          textRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "<0.2"
        );
      }

      // Parallax effects on scroll
      if (vectorRef.current) {
        gsap.to(vectorRef.current, {
          y: -100,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (videoSrc && videoRef.current) {
        gsap.to(videoRef.current, {
          y: -50,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (contactForm && contactFormRef.current) {
        gsap.to(contactFormRef.current, {
          y: -30,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (contentRef.current) {
        gsap.to(contentRef.current, {
          y: -20,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [description, videoSrc, contactForm]);


  return (
    <section
      id="contact-form-section"
      ref={sectionRef}
      className={`relative bg-black overflow-hidden min-h-[600px] md:min-h-[1180px] isolate ${className}`}
      style={{
        width: '100%',
        height: '100%',
        // minHeight: minHeight,
      }}
    >
      {/* Background Video - Right Side */}
      {videoSrc && (
        <div className="absolute z-16 hidden md:block pointer-events-none" style={{
          zIndex: 16,
          width: '1162px',
          height: '654px',
          top: '500px',
          left: '681px',
        }}>
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full digital-experience-banner-video"
          />
        </div>
      )}
      {/* Background Video - Mobile View */}
      {videoSrc && (
        <div className="absolute z-16 md:hidden w-full max-w-[90%] top-[250px] md:top-[400px] left-1/2 transform -translate-x-1/2 pointer-events-none" style={{
          zIndex: 16,
          maxHeight: '400px',
        }}>
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto"
            style={{
              maxHeight: '400px',
            }}
          />
        </div>
      )}
      {/* Contact Form - Right Side (replaces video) - Desktop Only */}
      {contactForm && (
        <div
          ref={contactFormRef}
          className="contact-form-container w-full md:max-w-[742px] hidden md:block absolute z-30 w-full px-4 md:px-0"
        >
          <div className="w-full">
            {contactForm}
          </div>
        </div>
      )}

      {/* Background Image - Vector (Left Side) - Desktop */}
      <div
        ref={vectorRef}
        className="absolute hidden md:block pointer-events-none"
        style={{
          zIndex: 20,
          width: '1364px',
          height: '2200px',
          transform: 'rotate(0)',
          top: '-490px',
          ...backgroundImage?.style || {},
        }}
      >
        <Image
          src={backgroundImage?.src || ''}
          alt={backgroundImage?.alt || ''}
          width={1364}
          height={2200}
          className="object-contain"
          priority
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
      {/* Background Image - Vector (Left Side) - Mobile */}
      <div
        className="absolute md:hidden pointer-events-none"
        style={{
          zIndex: 20,
          width: '100%',
          height: '500px',
          maxHeight: '100vh',
          top: '0',
          left: '0',
          ...backgroundImage?.style || {},
        }}
      >
        <Image
          src={backgroundImage?.src || ''}
          alt={backgroundImage?.alt || ''}
          width={1364}
          height={2200}
          className="object-cover w-full h-full"
          priority
          style={{
            width: '100%',
            height: '100%',
            // objectFit: 'contain',
          }}
        />
      </div>

      {/* Content - Positioned within the green curved section */}
      <div ref={contentRef} className="relative z-20 h-full flex items-center pointer-events-none">
        <div ref={contentWrapperRef} className="max-w-[1400px] h-full h-[724px] md:min-h-[700px] flex flex-col md:flex-row items-center justify-center ps-3 pe-3 md:ps-30">
          <div className="ps-0 lg:ps-8 pt-30 lg:pt-70 pointer-events-auto w-full md:w-auto">
            <h1
              ref={headingRef}
              className="text-[40px] md:text-[80px] font-[500] text-white leading-[44px] md:leading-[80px] mb-6"
            >
              {title}
            </h1>
            {description && (
              <p
                ref={textRef}
                className="text-[16px] md:text-[30px] font-light text-white leading-relaxed"
              >
                {description}
              </p>
            )}
          </div>
          {/* Contact Form - Mobile View (below heading) */}
          {contactForm && (
            <div className="md:hidden w-full mt-8 pointer-events-auto">
              {contactForm}
            </div>
          )}
        </div>
      </div>

    </section>
  );
}

