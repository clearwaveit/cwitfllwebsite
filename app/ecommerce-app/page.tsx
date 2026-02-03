import PageBanner from "@/app/components/ui/PageBanner";
import SplitContentSection from "@/app/components/sections/SplitContentSection";
import IndustriesSection, { IndustryCard } from "@/app/components/sections/AppIndustriesSection";
import OurClients from "../components/sections/OurClients";
import AppWhyOpt, { ServiceCard } from "@/app/components/sections/AppWhyOpt";
import BusinessFeaturesSection, { BusinessFeature } from "@/app/components/sections/BusinessFeaturesSection";
import AppStatsSection from "@/app/components/sections/AppStatsSection";
import OurWork, { WorkItem } from "../components/sections/OurWork";
import ourWorkImg from "@/app/assets/imgs/our_work_img.png";
import ClientTestimonials from "../components/sections/ClientTestimonials";
import Accordion from "../components/sections/Accordion";
import ProjectContactForm from "../components/sections/ProjectContactForm";
import digitalPageBgImg from "@/app/assets/imgs/digital_page_bg_img.png";
import ecommerceAppImg from "@/app/assets/imgs/ecommerce_app.png";

export default function EcommerceAppPage() {
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
  const title = (<>Ecommerce Web Design Saudia Arabia: Online Store Design & Development</>);
  const description = (<p>Design and develop your dream eCommerce website in Saudi Arabia with Element8’s innovative solutions. While Element8 specializes in eCommerce web design Saudi Arabia and development, and functionality for your online store, we go beyond providing just simple manpower. At the end of the day, however, your store is yours alone and should follow your ideas and brand. As such, you have complete control over the layout of your site and can customize the visuals and content to your liking. Although we will build your site using Magento / Woo-commerce, the site itself is an extension of your idea. Therefore, it is you who has the most power in its implementation, not us.</p>);

  const ourServicesTitle = (<>Digital Marketing in search <br /> & social media</>);

  const whyOptParagraphs = [
    "The best and most obvious advantage of digital marketing is that it will require only a small fraction of what you would have normally paid for other forms of traditional marketing. The advantages however are totally unlimited: you can reach more customers, you can systematically draw in more potential buyers, you can target a specific clientele and you can be regarded as an authority in your field of work. But more traffic, more sales and authority cannot be obtained overnight and not without the right marketing mix. This is why you need a well-designed plan to start with.",
  ];

  const ourServicesParagraph = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. In urna dolor, interdum non turpis non, convallis molestie odio. Donec lacus eros, tincidunt et elit ut, pellentesque dapibus augue. Fusce turpis mauris, tempus vel nibh vel, congue consequat dui. Mauris non tortor sit amet mi finibus venenatis in vel diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi viverra in ipsum et ultricies. Cras varius mollis tempus. Praesent eu egestas mauris, mollis ultrices neque etiam a dictum velit."];

  const whyOptServices: ServiceCard[] = [
    {
      title: "Design & Identity",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
      textColor: "text-white",
      bgColor: "bg-[#141414]"
    },
    {
      title: "Paymentb Gateway Integration",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
      textColor: "text-black",
      bgColor: "bg-[#E3E3E3]"
    },
    {
      title: "Boost Organic traffic",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
      textColor: "text-white",
      bgColor: "bg-[#141414]"
    },
    {
      title: "Intelligent & Effective Operations",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
      textColor: "text-black",
      bgColor: "bg-[#E3E3E3]"
    },
  ];

  const industriesTitle = (<>Ecommerce web design <br /> Industries We Cater To</>);

  const industries: IndustryCard[] = [
    {
      title: "Architecture",
      description: "Enhancing digital interactions by focusing on intuitive interfaces and user-centric design principles.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "Automotive",
      description: "Creating visually appealing and functional websites through the process of designing and coding web content.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "Education",
      description: "Building dynamic and interactive online platforms that enable users to perform specific tasks or access various services.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "Fashion",
      description: "Developing online marketplaces where businesses can showcase and sell their products or services to a global audience.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "Gaming",
      description: "Implementing measures to protect digital systems, networks, and data from unauthorised access, attacks, and breaches.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "Retail",
      description: "Implementing measures to protect digital systems, networks, and data from unauthorised access, attacks, and breaches.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "Industrial",
      description: "Enhancing digital interactions by focusing on intuitive interfaces and user-centric design principles.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "Interior Design",
      description: "Creating visually appealing and functional websites through the process of designing and coding web content.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
    {
      title: "Tourism",
      description: "Building dynamic and interactive online platforms that enable users to perform specific tasks or access various services.",
      padding: "pb-6 md:pb-30 pt-6 md:pt-8 px-6 md:px-8",
    },
  ];

  const businessFeaturesTitle = "Run your business";

  const businessFeatures: BusinessFeature[] = [
    {
      heading: "International Payment Integration and Versatility",
      description: "We start with strategy, ensuring clearly defined goals and a messaging framework that will serve as the brand's foundation.",
    },
    {
      heading: "A Website Customized By You",
      description: "We start with strategy, ensuring clearly defined goals and a messaging framework that will serve as the brand's foundation.",
    },
    {
      heading: "Integration with a Retail Store",
      description: "We start with strategy, ensuring clearly defined goals and a messaging framework that will serve as the brand's foundation.",
    },
  ];

  return (
    <main className="min-h-screen relative">
      <PageBanner title="Ecommerce" minHeight="100vh" />
      <SplitContentSection
        title={title}
        description={description}
        buttonText="CONTACT US"
        image={ecommerceAppImg}
        imageAlt="Ecommerce App"
        layout="content-left"
        imageMaxWidth="max-w-full"
        imageClassName="md:max-w-full"
      />
      <IndustriesSection
        title={industriesTitle}
        industries={industries}
        buttonText="CONTACT US"
      />
      <OurClients />
      <AppWhyOpt
        title={ourServicesTitle}
        paragraphs={whyOptParagraphs}
        backgroundImage={digitalPageBgImg}
        backgroundImageAlt="Background"
        backgroundImageClassName="object-contain"
        contentMaxWidth="max-w-[1060px]"
      />
      <AppWhyOpt
        title="Our Services"
        paragraphs={ourServicesParagraph}
        services={whyOptServices}
        buttonText="CONTACT US"
      />
      <OurWork
        title="OUR WORK"
        workItems={defaultWorkItems}
        ctaVariant="outline"
        className="bg-black"
        showCTA={true}
      />
      <BusinessFeaturesSection
        title={businessFeaturesTitle}
        features={businessFeatures}
        videoSrc="/videos/animated_clip_2.mp4"
        containerClassName="max-w-[1634px] mx-auto"
      />
      <AppStatsSection />
      <ClientTestimonials />
      <Accordion />
      <ProjectContactForm />
    </main>
  );
}