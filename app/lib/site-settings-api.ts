const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || "http://cwitmain.local/graphql";

const SITE_SETTINGS_FIELDS_FRAGMENT = `
  headerLogo {
    node {
      sourceUrl
      altText
    }
  }
  headerCtaText
  headerCtaLink
  headerMenuItems {
    label
    link
    submenuItems {
      label
      link
    }
  }
  headerOfficeLocations {
    city
    addressLines {
      text
    }
    email
    phone
  }
  footerCtaHeading
  footerCtaParagraph
  footerCtaButtonText
  footerCtaButtonLink
  footerNavigationLinks {
    label
    link
  }
  footerServiceLinks {
    label
    link
  }
  footerAddressLines {
    text
  }
  footerPhone
  footerLinkedinUrl
  footerInstagramUrl
  footerTwitterUrl
  footerCopyrightLineOne
  footerCopyrightLineTwo
  footerPrivacyLabel
  footerPrivacyLink
  footerTermsLabel
  footerTermsLink
`;

const GET_SITE_SETTINGS_NESTED = `
  query GetSiteSettings {
    headerFooterSettings {
      headerFooterFields {
        ${SITE_SETTINGS_FIELDS_FRAGMENT}
      }
    }
  }
`;

const GET_SITE_SETTINGS_FLAT = `
  query GetSiteSettingsFlat {
    headerFooterSettings {
      ${SITE_SETTINGS_FIELDS_FRAGMENT}
    }
  }
`;

type SiteSettingsResponse = {
  data?: {
    headerFooterSettings?:
      | SiteSettingsFields
      | {
          headerFooterFields?: SiteSettingsFields | null;
        }
      | null;
  } | null;
  errors?: Array<{ message?: string }> | null;
};

type SiteSettingsFields = {
  headerLogo?: {
    node?: {
      sourceUrl?: string | null;
      altText?: string | null;
    } | null;
  } | null;
  headerCtaText?: string | null;
  headerCtaLink?: string | null;
  headerMenuItems?: Array<{
    label?: string | null;
    link?: string | null;
    submenuItems?: Array<{
      label?: string | null;
      link?: string | null;
    } | null> | null;
  } | null> | null;
  headerOfficeLocations?: Array<{
    city?: string | null;
    addressLines?: Array<{
      text?: string | null;
    } | null> | null;
    email?: string | null;
    phone?: string | null;
  } | null> | null;
  footerCtaHeading?: string | null;
  footerCtaParagraph?: string | null;
  footerCtaButtonText?: string | null;
  footerCtaButtonLink?: string | null;
  footerNavigationLinks?: Array<{
    label?: string | null;
    link?: string | null;
  } | null> | null;
  footerServiceLinks?: Array<{
    label?: string | null;
    link?: string | null;
  } | null> | null;
  footerAddressLines?: Array<{
    text?: string | null;
  } | null> | null;
  footerPhone?: string | null;
  footerLinkedinUrl?: string | null;
  footerInstagramUrl?: string | null;
  footerTwitterUrl?: string | null;
  footerCopyrightLineOne?: string | null;
  footerCopyrightLineTwo?: string | null;
  footerPrivacyLabel?: string | null;
  footerPrivacyLink?: string | null;
  footerTermsLabel?: string | null;
  footerTermsLink?: string | null;
};

export type MenuLinkItem = {
  label: string;
  href: string;
};

export type HeaderMenuItem = MenuLinkItem & {
  submenu?: MenuLinkItem[];
};

export type OfficeLocationItem = {
  city: string;
  address: string[];
  email: string;
  phone: string;
};

export type HeaderSettings = {
  logoSrc?: string;
  logoAlt?: string;
  ctaText?: string;
  ctaLink?: string;
  menuItems?: HeaderMenuItem[];
  officeLocations?: OfficeLocationItem[];
};

export type FooterSettings = {
  ctaHeading?: string;
  ctaParagraph?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  navigationLinks?: MenuLinkItem[];
  serviceLinks?: MenuLinkItem[];
  addressLines?: string[];
  phone?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  copyrightLineOne?: string;
  copyrightLineTwo?: string;
  privacyLabel?: string;
  privacyLink?: string;
  termsLabel?: string;
  termsLink?: string;
};

export type SiteSettings = {
  header: HeaderSettings;
  footer: FooterSettings;
};

/** Empty shell when GraphQL fails or fields are missing — no hardcoded nav or copy. */
export function createEmptySiteSettings(): SiteSettings {
  return {
    header: {
      logoSrc: "",
      logoAlt: "",
      ctaText: "",
      ctaLink: "",
      menuItems: [],
      officeLocations: [],
    },
    footer: {
      ctaHeading: "",
      ctaParagraph: "",
      ctaButtonText: "",
      ctaButtonLink: "",
      navigationLinks: [],
      serviceLinks: [],
      addressLines: [],
      phone: "",
      linkedinUrl: "",
      instagramUrl: "",
      twitterUrl: "",
      copyrightLineOne: "",
      copyrightLineTwo: "",
      privacyLabel: "",
      privacyLink: "",
      termsLabel: "",
      termsLink: "",
    },
  };
}

function trimOrUndefined(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed || undefined;
}

function toLinkItems(
  list: Array<{ label?: string | null; link?: string | null } | null> | null | undefined
): MenuLinkItem[] {
  return (list ?? [])
    .filter(Boolean)
    .map((item) => ({
      label: item?.label?.trim() || "",
      href: item?.link?.trim() || "",
    }))
    .filter((item) => item.label);
}

function normalizeSettings(fields: SiteSettingsFields | null | undefined): SiteSettings {
  const headerMenuItems: HeaderMenuItem[] = (fields?.headerMenuItems ?? [])
    .filter(Boolean)
    .map((item) => {
      const submenu = toLinkItems(item?.submenuItems);
      return {
        label: item?.label?.trim() || "",
        href: item?.link?.trim() || "",
        submenu: submenu.length > 0 ? submenu : undefined,
      };
    })
    .filter((item) => item.label);

  const headerOfficeLocations: OfficeLocationItem[] = (fields?.headerOfficeLocations ?? [])
    .filter(Boolean)
    .map((item) => ({
      city: item?.city?.trim() || "",
      address: (item?.addressLines ?? [])
        .filter(Boolean)
        .map((line) => line?.text?.trim() || "")
        .filter(Boolean),
      email: item?.email?.trim() || "",
      phone: item?.phone?.trim() || "",
    }))
    .filter((item) => item.city || item.address.length > 0 || item.email || item.phone);

  const addressLines = (fields?.footerAddressLines ?? [])
    .filter(Boolean)
    .map((item) => item?.text?.trim() || "")
    .filter(Boolean);

  return {
    header: {
      logoSrc: trimOrUndefined(fields?.headerLogo?.node?.sourceUrl) ?? "",
      logoAlt: trimOrUndefined(fields?.headerLogo?.node?.altText) ?? "",
      ctaText: trimOrUndefined(fields?.headerCtaText) ?? "",
      ctaLink: trimOrUndefined(fields?.headerCtaLink) ?? "",
      menuItems: headerMenuItems,
      officeLocations: headerOfficeLocations,
    },
    footer: {
      ctaHeading: trimOrUndefined(fields?.footerCtaHeading) ?? "",
      ctaParagraph: trimOrUndefined(fields?.footerCtaParagraph) ?? "",
      ctaButtonText: trimOrUndefined(fields?.footerCtaButtonText) ?? "",
      ctaButtonLink: trimOrUndefined(fields?.footerCtaButtonLink) ?? "",
      navigationLinks: toLinkItems(fields?.footerNavigationLinks),
      serviceLinks: toLinkItems(fields?.footerServiceLinks),
      addressLines,
      phone: trimOrUndefined(fields?.footerPhone) ?? "",
      linkedinUrl: trimOrUndefined(fields?.footerLinkedinUrl) ?? "",
      instagramUrl: trimOrUndefined(fields?.footerInstagramUrl) ?? "",
      twitterUrl: trimOrUndefined(fields?.footerTwitterUrl) ?? "",
      copyrightLineOne: trimOrUndefined(fields?.footerCopyrightLineOne) ?? "",
      copyrightLineTwo: trimOrUndefined(fields?.footerCopyrightLineTwo) ?? "",
      privacyLabel: trimOrUndefined(fields?.footerPrivacyLabel) ?? "",
      privacyLink: trimOrUndefined(fields?.footerPrivacyLink) ?? "",
      termsLabel: trimOrUndefined(fields?.footerTermsLabel) ?? "",
      termsLink: trimOrUndefined(fields?.footerTermsLink) ?? "",
    },
  };
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  const empty = createEmptySiteSettings();

  try {
    const nestedRes = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_SITE_SETTINGS_NESTED }),
    });
    const nestedJson = (await nestedRes.json()) as SiteSettingsResponse;
    const nestedFields =
      nestedJson.data?.headerFooterSettings &&
      "headerFooterFields" in nestedJson.data.headerFooterSettings
        ? nestedJson.data.headerFooterSettings.headerFooterFields
        : null;

    if (!nestedJson.errors?.length && nestedFields) {
      return normalizeSettings(nestedFields);
    }

    const flatRes = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_SITE_SETTINGS_FLAT }),
    });
    const flatJson = (await flatRes.json()) as SiteSettingsResponse;
    const flatRaw = flatJson.data?.headerFooterSettings;
    const flatFields =
      flatRaw && !("headerFooterFields" in flatRaw)
        ? (flatRaw as SiteSettingsFields)
        : null;

    if (!flatJson.errors?.length && flatFields) {
      return normalizeSettings(flatFields);
    }

    return empty;
  } catch {
    return empty;
  }
}
