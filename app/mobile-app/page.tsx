import PageBanner from "@/app/components/ui/PageBanner";
import AppStartToEnd from "@/app/components/sections/AppStartToEnd";
import IndustriesSection, { IndustryCard } from "@/app/components/sections/AppIndustriesSection";
import OurClients from "../components/sections/OurClients";
import AppWhyOpt, { ServiceCard } from "@/app/components/sections/AppWhyOpt";
import TechnologiesSection, { TechnologyCard } from "@/app/components/sections/AdvancedTechnologies";
import MobileAppStats from "@/app/components/sections/AppStatsSection";
import OurWork, { WorkItem } from "../components/sections/OurWork";
import ourWorkImg from "@/app/assets/imgs/our_work_img.png";
import ClientTestimonials from "../components/sections/ClientTestimonials";
import Accordion from "../components/sections/Accordion";
import ProjectContactForm from "../components/sections/ProjectContactForm";
import Footer from "../components/sections/Footer";
import flutterIcon from "@/app/assets/imgs/flutter.png";
import cloudIcon from "@/app/assets/imgs/cloud.png";
import aiMlIcon from "@/app/assets/imgs/ai-ml.png";
import blockchainIcon from "@/app/assets/imgs/blockchain.png";
import arVrMrIcon from "@/app/assets/imgs/ar-vr-mr.png";
import iotIcon from "@/app/assets/imgs/iot.png";

export default function MobileAppPage() {
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

    const title = (<>Start-to-end Mobile App Development Company Saudi Arabia</>);

    const whyOptParagraphs = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor. Morbi bibendum velit vel justo tristique dapibus et nec eros. Etiam lacinia, risus et elementum vehicula, justo justo pulvinar nunc, eu auctor massa turpis vel ex.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor. Morbi bibendum velit vel justo tristique dapibus et nec eros. Etiam lacinia, risus et elementum vehicula, justo justo pulvinar nunc, eu auctor massa turpis vel ex.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor. Morbi bibendum velit vel justo tristique dapibus et nec eros. Etiam lacinia, risus et elementum vehicula, justo justo pulvinar nunc, eu auctor massa turpis vel ex.",
    ];

    const whyOptServices: ServiceCard[] = [
        {
            title: "Product And Market Strategy",
            description: "Enhancing digital interactions by focusing on intuitive interfaces and user-centric design principles.",
            textColor: "text-white",
            bgColor: "bg-[#141414]"
        },
        {
            title: "Native App Development",
            description: "Enhancing digital interactions by focusing on intuitive interfaces and user-centric design principles.",
            textColor: "text-black",
            bgColor: "bg-[#E3E3E3]"
        },
        {
            title: "Ui/Ux Design",
            description: "Creating visually appealing and functional websites through the process of designing and coding web content.",
            textColor: "text-white",
            bgColor: "bg-[#141414]"
        },
        {
            title: "QA And Testing",
            description: "Developing online marketplaces where businesses can showcase and sell their products or services to a global audience.",
            textColor: "text-black",
            bgColor: "bg-[#E3E3E3]"
        },
    ];

    const industriesTitle = (<>Mobile App Development <br /> Industries We Cater To</>);

    const industries: IndustryCard[] = [
        {
            title: "On-Demand",
            description: "Enhancing digital interactions by focusing on intuitive interfaces and user-centric design principles.",
        },
        {
            title: "Ecommerce",
            description: "Creating visually appealing and functional websites through the process of designing and coding web content.",
        },
        {
            title: "Restaurant",
            description: "Building dynamic and interactive online platforms that enable users to perform specific tasks or access various services.",
        },
        {
            title: "Event",
            description: "Developing online marketplaces where businesses can showcase and sell their products or services to a global audience.",
        },
        {
            title: "Travel",
            description: "Implementing measures to protect digital systems, networks, and data from unauthorised access, attacks, and breaches.",
        },
        {
            title: "Game App",
            description: "Implementing measures to protect digital systems, networks, and data from unauthorised access, attacks, and breaches.",
        },
    ];

    const technologiesTitle = "Advanced Technologies We Work With";

    const technologies: TechnologyCard[] = [
        {
            icon: cloudIcon,
            title: "Cloud Computing",
            description: "Lorem ipsum dolor amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor.",
            width: "w-[439px]",
            height: "h-[280px]",
            offset: "md:mt-0",
        },
        {
            icon: aiMlIcon,
            title: "AI/ML",
            description: "Lorem ipsum dolor amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor.",
            width: "w-[286px]",
            height: "h-[359px]",
            offset: "md:-mt-8",
        },
        {
            icon: blockchainIcon,
            title: "Blockchain",
            description: "Lorem ipsum dolor amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor.",
            width: "w-[439px]",
            height: "h-[280px]",
            offset: "md:mt-4",
        },
        {
            icon: arVrMrIcon,
            title: "AR/VR/MR",
            description: "Lorem ipsum dolor amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor.",
            width: "w-[286px]",
            height: "h-[359px]",
            offset: "md:-mt-12",
        },
        {
            icon: iotIcon,
            title: "IoT",
            description: "Lorem ipsum dolor amet, consectetur adi elit. Sed posuere velit aliquet suscipit vol. Curabitur iaculis ornare est. Vivamus ege turpis convallis tempor.",
            width: "w-[439px]",
            height: "h-[280px]",
            offset: "md:mt-6",
        },
    ];

    return (
        <main className="min-h-screen relative">
            <PageBanner title="Mobile Apps" minHeight="100vh" />
            <AppStartToEnd
                title={title}
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit aliquet suscipit volutpat. Curabitur iaculis ornare est. Vivamus eget nisi in turpis convallis tempor. Morbi bibendum velit vel justo tristique dapibus et nec eros. Etiam lacinia, risus et elementum vehicula, justo justo pulvinar nunc, eu auctor massa turpis vel ex."
                buttonText="CONTACT US"
            />
            <IndustriesSection
                title={industriesTitle}
                industries={industries}
                buttonText="CONTACT US"
            />
            <OurClients />
            <AppWhyOpt
                title="Mobile App Development Saudi Arabia - Why Opt For Element8?"
                paragraphs={whyOptParagraphs}
                services={whyOptServices}
                buttonText="CONTACT US"
                icon={flutterIcon}
                iconAlt="flutter icon"
            />
            <OurWork
                title="OUR WORK"
                workItems={defaultWorkItems}
                ctaVariant="outline"
                className="bg-black"
                showCTA={true}
            />
            <TechnologiesSection
                title={technologiesTitle}
                technologies={technologies}
            />
            <MobileAppStats />
            <ClientTestimonials />
            <Accordion />
            <ProjectContactForm />
            {/* <Footer /> */}
        </main>
    );
}