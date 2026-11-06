import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollSlide from "@/components/motion/ScrollSlide";
import { featuredCases, FeaturedCase } from "@/data/featured";

const tones = {
  red: "bg-red text-[#ffffff]",
  light: "bg-[#ffffff] text-[#141414]",
  mist: "bg-mist text-white border border-white/15",
};

function CaseCard({ item, index }: { item: FeaturedCase; index: number }) {
  const offset = index % 2 === 1 ? "sm:mt-16" : "";

  return (
    <li className={`w-[72vw] shrink-0 sm:w-[24rem] ${offset}`}>
      <Link
        href={item.href}
        className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red"
      >
        <div
          className={`relative aspect-[4/5] w-full overflow-hidden rounded-3xl ${
            item.image ? "bg-mist" : tones[item.tone ?? "mist"]
          }`}
        >
          {item.image ? (
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(min-width: 640px) 24rem, 72vw"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div className="flex h-full flex-col justify-between p-6 sm:p-8">
              <span className="text-label opacity-70">{item.category}</span>
              <div>
                <span className="text-h1 block break-words">{item.client}</span>
                {item.note && <span className="mt-4 block text-sm opacity-75">{item.note}</span>}
              </div>
            </div>
          )}
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-h3 text-white">{item.client}</h3>
            <p className="text-label mt-2 text-muted">{item.category}</p>
          </div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="mt-1 shrink-0 text-white transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:translate-x-1"
          >
            <path
              d="M4 12L12 4M12 4H5.5M12 4V10.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Link>
    </li>
  );
}

export default function FeaturedSlider() {
  return (
    <section id="selected-work" aria-label="Featured work" className="theme-dark overflow-hidden py-20 sm:py-28">
      <Container>
        <SectionHeading label="Case Studies" title={"Work that\nmoves brands."} />
      </Container>

      <ScrollSlide fit className="mt-12 sm:mt-16">
        <ul className="flex items-start gap-4 px-6 sm:gap-6 sm:px-10 lg:px-16 xl:px-24">
          {featuredCases.map((item, i) => (
            <CaseCard key={item.client} item={item} index={i} />
          ))}
        </ul>
      </ScrollSlide>
    </section>
  );
}
