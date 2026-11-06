"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "@/data/nav";
import { contact } from "@/data/brand";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function NavOverlay({
  open,
  onClose,
  links,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
  pathname: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  const all: NavLink[] = [{ label: "Home", href: "/" }, ...links, { label: "Contact", href: "/contact" }];
  const socials = [
    { label: "Instagram", href: contact.instagram.href },
    { label: "TikTok", href: contact.tiktok.href },
    { label: "Email", href: `mailto:${contact.email}` },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="nav-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="theme-light fixed inset-0 z-[60] overflow-y-auto bg-[#eeeeee]"
          style={{ background: "#eeeeee" }}
        >
          <div className="mx-auto flex min-h-full w-full max-w-[1440px] flex-col px-6 pb-10 pt-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="flex items-start justify-between">
              <Link href="/" onClick={onClose} className="relative mt-3 block h-9 w-[160px]" aria-label="Man Made Marketing home">
                <Image
                  src="/logo/wordmark-on-light.svg"
                  alt="Man Made Marketing"
                  fill
                  className="object-contain object-left"
                  sizes="160px"
                />
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="group flex h-16 w-16 items-center justify-center rounded-full border border-[#141414]/60 text-[#141414] transition-colors duration-300 hover:border-red hover:bg-red hover:text-[#ffffff] sm:h-24 sm:w-24"
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="h-8 w-8 transition-transform duration-500 group-hover:rotate-90 sm:h-10 sm:w-10">
                  <path d="M6 6L34 34M34 6L6 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="relative mt-8 flex flex-1 flex-col gap-10 lg:mt-0 lg:flex-row lg:items-center">
              <ul className="flex flex-col gap-2 sm:gap-3 lg:ml-[22%]">
                {all.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <li key={link.href} className="overflow-hidden">
                      <motion.div
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "110%" }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.06 }}
                      >
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className={`block text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.1] tracking-tighter transition-colors duration-300 hover:text-red ${
                            active ? "text-red" : "text-[#141414]"
                          }`}
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    </li>
                  );
                })}
              </ul>

              <Link
                href="/contact"
                onClick={onClose}
                aria-label="Get in touch"
                className="hidden select-none text-[clamp(3rem,6vw,5rem)] font-bold leading-none tracking-tighter text-[#141414]/15 transition-colors duration-300 hover:text-red lg:absolute lg:right-0 lg:top-1/2 lg:block lg:-translate-y-1/2 lg:[writing-mode:vertical-rl] lg:rotate-180"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Get in touch
              </Link>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[#141414]/60 lg:absolute lg:bottom-10 lg:left-16 lg:flex-col lg:gap-y-4 xl:left-24">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="link-underline text-sm font-medium tracking-wide transition-colors hover:text-[#141414]"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
