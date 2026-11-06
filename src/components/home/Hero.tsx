"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import HorizonBloom from "@/components/motion/HorizonBloom";
import PartnerBadges from "@/components/home/PartnerBadges";
import SplitLines from "@/components/motion/SplitLines";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <HorizonBloom
        backgroundColor="#000000"
        aurora={0}
        clouds={0}
        airglow={0.1}
        drift={1}
        speed={0.7}
        className="flex min-h-[88svh] flex-col"
      >
        <Container className="relative flex-1 pb-24 pt-36 sm:pt-40 lg:pb-40 lg:pt-48">
          <h1 className="text-display max-w-6xl text-white">
            <SplitLines
              trigger="mount"
              delay={0.1}
              lines={[
                "We build brands, websites",
                { text: "and marketing that grow.", className: "text-red" },
              ]}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="text-body-lg mt-8 max-w-lg text-muted"
          >
            Branding, web design, performance marketing, SEO and content, all
            under one roof, for ambitious brands across the Gulf.
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

        <PartnerBadges />
      </HorizonBloom>
    </section>
  );
}
