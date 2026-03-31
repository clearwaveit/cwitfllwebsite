import Hero from "@/app/components/sections/Hero";
import Showcase from "@/app/components/sections/Showcase";
import Studios from "@/app/components/sections/Studios";
import GenAI from "@/app/components/sections/GenAI";
import HomeOurWork from "@/app/components/sections/HomeOurWork";
import OurClients from "@/app/components/sections/OurClients";
import Blogs from "@/app/components/sections/blogs";
import Accordion from "@/app/components/sections/Accordion";
import TextSection from "@/app/components/ui/TextSection";
import maskGroupImg from "@/app/assets/imgs/Mask group.png";
import Image from "next/image";
import { fetchHomePage, getHomePageFields } from "@/app/lib/home-api";
import {
  normalizeHero,
  normalizeShowcase,
  normalizeIntro,
  normalizeStudios,
  normalizeGenai,
  normalizeOurWork,
  normalizeOurClients,
  normalizeBlogs,
  normalizeAccordion,
} from "@/app/lib/home-normalize";
import { fetchLatestBlogPosts, mapPostsToBlogCards } from "@/app/lib/blog-api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function hasSelectedBlogs(fields: ReturnType<typeof getHomePageFields> | null): boolean {
  const fromHomePage = (fields?.homeBlogsSelectedPosts as { nodes?: unknown[] } | null | undefined)?.nodes;
  if (Array.isArray(fromHomePage) && fromHomePage.filter(Boolean).length > 0) return true;
  const overrides = fields?.homeBlogsSectionOverrides;
  const selectedNodes = (overrides?.homeBlogsSelectedPosts as { nodes?: unknown[] } | null | undefined)?.nodes;
  if (Array.isArray(selectedNodes) && selectedNodes.filter(Boolean).length > 0) return true;
  const cardOverrides = overrides?.perBlogCardOverrides;
  return Array.isArray(cardOverrides) && cardOverrides.filter(Boolean).length > 0;
}

export default async function Home() {
  let fields: ReturnType<typeof getHomePageFields> = null;
  try {
    const res = await fetchHomePage();
    fields = res.data ? getHomePageFields(res.data) : null;
  } catch {
    fields = null;
  }

  let fallbackLatestPosts: { category: string; title: string; description: string; image?: string; link?: string }[] | undefined;
  if (!hasSelectedBlogs(fields)) {
    try {
      const latestRes = await fetchLatestBlogPosts(6);
      const nodes = latestRes.data?.posts?.nodes ?? [];
      fallbackLatestPosts = mapPostsToBlogCards(nodes).slice(0, 6);
    } catch {
      fallbackLatestPosts = undefined;
    }
  }

  let heroProps: ReturnType<typeof normalizeHero>;
  let showcaseProps: ReturnType<typeof normalizeShowcase>;
  let introProps: ReturnType<typeof normalizeIntro>;
  let studiosProps: ReturnType<typeof normalizeStudios>;
  let genaiProps: ReturnType<typeof normalizeGenai>;
  let ourWorkProps: ReturnType<typeof normalizeOurWork>;
  let ourClientsProps: ReturnType<typeof normalizeOurClients>;
  let blogsProps: ReturnType<typeof normalizeBlogs>;
  let accordionProps: ReturnType<typeof normalizeAccordion>;

  try {
    const f = fields ?? null;
    heroProps = normalizeHero(f);
    showcaseProps = normalizeShowcase(f);
    introProps = normalizeIntro(f);
    studiosProps = normalizeStudios(f);
    genaiProps = normalizeGenai(f);
    ourWorkProps = normalizeOurWork(f);
    ourClientsProps = normalizeOurClients(f);
    blogsProps = normalizeBlogs(f, { fallbackLatestPosts });
    accordionProps = normalizeAccordion(f);
  } catch {
    const f = null;
    heroProps = normalizeHero(f);
    showcaseProps = normalizeShowcase(f);
    introProps = normalizeIntro(f);
    studiosProps = normalizeStudios(f);
    genaiProps = normalizeGenai(f);
    ourWorkProps = normalizeOurWork(f);
    ourClientsProps = normalizeOurClients(f);
    blogsProps = normalizeBlogs(f, { fallbackLatestPosts });
    accordionProps = normalizeAccordion(f);
  }

  const introBgSrc = introProps.backgroundImageSrc;

  return (
    <main className="min-h-screen">
      <Hero {...heroProps} />
      <Showcase {...showcaseProps} />
      <div className="relative">
        <div
          className="absolute right-0 z-50 pointer-events-none"
          style={{ top: "-200px" }}
        >
          <Image
            src={introBgSrc || maskGroupImg}
            alt="Background"
            className="w-auto h-auto"
            unoptimized={!!introBgSrc}
            width={800}
            height={600}
          />
        </div>
        <TextSection
          paragraphs={introProps.paragraphs}
          className="relative z-10 container mx-auto md:my-30 my-20 md:px-0 px-4 global-section-padding"
        />
      </div>
      <Studios {...studiosProps} />
      <GenAI {...genaiProps} />
      <HomeOurWork {...ourWorkProps} />
      <OurClients {...ourClientsProps} />
      <Blogs {...blogsProps} />
      <Accordion {...accordionProps} />
    </main>
  );
}
