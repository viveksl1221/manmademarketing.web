import Hero from "@/components/home/Hero";
import FeaturedSlider from "@/components/home/FeaturedSlider";
import ClientsMarquee from "@/components/home/ClientsMarquee";
import RegionsMarquee from "@/components/home/RegionsMarquee";
import Services from "@/components/home/Services";
import Process from "@/components/home/Process";
import Manifesto from "@/components/home/Manifesto";
import ContactCTA from "@/components/home/ContactCTA";
import StackCard from "@/components/motion/StackCard";

const stacked = new Set([Services, Manifesto, ContactCTA]);
const sections = [
  Hero,
  FeaturedSlider,
  ClientsMarquee,
  RegionsMarquee,
  Services,
  Process,
  Manifesto,
  ContactCTA,
];

export default function Home() {
  let layer = 0;
  return (
    <>
      {sections.map((Section, i) =>
        stacked.has(Section) ? (
          <StackCard key={i} index={++layer}>
            <Section />
          </StackCard>
        ) : (
          <div key={i} className="relative" style={{ zIndex: layer }}>
            <Section />
          </div>
        )
      )}
    </>
  );
}
