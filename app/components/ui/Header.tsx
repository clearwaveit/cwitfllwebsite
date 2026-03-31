"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CallToActionButton from "./CallToActionButton";
import OfficeLocations from "../sections/OfficeLocations";
import type { HeaderMenuItem, HeaderSettings } from "@/app/lib/site-settings-api";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Header({ settings }: { settings?: HeaderSettings }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeButtonType, setActiveButtonType] = useState<"header" | "center" | null>(null);
  const [hoveredServiceIndex, setHoveredServiceIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuInnerRef = useRef<HTMLDivElement>(null);
  const centerButtonRef = useRef<HTMLButtonElement>(null);
  const centerButtonIconRef = useRef<HTMLDivElement>(null);
  const centerButtonTextRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const submenuItemsRef = useRef<{ [key: number]: (HTMLLIElement | null)[] }>({});
  const ctaButtonRef = useRef<HTMLDivElement>(null);
  const officeLocationsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const menuItems: HeaderMenuItem[] = settings?.menuItems?.length
    ? settings.menuItems
    : [
        { label: "Home", href: "/" },
        {
          label: "Services",
          href: "#",
          submenu: [
            { label: "Digital experience studio", href: "/digital-experience-studio" },
            { label: "Application Development Studio", href: "/application-development-studio" },
            { label: "Growth Branding Studio", href: "/growth-branding-studio" },
          ],
        },
        { label: "About Us", href: "#" },
        { label: "Our Work", href: "/our-work" },
        { label: "Blogs", href: "/blogs" },
        { label: "Contact Us", href: "/contact-us" },
      ];
  const logoSrc = settings?.logoSrc?.trim() || "/imgs/cwit_logo.svg";
  const logoAlt = settings?.logoAlt?.trim() || "CWIT Logo";
  const headerCtaText = settings?.ctaText?.trim() || "Let's Talk";
  const headerCtaLink = settings?.ctaLink?.trim() || "/contact-us";
  const officeLocations = settings?.officeLocations;

  function animateMenuContent() {
    const renderedMenuItems = menuItemsRef.current.filter(Boolean);
    if (renderedMenuItems.length > 0) {
      gsap.set(renderedMenuItems, { opacity: 0, y: 50, scale: 0.95 });
      gsap.to(renderedMenuItems, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      });
    }

    if (ctaButtonRef.current) {
      gsap.set(ctaButtonRef.current, { opacity: 0, y: 30 });
      gsap.to(ctaButtonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: renderedMenuItems.length * 0.15 + 0.2,
      });
    }

    if (officeLocationsRef.current) {
      gsap.set(officeLocationsRef.current, { opacity: 0, x: 50 });
      gsap.to(officeLocationsRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      });
    }
  }

  /* ================= HEADER SHOW / HIDE ================= */
  useEffect(() => {
    if (!headerRef.current) return;

    let lastScrollY = 0;
    const header = headerRef.current;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      gsap.to(header, {
        y: currentScrollY > lastScrollY && currentScrollY > 100 ? -100 : 0,
        opacity: currentScrollY > lastScrollY && currentScrollY > 100 ? 0 : 1,
        duration: 0.3,
      });
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= MENU ANIMATION ================= */
  useEffect(() => {
    if (
      !menuRef.current ||
      !menuContentRef.current ||
      !menuInnerRef.current ||
      !overlayRef.current ||
      !centerButtonRef.current
    )
      return;

    const button = centerButtonRef.current;
    const menu = menuContentRef.current;
    const inner = menuInnerRef.current;
    const overlay = overlayRef.current;
    const btn = button.getBoundingClientRect();

    /* -------- OPEN -------- */
    if (isMenuOpen && !isClosing) {
      menuRef.current.style.display = "flex";
      document.body.style.overflow = "hidden";

      gsap.set(inner, { opacity: 0 });
      gsap.set(overlay, { opacity: 0 });

      gsap.set(menu, {
        width: btn.width,
        height: btn.height,
        x: btn.left + btn.width / 2 - window.innerWidth / 2,
        y: btn.top + btn.height / 2 - window.innerHeight / 2,
        borderRadius: 999,
        overflow: "hidden",
      });

      gsap.timeline()
        .to(overlay, { opacity: 1, duration: 0.25 })
        .to(
          menu,
          {
            width: window.innerWidth - 16,
            height: window.innerHeight - 16,
            x: 0,
            y: 0,
            borderRadius: 30,
            duration: 0.65,
            ease: "power3.out",
          },
          "<"
        )
        .to(inner, {
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
          onComplete: () => {
            // Animate menu items after menu opens
            animateMenuContent();
          },
        });
    }

    /* -------- CLOSE (REVERSE) -------- */
    if (isClosing) {
      document.body.style.overflow = "";

      // Animate menu content out (reverse of entrance)
      const menuItems = menuItemsRef.current.filter(Boolean);
      const closeTimeline = gsap.timeline();

      // Animate menu items out (reverse stagger - last to first)
      if (menuItems.length > 0) {
        closeTimeline.to(menuItems.reverse(), {
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 0.6,
          ease: "power3.in",
          stagger: 0.1,
        });
      }

      // Animate CTA button out
      if (ctaButtonRef.current) {
        closeTimeline.to(
          ctaButtonRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power2.in",
          },
          "-=0.3"
        );
      }

      // Animate OfficeLocations out
      if (officeLocationsRef.current) {
        closeTimeline.to(
          officeLocationsRef.current,
          {
            opacity: 0,
            x: 50,
            duration: 0.6,
            ease: "power3.in",
          },
          "-=0.4"
        );
      }

      // Then close the menu container
      closeTimeline
        .to(inner, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        })
        .to(
          menu,
          {
            width: btn.width,
            height: btn.height,
            x: btn.left + btn.width / 2 - window.innerWidth / 2,
            y: btn.top + btn.height / 2 - window.innerHeight / 2,
            borderRadius: 999,
            duration: 0.65,
            ease: "power3.in",
          },
          "<"
        )
        .to(overlay, { opacity: 0, duration: 0.25 })
        .eventCallback("onComplete", () => {
          setIsClosing(false);
          setIsMenuOpen(false);
          if (menuRef.current) menuRef.current.style.display = "none";
          // Reset menu items array order
          menuItemsRef.current.reverse();
        });
    }
  }, [isMenuOpen, isClosing]);

  // Center button entrance animation on page load/route change
  useEffect(() => {
    if (!centerButtonRef.current || !centerButtonIconRef.current || !centerButtonTextRef.current) return;

    const button = centerButtonRef.current;
    const icon = centerButtonIconRef.current;
    const text = centerButtonTextRef.current;

    // Get hamburger icon actual size
    const iconRect = icon.getBoundingClientRect();
    const iconSize = Math.max(iconRect.width, iconRect.height) || (window.innerWidth >= 768 ? (window.innerWidth >= 1024 ? 40 : 36) : 32);

    // Reset initial states - background starts with exact padding
    gsap.set(icon, {
      opacity: 0,
      x: 0,
      y: 0,
      transformOrigin: "center center"
    });
    gsap.set(text, { opacity: 0 });

    // Calculate initial width with exact padding
    const paddingLeft = 16; // 1rem = ps-4
    const paddingRight = 10; // 0.625rem = pe-2.5
    const paddingTop = 4; // 0.25rem = py-1
    const paddingBottom = 4; // 0.25rem = py-1
    const initialWidth = iconSize + paddingLeft + paddingRight;
    const initialHeight = iconSize + paddingTop + paddingBottom;

    // Set button with exact padding from start
    gsap.set(button, {
      width: `${initialWidth}px`,
      height: `${initialHeight}px`,
      paddingLeft: `${paddingLeft}px`,
      paddingRight: `${paddingRight}px`,
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      minWidth: `${initialWidth}px`,
      minHeight: `${initialHeight}px`,
      opacity: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    });

    // Create timeline for sequential animation
    const tl = gsap.timeline({ delay: 0.3 });

    // Step 1: Fade in white background first (with exact padding)
    tl.to(button, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    });

    // Step 2: Fade in hamburger icon with black background (centered in white background)
    tl.to(icon, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.2");

    // Step 3: Expand white background smoothly to full size (width expands for text)
    // Icon stays in exact same position, only width expands for text
    tl.to(button, {
      width: "auto",
      minWidth: "auto",
      duration: 0.8,
      ease: "power2.out",
      onUpdate: () => {
        // Keep icon centered during expansion
        gsap.set(icon, { x: 0, y: 0 });
      }
    });

    // Step 3: Fade in menu text smoothly
    tl.to(text, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  const toggleMenu = (buttonType?: "header" | "center") => {
    if (isMenuOpen) {
      setIsClosing(true);
    } else {
      if (buttonType) setActiveButtonType(buttonType);
      setIsMenuOpen(true);
    }
  };


  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Start closing animation
    setIsClosing(true);

    if (href.startsWith("#")) {
      // Wait for animation to complete before scrolling
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 900); // Match animation duration
    } else if (href.startsWith("/")) {
      // Wait for animation to complete before navigating
      setTimeout(() => {
        router.push(href);
      }, 900); // Match animation duration
    }
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header ref={headerRef} className={`fixed top-4 left-0 right-0 bg-transparent transition-all ${isMenuOpen ? 'z-[55]' : 'z-30'}`}>
        <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="relative h-12 w-auto">
                <Image
                  src={logoSrc}
                  alt={logoAlt}
                  width={100}
                  height={100}
                  className="h-[32px] md:h-[56px] min-w-[74px] md:min-w-[112px] w-auto object-contain"
                  priority
                  unoptimized={typeof logoSrc === "string" && logoSrc.startsWith("http")}
                />
              </Link>
            </div>

            {/* Right side - Menu Button */}
            <div className="flex items-center gap-4">
              {/* Menu Button - Styled like screenshot - TEMPORARILY COMMENTED OUT */}
              {/*
              <button
                ref={menuButtonRef}
                onClick={() => toggleMenu(menuButtonRef, 'header')}
                data-menu-open={isMenuOpen}
                className={`relative flex justify-center items-center gap-2 rounded-full bg-[#F5F5DC] hover:bg-[#E8E8D0] transition-all duration-300 group menu-toggle-btn hover:cursor-pointer ${isMenuOpen && activeButtonType === 'header'
                    ? 'ps-3 pe-2 py-0.5 gap-1.5'
                    : 'ps-4 pe-2.5 py-1 gap-2'
                  } ${isMenuOpen && activeButtonType === 'center' ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
                aria-label="Toggle menu"
              >
                <div className="relative h-[20px] overflow-hidden">
                  <div
                    className="menu-text-container flex flex-col transition-transform duration-300 ease-in-out"
                    style={{
                      transform: isMenuOpen ? 'translateY(-100%)' : 'translateY(0)',
                      opacity: isMenuOpen ? 0 : 1
                    }}
                  >
                    <span className="text-[14px] sm:text-[15px] md:text-[16px] font-medium text-[#2C2C2C] h-[20px] flex items-center whitespace-nowrap">
                      Menu
                    </span>
                    <span className="text-[14px] sm:text-[15px] md:text-[16px] font-medium text-[#2C2C2C] h-[20px] flex items-center whitespace-nowrap">
                      Menu
                    </span>
                  </div>
                  <div
                    className="close-text-container absolute top-0 left-0 w-full flex flex-col transition-all duration-300 ease-in-out"
                    style={{
                      transform: isMenuOpen ? 'translateY(0)' : 'translateY(100%)',
                      opacity: isMenuOpen ? 1 : 0
                    }}
                  >
                    <span className="text-[14px] sm:text-[15px] md:text-[16px] font-medium text-[#2C2C2C] h-[20px] flex items-center whitespace-nowrap">
                      Close
                    </span>
                  </div>
                </div>

                <div className={`relative rounded-full bg-[#2C2C2C] flex items-center justify-center overflow-hidden transition-all duration-300 ${isMenuOpen
                    ? 'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8'
                    : 'w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10'
                  }`}>
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out hamburger-icon"
                    style={{
                      opacity: isMenuOpen ? 0 : 1,
                      transform: isMenuOpen ? 'rotate(90deg) scale(0)' : 'rotate(0deg) scale(1)'
                    }}
                  >
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={isMenuOpen ? 'w-3 h-3' : 'w-4 h-3'}>
                      <rect width="16" height="1.5" fill="#9A9A9A" />
                      <rect y="5.25" width="16" height="1.5" fill="#9A9A9A" />
                      <rect y="10.5" width="16" height="1.5" fill="#9A9A9A" />
                    </svg>
                  </div>
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out close-icon"
                    style={{
                      opacity: isMenuOpen ? 1 : 0,
                      transform: isMenuOpen ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0)'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={isMenuOpen ? 'w-3 h-3' : 'w-4 h-4'}>
                      <path d="M12 4L4 12M4 4L12 12" stroke="#9A9A9A" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </button>
              */}

              {/* CallToActionButton - Right side */}
              {!isMenuOpen && (
                <CallToActionButton
                  variant="shiny"
                  size="small"
                  onClick={() => {
                    router.push(headerCtaLink);
                  }}
                  className="inline-flex md:hidden"
                >
                  {headerCtaText}
                </CallToActionButton>
              )}
              {!isMenuOpen && (
                <CallToActionButton
                  variant="shiny"
                  onClick={() => {
                    router.push(headerCtaLink);
                  }}
                  className="hidden md:inline-flex"
                >
                  {headerCtaText}
                </CallToActionButton>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={() => {
          setActiveButtonType(null);
          setIsClosing(true);
        }}
        className={`fixed inset-0 z-[45] bg-black/50 ${isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        style={{ opacity: 0 }}
      />

      {/* Side Menu - Modal Style */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto ${isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        style={{ display: isMenuOpen ? "flex" : "none" }}
      >
        <div
          ref={menuContentRef}
          className="bg-[#2C2C2C] shadow-2xl m-2 md:m-2 lg:m-2 w-[calc(100%-1rem)] md:w-[calc(100%-1rem)] lg:w-[calc(100%-1rem)] h-[calc(100vh-1rem)] md:h-[calc(100vh-1rem)] lg:h-[calc(100vh-1rem)] rounded-[30px] overflow-y-auto relative"
        >
          {/* Gradient overlay - 100% width, from bottom 0% to top 0%, bottom to top */}
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[#0DFCC1]/15 via-[#0DFCC1]/7 to-transparent pointer-events-none z-10" />
          <div ref={menuInnerRef} className="flex flex-col lg:flex-row h-full gap-4 md:gap-6 lg:gap-8 overflow-hidden">
            {/* Menu Items - Left Side */}
            <nav className="flex-1 flex flex-col justify-center py-6 px-4 sm:py-8 sm:px-6 md:py-12 md:px-8 lg:py-40 lg:px-16 w-full min-w-0 overflow-y-auto">
              <ul className="flex flex-col items-center sm:flex-col sm:items-center md:flex-col md:items-center lg:items-start space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                {menuItems.map((item, index) => {
                  const active = isActive(item.href);
                  const hasSubmenu = item.submenu && item.submenu.length > 0;
                  const isHovered = hoveredServiceIndex === index;
                  
                  return (
                    <li 
                      key={index}
                      ref={(el) => { menuItemsRef.current[index] = el; }}
                      className="relative"
                      onMouseEnter={() => {
                        if (hasSubmenu) {
                          setHoveredServiceIndex(index);
                          // Animate submenu background and items in
                          setTimeout(() => {
                            const submenuContainer = document.querySelector(`[data-submenu-index="${index}"]`);
                            const subItems = submenuItemsRef.current[index]?.filter(Boolean);
                            if (submenuContainer && subItems && subItems.length > 0) {
                              // Animate submenu container
                              gsap.fromTo(
                                submenuContainer,
                                { opacity: 0, x: -10 },
                                {
                                  opacity: 1,
                                  x: 0,
                                  duration: 0.3,
                                  ease: "power2.out",
                                }
                              );
                              // Animate submenu items
                              gsap.fromTo(
                                subItems,
                                { opacity: 0, y: 20, x: -10 },
                                {
                                  opacity: 1,
                                  y: 0,
                                  x: 0,
                                  duration: 0.6,
                                  ease: "power2.out",
                                  stagger: 0.1,
                                  delay: 0.1,
                                }
                              );
                            }
                          }, 10);
                        }
                      }}
                      onMouseLeave={() => {
                        if (hasSubmenu) {
                          setHoveredServiceIndex(null);
                          // Animate submenu items out
                          const subItems = submenuItemsRef.current[index]?.filter(Boolean);
                          if (subItems && subItems.length > 0) {
                            gsap.to(subItems, {
                              opacity: 0,
                              y: 20,
                              x: -10,
                              duration: 0.4,
                              ease: "power2.in",
                              stagger: 0.05,
                            });
                          }
                        }
                      }}
                    >
                      {item.href.startsWith("/") ? (
                        <Link
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveButtonType(null);
                            setIsClosing(true);
                            // Wait for animation to complete before navigating
                            setTimeout(() => {
                              router.push(item.href);
                            }, 900); // Match animation duration
                          }}
                          className={`menu-item block text-[16px] sm:text-[20px] md:text-[24px] lg:text-[32px] xl:text-[40px] 2xl:text-[46px] leading-[20px] sm:leading-[24px] md:leading-[28px] lg:leading-[38px] xl:leading-[48px] 2xl:leading-[56px] font-light transition-colors hover:text-[#0DFCC1] hover:cursor-pointer ${active ? "text-[#0DFCC1]" : "text-[#ffffff]"
                            }`}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          onClick={(e) => !hasSubmenu && handleLinkClick(e, item.href)}
                          className={`menu-item block text-[16px] sm:text-[20px] md:text-[24px] lg:text-[32px] xl:text-[40px] 2xl:text-[46px] leading-[20px] sm:leading-[24px] md:leading-[28px] lg:leading-[38px] xl:leading-[48px] 2xl:leading-[56px] font-light text-[#ffffff] transition-colors hover:text-[#0DFCC1] hover:cursor-pointer ${hasSubmenu ? 'cursor-default' : ''}`}
                        >
                          {item.label}
                        </a>
                      )}
                      
                      {/* Dropdown Menu */}
                      {hasSubmenu && (
                        <div
                          data-submenu-index={index}
                          onMouseEnter={() => setHoveredServiceIndex(index)}
                          onMouseLeave={() => setHoveredServiceIndex(null)}
                          className={`absolute top-[10px] left-[156px] min-w-[200px] sm:min-w-[250px] md:min-w-[300px] lg:min-w-[350px] xl:min-w-[400px] 2xl:min-w-[430px] bg-[#2C2C2C] rounded-[15px] p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-20 shadow-2xl ${
                            isHovered
                              ? "z-50 visible"
                              : "invisible pointer-events-none"
                          }`}
                          style={{
                            opacity: isHovered ? 1 : 0,
                            transform: isHovered ? 'translateX(0)' : 'translateX(-10px)',
                          }}
                        >
                          <ul className="space-y-2 sm:space-y-3 md:space-y-4">
                            {item.submenu?.map((subItem, subIndex) => {
                              const subActive = isActive(subItem.href);
                              return (
                                <li 
                                  key={subIndex}
                                  ref={(el) => {
                                    if (!submenuItemsRef.current[index]) {
                                      submenuItemsRef.current[index] = [];
                                    }
                                    submenuItemsRef.current[index][subIndex] = el;
                                  }}
                                >
                                  <Link
                                    href={subItem.href}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setActiveButtonType(null);
                                      setIsClosing(true);
                                      // Wait for animation to complete before navigating
                                      setTimeout(() => {
                                        router.push(subItem.href);
                                      }, 900); // Match animation duration
                                    }}
                                    className={`block text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[22px] 2xl:text-[26px] leading-[18px] sm:leading-[20px] md:leading-[22px] lg:leading-[26px] xl:leading-[32px] 2xl:leading-[36px] font-light transition-colors hover:text-[#0DFCC1] hover:cursor-pointer ${
                                      subActive ? "text-[#0DFCC1]" : "text-[#ffffff]"
                                    }`}
                                  >
                                    {subItem.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* CallToActionButton below menu items */}
              <div ref={ctaButtonRef} className="mt-8 md:mt-12 flex items-center justify-center sm:items-center justify-center md:justify-center lg:justify-start">
                <CallToActionButton
                  variant="shiny"
                  size="small"
                  onClick={() => {
                    setActiveButtonType(null);
                    setIsClosing(true);
                    // Wait for animation to complete before navigating
                    setTimeout(() => {
                      router.push(headerCtaLink);
                    }, 900); // Match animation duration
                  }}
                >
                  {headerCtaText}
                </CallToActionButton>
              </div>
            </nav>

            {/* Image - Right Side */}
            <div ref={officeLocationsRef} className="flex-1 flex flex-col justify-center py-6 px-4 sm:py-8 sm:px-6 md:py-12 md:px-8 lg:py-40 lg:px-16 w-full min-w-0 overflow-y-auto">
              {/* <div className="relative w-full h-full rounded-[30px] overflow-hidden">
                <Image
                  src={flutterApp1Banner1}
                  alt="cap2"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover rounded-[20px]"
                  priority
                  unoptimized
                />
              </div> */}
              <OfficeLocations offices={officeLocations} />
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Button - Center Bottom (Same position as WhatsApp) */}
      <button
        ref={centerButtonRef}
        onClick={() => toggleMenu("center")}
        data-menu-open={isMenuOpen}
        className={`fixed left-1/2 -translate-x-1/2 flex justify-center items-center gap-2 rounded-full bg-[#FFFFFF] hover:bg-[#ffffff] group menu-toggle-btn hover:cursor-pointer ${isMenuOpen && activeButtonType === 'center'
          ? 'ps-3 pe-2 py-0.5 gap-1.5 z-[55]'
          : 'ps-4 pe-2.5 py-1 gap-2 z-30'
          } ${isMenuOpen && activeButtonType === 'header' ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'} bottom-[70px] md:bottom-[70px]`}
        aria-label="Toggle menu"
      >
        {/* Text Container with Slide Animation */}
        <div ref={centerButtonTextRef} className="relative h-[20px] overflow-hidden">
          {/* Menu Text - Slides up on hover when closed */}
          <div
            className="menu-text-container flex flex-col transition-transform duration-300 ease-in-out"
            style={{
              transform: isMenuOpen ? 'translateY(-100%)' : 'translateY(0)',
              opacity: isMenuOpen ? 0 : 1
            }}
          >
            <span className="text-[14px] sm:text-[15px] md:text-[16px] font-medium text-[#2C2C2C] h-[20px] flex items-center whitespace-nowrap">
              Menu
            </span>
            <span className="text-[14px] sm:text-[15px] md:text-[16px] font-medium text-[#2C2C2C] h-[20px] flex items-center whitespace-nowrap">
              Menu
            </span>
          </div>
          {/* Close Text - Slides in when menu is open */}
          <div
            className="close-text-container absolute top-0 left-0 w-full flex flex-col transition-all duration-300 ease-in-out"
            style={{
              transform: isMenuOpen ? 'translateY(0)' : 'translateY(100%)',
              opacity: isMenuOpen ? 1 : 0
            }}
          >
            <span className="text-[14px] sm:text-[15px] md:text-[16px] font-medium text-[#2C2C2C] h-[20px] flex items-center whitespace-nowrap">
              Close
            </span>
          </div>
        </div>

        {/* Icon Container with Smooth Transition */}
        <div
          ref={centerButtonIconRef}
          className={`relative rounded-full bg-[#2C2C2C] flex items-center justify-center overflow-hidden flex-shrink-0 ${isMenuOpen
            ? 'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8'
            : 'w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10'
            }`}
        >
          {/* Hamburger Icon */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out hamburger-icon"
            style={{
              opacity: isMenuOpen ? 0 : 1,
              transform: isMenuOpen ? 'rotate(90deg) scale(0)' : 'rotate(0deg) scale(1)'
            }}
          >
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={isMenuOpen ? 'w-3 h-3' : 'w-4 h-3'}>
              <rect width="16" height="1.5" fill="#9A9A9A" />
              <rect y="5.25" width="16" height="1.5" fill="#9A9A9A" />
              <rect y="10.5" width="16" height="1.5" fill="#9A9A9A" />
            </svg>
          </div>
          {/* Close Icon */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out close-icon"
            style={{
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0)'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={isMenuOpen ? 'w-3 h-3' : 'w-4 h-4'}>
              <path d="M12 4L4 12M4 4L12 12" stroke="#9A9A9A" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </button>
    </>
  );
}

