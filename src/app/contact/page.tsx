import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/motion/Reveal";
import { contact } from "@/data/brand";

export const metadata: Metadata = {
  title: "Contact | Man Made Marketing",
  description: "Start a project with Man Made Marketing — a strategy-driven marketing agency.",
};

export default function ContactPage() {
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SectionHeading
            label="Contact"
            title={"Ready to make\nyour next move?"}
            description="Tell us where the brand is today and where it needs to go. We'll follow up with next steps."
          />

          <Reveal delay={0.2} className="mt-12 flex flex-col gap-5 border-t border-border pt-8">
            <div>
              <p className="text-label text-muted">Email</p>
              <a
                href={`mailto:${contact.email}`}
                data-cursor="hover"
                className="text-h3 mt-1 block text-white hover:text-red"
              >
                {contact.email}
              </a>
            </div>
            <div>
              <p className="text-label text-muted">Phone</p>
              <a
                href={contact.phoneHref}
                data-cursor="hover"
                className="text-h3 mt-1 block text-white hover:text-red"
              >
                {contact.phone}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <div className="rounded-lg border border-border p-6 sm:p-10">
            <ContactForm />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
