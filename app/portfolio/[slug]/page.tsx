import { notFound } from "next/navigation";
import { fetchPortfolioBySlug, resolveImageUrl } from "@/app/lib/our-work-api";
import HeroBanner from "@/app/components/ui/HeroBanner";
import Education from "@/app/components/sections/Education";
import Stay from "@/app/components/sections/Stay";
import WhatWeDelivered from "@/app/components/sections/WhatWeDelivered";
import PerformanceMetrics from "@/app/components/sections/PerformanceMetrics";
import ClientTestimonials from "@/app/components/sections/ClientTestimonials";

export default async function PortfolioDetailPage({
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
  const fullWidthCmsSrc = resolveImageUrl(pd?.fullWidthBackgroundImage?.node?.sourceUrl);
  const heroNode = pd?.heroBackgroundImage?.node;
  const heroBg = heroNode?.sourceUrl ?? undefined;
  const heroAlt = heroNode?.altText?.trim() || "";

  return (
    <main className="min-h-screen relative bg-black">
      <HeroBanner
        title={portfolio.title ?? undefined}
        backgroundImage={heroBg}
        backgroundImageAlt={heroAlt}
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

      {fullWidthCmsSrc ? (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative w-full max-w-[1494px] mx-auto aspect-[16/10] max-h-[720px] overflow-hidden bg-black/20">
            <img
              src={fullWidthCmsSrc}
              alt={pd?.fullWidthBackgroundImageAlt?.trim() || ""}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </section>
      ) : null}

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
