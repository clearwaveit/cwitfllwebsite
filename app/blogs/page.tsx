import DigitalExperienceBanner from "@/app/components/sections/DigitalExperienceBanner";
import Blogs from "@/app/components/sections/blogs";
import Accordion from "@/app/components/sections/Accordion";
import vectorBg from "@/app/assets/imgs/Mask group (1).png";
import {
  fetchBlogPageBySlug,
  fetchBlogPosts,
  mapPostsToBlogCards,
  resolveBlogPageListing,
} from "@/app/lib/blog-api";

const DEFAULT_BLOG_ITEMS = [
  { category: "Blog", title: "LuLu Group International", description: "Lulu Group is a diversified conglomerate with business entities worldwide and contributes highly to the Gulf's economic status.", image: undefined as string | undefined, link: "/blogs/lulu-group-international" },
  { category: "Insight", title: "Joyalukkas Exchange", description: "Joyalukkas Exchange is a well-known foreign exchange offering a range of financial services in the UAE, Kuwait and Oman.", image: undefined, link: "/blogs/joyalukkas-exchange" },
  { category: "Blog", title: "Unicoin DCX", description: "Unicoin DCX is a cryptocurrency exchange that uses blockchain technology to let you send, receive and trade across the platform.", image: undefined, link: "/blogs/unicoin-dcx" },
];

export default async function BlogPage() {
  let blogPageData = null;
  try {
    const pageRes = await fetchBlogPageBySlug();
    blogPageData = pageRes.data?.page?.blogPage ?? null;
  } catch {
    blogPageData = null;
  }

  let fallbackItems: ReturnType<typeof mapPostsToBlogCards> = [];
  try {
    const res = await fetchBlogPosts();
    const nodes = res.data?.posts?.nodes ?? [];
    fallbackItems = mapPostsToBlogCards(nodes);
  } catch {
    fallbackItems = [];
  }
  if (fallbackItems.length === 0) {
    fallbackItems = DEFAULT_BLOG_ITEMS;
  }

  const listing = resolveBlogPageListing(blogPageData, fallbackItems);
  return (
    <main className="min-h-screen">
      <DigitalExperienceBanner
        title={<>{listing.heroTitle}</>}
        description={listing.heroDescription}
        backgroundImage={{
          src: vectorBg.src,
          alt: "Background",
        }}
      />
      <Blogs
        sectionSubtitle={listing.sectionSubtitle}
        sectionTitle={listing.sectionTitle}
        sectionDescription={listing.sectionDescription}
        items={listing.items}
      />
      <Accordion />
    </main>
  );
}

