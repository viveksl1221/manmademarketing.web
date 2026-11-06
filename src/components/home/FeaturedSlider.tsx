"use client";

import useReducedMotionSafe from "@/components/motion/useReducedMotionSafe";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SplitLines from "@/components/motion/SplitLines";
import { projects } from "@/data/projects";

const AUTOPLAY_MS = 6000;

function PaginationArrow({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous project" : "Next project"}
      data-cursor="hover"
      className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d={direction === "prev" ? "M12.5 8H3.5M3.5 8L7.5 4M3.5 8L7.5 12" : "M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function FeaturedSlider() {
  const count = projects.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotionSafe();
  const project = projects[index];

  const goTo = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused, count]);

  return (
    <section
      id="selected-work"
      aria-roledescription="carousel"
      aria-label="Featured work"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative h-[82vh] min-h-[560px] w-full overflow-hidden border-b border-white/10 bg-ink"
    >
      <AnimatePresence>
        <motion.div
          key={`bg-${project.slug}`}
          initial={reduceMotion ? false : { opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={project.image.src}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/40" />
          <div className="absolute inset-0 bg-ink/35" />
        </motion.div>
      </AnimatePresence>

      <Container className="relative flex h-full flex-col justify-end pb-24 sm:pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${project.slug}`}
            initial={reduceMotion ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -24 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <p className="text-label flex items-center gap-3 text-white/70">
              <span className="text-red">{String(index + 1).padStart(2, "0")}</span>
              {project.category}
            </p>
            <h2 className="text-display mt-4 text-white">
              <SplitLines trigger="mount" lines={[project.client]} />
            </h2>
            <p className="mt-5 max-w-md text-sm font-medium text-white/70 sm:text-base">
              {project.services.join(" · ")}
            </p>
            <Link
              href={`/work#${project.slug}`}
              data-cursor="hover"
              className="link-underline mt-7 inline-flex items-center gap-2.5 text-sm font-semibold text-white"
            >
              View Case Study
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M4 12L12 4M12 4H5.5M12 4V10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </AnimatePresence>
      </Container>

      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-ink/50 backdrop-blur-sm">
        <Container className="flex items-center justify-between py-5">
          <div className="flex items-center gap-4 text-sm font-semibold text-white/60">
            <span className="text-white" aria-live="polite">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="relative h-px w-16 overflow-hidden bg-white/20">
              <motion.span
                className="absolute inset-y-0 left-0 bg-red"
                animate={{ width: `${((index + 1) / count) * 100}%` }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
            <span>{String(count).padStart(2, "0")}</span>
          </div>

          <div className="flex items-center gap-3">
            <PaginationArrow direction="prev" onClick={prev} />
            <PaginationArrow direction="next" onClick={next} />
          </div>
        </Container>
      </div>
    </section>
  );
}
