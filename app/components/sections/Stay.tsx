import Image from "next/image";
import TextSection from "../ui/TextSection";

interface StayProps {
  /** CMS image only — no hardcoded fallback. */
  imageSrc?: string;
  imageAlt?: string;
  paragraphs?: string[];
}

export default function Stay({
  imageSrc,
  imageAlt = "",
  paragraphs = [],
}: StayProps) {
  const hasParagraphs = paragraphs.length > 0;
  const cmsImage = imageSrc?.trim() ?? "";
  const hasCmsImage = cmsImage.length > 0;

  if (!hasParagraphs && !hasCmsImage) return null;

  const alt = imageAlt.trim() || "Stay section";

  const textWrapperClass = hasCmsImage
    ? "relative md:top-[500px] top-0 px-4 md:px-0 stay-section-text"
    : "relative top-0 px-4 md:px-0 stay-section-text py-10 md:py-16";

  return (
    <section className="min-h-[60vh] md:min-h-screen max-w-[1494px] w-full mx-auto relative">
      {hasCmsImage ? (
        <>
          <div className="absolute top-[-400px] left-1/2 -translate-x-1/2 w-full max-w-[1494px] h-auto hidden md:block stay-section">
            <Image
              src={cmsImage}
              alt={alt}
              width={1484}
              height={846}
              className="object-cover w-full h-auto"
              unoptimized
            />
          </div>
          <div className="relative w-full md:hidden mb-8">
            <Image
              src={cmsImage}
              alt={alt}
              width={1484}
              height={846}
              className="object-cover w-full h-full"
              unoptimized
            />
          </div>
        </>
      ) : null}
      {hasParagraphs ? (
        <div className={textWrapperClass}>
          <TextSection
            paragraphs={paragraphs}
            className="max-w-[1200px] mx-auto text-center"
            firstParagraphClassName="text-[12px] sm:text-[16px] md:text-[40px] lg:text-[40px] xl:text-[40px] 2xl:text-[40px] text-center font-light leading-tight items-center"
          />
        </div>
      ) : null}
    </section>
  );
}
