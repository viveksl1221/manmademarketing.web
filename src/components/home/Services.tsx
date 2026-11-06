import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceRow from "@/components/ui/ServiceRow";
import { services } from "@/data/services";

export default function Services() {
  return (
    <section id="services" className="theme-dark border-t border-border py-24 sm:py-28 lg:py-32">
      <Container>
        <SectionHeading
          label="Services"
          number="02"
          title={"Five disciplines,\none strategic through-line."}
          description="Each service is built to work on its own or as part of a larger partnership — connected by the same strategic foundation."
        />

        <div className="mt-14 border-t border-border">
          {services.map((service, i) => (
            <ServiceRow key={service.slug} service={service} href={`/services#${service.slug}`} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
