/**
 * Splits CMS intro / textarea / light HTML into paragraph strings for multi-`<p>` rendering.
 * Matches the rules previously used in `normalizeIntro` (home-normalize).
 */
export function splitCmsTextToParagraphs(raw: string | null | undefined): string[] {
  const html = raw?.trim();
  if (!html) return [];

  const fromPTags = Array.from(html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi))
    .map((match) => match[1]?.replace(/<br\s*\/?>/gi, "\n"))
    .map((value) =>
      value
        ?.replace(/<[^>]+>/g, " ")
        .replace(/[ \t]+/g, " ")
        .replace(/\s*\n\s*/g, " ")
        .trim()
    )
    .filter(Boolean) as string[];

  if (fromPTags.length > 0) {
    return fromPTags;
  }

  const looksLikeMarkup = /<\/?[a-z][\s\S]*?>/i.test(html);

  if (looksLikeMarkup) {
    return html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div|li|section|article|h[1-6])>/gi, "\n\n")
      .replace(/<[^>]+>/g, " ")
      .split(/\n\s*\n/)
      .map((value) => value.replace(/[ \t]+/g, " ").replace(/\s*\n\s*/g, " ").trim())
      .filter(Boolean);
  }

  // Plain textarea: each Enter = new block (same visual as separate lines in CMS)
  return html
    .split(/\r?\n/)
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    .filter(Boolean);
}
