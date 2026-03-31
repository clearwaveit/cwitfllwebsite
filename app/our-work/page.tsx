"use client";

import DigitalExperienceBanner from "@/app/components/sections/DigitalExperienceBanner";
import { WorkItem } from "../components/sections/OurWork";
import type { OurWorkPageItem } from "@/app/our-work/our-work-types";
import Accordion, { AccordionItem } from "../components/sections/Accordion";
import ourWorkImg from "@/app/assets/imgs/our_work_img.png";
import vectorBg from "@/app/assets/imgs/Mask group (1).png";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState, useMemo } from "react";
import Footer from "@/app/components/sections/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  fetchOurWorkListingPage,
  fetchPortfoliosList,
  type OurWorkListingPage,
} from "@/app/lib/our-work-api";
import {
  normalizeOurWorkPageData,
  DEFAULT_WORK_ITEMS as DEFAULT_WORK_ITEMS_NORMALIZED,
} from "@/app/our-work/our-work-normalize";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function useScrollTriggerRefresh(deps: unknown[]) {
  useEffect(() => {
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(t);
  }, deps);
}

const DEFAULT_BANNER = {
  title: "Our Work",
  description: "Digital Experiences That Inspire and Perform",
  backgroundImage: { src: vectorBg.src, alt: "Background" },
  videoSrc: undefined as string | undefined,
};

const DEFAULT_WORK_ITEMS = DEFAULT_WORK_ITEMS_NORMALIZED;
const DEFAULT_CARD = DEFAULT_WORK_ITEMS[0];
const DEFAULT_SUBTITLE = DEFAULT_CARD?.category ?? "";
const DEFAULT_DESCRIPTION = DEFAULT_CARD?.description ?? "";

const PORTFOLIO_BASE = "/work-details";

type PortfolioListNode = {
  databaseId?: number | null;
  slug?: string | null;
  title?: string | null;
  homePortfolioListing?: {
    portfolioListingSubtitle?: string | null;
    portfolioListingTitle?: string | null;
    portfolioListingDescription?: string | null;
    portfolioListingCards?: Array<{
      cardSubtitle?: string | null;
      cardTitle?: string | null;
      cardDescription?: string | null;
      cardImage?: { node?: { sourceUrl?: string | null; mediaItemUrl?: string | null } | null } | null;
    } | null> | null;
  } | null;
  portfolioDetails?: {
    backgroundImage?: { node?: { sourceUrl?: string } | null } | null;
    heroBackgroundImage?: { node?: { sourceUrl?: string } | null } | null;
  } | null;
};

type PerPortfolioOverride = {
  portfolioPost?: {
    nodes?: Array<{ databaseId?: number | null } | null> | null;
  } | null;
  portfolioSubtitle?: string | null;
  portfolioTitle?: string | null;
  portfolioDescription?: string | null;
  portfolioImage?: { node?: { sourceUrl?: string | null; mediaItemUrl?: string | null } | null } | null;
  portfolioCards?: Array<{
    cardSubtitle?: string | null;
    cardTitle?: string | null;
    cardDescription?: string | null;
    cardImage?: { node?: { sourceUrl?: string | null; mediaItemUrl?: string | null } | null } | null;
  } | null> | null;
};

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

function mapPortfolioNodesToCards(
  nodes: Array<PortfolioListNode>,
  overrides: Array<PerPortfolioOverride>
): OurWorkPageItem[] {
  return nodes.flatMap((p) => {
    const portfolioId = toNumberId(p?.databaseId);
    const matchedOverride =
      overrides.find((ov) => getOverridePortfolioId(ov) === portfolioId) ?? null;
    const slug = p?.slug?.trim();
    const portfolioTitle = p?.title?.trim() || DEFAULT_CARD?.title || "";
    const listing = p?.homePortfolioListing;
    const listingCards = (listing?.portfolioListingCards ?? []).filter(Boolean) as Array<{
      cardSubtitle?: string | null;
      cardTitle?: string | null;
      cardDescription?: string | null;
      cardImage?: { node?: { sourceUrl?: string | null; mediaItemUrl?: string | null } | null } | null;
    }>;

    const fallbackImage =
      p?.portfolioDetails?.backgroundImage?.node?.sourceUrl ??
      p?.portfolioDetails?.heroBackgroundImage?.node?.sourceUrl ??
      ourWorkImg;

    const mainSubtitle =
      matchedOverride?.portfolioSubtitle?.trim() ||
      listing?.portfolioListingSubtitle?.trim() ||
      DEFAULT_SUBTITLE ||
      undefined;
    const mainTitle =
      matchedOverride?.portfolioTitle?.trim() ||
      listing?.portfolioListingTitle?.trim() ||
      portfolioTitle;
    const mainDescription =
      matchedOverride?.portfolioDescription?.trim() ||
      listing?.portfolioListingDescription?.trim() ||
      DEFAULT_DESCRIPTION;
    const mainImage =
      matchedOverride?.portfolioImage?.node?.sourceUrl?.trim() ||
      matchedOverride?.portfolioImage?.node?.mediaItemUrl?.trim() ||
      fallbackImage;

    const overrideCards = (matchedOverride?.portfolioCards ?? []).filter(Boolean) as Array<{
      cardSubtitle?: string | null;
      cardTitle?: string | null;
      cardDescription?: string | null;
      cardImage?: { node?: { sourceUrl?: string | null; mediaItemUrl?: string | null } | null } | null;
    }>;
    if (overrideCards.length > 0) {
      return overrideCards.map((card) => ({
        category: card.cardSubtitle?.trim() || mainSubtitle,
        title: card.cardTitle?.trim() || mainTitle,
        description: card.cardDescription?.trim() || mainDescription,
        image: (card.cardImage?.node?.sourceUrl?.trim() || card.cardImage?.node?.mediaItemUrl?.trim() || mainImage) as OurWorkPageItem["image"],
        link: slug ? `/work-details/${slug}` : undefined,
      }));
    }

    if (listingCards.length > 0) {
      return listingCards.map((card) => ({
        category: card.cardSubtitle?.trim() || mainSubtitle,
        title: card.cardTitle?.trim() || mainTitle,
        description: card.cardDescription?.trim() || mainDescription,
        image: (card.cardImage?.node?.sourceUrl?.trim() || card.cardImage?.node?.mediaItemUrl?.trim() || mainImage) as OurWorkPageItem["image"],
        link: slug ? `/work-details/${slug}` : undefined,
      }));
    }

    return [{
      title: mainTitle,
      description: mainDescription,
      image: mainImage as OurWorkPageItem["image"],
      ...(mainSubtitle ? { category: mainSubtitle } : {}),
      link: slug ? `/work-details/${slug}` : undefined,
    }];
  });
}

function getPortfolioUrl(workItemLink: string | undefined): string {
  const raw = workItemLink?.trim();
  if (!raw) return "/our-work";
  if (raw.startsWith("/work-details/")) return raw;
  if (raw.startsWith("/work/")) return PORTFOLIO_BASE + "/" + raw.replace(/^\/work\//, "");
  const fromPortfolioPath = raw.match(/\/portfolio\/([^/]+)/)?.[1];
  if (fromPortfolioPath) return PORTFOLIO_BASE + "/" + fromPortfolioPath;
  const slugOnly = raw.replace(/^\/+|\/+$/g, "").replace(/^work\//, "");
  if (raw.startsWith("http")) {
    const s = raw.match(/\/portfolio\/([^/]+)/)?.[1];
    return s ? PORTFOLIO_BASE + "/" + s : "/our-work";
  }
  if (slugOnly && !slugOnly.includes("/")) return PORTFOLIO_BASE + "/" + slugOnly;
  if (raw.startsWith("/")) return slugOnly ? PORTFOLIO_BASE + "/" + slugOnly : "/our-work";
  return PORTFOLIO_BASE + "/" + slugOnly;
}

export default function OurWorkPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [apiData, setApiData] = useState<OurWorkListingPage | null>(null);
  const [portfoliosItems, setPortfoliosItems] = useState<OurWorkPageItem[] | null>(null);
  const [portfoliosSlugs, setPortfoliosSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const normalized = useMemo(() => {
    return normalizeOurWorkPageData(apiData);
  }, [apiData]);

  const bannerProps = useMemo(
    () => normalized?.banner ?? DEFAULT_BANNER,
    [normalized]
  );

  const workItemsToShow: OurWorkPageItem[] = useMemo(() => {
    if (normalized?.workItems?.length) {
      let portfolioIndex = 0;
      return normalized.workItems.map((item) => {
        if (item.link?.trim()) return item;
        const slug = portfoliosSlugs[portfolioIndex];
        if (slug) {
          portfolioIndex++;
          return { ...item, link: "/work-details/" + slug };
        }
        return item;
      });
    }
    if (portfoliosItems?.length) return portfoliosItems;
    return DEFAULT_WORK_ITEMS;
  }, [normalized, portfoliosItems, portfoliosSlugs]);

  const accordionProps = useMemo(() => {
    const acc = normalized?.accordion;
    const hasItems = (acc?.items?.length ?? 0) > 0;
    return hasItems && acc
      ? { title: acc.title, items: acc.items }
      : { title: "FAQ's" as const };
  }, [normalized]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchOurWorkListingPage()
      .then((res) => {
        if (cancelled) return;
        if (res.errors?.length) {
          setError(res.errors.map((e) => e.message).join(", "));
          return;
        }
        if (res.data?.page) setApiData(res.data);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message ?? "Failed to load page");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!normalized) return;
    let cancelled = false;
    fetchPortfoliosList()
      .then((res) => {
        if (cancelled) return;
        const nodes = res.data?.portfolios?.nodes?.filter(Boolean) ?? [];
        const overrides = (
          apiData?.page?.ourWorkPerPortfolioOverrides?.ourWorkPerPortfolioItems ?? []
        ).filter(Boolean) as PerPortfolioOverride[];
        const slugs = nodes.map((p) => p?.slug?.trim()).filter((s): s is string => !!s);
        setPortfoliosSlugs(slugs);
        if (normalized.workItems.length === 0) {
          const items: OurWorkPageItem[] = mapPortfolioNodesToCards(
            nodes as Array<PortfolioListNode>,
            overrides
          );
          setPortfoliosItems(items);
        } else {
          setPortfoliosItems(null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPortfoliosSlugs([]);
          setPortfoliosItems(normalized.workItems.length === 0 ? [] : null);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [normalized, apiData]);

  useEffect(() => {
    if (!sectionRef.current || !cardsContainerRef.current) return;

    const cards = cardsContainerRef.current.querySelectorAll(".work-card");
    if (cards.length === 0) return;

    gsap.set(cards, { opacity: 0, y: 80, scale: 0.95 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
    });

    const cardElements = Array.from(cards) as HTMLElement[];
    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      gsap.to(el, {
        scale: 1.02,
        y: -5,
        duration: 0.3,
        ease: "power2.out",
      });
    };
    const onLeave = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      gsap.to(el, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
    };
    cardElements.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      tl.kill();
      cardElements.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === sectionRef.current) trigger.kill();
      });
    };
  }, [workItemsToShow]);

  useScrollTriggerRefresh([
    workItemsToShow.length,
    accordionProps,
    normalized?.accordion?.items?.length,
  ]);

  return (
    <>
    <main className="min-h-screen">
      {error && (
        <div className="bg-amber-900/20 text-amber-200 text-sm text-center py-2 px-4">
          Could not load content from CMS. Showing default content.
          <span className="block mt-1 text-amber-300/80 text-xs font-mono max-w-2xl mx-auto truncate" title={error}>
            {error}
          </span>
        </div>
      )}
      <DigitalExperienceBanner
        title={<>{bannerProps.title}</>}
        description={bannerProps.description}
        backgroundImage={bannerProps.backgroundImage}
        videoSrc={bannerProps.videoSrc}
      />
      <section
        ref={sectionRef}
        className="relative bg-black py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
      >
        <div className="relative z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 max-w-[1920px]">
          <div
            ref={cardsContainerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
          >
            {workItemsToShow.map((item, index) => {
              const href = getPortfolioUrl(item.link);
              const imageSrc =
                typeof item.image === "string" ? item.image : item.image.src;
              const slugKey = item.link?.replace(/^\//, "") || `work-${index}`;
              return (
                <Link
                  key={slugKey}
                  href={href}
                  className="work-card bg-black border border-[#C1C1C1] overflow-hidden flex flex-col cursor-pointer block"
                >
                  {item.category && (
                    <div className="flex-col pt-4 lg:pt-10 px-5 lg:px-8 pb-40 flex">
                      {item.category.split("\n").map((cat: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-white text-[14px] lg:text-[20px] xl:text-[20px] uppercase tracking-[0.1em] font-[400]"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="px-5 lg:px-8 pb-2 lg:pb-3">
                    <h3 className="text-white text-[28px] lg:text-[34px] xl:text-[41px] font-[400] leading-[1.2]">
                      {item.title}
                    </h3>
                  </div>
                  <div className="max-w-[460px] px-5 lg:px-8 pb-4 lg:pb-16">
                    <p className="text-white text-[15px] lg:text-[18px] xl:text-[22px] leading-[1.5] font-[400]">
                      {item.description}
                    </p>
                  </div>
                  <div className="relative w-full h-[220px] lg:h-[260px] xl:h-[300px] 2xl:h-[320px] min-[1440px]:h-[335px] min-[1920px]:h-[342px] overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={item.title}
                      fill
                      className="object-cover"
                      unoptimized={typeof item.image === "string"}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <Accordion
        title={accordionProps.title}
        items={"items" in accordionProps && accordionProps.items?.length ? accordionProps.items : undefined}
      />
    </main>
    </>
  );
}
