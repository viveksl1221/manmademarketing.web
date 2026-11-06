import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import { partners } from "@/data/partners";

export default function PartnerBadges() {
  return (
    <div
      className="theme-dark relative z-10 bg-transparent py-8 sm:py-10"
      style={{ background: "transparent" }}
    >
      <Container>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5">
          {partners.map((p, i) => (
            <Reveal
              key={p.name}
              as="li"
              delay={i * 0.06}
              className="flex h-28 items-center justify-center rounded-2xl bg-white/[0.06] px-4 text-center sm:h-32 last:col-span-2 md:last:col-span-1"
            >
              {p.logo ? (
                <Image
                  src={p.logo}
                  alt={`${p.name} ${p.tag ?? ""}`.trim()}
                  width={160}
                  height={64}
                  className="h-12 w-auto object-contain opacity-80 brightness-0 invert"
                />
              ) : (
                <span className="flex flex-col items-center leading-none text-white/75">
                  <span
                    className="text-2xl font-bold tracking-tight sm:text-3xl"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {p.name}
                  </span>
                  {p.tag && <span className="text-label mt-2">{p.tag}</span>}
                </span>
              )}
            </Reveal>
          ))}
        </ul>
      </Container>
    </div>
  );
}
