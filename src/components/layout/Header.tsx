"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navLinks } from "@/data/nav";
import Container from "@/components/ui/Container";
import NavOverlay from "@/components/layout/NavOverlay";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`z-40 text-white ${pathname === "/" ? "absolute inset-x-0 top-0" : "relative bg-black"}`}
      >
        <Container className="flex h-24 items-center justify-between">
          <Link
            href="/"
            className="relative h-9 w-[150px] shrink-0 sm:h-10 sm:w-[170px]"
            aria-label="Man Made Marketing home"
          >
            <Image
              src="/logo/wordmark-on-dark.svg"
              alt="Man Made Marketing"
              fill
              priority
              className="object-contain object-left"
              sizes="170px"
            />
          </Link>

          <div className="h-12 w-14" aria-hidden="true" />
        </Container>
      </motion.header>

      <div className="pointer-events-none fixed inset-x-0 top-5 z-50">
        <Container className="flex justify-end">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-label="Open menu"
            className="group pointer-events-auto flex h-14 w-14 flex-col items-center justify-center gap-2 rounded-full bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_6px_20px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:scale-105"
          >
            <span className="block h-[1.5px] w-6 bg-[#141414] transition-all duration-300 group-hover:w-4" />
            <span className="block h-[1.5px] w-6 bg-[#141414] transition-all duration-300" />
          </button>
        </Container>
      </div>

      <NavOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
        pathname={pathname}
      />
    </>
  );
}
