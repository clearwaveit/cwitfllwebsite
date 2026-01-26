"use client";

import Image, { StaticImageData } from "next/image";

interface BeforeImageProps {
  image: string | StaticImageData;
  alt?: string;
  className?: string;
  imageClassName?: string;
}

export default function BeforeImage({
  image,
  alt = "Background",
  className = "",
  imageClassName = "",
}: BeforeImageProps) {
  return (
    <div className={`absolute -left-[30px] top-0 w-full h-full z-0 ${className}`}>
      <Image
        src={image}
        alt={alt}
        fill
        className={`object-cover ${imageClassName}`}
        unoptimized
      />
    </div>
  );
}

