import PageBanner from "@/app/components/ui/PageBanner";
import OurClients from "../components/sections/OurClients";
import AppWhyOpt, { ServiceCard } from "@/app/components/sections/AppWhyOpt";
import BusinessFeaturesSection, { BusinessFeature } from "@/app/components/sections/BusinessFeaturesSection";
import ClientTestimonials from "../components/sections/ClientTestimonials";
import Accordion from "../components/sections/Accordion";
import ProjectContactForm from "../components/sections/ProjectContactForm";
import Footer from "../components/sections/Footer";
import flutterAppImg from "@/app/assets/imgs/flutter_app.png";
import AppStartToEnd, { FeatureCard } from "../components/sections/AppStartToEnd";

export default function FlutterAppPage() {

  const businessFeaturesTitle = "Top Flutter App Development Company in Riyadh, Saudi";

  const businessFeatures: BusinessFeature[] = [
    {
      heading: "",
      description: "Flutter app development is an innovative approach enabling the creation of visually stunning, natively compiled applications for mobile, web, and desktop from a single codebase. Developed by Google, Flutter stands out for its fast development cycles, expressive and flexible UI, and ability to deploy across multiple platforms with seamless performance, making it a top choice for developers worldwide.",
    },
  ];

  const title_3 = (<>Our Flutter App Development <br /> Services in Saudi:</>);

  const whyOptParagraphs = [
    <span key="p1">Let's explore the compelling advantages of Flutter that secure its position as a top preference for developers for<br />cross-platform app development.</span>,
  ];

  const whyOptServices: ServiceCard[] = [
    {
      title: "UI/UX Design and Development",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
      textColor: "text-white",
      bgColor: "bg-[#141414]"
    },
    {
      title: "Cross-platform Flutter App Development",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
      textColor: "text-black",
      bgColor: "bg-[#E3E3E3]"
    },
    {
      title: "Existing App Migration",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
      textColor: "text-white",
      bgColor: "bg-[#141414]"
    },
    {
      title: "Feature Development",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
      textColor: "text-black",
      bgColor: "bg-[#E3E3E3]"
    },
    {
      title: "API Integration",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
      textColor: "text-black",
      bgColor: "bg-[#E3E3E3]"
    },
    {
      title: "Firebase Integration",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
      textColor: "text-white",
      bgColor: "bg-[#141414]"
    },
    {
      title: "Flutter App Integrations",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
      textColor: "text-black",
      bgColor: "bg-[#E3E3E3]"
    },
    {
      title: "Bug Fixes and Maintenance Services",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
      textColor: "text-white",
      bgColor: "bg-[#141414]"
    },
  ];

  const title_2 = (<>Why choose Flutter App <br /> Development?</>);

  const featureCards_2: FeatureCard[] = [
    {
      title: "Backed by Big Names",
      description: "Google's support and adoption by giants like BMW and Alibaba highlight Flutter's reliability and efficiency.",
    },
    {
      title: "Unified Codebase, Multiple Platforms",
      description: "Flutter's single codebase facilitates app deployment across various platforms, streamlining development and maintenance processes.",
    },
    {
      title: "High Performance",
      description: "Direct native code translation ensures Flutter apps launch swiftly, offering a smooth, lag-free user experience.",
    },
    {
      title: "Vibrant Open Source Community",
      description: "A robust community contributes tools and support, continuously enhancing Flutter's capabilities and developer resources.",
    },
    {
      title: "Superior Compatibility",
      description: "Flutter's unique widget-based system minimizes cross-OS version issues, ensuring consistent app performance.",
    },
    {
      title: "Cost-Effective Development",
      description: "A singular codebase reduces team size and resource needs, making Flutter an economical choice for app development.",
    },
  ];

  return (
    <main className="min-h-screen relative">
      <PageBanner title="Flutter App" minHeight="100vh" />
      <BusinessFeaturesSection
        title={businessFeaturesTitle}
        features={businessFeatures}
        imageSrc={flutterAppImg}
        buttonText="CONTACT US"
        containerClassName="max-w-[1634px] mx-auto"
      />
      <AppWhyOpt
        title={title_3}
        services={whyOptServices}
      />
      <OurClients />
      <AppStartToEnd
        title={title_2}
        description={whyOptParagraphs}
        videoSrc="/videos/animated_clip_2.mp4"
        buttonText="CONTACT US"
        layout="with-cards"
        cards={featureCards_2}
        contentMaxWidth="max-w-full"
        videoTopOffset="-top-170"
        videoRightOffset="right-0 md:-right-60"
        padding="py-20 md:py-30"
        videoPosition="right"
      />
      <ClientTestimonials />
      <Accordion />
      <ProjectContactForm />
      <Footer />
    </main>
  );
}