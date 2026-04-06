import DigitalExperienceBanner from "@/app/components/sections/DigitalExperienceBanner";
import Blogs from "@/app/components/sections/blogs";
import Accordion from "@/app/components/sections/Accordion";
import { fetchBlogPageBySlug, resolveBlogPageListing } from "@/app/lib/blog-api";

export default async function BlogPage() {
  let blogPageData = null;
  try {
    const pageRes = await fetchBlogPageBySlug();
    blogPageData = pageRes.data?.page?.blogPage ?? null;
  } catch {
    blogPageData = null;
  }

  const listing = resolveBlogPageListing(blogPageData);
  return (
    <main className="min-h-screen">
      <DigitalExperienceBanner
        title={<>{listing.heroTitle}</>}
        description={listing.heroDescription || undefined}
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
