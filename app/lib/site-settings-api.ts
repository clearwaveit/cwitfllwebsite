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

export const DEFAULT_HEADER_SETTINGS: HeaderSettings = {
  logoSrc: "/imgs/cwit_logo.svg",
  logoAlt: "CWIT Logo",
  ctaText: "Let's Talk",
  ctaLink: "/contact-us",
  menuItems: [
    { label: "Home", href: "/" },
    {
      label: "Services",
      href: "#",
      submenu: [
        { label: "Digital experience studio", href: "/digital-experience-studio" },
        { label: "Application Development Studio", href: "/application-development-studio" },
        { label: "Growth Branding Studio", href: "/growth-branding-studio" },
      ],
    },
    { label: "About Us", href: "#" },
    { label: "Our Work", href: "/our-work" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact Us", href: "/contact-us" },
  ],
  officeLocations: [
    {
      city: "Dubai",
      address: ["World Trade Center area", "Dubai, UAE"],
      email: "dubai@cwit.ae",
      phone: "+971 58 8279426",
    },
    {
      city: "London",
      address: ["East London", "London, UAE"],
      email: "lonodon@cwit.ae",
      phone: "+44 33 333 9426",
    },
    {
      city: "New York",
      address: ["East London", "London, UAE"],
      email: "lonodon@cwit.ae",
      phone: "+44 33 333 9426",
    },
  ],
};

export const DEFAULT_FOOTER_SETTINGS: FooterSettings = {
  ctaHeading: "Get Started now!",
  ctaParagraph: "Request for a free quote, submit your RFP/RFI.",
  ctaButtonText: "Let's Talk",
  ctaButtonLink: "/contact-us",
  navigationLinks: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/our-work" },
    { label: "About", href: "/about-us" },
    { label: "Contact Us", href: "/contact-us" },
  ],
  serviceLinks: [
    { label: "Website design & Development", href: "#" },
    { label: "AI Automation and Services", href: "#" },
    { label: "Mobile apps development", href: "#" },
    { label: "Web apps development", href: "#" },
    { label: "Branding and Brand strategy", href: "#" },
  ],
  addressLines: ["Trade Center Area", "Sheikh Zayed Road", "Dubai, UAE"],
  phone: "+971 4 111 111 1",
  linkedinUrl: "#",
  instagramUrl: "#",
  twitterUrl: "#",
  copyrightLineOne: "CWIT © 2025",
  copyrightLineTwo: "All rights reserved",
  privacyLabel: "Privacy Policy",
  privacyLink: "#",
  termsLabel: "Terms & Conditions",
  termsLink: "#",
};

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
      href: item?.link?.trim() || "#",
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
        href: item?.link?.trim() || "#",
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
      logoSrc: trimOrUndefined(fields?.headerLogo?.node?.sourceUrl) || DEFAULT_HEADER_SETTINGS.logoSrc,
      logoAlt: trimOrUndefined(fields?.headerLogo?.node?.altText) || DEFAULT_HEADER_SETTINGS.logoAlt,
      ctaText: trimOrUndefined(fields?.headerCtaText) || DEFAULT_HEADER_SETTINGS.ctaText,
      ctaLink: trimOrUndefined(fields?.headerCtaLink) || DEFAULT_HEADER_SETTINGS.ctaLink,
      menuItems: headerMenuItems.length > 0 ? headerMenuItems : DEFAULT_HEADER_SETTINGS.menuItems,
      officeLocations:
        headerOfficeLocations.length > 0
          ? headerOfficeLocations
          : DEFAULT_HEADER_SETTINGS.officeLocations,
    },
    footer: {
      ctaHeading: trimOrUndefined(fields?.footerCtaHeading) || DEFAULT_FOOTER_SETTINGS.ctaHeading,
      ctaParagraph: trimOrUndefined(fields?.footerCtaParagraph) || DEFAULT_FOOTER_SETTINGS.ctaParagraph,
      ctaButtonText: trimOrUndefined(fields?.footerCtaButtonText) || DEFAULT_FOOTER_SETTINGS.ctaButtonText,
      ctaButtonLink: trimOrUndefined(fields?.footerCtaButtonLink) || DEFAULT_FOOTER_SETTINGS.ctaButtonLink,
      navigationLinks: toLinkItems(fields?.footerNavigationLinks).length > 0
        ? toLinkItems(fields?.footerNavigationLinks)
        : DEFAULT_FOOTER_SETTINGS.navigationLinks,
      serviceLinks: toLinkItems(fields?.footerServiceLinks).length > 0
        ? toLinkItems(fields?.footerServiceLinks)
        : DEFAULT_FOOTER_SETTINGS.serviceLinks,
      addressLines: addressLines.length > 0 ? addressLines : DEFAULT_FOOTER_SETTINGS.addressLines,
      phone: trimOrUndefined(fields?.footerPhone) || DEFAULT_FOOTER_SETTINGS.phone,
      linkedinUrl: trimOrUndefined(fields?.footerLinkedinUrl) || DEFAULT_FOOTER_SETTINGS.linkedinUrl,
      instagramUrl: trimOrUndefined(fields?.footerInstagramUrl) || DEFAULT_FOOTER_SETTINGS.instagramUrl,
      twitterUrl: trimOrUndefined(fields?.footerTwitterUrl) || DEFAULT_FOOTER_SETTINGS.twitterUrl,
      copyrightLineOne: trimOrUndefined(fields?.footerCopyrightLineOne) || DEFAULT_FOOTER_SETTINGS.copyrightLineOne,
      copyrightLineTwo: trimOrUndefined(fields?.footerCopyrightLineTwo) || DEFAULT_FOOTER_SETTINGS.copyrightLineTwo,
      privacyLabel: trimOrUndefined(fields?.footerPrivacyLabel) || DEFAULT_FOOTER_SETTINGS.privacyLabel,
      privacyLink: trimOrUndefined(fields?.footerPrivacyLink) || DEFAULT_FOOTER_SETTINGS.privacyLink,
      termsLabel: trimOrUndefined(fields?.footerTermsLabel) || DEFAULT_FOOTER_SETTINGS.termsLabel,
      termsLink: trimOrUndefined(fields?.footerTermsLink) || DEFAULT_FOOTER_SETTINGS.termsLink,
    },
  };
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  const fallbackSettings = {
    header: { ...DEFAULT_HEADER_SETTINGS },
    footer: { ...DEFAULT_FOOTER_SETTINGS },
  };

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
    const flatFields =
      flatJson.data?.headerFooterSettings &&
      !("headerFooterSettings" in flatJson.data.headerFooterSettings)
        ? flatJson.data.headerFooterSettings
        : null;

    if (!flatJson.errors?.length && flatFields) {
      return normalizeSettings(flatFields);
    }

    return fallbackSettings;
  } catch {
    return fallbackSettings;
  }
}
