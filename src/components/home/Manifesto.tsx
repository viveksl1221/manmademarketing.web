import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitLines from "@/components/motion/SplitLines";
import ScrollSlide from "@/components/motion/ScrollSlide";
import ScrollReveal from "@/components/motion/ScrollReveal";

export default function Manifesto() {
  return (
    <section className="theme-red relative overflow-hidden py-24 sm:py-32 lg:py-40">
      <Container className="relative">
        <SectionLabel number="04">Our Philosophy</SectionLabel>
        <h2 className="text-display mt-8 max-w-3xl text-white">
          <SplitLines lines={["Marketing Built", "with Intent."]} />
        </h2>
        <ScrollReveal
          as="p"
          mode="scrub"
          splitBy="words"
          effect="fade"
          stagger={0.05}
          baseOpacity={0.15}
          baseRotation={2}
          enableBlur
          blurStrength={4}
          containerClassName="mt-10 max-w-3xl"
          textClassName="text-h3 font-medium text-white"
        >
          Every decision we make connects strategy, creativity, and measurable
          business growth. Nothing ships because it looks interesting — it ships
          because it moves the brand toward a clear, agreed outcome.
        </ScrollReveal>
      </Container>

      <ScrollSlide from={10} to={-60} className="mt-16 sm:mt-24">
        <p
          aria-hidden="true"
          className="whitespace-nowrap text-[clamp(5rem,16vw,14rem)] font-bold leading-none tracking-tighter text-white/15"
        >
          Intent over noise — Intent over noise
        </p>
      </ScrollSlide>
    </section>
  );
}
