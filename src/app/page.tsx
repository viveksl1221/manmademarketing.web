import Hero from "@/components/home/Hero";
import FeaturedSlider from "@/components/home/FeaturedSlider";
import ClientsMarquee from "@/components/home/ClientsMarquee";
import RegionsMarquee from "@/components/home/RegionsMarquee";
import Services from "@/components/home/Services";
import Process from "@/components/home/Process";
import Philosophy from "@/components/home/Philosophy";
import Testimonials from "@/components/home/Testimonials";
import Faq from "@/components/home/Faq";
import StackCard from "@/components/motion/StackCard";

const stacked = new Set([Services]);
const sections = [
  Hero,
  FeaturedSlider,
  ClientsMarquee,
  RegionsMarquee,
  Services,
  Process,
  Testimonials,
  Philosophy,
  Faq,
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
        ),
      )}
    </>
  );
}
