import PageBanner from "@/app/components/ui/PageBanner";
import AppStartToEnd from "@/app/components/sections/AppStartToEnd";
import IndustriesSection, { IndustryCard } from "@/app/components/sections/AppIndustriesSection";
import OurClients from "../components/sections/OurClients";
import AppWhyOpt, { ServiceCard } from "@/app/components/sections/AppWhyOpt";
import TechnologiesSection, { TechnologyCard } from "@/app/components/sections/AdvancedTechnologies";
import AppStatsSection from "@/app/components/sections/AppStatsSection";
import OurWork, { WorkItem } from "../components/sections/OurWork";
import ourWorkImg from "@/app/assets/imgs/our_work_img.png";
import ClientTestimonials from "../components/sections/ClientTestimonials";
import Accordion from "../components/sections/Accordion";
import ProjectContactForm from "../components/sections/ProjectContactForm";
import Footer from "../components/sections/Footer";
import web_build_1 from "@/app/assets/imgs/web_build_1.png";
import wagtailIcon from "@/app/assets/imgs/wagtail.png";
import nextjsIcon from "@/app/assets/imgs/nextjs.png";
import wordpressVipIcon from "@/app/assets/imgs/wordpress.png";
import umbracoIcon from "@/app/assets/imgs/umbraco.png";
import nodejsIcon from "@/app/assets/imgs/nodejs.png";
import ProcessSection, { ProcessStep } from "../components/sections/ProcessSection";

export default function LogoAppPage() {
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
    const title = (<>We are a creative agency specializing in brand consulting, based in Saudi Arabia.</>);
    const description = (<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor. Morbi bibendum velit vel justo tristique dapibus et nec eros. Etiam lacinia, risus et elementum vehicula, justo justo pulvinar nunc, eu auctor massa turpis vel ex.</p>);

    const whyOptParagraphs = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor. Morbi bibendum velit vel justo tristique dapibus et nec eros.",

        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor. Morbi bibendum velit vel justo tristique dapibus et nec eros. Etiam lacinia, risus et elementum vehicula, justo justo pulvinar nunc, eu auctor massa turpis vel ex.",

        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est vivamus eget.",
    ];

    const whyOptServices: ServiceCard[] = [
        {
            title: "Company Logo",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit cras bibendum imperdiet purus, ut laoreet orci.",
            textColor: "text-white",
            bgColor: "bg-[#141414]"
        },
        {
            title: "Packaging Logo",
            description: "Enhancing digital interactions by focusing on intuitive interfaces and user-centric design principles.",
            textColor: "text-black",
            bgColor: "bg-[#E3E3E3]"
        },
        {
            title: "Corporate Identity",
            description: "Creating visually appealing and functional websites through the process of designing and coding web content.",
            textColor: "text-white",
            bgColor: "bg-[#141414]"
        },
        {
            title: "Business card",
            description: "Developing online marketplaces where businesses can showcase and sell their products or services to a global audience.",
            textColor: "text-black",
            bgColor: "bg-[#E3E3E3]"
        },
    ];

    const industriesTitle = (<>Logo Design Development <br /> Industries We Cater To</>);

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

    const processSteps: ProcessStep[] = [
        {
            number: "1.",
            title: "Think",
            description: "We start with strategy, ensuring clearly defined goals and a messaging framework that will serve as the brand’s foundation.",
        },
        {
            number: "2.",
            title: "Create",
            description: "We start with strategy, ensuring clearly defined goals and a messaging framework that will serve as the brand’s foundation.",
        },
        {
            number: "3.",
            title: "Connect",
            description: "We start with strategy, ensuring clearly defined goals and a messaging framework that will serve as the brand’s foundation.",
        },
    ];

    const technologies: TechnologyCard[] = [
        {
            icon: wagtailIcon,
            title: "Wagtail",
            description: "Lorem ipsum dolor amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor.",
            width: "w-[439px]",
            height: "h-[280px]",
            offset: "md:mt-0",
        },
        {
            icon: nextjsIcon,
            title: "Next.js",
            description: "Lorem ipsum dolor amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor.",
            width: "w-[286px]",
            height: "h-[359px]",
            offset: "md:-mt-8",
        },
        {
            icon: wordpressVipIcon,
            title: "WordPress VIP",
            description: "Lorem ipsum dolor amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor.",
            width: "w-[439px]",
            height: "h-[280px]",
            offset: "md:mt-4",
        },
        {
            icon: umbracoIcon,
            title: "Umbraco",
            description: "Lorem ipsum dolor amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor.",
            width: "w-[286px]",
            height: "h-[359px]",
            offset: "md:-mt-12",
        },
        {
            icon: nodejsIcon,
            title: "Node.js",
            description: "Lorem ipsum dolor amet, consectetur adi elit. Sed posuere velit aliquet suscipit vol. Curabitur iaculis ornare est. Vivamus ege turpis convallis tempor.",
            width: "w-[439px]",
            height: "h-[280px]",
            offset: "md:mt-6",
        },
    ];

    return (
        <main className="min-h-screen relative">
            <PageBanner title="Logo Design" minHeight="100vh" />
            <AppStartToEnd
                title={title}
                description={description}
                buttonText="CONTACT US"
            />
            <IndustriesSection
                title={industriesTitle}
                industries={industries}
                buttonText="CONTACT US"
            />
            <OurClients />
            <AppWhyOpt
                title="We are a Brand Consulting and Creative Agency Saudi Arabia - Why Opt or Element8?"
                paragraphs={whyOptParagraphs}
                services={whyOptServices}
                buttonText="CONTACT US"
                icon={web_build_1}
                iconAlt="web development icon"
            />
            <OurWork
                title="OUR WORK"
                workItems={defaultWorkItems}
                ctaVariant="outline"
                className="bg-black"
                showCTA={true}
            />
            {/* <TechnologiesSection
                title={technologiesTitle}
                technologies={technologies}
            /> */}
            <ProcessSection
                title="Our Process"
                steps={processSteps}
            />
            <AppStatsSection />
            <ClientTestimonials />
            <Accordion />
            <ProjectContactForm />
            <Footer />
        </main>
    );
}