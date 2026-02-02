import DigitalExperienceBanner from "@/app/components/sections/DigitalExperienceBanner";
import DigitalExperienceServices from "@/app/components/sections/DigitalExperienceServices";
import BackgroundImageSection from "../components/ui/BackgroundImageSection";
import ServiceDetailSection from "../components/sections/ServiceDetailSection";
import digitalPageBgImg from "@/app/assets/imgs/digital_page_bg_img.png";
import graphicImage from "@/app/assets/imgs/gen_ai_img.png";
import OurWork, { WorkItem } from "../components/sections/OurWork";
import Accordion from "../components/sections/Accordion";
import ourWorkImg from "@/app/assets/imgs/our_work_img.png";
import vectorBg from "@/app/assets/imgs/Mask group (1).png";

export default function ServicesPage() {
  const services = [
    {
      "title": "UI / UX Design",
      "description": "We sculpt interfaces and journeys that feel effortless and memorable. From wireframes to high-fidelity prototypes, our UI/UX designs focus on clarity, emotional resonance, and purpose. Every interaction is designed to guide users, build trust, and reflect your brand's identity.",
      "services": ["AI-informed User journeys & flow maps", "Wireframes & prototypes", "Visual style systems & UI kits", "Bilingual UX (EN / AR)"]
    },
    {
      "title": "Website Development",
      "description": "We turn design into living, breathing websites — responsive, fast, and technically sound. Whether you need a corporate presence, landing pages, or interac",
      "services": ["Frontend & backend architecture", "Responsive & mobile-first", "AI-assisted Speed & performance optimization", "SEO foundations enhanced by AI tools"]
    },
    {
      "title": "Ecommerce Solutions", "description": "Sell online with confidence. Our e-commerce builds go beyond product pages — we craft intuitive shopping experiences, integrated payment systems, and seamless checkout flows that reduce friction and boost conversions.",
      "services": ["Inventory and catalog management",
        "Payment gateway integrations",
        "Smart product recommendations & upsells",
        "AI analytics for sales & customer behavior"]
    },
    {
      "title": "CMS & Integrations", "description": "Our CMS solutions give you full control while integrating seamlessly with your tools. AI helps automate content management, personalization, and workflow efficiency, ensuring your team spends less time on manual updates and more on growth.",
      "services": ["WordPress, Shopify, Drupal & custom CMS",
        "AI-assisted content structuring & recommendations",
        "API & third-party integrations",
        "Workflow automation & editorial efficiency"]
    }
  ];
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
    <main className="min-h-screen">
      <DigitalExperienceBanner
        title={
          <>
            Digital<br />
            Experience Studio
          </>
        }
        description="Digital Experiences That Inspire and Perform"
        videoSrc="/videos/animated_clip_1.mp4"
        backgroundImage={{
          src: vectorBg.src,
          alt: "Background",
        }}
      />
      <DigitalExperienceServices />
      <BackgroundImageSection
        backgroundImage={digitalPageBgImg}
        alt="Background"
        className="relative bg-black overflow-hidden h-[146px] md:h-[748px]"
      />
      {services.map((service, index) => (
        <ServiceDetailSection
          key={index}
          service={service}
          graphicImage={graphicImage}
          graphicAlt="Gen AI Image"
          imagePosition={index % 2 === 0 ? "right" : "left"}
        />
      ))}
      <OurWork
        title="OUR WORK"
        workItems={defaultWorkItems}
        ctaVariant="outline"
        className="bg-black"
        showCTA={true}
        useNewDesign={false}
      />
      <Accordion />
    </main>
  );
}

