import PageBanner from "@/app/components/ui/PageBanner";
import SplitContentSection from "@/app/components/sections/SplitContentSection";
import IndustriesSection, { IndustryCard } from "@/app/components/sections/AppIndustriesSection";
import OurClients from "../components/sections/OurClients";
import AppWhyOpt, { ServiceCard } from "@/app/components/sections/AppWhyOpt";
import BusinessFeaturesSection, { BusinessFeature } from "@/app/components/sections/BusinessFeaturesSection";
import OurWork, { WorkItem } from "../components/sections/OurWork";
import ourWorkImg from "@/app/assets/imgs/our_work_img.png";
import ClientTestimonials from "../components/sections/ClientTestimonials";
import Accordion from "../components/sections/Accordion";
import ProjectContactForm from "../components/sections/ProjectContactForm";
import AppStartToEnd, { FeatureCard } from "../components/sections/AppStartToEnd";
import UiUxTiltSection from "@/app/components/sections/UiUxTiltSection";
import animatedClip4 from "@/app/assets/imgs/animated_clip_4.png";

export default function UiUXAppPage() {
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

  const industriesTitle = (<>Crafting Exceptional Digital <br /> Experiences in Saudi:</>);

  const industries: IndustryCard[] = [
    {
      title: "User Experience (UX)",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras bibendum imperdiet purus, ut laoreet orci vivamus.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "User Interface (UI)",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras bibendum imperdiet purus, ut laoreet orci vivamus.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "Cross-platform Experience",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras bibendum imperdiet purus, ut laoreet orci vivamus.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "Interaction Design",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras bibendum imperdiet purus, ut laoreet orci vivamus.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "Consulting & Auditing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras bibendum imperdiet purus, ut laoreet orci vivamus.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "Design System",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras bibendum imperdiet purus, ut laoreet orci vivamus.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
  ];

  const businessFeaturesTitle = "UI/UX Design Services To Your Businesses For Enhanced User Retention";

  const businessFeatures: BusinessFeature[] = [
    {
      heading: "",
      description: "Supercharge your digital experiences with an end-to-end suite of digital  marketing tools built on the only platform designed for personalization  at scale. With Adobe Experience Cloud, generative AI and real-time  insights power seamless content management and one-to-one activation.  That’s why enterprise experience runs on Adobe.",
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
      title: "Ideation / Brainstorming",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
      textColor: "text-white",
      bgColor: "bg-[#141414]"
    },
    {
      title: "Wireframes",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
      textColor: "text-black",
      bgColor: "bg-[#E3E3E3]"
    },
    {
      title: "High-Fidelity Prototyping",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
      textColor: "text-white",
      bgColor: "bg-[#141414]"
    },
    {
      title: "Analysis and integration",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
      textColor: "text-black",
      bgColor: "bg-[#E3E3E3]"
    },
  ];

  return (
    <main className="min-h-screen relative">
      <PageBanner title="UI/ UX" minHeight="100vh" />
      <SplitContentSection
        title={businessFeaturesTitle}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor urna eu augue finibus pharetra. Proin faucibus mi eu velit hendrerit."
        buttonText="CONTACT US"
        image={animatedClip4}
        imageAlt="UI/UX App"
        layout="content-left"
        imageMaxWidth="max-w-full"
        imageClassName="md:max-w-full object-cover object-center_top rounded-[20px] md:rounded-[30px]"
      />
      <IndustriesSection
        title={industriesTitle}
        industries={industries}
      />
      <UiUxTiltSection />
      <OurWork
        title="OUR WORK"
        workItems={defaultWorkItems}
        ctaVariant="outline"
        className="bg-black"
        showCTA={true}
      />
      <AppWhyOpt
        title={title_3}
        paragraphs={whyOptParagraphs}
        services={whyOptServices}
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