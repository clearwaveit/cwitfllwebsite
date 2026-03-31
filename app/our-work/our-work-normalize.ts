import type { OurWorkListingPage } from "@/app/lib/our-work-api";
import type { OurWorkPageItem } from "@/app/our-work/our-work-types";
import type { AccordionItem } from "@/app/components/sections/Accordion";
import ourWorkImg from "@/app/assets/imgs/our_work_img.png";
import vectorBg from "@/app/assets/imgs/Mask group (1).png";

const DEFAULT_BANNER = {
  title: "Our Work",
  description: "Digital Experiences That Inspire and Perform",
  backgroundImage: { src: vectorBg.src, alt: "Background" as string },
  videoSrc: undefined as string | undefined,
};

/** Default work items when CMS has none. */
export const DEFAULT_WORK_ITEMS: OurWorkPageItem[] = [
  {
    title: "The Oxford Institute",
    description:
      "70% increased in digital interaction of potential students looking for information",
    image: ourWorkImg,
    category: "EDUCATION\nTECH\nWEBSITE",
  },
  {
    title: "The Oxford Institute",
    description:
      "70% increased in digital interaction of potential students looking for information",
    image: ourWorkImg,
    category: "EDUCATION\nTECH\nWEBSITE",
  },
  {
    title: "The Oxford Institute",
    description:
      "70% increased in digital interaction of potential students looking for information",
    image: ourWorkImg,
    category: "EDUCATION\nTECH\nWEBSITE",
  },
  {
    title: "The Oxford Institute",
    description:
      "70% increased in digital interaction of potential students looking for information",
    image: ourWorkImg,
    category: "EDUCATION\nTECH\nWEBSITE",
  },
  {
    title: "The Oxford Institute",
    description:
      "70% increased in digital interaction of potential students looking for information",
    image: ourWorkImg,
    category: "EDUCATION\nTECH\nWEBSITE",
  },
];
const DEFAULT_CARD = DEFAULT_WORK_ITEMS[0];

type OverrideCard = {
  cardSubtitle?: string | null;
  cardTitle?: string | null;
  cardDescription?: string | null;
  cardImage?: { node?: { sourceUrl?: string | null; mediaItemUrl?: string | null } | null } | null;
};

type PerPortfolioOverride = {
  portfolioPost?: {
    nodes?: Array<{
      databaseId?: number | null;
      slug?: string | null;
      title?: string | null;
    } | null> | null;
  } | null;
  sectionSubtitle?: string | null;
  sectionTitle?: string | null;
  sectionDescription?: string | null;
  portfolioSubtitle?: string | null;
  portfolioTitle?: string | null;
  portfolioDescription?: string | null;
  portfolioImage?: { node?: { sourceUrl?: string | null; mediaItemUrl?: string | null } | null } | null;
  portfolioCards?: Array<OverrideCard | null> | null;
};

function getImageUrlWithFallback(
  image: { node?: { sourceUrl?: string | null; mediaItemUrl?: string | null } | null } | null | undefined,
  fallback: OurWorkPageItem["image"]
): OurWorkPageItem["image"] {
  return (image?.node?.sourceUrl || image?.node?.mediaItemUrl || fallback) as OurWorkPageItem["image"];
}

function toNumberId(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.trim());
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
}

function getOverridePortfolioId(override: PerPortfolioOverride | null | undefined): number | undefined {
  return toNumberId(override?.portfolioPost?.nodes?.[0]?.databaseId);
}

function getRawWorkItems(rawWorkList: unknown): unknown[] {
  if (Array.isArray(rawWorkList)) return rawWorkList.filter(Boolean);
  if (rawWorkList && typeof rawWorkList === "object") {
    if ("nodes" in rawWorkList && Array.isArray((rawWorkList as { nodes: unknown[] }).nodes)) {
      return (rawWorkList as { nodes: unknown[] }).nodes.filter(Boolean);
    }
    if ("edges" in rawWorkList && Array.isArray((rawWorkList as { edges: { node: unknown }[] }).edges)) {
      return (rawWorkList as { edges: { node: unknown }[] }).edges.map((e) => e?.node).filter(Boolean);
    }
  }
  return [];
}

export function normalizeOurWorkPageData(
  data: OurWorkListingPage | null
): {
  banner: typeof DEFAULT_BANNER;
  workItems: OurWorkPageItem[];
  accordion: { title: string; items: AccordionItem[] };
} {
  if (!data?.page?.ourWorkPageFields) {
    return {
      banner: DEFAULT_BANNER,
      workItems: DEFAULT_WORK_ITEMS,
      accordion: { title: "FAQ's", items: [] },
    };
  }

  const fields = data.page.ourWorkPageFields;
  const bannerSection = fields.ourWorkBannerSection;
  const workSection = fields.workItemsSection;
  const accordionSection = fields.accordionSection;
  const perPortfolioOverrides = (
    data.page.ourWorkPerPortfolioOverrides?.ourWorkPerPortfolioItems ?? []
  ).filter(Boolean) as PerPortfolioOverride[];

  const bannerTitle =
    bannerSection?.bannerTitle?.trim() || DEFAULT_BANNER.title;
  const bannerDescription =
    bannerSection?.bannerDescription?.trim() || DEFAULT_BANNER.description;
  const bgNode = bannerSection?.bannerBackgroundImage?.node;
  const bannerBackgroundImage = bgNode?.sourceUrl
    ? { src: bgNode.sourceUrl, alt: bgNode.altText || "Background" }
    : DEFAULT_BANNER.backgroundImage;
  const bannerVideo = bannerSection?.bannerVideo?.node?.sourceUrl;

  const rawWorkItems = getRawWorkItems(workSection?.workItems);

  const workItems: OurWorkPageItem[] =
    rawWorkItems.length > 0
      ? rawWorkItems.flatMap((wi) => {
          const node = wi as Record<string, unknown> | null | undefined;
          const currentPortfolioId = toNumberId(node?.databaseId);
          const matchedOverride =
            perPortfolioOverrides.find((ov) => getOverridePortfolioId(ov) === currentPortfolioId) ?? null;
          const title = (node?.title as string)?.trim() ?? "";
          const slug = (node?.slug as string)?.trim();
          const excerpt = (node?.excerpt as string)?.trim() ?? "";
          const portfolioDetails = node?.portfolioDetails as Record<string, unknown> | null | undefined;
          const bgImg = (portfolioDetails?.backgroundImage ?? portfolioDetails?.heroBackgroundImage) as
            | { node?: { sourceUrl?: string; altText?: string } }
            | null
            | undefined;
          const imgUrl = bgImg?.node?.sourceUrl;
          const image = (imgUrl || ourWorkImg) as OurWorkPageItem["image"];
          const industryTitle = (portfolioDetails?.industryTitle as string)?.trim();
          const industryCategory = industryTitle ? industryTitle.replace(/\s*,\s*/g, "\n") : undefined;
          const link = slug ? "/work-details/" + slug : "";

          const listing = node?.homePortfolioListing as Record<string, unknown> | null | undefined;
          const listingSubtitle = (listing?.portfolioListingSubtitle as string)?.trim();
          const listingTitle = (listing?.portfolioListingTitle as string)?.trim();
          const listingDescription = (listing?.portfolioListingDescription as string)?.trim();
          const listingCards = Array.isArray(listing?.portfolioListingCards)
            ? (listing?.portfolioListingCards as Array<Record<string, unknown> | null>)
            : [];

          const mainSubtitle =
            matchedOverride?.portfolioSubtitle?.trim() ||
            listingSubtitle ||
            industryCategory ||
            DEFAULT_CARD?.category ||
            "";
          const mainTitle =
            matchedOverride?.portfolioTitle?.trim() ||
            listingTitle ||
            title ||
            DEFAULT_CARD?.title ||
            "";
          const mainDescription =
            matchedOverride?.portfolioDescription?.trim() ||
            listingDescription ||
            excerpt ||
            DEFAULT_CARD?.description ||
            "";
          const mainImage = getImageUrlWithFallback(matchedOverride?.portfolioImage, image);

          const overrideCards = (matchedOverride?.portfolioCards ?? []).filter(Boolean) as OverrideCard[];
          if (overrideCards.length > 0) {
            return overrideCards.map((card) => ({
              title: card.cardTitle?.trim() || mainTitle,
              description: card.cardDescription?.trim() || mainDescription,
              image: getImageUrlWithFallback(card.cardImage, mainImage),
              ...(card.cardSubtitle?.trim() || mainSubtitle
                ? { category: (card.cardSubtitle?.trim() || mainSubtitle) as string }
                : {}),
              ...(link ? { link } : {}),
            }));
          }

          if (listingCards.length > 0) {
            return listingCards.filter(Boolean).map((card) => {
              const c = card as Record<string, unknown>;
              const cardSubtitle = (c?.cardSubtitle as string)?.trim();
              const cardTitle = (c?.cardTitle as string)?.trim();
              const cardDescription = (c?.cardDescription as string)?.trim();
              const cardImageNode = (c?.cardImage as { node?: { sourceUrl?: string; mediaItemUrl?: string } } | null | undefined)?.node;
              const cardImage = cardImageNode?.sourceUrl || cardImageNode?.mediaItemUrl || mainImage;
              return {
                title: cardTitle || mainTitle,
                description: cardDescription || mainDescription,
                image: (cardImage || mainImage) as OurWorkPageItem["image"],
                ...(cardSubtitle || mainSubtitle
                  ? { category: (cardSubtitle || mainSubtitle) as string }
                  : {}),
                ...(link ? { link } : {}),
              };
            });
          }

          return [{
            title: mainTitle,
            description: mainDescription,
            image: mainImage,
            ...(mainSubtitle ? { category: mainSubtitle } : {}),
            ...(link ? { link } : {}),
          }];
        })
      : [];

  const accordionTitle =
    accordionSection?.accordionTitle?.trim() || "FAQ's";
  const rawList = accordionSection?.accordionItems;
  const rawAccordionItems = Array.isArray(rawList)
    ? rawList
    : (rawList && typeof rawList === "object" && "nodes" in rawList && Array.isArray((rawList as { nodes: unknown[] }).nodes))
      ? (rawList as { nodes: unknown[] }).nodes
      : [];

  const accordionItems: AccordionItem[] =
    rawAccordionItems.length > 0
      ? rawAccordionItems.map((a, i) => {
          const item = a as Record<string, unknown> | null | undefined;
          const title = (typeof item?.faqTitle === "string" ? item.faqTitle : "")?.trim() ?? "";
          const content = (typeof item?.faqContent === "string" ? item.faqContent : "")?.trim() ?? "";
          return {
            id: i + 1,
            title: title || "",
            content: content || "",
          };
        })
      : [];

  return {
    banner: {
      title: bannerTitle,
      description: bannerDescription,
      backgroundImage: bannerBackgroundImage,
      videoSrc: bannerVideo,
    },
    workItems,
    accordion: { title: accordionTitle, items: accordionItems },
  };
}
