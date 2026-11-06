"use client";

import useReducedMotionSafe from "@/components/motion/useReducedMotionSafe";
import Link from "next/link";
import { motion } from "framer-motion";
import { Service } from "@/data/services";

const MotionLink = motion.create(Link);

export default function ServiceRow({
  service,
  href,
  index = 0,
}: {
  service: Service;
  href: string;
  index?: number;
}) {
  const reduceMotion = useReducedMotionSafe();

  return (
    <MotionLink
      href={href}
      data-cursor="hover"
      initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
      className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-border py-7 transition-colors duration-200 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-red sm:gap-10 sm:py-8"
    >
      <span className="text-label text-red">{service.number}</span>
      <div>
        <h3 className="text-h3 text-white">{service.title}</h3>
        <p className="mt-1.5 max-w-xl text-sm text-muted sm:text-base">{service.summary}</p>
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
    </MotionLink>
  );
}
