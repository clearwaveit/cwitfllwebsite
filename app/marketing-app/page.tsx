import PageBanner from "@/app/components/ui/PageBanner";
import AppStartToEnd, { FeatureCard } from "@/app/components/sections/AppStartToEnd";
import OurClients from "../components/sections/OurClients";
import BusinessFeaturesSection, { BusinessFeature } from "@/app/components/sections/BusinessFeaturesSection";
import AppStatsSection from "@/app/components/sections/AppStatsSection";
import OurWork, { WorkItem } from "../components/sections/OurWork";
import ourWorkImg from "@/app/assets/imgs/our_work_img.png";
import ClientTestimonials from "../components/sections/ClientTestimonials";
import Accordion from "../components/sections/Accordion";
import ProjectContactForm from "../components/sections/ProjectContactForm";
import Footer from "../components/sections/Footer";
import beforeImg from "@/app/assets/imgs/__before.png";

export default function MarketingAppPage() {
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
    const title = (<>Best Digital Marketing Agency in Saudi <br /> Arabia</>);
    const description = (<p>We’ll keep your data safe and help you feel at ease with our extensive cyber defense services. In addition, we’ll <br /> assess your vulnerabilities and craft appropriate security measures to protect your IT infrastructure. We provide <br /> expert solutions to safeguard your digital assets with Element8, one of the leading cyber security company in <br />s Saudi Arabia. Protect your business with us today.</p>);
    const description_2 = (<p>that engages, entices and empowers… <br /> <br />

        Build trust, grow a community, inspire, educate and entertain with Social Media Marketing. We are a social media <br /> digital marketing company Saudi Arabia KSA that harnesses the power of social. From elevating customer service <br /> through Community Management to enticing new leads through Social Media Ads, we use the right platforms <br /> consistently and carefully. We understand your challenges and your opportunities so that we can leverage social <br /> media effectively, within the context of trends and your own goals.</p>);
    const title_3 = (<>Digital Marketing - SEM</>);
    const description_3 = (<p>As the leading digital marketing company Saudi Arabia, KSA we boost your search rankings and optimize your <br /> online presence. We work the metrics, drilling down into the data, and your business requirements so that we can <br /> increase your visibility, traffic & conversions. Our passion ensures that you receive an integrated and holistic <br /> strategy to use Search Engine Optimization (SEO) as a business-driving weapon.</p>);
    const title_4 = (<>Digital Marketing - Google Ads (PPC)</>);
    const description_4 = (<p>that really cut the mustard… <br /> <br />

        You need a PPC digital marketing agency in Saudi Arabia that understands the integration of PPC and SEO. This is <br /> technical wizardry spurred on by expertise and knowledge. We’re continually refining and optimizing your Google <br /> Ads based on your data and our experience. We use our technical expertise along with your goals and budget to <br /> ensure that you get the best bang for your buck.</p>);

    const title_5 = (<>Digital Marketing - Content Marketing</>);
    const description_5 = (<p>to compel, engage and position… <br /> <br />

        Content is king, but there are a lot of contenders for the throne. Let’s get competitive and make your content work wonders, creatively and strategically. Content is your way to showcase your authority and expertise whilst climbing your way up the rankings. It pushes your customer along the sales funnel and nurtures their relationship with you. It leads to sales. Ultimately, it’s your business that becomes the place to go.</p>);

    const featureCards: FeatureCard[] = [
        {
            title: "Strategic Foundations",
            description: "We strategically adapt so your business thrives. We drive a refined digital marketing strategy for you. From pen portraits to curated content, we strategize.",
        },
        {
            title: "Evocative Story-Telling",
            description: "We tell the story so your audience wants more. We weave an enticing tale that speaks volumes, sparks passion and builds relationships.",
        },
        {
            title: "Education",
            description: "We are insightful and results-orientated, ensuring success. We get to know your audience like they are our best friends. We then coax contacts in to leads and leads in to sales.",
        },
    ];

    const featureCards_2: FeatureCard[] = [
        {
            title: "Engage and Interact",
            description: "We make your audience engage and interact. We use social media to forge connections and engagement with your brand. From sparking interest to informatively educating, we take the right approach.",
        },
        {
            title: "Control and Elevate",
            description: "We put you in control of your brand. With us, social media won’t become an unwieldy beast that you can’t tame, but instead a rewarding partner that keeps on giving.",
        },
        {
            title: "Education",
            description: "We drive the connections which serve your business. We integrate our knowledge and expertise with a bespoke content approach for your business.",
        },
    ];

    const featureCards_3: FeatureCard[] = [
        {
            title: "Website Optimisation",
            description: "We strategically adapt so your business thrives. We drive a refined digital marketing strategy for you. From pen portraits to curated content, we strategize.",
        },
        {
            title: "Website Optimisation",
            description: "We create the signposts to get you seen. With us working on your SEO, you’ll be seen by the right people, at the right time, in the right way.",
        },
        {
            title: "Remarkable Performance",
            description: "We audit, implement, manage and refine. SEO is all about being relevant, authoritative and trustworthy so that you actively deserve to be in the top rankings and maximise conversions.",
        },
    ];

    const featureCards_4: FeatureCard[] = [
        {
            title: "Driven by results",
            description: "We strategically adapt so your business thrives. We drive a refined digital marketing strategy for you. From pen portraits to curated content, we strategize.",
        },
        {
            title: "Website Optimisation",
            description: "We create the signposts to get you seen. With us working on your SEO, you’ll be seen by the right people, at the right time, in the right way.",
        },
        {
            title: "Remarkable Performance",
            description: "We audit, implement, manage and refine. SEO is all about being relevant, authoritative and trustworthy so that you actively deserve to be in the top rankings and maximise conversions.",
        },
    ];

    const featureCards_5: FeatureCard[] = [
        {
            title: "Position your brand",
            description: "We use content purposefully, with intent. We craft visual, inspiring and creative content so that you influence behaviour and compel action.",
        },
        {
            title: "Engage your audience",
            description: "We make your content the voice that gets heard. Engaging an audience takes conscious effort. That’s what we do – we make your audience turn to you time and again.",
        },
        {
            title: "Be unique",
            description: "We weave the magic of your brand in to unique content that sells. Our approach to content marketing is to make you stand out from the crowd. It’s you that becomes the authority.",
        },
    ];

    return (
        <main className="min-h-screen relative">
            <PageBanner title="Marketing" minHeight="100vh" />
            <AppStartToEnd
                backgroundImage={beforeImg}
                title={title}
                description={description}
                buttonText="CONTACT US"
                layout="with-cards"
                cards={featureCards}
                videoTopOffset="-top-150"
                videoRightOffset="right-0 md:-right-40"
                padding="py-20 md:py-30"
                videoPosition="right"
            />
            <AppStartToEnd
                title={title}
                description={description_2}
                videoSrc="/videos/animated_clip_2.mp4"
                buttonText="CONTACT US"
                layout="with-cards"
                cards={featureCards_2}
                videoTopOffset="-top-100"
                videoRightOffset="right-0 md:-right-60"
                padding="py-20 md:py-30"
                videoPosition="right"
            />
            <OurClients />
            <AppStartToEnd
                title={title_3}
                description={description_3}
                videoSrc="/videos/animated_clip_2.mp4"
                buttonText="CONTACT US"
                layout="with-cards"
                cards={featureCards_3}
                videoTopOffset="-top-100"
                videoRightOffset="right-0 md:-left-70"
                padding="py-20 md:py-30"
                videoPosition="left"
            />
            <OurWork
                title="OUR WORK"
                workItems={defaultWorkItems}
                ctaVariant="outline"
                className="bg-black"
                showCTA={true}
            />
            <AppStartToEnd
                title={title_4}
                description={description_4}
                videoSrc="/videos/animated_clip_2.mp4"
                buttonText="CONTACT US"
                layout="with-cards"
                cards={featureCards_4}
                videoTopOffset="-top-100"
                videoRightOffset="right-0 md:-right-60"
                padding="py-20 md:py-30"
                videoPosition="right"
            />
            <AppStartToEnd
                title={title_5}
                description={description_5}
                videoSrc="/videos/animated_clip_2.mp4"
                buttonText="CONTACT US"
                layout="with-cards"
                cards={featureCards_5}
                videoTopOffset="-top-100"
                videoRightOffset="right-0 md:-left-70"
                padding="py-20 md:py-30"
                videoPosition="left"
            />
            <ClientTestimonials />
            <Accordion />
            <ProjectContactForm />
            <Footer />
        </main>
    );
}