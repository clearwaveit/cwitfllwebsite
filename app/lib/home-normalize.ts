/**
 * Normalizes Home page ACF/GraphQL data for section components.
 * Resolves image/media URLs and maps to component prop shapes.
 */

import { resolveImageUrl, resolveVideoUrl } from "@/app/lib/our-work-api";
import { splitCmsTextToParagraphs } from "@/app/lib/split-cms-text-to-paragraphs";
import type { HomePageFields } from "@/app/lib/home-api";
import type { SliderCard } from "@/app/components/ui/HorizontalScrollSlider";
import type { AccordionItem } from "@/app/components/sections/Accordion";

function resolve(url: string | undefined | null): string | undefined {
  return resolveImageUrl(url ?? undefined) ?? undefined;
}

function resolveVideo(url: string | undefined | null): string | undefined {
  return resolveVideoUrl(url ?? undefined) ?? undefined;
}

/** Resolve studio video URL from ACF/GraphQL – supports node.sourceUrl, mediaItemUrl, link, url, or plain string (incl. Cloudflare Stream MP4 links). */
function getStudioVideoUrl(raw: unknown): string | undefined {
  if (raw == null) return undefined;
  if (typeof raw === "string") {
    const u = raw.trim();
    return u ? (resolveVideo(u) ?? u) : undefined;
  }
  if (typeof raw !== "object") return undefined;
  const o = raw as Record<string, unknown>;
  const node = o.node as Record<string, unknown> | undefined;
  const url =
    (node?.sourceUrl as string)?.trim() ||
    (node?.mediaItemUrl as string)?.trim() ||
    (node?.link as string)?.trim() ||
    (o.sourceUrl as string)?.trim() ||
    (o.mediaItemUrl as string)?.trim() ||
    (o.url as string)?.trim() ||
    (o.link as string)?.trim();
  if (!url) return undefined;
  return resolveVideo(url) ?? url;
}

function getImageUrl(node: { node?: { sourceUrl?: string; altText?: string | null } } | null | undefined): string | undefined {
  return resolve(node?.node?.sourceUrl);
}

// -----------------------------------------------------------------------------
// Normalized section props (for passing to components)
// -----------------------------------------------------------------------------

export type HomeHeroProps = {
  videoSrc?: string;
  imageSrc?: string;
  /** CMS mobile hero video; when set, preferred on small screens */
  videoSrcMobile?: string;
  /** CMS mobile hero image (poster or full-bleed when no mobile/desktop video) */
  imageSrcMobile?: string;
  title?: string;
  subtitle?: string;
};

export type HomeShowcaseProps = {
  headline?: string;
  cards?: SliderCard[];
  beforeImageSrc?: string;
  logoImageSrc?: string;
};

export type HomeIntroProps = {
  paragraphs: string[];
  backgroundImageSrc?: string;
};

export type HomeStudioItem = {
  title: string;
  description: string;
  video: string;
  href: string;
  /** CTA label from CMS */
  buttonText?: string;
};

export type HomeStudiosProps = {
  studios: HomeStudioItem[];
};

export type HomeGenaiProps = {
  heading?: string;
  paragraph?: string;
  videoSrc?: string;
  ctaText?: string;
  ctaLink?: string;
};

export type HomeOurWorkItem = {
  subtitle?: string;
  title: string;
  description?: string;
  image: string;
  link?: string;
};

export type HomeOurWorkProps = {
  titleOverride?: string;
  sectionSubtitle?: string;
  sectionDescription?: string;
  /** Home Our Work items selected from Home page relationship field (featurePortfolioHome). */
  items?: HomeOurWorkItem[];
};

export type HomeOurClientsProps = {
  logoSrc?: string;
};

export type HomeBlogItem = {
  category: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  buttonText?: string;
  buttonLink?: string;
};

export type HomeBlogsProps = {
  sectionSubtitle?: string;
  sectionTitle?: string;
  sectionDescription?: string;
  items: HomeBlogItem[];
};

export type HomeAccordionProps = {
  title?: string;
  items?: AccordionItem[];
};

// -----------------------------------------------------------------------------
// Defaults (used when CMS has no data)
// -----------------------------------------------------------------------------

// No default intro paragraphs – CMS-only content

// -----------------------------------------------------------------------------
// Normalizers
// -----------------------------------------------------------------------------

export function normalizeHero(fields: HomePageFields | null): HomeHeroProps {
  if (!fields?.homeHeroSection) return {};
  const s = fields.homeHeroSection;
  /* getStudioVideoUrl supports MediaItem { node } and plain URL strings (ACF “Return: File URL”) */
  const videoUrl =
    getStudioVideoUrl(s.heroVideoUrl) ?? getStudioVideoUrl(s.heroVideo);
  const mobileVideoUrl =
    getStudioVideoUrl(s.heroVideoMobileUrl) ?? getStudioVideoUrl(s.heroVideoMobile);
  const imageUrl = getStudioVideoUrl(s.heroImage ?? s.heroimage);
  const mobileImageUrl = getStudioVideoUrl(s.heroImageMobile);
  return {
    videoSrc: videoUrl ?? undefined,
    /* Keep image when video exists too — Hero uses it as video poster and fallback */
    imageSrc: imageUrl ?? undefined,
    videoSrcMobile: mobileVideoUrl ?? undefined,
    imageSrcMobile: mobileImageUrl ?? undefined,
    title: s.heroTitle?.trim() || undefined,
    subtitle: s.heroSubtitle?.trim() || undefined,
  };
}

export function normalizeShowcase(fields: HomePageFields | null): HomeShowcaseProps {
  if (!fields) return {};
  const headline = fields.showcaseHeadline?.trim();
  const beforeImageSrc = getImageUrl(fields.showcaseBeforeImage as { node?: { sourceUrl?: string; altText?: string | null } });
  const logoImageSrc = getImageUrl(fields.showcaseLogoImage as { node?: { sourceUrl?: string; altText?: string | null } });
  try {
    const rawCards = fields.showcaseCards;
    const list = Array.isArray(rawCards) ? rawCards : [];
    if (!list.length) return { headline: headline || undefined, beforeImageSrc, logoImageSrc };

    const cards: SliderCard[] = list.map((c) => {
      const item = c as {
        cardType?: string | string[] | null;
        title?: string;
        subtitle?: string;
        description?: string;
        image?: unknown;
        backgroundClass?: string;
        textColorClass?: string;
      };
      const rawImage = item.image as {
        node?: { sourceUrl?: string; mediaItemUrl?: string; altText?: string | null };
        sourceUrl?: string;
        mediaItemUrl?: string;
      } | null | undefined;
      const imgUrl =
        resolve(
          rawImage?.node?.sourceUrl ??
          rawImage?.node?.mediaItemUrl ??
          rawImage?.sourceUrl ??
          rawImage?.mediaItemUrl ??
          undefined
        ) ?? undefined;
      const normalizedType = (() => {
        const cardTypeValue = Array.isArray(item.cardType)
          ? item.cardType.find((value) => typeof value === "string" && value.trim())
          : item.cardType;
        const rawType = cardTypeValue?.trim().toLowerCase().replace(/[\s-]+/g, "_");
        if (rawType?.includes("image")) return "image" as const;
        if (rawType?.includes("text")) return "text" as const;
        return imgUrl ? ("image" as const) : ("text" as const);
      })();
      return {
        type: normalizedType,
        title: item.title?.trim() ?? "",
        subtitle: item.subtitle?.trim(),
        description: item.description?.trim()?.replace(/\n/g, "\n"),
        image: imgUrl,
        backgroundColor: item.backgroundClass?.trim(),
        textColor: item.textColorClass?.trim(),
      };
    });
    return { headline: headline || undefined, cards, beforeImageSrc, logoImageSrc };
  } catch {
    return { headline: headline || undefined, beforeImageSrc, logoImageSrc };
  }
}

export function normalizeIntro(fields: HomePageFields | null): HomeIntroProps {
  if (!fields?.homeIntroSection) {
    return { paragraphs: [] };
  }
  const s = (Array.isArray(fields.homeIntroSection)
    ? fields.homeIntroSection.find(Boolean)
    : fields.homeIntroSection) as {
      introParagraph?: string | null;
      introBackgroundImage?: { node?: { sourceUrl?: string; altText?: string | null } } | null;
    } | null | undefined;
  if (!s) {
    return { paragraphs: [] };
  }
  const html = s.introParagraph?.trim();
  const paragraphs = html ? splitCmsTextToParagraphs(html) : [];
  const backgroundImageSrc = getImageUrl(s.introBackgroundImage as { node?: { sourceUrl?: string; altText?: string | null } });
  return { paragraphs, backgroundImageSrc };
}

// No default studios or videos – CMS-only content

function toStudioList(raw: unknown): HomeStudioItem[] {
  const list = Array.isArray(raw)
    ? raw
    : raw && typeof raw === "object" && Array.isArray((raw as { nodes?: unknown[] }).nodes)
      ? (raw as { nodes: unknown[] }).nodes
      : [];
  return list.slice(0, 3).map((s) => {
    const item = s as Record<string, unknown> | null | undefined;
    const link = (item?.link as string)?.trim();
    const hrefFromCms =
      link && (link.startsWith("http") || link.startsWith("/"))
        ? link
        : link
          ? `/${link.replace(/^\/+/, "")}`
          : "";
    const href = hrefFromCms;
    const videoUrl =
      getStudioVideoUrl(item?.videoUrl) ?? getStudioVideoUrl(item?.video) ?? "";
    const buttonText = (item?.buttonText as string)?.trim() || undefined;
    return {
      title: (item?.title as string)?.trim() ?? "",
      description: (item?.description as string)?.trim() ?? "",
      video: videoUrl || "",
      href,
      buttonText,
    };
  });
}

export function normalizeStudios(fields: HomePageFields | null): HomeStudiosProps {
  try {
    const raw = fields?.homeStudios;
    const studios = toStudioList(raw);
    if (!studios.length) return { studios: [] };
    return { studios };
  } catch {
    return { studios: [] };
  }
}

export function normalizeGenai(fields: HomePageFields | null): HomeGenaiProps {
  if (!fields?.homeGenaiSection) return {};
  const s = fields.homeGenaiSection;
  const videoSrc =
    getStudioVideoUrl(s.genaiVideoUrl) ?? getStudioVideoUrl(s.video);
  return {
    heading: s.heading?.trim() || undefined,
    paragraph: s.paragraph?.trim() || undefined,
    videoSrc,
    ctaText: s.ctaText?.trim(),
    ctaLink: s.ctaLink?.trim(),
  };
}

function toHomeOurWorkItems(raw: unknown): HomeOurWorkItem[] {
  let list: unknown[] = [];
  if (Array.isArray(raw)) {
    list = raw;
  } else if (raw && typeof raw === "object") {
    const o = raw as Record<string, unknown>;
    if (Array.isArray(o.nodes)) list = o.nodes;
    else if (Array.isArray(o.edges)) list = o.edges.map((e: { node?: unknown }) => e?.node).filter(Boolean);
  }
  return list.slice(0, 12).map((p) => {
    const node = p as Record<string, unknown> | null | undefined;
    const title = (node?.title as string)?.trim() ?? "";
    const slug = (node?.slug as string)?.trim();
    const excerpt = (node?.excerpt as string)?.trim() ?? "";
    const details = node?.portfolioDetails as Record<string, unknown> | null | undefined;
    const imgNode = (details?.backgroundImage ?? details?.heroBackgroundImage) as { node?: { sourceUrl?: string } } | null | undefined;
    const image = resolve(imgNode?.node?.sourceUrl) ?? "";
    const link = slug ? `/portfolio/${slug}` : undefined;
    return { title, description: excerpt || undefined, image, link };
  }).filter((item) => item.title || item.image);
}

type NormalizedMediaNode = { node?: { sourceUrl?: string | null; mediaItemUrl?: string | null } | null } | null | undefined;

type FeaturedPortfolioNode = {
  databaseId?: number | null;
  slug?: string | null;
  title?: string | null;
  excerpt?: string | null;
  homePortfolioListing?: {
    portfolioListingSubtitle?: string | null;
    portfolioListingTitle?: string | null;
    portfolioListingDescription?: string | null;
    portfolioListingCards?: Array<{
      cardSubtitle?: string | null;
      cardTitle?: string | null;
      cardDescription?: string | null;
      cardImage?: NormalizedMediaNode;
    } | null> | null;
  } | null;
  portfolioDetails?: {
    backgroundImage?: { node?: { sourceUrl?: string; mediaItemUrl?: string | null } } | null;
    heroBackgroundImage?: { node?: { sourceUrl?: string; mediaItemUrl?: string | null } } | null;
  } | null;
};

type PerPortfolioOverride = {
  portfolioPost?:
    | number
    | string
    | {
        databaseId?: number | string | null;
        node?: unknown;
        nodes?: unknown[];
        edges?: Array<{ node?: unknown } | null> | null;
      }
    | null;
  sectionSubtitle?: string | null;
  sectionTitle?: string | null;
  sectionDescription?: string | null;
  portfolioSubtitle?: string | null;
  portfolioTitle?: string | null;
  portfolioDescription?: string | null;
  portfolioImage?: NormalizedMediaNode;
  portfolioCards?: Array<{
    cardSubtitle?: string | null;
    cardTitle?: string | null;
    cardDescription?: string | null;
    cardImage?: NormalizedMediaNode;
  } | null> | null;
} | null;

function perPortfolioOverrideHasRowContent(ov: PerPortfolioOverride | null | undefined): boolean {
  if (!ov) return false;
  if (ov.sectionSubtitle?.trim() || ov.sectionTitle?.trim() || ov.sectionDescription?.trim()) return true;
  if (ov.portfolioSubtitle?.trim() || ov.portfolioTitle?.trim() || ov.portfolioDescription?.trim()) return true;
  if (getImageFromNode(ov.portfolioImage)) return true;
  const cards = (ov.portfolioCards ?? []).filter(Boolean);
  return cards.length > 0;
}

function getImageFromNode(image: NormalizedMediaNode): string | undefined {
  return resolve(image?.node?.sourceUrl ?? image?.node?.mediaItemUrl ?? undefined);
}

function toStringSafe(value: unknown): string | undefined {
  if (value == null) return undefined;
  const s = String(value).trim();
  return s || undefined;
}

function extractDigits(value: string): string | undefined {
  const m = value.match(/(\d+)/g);
  if (!m?.length) return undefined;
  return m[m.length - 1];
}

function tryDecodeRelayId(value: string): string | undefined {
  try {
    if (!/^[A-Za-z0-9+/=]+$/.test(value) || value.length < 8) return undefined;
    const decoded =
      typeof Buffer !== "undefined"
        ? Buffer.from(value, "base64").toString("utf8")
        : undefined;
    if (!decoded) return undefined;
    const fromDecodedDigits = extractDigits(decoded);
    if (fromDecodedDigits) return fromDecodedDigits;
    return decoded.trim() || undefined;
  } catch {
    return undefined;
  }
}

function normalizeId(value: unknown): string | undefined {
  if (value == null) return undefined;

  if (typeof value === "number") return String(value);
  if (typeof value === "string") {
    const raw = value.trim();
    if (!raw) return undefined;
    if (/^\d+$/.test(raw)) return raw;

    const relayDecoded = tryDecodeRelayId(raw);
    const relayDigits = relayDecoded ? extractDigits(relayDecoded) : undefined;
    if (relayDigits) return relayDigits;

    const rawDigits = extractDigits(raw);
    if (rawDigits) return rawDigits;
    return raw;
  }

  if (typeof value === "object") {
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

  return undefined;
}

function getOverridePortfolioId(override: PerPortfolioOverride): string | undefined {
  if (!override) return undefined;
  return normalizeId(override.portfolioPost);
}

function getSelectedPortfolios(fields: HomePageFields | null): FeaturedPortfolioNode[] {
  const pickList = (raw: unknown): unknown[] => {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw.filter(Boolean);
    if (typeof raw !== "object") return [];
    const o = raw as Record<string, unknown>;
    if (Array.isArray(o.nodes)) return o.nodes.filter(Boolean);
    if (Array.isArray(o.edges)) {
      return o.edges
        .map((e) => (e as { node?: unknown } | null | undefined)?.node)
        .filter(Boolean);
    }
    if (o.node) return [o.node];
    return [];
  };

  const fromFeature = pickList((fields as Record<string, unknown> | null | undefined)?.featurePortfolioHome);
  const fromLegacy = pickList((fields as Record<string, unknown> | null | undefined)?.homeFeaturedPortfolios);
  const combined = [...fromFeature, ...fromLegacy];
  return (combined as FeaturedPortfolioNode[]).filter(Boolean);
}

export function normalizeOurWork(fields: HomePageFields | null): HomeOurWorkProps {
  const out: HomeOurWorkProps = {};
  const listing = fields?.homePagePortfolioListing;
  const selected = getSelectedPortfolios(fields);
  const globalSubtitle = listing?.homePortfolioListingSubtitle?.trim();
  const globalTitle = listing?.homePortfolioListingTitle?.trim();
  const globalDescription = listing?.homePortfolioListingDescription?.trim();
  const globalCards = (listing?.homePortfolioListingCards ?? []).filter(Boolean);
  const perPortfolioOverrides = ((listing?.homePortfolioPerPortfolioItems ?? []).filter(Boolean) as PerPortfolioOverride[]);

  const unlinkedOverridesQueue = perPortfolioOverrides.filter(
    (ov) => !getOverridePortfolioId(ov) && perPortfolioOverrideHasRowContent(ov)
  );
  let unlinkedOverrideIndex = 0;

  const firstMatchedOverrideWithSection =
    selected
      .map((p) => {
        const selectedId = normalizeId(p.databaseId);
        if (!selectedId) return null;
        return perPortfolioOverrides.find((ov) => getOverridePortfolioId(ov) === selectedId) ?? null;
      })
      .find((ov) => !!(ov?.sectionTitle?.trim() || ov?.sectionSubtitle?.trim() || ov?.sectionDescription?.trim())) ??
    perPortfolioOverrides.find(
      (ov) =>
        !getOverridePortfolioId(ov) &&
        !!(ov?.sectionTitle?.trim() || ov?.sectionSubtitle?.trim() || ov?.sectionDescription?.trim())
    ) ??
    null;

  out.titleOverride =
    firstMatchedOverrideWithSection?.sectionTitle?.trim() ||
    globalTitle ||
    fields?.ourWorkTitle?.trim() ||
    undefined;
  out.sectionSubtitle =
    firstMatchedOverrideWithSection?.sectionSubtitle?.trim() ||
    globalSubtitle ||
    undefined;
  out.sectionDescription =
    firstMatchedOverrideWithSection?.sectionDescription?.trim() ||
    globalDescription ||
    undefined;

  const builtItems: HomeOurWorkItem[] = [];

  selected.forEach((portfolio) => {
    const selectedId = normalizeId(portfolio.databaseId);
    let matchedOverride =
      (selectedId
        ? perPortfolioOverrides.find((ov) => getOverridePortfolioId(ov) === selectedId)
        : null) ?? null;
    if (!matchedOverride && unlinkedOverrideIndex < unlinkedOverridesQueue.length) {
      matchedOverride = unlinkedOverridesQueue[unlinkedOverrideIndex];
      unlinkedOverrideIndex += 1;
    }

    const portfolioSlug = portfolio.slug?.trim();
    const link = portfolioSlug ? `/portfolio/${portfolioSlug}` : undefined;

    const portfolioListing = portfolio.homePortfolioListing;
    const ownCards = (portfolioListing?.portfolioListingCards ?? []).filter(Boolean);

    const baseSubtitle = portfolioListing?.portfolioListingSubtitle?.trim() || globalSubtitle || "";
    const baseTitle = portfolio.title?.trim() || "";
    const baseDescription = portfolio.excerpt?.trim() || "";
    const baseImage =
      resolve(
        portfolio.portfolioDetails?.backgroundImage?.node?.sourceUrl ??
        portfolio.portfolioDetails?.backgroundImage?.node?.mediaItemUrl ??
        portfolio.portfolioDetails?.heroBackgroundImage?.node?.sourceUrl ??
        portfolio.portfolioDetails?.heroBackgroundImage?.node?.mediaItemUrl ??
        undefined
      ) || "";

    const mainSubtitle = matchedOverride?.portfolioSubtitle?.trim() || baseSubtitle;
    const mainTitle =
      matchedOverride?.portfolioTitle?.trim() ||
      portfolioListing?.portfolioListingTitle?.trim() ||
      baseTitle;
    const mainDescription =
      matchedOverride?.portfolioDescription?.trim() ||
      portfolioListing?.portfolioListingDescription?.trim() ||
      baseDescription;
    const mainImage =
      getImageFromNode(matchedOverride?.portfolioImage) ||
      baseImage;

    const overrideCards = (matchedOverride?.portfolioCards ?? []).filter(Boolean);
    const chosenCards =
      overrideCards.length > 0
        ? overrideCards
        : ownCards.length > 0
          ? ownCards
          : globalCards;

    if (chosenCards.length > 0) {
      chosenCards.forEach((card) => {
        const c = card as {
          cardSubtitle?: string | null;
          cardTitle?: string | null;
          cardDescription?: string | null;
          cardImage?: NormalizedMediaNode;
        };
        builtItems.push({
          subtitle: c.cardSubtitle?.trim() || mainSubtitle,
          title: c.cardTitle?.trim() || mainTitle,
          description: c.cardDescription?.trim() || mainDescription,
          image: getImageFromNode(c.cardImage) || mainImage,
          link,
        });
      });
      return;
    }

    builtItems.push({
      subtitle: mainSubtitle,
      title: mainTitle,
      description: mainDescription,
      image: mainImage,
      link,
    });
  });

  if (builtItems.length > 0) {
    out.items = builtItems;
    return out;
  }

  if (globalCards.length > 0) {
    out.items = globalCards.map((card) => {
      const c = card as {
        cardSubtitle?: string | null;
        cardTitle?: string | null;
        cardDescription?: string | null;
        cardImage?: NormalizedMediaNode;
      };
      return {
        subtitle: c.cardSubtitle?.trim() || globalSubtitle || "",
        title: c.cardTitle?.trim() || globalTitle || "",
        description:
          c.cardDescription?.trim() ||
          globalDescription ||
          "",
        image: getImageFromNode(c.cardImage) || "",
      };
    });
    return out;
  }

  const raw = fields as Record<string, unknown> | null | undefined;
  const featuredItems = toHomeOurWorkItems(raw?.featurePortfolioHome ?? raw?.homeFeaturedPortfolios);
  if (featuredItems.length) out.items = featuredItems;
  return out;
}

export function normalizeOurClients(fields: HomePageFields | null): HomeOurClientsProps {
  const url = getImageUrl(fields?.clientsLogo as { node?: { sourceUrl?: string; altText?: string | null } });
  return { logoSrc: url };
}

// No default blogs – CMS-only content

function stripHtmlToText(value: string | undefined | null): string {
  if (!value) return "";
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function getSelectedPosts(raw: unknown): Array<Record<string, unknown>> {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.filter(Boolean) as Array<Record<string, unknown>>;
  if (typeof raw !== "object") return [];
  const o = raw as Record<string, unknown>;
  if (Array.isArray(o.nodes)) return o.nodes.filter(Boolean) as Array<Record<string, unknown>>;
  if (Array.isArray(o.edges)) {
    return o.edges
      .map((e) => (e as { node?: Record<string, unknown> } | null | undefined)?.node)
      .filter(Boolean) as Array<Record<string, unknown>>;
  }
  if (o.node && typeof o.node === "object") return [o.node as Record<string, unknown>];
  return [];
}

function normalizePostIdForOverride(raw: unknown): string | undefined {
  if (raw == null) return undefined;
  if (typeof raw === "number") return String(raw);
  if (typeof raw === "string") {
    const v = raw.trim();
    if (!v) return undefined;
    return /^\d+$/.test(v) ? v : undefined;
  }
  if (typeof raw !== "object") return undefined;
  const o = raw as Record<string, unknown>;
  return (
    normalizePostIdForOverride(o.databaseId) ||
    normalizePostIdForOverride(o.postId) ||
    normalizePostIdForOverride(o.id) ||
    (Array.isArray(o.nodes)
      ? normalizePostIdForOverride((o.nodes[0] as Record<string, unknown> | undefined)?.databaseId ?? o.nodes[0])
      : undefined) ||
    (Array.isArray(o.edges)
      ? normalizePostIdForOverride(((o.edges[0] as { node?: unknown } | undefined)?.node as Record<string, unknown> | undefined)?.databaseId)
      : undefined) ||
    normalizePostIdForOverride(o.node)
  );
}

function buildPerBlogCardOverridesMap(
  raw: unknown
): Map<string, { category?: string; title?: string; description?: string; image?: string; buttonText?: string; buttonLink?: string }> {
  const map = new Map<string, { category?: string; title?: string; description?: string; image?: string; buttonText?: string; buttonLink?: string }>();
  const rows = Array.isArray(raw) ? raw.filter(Boolean) : [];
  for (const row of rows) {
    const r = row as Record<string, unknown>;
    const postId = normalizePostIdForOverride(r.blogPost);
    if (!postId) continue;
    const category = trimOrUndefined(r.cardSubtitle as string | null | undefined);
    const title = trimOrUndefined(r.cardTitle as string | null | undefined);
    const description = trimOrUndefined(r.cardDescription as string | null | undefined);
    // cardImage can be flat { sourceUrl } or nested { node: { sourceUrl } }
    const cardImg = r.cardImage as Record<string, unknown> | null | undefined;
    const imgUrl = (cardImg?.sourceUrl as string) ?? (cardImg?.node as Record<string, unknown> | undefined)?.sourceUrl as string | undefined;
    const image = resolve(imgUrl ?? undefined) ?? undefined;
    const buttonText = trimOrUndefined(r.cardButtonText as string | null | undefined);
    const buttonLink = trimOrUndefined(r.cardButtonLink as string | null | undefined);
    if (category || title || description || image || buttonText) {
      map.set(postId, { category, title, description, image, buttonText, buttonLink });
    }
  }
  return map;
}

function buildPerBlogCardsFromOverrides(raw: unknown): HomeBlogItem[] {
  const rows = Array.isArray(raw) ? raw.filter(Boolean) : [];
  const items: HomeBlogItem[] = [];
  for (const row of rows) {
    const r = row as Record<string, unknown>;
    // blogPost can be flat { databaseId, title, slug } or nested { node: { ... } }
    const blogPostRaw = r.blogPost as Record<string, unknown> | null | undefined;
    const post = blogPostRaw?.node ? (blogPostRaw.node as Record<string, unknown>) : blogPostRaw;
    const fallbackTitle = trimOrUndefined(post?.title as string | null | undefined);
    const slug = trimOrUndefined(post?.slug as string | null | undefined);

    const category = trimOrUndefined(r.cardSubtitle as string | null | undefined) || "";
    const title = trimOrUndefined(r.cardTitle as string | null | undefined) || fallbackTitle || "";
    const description = trimOrUndefined(r.cardDescription as string | null | undefined) || "";
    // cardImage can be flat { sourceUrl } or nested { node: { sourceUrl } }
    const cardImg = r.cardImage as Record<string, unknown> | null | undefined;
    const imgUrl = (cardImg?.sourceUrl as string) ?? (cardImg?.node as Record<string, unknown> | undefined)?.sourceUrl as string | undefined;
    const image = resolve(imgUrl ?? undefined) ?? undefined;
    const link = slug ? `/blogs/${slug}` : undefined;

    const buttonText = trimOrUndefined(r.cardButtonText as string | null | undefined);
    const buttonLink = trimOrUndefined(r.cardButtonLink as string | null | undefined);

    if (!title) continue;
    items.push({
      category,
      title,
      description,
      image,
      link,
      buttonText,
      buttonLink,
    });
  }
  return items;
}

function trimOrUndefined(value: string | null | undefined): string | undefined {
  const v = value?.trim();
  return v ? v : undefined;
}

/**
 * Home page Blogs section from CMS fields only (no latest-posts or other front-end fallbacks).
 */
export function normalizeBlogs(fields: HomePageFields | null): HomeBlogsProps {
  const overrides = fields?.homeBlogsSectionOverrides;
  const sectionSubtitle = overrides?.homeBlogsSectionSubtitle?.trim() || undefined;
  const sectionTitleOverride = overrides?.homeBlogsSectionTitle?.trim();
  const sectionDescription = overrides?.homeBlogsSectionDescription?.trim() || undefined;
  const sectionTitle = sectionTitleOverride || fields?.blogsSectionTitle?.trim();
  const defaultTitle = sectionTitle || "";

  try {
    // homeBlogs repeater: manual per-card content (category, title, description, image, link)
    const homeBlogsRepeater = (Array.isArray(fields?.homeBlogs) ? fields.homeBlogs : []).filter(Boolean);

    // Selected blogs: from homeBlogsSelectedPosts relationship field or overrides group
    const selectedPosts = getSelectedPosts(
      overrides?.homeBlogsSelectedPosts ?? fields?.homeBlogsSelectedPosts
    );
    const directOverrideCards = buildPerBlogCardsFromOverrides(overrides?.perBlogCardOverrides);
    const cardOverridesMap = buildPerBlogCardOverridesMap(overrides?.perBlogCardOverrides);

    if (selectedPosts.length > 0) {
      const items: HomeBlogItem[] = selectedPosts.map((post, index) => {
        // Use homeBlogs repeater entry at same index as per-card override
        const repeaterEntry = homeBlogsRepeater[index] as {
          category?: string | null; title?: string | null; description?: string | null;
          image?: { node?: { sourceUrl?: string; altText?: string | null } } | null; link?: string | null;
          buttonText?: string | null; buttonLink?: string | null;
        } | null | undefined;
        const repeaterCategory = repeaterEntry?.category?.trim() || undefined;
        const repeaterTitle = repeaterEntry?.title?.trim() || undefined;
        const repeaterDescription = repeaterEntry?.description?.trim() || undefined;
        const repeaterImage = resolve(repeaterEntry?.image?.node?.sourceUrl ?? undefined);
        const repeaterLink = repeaterEntry?.link?.trim() || undefined;
        const repeaterButtonText = repeaterEntry?.buttonText?.trim() || undefined;
        const repeaterButtonLink = repeaterEntry?.buttonLink?.trim() || undefined;

        // Also check perBlogCardOverrides (from homeBlogsSectionOverrides ACF group if it exists)
        const postIdRaw = post.databaseId;
        const postId =
          typeof postIdRaw === "number"
            ? String(postIdRaw)
            : typeof postIdRaw === "string"
              ? postIdRaw.trim()
              : undefined;
        const perCard = postId ? cardOverridesMap.get(postId) : undefined;

        const categories = (post.categories as { nodes?: Array<{ name?: string | null } | null> | null } | null | undefined)?.nodes ?? [];
        const postCategory = categories.find((c) => c?.name?.trim())?.name?.trim() || "";
        const postTitle = String(post.title ?? "").trim();
        const postExcerpt = stripHtmlToText(String(post.excerpt ?? ""));
        const featured = post.featuredImage as {
          node?: { sourceUrl?: string | null; mediaItemUrl?: string | null };
        } | null | undefined;
        const postImage = resolve(featured?.node?.sourceUrl ?? featured?.node?.mediaItemUrl ?? undefined);
        const slug = String(post.slug ?? "").trim();
        const uri = String(post.uri ?? "").trim();
        const postLink = slug ? `/blogs/${slug}` : (uri || undefined);

        // Priority: repeater override > perBlogCardOverrides > post data > defaults
        return {
          category: repeaterCategory ?? perCard?.category ?? postCategory,
          title: repeaterTitle ?? perCard?.title ?? postTitle,
          description: repeaterDescription ?? perCard?.description ?? (postExcerpt || ""),
          image: repeaterImage ?? perCard?.image ?? postImage,
          link: repeaterLink ?? postLink,
          buttonText: repeaterButtonText ?? perCard?.buttonText,
          buttonLink: repeaterButtonLink ?? perCard?.buttonLink,
        };
      }).filter((item) => item.title);
      if (items.length > 0) {
        return {
          sectionSubtitle,
          sectionTitle: defaultTitle,
          sectionDescription,
          items,
        };
      }
    }

    // No selected posts: use homeBlogs repeater as standalone cards
    if (homeBlogsRepeater.length > 0) {
      const repeaterItems: HomeBlogItem[] = homeBlogsRepeater
        .map((entry) => {
          const e = entry as { category?: string | null; title?: string | null; description?: string | null; image?: { node?: { sourceUrl?: string; altText?: string | null } } | null; link?: string | null; buttonText?: string | null; buttonLink?: string | null };
          return {
            category: e.category?.trim() || "",
            title: e.title?.trim() || "",
            description: e.description?.trim() || "",
            image: resolve(e.image?.node?.sourceUrl ?? undefined),
            link: e.link?.trim() || undefined,
            buttonText: e.buttonText?.trim() || undefined,
            buttonLink: e.buttonLink?.trim() || undefined,
          };
        })
        .filter((item) => item.title);
      if (repeaterItems.length > 0) {
        return {
          sectionSubtitle,
          sectionTitle: defaultTitle,
          sectionDescription,
          items: repeaterItems,
        };
      }
    }

    if (directOverrideCards.length > 0) {
      return {
        sectionSubtitle,
        sectionTitle: defaultTitle,
        sectionDescription,
        items: directOverrideCards,
      };
    }

    return {
      sectionSubtitle,
      sectionTitle: defaultTitle,
      sectionDescription,
      items: [],
    };
  } catch {
    return {
      sectionSubtitle,
      sectionTitle: defaultTitle,
      sectionDescription,
      items: [],
    };
  }
}

export function normalizeAccordion(fields: HomePageFields | null): HomeAccordionProps {
  const title = fields?.accordionTitle?.trim();
  try {
    const raw = fields?.accordionItems;
    const list = Array.isArray(raw) ? raw : [];
    if (!list.length) return { title: title || undefined, items: undefined };
    const items: AccordionItem[] = list
      .map((a) => {
        const item = a as { faqTitle?: string; faqContent?: string } | null | undefined;
        const t = item?.faqTitle?.trim() ?? "";
        const c = item?.faqContent?.trim() ?? "";
        if (!t && !c) return null;
        return { title: t, content: c };
      })
      .filter((x): x is { title: string; content: string } => x != null)
      .map((x, i) => ({ id: i + 1, ...x }));
    return { title: title || undefined, items: items.length ? items : undefined };
  } catch {
    return { title: title || undefined, items: undefined };
  }
}
