import Stars from "@/components/motion/Stars";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollSlide from "@/components/motion/ScrollSlide";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section
      className="theme-dark relative isolate overflow-hidden py-20 sm:py-28"
      aria-label="Testimonials"
    >
      <Stars />
      <Container>
        <SectionHeading
          label="Testimonials"
          title={"Kind words from\nbrands we grow."}
        />
      </Container>

      <ScrollSlide fit reverse className="mt-12 sm:mt-16">
        <ul className="flex items-stretch gap-4 px-6 sm:gap-6 sm:px-10 lg:px-16 xl:px-24">
          {testimonials.map((t, i) => (
            <li
              key={i}
              className="flex w-[84vw] shrink-0 flex-col justify-between gap-10 rounded-3xl bg-white/[0.06] p-7 sm:w-[30rem] sm:p-10"
            >
              <div>
                <span
                  aria-hidden="true"
                  className="text-red block text-7xl font-bold leading-none"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  &ldquo;
                </span>
                <blockquote className="text-h3 mt-4 font-medium text-white">
                  {t.quote}
                </blockquote>
              </div>
              <div className="text-sm">
                <span className="block font-semibold text-white">{t.name}</span>
                <span className="text-muted">
                  {t.role}, {t.company}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </ScrollSlide>
    </section>
  );
}
