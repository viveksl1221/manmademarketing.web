import Hero from "@/components/home/Hero";
import FeaturedSlider from "@/components/home/FeaturedSlider";
import RegionsMarquee from "@/components/home/RegionsMarquee";
import ClientsMarquee from "@/components/home/ClientsMarquee";
import Services from "@/components/home/Services";
import Process from "@/components/home/Process";
import Manifesto from "@/components/home/Manifesto";
import ContactCTA from "@/components/home/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedSlider />
      <ClientsMarquee />
      <RegionsMarquee />
      <Services />
      <Process />
      <Manifesto />
      <ContactCTA />
    </>
  );
}
