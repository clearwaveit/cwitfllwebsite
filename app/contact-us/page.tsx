import DigitalExperienceBanner from "@/app/components/sections/DigitalExperienceBanner"
import Accordion from "../components/sections/Accordion";
import ContactForm from "../components/ui/ContactForm";
import GoogleMapSection from "../components/sections/GoogleMapSection";
import vectorBg from "@/app/assets/imgs/Mask group (1).png";

export default function ContactUsPage() {
  return (
    <main className="min-h-screen">
      <DigitalExperienceBanner
        title={
          <>
            Contact Us
          </>
        }
        description="Digital Experiences That Inspire and Perform"
        backgroundImage={{
          src: vectorBg.src,
          alt: "Background",
        }}
        contactForm={<ContactForm />}
      />
      <GoogleMapSection />
      <Accordion />
    </main>
  );
}

