import PageBanner from "@/app/components/ui/PageBanner";
import AppStartToEnd, { FeatureCard } from "@/app/components/sections/AppStartToEnd";
import OurClients from "../components/sections/OurClients";
import OurWork, { WorkItem } from "../components/sections/OurWork";
import ourWorkImg from "@/app/assets/imgs/our_work_img.png";
import ClientTestimonials from "../components/sections/ClientTestimonials";
import Accordion from "../components/sections/Accordion";
import ProjectContactForm from "../components/sections/ProjectContactForm";
import IndustriesSection, { IndustryCard } from "../components/sections/AppIndustriesSection";
import AppWhyOpt, { ServiceCard } from "../components/sections/AppWhyOpt";

export default function SalesforcePage() {
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
  const title = (<>Salesforce Development Services for Partners and Customers</>);
  const description = (<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor urna eu augue finibus pharetra. Proin faucibus mi eu velit hendrerit, id convallis neque varius. Nunc elementum erat quis mollis mattis. Etiam non mauris urna. Vivamus egestas porta felis, a maximus turpis ultrices ut. Ut feugiat ullamcorper elit id rutrum. Integer tincidunt posuere sapien. Nunc augue dui, lobortis nec mattis ut, ullamcorper ac odio. Curabitur lorem lorem.</p>);

  const industriesDescription = (<>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor urna eu augue finibus pharetra. Proin faucibus mi eu <br />  velit hendrerit, id convallis neque varius. Nunc elementum erat quis mollis mattis. Etiam non mauris urna. Vivamus egestas <br /> porta felis, a maximus turpis ultrices ut. Ut feugiat ullamcorper elit id rutrum. Integer tincidunt posuere sapien. Nunc augue <br /> dui, lobortis nec mattis ut, ullamcorper ac odio. Curabitur lorem lorem.</>);

  const title_2 = (<>Salesforce Development Services to
    <br /> match your needs</>);
  const description_2 = (<p>that engages, entices and empowers… <br /> <br />

    Build trust, grow a community, inspire, educate and entertain with Social Media Marketing. We are a social media <br /> digital marketing company Saudi Arabia KSA that harnesses the power of social. From elevating customer service <br /> through Community Management to enticing new leads through Social Media Ads, we use the right platforms <br /> consistently and carefully. We understand your challenges and your opportunities so that we can leverage social <br /> media effectively, within the context of trends and your own goals.</p>);
  const title_3 = (<>Why We Should Consider Salesforce?</>);

  const industriesTitle = (<>Salesforce services</>);

  const industries: IndustryCard[] = [
    {
      title: "Salesforce Platform",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor urna eu augue finibus pharetra. Proin faucibus mi eu velit hendrerit, id convallis neque varius. Nunc elementum erat quis mollis mattis. Etiam non mauris urna. Vivamus egestas porta felis.",
    },
    {
      title: "Marketing Cloud",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor urna eu augue finibus pharetra. Proin faucibus mi eu velit hendrerit, id convallis neque varius. Nunc elementum erat quis mollis mattis. Etiam non mauris urna. Vivamus egestas porta felis.",
    },
    {
      title: "Education",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor urna eu augue finibus pharetra. Proin faucibus mi eu velit hendrerit, id convallis neque varius. Nunc elementum erat quis mollis mattis. Etiam non mauris urna. Vivamus egestas porta felis.",
    },
  ];

  const featureCards_2: FeatureCard[] = [
    {
      title: "Team",
      description: "We make your audience engage and interact. We use social media to forge connections and engagement with your brand. From sparking interest to informatively educating, we take the right approach.",
    },
    {
      title: "Single Expert",
      description: "We put you in control of your brand. With us, social media won’t become an unwieldy beast that you can’t tame, but instead a rewarding partner that keeps on giving.",
    },
    {
      title: "Dedicated service",
      description: "We drive the connections which serve your business. We integrate our knowledge and expertise with a bespoke content approach for your business.",
    },
  ];

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
      <PageBanner title="Salesforce" minHeight="100vh" />
      <AppStartToEnd
        title={title}
        description={description}
        buttonText="CONTACT US"
        contentMaxWidth="max-w-full"
      />
      <IndustriesSection
        title={industriesTitle}
        description={industriesDescription}
        industries={industries}
        buttonText="CONTACT US"
      />
      <OurClients />
      <AppStartToEnd
        title={title_2}
        description={description_2}
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