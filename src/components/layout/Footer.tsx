import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/data/nav";
import { brand, contact } from "@/data/brand";
import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";

const YEAR = 2026;

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <Container>
        <Reveal className="grid grid-cols-1 gap-12 py-16 sm:py-20 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              href="/"
              className="relative block h-9 w-[160px]"
              aria-label="Man Made Marketing home"
              data-cursor="hover"
            >
              <Image
                src="/logo/wordmark-on-dark.svg"
                alt="Man Made Marketing"
                fill
                className="object-contain object-left"
                sizes="160px"
              />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">{brand.about}</p>
          </div>

          <div className="md:col-span-3">
            <p className="text-label text-white/40">Navigate</p>
            <ul className="mt-5 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-cursor="hover"
                    className="link-underline text-sm font-medium text-white/80 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  data-cursor="hover"
                  className="link-underline text-sm font-medium text-white/80 hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-label text-white/40">Get in touch</p>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  data-cursor="hover"
                  className="link-underline font-medium text-white/80 hover:text-white"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.phoneHref}
                  data-cursor="hover"
                  className="link-underline font-medium text-white/80 hover:text-white"
                >
                  {contact.phone}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-5">
              <a
                href={contact.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="link-underline text-sm font-medium text-white/60 hover:text-white"
              >
                Instagram
              </a>
              <a
                href={contact.tiktok.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="link-underline text-sm font-medium text-white/60 hover:text-white"
              >
                TikTok
              </a>
            </div>
          </div>
        </Reveal>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/40 sm:flex-row">
          <p>© {YEAR} Man Made Marketing. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-red" aria-hidden="true" />
            Marketing Built with Intent.
          </p>
        </Container>
      </div>
    </footer>
  );
}
