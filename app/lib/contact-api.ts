/**
 * WordPress WPGraphQL API for Contact Us page.
 * Fetches ACF data for the Contact Us page.
 */

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || "http://cwitmain.local/graphql";

// -----------------------------------------------------------------------------
// GraphQL Query
// -----------------------------------------------------------------------------

export const GET_CONTACT_PAGE = `
  query GetContactPage($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      title
      slug
      contactPage {
        contactBanner {
          bannerTitle
          bannerDescription
          bannerBackgroundImage {
            node {
              sourceUrl
              altText
            }
          }
        }
        contactFormSettings {
          recipientEmail
          submitButtonText
          successMessage
        }
        contactMapLocations {
          name
          address
          latitude
          longitude
        }
        contactAccordionTitle
        contactAccordionItems {
          faqTitle
          faqContent
        }
      }
    }
  }
`;

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type ContactBanner = {
  bannerTitle?: string | null;
  bannerDescription?: string | null;
  bannerBackgroundImage?: { node?: { sourceUrl?: string; altText?: string | null } } | null;
};

export type ContactFormSettings = {
  recipientEmail?: string | null;
  submitButtonText?: string | null;
  successMessage?: string | null;
};

export type ContactMapLocation = {
  name?: string | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
};

export type ContactAccordionItem = {
  faqTitle?: string | null;
  faqContent?: string | null;
};

export type ContactPageFields = {
  contactBanner?: ContactBanner | null;
  contactFormSettings?: ContactFormSettings | null;
  contactMapLocations?: ContactMapLocation[] | null;
  contactAccordionTitle?: string | null;
  contactAccordionItems?: ContactAccordionItem[] | null;
};

export type GraphQLContactResponse = {
  data?: {
    page?: {
      title?: string | null;
      slug?: string | null;
      contactPage?: ContactPageFields | null;
    } | null;
  } | null;
  errors?: Array<{ message: string }> | null;
};

// -----------------------------------------------------------------------------
// Fetch
// -----------------------------------------------------------------------------

export async function fetchContactPage(id: number | string): Promise<GraphQLContactResponse> {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: GET_CONTACT_PAGE,
      variables: { id: String(id) },
    }),
  });
  return (await res.json()) as GraphQLContactResponse;
}

/** Extract contactPage fields from response */
export function getContactPageFields(data: GraphQLContactResponse["data"]): ContactPageFields | null {
  return data?.page?.contactPage ?? null;
}
