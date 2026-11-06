"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Marquee from "@/components/ui/Marquee";
import SplitLines from "@/components/motion/SplitLines";

const marqueeItems = ["Strategy", "Branding", "Web Design", "Performance", "SEO", "Content"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Container className="relative pb-20 pt-16 sm:pt-20 lg:pb-28 lg:pt-28">
        <h1 className="text-display max-w-4xl text-white">
          <SplitLines
            trigger="mount"
            delay={0.1}
            lines={["We build brands, websites", { text: "and marketing that grow.", className: "text-red" }]}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="text-body-lg mt-8 max-w-lg text-muted"
        >
          Branding, web design, performance marketing, SEO and content, all under one roof, for
          ambitious brands across the Gulf.
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

      <div className="relative bg-mist py-4">
        <Marquee items={marqueeItems} variant="label" />
      </div>
    </section>
  );
}
