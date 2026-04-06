import type { OurWorkListingPage } from "@/app/lib/our-work-api";
import type { OurWorkPageItem } from "@/app/our-work/our-work-types";
import type { AccordionItem } from "@/app/components/sections/Accordion";

const EMPTY_BANNER = {
  title: "",
  description: "",
  backgroundImage: { src: "" as string, alt: "" as string },
  videoSrc: undefined as string | undefined,
};

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

function mediaUrl(
  image: { node?: { sourceUrl?: string | null; mediaItemUrl?: string | null } | null } | null | undefined
): string | undefined {
  const u = image?.node?.sourceUrl || image?.node?.mediaItemUrl;
  const t = u?.trim();
  return t || undefined;
}

function asWorkImage(url: string | undefined): OurWorkPageItem["image"] | undefined {
  return url ? (url as OurWorkPageItem["image"]) : undefined;
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

function hasRenderableImage(item: OurWorkPageItem): boolean {
  if (typeof item.image === "string") return item.image.trim().length > 0;
  return Boolean((item.image as { src?: string } | undefined)?.src);
}

export function normalizeOurWorkPageData(
  data: OurWorkListingPage | null
): {
  banner: typeof EMPTY_BANNER;
  workItems: OurWorkPageItem[];
  accordion: { title: string; items: AccordionItem[] };
} {
  if (!data?.page?.ourWorkPageFields) {
    return {
      banner: EMPTY_BANNER,
      workItems: [],
      accordion: { title: "", items: [] },
    };
  }

  const fields = data.page.ourWorkPageFields;
  const bannerSection = fields.ourWorkBannerSection;
  const workSection = fields.workItemsSection;
  const accordionSection = fields.accordionSection;
  const perPortfolioOverrides = (
    data.page.ourWorkPerPortfolioOverrides?.ourWorkPerPortfolioItems ?? []
  ).filter(Boolean) as PerPortfolioOverride[];

  const bannerTitle = bannerSection?.bannerTitle?.trim() || "";
  const bannerDescription = bannerSection?.bannerDescription?.trim() || "";
  const bgNode = bannerSection?.bannerBackgroundImage?.node;
  const bannerBackgroundImage = bgNode?.sourceUrl?.trim()
    ? { src: bgNode.sourceUrl, alt: bgNode.altText?.trim() || "" }
    : { src: "", alt: "" };
  const bannerVideo = bannerSection?.bannerVideo?.node?.sourceUrl?.trim();

  const rawWorkItems = getRawWorkItems(workSection?.workItems);

  const workItems: OurWorkPageItem[] =
    rawWorkItems.length > 0
      ? rawWorkItems
          .flatMap((wi) => {
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
            const baseImgUrl = bgImg?.node?.sourceUrl?.trim();
            const industryTitle = (portfolioDetails?.industryTitle as string)?.trim();
            const industryCategory = industryTitle ? industryTitle.replace(/\s*,\s*/g, "\n") : undefined;
            const link = slug ? "/portfolio/" + slug : "";

            const listing = node?.homePortfolioListing as Record<string, unknown> | null | undefined;
            const listingSubtitle = (listing?.portfolioListingSubtitle as string)?.trim();
            const listingTitle = (listing?.portfolioListingTitle as string)?.trim();
            const listingDescription = (listing?.portfolioListingDescription as string)?.trim();
            const listingCards = Array.isArray(listing?.portfolioListingCards)
              ? (listing?.portfolioListingCards as Array<Record<string, unknown> | null>)
              : [];

            const mainSubtitle =
              matchedOverride?.portfolioSubtitle?.trim() || listingSubtitle || industryCategory || "";
            const mainTitle =
              matchedOverride?.portfolioTitle?.trim() || listingTitle || title || "";
            const mainDescription =
              matchedOverride?.portfolioDescription?.trim() || listingDescription || excerpt || "";
            const mainImage =
              asWorkImage(mediaUrl(matchedOverride?.portfolioImage)) ?? asWorkImage(baseImgUrl);

            const overrideCards = (matchedOverride?.portfolioCards ?? []).filter(Boolean) as OverrideCard[];
            if (overrideCards.length > 0) {
              return overrideCards.map((card) => {
                const img =
                  asWorkImage(mediaUrl(card.cardImage)) ??
                  mainImage;
                return {
                  title: card.cardTitle?.trim() || mainTitle,
                  description: card.cardDescription?.trim() || mainDescription,
                  image: img as OurWorkPageItem["image"],
                  ...(card.cardSubtitle?.trim() || mainSubtitle
                    ? { category: (card.cardSubtitle?.trim() || mainSubtitle) as string }
                    : {}),
                  ...(link ? { link } : {}),
                } as OurWorkPageItem;
              });
            }

            if (listingCards.length > 0) {
              return listingCards.filter(Boolean).map((card) => {
                const c = card as Record<string, unknown>;
                const cardSubtitle = (c?.cardSubtitle as string)?.trim();
                const cardTitle = (c?.cardTitle as string)?.trim();
                const cardDescription = (c?.cardDescription as string)?.trim();
                const cardImageNode = (c?.cardImage as { node?: { sourceUrl?: string; mediaItemUrl?: string } } | null | undefined)?.node;
                const cardUrl = cardImageNode?.sourceUrl?.trim() || cardImageNode?.mediaItemUrl?.trim();
                const img = asWorkImage(cardUrl) ?? mainImage;
                return {
                  title: cardTitle || mainTitle,
                  description: cardDescription || mainDescription,
                  image: img as OurWorkPageItem["image"],
                  ...(cardSubtitle || mainSubtitle
                    ? { category: (cardSubtitle || mainSubtitle) as string }
                    : {}),
                  ...(link ? { link } : {}),
                } as OurWorkPageItem;
              });
            }

            return [
              {
                title: mainTitle,
                description: mainDescription,
                image: mainImage as OurWorkPageItem["image"],
                ...(mainSubtitle ? { category: mainSubtitle } : {}),
                ...(link ? { link } : {}),
              } as OurWorkPageItem,
            ];
          })
          .filter(hasRenderableImage)
      : [];

  const accordionTitle = accordionSection?.accordionTitle?.trim() || "";
  const rawList = accordionSection?.accordionItems;
  const rawAccordionItems = Array.isArray(rawList)
    ? rawList
    : rawList && typeof rawList === "object" && "nodes" in rawList && Array.isArray((rawList as { nodes: unknown[] }).nodes)
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
