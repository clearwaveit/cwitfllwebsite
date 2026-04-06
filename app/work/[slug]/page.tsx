import { redirect } from "next/navigation";

/** Redirect old /work/[slug] URLs to canonical /portfolio/[slug]. */
export default async function WorkSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug?.trim()) redirect(`/portfolio/${slug.trim()}`);
  redirect("/our-work");
}
