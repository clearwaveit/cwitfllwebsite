import { redirect } from "next/navigation";

/** Legacy URL: /work-details/[slug] → /portfolio/[slug] */
export default async function LegacyWorkDetailsSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slugNorm = slug?.replace(/^\/+|\/+$/g, "").trim();
  if (!slugNorm) {
    redirect("/our-work");
  }
  redirect(`/portfolio/${slugNorm}`);
}
