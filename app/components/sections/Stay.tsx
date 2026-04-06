import Image from "next/image";
import laptopMaskImg from "@/app/assets/imgs/Mockup.png";
import TextSection from "../ui/TextSection";

interface StayProps {
  imageSrc?: string;
  paragraphs?: string[];
}

export default function Stay({
  imageSrc,
  paragraphs = [],
}: StayProps) {
  if (paragraphs.length === 0) return null;
  const src = imageSrc || laptopMaskImg.src;
  return (
    <section className="min-h-[60vh] md:min-h-screen max-w-[1494px] w-full mx-auto relative">
      <div className="absolute top-[-400px] left-1/2 -translate-x-1/2 w-full max-w-[1494px] h-auto hidden md:block stay-section">
        <Image
          src={src}
          alt="Stay"
          width={1484}
          height={846}
          className="object-cover w-full h-auto"
          unoptimized={!!imageSrc}
        />
      </div>
      <div className="relative w-full md:hidden mb-8">
        <Image
          src={src}
          alt="Stay"
          width={1484}
          height={846}
          className="object-cover w-full h-full"
          unoptimized={!!imageSrc}
        />
      </div>
      <div className="relative md:top-[500px] top-0 px-4 md:px-0 stay-section-text">
        <TextSection
          paragraphs={paragraphs}
          className="max-w-[1200px] mx-auto text-center"
          firstParagraphClassName="text-[12px] sm:text-[16px] md:text-[40px] lg:text-[40px] xl:text-[40px] 2xl:text-[40px] text-center font-light leading-tight items-center"
        />
      </div>
    </section>
  );
}