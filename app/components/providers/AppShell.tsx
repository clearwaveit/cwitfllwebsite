"use client";

import { useState } from "react";
import Header from "@/app/components/ui/Header";
import Footer from "@/app/components/sections/Footer";
import WhatsAppChat from "@/app/components/ui/WhatsAppChat";
import WhatsAppButton from "@/app/components/ui/WhatsAppButton";
import SmoothScrollProvider from "./SmoothScrollProvider";
import type { SiteSettings } from "@/app/lib/site-settings-api";

interface AppShellProps {
  children: React.ReactNode;
  siteSettings: SiteSettings;
}

export default function AppShell({ children, siteSettings }: AppShellProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <SmoothScrollProvider>
      <Header settings={siteSettings.header} />
      <WhatsAppButton onClick={() => setIsChatOpen(!isChatOpen)} />
      <WhatsAppChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      {children}
      <Footer settings={siteSettings.footer} />
    </SmoothScrollProvider>
  );
}
