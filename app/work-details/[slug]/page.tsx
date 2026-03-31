import { notFound } from "next/navigation";
import { fetchPortfolioBySlug, resolveImageUrl } from "@/app/lib/our-work-api";
import HeroBanner from "@/app/components/ui/HeroBanner";
import Education from "@/app/components/sections/Education";
import Stay from "@/app/components/sections/Stay";
import WhatWeDelivered from "@/app/components/sections/WhatWeDelivered";
import PerformanceMetrics from "@/app/components/sections/PerformanceMetrics";
import ClientTestimonials from "@/app/components/sections/ClientTestimonials";
import defaultFullWidthImg from "@/app/assets/imgs/Frame 42.png";

export default async function WorkDetailsPortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slugNorm = slug?.replace(/^\/+|\/+$/g, "").trim();
  if (!slugNorm) {
    notFound();
  }

  const res = await fetchPortfolioBySlug(slugNorm);
  if (res.errors?.length || !res.data?.portfolio) {
    notFound();
  }

  const portfolio = res.data.portfolio;
  const pd = portfolio.portfolioDetails ?? null;
  const heroNode = pd?.heroBackgroundImage?.node;
  const heroBg = heroNode?.sourceUrl ?? undefined;
  const heroAlt = heroNode?.altText ?? portfolio.title ?? "Hero background";

  return (
    <main className="min-h-screen relative bg-black">
      <HeroBanner
        title={portfolio.title ?? undefined}
        backgroundImage={heroBg}
        backgroundImageAlt={heroAlt}
        fallbackBackgroundClassName={heroBg ? undefined : "bg-[rgba(100, 98, 98, 0.85)]"}
        // minHeight="100vh"
      />

      <Education
        backgroundImageSrc={pd?.educationBackgroundImage?.node?.sourceUrl ?? undefined}
        industryTitle={pd?.industryTitle ?? undefined}
        industryDescription={pd?.industryDescription ?? undefined}
        projectTypeTitle={pd?.projectTypeTitle ?? undefined}
        projectYear={pd?.projectYear ?? undefined}
        servicesTitle={pd?.servicesTitle ?? undefined}
        services={pd?.servicesList?.map((s) => s?.serviceName).filter(Boolean) as string[] | undefined}
      />

      <Stay
        imageSrc={pd?.stayImage?.node?.sourceUrl ?? undefined}
        paragraphs={
          pd?.stayParagraphs?.map((p) => p?.paragraphText).filter(Boolean) as string[] | undefined
        }
      />

      <WhatWeDelivered
        title={pd?.deliveredTitle ?? undefined}
        description={pd?.deliveredDescription ?? undefined}
        deliverables={
          pd?.deliverables?.map((d) => d?.deliverableName).filter(Boolean) as string[] | undefined
        }
      />

      <PerformanceMetrics
        metrics={
          pd?.performanceMetrics?.map((m) => ({
            title: m?.metricTitle ?? "",
            value: m?.metricValue ?? "",
          })).filter((m) => m.title || m.value) as { title: string; value: string }[] | undefined
        }
      />

      <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative w-full max-w-[1494px] mx-auto aspect-[16/10] max-h-[720px] overflow-hidden bg-black/20">
          {(() => {
            const cmsSrc = resolveImageUrl(pd?.fullWidthBackgroundImage?.node?.sourceUrl);
            const src = cmsSrc ?? defaultFullWidthImg.src;
            const alt = pd?.fullWidthBackgroundImageAlt ?? "Full width background";
            return (
              <img
                src={src}
                alt={alt}
                className="absolute inset-0 w-full h-full object-contain"
              />
            );
          })()}
        </div>
      </section>

      <ClientTestimonials
        title={pd?.testimonialsTitle ?? undefined}
        testimonials={
          pd?.testimonials?.map((t) => ({
            text: t?.testimonialText ?? "",
            rating: t?.testimonialRating ?? 0,
          })).filter((t) => t.text) as { text: string; rating: number }[] | undefined
        }
      />
    </main>
  );
}
