import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/motion/Preloader";
import "./globals.css";

// General Sans isn't on Google Fonts; Plus Jakarta Sans is the closest
// geometric sans available there and keeps builds dependency-free.
// Both are variable fonts, so no `weight` is specified — the full weight
// range loads in one file and the site's own font-weight CSS picks from it.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.manmademarketing.com"),
  title: "Man Made Marketing | Marketing Built with Intent",
  description:
    "Man Made Marketing is a strategy-driven marketing agency partnering with ambitious brands on branding, website design, performance marketing, SEO, and content.",
  openGraph: {
    title: "Man Made Marketing | Marketing Built with Intent",
    description:
      "Strategy, creativity and performance working together to help ambitious brands build momentum and grow.",
    siteName: "Man Made Marketing",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <noscript>
          <style>{".preloader-root { display: none !important; }"}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <Preloader />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
