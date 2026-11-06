"use client";

import useReducedMotionSafe from "@/components/motion/useReducedMotionSafe";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Project } from "@/data/projects";

type View = "grid" | "list";

function GridView({ projects, reduceMotion }: { projects: Project[]; reduceMotion: boolean }) {
  return (
    <div>
      {projects.map((project, i) => (
        <motion.section
          key={project.slug}
          id={project.slug}
          initial={reduceMotion ? undefined : { opacity: 0, y: 32 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="scroll-mt-24 py-16 sm:py-20"
        >
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div
              className={`relative aspect-[4/5] w-full max-w-md overflow-hidden bg-mist lg:col-span-5 ${
                i % 2 === 1 ? "lg:order-2" : ""
              }`}
            >
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                sizes="(min-width: 1024px) 35vw, 90vw"
                className="object-cover object-top"
              />
            </div>
            <div className="lg:col-span-7">
              <p className="text-label text-red">{project.category}</p>
              <h2 className="text-h2 mt-4 text-white">{project.client}</h2>
              <p className="text-body-lg mt-6 max-w-xl text-muted">{project.description}</p>
              <ul className="mt-6 flex flex-wrap gap-3">
                {project.services.map((service) => (
                  <li
                    key={service}
                    className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold tracking-wide text-white"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>
      ))}
    </div>
  );
}

function ListView({ projects, reduceMotion }: { projects: Project[]; reduceMotion: boolean }) {
  return (
    <div className="border-t border-border">
      {projects.map((project, i) => (
        <motion.div
          key={project.slug}
          initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
        >
          <Link
            href={`/work#${project.slug}`}
            data-cursor="hover"
            className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-border py-7 transition-colors duration-200 hover:bg-white/5 sm:gap-10 sm:py-8"
          >
            <span className="text-label text-red">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="text-h3 text-white">{project.client}</h3>
              <p className="mt-1.5 text-sm text-muted sm:text-base">
                {project.category} — {project.services.join(" · ")}
              </p>
            </div>
            <svg
              width="22"
              height="22"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="shrink-0 text-white transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
            >
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
      ))}
    </div>
  );
}

export default function WorkViewToggle({ projects }: { projects: Project[] }) {
  const [view, setView] = useState<View>("grid");
  const reduceMotion = Boolean(useReducedMotionSafe());

  return (
    <div>
      <div className="flex items-center gap-2" role="tablist" aria-label="Work view">
        {(["grid", "list"] as View[]).map((option) => (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={view === option}
            data-cursor="hover"
            onClick={() => setView(option)}
            className={`rounded-full border px-5 py-2 text-sm font-semibold capitalize transition-colors duration-200 ${
              view === option
                ? "border-white bg-white text-ink"
                : "border-white/25 text-white/70 hover:border-white/60 hover:text-white"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={reduceMotion ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          {view === "grid" ? (
            <GridView projects={projects} reduceMotion={reduceMotion} />
          ) : (
            <ListView projects={projects} reduceMotion={reduceMotion} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
