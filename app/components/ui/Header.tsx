"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CallToActionButton from "./CallToActionButton";
import cap2Image from "@/app/assets/imgs/cap2.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Header hide/show on scroll
  useEffect(() => {
    if (!headerRef.current) return;

    let lastScrollY = 0;
    const header = headerRef.current;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide header
        gsap.to(header, {
          y: -100,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        // Scrolling up - show header
        gsap.to(header, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Animate menu open/close
  useEffect(() => {
    if (!menuRef.current || !menuContentRef.current || !overlayRef.current) return;

    if (isMenuOpen) {
      // Set display first
      if (menuRef.current) {
        menuRef.current.style.display = "block";
      }

      // Get menu button position
      const button = menuButtonRef.current;
      if (button) {
        const buttonRect = button.getBoundingClientRect();
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;

        // Set initial position and size
        gsap.set(menuContentRef.current, {
          x: buttonCenterX - window.innerWidth / 2,
          y: buttonCenterY - window.innerHeight / 2,
          scale: 0,
          opacity: 0,
          transformOrigin: "center center",
        });

        // Animate to full size
        gsap.to(menuContentRef.current, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        // Fallback animation if button not found
        gsap.fromTo(
          menuContentRef.current,
          {
            opacity: 0,
            scale: 0.95,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          }
        );
      }

      gsap.fromTo(
        overlayRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.3,
          ease: "power1.out",
        }
      );

      // Animate menu items
      const menuItems = menuRef.current.querySelectorAll(".menu-item");
      if (menuItems.length > 0) {
        gsap.fromTo(
          menuItems,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.2,
          }
        );
      }
    } else {
      // Get menu button position for close animation
      const button = menuButtonRef.current;
      if (button && menuContentRef.current) {
        const buttonRect = button.getBoundingClientRect();
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;

        // Animate back to button position - smooth close (reverse of open)
        gsap.to(menuContentRef.current, {
          x: buttonCenterX - window.innerWidth / 2,
          y: buttonCenterY - window.innerHeight / 2,
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            if (menuRef.current) {
              menuRef.current.style.display = "none";
            }
          }
        });
      } else {
        // Fallback close animation - smooth close (reverse of open)
        gsap.to(menuContentRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            if (menuRef.current) {
              menuRef.current.style.display = "none";
            }
          }
        });
      }

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power1.in",
      });
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (href.startsWith("/")) {
      router.push(href);
    }
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Service", href: "#" },
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
              <a href="/" className={`relative w-auto transition-all ${isMenuOpen ? 'h-[24px] sm:h-[28px] md:h-[32px]' : 'h-[32px] sm:h-[40px] md:h-[56px] lg:h-[64px] xl:h-[72px] 2xl:h-[80px]'}`}>
                <Image
                  src="/imgs/cwit_logo_1.png"
                  alt="CWIT Logo"
                  width={100}
                  height={100}
                  className={`w-auto h-auto object-contain transition-all ${isMenuOpen ? 'h-[24px] sm:h-[28px] md:h-[32px] min-w-[54px] sm:min-w-[63px] md:min-w-[72px]' : 'h-[32px] sm:h-[40px] md:h-[56px] lg:h-[64px] xl:h-[72px] 2xl:h-[80px] min-w-[72px] sm:min-w-[90px] md:min-w-[110px] lg:min-w-[127px] xl:min-w-[140px] 2xl:min-w-[160px]'}`}
                  priority
                />
              </a>
            </div>

            {/* Right side - Menu Button */}
            <div className="flex items-center gap-4">
              {/* Menu Button - Styled like screenshot */}
              <button
                ref={menuButtonRef}
                onClick={toggleMenu}
                data-menu-open={isMenuOpen}
                className={`relative flex justify-center items-center gap-2 rounded-full bg-[#F5F5DC] hover:bg-[#E8E8D0] transition-all duration-300 group menu-toggle-btn hover:cursor-pointer ${isMenuOpen
                    ? 'ps-3 pe-2 py-0.5 gap-1.5'
                    : 'ps-4 pe-2.5 py-1 gap-2'
                  }`}
                aria-label="Toggle menu"
              >
                {/* Text Container with Slide Animation */}
                <div className="relative h-[20px] overflow-hidden">
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
                <div className={`relative rounded-full bg-[#2C2C2C] flex items-center justify-center overflow-hidden transition-all duration-300 ${isMenuOpen
                    ? 'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8'
                    : 'w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10'
                  }`}>
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
            </div>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={toggleMenu}
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
          className="bg-[#2C2C2C] shadow-2xl m-8 md:m-12 lg:m-2 w-[calc(100%-4rem)] md:w-[calc(100%-6rem)] lg:w-[calc(100%-1rem)] h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)] lg:h-[calc(100vh-1rem)] rounded-[20px] overflow-y-auto"
        >
          <div className="flex h-full gap-4 md:gap-6 lg:gap-8">
            {/* Menu Items - Left Side */}
            <nav className="flex-1 flex flex-col justify-start md:py-40 md:px-16 w-full">
              <ul className="space-y-4 md:space-y-6">
                {menuItems.map((item, index) => {
                  const active = isActive(item.href);
                  return (
                    <li key={index}>
                      {item.href.startsWith("/") ? (
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`menu-item block text-[24px] md:text-[32px] lg:text-[42px] font-medium transition-colors hover:text-[#F5F5DC] ${active ? "text-[#F5F5DC]" : "text-[#F5F5DC]"
                            }`}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          onClick={(e) => handleLinkClick(e, item.href)}
                          className="menu-item block text-[24px] md:text-[32px] lg:text-[42px] font-medium text-[#F5F5DC] transition-colors hover:text-[#E8E8D0]"
                        >
                          {item.label}
                        </a>
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
                  onClick={() => setIsMenuOpen(false)}
                />
              </div>
            </nav>
            
            {/* Image - Right Side */}
            <div className="hidden md:block w-[45%] lg:w-[50%] h-full relative rounded-[20px] px-20 py-10 overflow-hidden">
              <Image
                src={cap2Image}
                alt="cap2"
                fill
                sizes="(max-width: 768px) 0vw, 45vw"
                className="object-cover rounded-[20px]"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

