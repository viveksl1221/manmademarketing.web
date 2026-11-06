import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Insights | Man Made Marketing",
  description: "Perspective on strategy, creativity, and growth from Man Made Marketing.",
};

export default function InsightsPage() {
  return (
    <>
      <section className="theme-red border-b border-border py-20 sm:py-24 lg:py-28">
        <Container>
          <SectionHeading
            label="Insights"
            title={"Perspective on strategy,\ncreativity, and growth."}
            description="Our editorial section is in progress. Articles covering branding, performance marketing, and organic growth will publish here soon."
          />
        </Container>
      </section>

      <section className="theme-dark py-16 sm:py-20">
        <Container>
          <p className="text-label text-muted">Topics coming soon</p>
          <ul className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-ink sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} as="li" delay={i * 0.06} className="flex flex-col gap-2 bg-white p-6">
                <span className="text-label text-red">{service.number}</span>
                <span className="text-h3 text-ink">{service.title}</span>
                <span className="text-sm text-ink/60">Placeholder — not yet published.</span>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="theme-light border-t border-border py-20 sm:py-24">
        <Container className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          <Reveal>
            <h2 className="text-h2 max-w-xl text-white">Have a question in the meantime?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/contact" variant="primary" className="shrink-0" magnetic>
              Get in Touch
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
