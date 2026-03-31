import DigitalExperienceBanner from "@/app/components/sections/DigitalExperienceBanner";
import DigitalExperienceServices from "@/app/components/sections/DigitalExperienceServices";
import BackgroundImageSection from "../components/ui/BackgroundImageSection";
import ServiceDetailSection from "../components/sections/ServiceDetailSection";
import digitalPageBgImg from "@/app/assets/imgs/digital_page_bg_img.png";
import graphicImage from "@/app/assets/imgs/gen_ai_img.png";
import OurWork, { WorkItem } from "../components/sections/OurWork";
import Accordion from "../components/sections/Accordion";
import ourWorkImg from "@/app/assets/imgs/our_work_img.png";
import vectorBg from "@/app/assets/imgs/Mask group (1).png";
import {
  buildStudioOurWorkItems,
  fetchStudioPage,
  getStudioOurWorkTitle,
  getStudioPageFields,
} from "@/app/lib/studio-api";
import { resolveImageUrl } from "@/app/lib/our-work-api";
import type { CarouselCard } from "@/app/components/ui/Carousel";

const PAGE_ID = 734;

function renderBannerTitle(title: string) {
  const explicitParts = title
    .split(/\r?\n|<br\s*\/?>/i)
    .map((part) => part.trim())
    .filter(Boolean);

  const parts =
    explicitParts.length > 1
      ? explicitParts
      : (() => {
          const words = title.trim().replace(/\s+/g, " ").split(" ").filter(Boolean);
          if (words.length < 3) return explicitParts;
          const splitIndex = words[1]?.toLowerCase() === "and" || words[1] === "&" ? 2 : 1;
          return [words.slice(0, splitIndex).join(" "), words.slice(splitIndex).join(" ")];
        })();

  if (parts.length <= 1) return <>{title}</>;

  return (
    <>
      {parts.map((part, i) => (
        <span key={`${part}-${i}`}>
          {part}
          {i < parts.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

function normalizeStudioParagraphs(html: string | null | undefined): string[] {
  if (!html) return [];

  const paragraphMatches = Array.from(html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi))
    .map((match) => match[1]?.replace(/<br\s*\/?>/gi, "\n"))
    .map((value) => value?.replace(/<[^>]+>/g, " ").replace(/[ \t]+/g, " ").replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean) as string[];

  if (paragraphMatches.length > 0) {
    return paragraphMatches;
  }

  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|section|article|h[1-6])>/gi, "\n\n")
    .replace(/<[^>]+>/g, " ")
    .split(/\n\s*\n/)
    .map((value) => value.replace(/[ \t]+/g, " ").replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);
}

const defaultServices = [
  {
    title: "UI / UX Design",
    description: "We sculpt interfaces and journeys that feel effortless and memorable. From wireframes to high-fidelity prototypes, our UI/UX designs focus on clarity, emotional resonance, and purpose. Every interaction is designed to guide users, build trust, and reflect your brand's identity.",
    services: ["AI-informed User journeys & flow maps", "Wireframes & prototypes", "Visual style systems & UI kits", "Bilingual UX (EN / AR)"],
  },
  {
    title: "Website Development",
    description: "We turn design into living, breathing websites — responsive, fast, and technically sound. Whether you need a corporate presence, landing pages, or interac",
    services: ["Frontend & backend architecture", "Responsive & mobile-first", "AI-assisted Speed & performance optimization", "SEO foundations enhanced by AI tools"],
  },
  {
    title: "Ecommerce Solutions",
    description: "Sell online with confidence. Our e-commerce builds go beyond product pages — we craft intuitive shopping experiences, integrated payment systems, and seamless checkout flows that reduce friction and boost conversions.",
    services: ["Inventory and catalog management", "Payment gateway integrations", "Smart product recommendations & upsells", "AI analytics for sales & customer behavior"],
  },
  {
    title: "CMS & Integrations",
    description: "Our CMS solutions give you full control while integrating seamlessly with your tools. AI helps automate content management, personalization, and workflow efficiency, ensuring your team spends less time on manual updates and more on growth.",
    services: ["WordPress, Shopify, Drupal & custom CMS", "AI-assisted content structuring & recommendations", "API & third-party integrations", "Workflow automation & editorial efficiency"],
  },
];

const defaultWorkItems: WorkItem[] = [
  { title: "The Oxford Institute", description: "70% increased in digital interaction of potential students looking for information", image: ourWorkImg, category: "EDUCATION\nTECH\nWEBSITE" },
  { title: "The Oxford Institute", description: "70% increased in digital interaction of potential students looking for information", image: ourWorkImg, category: "EDUCATION\nTECH\nWEBSITE" },
  { title: "The Oxford Institute", description: "70% increased in digital interaction of potential students looking for information", image: ourWorkImg, category: "EDUCATION\nTECH\nWEBSITE" },
  { title: "The Oxford Institute", description: "70% increased in digital interaction of potential students looking for information", image: ourWorkImg, category: "EDUCATION\nTECH\nWEBSITE" },
];

export default async function DigitalExperienceStudioPages() {
  let fields = null;
  try {
    const res = await fetchStudioPage(PAGE_ID);
    fields = getStudioPageFields(res.data);
  } catch {
    // fallback to hardcoded defaults
  }

  const bannerTitle = fields?.studioBanner?.bannerTitle || "Digital\nExperience Studio";
  const bannerDescription = fields?.studioBanner?.bannerDescription || "Digital Experiences That Inspire and Perform";
  const bannerVideoUrl = fields?.studioBanner?.bannerVideo?.node?.mediaItemUrl
    || fields?.studioBanner?.bannerVideo?.node?.sourceUrl;
  const bannerBgUrl = fields?.studioBanner?.bannerBackgroundImage?.node?.sourceUrl;
  const fullBgUrl = fields?.studioFullBackgroundImage?.node?.sourceUrl;
  const carouselCards: CarouselCard[] = fields?.studioCarouselCards?.length
    ? fields.studioCarouselCards
      .filter(Boolean)
      .map((card) => ({
        type: "text" as const,
        title: card?.title?.trim() || "",
        subtitle: card?.subtitle?.trim() || undefined,
        description: card?.description?.trim() || undefined,
        marketInfo: card?.marketInfo?.trim() || undefined,
        backgroundColor: card?.backgroundColor?.trim() || undefined,
        textColor: card?.textColor?.trim() || undefined,
      }))
      .filter((card) => card.title || card.subtitle || card.description || card.marketInfo)
    : [];
  const introParagraphs = fields?.studioIntroParagraphs?.length
    ? fields.studioIntroParagraphs
      .flatMap((item) => normalizeStudioParagraphs(item?.paragraph))
      .filter((paragraph): paragraph is string => Boolean(paragraph))
    : [];

  // Service details from CMS or fallback
  const services = fields?.studioServiceDetails?.length
    ? fields.studioServiceDetails.map((s) => ({
        title: s.title || "",
        description: s.description || "",
        services: s.bulletPoints?.filter(Boolean).map((bp) => bp?.text || "") || [],
      }))
    : defaultServices;

  // Accordion
  const accordionTitle = fields?.studioAccordionTitle || "FAQ's";
  const accordionItems = fields?.studioAccordionItems?.length
    ? fields.studioAccordionItems.map((item, i) => ({
        id: i + 1,
        title: item.faqTitle || "",
        content: item.faqContent || "",
      }))
    : undefined;

  const ourWorkTitle = getStudioOurWorkTitle(fields) || "OUR WORK";
  const cmsWorkItems = buildStudioOurWorkItems(fields) as WorkItem[];
  const workItems = cmsWorkItems.length > 0 ? cmsWorkItems : defaultWorkItems;

  return (
    <main className="min-h-screen">
      <DigitalExperienceBanner
        title={renderBannerTitle(bannerTitle)}
        description={bannerDescription}
        videoSrc={bannerVideoUrl ? resolveImageUrl(bannerVideoUrl) : "/videos/animated_clip_1.mp4"}
        backgroundImage={{
          src: bannerBgUrl ? resolveImageUrl(bannerBgUrl)! : vectorBg.src,
          alt: "Background",
        }}
      />
      <DigitalExperienceServices
        cards={carouselCards.length > 0 ? carouselCards : undefined}
        paragraphs={introParagraphs.length > 0 ? introParagraphs : undefined}
      />
      <BackgroundImageSection
        backgroundImage={fullBgUrl ? resolveImageUrl(fullBgUrl)! : digitalPageBgImg}
        alt="Background"
        className="relative bg-black overflow-hidden h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]"
      />
      {services.map((service, index) => (
        <ServiceDetailSection
          key={index}
          service={service}
          graphicImage={
            resolveImageUrl(fields?.studioServiceDetails?.[index]?.image?.node?.sourceUrl)
            || resolveImageUrl(fields?.studioServiceDetails?.[index]?.image?.node?.mediaItemUrl)
            || graphicImage
          }
          graphicAlt={fields?.studioServiceDetails?.[index]?.image?.node?.altText || "Gen AI Image"}
          videoSrc={
            resolveImageUrl(fields?.studioServiceDetails?.[index]?.video?.node?.mediaItemUrl)
            || resolveImageUrl(fields?.studioServiceDetails?.[index]?.video?.node?.sourceUrl)
            || undefined
          }
          imagePosition={index % 2 === 0 ? "right" : "left"}
          buttonText={fields?.studioServiceDetails?.[index]?.buttonText || "Read More"}
          redirectUrl={fields?.studioServiceDetails?.[index]?.buttonLink || undefined}
        />
      ))}
      <OurWork
        title={ourWorkTitle}
        workItems={workItems}
        ctaVariant="outline"
        className="bg-black"
        showCTA={true}
      />
      <Accordion title={accordionTitle} items={accordionItems} />
    </main>
  );
}
