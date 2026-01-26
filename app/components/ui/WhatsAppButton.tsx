"use client";

import Image from "next/image";
import whatsAppImg from "@/app/assets/imgs/whatsApp_img.png";

interface WhatsAppButtonProps {
  onClick: () => void;
  showOnDesktop?: boolean;
  showOnMobile?: boolean;
}

export default function WhatsAppButton({ 
  onClick, 
  showOnDesktop = true, 
  showOnMobile = true 
}: WhatsAppButtonProps) {
  return (
    <>
      {/* WhatsApp Button - Fixed Position (Desktop) */}
      {showOnDesktop && (
        <button
          onClick={onClick}
          className="fixed hidden md:block right-[70px] bottom-[70px] z-50 cursor-pointer hover:scale-110 transition-transform duration-300 whatsapp-button"
          style={{
            zIndex: 50,
          }}
        >
          <Image
            src={whatsAppImg}
            alt="WhatsApp"
            width={60}
            height={60}
            className="w-[40px] h-[40px] object-contain"
          />
        </button>
      )}

      {/* WhatsApp Button - Fixed Position (Mobile) */}
      {showOnMobile && (
        <button
          onClick={onClick}
          className="fixed md:hidden right-[15px] bottom-[50px] z-50 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{
            zIndex: 50,
          }}
        >
          <Image
            src={whatsAppImg}
            alt="WhatsApp"
            width={50}
            height={50}
            className="w-[40px] h-[40px] object-contain"
          />
        </button>
      )}
    </>
  );
}

