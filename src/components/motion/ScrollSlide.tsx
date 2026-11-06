"use client";

import useReducedMotionSafe from "@/components/motion/useReducedMotionSafe";
import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Slides its children horizontally as the element scrolls through the viewport.
 * Without `fit`, it moves between fixed `from`/`to` viewport-width offsets.
 * With `fit`, it travels exactly far enough to reveal the whole (wider) track.
 */
export default function ScrollSlide({
  children,
  from = 0,
  to = 0,
  fit = false,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  from?: number;
  to?: number;
  fit?: boolean;
  reverse?: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotionSafe();
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end 0.35"],
  });

  useEffect(() => {
    if (!fit) return;
    const measure = () => {
      const track = trackRef.current;
      const wrap = wrapRef.current;
      if (!track || !wrap) return;
      setDistance(Math.max(0, track.scrollWidth - wrap.clientWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [fit]);

  const fitX = useTransform(scrollYProgress, [0, 1], reverse ? [-distance, 0] : [0, -distance]);
  const vwX = useTransform(scrollYProgress, [0, 1], [`${from}vw`, `${to}vw`]);
  const x = fit ? fitX : vwX;

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`}>
      <motion.div ref={trackRef} style={reduceMotion ? undefined : { x }} className="w-max">
        {children}
      </motion.div>
    </div>
  );
}
