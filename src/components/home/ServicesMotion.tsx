"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Stars from "@/components/motion/Stars";
import useReducedMotionSafe from "@/components/motion/useReducedMotionSafe";
import { services } from "@/data/services";

type P = { p: MotionValue<number> };

const useDraw = (p: MotionValue<number>, a: number, b: number) =>
  useTransform(p, [a, b], [0, 1]);

const fromTopLeft = { originX: 0, originY: 0, transformBox: "fill-box" } as const;

/* ---------- Scene graphics (400×400, driven by local progress p: 0→1) ---------- */

function BrandGraphic({ p }: P) {
  const ring1 = useDraw(p, 0, 0.35);
  const ring2 = useDraw(p, 0.1, 0.45);
  const mark = useDraw(p, 0.3, 0.8);
  const spin = useTransform(p, [0, 1], [0, 140]);
  const dot = useDraw(p, 0.7, 0.9);
  return (
    <svg viewBox="0 0 400 400" fill="none" className="h-full w-full" aria-hidden="true">
      <motion.circle cx="200" cy="200" r="170" stroke="white" strokeOpacity="0.35" strokeWidth="2" style={{ pathLength: ring1 }} />
      <motion.circle cx="200" cy="200" r="120" stroke="white" strokeOpacity="0.6" strokeWidth="2" style={{ pathLength: ring2 }} />
      <motion.path d="M135 280V125L200 215L265 125V280" stroke="#ff4a4a" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: mark }} />
      <motion.g style={{ rotate: spin, originX: "200px", originY: "200px", opacity: dot }}>
        <circle cx="200" cy="30" r="9" fill="#ff4a4a" />
        <circle cx="370" cy="200" r="5" fill="white" />
      </motion.g>
    </svg>
  );
}

function WebGraphic({ p }: P) {
  const frame = useDraw(p, 0, 0.2);
  const hero = useDraw(p, 0.2, 0.4);
  const c1 = useDraw(p, 0.4, 0.55);
  const c2 = useDraw(p, 0.5, 0.65);
  const c3 = useDraw(p, 0.6, 0.75);
  const cx = useTransform(p, [0.7, 0.95], [60, 290]);
  const cy = useTransform(p, [0.7, 0.95], [60, 300]);
  const cursor = useTransform(p, [0.7, 0.78], [0, 1]);
  return (
    <svg viewBox="0 0 400 400" fill="none" className="h-full w-full" aria-hidden="true">
      <motion.rect x="30" y="50" width="340" height="300" rx="18" stroke="white" strokeOpacity="0.7" strokeWidth="2" style={{ pathLength: frame }} />
      <motion.path d="M30 92H370" stroke="white" strokeOpacity="0.4" strokeWidth="2" style={{ pathLength: frame }} />
      <circle cx="52" cy="71" r="5" fill="#ff4a4a" />
      <circle cx="70" cy="71" r="5" fill="white" fillOpacity="0.4" />
      <circle cx="88" cy="71" r="5" fill="white" fillOpacity="0.4" />
      <motion.rect x="52" y="112" width="296" height="90" rx="10" fill="#ff4a4a" style={{ scaleX: hero, ...fromTopLeft }} />
      <motion.rect x="52" y="222" width="90" height="108" rx="10" fill="white" fillOpacity="0.18" style={{ scaleY: c1, ...fromTopLeft }} />
      <motion.rect x="155" y="222" width="90" height="108" rx="10" fill="white" fillOpacity="0.18" style={{ scaleY: c2, ...fromTopLeft }} />
      <motion.rect x="258" y="222" width="90" height="108" rx="10" fill="white" fillOpacity="0.18" style={{ scaleY: c3, ...fromTopLeft }} />
      <motion.path d="M0 0L0 26L7 20L12 31L17 29L12 18L21 18Z" fill="white" stroke="#141414" strokeWidth="1.5" style={{ x: cx, y: cy, opacity: cursor }} />
    </svg>
  );
}

const barHeights = [60, 95, 80, 140, 120, 200];

function Bar({ p, i }: P & { i: number }) {
  const h = barHeights[i];
  const grow = useDraw(p, 0.05 + i * 0.07, 0.3 + i * 0.07);
  return (
    <motion.rect
      x={55 + i * 52}
      y={340 - h}
      width="34"
      height={h}
      rx="6"
      fill="white"
      fillOpacity={i === barHeights.length - 1 ? 0.9 : 0.22}
      style={{ scaleY: grow, originY: 1, transformBox: "fill-box" }}
    />
  );
}

function PerformanceGraphic({ p }: P) {
  const line = useDraw(p, 0.3, 0.9);
  const tip = useDraw(p, 0.85, 0.95);
  return (
    <svg viewBox="0 0 400 400" fill="none" className="h-full w-full" aria-hidden="true">
      <path d="M40 340H370" stroke="white" strokeOpacity="0.4" strokeWidth="2" />
      {barHeights.map((_, i) => (
        <Bar key={i} p={p} i={i} />
      ))}
      <motion.path d="M72 270L124 235L176 250L228 190L280 205L332 110" stroke="#ff4a4a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: line }} />
      <motion.circle cx="332" cy="110" r="12" fill="#ff4a4a" style={{ opacity: tip }} />
    </svg>
  );
}

function SeoGraphic({ p }: P) {
  const bar = useDraw(p, 0, 0.2);
  const rows = useDraw(p, 0.2, 0.35);
  const climb = useDraw(p, 0.5, 0.9);
  const redY = useTransform(climb, [0, 1], [290, 150]);
  const aY = useTransform(climb, [0, 1], [150, 220]);
  const bY = useTransform(climb, [0, 1], [220, 290]);
  const labelY = useTransform(redY, (v) => v + 37);
  const lineY = useTransform(redY, (v) => v + 24);
  const rank = useTransform(climb, [0, 1], [3, 1]);
  const [r, setR] = useState(3);
  useMotionValueEvent(rank, "change", (v) => setR(Math.max(1, Math.round(v))));
  return (
    <svg viewBox="0 0 400 400" fill="none" className="h-full w-full" aria-hidden="true">
      <motion.rect x="30" y="40" width="340" height="60" rx="30" stroke="white" strokeOpacity="0.7" strokeWidth="2" style={{ pathLength: bar }} />
      <circle cx="68" cy="70" r="11" stroke="#ff4a4a" strokeWidth="3" />
      <path d="M76 78L85 87" stroke="#ff4a4a" strokeWidth="3" strokeLinecap="round" />
      <motion.rect x="105" y="66" width="150" height="8" rx="4" fill="white" fillOpacity="0.4" style={{ scaleX: bar, originX: 0, transformBox: "fill-box" }} />
      <motion.g style={{ opacity: rows }}>
        <motion.rect x="30" width="340" height="56" rx="12" fill="white" fillOpacity="0.12" style={{ y: aY }} />
        <motion.rect x="30" width="340" height="56" rx="12" fill="white" fillOpacity="0.12" style={{ y: bY }} />
        <motion.rect x="30" width="340" height="56" rx="12" fill="#ff4a4a" style={{ y: redY }} />
        <motion.text x="56" fontSize="26" fontWeight="700" fill="white" style={{ y: labelY }}>
          #{r}
        </motion.text>
        <motion.rect x="120" width="190" height="8" rx="4" fill="white" fillOpacity="0.75" style={{ y: lineY }} />
      </motion.g>
    </svg>
  );
}

function ContentGraphic({ p }: P) {
  const fan = useDraw(p, 0, 0.5);
  const left = useTransform(fan, [0, 1], [0, -14]);
  const right = useTransform(fan, [0, 1], [0, 14]);
  const lx = useTransform(fan, [0, 1], [0, -40]);
  const rx = useTransform(fan, [0, 1], [0, 40]);
  const play = useDraw(p, 0.45, 0.7);
  const ring = useDraw(p, 0.5, 0.85);
  const sparks = useDraw(p, 0.75, 0.95);
  const o = { originX: "200px", originY: "320px" } as const;
  return (
    <svg viewBox="0 0 400 400" fill="none" className="h-full w-full" aria-hidden="true">
      <motion.rect x="105" y="70" width="190" height="260" rx="18" fill="white" fillOpacity="0.12" stroke="white" strokeOpacity="0.4" strokeWidth="2" style={{ rotate: left, x: lx, ...o }} />
      <motion.rect x="105" y="70" width="190" height="260" rx="18" fill="white" fillOpacity="0.12" stroke="white" strokeOpacity="0.4" strokeWidth="2" style={{ rotate: right, x: rx, ...o }} />
      <rect x="105" y="70" width="190" height="260" rx="18" fill="#141414" stroke="white" strokeOpacity="0.8" strokeWidth="2" />
      <motion.circle cx="200" cy="200" r="52" stroke="#ff4a4a" strokeWidth="5" style={{ pathLength: ring }} />
      <motion.path d="M186 176L226 200L186 224Z" fill="#ff4a4a" style={{ scale: play, originX: "205px", originY: "200px" }} />
      <motion.g stroke="white" strokeWidth="4" strokeLinecap="round" style={{ opacity: sparks }}>
        <path d="M330 80V108M316 94H344" />
        <path d="M70 250V270M60 260H80" />
        <path d="M345 300V316M337 308H353" />
      </motion.g>
    </svg>
  );
}

const graphics = [BrandGraphic, WebGraphic, PerformanceGraphic, SeoGraphic, ContentGraphic];

/* ---------- Scene wrapper ---------- */

function Chip({
  p,
  i,
  children,
}: P & { i: number; children: React.ReactNode }) {
  const o = useTransform(p, [0.3 + i * 0.08, 0.42 + i * 0.08], [0, 1]);
  const y = useTransform(o, [0, 1], [12, 0]);
  return (
    <motion.li
      style={{ opacity: o, y }}
      className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/85"
    >
      {children}
    </motion.li>
  );
}

function Scene({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const service = services[index];
  const Graphic = graphics[index];
  const s = index / total;
  const e = (index + 1) / total;
  const f = 0.035;
  const first = index === 0;
  const last = index === total - 1;

  const input = first ? [0, e - f, e] : last ? [s, s + f, 1] : [s, s + f, e - f, e];
  const opacity = useTransform(
    progress,
    input,
    first ? [1, 1, 0] : last ? [0, 1, 1] : [0, 1, 1, 0],
  );
  const lift = useTransform(
    progress,
    input,
    first ? [0, 0, -40] : last ? [40, 0, 0] : [40, 0, 0, -40],
  );
  const p = useTransform(progress, [s, e], [0, 1]);
  const textIn = useTransform(p, [0.05, 0.25], [0, 1]);

  return (
    <motion.div
      style={{ opacity, y: lift }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 pt-16 sm:px-10 lg:flex-row lg:gap-20 lg:px-16 lg:pt-0 xl:px-24"
    >
      <div className="h-[38vh] w-[38vh] max-w-full shrink-0 lg:h-[min(62vh,34rem)] lg:w-[min(62vh,34rem)]">
        <Graphic p={p} />
      </div>
      <div className="w-full max-w-xl">
        <p className="text-label flex items-center gap-3">
          <span className="text-red">{service.number}</span>
          <span>/ {String(total).padStart(2, "0")}</span>
        </p>
        <h3 className="text-h2 mt-3 text-white">{service.title}</h3>
        <motion.p
          style={{ opacity: textIn }}
          className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg"
        >
          {service.summary}
        </motion.p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {service.deliverables.map((d, i) => (
            <Chip key={d} p={p} i={i}>
              {d}
            </Chip>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ---------- Section ---------- */

/**
 * Scroll-scrubbed motion graphics: the section pins to the viewport and plays
 * one animated scene per service as the user scrolls. Falls back to a static
 * list for reduced-motion users.
 */
export default function ServicesMotion() {
  const reduced = useReducedMotionSafe();
  const ref = useRef<HTMLElement>(null);
  const total = services.length;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setActive(Math.min(total - 1, Math.floor(v * total))),
  );
  const bar = useTransform(scrollYProgress, (v) => `${Math.round(v * 100)}%`);

  if (reduced) {
    return (
      <section
        aria-label="What we do"
        className="theme-dark relative px-6 py-24 sm:px-10 lg:px-16 xl:px-24"
      >
        <p className="text-label mb-10">What we do</p>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug} className="rounded-3xl border border-white/15 p-8">
              <span className="text-label text-red">{s.number}</span>
              <h3 className="text-h2 mt-3 text-white">{s.title}</h3>
              <p className="mt-3 text-white/65">{s.summary}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section
      id="services-motion"
      ref={ref}
      aria-label="What we do, in motion"
      style={{ height: `${total * 100 + 100}vh` }}
      className="relative"
    >
      <div className="theme-dark sticky top-0 isolate h-svh overflow-hidden">
        <Stars />

        <p className="text-label absolute left-6 top-24 z-10 flex items-center gap-3 sm:left-10 lg:left-16 xl:left-24">
          <span className="text-red">●</span>
          <span>What we do</span>
        </p>

        {services.map((s, i) => (
          <Scene key={s.slug} index={i} total={total} progress={scrollYProgress} />
        ))}

        <ol
          className="absolute bottom-8 right-6 z-10 flex gap-2 sm:right-10 lg:right-16 xl:right-24"
          aria-hidden="true"
        >
          {services.map((s, i) => (
            <li
              key={s.slug}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-red" : "w-3 bg-white/25"
              }`}
            />
          ))}
        </ol>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-white/10"
          aria-hidden="true"
        >
          <motion.div className="h-full bg-red" style={{ width: bar }} />
        </div>
      </div>
    </section>
  );
}
