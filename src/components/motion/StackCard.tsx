"use client";

import useReducedMotionSafe from "@/components/motion/useReducedMotionSafe";
import { ReactNode, useEffect, useRef } from "react";

/**
 * Stacking-card scroll effect: the section pins once its bottom edge reaches
 * the bottom of the viewport (or its top, if shorter than the viewport), and
 * the next card slides up over it. Tall sections still scroll fully first.
 */
export default function StackCard({
  children,
  index,
  rounded = true,
}: {
  children: ReactNode;
  index: number;
  rounded?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionSafe();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;
    const update = () => {
      el.style.top = `${Math.min(0, window.innerHeight - el.offsetHeight)}px`;
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={ref}
      style={{ zIndex: index }}
      className={`relative ${reduceMotion ? "" : "sticky"} ${
        rounded
          ? "-mt-8 rounded-t-[2rem] shadow-[0_-24px_60px_rgba(0,0,0,0.35)] sm:-mt-12 sm:rounded-t-[3rem]"
          : ""
      } overflow-hidden`}
    >
      {children}
    </div>
  );
}
