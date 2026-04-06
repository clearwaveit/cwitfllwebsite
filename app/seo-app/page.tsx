import PageBanner from "@/app/components/ui/PageBanner";
import AppStartToEnd from "@/app/components/sections/AppStartToEnd";
import IndustriesSection, { IndustryCard } from "@/app/components/sections/AppIndustriesSection";
import OurClients from "../components/sections/OurClients";
import AppWhyOpt from "@/app/components/sections/AppWhyOpt";
import TechnologiesSection, { TechnologyCard } from "@/app/components/sections/AdvancedTechnologies";
import AppStatsSection from "@/app/components/sections/AppStatsSection";
import OurWork, { WorkItem } from "../components/sections/OurWork";
import ourWorkImg from "@/app/assets/imgs/our_work_img.png";
import ClientTestimonials from "../components/sections/ClientTestimonials";
import Accordion from "../components/sections/Accordion";
import ProjectContactForm from "../components/sections/ProjectContactForm";
import digitalPageBgImg from "@/app/assets/imgs/digital_page_bg_img.png";
import cloudIcon from "@/app/assets/imgs/cloud.png";

export default function SeoAppPage() {
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
  const title = (<>Increase your revenuewith a winning SEO Agency Saudi Arabia</>);
  const description = (<p>Element 8 is a leading SEO agency Saudi Arabia offering fresh, innovative, and effective digital solutions that generate a high ROI. If you have reached our website in a sea of hundreds and thousands of other websites, our search engine optimization in Saudi Arabia must be really good!</p>);

  const whyOptParagraphs = [
    "SEO, if done right, can lead the path to marketing success and high ROI. Instead of producing results only as fancy numbers, Element8 specializes in providing best SEO services in Saudi Arabia UAE, focusing on establishing your brand in the market by optimizing your website and incorporating customized and effective SEO strategies.",

    "Resultantly, the clients of Element 8 have registered tremendous growth, and so have we! The credit goes to our best SEO expert Saudi Arabia dedicated team, who have developed and implemented multiple winning SEO strategies to improve web rankings for our clients.",

    "With such an enthusiastic team of search marketing experts and top-notch search engine optimisation Saudi Arabia services, we cater to multiple businesses globally across varying niches and languages.",
  ];

  const industriesTitle = (<>SEO Industries We Cater To</>);

  const industries: IndustryCard[] = [
    {
      title: "Travel & Leisure",
      description: "Enhancing digital interactions by focusing on intuitive interfaces and user-centric design principles.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "Finance",
      description: "Creating visually appealing and functional websites through the process of designing and coding web content.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "Education",
      description: "Building dynamic and interactive online platforms that enable users to perform specific tasks or access various services.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "Fashion & Beauty",
      description: "Developing online marketplaces where businesses can showcase and sell their products or services to a global audience.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "Techs",
      description: "Implementing measures to protect digital systems, networks, and data from unauthorised access, attacks, and breaches.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "F&B",
      description: "Implementing measures to protect digital systems, networks, and data from unauthorised access, attacks, and breaches.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "Industrial",
      description: "Enhancing digital interactions by focusing on intuitive interfaces and user-centric design principles.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "Healthcare",
      description: "Creating visually appealing and functional websites through the process of designing and coding web content.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "Property & Real Estate",
      description: "Building dynamic and interactive online platforms that enable users to perform specific tasks or access various services.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
  ];

  const technologiesTitle = "Advanced Technologies We Work With";

  const technologies: TechnologyCard[] = [
    {
      icon: cloudIcon,
      title: "On-Page Optimization",
      description: "Lorem ipsum dolor amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor.",
      width: "w-[439px]",
      height: "h-[280px]",
      offset: "md:mt-0",
    },
    {
      // icon: nextjsIcon,
      title: "Off-Page Optimization",
      description: "Lorem ipsum dolor amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor.",
      width: "w-[286px]",
      height: "h-[359px]",
      offset: "md:-mt-8",
    },
    {
      // icon: wordpressVipIcon,
      title: "Technical SEO",
      description: "Lorem ipsum dolor amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor.",
      width: "w-[439px]",
      height: "h-[280px]",
      offset: "md:mt-4",
    },
    {
      // icon: umbracoIcon,
      title: "Website Audit",
      description: "Lorem ipsum dolor amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor.",
      width: "w-[286px]",
      height: "h-[359px]",
      offset: "md:-mt-12",
    },
    {
      // icon: nodejsIcon,
      title: "Competitor Analysis",
      description: "Lorem ipsum dolor amet, consectetur adi elit. Sed posuere velit aliquet suscipit vol. Curabitur iaculis ornare est. Vivamus ege turpis convallis tempor.",
      width: "w-[439px]",
      height: "h-[280px]",
      offset: "md:mt-6",
    },
  ];

  return (
    <main className="min-h-screen relative">
      <PageBanner title="SEO" minHeight="100vh" />
      <AppStartToEnd
        title={title}
        description={description}
        buttonText="CONTACT US"
        videoMaxWidth="max-w-[900px]"
        className="bg-black"
      />
      <IndustriesSection
        title={industriesTitle}
        industries={industries}
        buttonText="CONTACT US"
      />
      <OurClients />
      <AppWhyOpt
        title="SEO Services in Saudi arabia"
        paragraphs={whyOptParagraphs}
        backgroundImage={digitalPageBgImg}
        backgroundImageAlt="Background"
        backgroundImageClassName="object-contain"
      />
      <OurWork
        title="OUR WORK"
        workItems={defaultWorkItems}
        ctaVariant="outline"
        className="bg-black"
        showCTA={true}
        ctaLabel="Let's Talk"
      />
      <TechnologiesSection
        title={technologiesTitle}
        technologies={technologies}
      />
      <AppStatsSection />
      <ClientTestimonials />
      <Accordion />
      <ProjectContactForm />
    </main>
  );
}