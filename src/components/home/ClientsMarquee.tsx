import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import ScrollSlide from "@/components/motion/ScrollSlide";
import { clients } from "@/data/clients";

const ROWS = 3;
const perRow = Math.ceil(clients.length / ROWS);
const rows = Array.from({ length: ROWS }, (_, r) => clients.slice(r * perRow, (r + 1) * perRow));

export default function ClientsMarquee() {
  return (
    <section className="theme-light overflow-hidden py-16 sm:py-24" aria-label="Clients">
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
      </Container>

      <div className="mt-12 flex flex-col gap-3 sm:mt-16 sm:gap-4">
        {rows.map((row, r) => (
          <ScrollSlide key={r} fit reverse={r % 2 === 1}>
            <ul className="flex gap-3 px-6 sm:gap-4 sm:px-10 lg:px-16 xl:px-24">
              {row.map((name) => (
                <li
                  key={name}
                  className="shrink-0 whitespace-nowrap rounded-full border border-white/20 px-6 py-3 text-base font-medium text-white transition-colors duration-300 hover:border-red hover:bg-red hover:text-[#ffffff] sm:px-8 sm:py-4 sm:text-xl"
                >
                  {name}
                </li>
              ))}
            </ul>
          </ScrollSlide>
        ))}
      </div>
    </section>
  );
}
