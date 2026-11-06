"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, animate, motion } from "framer-motion";
import useReducedMotionSafe from "@/components/motion/useReducedMotionSafe";

const frames = [
  {
    src: "/logo/mark.png",
    alt: "Man Made Marketing — icon mark",
    className: "h-20 w-12",
  },
  {
    src: "/logo/wordmark-on-dark.svg",
    alt: "Man Made Marketing",
    className: "h-16 w-64",
  },
];

const HOLD_MS = [1000, 3000];
const CROSSFADE_MS = 700;
const EXIT_MS = 800;
const TOTAL_MS = HOLD_MS.reduce((a, b) => a + b, 0) + EXIT_MS;

export default function Preloader() {
  const reduceMotion = useReducedMotionSafe();
  const scale = reduceMotion ? 0 : 1;

  const [frameIndex, setFrameIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: (TOTAL_MS * scale) / 1000,
      ease: [0.45, 0, 0.25, 1],
      onUpdate: (v) => setPercent(Math.round(v)),
    });
    return () => controls.stop();
  }, [scale]);

  useEffect(() => {
    if (frameIndex < frames.length - 1) {
      const id = window.setTimeout(
        () => setFrameIndex((i) => i + 1),
        HOLD_MS[frameIndex] * scale,
      );
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(
      () => setDone(true),
      HOLD_MS[frameIndex] * scale,
    );
    return () => window.clearTimeout(id);
  }, [frameIndex, scale]);

  useEffect(() => {
    if (done) {
      document.body.style.removeProperty("overflow");
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: (EXIT_MS * scale) / 1000,
            ease: [0.65, 0, 0.35, 1],
          }}
          className="preloader-root fixed inset-0 z-[300] flex flex-col items-center justify-center gap-10 bg-ink"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={frameIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{
                duration: (CROSSFADE_MS * scale) / 1000,
                ease: [0.65, 0, 0.35, 1],
              }}
              className={`relative ${frames[frameIndex].className}`}
            >
              <Image
                src={frames[frameIndex].src}
                alt={frames[frameIndex].alt}
                fill
                priority
                sizes="256px"
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>

          <div
            aria-hidden="true"
            className="absolute bottom-4 left-5 flex items-end leading-[0.8] text-white/15 sm:bottom-6 sm:left-10 lg:left-16"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-[clamp(7rem,26vw,22rem)] font-bold tracking-tighter tabular-nums">
              {percent}
            </span>
            <span className="mb-2 text-[clamp(1.5rem,5vw,4rem)] font-bold sm:mb-4">
              %
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
