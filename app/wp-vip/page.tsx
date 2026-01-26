import PageBanner from "@/app/components/ui/PageBanner";
import SplitContentSection from "@/app/components/sections/SplitContentSection";
import IndustriesSection, { IndustryCard } from "@/app/components/sections/AppIndustriesSection";
import OurClients from "../components/sections/OurClients";
import OurWork, { WorkItem } from "../components/sections/OurWork";
import ourWorkImg from "@/app/assets/imgs/our_work_img.png";
import ClientTestimonials from "../components/sections/ClientTestimonials";
import Accordion from "../components/sections/Accordion";
import ProjectContactForm from "../components/sections/ProjectContactForm";
import Footer from "../components/sections/Footer";
import wpVipImg from "@/app/assets/imgs/wp_vip.png";
import AppStartToEnd, { FeatureCard } from "../components/sections/AppStartToEnd";

export default function WpVipPage() {
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
    const title = (<>WordPress VIP Puts Content At The Core</>);
    const description = (<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor urna eu augue finibus pharetra. Proin faucibus mi eu velit hendrerit, id convallis neque varius. Nunc elementum erat quis mollis mattis. Etiam non mauris urna. Vivamus egestas porta felis, a maximus turpis ultrices ut. Ut feugiat ullamcorper elit id rutrum. Integer tincidunt posuere sapien. Nunc augue dui, lobortis nec mattis ut, ullamcorper ac odio. Curabitur lorem lorem, lacinia at metus at, facilisis faucibus nisi. Nam vulputate vehicula tempus. Phasellus laoreet aliquam turpis ut fermentum. Nam euismod enim non tellus elementum egestas. Suspendisse at tortor condimentum, vehicula velit vitae, eleifend diam. Duis gravida nulla ac arcu rutrum, sed faucibus ante lacinia. Quisque molestie velit vitae mi scelerisque venenatis.</p>);

    const industriesTitle = (<>WordPress VIP Differentiators <br /> And Value Offering</>);

    const industriesDescription = (<>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor urna eu augue finibus pharetra. Proin <br /> faucibus mi eu velit hendrerit, id convallis neque varius. Nunc elementum erat quis mollis mattis. Etiam non mauris <br /> urna. Vivamus egestas porta felis, a maximus turpis ultrices ut. Ut feugiat ullamcorper elit id rutrum. Integer <br /> tincidunt posuere sapien. Nunc augue dui, lobortis nec mattis ut, ullamcorper ac odio. Curabitur lorem lorem.</>);

    const industries: IndustryCard[] = [
        {
            title: "Excellent Publication Tool With WordPress CMS",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor urna eu augue finibus pharetra. Proin faucibus mi eu velit hendrerit, id convallis neque varius. Nunc elementum erat quis mollis mattis. Etiam non mauris urna. Vivamus egestas porta felis.",
            padding: "pb-6 md:pb-20 pt-6 md:pt-8 px-6 md:px-8",
        },
        {
            title: "WordPress VIP Cloud",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor urna eu augue finibus pharetra. Proin faucibus mi eu velit hendrerit, id convallis neque varius. Nunc elementum erat quis mollis mattis. Etiam non mauris urna. Vivamus egestas porta felis.",
            padding: "pb-6 md:pb-20 pt-6 md:pt-8 px-6 md:px-8",
        },
        {
            title: "Open DxP and Best of Breed Integration",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor urna eu augue finibus pharetra. Proin faucibus mi eu velit hendrerit, id convallis neque varius. Nunc elementum erat quis mollis mattis. Etiam non mauris urna. Vivamus egestas porta felis.",
            padding: "pb-6 md:pb-20 pt-6 md:pt-8 px-6 md:px-8",
        },
    ];

    const title_2 = (<>WordPress VIP puts content at the core</>);

    const featureCards_2: FeatureCard[] = [
        {
            title: "End-to-end",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor urna eu augue finibus pharetra. Proin faucibus mi eu velit hendrerit.",
        },
        {
            title: "Content agility",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor urna eu augue finibus pharetra. Proin faucibus mi eu velit hendrerit.",
        },
        {
            title: "Instant insights",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor urna eu augue finibus pharetra. Proin faucibus mi eu velit hendrerit.",
        },
    ];

    return (
        <main className="min-h-screen relative">
            <PageBanner title="WP VIP" minHeight="100vh" />
            <SplitContentSection
                title={title}
                description={description}
                buttonText="CONTACT US"
                image={wpVipImg}
                imageAlt="WP VIP"
                layout="content-left"
                imageMaxWidth="max-w-full"
                imageClassName="md:max-w-full"
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
            <ClientTestimonials />
            <Accordion />
            <ProjectContactForm />
            <Footer />
        </main>
    );
}