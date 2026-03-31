/**
 * WordPress WPGraphQL API for Studio pages.
 * Fetches ACF data for Digital Experience, Growth & Branding, and Application Development studio pages.
 */

import { resolveImageUrl } from "@/app/lib/our-work-api";

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || "http://cwitmain.local/graphql";

// -----------------------------------------------------------------------------
// GraphQL Query
// -----------------------------------------------------------------------------

const STUDIO_PAGE_FIELDS_FRAGMENT = `
  studioBanner {
    bannerTitle
    bannerDescription
    bannerVideo {
      node {
        mediaItemUrl
        sourceUrl
      }
    }
    bannerBackgroundImage {
      node {
        sourceUrl
        altText
      }
    }
  }
  studioCarouselCards {
    title
    subtitle
    description
    marketInfo
    backgroundColor
    textColor
  }
  studioIntroParagraphs {
    paragraph
  }
  studioFullBackgroundImage {
    node {
      sourceUrl
      altText
    }
  }
  studioServiceDetails {
    title
    description
    bulletPoints {
      text
    }
    image {
      node {
        sourceUrl
        altText
      }
    }
    video {
      node {
        mediaItemUrl
        sourceUrl
      }
    }
    buttonText
    buttonLink
  }
  studioOurWorkTitle
  studioPortfolioPerPortfolioItems {
    portfolioPost {
      nodes {
        ... on Portfolio {
          databaseId
          slug
          title
        }
      }
    }
    sectionSubtitle
    sectionTitle
    sectionDescription
    portfolioSubtitle
    portfolioTitle
    portfolioDescription
    portfolioImage {
      node {
        sourceUrl
        mediaItemUrl
      }
    }
    portfolioCards {
      cardSubtitle
      cardTitle
      cardDescription
      cardImage {
        node {
          sourceUrl
          mediaItemUrl
        }
      }
    }
  }
  studioFeaturedPortfolios {
    nodes {
      ... on Portfolio {
        databaseId
        title
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
        portfolioDetails {
          backgroundImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
  studioShowClients
  studioClientsLogo {
    node {
      sourceUrl
      altText
    }
  }
  studioAccordionTitle
  studioAccordionItems {
    faqTitle
    faqContent
  }
`;

const STUDIO_PAGE_FIELDS_FRAGMENT_LEGACY = `
  studioBanner {
    bannerTitle
    bannerDescription
    bannerVideo {
      node {
        mediaItemUrl
        sourceUrl
      }
    }
    bannerBackgroundImage {
      node {
        sourceUrl
        altText
      }
    }
  }
  studioCarouselCards {
    title
    subtitle
    description
    marketInfo
    backgroundColor
    textColor
  }
  studioIntroParagraphs {
    paragraph
  }
  studioFullBackgroundImage {
    node {
      sourceUrl
      altText
    }
  }
  studioServiceDetails {
    title
    description
    bulletPoints {
      text
    }
    image {
      node {
        sourceUrl
        altText
      }
    }
    video {
      node {
        mediaItemUrl
        sourceUrl
      }
    }
    buttonText
    buttonLink
  }
  studioOurWorkTitle
  studioFeaturedPortfolios {
    nodes {
      ... on Portfolio {
        databaseId
        title
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
        portfolioDetails {
          backgroundImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
  studioShowClients
  studioClientsLogo {
    node {
      sourceUrl
      altText
    }
  }
  studioAccordionTitle
  studioAccordionItems {
    faqTitle
    faqContent
  }
`;

export const GET_STUDIO_PAGE = `
  query GetStudioPage($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      title
      slug
      studioPage {
        ${STUDIO_PAGE_FIELDS_FRAGMENT}
      }
    }
  }
`;

export const GET_STUDIO_PAGE_LEGACY = `
  query GetStudioPageLegacy($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      title
      slug
      studioPage {
        ${STUDIO_PAGE_FIELDS_FRAGMENT_LEGACY}
      }
    }
  }
`;

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type StudioBanner = {
  bannerTitle?: string | null;
  bannerDescription?: string | null;
  bannerVideo?: { node?: { mediaItemUrl?: string; sourceUrl?: string } } | null;
  bannerBackgroundImage?: { node?: { sourceUrl?: string; altText?: string | null } } | null;
};

export type StudioCarouselCard = {
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  marketInfo?: string | null;
  backgroundColor?: string | null;
  textColor?: string | null;
};

export type StudioServiceDetail = {
  title?: string | null;
  description?: string | null;
  bulletPoints?: Array<{ text?: string | null } | null> | null;
  image?: { node?: { sourceUrl?: string; altText?: string | null } } | null;
  video?: { node?: { mediaItemUrl?: string; sourceUrl?: string } } | null;
  buttonText?: string | null;
  buttonLink?: string | null;
};

export type StudioFeaturedPortfolio = {
  databaseId?: number | null;
  title?: string | null;
  slug?: string | null;
  featuredImage?: { node?: { sourceUrl?: string } } | null;
  portfolioDetails?: {
    backgroundImage?: { node?: { sourceUrl?: string } } | null;
  } | null;
};

export type StudioPortfolioListingCard = {
  cardSubtitle?: string | null;
  cardTitle?: string | null;
  cardDescription?: string | null;
  cardImage?: {
    node?: {
      sourceUrl?: string | null;
      mediaItemUrl?: string | null;
    } | null;
  } | null;
};

export type StudioPortfolioPostConnection = {
  nodes?: Array<{
    databaseId?: number | null;
    slug?: string | null;
    title?: string | null;
  } | null> | null;
};

export type StudioPerPortfolioOverride = {
  portfolioPost?: number | string | StudioPortfolioPostConnection | null;
  sectionSubtitle?: string | null;
  sectionTitle?: string | null;
  sectionDescription?: string | null;
  portfolioSubtitle?: string | null;
  portfolioTitle?: string | null;
  portfolioDescription?: string | null;
  portfolioImage?: {
    node?: {
      sourceUrl?: string | null;
      mediaItemUrl?: string | null;
    } | null;
  } | null;
  portfolioCards?: Array<StudioPortfolioListingCard | null> | null;
};

export type StudioAccordionItem = {
  faqTitle?: string | null;
  faqContent?: string | null;
};

export type StudioPageFields = {
  studioBanner?: StudioBanner | null;
  studioCarouselCards?: StudioCarouselCard[] | null;
  studioIntroParagraphs?: Array<{ paragraph?: string | null } | null> | null;
  studioFullBackgroundImage?: { node?: { sourceUrl?: string; altText?: string | null } } | null;
  studioServiceDetails?: StudioServiceDetail[] | null;
  studioOurWorkTitle?: string | null;
  studioPortfolioPerPortfolioItems?: Array<StudioPerPortfolioOverride | null> | null;
  studioFeaturedPortfolios?: { nodes?: (StudioFeaturedPortfolio | null)[] } | null;
  studioShowClients?: boolean | null;
  studioClientsLogo?: { node?: { sourceUrl?: string; altText?: string | null } } | null;
  studioAccordionTitle?: string | null;
  studioAccordionItems?: StudioAccordionItem[] | null;
};

export type GraphQLStudioResponse = {
  data?: {
    page?: {
      title?: string | null;
      slug?: string | null;
      studioPage?: StudioPageFields | null;
    } | null;
  } | null;
  errors?: Array<{ message: string }> | null;
};

// -----------------------------------------------------------------------------
// Fetch
// -----------------------------------------------------------------------------

export async function fetchStudioPage(id: number | string): Promise<GraphQLStudioResponse> {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: GET_STUDIO_PAGE,
      variables: { id: String(id) },
    }),
  });
  const json = (await res.json()) as GraphQLStudioResponse;
  const hasUnknownOverridesField = json.errors?.some((e) =>
    String(e?.message || "").includes('Cannot query field "studioPortfolioPerPortfolioItems"')
  );
  if (!hasUnknownOverridesField) {
    return json;
  }

  const legacyRes = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: GET_STUDIO_PAGE_LEGACY,
      variables: { id: String(id) },
    }),
  });
  return (await legacyRes.json()) as GraphQLStudioResponse;
}

/** Extract studioPage fields from response */
export function getStudioPageFields(data: GraphQLStudioResponse["data"]): StudioPageFields | null {
  return data?.page?.studioPage ?? null;
}

type StudioWorkItem = {
  title: string;
  description: string;
  image: string;
  category?: string;
  link?: string;
};

function normalizeId(value: unknown): string | undefined {
  if (value == null) return undefined;
  if (typeof value === "number") return String(value);
  if (typeof value === "string") {
    const raw = value.trim();
    if (!raw) return undefined;
    if (/^\d+$/.test(raw)) return raw;
    const digits = raw.match(/(\d+)/g);
    return digits?.length ? digits[digits.length - 1] : raw;
  }
  if (typeof value !== "object") return undefined;
  const o = value as Record<string, unknown>;
  return (
    normalizeId(o.databaseId) ||
    normalizeId(o.postId) ||
    normalizeId(o.id) ||
    normalizeId(o.value) ||
    normalizeId(o.node) ||
    (Array.isArray(o.nodes) ? normalizeId(o.nodes[0]) : undefined) ||
    (Array.isArray(o.edges) ? normalizeId((o.edges[0] as { node?: unknown } | undefined)?.node) : undefined)
  );
}

function getOverridePortfolioId(override: StudioPerPortfolioOverride | null | undefined): string | undefined {
  if (!override) return undefined;
  return normalizeId(override.portfolioPost);
}

function getMediaUrl(
  media:
    | { node?: { sourceUrl?: string | null; mediaItemUrl?: string | null } | null }
    | null
    | undefined
): string | undefined {
  return resolveImageUrl(media?.node?.sourceUrl ?? media?.node?.mediaItemUrl ?? undefined) ?? undefined;
}

export function getStudioOurWorkTitle(fields: StudioPageFields | null): string | undefined {
  const overrides = (fields?.studioPortfolioPerPortfolioItems ?? []).filter(Boolean) as StudioPerPortfolioOverride[];
  const sectionTitle = overrides.find((item) => item?.sectionTitle?.trim())?.sectionTitle?.trim();
  return sectionTitle || fields?.studioOurWorkTitle?.trim() || undefined;
}

export function buildStudioOurWorkItems(fields: StudioPageFields | null): StudioWorkItem[] {
  const selected = (fields?.studioFeaturedPortfolios?.nodes ?? []).filter(Boolean) as StudioFeaturedPortfolio[];
  if (!selected.length) return [];

  const overrides = (fields?.studioPortfolioPerPortfolioItems ?? []).filter(Boolean) as StudioPerPortfolioOverride[];
  const items: StudioWorkItem[] = [];

  selected.forEach((portfolio) => {
    const selectedId = normalizeId(portfolio.databaseId);
    const matchedOverride = selectedId
      ? overrides.find((override) => getOverridePortfolioId(override) === selectedId) ?? null
      : null;

    const baseTitle = portfolio.title?.trim() || "";
    const baseImage =
      resolveImageUrl(portfolio.portfolioDetails?.backgroundImage?.node?.sourceUrl) ||
      resolveImageUrl(portfolio.featuredImage?.node?.sourceUrl) ||
      "";
    const link = portfolio.slug?.trim() ? `/work-details/${portfolio.slug.trim()}` : undefined;

    const mainCategory = matchedOverride?.portfolioSubtitle?.trim() || undefined;
    const mainTitle = matchedOverride?.portfolioTitle?.trim() || baseTitle;
    const mainDescription = matchedOverride?.portfolioDescription?.trim() || "";
    const mainImage = getMediaUrl(matchedOverride?.portfolioImage) || baseImage;

    const overrideCards = (matchedOverride?.portfolioCards ?? []).filter(Boolean) as StudioPortfolioListingCard[];
    if (overrideCards.length > 0) {
      overrideCards.forEach((card) => {
        items.push({
          category: card.cardSubtitle?.trim() || mainCategory,
          title: card.cardTitle?.trim() || mainTitle,
          description: card.cardDescription?.trim() || mainDescription,
          image: getMediaUrl(card.cardImage) || mainImage,
          link,
        });
      });
      return;
    }

    items.push({
      category: mainCategory,
      title: mainTitle,
      description: mainDescription,
      image: mainImage,
      link,
    });
  });

  return items.filter((item) => item.title || item.image);
}
