"use client";

import { useMemo } from "react";
import OurWork, { WorkItem } from "@/app/components/sections/OurWork";
import type { HomeOurWorkItem } from "@/app/lib/home-normalize";
import { resolveImageUrl } from "@/app/lib/our-work-api";

const DEFAULT_TITLE = "OUR WORK";
const LANDING_DEFAULT_WORK_ITEMS: WorkItem[] = [
  {
    title: "Whiskas",
    description: "Interactive Cat Game",
    image: "/imgs/whiskas thumb.jpg",
    popupImage: "/imgs/Tap To Purr Whiskas.png",
    category: "INTERACTIVE\nGAME",
  },
  {
    title: "M&M's",
    description: "Interactive Brand Experience",
    image: "/imgs/mnms thumb.jpg",
    popupImage: "/imgs/m&ms.png",
    category: "INTERACTIVE\nCAMPAIGN",
  },
  {
    title: "Recycle For Future",
    description: "Sustainable Future Initiative",
    image: "/imgs/Recycle for future thumb.jpg",
    popupImage: "/imgs/Recycle For Future.png",
    category: "NON-PROFIT\nWEBSITE",
    websiteUrl: "https://www.recycleforfuture.com",
  },
  {
    title: "Safilo Group",
    description: "Eyewear Corporate Portal",
    image: "/imgs/Safilo Thumb.jpg",
    popupImage: "/imgs/Safilo Group.png",
    category: "CORPORATE\nWEBSITE",
    websiteUrl: "https://www.safilogroup.com",
  },
  {
    title: "Luxe Port",
    description: "Luxury Digital Platform",
    image: "/imgs/Luxe port thumb.jpg",
    popupImage: "/imgs/Luxe Port.png",
    category: "LUXURY\nWEBSITE",
    websiteUrl: "https://luxeport.ae",
  },
  {
    title: "Felis Kitchen",
    description: "Culinary Digital Experience",
    image: "/imgs/Felis THumb.jpg",
    popupImage: "/imgs/Felis Kitchen.png",
    category: "WEBSITE\nFOOD",
    websiteUrl: "https://www.feliskitchen.com",
  },
  {
    title: "Nolte UAE",
    description: "Interior Design Showcase",
    image: "/imgs/Nolte Thumb.jpg",
    popupImage: "/imgs/Nolte UAE.png",
    category: "INTERIOR\nWEBSITE",
    websiteUrl: "https://www.nolte-kuechen.com",
  },
  {
    title: "Diglossia",
    description: "Digital Experience & Development",
    image: "/imgs/Diglossia thumn.jpg",
    popupImage: "/imgs/Diglossia- Dark.png",
    category: "WEBSITE\nDIGITAL",
  },
  {
    title: "Fashion Forever",
    description: "E-commerce & Brand Identity",
    image: "/imgs/Fashion forever thumnb.jpg",
    popupImage: "/imgs/Fashion Forever.png",
    category: "ECOMMERCE\nFASHION",
    websiteUrl: "https://www.fashionforever.ae",
  },
  {
    title: "Media World",
    description: "Media & Entertainment Platform",
    image: "/imgs/Media world thumb.jpg",
    popupImage: "/imgs/Media World.png",
    category: "MEDIA\nWEBSITE",
    websiteUrl: "https://www.mediaworld.ae",
  },
  {
    title: "Meta Studio",
    description: "Creative Digital Studio",
    image: "/imgs/Meta thumb.jpg",
    popupImage: "/imgs/Meta Studio.png",
    category: "CREATIVE\nSTUDIO",
    websiteUrl: "https://metastudio.design",
  },
  {
    title: "Klove & Lonberg",
    description: "Corporate Digital Presence",
    image: "/imgs/Klove and lonberg thumb.jpg",
    popupImage: "/imgs/klove & lonberg.png",
    category: "CORPORATE\nWEBSITE",
    websiteUrl: "https://www.klove-lonberg.dk",
  },
];

interface HomeOurWorkProps {
  titleOverride?: string;
  sectionSubtitle?: string;
  sectionDescription?: string;
  items?: HomeOurWorkItem[];
}

export default function HomeOurWork({ titleOverride, items: cmsItems }: HomeOurWorkProps = {}) {
  const workItems: WorkItem[] = useMemo(() => {
    const fromCms = (cmsItems ?? []).map((item) => ({
      title: item.title,
      description: item.description ?? "",
      image: resolveImageUrl(item.image) || item.image || "/imgs/whiskas thumb.jpg",
      popupImage: resolveImageUrl(item.image) || item.image || "/imgs/Tap To Purr Whiskas.png",
      category: item.subtitle?.trim() || undefined,
      link: item.link?.trim() || undefined,
    }));
    if (fromCms.length) return fromCms;
    return LANDING_DEFAULT_WORK_ITEMS;
  }, [cmsItems]);

  return (
    <OurWork
      title={titleOverride?.trim() || DEFAULT_TITLE}
      workItems={workItems}
      ctaVariant="outline"
      className="bg-black"
      showCTA={true}
      cardClickAction="modal"
    />
  );
}
