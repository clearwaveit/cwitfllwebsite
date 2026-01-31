"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CallToActionButton from "./CallToActionButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
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
    if (!menuRef.current || !overlayRef.current) return;

    if (isMenuOpen) {
      // Open menu animation
      gsap.fromTo(
        menuRef.current,
        {
          x: "100%",
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        }
      );

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
      // Close menu animation
      gsap.to(menuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
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
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about-us" },
    { label: "Our Work", href: "/our-work" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  return (
    <>
      <header ref={headerRef} className="fixed top-4 left-0 right-0 z-50 bg-transparent">
        <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex h-[48px] sm:h-[56px] md:h-[64px] lg:h-[72px] xl:h-[80px] 2xl:h-[88px] items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="relative h-[32px] sm:h-[40px] md:h-[56px] lg:h-[64px] xl:h-[72px] 2xl:h-[80px] w-auto">
                <Image
                  src="/imgs/cwit_logo_1.png"
                  alt="CWIT Logo"
                  width={100}
                  height={100}
                  className="h-[32px] sm:h-[40px] md:h-[56px] lg:h-[64px] xl:h-[72px] 2xl:h-[80px] min-w-[72px] sm:min-w-[90px] md:min-w-[110px] lg:min-w-[127px] xl:min-w-[140px] 2xl:min-w-[160px] w-auto h-auto object-contain"
                  priority
                />
              </a>
            </div>

            {/* Right side - Desktop Menu and Hamburger */}
            <div className="flex items-center gap-4">
              {/* Desktop Menu Items - Hidden on mobile */}
              <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8">
                {menuItems.map((item, index) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className={`text-[10px] sm:text-[11px] md:text-[13px] lg:text-[15px] xl:text-[16px] 2xl:text-[17px] font-medium transition-colors hover:text-[#0DFCC1] ${
                        active ? "text-[#0DFCC1]" : "text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                {/* CTA Button in menu - Desktop */}
                {pathname !== "/contact-us" && (
                  <CallToActionButton variant="shiny" className="ml-4 xl:ml-6 2xl:ml-8" />
                )}
              </nav>

              {/* Hamburger Button - Visible on mobile/tablet, hidden on desktop */}
              <button
                onClick={toggleMenu}
                className={`relative z-50 flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 flex-col items-center justify-center gap-1 sm:gap-1.5 rounded-lg transition-colors group lg:hidden ${
                  isMenuOpen ? "hover:bg-white" : "hover:bg-white/10"
                }`}
                aria-label="Toggle menu"
              >
                <span
                  className={`h-0.5 w-4 sm:w-5 md:w-6 lg:w-8 origin-center transform transition-all duration-300 ${
                    isMenuOpen
                      ? "translate-y-1.5 sm:translate-y-2 rotate-45 bg-white group-hover:bg-black"
                      : "bg-white"
                  }`}
                />
                <span
                  className={`h-0.5 w-4 sm:w-5 md:w-6 lg:w-8 transition-all duration-300 ${
                    isMenuOpen
                      ? "opacity-0 bg-white group-hover:bg-black"
                      : "opacity-100 bg-white"
                  }`}
                />
                <span
                  className={`h-0.5 w-4 sm:w-5 md:w-6 lg:w-8 origin-center transform transition-all duration-300 ${
                    isMenuOpen
                      ? "-translate-y-1.5 sm:-translate-y-2 -rotate-45 bg-white group-hover:bg-black"
                      : "bg-white"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={toggleMenu}
        className={`fixed inset-0 z-40 bg-black/50 ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ opacity: 0 }}
      />

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed right-0 top-0 z-40 h-full w-full max-w-full md:max-w-[20vw] bg-black shadow-2xl dark:bg-zinc-900 ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ transform: "translateX(100%)" }}
      >
        <div className="flex h-full flex-col pt-20 md:pt-20">
          {/* Menu Items */}
          <nav className="flex-1 px-4 md:px-6 pt-6 md:pt-10 flex flex-col items-end">
            <ul className="space-y-2 md:space-y-3 w-full flex flex-col items-end">
              {menuItems.map((item, index) => {
                const active = isActive(item.href);
                return (
                  <li key={index} className="w-auto">
                    {item.href.startsWith("/") ? (
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`menu-item block rounded-lg px-3 py-2.5 md:px-4 md:py-3 lg:px-5 lg:py-3.5 text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] font-medium transition-colors hover:text-[#0DFCC1] text-right ${
                          active ? "text-[#0DFCC1]" : "text-white"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        onClick={(e) => handleLinkClick(e, item.href)}
                        className="menu-item block rounded-lg px-3 py-2.5 md:px-4 md:py-3 lg:px-5 lg:py-3.5 text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800 text-right"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
            
            {/* CTA Button inside nav - Mobile/Tablet */}
            {pathname !== "/contact-us" && (
              <div className="mt-6 md:mt-8 w-full flex justify-end">
                <CallToActionButton 
                  variant="shiny" 
                  size="small"
                  onClick={() => setIsMenuOpen(false)}
                />
              </div>
            )}
          </nav>

          {/* Footer in Menu */}
          <div className="border-t border-[#4E4E4E] p-4 md:p-6">
            <p className="text-sm md:text-[16px] text-white">
              © {new Date().getFullYear()} CWIT
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

