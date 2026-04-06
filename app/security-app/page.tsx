import PageBanner from "@/app/components/ui/PageBanner";
import AppStartToEnd from "@/app/components/sections/AppStartToEnd";
import IndustriesSection, { IndustryCard } from "@/app/components/sections/AppIndustriesSection";
import OurClients from "../components/sections/OurClients";
import AppWhyOpt, { ServiceCard } from "@/app/components/sections/AppWhyOpt";
import MobileAppStats from "@/app/components/sections/AppStatsSection";
import OurWork, { WorkItem } from "../components/sections/OurWork";
import ourWorkImg from "@/app/assets/imgs/our_work_img.png";
import ClientTestimonials from "../components/sections/ClientTestimonials";
import Accordion from "../components/sections/Accordion";
import ProjectContactForm from "../components/sections/ProjectContactForm";
import web_build_1 from "@/app/assets/imgs/web_build_1.png";

export default function SecurityAppPage() {
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

  const title = (<>Cyber Security Consulting Company in Saudi Arabia</>);

  const whyOptParagraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In urna dolor, interdum non turpis non, convallis molestie odio. Donec lacus eros, tincidunt et elit ut, pellentesque dapibus augue. Fusce turpis mauris, tempus vel nibh vel, congue consequat dui. Mauris non tortor sit amet mi finibus venenatis in vel diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi viverra in ipsum et ultricies. Cras varius mollis tempus. Praesent eu egestas mauris, mollis ultrices neque etiam a dictum velit.",
  ];

  const whyOptServices: ServiceCard[] = [
    {
      title: "Creative Strategy",
      description: "Enhancing digital interactions by focusing on intuitive interfaces and user-centric design principles.",
      textColor: "text-white",
      bgColor: "bg-[#141414]"
    },
    {
      title: "Web Development",
      description: "Enhancing digital interactions by focusing on intuitive interfaces and user-centric design principles.",
      textColor: "text-black",
      bgColor: "bg-[#E3E3E3]"
    },
    {
      title: "Digital Marketing",
      description: "Creating visually appealing and functional websites through the process of designing and coding web content.",
      textColor: "text-white",
      bgColor: "bg-[#141414]"
    },
    {
      title: "Business Solutions",
      description: "Developing online marketplaces where businesses can showcase and sell their products or services to a global audience.",
      textColor: "text-black",
      bgColor: "bg-[#E3E3E3]"
    },
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

  return (
    <main className="min-h-screen relative">
      <PageBanner title="Security" minHeight="100vh" />
      <AppStartToEnd
        title={title}
        description="We’ll keep your data safe and help you feel at ease with our extensive cyber defense services. In addition, we’ll assess your vulnerabilities and craft appropriate security measures to protect your IT infrastructure. We provide expert solutions to safeguard your digital assets with Element8, one of the leading cyber security company in Saudi Arabia. Protect your business with us today."
        buttonText="CONTACT US"
        videoMaxWidth="max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] 2xl:max-w-[900px]"
        className="bg-black"
      />
      <IndustriesSection
        title={industriesTitle}
        industries={industries}
        buttonText="CONTACT US"
      />
      <OurClients />
      <AppWhyOpt
        title="Our Services"
        paragraphs={whyOptParagraphs}
        services={whyOptServices}
        buttonText="CONTACT US"
        icon={web_build_1}
        iconAlt="flutter icon"
      />
      <OurWork
        title="OUR WORK"
        workItems={defaultWorkItems}
        ctaVariant="outline"
        className="bg-black"
        showCTA={true}
        ctaLabel="Let's Talk"
      />
      <MobileAppStats />
      <ClientTestimonials />
      <Accordion />
      <ProjectContactForm />
    </main>
  );
}