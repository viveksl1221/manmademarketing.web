"use client";

import useReducedMotionSafe from "@/components/motion/useReducedMotionSafe";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Marquee from "@/components/ui/Marquee";
import SplitLines from "@/components/motion/SplitLines";

const marqueeItems = ["Strategy", "Branding", "Web Design", "Performance", "SEO", "Content"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-b border-white/10">
      <Container className="relative pb-20 pt-16 sm:pt-20 lg:pb-28 lg:pt-28">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-label text-red"
        >
          Man Made Marketing — Marketing Agency
        </motion.p>

        <h1 className="text-display mt-6 max-w-3xl text-white">
          <SplitLines
            trigger="mount"
            delay={0.1}
            lines={["Don't just get seen.", { text: "Get remembered.", className: "text-red" }]}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="text-body-lg mt-8 max-w-lg text-muted"
        >
          Strategy, creativity and performance working together to help ambitious brands build
          momentum and grow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button href="/contact" variant="primary" magnetic>
            Start a Project
          </Button>
          <Button href="/work" variant="secondary" magnetic>
            Explore Our Work
          </Button>
        </motion.div>
      </Container>

      <div className="relative border-t border-white/10 bg-mist py-4">
        <Marquee items={marqueeItems} variant="label" />
      </div>
    </section>
  );
}
