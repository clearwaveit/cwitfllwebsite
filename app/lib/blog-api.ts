import { resolveImageUrl } from "@/app/lib/our-work-api";

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || "http://cwitmain.local/graphql";

export const GET_BLOG_POSTS = `
  query GetBlogPosts {
    posts(first: 24, where: { status: PUBLISH }) {
      nodes {
        databaseId
        title
        slug
        uri
        excerpt
        date
        categories {
          nodes {
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
            mediaItemUrl
            altText
          }
        }
      }
    }
  }
`;

export type BlogPostNode = {
  databaseId?: number | null;
  title?: string | null;
  slug?: string | null;
  uri?: string | null;
  excerpt?: string | null;
  date?: string | null;
  categories?: { nodes?: Array<{ name?: string | null; slug?: string | null } | null> | null } | null;
  featuredImage?: {
    node?: {
      sourceUrl?: string | null;
      mediaItemUrl?: string | null;
      altText?: string | null;
    } | null;
  } | null;
};

export type BlogPostsResponse = {
  posts?: { nodes?: Array<BlogPostNode | null> | null } | null;
};

export type GraphQLBlogResponse = {
  data?: BlogPostsResponse;
  errors?: Array<{ message: string }>;
};

function stripHtmlToText(value: string | undefined | null): string {
  if (!value) return "";
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export async function fetchBlogPosts(): Promise<GraphQLBlogResponse> {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: GET_BLOG_POSTS }),
  });
  return res.json();
}

/** Fetch latest N posts (e.g. for Home page blogs fallback when homeBlogsSelectedPosts is empty). */
const GET_LATEST_BLOG_POSTS = `
  query GetLatestBlogPosts($first: Int!) {
    posts(first: $first, where: { status: PUBLISH }) {
      nodes {
        databaseId
        title
        slug
        uri
        excerpt
        date
        categories {
          nodes {
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
            mediaItemUrl
            altText
          }
        }
      }
    }
  }
`;

export async function fetchLatestBlogPosts(limit: number = 6): Promise<GraphQLBlogResponse> {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: GET_LATEST_BLOG_POSTS,
      variables: { first: Math.min(Math.max(1, limit), 24) },
    }),
  });
  return res.json();
}

export type BlogCardItem = {
  category: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  buttonText?: string;
  buttonLink?: string;
};

export type BlogDetailItem = {
  title: string;
  slug: string;
  badge?: string;
  heroImage?: string;
  excerpt?: string;
  content?: string;
  industryTitle?: string;
  industryDescription?: string;
  projectTypeTitle?: string;
  projectYear?: string;
  servicesTitle?: string;
  services?: string[];
  stayParagraphs?: string[];
  deliveredTitle?: string;
  deliveredDescription?: string;
  deliverables?: string[];
  performanceMetrics?: Array<{ title: string; value: string }>;
  fullWidthImage?: string;
  fullWidthImageAlt?: string;
  testimonialsTitle?: string;
  testimonials?: Array<{ text: string; rating: number }>;
};

type GraphQLBlogDetailResponse = {
  data?: {
    post?: {
      title?: string | null;
      slug?: string | null;
      excerpt?: string | null;
      content?: string | null;
      blogDetails?: {
        blogDetails?: {
          badge?: string | null;
          heroImage?: {
            node?: { sourceUrl?: string | null; mediaItemUrl?: string | null } | null;
          } | null;
          excerpt?: string | null;
          content?: string | null;
          industryTitle?: string | null;
          industryDescription?: string | null;
          projectTypeTitle?: string | null;
          projectYear?: string | null;
          servicesTitle?: string | null;
          services?: Array<{ item?: string | null } | null> | null;
          stayParagraphs?: Array<{ paragraph?: string | null } | null> | null;
          deliveredTitle?: string | null;
          deliveredDescription?: string | null;
          deliverables?: Array<{ item?: string | null } | null> | null;
          performanceMetrics?: Array<{ title?: string | null; value?: string | null } | null> | null;
          fullWidthImage?: {
            node?: { sourceUrl?: string | null; mediaItemUrl?: string | null } | null;
          } | null;
          fullWidthImageAlt?: string | null;
          testimonialsTitle?: string | null;
          testimonials?: Array<{ text?: string | null; rating?: number | null } | null> | null;
        } | null;
      } | null;
    } | null;
  };
  errors?: Array<{ message: string }>;
};

const GET_BLOG_DETAIL_BY_SLUG = `
  query GetBlogDetailBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      slug
      excerpt
      content
      blogDetails {
        blogDetails {
          badge
          heroImage {
            node {
              sourceUrl
              mediaItemUrl
            }
          }
          excerpt
          content
          industryTitle
          industryDescription
          projectTypeTitle
          projectYear
          servicesTitle
          services {
            item
          }
          stayParagraphs {
            paragraph
          }
          deliveredTitle
          deliveredDescription
          deliverables {
            item
          }
          performanceMetrics {
            title
            value
          }
          fullWidthImage {
            node {
              sourceUrl
              mediaItemUrl
            }
          }
          fullWidthImageAlt
          testimonialsTitle
          testimonials {
            text
            rating
          }
        }
      }
    }
  }
`;

function trimOrUndefined(value: string | null | undefined): string | undefined {
  const v = value?.trim();
  return v ? v : undefined;
}

function mapTextList<T extends { item?: string | null } | { paragraph?: string | null }>(
  list: Array<T | null> | null | undefined,
  key: "item" | "paragraph"
): string[] | undefined {
  const items = (list ?? [])
    .map((x) => (x ? trimOrUndefined((x as Record<string, string | null | undefined>)[key]) : undefined))
    .filter((x): x is string => Boolean(x));
  return items.length > 0 ? items : undefined;
}

export async function fetchBlogDetailBySlug(slug: string): Promise<BlogDetailItem | null> {
  const slugNorm = slug?.replace(/^\/+|\/+$/g, "").trim();
  if (!slugNorm) return null;

  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: GET_BLOG_DETAIL_BY_SLUG,
      variables: { slug: slugNorm },
    }),
  });

  const json = (await res.json()) as GraphQLBlogDetailResponse;
  const post = json.data?.post;
  if (!post?.slug) return null;
  const details = post.blogDetails?.blogDetails;

  const heroImage = resolveImageUrl(
    details?.heroImage?.node?.sourceUrl ?? details?.heroImage?.node?.mediaItemUrl ?? undefined
  );
  const fullWidthImage = resolveImageUrl(
    details?.fullWidthImage?.node?.sourceUrl ?? details?.fullWidthImage?.node?.mediaItemUrl ?? undefined
  );
  const performanceMetrics = (details?.performanceMetrics ?? [])
    .filter(Boolean)
    .map((m) => ({
      title: trimOrUndefined(m?.title) ?? "",
      value: trimOrUndefined(m?.value) ?? "",
    }))
    .filter((m) => m.title && m.value);
  const testimonials = (details?.testimonials ?? [])
    .filter(Boolean)
    .map((t) => ({
      text: trimOrUndefined(t?.text) ?? "",
      rating: typeof t?.rating === "number" ? t.rating : 0,
    }))
    .filter((t) => t.text && t.rating > 0);

  return {
    title: trimOrUndefined(post.title) ?? "Blog",
    slug: post.slug,
    badge: trimOrUndefined(details?.badge),
    heroImage: heroImage ?? undefined,
    excerpt: trimOrUndefined(details?.excerpt) ?? trimOrUndefined(post.excerpt),
    content: trimOrUndefined(details?.content) ?? trimOrUndefined(post.content),
    industryTitle: trimOrUndefined(details?.industryTitle),
    industryDescription: trimOrUndefined(details?.industryDescription),
    projectTypeTitle: trimOrUndefined(details?.projectTypeTitle),
    projectYear: trimOrUndefined(details?.projectYear),
    servicesTitle: trimOrUndefined(details?.servicesTitle),
    services: mapTextList(details?.services, "item"),
    stayParagraphs: mapTextList(details?.stayParagraphs, "paragraph"),
    deliveredTitle: trimOrUndefined(details?.deliveredTitle),
    deliveredDescription: trimOrUndefined(details?.deliveredDescription),
    deliverables: mapTextList(details?.deliverables, "item"),
    performanceMetrics: performanceMetrics.length > 0 ? performanceMetrics : undefined,
    fullWidthImage: fullWidthImage ?? undefined,
    fullWidthImageAlt: trimOrUndefined(details?.fullWidthImageAlt),
    testimonialsTitle: trimOrUndefined(details?.testimonialsTitle),
    testimonials: testimonials.length > 0 ? testimonials : undefined,
  };
}

// -----------------------------------------------------------------------------
// Blog Page (same as Home: homeBlogsSectionOverrides + selected posts)
// -----------------------------------------------------------------------------
const BLOG_PAGE_FIELDS_FRAGMENT = `
  fragment BlogPageFields on Page {
    blogPage {
      heroTitle
      heroDescription
      blogSectionSubtitle
      blogSectionTitle
      blogSectionDescription
      blogCards {
        category
        title
        description
        image {
          node {
            sourceUrl
            mediaItemUrl
            altText
          }
        }
        link
        buttonText
        buttonLink
      }
    }
  }
`;

const GET_BLOG_PAGE = `
  query GetBlogPage($uri: ID!, $slug: String) {
    pageByUri: page(id: $uri, idType: URI) {
      databaseId
      ...BlogPageFields
    }
    pageBySlug: page(id: $slug, idType: SLUG) {
      databaseId
      ...BlogPageFields
    }
  }
  ${BLOG_PAGE_FIELDS_FRAGMENT}
`;

const GET_BLOG_PAGE_BY_ID = `
  query GetBlogPageById($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      databaseId
      ...BlogPageFields
    }
  }
  ${BLOG_PAGE_FIELDS_FRAGMENT}
`;

export type BlogCard = {
  category?: string | null;
  title?: string | null;
  description?: string | null;
  image?: {
    node?: { sourceUrl?: string | null; mediaItemUrl?: string | null; altText?: string | null } | null;
  } | null;
  link?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
};

export type BlogPageData = {
  heroTitle?: string | null;
  heroDescription?: string | null;
  blogSectionSubtitle?: string | null;
  blogSectionTitle?: string | null;
  blogSectionDescription?: string | null;
  blogCards?: Array<BlogCard | null> | null;
};

export type BlogPageResponse = {
  data?: {
    page?: {
      blogPage?: BlogPageData | null;
    } | null;
  };
  errors?: Array<{ message: string }>;
};

/** Fetch Blog page: try by URI then by SLUG (Posts page often resolves only by SLUG in WPGraphQL). */
export async function fetchBlogPage(uri: string): Promise<BlogPageResponse> {
  const normalized = uri.replace(/^\/+|\/+$/g, "") || "blogs";
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: GET_BLOG_PAGE,
      variables: { uri: normalized, slug: normalized },
    }),
  });
  const json = (await res.json()) as {
    data?: {
      pageByUri?: BlogPageResponse["data"] extends { page?: infer P } ? P : never;
      pageBySlug?: BlogPageResponse["data"] extends { page?: infer P } ? P : never;
    } | null;
    errors?: Array<{ message: string }>;
  };
  const page = json.data?.pageByUri ?? json.data?.pageBySlug ?? null;
  return { data: page ? { page } : undefined, errors: json.errors };
}

/** Fetch Blog page by database ID (fallback for Posts pages that WPGraphQL can't resolve by slug/uri). */
export async function fetchBlogPageById(id: number): Promise<BlogPageResponse> {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: GET_BLOG_PAGE_BY_ID,
      variables: { id: String(id) },
    }),
  });
  const json = (await res.json()) as {
    data?: { page?: BlogPageResponse["data"] extends { page?: infer P } ? P : never } | null;
    errors?: Array<{ message: string }>;
  };
  return { data: json.data?.page ? { page: json.data.page } : undefined, errors: json.errors };
}

/** Try "blogs" by slug/uri first, then "blog", then fallback to database ID 395 (Posts page). */
export async function fetchBlogPageBySlug(): Promise<BlogPageResponse> {
  const res = await fetchBlogPage("blogs");
  if (res.data?.page) return res;
  const res2 = await fetchBlogPage("blog");
  if (res2.data?.page) return res2;
  return fetchBlogPageById(395);
}

/** Convert blogCards repeater entries into BlogCardItem[] */
function mapBlogCardsRepeater(cards: Array<BlogCard | null> | null | undefined): BlogCardItem[] {
  if (!cards?.length) return [];
  return cards
    .filter(Boolean)
    .map((c) => ({
      category: c!.category?.trim() || "Blog",
      title: c!.title?.trim() || "",
      description: c!.description?.trim() || "",
      image: resolveImageUrl(c!.image?.node?.sourceUrl ?? c!.image?.node?.mediaItemUrl ?? undefined),
      link: c!.link?.trim() || undefined,
      buttonText: c!.buttonText?.trim() || undefined,
      buttonLink: c!.buttonLink?.trim() || undefined,
    }))
    .filter((item) => item.title);
}

/**
 * Resolve Blog page listing:
 * 1. If blogPage.blogCards repeater has entries → use those (admin manually entered cards)
 * 2. Else → show fallback (latest posts / default)
 */
export function resolveBlogPageListing(
  blogPage: BlogPageData | null | undefined,
  fallbackItems: BlogCardItem[]
): {
  items: BlogCardItem[];
  sectionTitle: string;
  sectionSubtitle?: string;
  sectionDescription?: string;
  heroTitle: string;
  heroDescription: string;
} {
  const sectionTitle = blogPage?.blogSectionTitle?.trim() || "Latest Blogs and Insights";
  const sectionSubtitle = blogPage?.blogSectionSubtitle?.trim() || undefined;
  const sectionDescription = blogPage?.blogSectionDescription?.trim() || undefined;
  const heroTitle = blogPage?.heroTitle?.trim() || "Blogs";
  const heroDescription = blogPage?.heroDescription?.trim() || "Latest updates, insights and stories";

  const repeaterItems = mapBlogCardsRepeater(blogPage?.blogCards);
  return {
    items: repeaterItems.length > 0 ? repeaterItems : fallbackItems,
    sectionTitle,
    sectionSubtitle,
    sectionDescription,
    heroTitle,
    heroDescription,
  };
}

export function mapPostsToBlogCards(
  nodes: Array<BlogPostNode | null | undefined>
): BlogCardItem[] {
  return nodes
    .filter(Boolean)
    .map((post) => {
      const category =
        post?.categories?.nodes?.find((c) => c?.name?.trim())?.name?.trim() || "Blog";
      const title = post?.title?.trim() ?? "";
      const description = stripHtmlToText(post?.excerpt) ?? "";
      const image = resolveImageUrl(
        post?.featuredImage?.node?.sourceUrl ?? post?.featuredImage?.node?.mediaItemUrl ?? undefined
      );
      const link = post?.slug?.trim() ? `/blogs/${post.slug.trim()}` : (post?.uri?.trim() || undefined);
      return { category, title, description, image, link };
    })
    .filter((item) => item.title);
}
