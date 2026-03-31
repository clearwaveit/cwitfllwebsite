import { notFound } from "next/navigation";
import HeroBanner from "@/app/components/ui/HeroBanner";
import Education from "@/app/components/sections/Education";
import Stay from "@/app/components/sections/Stay";
import WhatWeDelivered from "@/app/components/sections/WhatWeDelivered";
import PerformanceMetrics from "@/app/components/sections/PerformanceMetrics";
import ClientTestimonials from "@/app/components/sections/ClientTestimonials";
import Accordion from "@/app/components/sections/Accordion";
import defaultFullWidthImg from "@/app/assets/imgs/Frame 42.png";
import { fetchBlogDetailBySlug } from "@/app/lib/blog-api";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slugNorm = slug?.replace(/^\/+|\/+$/g, "").trim();
  if (!slugNorm) notFound();

  const post = await fetchBlogDetailBySlug(slugNorm);
  if (!post) notFound();

  const heroBg = post.heroImage || undefined;
  const heroAlt = post.title ?? "Blog hero";

  return (
    <main className="min-h-screen relative bg-black">
      <HeroBanner
        badge={post.badge}
        title={post.title}
        backgroundImage={heroBg}
        backgroundImageAlt={heroAlt}
        fallbackBackgroundClassName={
          heroBg ? undefined : "bg-[rgba(100, 98, 98, 0.85)]"
        }
      />

      <Education
        industryTitle={post.industryTitle}
        industryDescription={post.industryDescription}
        projectTypeTitle={post.projectTypeTitle}
        projectYear={post.projectYear}
        servicesTitle={post.servicesTitle}
        services={post.services}
      />

      <Stay paragraphs={post.stayParagraphs} />

      <WhatWeDelivered
        title={post.deliveredTitle}
        description={post.deliveredDescription}
        deliverables={post.deliverables}
      />

      <PerformanceMetrics metrics={post.performanceMetrics} />

      {post.content && (
        <section className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 max-w-[900px]">
          <div
            className="prose prose-invert prose-lg max-w-none text-white/90 [&_a]:text-[#0DFCC1] [&_a]:underline [&_img]:rounded-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </section>
      )}

      <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative w-full max-w-[1494px] mx-auto aspect-[16/10] max-h-[720px] overflow-hidden bg-black/20">
          <img
            src={post.fullWidthImage ?? defaultFullWidthImg.src}
            alt={post.fullWidthImageAlt ?? "Blog"}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
      </section>

      <ClientTestimonials
        title={post.testimonialsTitle}
        testimonials={
          post.testimonials && post.testimonials.length > 0
            ? post.testimonials
            : undefined
        }
      />

      <Accordion />
    </main>
  );
}
