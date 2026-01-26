import Image from "next/image";
import vectorBg from "@/app/assets/imgs/Mask group (1).png";

export default function Education() {
  return (
    <section className="min-h-[60vh] md:min-h-screen relative">
      <Image
        src={vectorBg.src}
        alt="Work Details"
        width={1364}
        height={1562}
        className="absolute top-[250px] md:top-[-250px] left-0 hidden md:block"
      />
      {/* Background Image - Mobile Only */}
      <Image
        src={vectorBg.src}
        alt="Work Details"
        width={1364}
        height={1562}
        className="absolute top-0 left-0 md:hidden w-full h-[500px] object-cover"
      />
      <div className="flex flex-col md:flex-row justify-between items-start max-w-[1494px] mx-auto pt-20 px-4 md:px-0 education-section">
        <div className="flex flex-col gap-12 w-full md:mb-0 mb-10">
          <div>
            <h2 className="text-[20px] md:text-[50px] font-regular text-white">Education</h2>
            <p className="text-[12px] md:text-[19px] font-regular text-white">
              Industry
            </p>
          </div>
          <div>
            <h2 className="text-[20px] md:text-[50px] font-regular text-white">Website Design & Development</h2>
            <p className="text-[12px] md:text-[19px] font-regular text-white">
              2020
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-12 w-full">
          <div>
            <h2 className="text-[20px] md:text-[50px] font-regular text-white">Website Design & Development</h2>
            <p className="text-[12px] md:text-[19px] font-regular text-white">
              2020
            </p>
          </div>
          <div className="w-full">
            <h2 className="text-[20px] md:text-[50px] font-regular text-white">Services</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <li>
                <p className="text-[12px] md:text-[19px] font-regular text-white">
                  UX Design
                </p>
              </li>
              <li>
                <p className="text-[12px] md:text-[19px] font-regular text-white">
                  Visual Design
                </p>
              </li>
              <li>
                <p className="text-[12px] md:text-[19px] font-regular text-white">
                  Frontend Development
                </p>
              </li>
              <li>
                <p className="text-[12px] md:text-[19px] font-regular text-white">
                  Content Strategy
                </p>
              </li>
              <li>
                <p className="text-[12px] md:text-[19px] font-regular text-white">
                  Systems Integration
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}