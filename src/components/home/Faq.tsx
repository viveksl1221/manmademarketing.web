import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { faqs } from "@/data/faqs";

export default function Faq() {
  return (
    <section
      id="faq"
      className="theme-light py-20 sm:py-28"
      aria-label="Frequently asked questions"
    >
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              label="FAQ"
              title={"Questions,\nanswered."}
              description="Can't find what you're looking for? Get in touch and we'll gladly help."
            />
          </div>
        </div>

        <Reveal className="lg:col-span-7">
          <div className="border-t border-border">
            {faqs.map((f) => (
              <details
                key={f.question}
                className="group border-b border-border"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-lg font-semibold text-white marker:hidden sm:text-xl [&::-webkit-details-marker]:hidden">
                  {f.question}
                  <span
                    aria-hidden="true"
                    className="relative h-8 w-8 shrink-0 rounded-full border border-border-dark transition-colors duration-300 group-open:border-red group-open:bg-red"
                  >
                    <span className="absolute left-1/2 top-1/2 h-[1.5px] w-3 -translate-x-1/2 -translate-y-1/2 bg-white group-open:bg-[#ffffff]" />
                    <span className="absolute left-1/2 top-1/2 h-3 w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-white transition-transform duration-300 group-open:rotate-90 group-open:bg-[#ffffff]" />
                  </span>
                </summary>
                <p className="max-w-xl pb-6 text-base leading-relaxed text-muted">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
