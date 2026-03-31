import DigitalExperienceBanner from "@/app/components/sections/DigitalExperienceBanner"
import Accordion from "../components/sections/Accordion";
import ContactForm from "../components/ui/ContactForm";
import GoogleMapSection from "../components/sections/GoogleMapSection";
import vectorBg from "@/app/assets/imgs/Mask group (1).png";
import { fetchContactPage, getContactPageFields } from "@/app/lib/contact-api";
import { resolveImageUrl } from "@/app/lib/our-work-api";

const PAGE_ID = 762;

export default async function ContactUsPage() {
  let fields = null;
  try {
    const res = await fetchContactPage(PAGE_ID);
    fields = getContactPageFields(res.data);
  } catch {
    // fallback to hardcoded defaults
  }

  const bannerTitle = fields?.contactBanner?.bannerTitle || "Contact Us";
  const bannerDescription = fields?.contactBanner?.bannerDescription || "Digital Experiences That Inspire and Perform";
  const bannerBgUrl = fields?.contactBanner?.bannerBackgroundImage?.node?.sourceUrl;

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
        .filter((loc) => loc.name && loc.latitude && loc.longitude)
        .map((loc) => ({
          name: loc.name!,
          address: loc.address || "",
          latitude: loc.latitude!,
          longitude: loc.longitude!,
        }))
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
        contactForm={<ContactForm />}
      />
      <GoogleMapSection locations={locations && locations.length > 0 ? locations : undefined} />
      <Accordion title={accordionTitle} items={accordionItems} />
    </main>
  );
}
