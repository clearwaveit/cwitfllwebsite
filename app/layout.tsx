"use client";

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/ui/Header";
import Footer from "./components/sections/Footer";
import WhatsAppChat from "./components/ui/WhatsAppChat";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import SmoothScrollProvider from "./components/providers/SmoothScrollProvider";
import { useState } from "react";

// export const metadata: Metadata = {
//   title: "Your Journey - Modern Web Experiences",
//   description: "Creating beautiful experiences with modern web technologies and smooth animations",
//   icons: {
//     icon: "/icon.png",
//     apple: "/apple-icon.png",
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white font-graphik">
        <SmoothScrollProvider>
          <Header />
          <WhatsAppButton onClick={() => setIsChatOpen(!isChatOpen)} />
          <WhatsAppChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
