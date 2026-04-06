import PageBanner from "@/app/components/ui/PageBanner";
import IndustriesSection, { IndustryCard } from "@/app/components/sections/AppIndustriesSection";
import OurClients from "../components/sections/OurClients";
import AppWhyOpt, { ServiceCard } from "@/app/components/sections/AppWhyOpt";
import BusinessFeaturesSection, { BusinessFeature } from "@/app/components/sections/BusinessFeaturesSection";
import OurWork, { WorkItem } from "../components/sections/OurWork";
import ourWorkImg from "@/app/assets/imgs/our_work_img.png";
import ClientTestimonials from "../components/sections/ClientTestimonials";
import Accordion from "../components/sections/Accordion";
import ProjectContactForm from "../components/sections/ProjectContactForm";
import nextjssrc from "@/app/assets/imgs/next_js.png";
import AppStartToEnd, { FeatureCard } from "../components/sections/AppStartToEnd";

export default function NextJsPage() {
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

  const industriesTitle = (<>Next js known for ..</>);

  const industries: IndustryCard[] = [
    {
      title: "Built-in Optimizations",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras bibendum imperdiet purus, ut laoreet orci vivamus.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "Dynamic HTML Streaming",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras bibendum imperdiet purus, ut laoreet orci vivamus.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "React Server Components",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras bibendum imperdiet purus, ut laoreet orci vivamus.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "Data Fetching",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras bibendum imperdiet purus, ut laoreet orci vivamus.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "CSS Support",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras bibendum imperdiet purus, ut laoreet orci vivamus.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "Client & Server Rendering",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras bibendum imperdiet purus, ut laoreet orci vivamus.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "Server Actions",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras bibendum imperdiet purus, ut laoreet orci vivamus.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "Route Handlers",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras bibendum imperdiet purus, ut laoreet orci vivamus.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "Advanced Routing & Nested Layouts",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras bibendum imperdiet purus, ut laoreet orci vivamus.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
  ];

  const businessFeaturesTitle = "The React Framework For The Web";

  const businessFeatures: BusinessFeature[] = [
    {
      heading: "",
      description: "Flutter app development is an innovative approach enabling the creation of visually stunning, natively compiled applications for mobile, web, and desktop from a single codebase. Developed by Google, Flutter stands out for its fast development cycles, expressive and flexible UI, and ability to deploy across multiple platforms with seamless performance, making it a top choice for developers worldwide.",
    },
  ];

  const title_2 = (<>Next js website development Services <br /> to match your needs</>);

  const featureCards_2: FeatureCard[] = [
    {
      title: "website design",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor urna eu augue finibus pharetra. Proin faucibus mi eu velit hendrerit.",
    },
    {
      title: "Web App development",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor urna eu augue finibus pharetra. Proin faucibus mi eu velit hendrerit.",
    },
    {
      title: "Marketing Landing Pages",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor urna eu augue finibus pharetra. Proin faucibus mi eu velit hendrerit.",
    },
  ];

  const title_3 = (<>Why We Should Consider Next Js?</>);

  const whyOptParagraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor. Morbi bibendum velit vel justo tristique dapibus et nec eros. Etiam lacinia, risus et elementum vehicula, justo justo pulvinar nunc, eu auctor massa turpis vel ex.",

    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor. Morbi bibendum velit vel justo tristique dapibus et nec eros. Etiam lacinia, risus et elementum vehicula, justo justo pulvinar nunc, eu auctor massa turpis vel ex.",
  ];

  const whyOptServices: ServiceCard[] = [
    {
      title: "World-class customer support",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
      textColor: "text-white",
      bgColor: "bg-[#141414]"
    },
    {
      title: "Industry-leading CMS",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
      textColor: "text-black",
      bgColor: "bg-[#E3E3E3]"
    },
    {
      title: "Server Security Hardening",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
      textColor: "text-white",
      bgColor: "bg-[#141414]"
    },
    {
      title: "Cloud-Native Features To Boost Productivity",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
      textColor: "text-black",
      bgColor: "bg-[#E3E3E3]"
    },
  ];

  return (
    <main className="min-h-screen relative">
      <PageBanner title="Next Js" minHeight="100vh" />
      <BusinessFeaturesSection
        title={businessFeaturesTitle}
        features={businessFeatures}
        imageSrc={nextjssrc}
        containerClassName="max-w-[1634px] mx-auto"
      />
      <IndustriesSection
        title={industriesTitle}
        industries={industries}
        buttonText="CONTACT US"
      />
      <OurClients />
      <AppStartToEnd
        title={title_2}
        videoSrc="/videos/animated_clip_2.mp4"
        buttonText="CONTACT US"
        layout="with-cards"
        cards={featureCards_2}
        contentMaxWidth="max-w-full"
        videoTopOffset="-top-100"
        videoRightOffset="right-0 md:-right-60"
        padding="py-20 md:py-30"
        videoPosition="right"
      />
      <OurWork
        title="OUR WORK"
        workItems={defaultWorkItems}
        ctaVariant="outline"
        className="bg-black"
        showCTA={true}
        ctaLabel="Let's Talk"
      />
      <AppWhyOpt
        title={title_3}
        paragraphs={whyOptParagraphs}
        services={whyOptServices}
        buttonText="CONTACT US"
        videoSrc="/videos/animated_clip_2.mp4"
        videoTopOffset="-top-100"
        videoRightOffset="right-0 md:-left-70"
        videoPosition="left"
      />
      <ClientTestimonials />
      <Accordion />
      <ProjectContactForm />
    </main>
  );
}