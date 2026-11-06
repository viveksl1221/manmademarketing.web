import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitLines from "@/components/motion/SplitLines";
import Reveal from "@/components/motion/Reveal";

export default function ContactCTA() {
  return (
    <section id="contact-cta" className="theme-light border-t border-border py-24 sm:py-28 lg:py-32">
      <Container className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <SectionLabel>Let&rsquo;s Talk</SectionLabel>
          <h2 className="text-h1 mt-6 text-white">
            <SplitLines lines={["Ready to make", "your next move?"]} />
          </h2>
          <Reveal delay={0.15}>
            <p className="text-body-lg mt-6 max-w-lg text-muted">
              Tell us where the brand is today and where it needs to go. We&rsquo;ll follow up with
              next steps.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.25}>
          <Button href="/contact" variant="primary" className="shrink-0" magnetic>
            Start a Project
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
