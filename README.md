# Man Made Marketing — Website Prototype

A production-quality prototype of the Man Made Marketing agency website, built with Next.js (App Router), TypeScript, and Tailwind CSS, following the agency's brand identity guideline.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Stack

- **Next.js 16** (App Router, TypeScript, Server Components by default)
- **Tailwind CSS 4** with brand tokens defined in `src/app/globals.css`
- **Plus Jakarta Sans** for headings and **Inter** for body copy (General Sans, the brand's specified heading font, isn't available on Google Fonts, so a close geometric sans fallback is used)

## Structure

```text
src/
  app/                  Routes: /, /services, /work, /about, /insights, /contact
  components/
    layout/             Header, Footer, MobileMenu
    home/                Hero, SelectedWork, Services, Process, Manifesto, ContactCTA
    ui/                  Button, Container, SectionLabel, SectionHeading, ProjectCard, ServiceRow
    contact/             ContactForm (client-side validated prototype form)
  data/                  projects.ts, services.ts, process.ts, nav.ts, brand.ts
public/
  logo/                  Wordmark + icon mark
  work/                  Real client project imagery
```

## Notes

- The contact form is a working client-side prototype (validation, loading, and success states) — there is no backend configured, and the success state says so explicitly rather than implying an email was sent.
- Selected Work uses real client creative (Fika Time, Sikkini, My-Health) with services described honestly as delivered (content & creative), not implied website or performance case studies.
- Contact details and social links in the footer are verified from the live manmademarketing.com site.
