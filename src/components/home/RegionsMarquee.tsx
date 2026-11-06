import Container from "@/components/ui/Container";
import Marquee from "@/components/ui/Marquee";
import SectionLabel from "@/components/ui/SectionLabel";
import { regions } from "@/data/brand";

export default function RegionsMarquee() {
  return (
    <section className="border-b border-white/10 py-10 sm:py-14" aria-label="Regions served">
      <Container>
        <SectionLabel>Where We Work</SectionLabel>
      </Container>
      <div className="mt-6">
        <Marquee items={regions} variant="display" />
      </div>
    </section>
  );
}
