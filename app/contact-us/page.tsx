import DigitalExperienceBanner from "@/app/components/sections/DigitalExperienceBanner"
import Accordion from "../components/sections/Accordion";
import ContactForm from "../components/ui/ContactForm";
import GoogleMapSection from "../components/sections/GoogleMapSection";
import vectorBg from "@/app/assets/imgs/Mask group (1).png";
import { fetchDefaultContactPage, getContactPageFields } from "@/app/lib/contact-api";
import {
  buildContactFormFields,
  DEFAULT_CONTACT_SUBMIT_BUTTON_TEXT,
  DEFAULT_CONTACT_SUCCESS_MESSAGE,
  parseNumber,
  trimString,
} from "@/app/lib/contact-form-config";
import { resolveImageUrl } from "@/app/lib/our-work-api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ContactUsPage() {
  let fields = null;
  try {
    const res = await fetchDefaultContactPage();
    fields = getContactPageFields(res.data);
  } catch (error) {
    console.error("Failed to fetch Contact Us page data:", error);
  }

  const bannerTitle = fields?.contactBanner?.bannerTitle || "Contact Us";
  const bannerDescription = fields?.contactBanner?.bannerDescription || "Digital Experiences That Inspire and Perform";
  const bannerBgUrl = fields?.contactBanner?.bannerBackgroundImage?.node?.sourceUrl;
  const formSettings = (fields?.contactFormSettings ?? undefined) as Record<string, unknown> | undefined;
  const formFields = buildContactFormFields(formSettings);
  const formSubmitButtonText =
    trimString(fields?.contactFormSettings?.submitButtonText) || DEFAULT_CONTACT_SUBMIT_BUTTON_TEXT;
  const formSuccessMessage =
    trimString(fields?.contactFormSettings?.successMessage) ||
    DEFAULT_CONTACT_SUCCESS_MESSAGE;

  const accordionTitle = fields?.contactAccordionTitle || "FAQ's";
  const accordionItems = fields?.contactAccordionItems?.length
    ? fields.contactAccordionItems.map((item, i) => ({
        id: i + 1,
        title: item.faqTitle || "",
        content: item.faqContent || "",
      }))
    : undefined;

  // Map locations from CMS
  const locations = fields?.contactMapLocations?.length
    ? fields.contactMapLocations
        .map((loc) => {
          const latitude = parseNumber(loc.latitude);
          const longitude = parseNumber(loc.longitude);
          const name = trimString(loc.name);
          if (!name || latitude == null || longitude == null) return null;
          return {
            name,
            address: trimString(loc.address) || "",
            latitude,
            longitude,
          };
        })
        .filter((loc): loc is { name: string; address: string; latitude: number; longitude: number } => !!loc)
    : undefined;

  return (
    <main className="min-h-screen">
      <DigitalExperienceBanner
        title={<>{bannerTitle}</>}
        description={bannerDescription}
        backgroundImage={{
          src: bannerBgUrl ? resolveImageUrl(bannerBgUrl)! : vectorBg.src,
          alt: "Background",
        }}
        contactForm={
          <ContactForm
            fields={formFields}
            submitButtonText={formSubmitButtonText}
            successMessage={formSuccessMessage}
          />
        }
      />
      <GoogleMapSection locations={locations && locations.length > 0 ? locations : undefined} />
      <Accordion title={accordionTitle} items={accordionItems} />
    </main>
  );
}
