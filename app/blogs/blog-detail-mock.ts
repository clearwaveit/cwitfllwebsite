/**
 * Temporary mock data for blog detail page. Replace with headless/API later.
 */

export type BlogDetailMock = {
  title: string;
  slug: string;
  badge?: string; // e.g. date or category
  heroImage?: string; // optional; leave empty for fallback bg
  excerpt?: string;
  content?: string;
  // Sections (work-details style – optional placeholders)
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
  performanceMetrics?: { title: string; value: string }[];
  fullWidthImage?: string;
  fullWidthImageAlt?: string;
  testimonialsTitle?: string;
  testimonials?: { text: string; rating: number }[];
};

const MOCK_BLOG_DETAILS: Record<string, BlogDetailMock> = {
  "lulu-group-international": {
    title: "LuLu Group International",
    slug: "lulu-group-international",
    badge: "Blog · February 2024",
    excerpt:
      "Lulu Group is a diversified conglomerate with business entities worldwide and contributes highly to the Gulf's economic status.",
    content: `
      <p>Lulu Group International has established itself as a key player in the retail and hospitality sectors across the Gulf and beyond. This article explores their digital transformation journey and how technology supports their global operations.</p>
      <p>From supply chain management to customer engagement, Lulu Group continues to invest in solutions that drive growth and improve customer experience across all touchpoints.</p>
    `,
    industryTitle: "Industry",
    industryDescription: "Retail & FMCG",
    projectTypeTitle: "Project type",
    projectYear: "2024",
    servicesTitle: "Services",
    services: ["Digital Strategy", "E-commerce", "Brand Experience"],
    stayParagraphs: [
      "Lulu Group is a top-notch corporate giant making marks in various industries in the UAE and the wider Gulf region. Their commitment to digital excellence has set new standards in the retail sector.",
    ],
    deliveredTitle: "What we delivered",
    deliveredDescription: "Strategy, design and development support for their digital initiatives.",
    deliverables: ["Digital strategy", "UX research", "Platform design"],
    performanceMetrics: [
      { title: "Markets", value: "12+" },
      { title: "Stores", value: "200+" },
    ],
    fullWidthImageAlt: "LuLu Group project",
    testimonialsTitle: "What they said",
    testimonials: [
      { text: "A great partner for our digital journey.", rating: 5 },
    ],
  },
  "joyalukkas-exchange": {
    title: "Joyalukkas Exchange",
    slug: "joyalukkas-exchange",
    badge: "Insight · January 2024",
    excerpt:
      "Joyalukkas Exchange is a well-known foreign exchange offering a range of financial services in the UAE, Kuwait and Oman.",
    content: `
      <p>Joyalukkas Exchange has built a strong presence in the foreign exchange and financial services space across the UAE, Kuwait and Oman. This insight covers the role of digital channels in their customer experience.</p>
      <p>With a focus on trust and convenience, they continue to expand their digital offerings to serve customers better.</p>
    `,
    industryTitle: "Industry",
    industryDescription: "Financial services",
    projectTypeTitle: "Project type",
    projectYear: "2024",
    servicesTitle: "Services",
    services: ["Digital experience", "Compliance", "Integration"],
    stayParagraphs: [
      "Joyalukkas Exchange is a well-known name in foreign exchange and financial services. Their digital initiatives have strengthened their position across the region.",
    ],
    deliveredTitle: "What we delivered",
    deliveredDescription: "Design and development support for their digital platforms.",
    deliverables: ["UX/UI design", "Web platform", "Security review"],
    performanceMetrics: [
      { title: "Countries", value: "3" },
      { title: "Branches", value: "50+" },
    ],
    fullWidthImageAlt: "Joyalukkas Exchange",
    testimonialsTitle: "What they said",
    testimonials: [
      { text: "Professional and delivered on time.", rating: 5 },
    ],
  },
};

function slugFromTitle(s: string): string {
  return s
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/**
 * Get blog detail by slug. Temporary mock – no headless.
 * For unknown slugs, returns a generic entry so the page still renders.
 */
export function getBlogDetailBySlug(slug: string): BlogDetailMock | null {
  const slugNorm = slug?.replace(/^\/+|\/+$/g, "").trim();
  if (!slugNorm) return null;

  const exact = MOCK_BLOG_DETAILS[slugNorm];
  if (exact) return exact;

  // Fallback: use slug as title and minimal placeholder content
  const titleFromSlug = slugNorm
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title: titleFromSlug,
    slug: slugNorm,
    badge: "Blog",
    excerpt: "Latest updates and insights.",
    content: `<p>This is a placeholder for the blog post <strong>${titleFromSlug}</strong>. Connect your headless CMS or API to load real content here.</p>`,
    industryTitle: "Industry",
    industryDescription: "—",
    projectTypeTitle: "Project type",
    projectYear: new Date().getFullYear().toString(),
    servicesTitle: "Services",
    services: [],
    stayParagraphs: ["Content will appear here once connected to your data source."],
    deliveredTitle: "What we delivered",
    deliveredDescription: "—",
    deliverables: [],
    performanceMetrics: [],
    fullWidthImageAlt: "Blog",
    testimonialsTitle: "What they said",
    testimonials: [],
  };
}

export { MOCK_BLOG_DETAILS };
