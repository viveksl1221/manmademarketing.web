"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Stars from "@/components/motion/Stars";

const pillars = [
  {
    title: "Strategy First",
    text: "Every project starts with clarity: who you serve, where you stand today and where you want to go.",
  },
  {
    title: "Creativity",
    text: "Craft-level creative that gives your brand a voice and a look people remember.",
  },
  {
    title: "Performance",
    text: "Work built to be measured, so every decision is backed by results rather than guesswork.",
  },
  {
    title: "Partnership",
    text: "We act as an extension of your team, with clear plans, honest updates and shared goals.",
  },
];

/**
 * Pinned horizontal scroll: the section holds the screen while the cards
 * travel from right to left, ending on a call-to-action card.
 */
export default function Philosophy() {
  const outerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [viewport, setViewport] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
      setViewport(window.innerHeight);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, (v) => -v * distance);
  const progress = useTransform(
    scrollYProgress,
    (v) => `${Math.round(v * 100)}%`,
  );

  return (
    <section
      id="philosophy"
      ref={outerRef}
      aria-label="Our philosophy"
      style={{ height: distance && viewport ? distance + viewport : "400vh" }}
      className="relative"
    >
      <div className="theme-dark sticky top-0 isolate h-screen overflow-hidden">
        <Stars />

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex h-full w-max items-stretch"
        >
          {/* 1. Intro card */}
          <div className="theme-red flex h-full w-screen shrink-0 flex-col justify-between px-6 py-24 sm:px-10 lg:px-16 xl:px-24">
            <p className="text-label flex items-center gap-3">
              <span className="text-red">04</span>
              <span>Our Philosophy</span>
            </p>
            <h2
              className="text-display max-w-6xl text-white"
              style={{
                fontSize: "clamp(3.25rem, 10vw, 10rem)",
                lineHeight: 0.95,
              }}
            >
              Marketing built
              <br />
              with intent.
            </h2>
            <p className="text-label flex items-center gap-3 text-white/80">
              Scroll
              <svg
                width="28"
                height="12"
                viewBox="0 0 28 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0 6H26M26 6L21 1M26 6L21 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </p>
          </div>

          {/* 2. Four pillar cards */}
          <ul className="flex items-center gap-5 px-[8vw] sm:gap-8">
            {pillars.map((p, i) => (
              <li
                key={p.title}
                className="flex h-[30rem] w-[82vw] shrink-0 flex-col justify-between rounded-3xl border border-white/15 bg-white/[0.04] p-7 backdrop-blur-sm sm:h-[34rem] sm:w-[28rem] sm:p-10"
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white text-2xl font-bold text-white sm:h-24 sm:w-24 sm:text-3xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-h2 text-white">{p.title}</h3>
                  <p className="mt-5 text-base leading-relaxed text-white/65 sm:text-lg">
                    {p.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* 3. CTA card */}
          <div className="theme-red flex h-full w-screen shrink-0 flex-col items-center justify-center gap-10 px-6 text-center">
            <p className="text-body-lg text-white/90">
              Have a project in mind?
            </p>
            <h2 className="text-display max-w-4xl text-white">
              Let&rsquo;s make something great together.
            </h2>
            <Link
              href="/contact"
              className="group flex h-44 w-44 items-center justify-center gap-2 rounded-full border-2 border-white text-lg font-semibold text-white transition-colors duration-300 hover:bg-[#141414] hover:border-[#141414] sm:h-52 sm:w-52"
            >
              Let&rsquo;s talk
              <svg
                width="18"
                height="18"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </motion.div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-white/10"
          aria-hidden="true"
        >
          <motion.div className="h-full bg-red" style={{ width: progress }} />
        </div>
      </div>
    </section>
  );
}
