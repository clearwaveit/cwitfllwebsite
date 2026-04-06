import Image from "next/image";
import vectorBg from "@/app/assets/imgs/Mask group (1).png";

interface EducationProps {
  backgroundImageSrc?: string;
  industryTitle?: string;
  industryDescription?: string;
  projectTypeTitle?: string;
  projectYear?: string;
  servicesTitle?: string;
  services?: string[];
}

export default function Education({
  backgroundImageSrc,
  industryTitle = "",
  industryDescription = "",
  projectTypeTitle = "",
  projectYear = "",
  servicesTitle = "",
  services = [],
}: EducationProps) {
  const bgSrc = backgroundImageSrc || vectorBg.src;
  return (
    <section className="min-h-[60vh] md:min-h-screen relative">
      <Image
        src={bgSrc}
        alt="Work Details"
        width={1364}
        height={1562}
        className="absolute top-[250px] md:top-[-250px] left-0 hidden md:block"
        unoptimized={!!backgroundImageSrc}
      />
      <Image
        src={bgSrc}
        alt="Work Details"
        width={1364}
        height={1562}
        className="absolute top-0 left-0 md:hidden w-full h-[500px] object-cover"
        unoptimized={!!backgroundImageSrc}
      />
      <div className="flex flex-col md:flex-row justify-between items-start max-w-[1494px] mx-auto py-10 md:py-20 px-10 sm:px-10 md:px-0 md:px-0 education-section">
        <div className="flex flex-col gap-12 w-full md:mb-0 mb-10">
          <div>
            <h2 className="text-[20px] md:text-[36px] lg:text-[50px] font-regular text-white">{industryTitle}</h2>
            <p className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[19px] font-regular text-white">
              {industryDescription}
            </p>
          </div>
          <div>
            <h2 className="text-[20px] md:text-[36px] lg:text-[50px] font-regular text-white">{projectTypeTitle}</h2>
            <p className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[19px] font-regular text-white">
              {projectYear}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-12 w-full">
          <div>
            <h2 className="text-[20px] md:text-[36px] lg:text-[50px] font-regular text-white">{projectTypeTitle}</h2>
            <p className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[19px] font-regular text-white">
              {projectYear}
            </p>
          </div>
          <div className="w-full">
            <h2 className="text-[20px] md:text-[36px] lg:text-[50px] font-regular text-white">{servicesTitle}</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {services.map((name, i) => (
                <li key={i}>
                  <p className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[19px] font-regular text-white">
                    {name}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}