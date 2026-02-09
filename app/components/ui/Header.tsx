"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CallToActionButton from "./CallToActionButton";
import flutterApp1Banner1 from "@/app/assets/imgs/flutter_app_1_banner_1.png";
import OfficeLocations from "../sections/OfficeLocations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MenuItem {
  label: string;
  href: string;
  submenu?: { label: string; href: string }[];
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeButtonRef, setActiveButtonRef] = useState<React.RefObject<HTMLButtonElement> | null>(null);
  const [activeButtonType, setActiveButtonType] = useState<'header' | 'center' | null>(null);
  const [hoveredServiceIndex, setHoveredServiceIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuInnerRef = useRef<HTMLDivElement>(null);
  const centerButtonRef = useRef<HTMLButtonElement>(null);
  const centerButtonIconRef = useRef<HTMLDivElement>(null);
  const centerButtonTextRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

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
        });
    }

    /* -------- CLOSE (REVERSE) -------- */
    if (isClosing) {
      document.body.style.overflow = "";

      gsap.timeline({
        onComplete: () => {
          setIsClosing(false);
          setIsMenuOpen(false);
          if (menuRef.current) menuRef.current.style.display = "none";
        },
      })
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
        .to(overlay, { opacity: 0, duration: 0.25 });
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
    const gap = 8; // gap-2
    const textWidth = 0; // text not visible yet
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

  const toggleMenu = (
    buttonRef?: React.RefObject<HTMLButtonElement | null>,
    buttonType?: "header" | "center"
  ) => {
    if (isMenuOpen) {
      setIsClosing(true);
    } else {
      if (buttonRef?.current) setActiveButtonRef(buttonRef as React.RefObject<HTMLButtonElement>);
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

  const menuItems: MenuItem[] = [
    { label: "Home", href: "/" },
    { 
      label: "Services", 
      href: "#",
      submenu: [
        { label: "Digital experience studio", href: "/digital-experience-studio" },
        { label: "Application Development Studio", href: "/application-development-studio" },
        { label: "Growth Branding Studio", href: "/growth-branding-studio" },
      ]
    },
    { label: "About Us", href: "#" },
    { label: "Our Work", href: "/our-work" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  return (
    <>
      <header ref={headerRef} className={`fixed top-4 left-0 right-0 bg-transparent transition-all ${isMenuOpen ? 'z-[55]' : 'z-30'}`}>
        <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex h-[48px] sm:h-[56px] md:h-[64px] lg:h-[72px] xl:h-[80px] 2xl:h-[88px] items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className={`relative w-auto transition-all ${isMenuOpen ? 'h-[32px] sm:h-[36px] md:h-[40px] lg:h-[48px]' : 'h-[32px] sm:h-[40px] md:h-[56px] lg:h-[64px] xl:h-[72px] 2xl:h-[80px]'}`}>
                <Image
                  src="/imgs/cwit_logo_1.png"
                  alt="CWIT Logo"
                  width={100}
                  height={100}
                  className={`w-auto h-auto object-contain transition-all ${isMenuOpen ? 'h-[32px] sm:h-[36px] md:h-[40px] lg:h-[48px] min-w-[72px] sm:min-w-[81px] md:min-w-[90px] lg:min-w-[108px]' : 'h-[32px] sm:h-[40px] md:h-[56px] lg:h-[64px] xl:h-[72px] 2xl:h-[80px] min-w-[72px] sm:min-w-[90px] md:min-w-[110px] lg:min-w-[127px] xl:min-w-[140px] 2xl:min-w-[160px]'}`}
                  priority
                />
              </a>
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
                    router.push('/contact-us');
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={() => {
          setActiveButtonRef(null);
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
        className={`fixed inset-0 z-50 flex items-center justify-center ${isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        style={{ display: isMenuOpen ? "flex" : "none" }}
      >
        <div
          ref={menuContentRef}
          className="bg-[#2C2C2C] shadow-2xl m-2 md:m-2 lg:m-2 w-[calc(100%-1rem)] md:w-[calc(100%-1rem)] lg:w-[calc(100%-1rem)] h-[calc(100vh-1rem)] md:h-[calc(100vh-1rem)] lg:h-[calc(100vh-1rem)] rounded-[30px] overflow-y-auto"
        >
          <div ref={menuInnerRef} className="flex flex-col lg:flex-row h-full gap-4 md:gap-6 lg:gap-8">
            {/* Menu Items - Left Side */}
            <nav className="flex-1 flex flex-col justify-between py-6 px-4 sm:py-8 sm:px-6 md:py-12 md:px-8 lg:py-40 lg:px-16 w-full min-w-0">
              <ul className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                {menuItems.map((item, index) => {
                  const active = isActive(item.href);
                  const hasSubmenu = item.submenu && item.submenu.length > 0;
                  const isHovered = hoveredServiceIndex === index;
                  
                  return (
                    <li 
                      key={index}
                      className="relative"
                      onMouseEnter={() => hasSubmenu && setHoveredServiceIndex(index)}
                      onMouseLeave={() => hasSubmenu && setHoveredServiceIndex(null)}
                    >
                      {item.href.startsWith("/") ? (
                        <Link
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveButtonRef(null);
                            setActiveButtonType(null);
                            setIsClosing(true);
                            // Wait for animation to complete before navigating
                            setTimeout(() => {
                              router.push(item.href);
                            }, 900); // Match animation duration
                          }}
                          className={`menu-item block text-[16px] sm:text-[20px] md:text-[32px] lg:text-[40px] xl:text-[46px] 2xl:text-[52px] font-light transition-colors hover:text-[#0DFCC1] hover:cursor-pointer ${active ? "text-[#0DFCC1]" : "text-[#ffffff]"
                            }`}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          onClick={(e) => !hasSubmenu && handleLinkClick(e, item.href)}
                          className={`menu-item block text-[16px] sm:text-[20px] md:text-[32px] lg:text-[40px] xl:text-[46px] 2xl:text-[52px] font-light text-[#ffffff] transition-colors hover:text-[#0DFCC1] hover:cursor-pointer ${hasSubmenu ? 'cursor-default' : ''}`}
                        >
                          {item.label}
                        </a>
                      )}
                      
                      {/* Dropdown Menu */}
                      {hasSubmenu && (
                        <div
                          className={`absolute top-0 left-[300px] min-w-[200px] sm:min-w-[250px] md:min-w-[300px] lg:min-w-[350px] xl:min-w-[400px] 2xl:min-w-[450px] bg-[#2C2C2C] rounded-[15px] p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-9 shadow-2xl transition-all duration-300 ease-in-out ${
                            isHovered
                              ? "opacity-100 z-50 visible translate-x-0"
                              : "opacity-0 invisible translate-x-[-10px] pointer-events-none"
                          }`}
                        >
                          <ul className="space-y-2 sm:space-y-3 md:space-y-4">
                            {item.submenu?.map((subItem, subIndex) => {
                              const subActive = isActive(subItem.href);
                              return (
                                <li key={subIndex}>
                                  <Link
                                    href={subItem.href}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setActiveButtonRef(null);
                                      setActiveButtonType(null);
                                      setIsClosing(true);
                                      // Wait for animation to complete before navigating
                                      setTimeout(() => {
                                        router.push(subItem.href);
                                      }, 900); // Match animation duration
                                    }}
                                    className={`block text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px] font-light text-[#ffffff] transition-colors hover:text-[#0DFCC1] ${
                                      subActive ? "text-[#0DFCC1] hover:cursor-pointer" : ""
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
              <div className="mt-8 md:mt-12">
                <CallToActionButton
                  variant="shiny"
                  size="small"
                  onClick={() => {
                    setActiveButtonRef(null);
                    setActiveButtonType(null);
                    setIsClosing(true);
                    // Wait for animation to complete before navigating
                    setTimeout(() => {
                      router.push('/contact-us');
                    }, 900); // Match animation duration
                  }}
                />
              </div>
            </nav>

            {/* Image - Right Side */}
            <div className="block lg:block w-full lg:w-[40%] xl:w-[45%] h-[200px] sm:h-[250px] md:h-[300px] lg:h-full p-2 sm:p-3 md:p-4 lg:p-4 flex-shrink-0">
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
              <OfficeLocations />
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Button - Center Bottom (Same position as WhatsApp) */}
      <button
        ref={centerButtonRef}
        onClick={() => toggleMenu(centerButtonRef, 'center')}
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

