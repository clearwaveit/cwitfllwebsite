import OurClients from "../components/sections/OurClients";
import AppWhyOpt, { ServiceCard } from "@/app/components/sections/AppWhyOpt";
import Accordion from "../components/sections/Accordion";
import ProjectContactForm from "../components/sections/ProjectContactForm";
import flutterAppImg5 from "@/app/assets/imgs/flutter_app_5.png";
import HeroBanner, { StatItem } from "@/app/components/ui/HeroBanner";
import flutterBannerImg3 from "@/app/assets/imgs/flutter_banner_3.png";
import flutter_app_1_banner_1 from "@/app/assets/imgs/flutter_app_1_banner_1.png"
import SplitContentSection from "../components/sections/SplitContentSection";
import Blogs from "../components/sections/blogs";
import OurWork, { WorkItem } from "../components/sections/OurWork";
import ourWorkImg from "@/app/assets/imgs/our_work_img.png";

export default function FlutterAppPage5() {

  // Hero Banner Stats
  const heroStats: StatItem[] = [
    { label: "User Engagement", value: "88%" },
    { label: "Conversion Rate", value: "21%" },
    { label: "Site Security", value: "100%" },
    { label: "Responsiveness", value: "95%" },
  ];

  const title = (<>Digital Banking Solutions for the Future</>);
  const description = (<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor urna eu augue finibus pharetra. Proin faucibus mi eu velit hendrerit, id convallis neque varius. Nunc elementum erat quis mollis mattis. Etiam non mauris urna. Vivamus egestas porta felis, a maximus turpis ultrices ut. Ut feugiat ullamcorper elit id rutrum. Integer tincidunt posuere sapien. Nunc augue dui, lobortis nec mattis ut, ullamcorper ac odio. Curabitur lorem lorem.</p>);

  const title_3 = (<>Let us digitalize education — together</>);

  const whyOptParagraphs = [
    <span key="p1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor. Morbi bibendum velit vel justo tristique dapibus et nec eros. Etiam lacinia, risus et elementum vehicula, justo justo pulvinar nunc, eu auctor massa turpis vel ex. <br /> <br />

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor. Morbi bibendum velit vel justo tristique dapibus et nec eros. Etiam lacinia, risus et elementum vehicula, justo justo pulvinar nunc, eu auctor massa turpis vel ex.</span>,
  ];

  const title_4 = (<>Why We Should Consider</>);

  const whyOptServices: ServiceCard[] = [
    {
      title: "website design",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
      textColor: "text-white",
      bgColor: "bg-[#141414]"
    },
    {
      title: "CRM Development",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
      textColor: "text-black",
      bgColor: "bg-[#E3E3E3]"
    },
    {
      title: "AR / VR",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
      textColor: "text-white",
      bgColor: "bg-[#141414]"
    },
    {
      title: "AI",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
      textColor: "text-black",
      bgColor: "bg-[#E3E3E3]"
    },
  ];

  const whyOptServices2: ServiceCard[] = [
    {
      title: "World-class Customer Support",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
      textColor: "text-white",
      bgColor: "bg-[#141414]"
    },
    {
      title: "Industry-Leading CMS",
      description: "Loved for its intuitive editing experience, freedom for developers, and seamless integrations, Umbraco unlocks a world of opportunities for your website - and your business.",
      textColor: "text-black",
      bgColor: "bg-[#E3E3E3]"
    },
    {
      title: "Create The Digital Platform You ",
      description: "CRM, ecommerce, campaign management, or analytics - Umbraco is fully extendable so you can add the tools you need to succeed with your project. Check out the Umbraco Marketplace to see what additional functionality you can add to Umbraco.",
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

  return (
    <main className="min-h-screen relative">

      <HeroBanner
        title="Banking goes digital"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor urna eu augue finibus pharetra. Proin faucibus mi eu velit hendrerit, id convallis neque varius. Nunc elementum erat quis mollis mattis. Etiam non mauris urna."
        titleMaxWidth="max-w-[750px] md:max-w-[900px]"
        descriptionMaxWidth="max-w-[750px] font-normal text-[14px] md:text-[20px] lg:text-[24px]"
        titleClassName="text-[28px] md:text-[60px] lg:text-[80px]"
        backgroundImage={flutterBannerImg3}
        showOverlay={true}
        gradientOverlay={false}
        stats={heroStats}
        className="h-[450px] md:h-[500px] lg:h-screen"
        minHeight="h-[450px] md:h-[500px] lg:h-screen"
        contentClassName="pt-20 pb-10 md:py-6 lg:py-0"
      />

      <SplitContentSection
        title={title}
        description={description}
        buttonText="CONTACT US"
        image={flutterAppImg5}
        imageAlt="Ecommerce App"
        layout="content-left"
        imageMaxWidth="max-w-full"
        imageClassName="md:max-w-full"
      />
      <AppWhyOpt
        title={title_3}
        services={whyOptServices}
      />
      <HeroBanner
        badge="FEBRURY 8, 2024"
        title="Unleashing the Power of Artificial Neural Networks: From Innovative Website Design to the Future of AI"
        titleClassName="text-[18px] md:text-[60px] lg:text-[80px]"
        description="In the rapidly evolving landscape of digital innovation, the past 24 months have witnessed remarkable strides, with artificial intelligence"
        buttonText="READ POST"
        titleMaxWidth="max-w-[990px]"
        descriptionMaxWidth="max-w-[980px] text-[10px] md:text-[20px] lg:text-[24px]"
        backgroundImage={flutter_app_1_banner_1}
        gradientOverlay={true}
        minHeight="auto"
        className="aspect-[16/9] md:aspect-[18/9]"
      />
      <Blogs />
      <OurClients />
      <OurWork
        title="OUR WORK"
        workItems={defaultWorkItems}
        ctaVariant="outline"
        className="bg-black"
        showCTA={true}
        ctaLabel="Let's Talk"
      />
      <AppWhyOpt
        title={title_4}
        paragraphs={whyOptParagraphs}
        services={whyOptServices2}
        videoSrc="/videos/animated_clip_2.mp4"
        videoTopOffset="-top-100"
        videoRightOffset="right-0 md:-left-70"
        videoPosition="left"
      />
      <Accordion />
      <ProjectContactForm />
    </main>
  );
}