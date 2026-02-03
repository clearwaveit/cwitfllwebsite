import Hero from "@/app/components/sections/Hero";
import Showcase from "@/app/components/sections/Showcase";
import Studios from "@/app/components/sections/Studios";
import GenAI from "@/app/components/sections/GenAI";
import OurWork, { WorkItem } from "@/app/components/sections/OurWork";
import ourWorkImg from "@/app/assets/imgs/our_work_img.png";
import OurClients from "@/app/components/sections/OurClients";
import Blogs from "@/app/components/sections/blogs";
import Accordion from "@/app/components/sections/Accordion";
import TextSection from "@/app/components/ui/TextSection";
import maskGroupImg from "@/app/assets/imgs/Mask group.png";
import Image from "next/image";

export default function Home() {
  const defaultWorkItems: WorkItem[] = [
    {
      title: "The Oxford Institute",
      description: "70% increased in digital interaction of potential students looking for information",
      image: ourWorkImg,
      category: "EDUCATION\nTECH\nWEBSITE",
    },
    {
      title: "The Oxford Institute",
      description: "70% increased in digital interaction of potential students looking for information",
      image: ourWorkImg,
      category: "EDUCATION\nTECH\nWEBSITE",
    },
    {
      title: "The Oxford Institute",
      description: "70% increased in digital interaction of potential students looking for information",
      image: ourWorkImg,
      category: "EDUCATION\nTECH\nWEBSITE",
    },
    {
      title: "The Oxford Institute",
      description: "70% increased in digital interaction of potential students looking for information",
      image: ourWorkImg,
      category: "EDUCATION\nTECH\nWEBSITE",
    },
  ];
  // const ministryPara = (<><p className="text-[12px] md:text-[30px]">MINISTRY OF PUBLIC SECURITY <br /> MINISTRY OF FOREIGN AFFAIRS <br /> MINISTRY OF CULTURE SPORTS AND TOURISM <br /> VINGROUP BIM GROUP PETROLIMEX VIETINBANK <br /> VIETCOMBANK TECHCOMBANK VPBANK MB TPBANK SHB <br /> HDBANK MSB PJICO VIETTEL VNG VTC FPT VINAPHONE <br /> SAMSUNG LG VIETNAM AIRLINES BAMBOO AIRWAYS SONY <br /> OPPO HYUNDAI SABECO VINACONEX AND MORE...</p></>);
  return (
    <main className="min-h-screen">
      <Hero />
      <Showcase />
      <div className="relative">
        <div
          className="absolute right-0 z-50 pointer-events-none"
          style={{ top: "-300px" }}
        >
          <Image
            src={maskGroupImg}
            alt="Background"
            className="w-auto h-auto"
            unoptimized
          />
        </div>
        <TextSection
          paragraphs={[
            "Clearwave is a website design company rooted in Dubai, working across teams in the UK and the US. We design and develop websites, web applications, and mobile applications, alongside e-commerce platforms, UI/UX design, branding, and SEO. Our work focuses on building digital platforms that are scalable, practical, and built to perform over time."]}
          className="relative z-10 container mx-auto md:my-50 my-20 md:px-[50px] px-4 global-section-padding"
        />
      </div>
      <Studios />
      <GenAI />
      <OurWork
        title="OUR WORK"
        workItems={defaultWorkItems}
        ctaVariant="outline"
        className="bg-black"
        showCTA={true}
      />
      <OurClients />
      <Blogs />
      <Accordion />
    </main>
  );
}
