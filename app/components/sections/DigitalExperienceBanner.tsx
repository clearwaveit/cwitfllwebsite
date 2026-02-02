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
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const mobileVideoContainerRef = useRef<HTMLDivElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // Set responsive styles for video and contact form
  useEffect(() => {
    const updateResponsiveStyles = () => {
      const width = window.innerWidth;
      
      // Update video container styles
      if (videoContainerRef.current && videoSrc) {
        if (width >= 1280) {
          // xl (1280px+)
          videoContainerRef.current.style.width = '1162px';
          videoContainerRef.current.style.height = '654px';
          videoContainerRef.current.style.top = '500px';
          videoContainerRef.current.style.left = '681px';
        } else if (width >= 1024) {
          // lg (1024px-1279px)
          videoContainerRef.current.style.width = 'clamp(700px, 65vw, 900px)';
          videoContainerRef.current.style.height = 'clamp(394px, 36.5vw, 506px)';
          videoContainerRef.current.style.top = 'clamp(400px, 45vh, 500px)';
          videoContainerRef.current.style.left = 'clamp(400px, 40vw, 550px)';
        } else if (width >= 768) {
          // md (768px-1023px)
          videoContainerRef.current.style.width = 'clamp(400px, 60vw, 800px)';
          videoContainerRef.current.style.height = 'clamp(225px, 33.75vw, 450px)';
          videoContainerRef.current.style.top = 'clamp(350px, 40vh, 450px)';
          videoContainerRef.current.style.left = 'clamp(300px, 35vw, 500px)';
        }
      }

      // Update contact form container styles
      if (contactFormRef.current && contactForm) {
        if (width >= 1280) {
          // xl (1280px+)
          contactFormRef.current.style.maxWidth = '742px';
          contactFormRef.current.style.top = 'auto';
          contactFormRef.current.style.right = 'auto';
          contactFormRef.current.style.left = 'auto';
        } else if (width >= 1024) {
          // lg (1024px-1279px)
          contactFormRef.current.style.maxWidth = 'clamp(650px, 60vw, 700px)';
          contactFormRef.current.style.top = 'clamp(400px, 45vh, 500px)';
          contactFormRef.current.style.right = 'clamp(30px, 4vw, 50px)';
          contactFormRef.current.style.left = 'auto';
        } else if (width >= 768) {
          // md (768px-1023px)
          contactFormRef.current.style.maxWidth = 'clamp(500px, 55vw, 650px)';
          contactFormRef.current.style.top = 'clamp(350px, 40vh, 450px)';
          contactFormRef.current.style.right = 'clamp(20px, 5vw, 40px)';
          contactFormRef.current.style.left = 'auto';
        }
      }

      // Update vector background styles
      if (vectorRef.current) {
        if (width >= 1280) {
          // xl (1280px+)
          vectorRef.current.style.width = '1364px';
          vectorRef.current.style.height = '2200px';
          vectorRef.current.style.top = '-490px';
          vectorRef.current.style.left = '0';
        } else if (width >= 1024) {
          // lg (1024px-1279px)
          vectorRef.current.style.width = 'clamp(1100px, 85vw, 1200px)';
          vectorRef.current.style.height = 'clamp(1800px, 200vh, 2000px)';
          vectorRef.current.style.top = 'clamp(-350px, -30vh, -250px)';
          vectorRef.current.style.left = 'clamp(-150px, -8vw, -50px)';
        } else if (width >= 768) {
          // md (768px-1023px)
          vectorRef.current.style.width = 'clamp(800px, 100vw, 1100px)';
          vectorRef.current.style.height = 'clamp(1400px, 180vh, 1800px)';
          vectorRef.current.style.top = 'clamp(-300px, -25vh, -200px)';
          vectorRef.current.style.left = 'clamp(-200px, -10vw, -100px)';
        }
      }

      // Update mobile video container and video styles
      if (mobileVideoContainerRef.current && videoSrc) {
        if (width >= 768) {
          // Tablet (768px-1023px) - should not show, but just in case
          mobileVideoContainerRef.current.style.height = 'clamp(400px, 50vh, 500px)';
          mobileVideoContainerRef.current.style.maxWidth = '85%';
        } else if (width >= 640) {
          // Small screens (640px-767px)
          mobileVideoContainerRef.current.style.height = 'clamp(350px, 45vh, 450px)';
          mobileVideoContainerRef.current.style.maxWidth = '80%';
          mobileVideoContainerRef.current.style.top = '200px';
        } else if (width >= 480) {
          // Medium mobile (480px-639px)
          mobileVideoContainerRef.current.style.height = 'clamp(320px, 42vh, 400px)';
          mobileVideoContainerRef.current.style.maxWidth = '75%';
          mobileVideoContainerRef.current.style.top = '180px';
        } else {
          // Small mobile (375px-479px)
          mobileVideoContainerRef.current.style.height = 'clamp(300px, 40vh, 380px)';
          mobileVideoContainerRef.current.style.maxWidth = '70%';
          mobileVideoContainerRef.current.style.top = '170px';
        }
      }

      if (mobileVideoRef.current && videoSrc) {
        if (width >= 768) {
          mobileVideoRef.current.style.maxHeight = 'clamp(280px, 36vh, 360px)';
          mobileVideoRef.current.style.maxWidth = '80%';
        } else if (width >= 640) {
          mobileVideoRef.current.style.maxHeight = 'clamp(250px, 34vh, 320px)';
          mobileVideoRef.current.style.maxWidth = '75%';
        } else if (width >= 480) {
          mobileVideoRef.current.style.maxHeight = 'clamp(230px, 32vh, 300px)';
          mobileVideoRef.current.style.maxWidth = '70%';
        } else {
          mobileVideoRef.current.style.maxHeight = 'clamp(210px, 30vh, 280px)';
          mobileVideoRef.current.style.maxWidth = '65%';
        }
      }
    };

    updateResponsiveStyles();
    window.addEventListener('resize', updateResponsiveStyles);
    return () => window.removeEventListener('resize', updateResponsiveStyles);
  }, [videoSrc, contactForm]);

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
      className={`relative bg-black overflow-hidden min-h-[500px] sm:min-h-[550px] md:min-h-[900px] lg:min-h-[1000px] xl:min-h-[1180px] isolate ${className}`}
      style={{
        width: '100%',
        height: '100%',
        // minHeight: minHeight,
      }}
    >
      {/* Background Video - Right Side */}
      {videoSrc && (
        <div 
          ref={videoContainerRef}
          className="absolute z-16 hidden md:block pointer-events-none digital-experience-video-container"
          style={{
            zIndex: 16,
            // Base styles for md (768px-1023px) - will be updated by useEffect
            width: 'clamp(400px, 60vw, 800px)',
            height: 'clamp(225px, 33.75vw, 450px)',
            top: 'clamp(350px, 40vh, 450px)',
            left: 'clamp(300px, 35vw, 500px)',
          }}
        >
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
        <div 
          ref={mobileVideoContainerRef}
          className="absolute z-16 md:hidden w-full left-1/2 transform -translate-x-1/2 pointer-events-none flex items-center justify-center"
          style={{
            zIndex: 16,
            // Base styles for small mobile (375px) - will be updated by useEffect
            height: 'clamp(300px, 40vh, 380px)',
            maxWidth: '70%',
            top: '170px',
          }}
        >
          <video
            ref={mobileVideoRef}
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="h-auto rounded-lg"
            style={{
              // Base styles for small mobile - will be updated by useEffect
              maxHeight: 'clamp(210px, 30vh, 280px)',
              maxWidth: '75%',
              objectFit: 'contain',
            }}
          />
        </div>
      )}
      {/* Contact Form - Right Side (replaces video) - Desktop Only */}
      {contactForm && (
        <div
          ref={contactFormRef}
          className="contact-form-container w-full hidden md:block absolute z-30 px-4 md:px-6 lg:px-8 xl:px-0"
          style={{
            // Base styles for md (768px-1023px) - will be updated by useEffect
            maxWidth: 'clamp(500px, 55vw, 650px)',
            top: 'clamp(350px, 40vh, 450px)',
            right: 'clamp(20px, 5vw, 40px)',
          }}
        >
          <div className="w-full">
            {contactForm}
          </div>
        </div>
      )}

      {/* Background Image - Vector (Left Side) - Desktop */}
      <div
        ref={vectorRef}
        className="absolute hidden md:block pointer-events-none vector-background"
        style={{
          zIndex: 20,
          // Base styles for md (768px-1023px) - will be updated by useEffect
          width: 'clamp(800px, 100vw, 1100px)',
          height: 'clamp(1400px, 180vh, 1800px)',
          transform: 'rotate(0)',
          top: 'clamp(-300px, -25vh, -200px)',
          left: 'clamp(-200px, -10vw, -100px)',
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
          height: 'clamp(400px, 60vh, 600px)',
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
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Content - Positioned within the green curved section */}
      <div ref={contentRef} className="relative z-20 h-full flex items-center pointer-events-none">
        <div ref={contentWrapperRef} className="max-w-[1400px] w-full h-full min-h-[500px] sm:min-h-[550px] md:min-h-[700px] lg:min-h-[750px] xl:min-h-[724px] flex flex-col md:flex-row items-center justify-start ps-4 pe-4 sm:ps-5 sm:pe-5 md:ps-6 lg:ps-8 xl:ps-30">
          <div className="ps-0 md:ps-4 lg:ps-6 xl:ps-8 pt-26 sm:pt-20 md:pt-30 lg:pt-50 xl:pt-70 pointer-events-auto w-full md:w-auto">
            <h1
              ref={headingRef}
              className="text-[22px] sm:text-[32px] md:text-[50px] lg:text-[65px] xl:text-[80px] font-[500] text-white leading-[32px] sm:leading-[38px] md:leading-[55px] lg:leading-[70px] xl:leading-[80px] mb-3 sm:mb-4 md:mb-5 lg:mb-6 contact-form-heading"
            >
              {title}
            </h1>
            {description && (
              <p
                ref={textRef}
                className="text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] xl:text-[30px] font-light text-white leading-relaxed contact-form-description"
              >
                {description}
              </p>
            )}
          </div>
          {/* Contact Form - Mobile View (below heading) */}
          {contactForm && (
            <div className="md:hidden w-full mt-6 sm:mt-8 pointer-events-auto px-2 sm:px-4">
              {contactForm}
            </div>
          )}
        </div>
      </div>

    </section>
  );
}

