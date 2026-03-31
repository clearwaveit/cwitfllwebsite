/**
 * WordPress WPGraphQL API for Our Work page and Portfolio (work details).
 * Set in .env.local: NEXT_PUBLIC_WP_GRAPHQL_URL=https://your-site.local/graphql
 */

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || "http://cwitmain.local/graphql";

             /** WordPress origin (e.g. http://cwitmain.local) for resolving relative image URLs */
export function getWpOrigin(): string {
  try {
    const url = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || "http://cwitmain.local/graphql";
    const u = new URL(url);
    return u.origin;
  } catch {
    return "http://cwitmain.local";
  }
}

/** Make image URL absolute; if it already has a protocol, return as-is */
export function resolveImageUrl(url: string | undefined | null): string | undefined {
  if (!url || typeof url !== "string") return undefined;
  const trimmed = url.trim();
  if (!trimmed) return undefined;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const origin = getWpOrigin();
  return trimmed.startsWith("/") ? `${origin}${trimmed}` : `${origin}/${trimmed}`;
}

// -----------------------------------------------------------------------------
// Our Work Listing Page (page by URI)
// -----------------------------------------------------------------------------

export const GET_OUR_WORK_LISTING_PAGE = `
  query GetOurWorkListingPage($uri: ID!) {
    page(id: $uri, idType: URI) {
      title
      slug
      uri
      ourWorkPerPortfolioOverrides {
        ourWorkPerPortfolioItems {
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
              ... on MediaItem {
                sourceUrl
                mediaItemUrl
              }
            }
          }
          portfolioCards {
            cardSubtitle
            cardTitle
            cardDescription
            cardImage {
              node {
                ... on MediaItem {
                  sourceUrl
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
      ourWorkPageFields {
        ourWorkBannerSection {
          bannerTitle
          bannerDescription
          bannerBackgroundImage {
            node {
              sourceUrl
              altText
            }
          }
          bannerVideo {
            node {
              sourceUrl
            }
          }
        }
        workItemsSection {
          workItems {
            nodes {
              ... on Portfolio {
                id
                databaseId
                title
                slug
                uri
                excerpt
                homePortfolioListing {
                  portfolioListingSubtitle
                  portfolioListingTitle
                  portfolioListingDescription
                  portfolioListingCards {
                    cardSubtitle
                    cardTitle
                    cardDescription
                    cardImage {
                      node {
                        ... on MediaItem {
                          databaseId
                          sourceUrl
                          mediaItemUrl
                        }
                      }
                    }
                  }
                }
                portfolioDetails {
                  backgroundImage {
                    node {
                      sourceUrl
                      altText
                    }
                  }
                  industryTitle
                }
              }
            }
          }
        }
        accordionSection {
          accordionTitle
          accordionItems {
            faqTitle
            faqContent
          }
        }
      }
    }
  }
`;

/** Legacy query without new overrides field (for older schema compatibility). */
export const GET_OUR_WORK_LISTING_PAGE_LEGACY = `
  query GetOurWorkListingPageLegacy($uri: ID!) {
    page(id: $uri, idType: URI) {
      title
      slug
      uri
      ourWorkPageFields {
        ourWorkBannerSection {
          bannerTitle
          bannerDescription
          bannerBackgroundImage {
            node {
              sourceUrl
              altText
            }
          }
          bannerVideo {
            node {
              sourceUrl
            }
          }
        }
        workItemsSection {
          workItems {
            nodes {
              ... on Portfolio {
                id
                databaseId
                title
                slug
                uri
                excerpt
                homePortfolioListing {
                  portfolioListingSubtitle
                  portfolioListingTitle
                  portfolioListingDescription
                  portfolioListingCards {
                    cardSubtitle
                    cardTitle
                    cardDescription
                    cardImage {
                      node {
                        ... on MediaItem {
                          databaseId
                          sourceUrl
                          mediaItemUrl
                        }
                      }
                    }
                  }
                }
                portfolioDetails {
                  backgroundImage {
                    node {
                      sourceUrl
                      altText
                    }
                  }
                  industryTitle
                }
              }
            }
          }
        }
        accordionSection {
          accordionTitle
          accordionItems {
            faqTitle
            faqContent
          }
        }
      }
    }
  }
`;

export const OUR_WORK_LISTING_VARIABLES = { uri: "/our-work/" };

// -----------------------------------------------------------------------------
// Portfolios list (for Our Work grid when page has no work items)
// -----------------------------------------------------------------------------

export const GET_PORTFOLIOS_LIST = `
  query GetPortfoliosList {
    portfolios(first: 100) {
      nodes {
        databaseId
        slug
        title
        uri
        homePortfolioListing {
          portfolioListingSubtitle
          portfolioListingTitle
          portfolioListingDescription
          portfolioListingCards {
            cardSubtitle
            cardTitle
            cardDescription
            cardImage {
              node {
                ... on MediaItem {
                  databaseId
                  sourceUrl
                  mediaItemUrl
                }
              }
            }
          }
        }
        portfolioDetails {
          backgroundImage {
            node {
              sourceUrl
              altText
            }
          }
          heroBackgroundImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
`;

/**
 * Featured portfolios: either by taxonomy (portfolio_tag term "featured") or all with tags for client-side filter.
 * WordPress: use either "Portfolio Tag" (portfolioTags) or "Portfolio Categories" (portfolioCategories).
 * Add term "Featured" (slug: featured) and assign to portfolios. We check both taxonomies.
 */
export const GET_PORTFOLIOS_WITH_TAGS = `
  query GetPortfoliosWithTags {
    portfolios(first: 100) {
      nodes {
        slug
        title
        uri
        excerpt
        portfolioTags {
          nodes {
            slug
          }
        }
        portfolioCategories {
          nodes {
            slug
          }
        }
        portfolioDetails {
          backgroundImage {
            node {
              sourceUrl
              altText
            }
          }
          heroBackgroundImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
`;

/** Term slug used to mark portfolios as featured on home */
export const FEATURED_TERM_SLUG = "featured";

export type PortfoliosList = {
  portfolios?: {
    nodes?: Array<{
      databaseId?: number | null;
      slug?: string | null;
      title?: string | null;
      uri?: string | null;
      homePortfolioListing?: {
        portfolioListingSubtitle?: string | null;
        portfolioListingTitle?: string | null;
        portfolioListingDescription?: string | null;
        portfolioListingCards?: Array<{
          cardSubtitle?: string | null;
          cardTitle?: string | null;
          cardDescription?: string | null;
          cardImage?: {
            node?: {
              databaseId?: number | null;
              sourceUrl?: string | null;
              mediaItemUrl?: string | null;
            } | null;
          } | null;
        } | null> | null;
      } | null;
      portfolioDetails?: {
        backgroundImage?: { node?: { sourceUrl?: string; altText?: string | null } } | null;
        heroBackgroundImage?: { node?: { sourceUrl?: string; altText?: string | null } } | null;
      } | null;
    } | null>;
  } | null;
};

export type PortfoliosWithTagsList = {
  portfolios?: {
    nodes?: Array<{
      slug?: string | null;
      title?: string | null;
      uri?: string | null;
      excerpt?: string | null;
      portfolioTags?: { nodes?: Array<{ slug?: string | null } | null> } | null;
      portfolioCategories?: { nodes?: Array<{ slug?: string | null } | null> } | null;
      portfolioDetails?: {
        backgroundImage?: { node?: { sourceUrl?: string; altText?: string | null } } | null;
        heroBackgroundImage?: { node?: { sourceUrl?: string; altText?: string | null } } | null;
      } | null;
    } | null>;
  } | null;
};

// -----------------------------------------------------------------------------
// Portfolio by slug (work details)
// -----------------------------------------------------------------------------

export const GET_PORTFOLIO_BY_SLUG = `
  query GetPortfolioBySlug($slug: ID!) {
    portfolio(id: $slug, idType: SLUG) {
      title
      slug
      uri
      portfolioDetails {
      title
      backgroundImage {
        node {
          sourceUrl
          altText
        }
      }
        educationBackgroundImage {
          node {
            sourceUrl
            altText
          }
        }
        industryTitle
        industryDescription
        projectTypeTitle
        projectYear
        servicesTitle
        servicesList {
          serviceName
        }
        stayImage {
          node {
            sourceUrl
            altText
          }
        }
        stayParagraphs {
          paragraphText
        }
        deliveredTitle
        deliveredDescription
        deliverables {
          deliverableName
        }
        performanceMetrics {
          metricTitle
          metricValue
        }
        fullWidthBackgroundImage {
          node {
            sourceUrl
            altText
          }
        }
        fullWidthBackgroundImageAlt
        testimonialsTitle
        testimonials {
          testimonialText
          testimonialRating
        }
        relatedWorkItems {
          relatedWorkTitle
          relatedWorkDescription
          relatedWorkImage {
            node {
              sourceUrl
              altText
            }
          }
        }
        relatedWorkCtaVariant
        relatedWorkShowCta
        relatedWorkUseNewDesign
      }
    }
  }
`;

// -----------------------------------------------------------------------------
// Types (Our Work listing)
// -----------------------------------------------------------------------------

export type OurWorkListingPage = {
  page: {
    title?: string | null;
    slug?: string | null;
    uri?: string | null;
    ourWorkPerPortfolioOverrides?: {
      ourWorkPerPortfolioItems?: Array<{
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
        portfolioImage?: {
          node?: {
            sourceUrl?: string | null;
            mediaItemUrl?: string | null;
          } | null;
        } | null;
        portfolioCards?: Array<{
          cardSubtitle?: string | null;
          cardTitle?: string | null;
          cardDescription?: string | null;
          cardImage?: {
            node?: {
              sourceUrl?: string | null;
              mediaItemUrl?: string | null;
            } | null;
          } | null;
        } | null> | null;
      } | null> | null;
    } | null;
    ourWorkPageFields?: {
      ourWorkBannerSection?: {
        bannerTitle?: string | null;
        bannerDescription?: string | null;
        bannerBackgroundImage?: { node?: { sourceUrl?: string; altText?: string | null } } | null;
        bannerVideo?: { node?: { sourceUrl?: string } } | null;
      } | null;
      workItemsSection?: {
        workItems?:
        | Array<{
          __typename?: string;
          id?: string | null;
          databaseId?: number | null;
          title?: string | null;
          slug?: string | null;
          uri?: string | null;
          excerpt?: string | null;
          portfolioDetails?: {
            backgroundImage?:
            | { node?: { sourceUrl?: string; altText?: string | null }; sourceUrl?: string; altText?: string | null }
            | null;
            heroBackgroundImage?:
            | { node?: { sourceUrl?: string; altText?: string | null }; sourceUrl?: string; altText?: string | null }
            | null;
            industryTitle?: string | null;
          } | null;
        } | null>
        | { nodes?: Array<{ __typename?: string; id?: string | null; databaseId?: number | null; title?: string | null; slug?: string | null; uri?: string | null; excerpt?: string | null; portfolioDetails?: { backgroundImage?: { node?: { sourceUrl?: string; altText?: string | null }; sourceUrl?: string; altText?: string | null } | null; heroBackgroundImage?: { node?: { sourceUrl?: string; altText?: string | null }; sourceUrl?: string; altText?: string | null } | null; industryTitle?: string | null } | null } | null> }
        | { edges?: Array<{ node?: { __typename?: string; id?: string | null; databaseId?: number | null; title?: string | null; slug?: string | null; uri?: string | null; excerpt?: string | null; portfolioDetails?: { backgroundImage?: { node?: { sourceUrl?: string; altText?: string | null }; sourceUrl?: string; altText?: string | null } | null; heroBackgroundImage?: { node?: { sourceUrl?: string; altText?: string | null }; sourceUrl?: string; altText?: string | null } | null; industryTitle?: string | null } | null } | null } | null> }
        | null;
      } | null;
      accordionSection?: {
        accordionTitle?: string | null;
        accordionItems?: Array<{ faqTitle?: string | null; faqContent?: string | null } | null> | null;
      } | null;
    } | null;
  } | null;
};

// -----------------------------------------------------------------------------
// Types (Portfolio)
// -----------------------------------------------------------------------------

export type PortfolioBySlug = {
  portfolio: {
    title?: string | null;
    slug?: string | null;
    uri?: string | null;
    portfolioDetails?: {
      backgroundImage?: { node?: { sourceUrl?: string; altText?: string | null } } | null;
      heroBackgroundImage?: { node?: { sourceUrl?: string; altText?: string | null } } | null;
      educationBackgroundImage?: { node?: { sourceUrl?: string; altText?: string | null } } | null;
      industryTitle?: string | null;
      industryDescription?: string | null;
      projectTypeTitle?: string | null;
      projectYear?: string | null;
      servicesTitle?: string | null;
      servicesList?: Array<{ serviceName?: string | null } | null> | null;
      stayImage?: { node?: { sourceUrl?: string; altText?: string | null } } | null;
      stayParagraphs?: Array<{ paragraphText?: string | null } | null> | null;
      deliveredTitle?: string | null;
      deliveredDescription?: string | null;
      deliverables?: Array<{ deliverableName?: string | null } | null> | null;
      performanceMetrics?: Array<{ metricTitle?: string | null; metricValue?: string | null } | null> | null;
      fullWidthBackgroundImage?: { node?: { sourceUrl?: string; altText?: string | null } } | null;
      fullWidthBackgroundImageAlt?: string | null;
      testimonialsTitle?: string | null;
      testimonials?: Array<{ testimonialText?: string | null; testimonialRating?: number | null } | null> | null;
      relatedWorkItems?: Array<{
        relatedWorkTitle?: string | null;
        relatedWorkDescription?: string | null;
        relatedWorkImage?: { node?: { sourceUrl?: string; altText?: string | null } } | null;
      } | null> | null;
      relatedWorkCtaVariant?: string | string[] | null;
      relatedWorkShowCta?: boolean | null;
      relatedWorkUseNewDesign?: boolean | null;
    } | null;
  } | null;
};

export type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

// -----------------------------------------------------------------------------
// Fetch helpers
// -----------------------------------------------------------------------------

export async function fetchOurWorkListingPage(): Promise<
  GraphQLResponse<OurWorkListingPage>
> {
  const urisToTry = ["/our-work/", "our-work", "/our-work"];
  let lastRes: GraphQLResponse<OurWorkListingPage> = { data: undefined, errors: undefined };
  for (const uri of urisToTry) {
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: GET_OUR_WORK_LISTING_PAGE,
        variables: { uri },
      }),
    });
    const json = await res.json();
    lastRes = json as GraphQLResponse<OurWorkListingPage>;
    if (json.errors?.length) {
      const hasUnknownOverridesField = json.errors.some((e: { message?: string }) =>
        String(e?.message || "").includes('Cannot query field "ourWorkPerPortfolioOverrides"')
      );
      if (hasUnknownOverridesField) {
        const legacyRes = await fetch(GRAPHQL_ENDPOINT, {
          method: "POST",
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: GET_OUR_WORK_LISTING_PAGE_LEGACY,
            variables: { uri },
          }),
        });
        const legacyJson = (await legacyRes.json()) as GraphQLResponse<OurWorkListingPage>;
        lastRes = legacyJson;
        if (legacyJson.data?.page) return legacyJson;
      }
      continue;
    }
    if (json.data?.page) return json as GraphQLResponse<OurWorkListingPage>;
  }
  return lastRes;
}

export async function fetchPortfoliosList(): Promise<
  GraphQLResponse<PortfoliosList>
> {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: GET_PORTFOLIOS_LIST }),
  });
  return res.json();
}

/**
 * Fetches portfolios that have the "featured" tag (taxonomy term slug: featured).
 * Requires Portfolio CPT to have a taxonomy with term "Featured" (slug: featured), e.g. "Portfolio Tag" or "Portfolio Categories".
 * Returns same shape as PortfoliosList for easy use in Home Our Work section.
 */
export async function fetchFeaturedPortfoliosList(): Promise<
  GraphQLResponse<PortfoliosList>
> {
  try {
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_PORTFOLIOS_WITH_TAGS }),
    });
    const json = (await res.json()) as GraphQLResponse<PortfoliosWithTagsList>;
    if (json.errors?.length || !json.data?.portfolios?.nodes) {
      return { data: { portfolios: { nodes: [] } }, errors: json.errors };
    }
    const featured = json.data.portfolios.nodes.filter((node) => {
      const tagSlugs = node?.portfolioTags?.nodes?.map((t) => t?.slug?.trim()).filter(Boolean) ?? [];
      const categorySlugs = node?.portfolioCategories?.nodes?.map((t) => t?.slug?.trim()).filter(Boolean) ?? [];
      return tagSlugs.includes(FEATURED_TERM_SLUG) || categorySlugs.includes(FEATURED_TERM_SLUG);
    });
    return {
      data: { portfolios: { nodes: featured } },
      errors: undefined,
    };
  } catch {
    return { data: { portfolios: { nodes: [] } }, errors: undefined };
  }
}

export async function fetchPortfolioBySlug(
  slug: string
): Promise<GraphQLResponse<PortfolioBySlug>> {
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, "") || slug;
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: GET_PORTFOLIO_BY_SLUG,
      variables: { slug: normalizedSlug },
    }),
  });
  return res.json();
}
