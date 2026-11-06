import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { clients } from "@/data/clients";

export default function ClientsMarquee() {
  return (
    <section className="theme-light border-b border-white/10 py-16 sm:py-24" aria-label="Clients">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading label="Clients" title={"Brands that\ntrust us."} />
          <Reveal delay={0.15}>
            <p className="text-h1 leading-none text-red">
              {clients.length}
              <span className="text-white/90">+</span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12 sm:mt-16">
          <ul className="grid grid-cols-1 border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {clients.map((name, i) => (
              <li
                key={name}
                className="group flex items-center justify-between gap-4 border-b border-r border-white/10 px-5 py-6 transition-colors duration-300 hover:bg-red-10 sm:px-6 sm:py-8"
              >
                <span className="text-lg font-medium tracking-tight text-white/90 transition-colors group-hover:text-white sm:text-xl">
                  {name}
                </span>
                <span className="text-label shrink-0 text-muted transition-colors group-hover:text-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
