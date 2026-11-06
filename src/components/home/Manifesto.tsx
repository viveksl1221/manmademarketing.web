import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitLines from "@/components/motion/SplitLines";
import Reveal from "@/components/motion/Reveal";

export default function Manifesto() {
  return (
    <section className="theme-red relative overflow-hidden py-24 sm:py-32 lg:py-40">
      <Container className="relative">
        <SectionLabel number="04">Our Philosophy</SectionLabel>
        <h2 className="text-display mt-8 max-w-3xl text-white">
          <SplitLines lines={["Marketing Built", "with Intent."]} />
        </h2>
        <Reveal delay={0.2}>
          <p className="text-body-lg mt-8 max-w-xl text-white/70">
            Every decision we make connects strategy, creativity, and measurable business growth.
            Nothing ships because it looks interesting — it ships because it moves the brand toward
            a clear, agreed outcome.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
