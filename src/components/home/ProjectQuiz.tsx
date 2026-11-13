"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Stars from "@/components/motion/Stars";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import useReducedMotionSafe from "@/components/motion/useReducedMotionSafe";
import { services } from "@/data/services";

const NOT_SURE = "Not sure yet";

type Step =
  | { id: "services"; question: string; hint: string; multi: true; options: string[] }
  | { id: "stage" | "budget" | "timeline"; question: string; hint: string; multi?: false; options: string[] };

const steps: Step[] = [
  {
    id: "services",
    question: "What do you need help with?",
    hint: "Pick as many as you like.",
    multi: true,
    options: [...services.map((s) => s.title), NOT_SURE],
  },
  {
    id: "stage",
    question: "Where is your business today?",
    hint: "This helps us suggest the right starting point.",
    options: ["Just launching", "Growing steadily", "Established, ready to scale"],
  },
  {
    id: "budget",
    question: "What budget range are you considering?",
    hint: "A rough range is plenty. Nothing is binding.",
    options: ["Under AED 10k", "AED 10k – 25k", "AED 25k – 60k", "AED 60k+", "Let's discuss"],
  },
  {
    id: "timeline",
    question: "When would you like to start?",
    hint: "So we can plan capacity.",
    options: ["As soon as possible", "Within 1–2 months", "In 3+ months", "Just exploring"],
  },
];

// One extra step after the questions: contact details.
const TOTAL = steps.length + 1;

type Answers = {
  services: string[];
  stage: string;
  budget: string;
  timeline: string;
};

const emptyAnswers: Answers = { services: [], stage: "", budget: "", timeline: "" };

/** Maps the answers to up to three recommended services. */
function recommend(a: Answers) {
  const picked = services.filter((s) => a.services.includes(s.title));
  if (picked.length > 0) return picked.slice(0, 3);

  const bySlug = (...slugs: string[]) =>
    slugs
      .map((slug) => services.find((s) => s.slug === slug))
      .filter((s): s is (typeof services)[number] => Boolean(s));

  if (a.stage === "Just launching")
    return bySlug("strategy-branding", "website-design-development");
  if (a.stage === "Established, ready to scale")
    return bySlug("performance-marketing", "content-creative", "seo-organic-growth");
  return bySlug("performance-marketing", "seo-organic-growth");
}

const fieldClasses =
  "w-full rounded-xl border bg-white/5 px-4 py-3.5 text-base text-white placeholder:text-white/35 transition-colors focus:outline-none focus:ring-2 focus:ring-red/40 sm:text-sm";

export default function ProjectQuiz() {
  const reduceMotion = useReducedMotionSafe();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [done, setDone] = useState(false);
  const advanceTimer = useRef<number | undefined>(undefined);

  const step = steps[index] as Step | undefined;
  const progress = done ? 100 : (index / TOTAL) * 100;

  const go = (next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };

  const answered = (s: Step) =>
    s.id === "services" ? answers.services.length > 0 : answers[s.id] !== "";

  const choose = (s: Step, option: string) => {
    if (s.id === "services") {
      setAnswers((prev) => {
        const has = prev.services.includes(option);
        // "Not sure yet" is exclusive; any real choice clears it.
        let next: string[];
        if (option === NOT_SURE) next = has ? [] : [NOT_SURE];
        else {
          const base = prev.services.filter((v) => v !== NOT_SURE);
          next = has ? base.filter((v) => v !== option) : [...base, option];
        }
        return { ...prev, services: next };
      });
      return;
    }
    const firstTime = answers[s.id] === "";
    setAnswers((prev) => ({ ...prev, [s.id]: option }));
    // Single-choice questions move on by themselves the first time.
    if (firstTime) {
      window.clearTimeout(advanceTimer.current);
      advanceTimer.current = window.setTimeout(() => go(index + 1), 280);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!contact.name.trim()) next.name = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(contact.email.trim()))
      next.email = "Please enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setDir(1);
    setDone(true);
  };

  const restart = () => {
    setAnswers(emptyAnswers);
    setContact({ name: "", email: "", phone: "" });
    setErrors({});
    setDone(false);
    setDir(-1);
    setIndex(0);
  };

  const slide = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, x: 40 * dir },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -40 * dir },
      };

  const recs = done ? recommend(answers) : [];
  const key = done ? "done" : String(index);

  return (
    <section
      id="start"
      aria-label="Plan your project"
      className="theme-dark relative isolate overflow-hidden py-20 sm:py-28 lg:py-32"
    >
      <Stars />
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              label="Plan Your Project"
              title={"Tell us what you need.\nWe'll point the way."}
              description="Four quick questions and we'll suggest where to start. It takes about a minute."
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-sm">
            {/* progress */}
            <div className="h-1 bg-white/10" aria-hidden="true">
              <motion.div
                className="h-full bg-red"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <div className="p-6 sm:p-10">
              <div className="relative min-h-[26rem] sm:min-h-[24rem]">
                <AnimatePresence mode="wait" initial={false} custom={dir}>
                  <motion.div
                    key={key}
                    {...slide}
                    transition={{ duration: reduceMotion ? 0.01 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* ---- Question steps ---- */}
                    {!done && step && (
                      <fieldset>
                        <legend className="text-label flex items-center gap-3 text-muted">
                          <span className="text-red">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>/ {String(TOTAL).padStart(2, "0")}</span>
                        </legend>
                        <h3 className="text-h2 mt-4 text-white">{step.question}</h3>
                        <p className="mt-2 text-sm text-muted">{step.hint}</p>

                        <div
                          className={`mt-7 grid gap-3 ${
                            step.id === "services" ? "sm:grid-cols-2" : "grid-cols-1"
                          }`}
                        >
                          {step.options.map((option) => {
                            const selected =
                              step.id === "services"
                                ? answers.services.includes(option)
                                : answers[step.id] === option;
                            return (
                              <button
                                key={option}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => choose(step, option)}
                                className={`flex min-h-14 items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left text-base font-medium transition-colors duration-200 ${
                                  selected
                                    ? "border-red bg-red-10 text-white"
                                    : "border-white/15 text-white/85 hover:border-white/40 hover:bg-white/5"
                                }`}
                              >
                                {option}
                                <span
                                  aria-hidden="true"
                                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                                    selected ? "border-red bg-red" : "border-white/25"
                                  }`}
                                >
                                  {selected && (
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                      <path d="M2.5 6.5L5 9L9.5 3.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  )}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </fieldset>
                    )}

                    {/* ---- Contact step ---- */}
                    {!done && !step && (
                      <form onSubmit={submit} noValidate>
                        <p className="text-label flex items-center gap-3 text-muted">
                          <span className="text-red">{String(TOTAL).padStart(2, "0")}</span>
                          <span>/ {String(TOTAL).padStart(2, "0")}</span>
                        </p>
                        <h3 className="text-h2 mt-4 text-white">Where should we send your plan?</h3>
                        <p className="mt-2 text-sm text-muted">Last step, we promise.</p>

                        <div className="mt-7 flex flex-col gap-5">
                          <div>
                            <label htmlFor="quiz-name" className="text-sm font-semibold text-white">
                              Name
                            </label>
                            <input
                              id="quiz-name"
                              type="text"
                              autoComplete="name"
                              value={contact.name}
                              onChange={(e) => setContact({ ...contact, name: e.target.value })}
                              aria-invalid={Boolean(errors.name)}
                              className={`${fieldClasses} mt-2 ${errors.name ? "border-red" : "border-white/15"}`}
                              placeholder="Your name"
                            />
                            {errors.name && (
                              <p className="mt-1.5 text-xs font-medium text-red">{errors.name}</p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="quiz-email" className="text-sm font-semibold text-white">
                              Email
                            </label>
                            <input
                              id="quiz-email"
                              type="email"
                              autoComplete="email"
                              value={contact.email}
                              onChange={(e) => setContact({ ...contact, email: e.target.value })}
                              aria-invalid={Boolean(errors.email)}
                              className={`${fieldClasses} mt-2 ${errors.email ? "border-red" : "border-white/15"}`}
                              placeholder="you@company.com"
                            />
                            {errors.email && (
                              <p className="mt-1.5 text-xs font-medium text-red">{errors.email}</p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="quiz-phone" className="text-sm font-semibold text-white">
                              Phone <span className="font-normal text-muted">(optional)</span>
                            </label>
                            <input
                              id="quiz-phone"
                              type="tel"
                              autoComplete="tel"
                              value={contact.phone}
                              onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                              className={`${fieldClasses} mt-2 border-white/15`}
                              placeholder="+971 …"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-red px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-dark"
                        >
                          See my recommendation
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </form>
                    )}

                    {/* ---- Result ---- */}
                    {done && (
                      <div role="status">
                        <p className="text-label text-red">Your starting point</p>
                        <h3 className="text-h2 mt-4 text-white">
                          Thanks, {contact.name.trim().split(" ")[0]}. Here&rsquo;s what we&rsquo;d suggest.
                        </h3>

                        <ul className="mt-7 flex flex-col gap-3">
                          {recs.map((s) => (
                            <li key={s.slug}>
                              <Link
                                href={`/services#${s.slug}`}
                                className="group flex items-center gap-5 rounded-2xl border border-white/15 p-5 transition-colors hover:border-red hover:bg-red-10"
                              >
                                <span className="text-label text-red">{s.number}</span>
                                <span className="flex-1">
                                  <span className="block text-lg font-semibold text-white">{s.title}</span>
                                  <span className="mt-1 block text-sm text-muted">{s.summary}</span>
                                </span>
                                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 text-white transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1">
                                  <path d="M4 12L12 4M12 4H5.5M12 4V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </Link>
                            </li>
                          ))}
                        </ul>

                        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
                          {[
                            ["Stage", answers.stage],
                            ["Budget", answers.budget],
                            ["Timeline", answers.timeline],
                          ].map(([k, v]) => (
                            <div key={k}>
                              <dt className="text-label text-muted">{k}</dt>
                              <dd className="mt-1.5 font-medium text-white">{v}</dd>
                            </div>
                          ))}
                        </dl>

                        <div className="mt-8 flex flex-wrap items-center gap-5">
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-2.5 rounded-full bg-red px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-dark"
                          >
                            Talk to our team
                          </Link>
                          <button
                            type="button"
                            onClick={restart}
                            className="text-sm font-semibold text-white/70 underline underline-offset-4 hover:text-white"
                          >
                            Start over
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* nav */}
              {!done && (
                <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
                  <button
                    type="button"
                    onClick={() => go(index - 1)}
                    disabled={index === 0}
                    className="text-sm font-semibold text-white/70 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-30"
                  >
                    ← Back
                  </button>
                  {step && (
                    <button
                      type="button"
                      onClick={() => go(index + 1)}
                      disabled={!answered(step)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black disabled:pointer-events-none disabled:opacity-30"
                    >
                      Continue
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
