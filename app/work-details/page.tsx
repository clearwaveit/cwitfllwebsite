'use client';

import Education from "../components/sections/Education";
import Stay from "../components/sections/Stay";
import WhatWeDelivered from "../components/sections/WhatWeDelivered";
import PerformanceMetrics from "../components/sections/PerformanceMetrics";
import BackgroundImageSection from "../components/ui/BackgroundImageSection";
import ClientTestimonials from "../components/sections/ClientTestimonials";
import frame42Img from "@/app/assets/imgs/Frame 42.png";
import OurWork, { WorkItem } from "../components/sections/OurWork";
import ourWorkImg from "@/app/assets/imgs/our_work_img.png";

export default function WorkDetails() {

  const defaultWorkItems: WorkItem[] = [
    {
      title: "The Oxford Institute",
      description: "70% increased in digital interaction of potential students looking for information",
      image: ourWorkImg,
    },
    {
      title: "The Oxford Institute",
      description: "70% increased in digital interaction of potential students looking for information",
      image: ourWorkImg,
    },
  ];

  return (
    <main className="min-h-screen relative">
      <div
        className="relative top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[1920px] h-[300px] md:min-h-[900px]"
        style={{
          background: 'rgb(58 58 58 / 79%)',
          zIndex: 30,
          pointerEvents: 'none',
        }}
      />
      <Education />
      <Stay />
      <WhatWeDelivered />
      <PerformanceMetrics />
      <BackgroundImageSection
        backgroundImage={frame42Img}
        alt="Frame 42"
        className="relative bg-black overflow-hidden h-[346px] md:h-[856px]"
        imageClassName="object-contain mx-auto"
      />
      <ClientTestimonials />
      <OurWork
        workItems={defaultWorkItems}
        ctaVariant="outline"
        className="bg-black"
        showCTA={false}
        useNewDesign={false}
      />
    </main>
  );
}