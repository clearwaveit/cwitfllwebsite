"use client";

import Image from "next/image";
import vectorBg from "@/app/assets/imgs/Mask group (2).png";
import CallToActionButton from "../ui/CallToActionButton";
import phoneIcon from "@/app/assets/imgs/phone.png";
import linkedinIcon from "@/app/assets/imgs/linkedin.png";
import instagramIcon from "@/app/assets/imgs/Instagram.png";
import twitterIcon from "@/app/assets/imgs/twitter.png";

export default function Footer() {
  return (
    <footer className="relative bg-black text-white footer-responsive">
      {/* Call to Action Section */}
      <section
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
          <h2 className="text-[60px] md:text-[80px] font-[700] leading-[80px] text-white mb-4 footer-heading">
            Get Started now!
          </h2>
          <p className="text-[16px] md:text-[20px] text-white mb-8 max-w-2xl footer-paragraph">
            Request for a free quote, submit your RFP/RFI.
          </p>
          <CallToActionButton variant="shiny" />
        </div>

        {/* Footer Links Section - Overlay on Vector */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/10 footer-links-section global-section-padding-footer" style={{ paddingTop: '5.5rem', paddingBottom: '5.5rem' }}>
          <div className="flex justify-center items-center mx-auto footer-links-container">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 footer-links-grid">
              {/* Navigation Links */}
              <div>
                <ul className="space-y-3 font-graphik-light-weight-300">
                  <li>
                    <a href="/" className="text-white text-[12px] md:text-[25px] hover:text-[#0DFCC1] transition-colors footer-link">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/digital-experience-studio" className="text-white text-[12px] md:text-[25px] hover:text-[#0DFCC1] transition-colors footer-link">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="/our-work" className="text-white text-[12px] md:text-[25px] hover:text-[#0DFCC1] transition-colors footer-link">
                      Work
                    </a>
                  </li>
                  <li>
                    <a href="/about-us" className="text-white text-[12px] md:text-[25px] hover:text-[#0DFCC1] transition-colors footer-link">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="/contact-us" className="text-white text-[12px] md:text-[25px] hover:text-[#0DFCC1] transition-colors footer-link">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>

              {/* Service Categories */}
              <div>
                <ul className="space-y-3 font-graphik-light-weight-300">
                  <li>
                    <a href="#" className="text-white text-[12px] md:text-[25px] hover:text-[#0DFCC1] transition-colors footer-link">
                      Website design & Development
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white text-[12px] md:text-[25px] hover:text-[#0DFCC1] transition-colors footer-link">
                      AI Automation and Services
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white text-[12px] md:text-[25px] hover:text-[#0DFCC1] transition-colors footer-link">
                      Mobile apps development
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white text-[12px] md:text-[25px] hover:text-[#0DFCC1] transition-colors footer-link">
                      Web apps development
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white text-[12px] md:text-[25px] hover:text-[#0DFCC1] transition-colors footer-link">
                      Branding and Brand strategy
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Information */}
              <div className="flex flex-col justify-center items-end footer-contact-info">
                <ul className="font-graphik-light-weight-300">
                  <li className="text-white text-[12px] md:text-[25px] footer-text">
                    Trade Center Area
                  </li>
                  <li className="text-white text-[12px] md:text-[25px] footer-text">
                    Sheikh Zayed Road
                  </li>
                      <li className="text-white text-[12px] md:text-[25px] mb-4 footer-text">
                    Dubai, UAE
                  </li>
                  <li className="flex items-center gap-2 text-white text-[12px] md:text-[25px] footer-text">
                    <Image src={phoneIcon} alt="Phone" width={16.66} height={16.66} className="footer-phone-icon" />
                    +971 4 111 111 1
                  </li>
                </ul>

                {/* Social Media Icons */}
                <div className="mt-6">
                  <div className="flex justify-start items-start gap-2">
                    <a
                      href="#"
                      className="w-[30px] md:w-[50px] h-[30px] md:h-[50px] rounded-full border border-white flex items-center justify-center text-white hover:bg-[#0DFCC1] hover:border-[#0DFCC1] transition-colors footer-social-icon"
                      aria-label="LinkedIn"
                    >
                      <Image src={linkedinIcon} alt="LinkedIn" width={17} height={15} className="w-[12px] md:w-[17px] h-[12px] md:h-[15px] footer-social-icon-img" />
                    </a>
                    <a
                      href="#"
                      className="w-[30px] md:w-[50px] h-[30px] md:h-[50px] rounded-full border border-white flex items-center justify-center text-white hover:bg-[#0DFCC1] hover:border-[#0DFCC1] transition-colors footer-social-icon"
                      aria-label="Instagram"
                    >
                      <Image src={instagramIcon} alt="Instagram" width={17} height={15} className="w-[12px] md:w-[17px] h-[12px] md:h-[15px] footer-social-icon-img" />
                    </a>
                    <a
                      href="#"
                      className="w-[30px] md:w-[50px] h-[30px] md:h-[50px] rounded-full border border-white flex items-center justify-center text-white hover:bg-[#0DFCC1] hover:border-[#0DFCC1] transition-colors footer-social-icon"
                      aria-label="Twitter"
                    >
                      <Image src={twitterIcon} alt="Twitter" width={17} height={15} className="w-[12px] md:w-[17px] h-[12px] md:h-[15px] footer-social-icon-img" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Copyright and Legal */}
              <div className="flex flex-col justify-start md:justify-center items-end footer-copyright">
                <ul className="space-y-3 font-graphik-light-weight-300">
                  <li className="text-white text-[12px] md:text-[25px] footer-text">
                    CWIT © 2025
                  </li>
                  <li className="text-white text-[12px] md:text-[25px] footer-text">
                    All rights reserved
                  </li>
                  <li>
                    <a href="#" className="text-white text-[12px] md:text-[25px] hover:text-[#0DFCC1] transition-colors footer-link">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white text-[12px] md:text-[25px] hover:text-[#0DFCC1] transition-colors footer-link">
                      Terms & Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
