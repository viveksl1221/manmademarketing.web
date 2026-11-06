"use client";

import useReducedMotionSafe from "@/components/motion/useReducedMotionSafe";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollSlide from "@/components/motion/ScrollSlide";
import { processSteps } from "@/data/process";

export default function Process() {
  const reduceMotion = useReducedMotionSafe();

  return (
    <section
      id="process"
      className="theme-light overflow-hidden py-24 sm:py-28 lg:py-32"
    >
      <Container>
        <SectionHeading
          label="How We Work"
          number="03"
          title={"A clear process, from first\nconversation to live results."}
        />

        <ScrollSlide
          from={-45}
          to={5}
          className="relative left-1/2 mt-14 w-screen -translate-x-1/2"
        >
          <p
            aria-hidden="true"
            className="text-display whitespace-nowrap text-red"
          >
            Strategy — Creativity — Performance — Growth — Strategy
          </p>
        </ScrollSlide>

        <ol className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, i) => (
            <motion.li
              key={step.number}
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.08,
              }}
              className="border-t-2 border-white/20 pt-6"
            >
              <span className="text-label text-red">{step.number}</span>
              <h3 className="text-h3 mt-3 text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
