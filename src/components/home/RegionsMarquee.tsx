import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollSlide from "@/components/motion/ScrollSlide";
import { regions } from "@/data/brand";

export default function RegionsMarquee() {
  return (
    <section
      className="theme-red overflow-hidden py-20 sm:py-28"
      aria-label="Regions served"
    >
      <Container>
        <SectionHeading
          label="Where We Work"
          title={"Four markets.\nOne team."}
        />
      </Container>

      <ScrollSlide fit className="mt-12 sm:mt-16">
        <ul className="flex gap-4 px-6 sm:gap-6 sm:px-10 lg:px-16 xl:px-24">
          {regions.map((region, i) => (
            <li
              key={region}
              className="group relative flex h-72 w-[78vw] shrink-0 flex-col justify-between overflow-hidden rounded-3xl bg-white p-6 text-[#141414] transition-colors duration-300 hover:bg-[#141414] hover:text-white sm:h-96 sm:w-[28rem] sm:p-8"
            >
              <span className="text-label opacity-60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden="true"
                className="absolute -right-2 -top-6 text-[10rem] font-bold leading-none tracking-tighter text-[#141414]/5 transition-colors duration-300 group-hover:text-white/10 sm:text-[14rem]"
              >
                {i + 1}
              </span>
              <span className="text-h1">{region}</span>
            </li>
          ))}
        </ul>
      </ScrollSlide>
    </section>
  );
}
