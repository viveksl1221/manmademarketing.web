"use client";

import useReducedMotionSafe from "@/components/motion/useReducedMotionSafe";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";

export default function Process() {
  const reduceMotion = useReducedMotionSafe();

  return (
    <section id="process" className="theme-light py-24 sm:py-28 lg:py-32">
      <Container>
        <SectionHeading
          label="How We Work"
          number="03"
          title={"A clear process, from first\nconversation to live results."}
        />

        <ol className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, i) => (
            <motion.li
              key={step.number}
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className="border-t-2 border-white/20 pt-6"
            >
              <span className="text-label text-red">{step.number}</span>
              <h3 className="text-h3 mt-3 text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
