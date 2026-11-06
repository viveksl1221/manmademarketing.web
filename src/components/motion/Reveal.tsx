"use client";

import useReducedMotionSafe from "@/components/motion/useReducedMotionSafe";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const tags = {
  div: { Motion: motion.div, Static: "div" },
  li: { Motion: motion.li, Static: "li" },
  span: { Motion: motion.span, Static: "span" },
} as const;

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: keyof typeof tags;
}) {
  const reduceMotion = useReducedMotionSafe();
  const { Motion, Static } = tags[as];

  if (reduceMotion) {
    const StaticTag = Static;
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  return (
    <Motion
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </Motion>
  );
}
