import Hero from "@/app/components/sections/Hero";
import Showcase from "@/app/components/sections/Showcase";
import Studios from "@/app/components/sections/Studios";
import GenAI from "@/app/components/sections/GenAI";
import HomeOurWork from "@/app/components/sections/HomeOurWork";
import OurClients from "@/app/components/sections/OurClients";
import Blogs from "@/app/components/sections/blogs";
import Accordion from "@/app/components/sections/Accordion";
import TextSection from "@/app/components/ui/TextSection";
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

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  let fields: ReturnType<typeof getHomePageFields> = null;
  try {
    const res = await fetchHomePage();
    fields = res.data ? getHomePageFields(res.data) : null;
  } catch {
    fields = null;
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
    blogsProps = normalizeBlogs(f);
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
    blogsProps = normalizeBlogs(f);
    accordionProps = normalizeAccordion(f);
  }

  const introBgSrc = introProps.backgroundImageSrc;

  return (
    <main className="min-h-screen">
      <Hero {...heroProps} />
      {(showcaseProps.headline?.trim() ||
        showcaseProps.cards?.length ||
        showcaseProps.beforeImageSrc?.trim() ||
        showcaseProps.logoImageSrc?.trim()) && <Showcase {...showcaseProps} />}
      {introProps.paragraphs.length > 0 && (
        <div className="relative">
          {introBgSrc ? (
            <div
              className="absolute right-0 z-50 pointer-events-none"
              style={{ top: "-200px" }}
            >
              <Image
                src={introBgSrc}
                alt=""
                className="w-auto h-auto"
                unoptimized
                width={800}
                height={600}
              />
            </div>
          ) : null}
          <TextSection
            paragraphs={introProps.paragraphs}
            className="relative z-10 container mx-auto md:my-30 my-20 md:px-0 px-4 global-section-padding"
          />
        </div>
      )}
      {studiosProps.studios.length > 0 && <Studios {...studiosProps} />}
      {(genaiProps.heading || genaiProps.paragraph || genaiProps.videoSrc) && <GenAI {...genaiProps} />}
      {ourWorkProps.items?.length ? <HomeOurWork {...ourWorkProps} /> : null}
      {ourClientsProps.logoSrc?.trim() ? <OurClients {...ourClientsProps} /> : null}
      {blogsProps.items.length > 0 && <Blogs {...blogsProps} isCarousel={true} />}
      {accordionProps.items?.length ? <Accordion {...accordionProps} /> : null}
    </main>
  );
}
