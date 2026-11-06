"use client";

import useReducedMotionSafe from "@/components/motion/useReducedMotionSafe";
import { motion } from "framer-motion";

type Line = string | { text: string; className?: string };

function lineText(line: Line) {
  return typeof line === "string" ? line : line.text;
}

function lineClass(line: Line, fallback?: string) {
  const own = typeof line === "string" ? undefined : line.className;
  return [fallback, own].filter(Boolean).join(" ");
}

// The visible line sits inside an overflow-hidden wrapper so it can wipe up
// into view. Observing *that* line directly for whileInView is a trap: its
// own initial translateY pushes it outside the wrapper's clip box, so the
// browser reports zero intersection and the reveal can never fire. Instead,
// the stable (untransformed) wrapper is observed, and the line's animation
// is driven by variant propagation from that wrapper.
const lineVariants = {
  hidden: { y: 80, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function SplitLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  trigger = "view",
}: {
  lines: Line[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  trigger?: "view" | "mount";
}) {
  const reduceMotion = useReducedMotionSafe();

  if (reduceMotion) {
    return (
      <span className={className}>
        {lines.map((line, i) => (
          <span key={i} className={`block ${lineClass(line, lineClassName)}`}>
            {lineText(line)}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className="block overflow-hidden py-[0.05em]"
          initial="hidden"
          {...(trigger === "view"
            ? { whileInView: "visible", viewport: { once: true, margin: "0px 0px -10% 0px" } }
            : { animate: "visible" })}
        >
          <motion.span
            className={`block ${lineClass(line, lineClassName)}`}
            variants={lineVariants}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * stagger,
            }}
          >
            {lineText(line)}
          </motion.span>
        </motion.span>
      ))}
    </span>
  );
}
