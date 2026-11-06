import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services | Man Made Marketing",
  description:
    "Strategy & branding, website design & development, performance marketing, SEO & organic growth, and content & creative.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="theme-red py-20 sm:py-24 lg:py-28">
        <Container>
          <SectionHeading
            label="Services"
            title={"Five disciplines,\none strategic through-line."}
            description="We work across the full marketing stack — from brand foundations to the campaigns and content that keep a brand growing."
          />
        </Container>
      </section>

      {services.map((service, i) => (
        <section
          key={service.slug}
          id={service.slug}
          className={`scroll-mt-24 py-16 sm:py-20 ${i % 2 === 0 ? "theme-light" : "theme-dark"}`}
        >
          <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-4">
              <span className="text-label text-red">{service.number}</span>
              <h2 className="text-h2 mt-4 text-white">{service.title}</h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-8">
              <p className="text-body-lg text-muted">{service.detail}</p>
              <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium text-white">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </section>
      ))}

      <section className="theme-red py-20 sm:py-24">
        <Container className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          <Reveal>
            <h2 className="text-h2 max-w-xl text-white">
              Not sure which service fits? Let&rsquo;s talk it through.
            </h2>
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
