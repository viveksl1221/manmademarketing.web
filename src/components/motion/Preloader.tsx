"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import useReducedMotionSafe from "@/components/motion/useReducedMotionSafe";

const frames = [
  { src: "/logo/mark.png", alt: "Man Made Marketing — icon mark", className: "h-20 w-12" },
  { src: "/logo/wordmark-on-dark.svg", alt: "Man Made Marketing", className: "h-16 w-64" },
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

  useEffect(() => {
    if (frameIndex < frames.length - 1) {
      const id = window.setTimeout(() => setFrameIndex((i) => i + 1), HOLD_MS[frameIndex] * scale);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => setDone(true), HOLD_MS[frameIndex] * scale);
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
          transition={{ duration: (EXIT_MS * scale) / 1000, ease: [0.65, 0, 0.35, 1] }}
          className="preloader-root fixed inset-0 z-[300] flex flex-col items-center justify-center gap-10 bg-ink"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={frameIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: (CROSSFADE_MS * scale) / 1000, ease: [0.65, 0, 0.35, 1] }}
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

          <div className="h-px w-48 overflow-hidden bg-white/15" aria-hidden="true">
            <motion.div
              className="h-full bg-red"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: (TOTAL_MS * scale) / 1000, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
