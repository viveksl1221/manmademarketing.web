import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { brand } from "@/data/brand";

export const metadata: Metadata = {
  title: "About | Man Made Marketing",
  description: "A strategy-driven marketing agency partnering with ambitious brands to build clarity, momentum, and measurable growth.",
};

export default function AboutPage() {
  return (
    <>
      <section className="theme-red py-20 sm:py-24 lg:py-28">
        <Container>
          <SectionHeading
            label="About"
            title={"A strategy-driven\nmarketing agency."}
            description={brand.about}
          />
        </Container>
      </section>

      <section className="theme-light py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <Reveal>
            <p className="text-label text-red">Mission</p>
            <p className="text-h3 mt-4 max-w-md text-white">{brand.mission}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-label text-red">Vision</p>
            <p className="text-h3 mt-4 max-w-md text-white">{brand.vision}</p>
          </Reveal>
        </Container>
      </section>

      <section className="theme-dark py-16 sm:py-20">
        <Container>
          <p className="text-label text-muted">Core Values</p>
          <ul className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-ink sm:grid-cols-2 lg:grid-cols-4">
            {brand.coreValues.map((value, i) => (
              <Reveal key={value} as="li" delay={i * 0.06} className="bg-white p-6">
                <span className="text-h3 text-ink">{value}</span>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="theme-light py-16 sm:py-20">
        <Container>
          <p className="text-label text-muted">Brand Personality</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {brand.personality.map((trait) => (
              <span
                key={trait}
                className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-white"
              >
                {trait}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="theme-red py-20 sm:py-24">
        <Container className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          <Reveal>
            <h2 className="text-h2 max-w-xl text-white">Want to partner with us?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/contact" variant="primary" className="shrink-0" magnetic>
              Start a Project
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
