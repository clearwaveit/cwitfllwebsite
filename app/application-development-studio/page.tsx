import DigitalExperienceBanner from "@/app/components/sections/DigitalExperienceBanner";
import DigitalExperienceServices from "@/app/components/sections/DigitalExperienceServices";
import BackgroundImageSection from "../components/ui/BackgroundImageSection";
import ServiceDetailSection from "../components/sections/ServiceDetailSection";
import OurWork, { WorkItem } from "../components/sections/OurWork";
import Accordion from "../components/sections/Accordion";
import OurClients from "../components/sections/OurClients";
import {
  buildStudioOurWorkItems,
  fetchStudioPage,
  getStudioOurWorkTitle,
  getStudioPageFields,
} from "@/app/lib/studio-api";
import { fetchSiteSettings } from "@/app/lib/site-settings-api";
import { resolveImageUrl } from "@/app/lib/our-work-api";
import type { CarouselCard } from "@/app/components/ui/Carousel";

const PAGE_ID = 736;

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

export default async function ApplicationDevelopmentStudioPage() {
  let fields = null;
  try {
    const res = await fetchStudioPage(PAGE_ID);
    fields = getStudioPageFields(res.data);
  } catch {
    fields = null;
  }

  const bannerTitle = fields?.studioBanner?.bannerTitle || "";
  const bannerDescription = fields?.studioBanner?.bannerDescription || "";
  const bannerVideoUrl =
    fields?.studioBanner?.bannerVideo?.node?.mediaItemUrl ||
    fields?.studioBanner?.bannerVideo?.node?.sourceUrl;
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

  const services = fields?.studioServiceDetails?.length
    ? fields.studioServiceDetails.map((s) => ({
        title: s.title || "",
        description: s.description || "",
        services: s.bulletPoints?.filter(Boolean).map((bp) => bp?.text || "") || [],
      }))
    : [];

  const accordionTitle = fields?.studioAccordionTitle || "";
  const accordionItems = fields?.studioAccordionItems?.length
    ? fields.studioAccordionItems.map((item, i) => ({
        id: i + 1,
        title: item.faqTitle || "",
        content: item.faqContent || "",
      }))
    : undefined;

  const ourWorkTitle = getStudioOurWorkTitle(fields) || "";
  const showClients = fields?.studioShowClients !== false;
  const cmsWorkItems = buildStudioOurWorkItems(fields) as WorkItem[];
  const workItems = cmsWorkItems;

  let clientsLogoSrc: string | undefined;
  if (showClients) {
    try {
      const site = await fetchSiteSettings();
      clientsLogoSrc = site.header.logoSrc?.trim() || undefined;
    } catch {
      clientsLogoSrc = undefined;
    }
  }

  const resolvedBannerBg = bannerBgUrl ? resolveImageUrl(bannerBgUrl) : undefined;
  const resolvedFullBg = fullBgUrl ? resolveImageUrl(fullBgUrl) : undefined;

  return (
    <main className="min-h-screen">
      <DigitalExperienceBanner
        title={renderBannerTitle(bannerTitle)}
        description={bannerDescription}
        videoSrc={bannerVideoUrl ? resolveImageUrl(bannerVideoUrl) : undefined}
        backgroundImage={
          resolvedBannerBg
            ? { src: resolvedBannerBg, alt: "Background" }
            : undefined
        }
      />
      <DigitalExperienceServices
        cards={carouselCards.length > 0 ? carouselCards : undefined}
        paragraphs={introParagraphs.length > 0 ? introParagraphs : undefined}
      />
      {resolvedFullBg ? (
        <BackgroundImageSection
          backgroundImage={resolvedFullBg}
          alt="Background"
          className="relative bg-black overflow-hidden h-[300px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[600px] 2xl:min-h-[700px] min-[1720px]:min-h-[500px]"
        />
      ) : null}
      {services.length > 0 &&
        services.map((service, index) => {
          const graphic =
            resolveImageUrl(fields?.studioServiceDetails?.[index]?.image?.node?.sourceUrl) ||
            resolveImageUrl(fields?.studioServiceDetails?.[index]?.image?.node?.mediaItemUrl);
          return (
            <ServiceDetailSection
              key={index}
              service={service}
              {...(graphic ? { graphicImage: graphic } : {})}
              graphicAlt={fields?.studioServiceDetails?.[index]?.image?.node?.altText || ""}
              videoSrc={
                resolveImageUrl(fields?.studioServiceDetails?.[index]?.video?.node?.mediaItemUrl) ||
                resolveImageUrl(fields?.studioServiceDetails?.[index]?.video?.node?.sourceUrl) ||
                undefined
              }
              imagePosition={index % 2 === 0 ? "right" : "left"}
              buttonText={fields?.studioServiceDetails?.[index]?.buttonText?.trim() || ""}
              redirectUrl={fields?.studioServiceDetails?.[index]?.buttonLink || undefined}
            />
          );
        })}
      {workItems.length > 0 && (
        <OurWork
          title={ourWorkTitle}
          workItems={workItems}
          ctaVariant="outline"
          className="bg-black"
          showCTA={false}
        />
      )}
      {showClients && clientsLogoSrc ? <OurClients logoSrc={clientsLogoSrc} /> : null}
      {accordionItems && accordionItems.length > 0 && (
        <Accordion title={accordionTitle} items={accordionItems} />
      )}
    </main>
  );
}
