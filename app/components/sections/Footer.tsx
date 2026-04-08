"use client";

import Image from "next/image";
import vectorBg from "@/app/assets/imgs/Mask group (2).png";
import CallToActionButton from "../ui/CallToActionButton";
import phoneIcon from "@/app/assets/imgs/phone.png";
import linkedinIcon from "@/app/assets/imgs/linkedin.png";
import instagramIcon from "@/app/assets/imgs/Instagram.png";
import twitterIcon from "@/app/assets/imgs/twitter.png";
import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { FooterSettings } from "@/app/lib/site-settings-api";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer({ settings }: { settings?: FooterSettings }) {
  const footerRef = useRef<HTMLElement>(null);
  const ctaSectionRef = useRef<HTMLElement>(null);
  const ctaHeadingRef = useRef<HTMLHeadingElement>(null);
  const ctaParagraphRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);
  const linksSectionRef = useRef<HTMLDivElement>(null);
  const linksColumnsRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const footerCtaHeading = settings?.ctaHeading?.trim() ?? "";
  const footerCtaParagraph = settings?.ctaParagraph?.trim() ?? "";
  const footerCtaButtonText = settings?.ctaButtonText?.trim() ?? "";
  const footerCtaButtonLink = settings?.ctaButtonLink?.trim() ?? "";
  const navigationLinks = settings?.navigationLinks ?? [];
  const serviceLinks = settings?.serviceLinks ?? [];
  const addressLines = settings?.addressLines ?? [];
  const footerPhone = settings?.phone?.trim() ?? "";
  const linkedinUrl = settings?.linkedinUrl?.trim() ?? "";
  const instagramUrl = settings?.instagramUrl?.trim() ?? "";
  const twitterUrl = settings?.twitterUrl?.trim() ?? "";
  const copyrightLineOne = settings?.copyrightLineOne?.trim() ?? "";
  const copyrightLineTwo = settings?.copyrightLineTwo?.trim() ?? "";
  const privacyLabel = settings?.privacyLabel?.trim() ?? "";
  const privacyLink = settings?.privacyLink?.trim() ?? "";
  const termsLabel = settings?.termsLabel?.trim() ?? "";
  const termsLink = settings?.termsLink?.trim() ?? "";

  const showFooterCta =
    !!(footerCtaHeading || footerCtaParagraph || (footerCtaButtonText && footerCtaButtonLink));
  const isHttp = (u: string) => /^https?:\/\//i.test(u.trim());

  useEffect(() => {
    if (!footerRef.current || !ctaSectionRef.current) return;
    const ctaSection = ctaSectionRef.current;
    const linksSection = linksSectionRef.current;

    // Kill existing ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => {
      if (
        trigger.trigger === ctaSection ||
        trigger.trigger === linksSection
      ) {
        trigger.kill();
      }
    });

    // CTA Section Animations
    const ctaHeading = ctaHeadingRef.current;
    const ctaParagraph = ctaParagraphRef.current;
    const ctaButton = ctaButtonRef.current;

    if (ctaHeading && ctaParagraph && ctaButton) {
      // Reset initial state
      gsap.set([ctaHeading, ctaParagraph, ctaButton], { opacity: 0, y: 50 });

      // Check if element is already in view
      const checkIfInView = () => {
        const rect = ctaSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        return rect.top < windowHeight * 0.8 && rect.bottom > 0;
      };

      // Create timeline for CTA section
      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: ctaSection,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            ctaTl.play();
          },
          onEnterBack: () => {
            ctaTl.play();
          },
        },
      });

      ctaTl
        .to(ctaHeading, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .to(ctaParagraph, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }, "+=0.2")
        .to(ctaButton, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }, "+=0.2");

      // If already in view, trigger animation immediately
      if (checkIfInView()) {
        setTimeout(() => {
          ctaTl.play();
        }, 100);
      }
    }

    // Footer Links Section Animations
    const linksColumns = linksColumnsRef.current;
    if (linksColumns && linksSection) {
      const columns = linksColumns.querySelectorAll('.footer-column');
      
      // Reset initial state
      gsap.set(columns, { opacity: 0, y: 60 });

      // Check if element is already in view
      const checkIfInView = () => {
        const rect = linksSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        return rect.top < windowHeight * 0.85 && rect.bottom > 0;
      };

      // Create timeline for links section
      const linksTl = gsap.timeline({
        scrollTrigger: {
          trigger: linksSection,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            linksTl.play();
          },
          onEnterBack: () => {
            linksTl.play();
          },
        },
      });

      linksTl.to(columns, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
      });

      // If already in view, trigger animation immediately
      if (checkIfInView()) {
        setTimeout(() => {
          linksTl.play();
        }, 100);
      }
    }

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    return () => {
      const triggers = ScrollTrigger.getAll();
      triggers.forEach((trigger) => {
        if (
          trigger.trigger === ctaSection ||
          trigger.trigger === linksSection
        ) {
          trigger.kill();
        }
      });
    };
  }, [pathname]);

  return (
    <footer ref={footerRef} className="relative bg-black text-white footer-responsive">
      {/* Call to Action Section */}
      <section
        ref={ctaSectionRef}
        className="relative overflow-hidden footer-section md:h-[1223px] h-[1023px] md:min-h-[1223px] min-h-[800px]"
        style={{
          width: '1920px',
          maxWidth: '100%',
          // height: '1223px',
          margin: '0 auto',
        }}
      >
        {/* Background Image - Vector */}
        <div
          className="absolute z-0 md:h-[1223px] h-[800px]"
        >
          <Image
            src={vectorBg}
            alt="Background"
            width={1364}
            height={1562}
            className="object-cover"
            priority
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>

        {/* Gradient Overlay on Vector */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/50" style={{ zIndex: 5 }}></div> */}

        {/* CTA Content */}
        <div className="relative md:top-[-150px] z-10 h-full flex flex-col items-center justify-center text-center px-4 footer-cta-content">
          {showFooterCta && (
            <>
              {footerCtaHeading ? (
                <h2 ref={ctaHeadingRef} className="text-[60px] md:text-[80px] font-[700] leading-[80px] text-white mb-4 footer-heading">
                  {footerCtaHeading}
                </h2>
              ) : null}
              {footerCtaParagraph ? (
                <p ref={ctaParagraphRef} className="text-[16px] md:text-[20px] text-white mb-8 max-w-2xl footer-paragraph">
                  {footerCtaParagraph}
                </p>
              ) : null}
              {footerCtaButtonText && footerCtaButtonLink ? (
                <div ref={ctaButtonRef}>
                  <CallToActionButton
                    variant="shiny"
                    onClick={() => router.push(footerCtaButtonLink)}
                  >
                    {footerCtaButtonText}
                  </CallToActionButton>
                </div>
              ) : null}
            </>
          )}
        </div>

        {/* Footer Links Section - Overlay on Vector */}
        <div ref={linksSectionRef} className="absolute bottom-0 left-0 right-0 z-20 bg-black/10 footer-links-section global-section-padding-footer pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-16 lg:pb-16 xl:pt-20 xl:pb-20 2xl:pt-22 2xl:pb-22">
          <div className="flex justify-center items-center mx-auto footer-links-container global-section-padding px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
            <div ref={linksColumnsRef} className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-10 xl:gap-12 2xl:gap-14 footer-links-grid w-full">
              {/* Navigation Links */}
              {navigationLinks.length > 0 ? (
                <div className="footer-column flex flex-col items-start">
                  <ul className="space-y-2 sm:space-y-2.5 md:space-y-3 lg:space-y-3.5 xl:space-y-4 font-graphik-light-weight-300">
                    {navigationLinks.map((item, index) => (
                      <li key={`${item.label}-${index}`}>
                        {item.href?.trim() ? (
                          <a
                            href={item.href.trim()}
                            className="text-white text-[10px] sm:text-[12px] md:text-[14px] lg:text-[18px] xl:text-[20px] 2xl:text-[25px] hover:text-[#0DFCC1] transition-colors footer-link"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <span className="text-white text-[10px] sm:text-[12px] md:text-[14px] lg:text-[18px] xl:text-[20px] 2xl:text-[25px] footer-link">
                            {item.label}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Service Categories */}
              {serviceLinks.length > 0 ? (
                <div className="footer-column flex flex-col items-start">
                  <ul className="space-y-2 sm:space-y-2.5 md:space-y-3 lg:space-y-3.5 xl:space-y-4 font-graphik-light-weight-300">
                    {serviceLinks.map((item, index) => (
                      <li key={`${item.label}-${index}`}>
                        {item.href?.trim() ? (
                          <a
                            href={item.href.trim()}
                            className="text-white text-[10px] sm:text-[12px] md:text-[14px] lg:text-[18px] xl:text-[20px] 2xl:text-[25px] hover:text-[#0DFCC1] transition-colors footer-link"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <span className="text-white text-[10px] sm:text-[12px] md:text-[14px] lg:text-[18px] xl:text-[20px] 2xl:text-[25px] footer-link">
                            {item.label}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Contact Information */}
              {(addressLines.length > 0 ||
                footerPhone ||
                isHttp(linkedinUrl) ||
                isHttp(instagramUrl) ||
                isHttp(twitterUrl)) ? (
              <div className="footer-column flex flex-col justify-center items-start md:items-start lg:items-start footer-contact-info mt-4 sm:mt-0">
                <ul className="font-graphik-light-weight-300 space-y-1.5 sm:space-y-2 md:space-y-2.5 lg:space-y-3">
                  {addressLines.map((line, index) => (
                    <li
                      key={`${line}-${index}`}
                      className={`text-white text-[10px] sm:text-[12px] md:text-[14px] lg:text-[18px] xl:text-[20px] 2xl:text-[25px] footer-text ${index === addressLines.length - 1 ? "mb-3 sm:mb-3.5 md:mb-4 lg:mb-4.5 xl:mb-5" : ""}`}
                    >
                      {line}
                    </li>
                  ))}
                  {footerPhone ? (
                    <li className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 text-white text-[10px] sm:text-[12px] md:text-[14px] lg:text-[18px] xl:text-[20px] 2xl:text-[25px] footer-text">
                      <Image
                        src={phoneIcon}
                        alt="Phone"
                        width={16.66}
                        height={16.66}
                        className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] md:w-[13px] md:h-[13px] lg:w-[15px] lg:h-[15px] xl:w-[17px] xl:h-[17px] 2xl:w-[20px] 2xl:h-[20px] footer-phone-icon"
                      />
                      {footerPhone}
                    </li>
                  ) : null}
                </ul>

                {/* Social Media Icons */}
                {(isHttp(linkedinUrl) || isHttp(instagramUrl) || isHttp(twitterUrl)) ? (
                  <div className="mt-4 sm:mt-5 md:mt-6 lg:mt-7 xl:mt-8">
                    <div className="flex justify-start items-start gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3">
                      {isHttp(linkedinUrl) ? (
                        <a
                          href={linkedinUrl}
                          className="w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] md:w-[32px] md:h-[32px] lg:w-[40px] lg:h-[40px] xl:w-[46px] xl:h-[46px] 2xl:w-[50px] 2xl:h-[50px] rounded-full border border-white flex items-center justify-center text-white hover:bg-[#0DFCC1] hover:border-[#0DFCC1] transition-colors footer-social-icon"
                          aria-label="LinkedIn"
                        >
                          <Image
                            src={linkedinIcon}
                            alt="LinkedIn"
                            width={17}
                            height={15}
                            className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] md:w-[11px] md:h-[11px] lg:w-[13px] lg:h-[13px] xl:w-[15px] xl:h-[15px] 2xl:w-[17px] 2xl:h-[15px] footer-social-icon-img"
                          />
                        </a>
                      ) : null}
                      {isHttp(instagramUrl) ? (
                        <a
                          href={instagramUrl}
                          className="w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] md:w-[32px] md:h-[32px] lg:w-[40px] lg:h-[40px] xl:w-[46px] xl:h-[46px] 2xl:w-[50px] 2xl:h-[50px] rounded-full border border-white flex items-center justify-center text-white hover:bg-[#0DFCC1] hover:border-[#0DFCC1] transition-colors footer-social-icon"
                          aria-label="Instagram"
                        >
                          <Image
                            src={instagramIcon}
                            alt="Instagram"
                            width={17}
                            height={15}
                            className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] md:w-[11px] md:h-[11px] lg:w-[13px] lg:h-[13px] xl:w-[15px] xl:h-[15px] 2xl:w-[17px] 2xl:h-[15px] footer-social-icon-img"
                          />
                        </a>
                      ) : null}
                      {isHttp(twitterUrl) ? (
                        <a
                          href={twitterUrl}
                          className="w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] md:w-[32px] md:h-[32px] lg:w-[40px] lg:h-[40px] xl:w-[46px] xl:h-[46px] 2xl:w-[50px] 2xl:h-[50px] rounded-full border border-white flex items-center justify-center text-white hover:bg-[#0DFCC1] hover:border-[#0DFCC1] transition-colors footer-social-icon"
                          aria-label="Twitter"
                        >
                          <Image
                            src={twitterIcon}
                            alt="Twitter"
                            width={17}
                            height={15}
                            className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] md:w-[11px] md:h-[11px] lg:w-[13px] lg:h-[13px] xl:w-[15px] xl:h-[15px] 2xl:w-[17px] 2xl:h-[15px] footer-social-icon-img"
                          />
                        </a>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
              ) : null}

              {/* Copyright and Legal */}
              {(copyrightLineOne ||
                copyrightLineTwo ||
                (privacyLabel && privacyLink) ||
                (termsLabel && termsLink)) ? (
                <div className="footer-column flex flex-col justify-start md:justify-start lg:justify-center items-start md:items-start lg:items-end footer-copyright mt-4 sm:mt-0">
                  <ul className="space-y-2 sm:space-y-2.5 md:space-y-3 lg:space-y-3.5 xl:space-y-4 font-graphik-light-weight-300">
                    {copyrightLineOne ? (
                      <li className="text-white text-[10px] sm:text-[12px] md:text-[14px] lg:text-[18px] xl:text-[20px] 2xl:text-[25px] footer-text">
                        {copyrightLineOne}
                      </li>
                    ) : null}
                    {copyrightLineTwo ? (
                      <li className="text-white text-[10px] sm:text-[12px] md:text-[14px] lg:text-[18px] xl:text-[20px] 2xl:text-[25px] footer-text">
                        {copyrightLineTwo}
                      </li>
                    ) : null}
                    {privacyLabel && privacyLink ? (
                      <li>
                        <a href={privacyLink} className="text-white text-[10px] sm:text-[12px] md:text-[14px] lg:text-[18px] xl:text-[20px] 2xl:text-[25px] hover:text-[#0DFCC1] transition-colors footer-link">
                          {privacyLabel}
                        </a>
                      </li>
                    ) : null}
                    {termsLabel && termsLink ? (
                      <li>
                        <a href={termsLink} className="text-white text-[10px] sm:text-[12px] md:text-[14px] lg:text-[18px] xl:text-[20px] 2xl:text-[25px] hover:text-[#0DFCC1] transition-colors footer-link">
                          {termsLabel}
                        </a>
                      </li>
                    ) : null}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
