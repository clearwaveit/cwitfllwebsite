"use client";

import CallToActionButton from "@/app/components/ui/CallToActionButton";
import Image, { StaticImageData } from "next/image";

interface ServiceDetailSectionProps {
  service: {
    title: string;
    description: string;
    services: string[];
  };
  graphicImage: string | StaticImageData;
  graphicAlt?: string;
  imagePosition?: "left" | "right";
  className?: string;
}

export default function ServiceDetailSection({
  service,
  graphicImage,
  graphicAlt = "Service graphic",
  imagePosition = "right",
  className = "",
}: ServiceDetailSectionProps) {
  const isImageLeft = imagePosition === "left";

  const textContent = (
    <div className="flex flex-col space-y-8">
      {/* Main Heading */}
      <h2 className="text-[40px] md:text-[80px] font-light text-white leading-tight">
        {service?.title}
      </h2>

      {/* Description Paragraph */}
      <p className="text-[16px] md:text-[20px] font-light text-white leading-relaxed">
        {service?.description}
      </p>

      {/* Service List */}
      <div className="flex flex-col space-y-0">
        {service?.services.map((serviceItem, index) => (
          <div key={index}>
            <p className="text-[20px] md:text-[30px] font-light text-white py-4">
              {serviceItem}
            </p>
            {index < service.services.length - 1 && (
              <div className="border-t border-[#434343]" />
            )}
          </div>
        ))}
      </div>

      {/* Call to Action Button */}
      <div className="pt-4 relative z-10">
        <CallToActionButton variant="shiny" />
      </div>
    </div>
  );

  const graphicContent = graphicImage && (
    <div className="flex items-center justify-center lg:justify-end h-full w-full max-w-[904px] pointer-events-none">
      <div className="relative w-full max-w-[904px] h-[250px] md:h-[859px]">
        <Image
          src={graphicImage}
          alt={graphicAlt}
          width={904}
          height={859}
          className="object-contain"
          unoptimized
        />
      </div>
    </div>
  );

  return (
    <section className={`relative bg-black pb-24 overflow-hidden isolate ${className}`}>
      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[1494px] global-section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* Mobile: Always text first (order-1), then image (order-2) */}
          {/* Desktop: Respect imagePosition prop */}
          {isImageLeft ? (
            <>
              <div className="order-1 lg:order-2">
                {textContent}
              </div>
              <div className="order-2 lg:order-1">
                {graphicContent}
              </div>
            </>
          ) : (
            <>
              <div className="order-1 lg:order-1">
                {textContent}
              </div>
              <div className="order-2 lg:order-2">
                {graphicContent}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

