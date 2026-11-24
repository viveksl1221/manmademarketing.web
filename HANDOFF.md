# Man Made Marketing: Developer Handoff

This is the working front-end of the Man Made Marketing site (Next.js + React + Tailwind).
It is a **design and content reference** for rebuilding in Wix. Wix cannot import this code.

## Pages

| Route | File | Notes |
|---|---|---|
| Home | `src/app/page.tsx` | Stack of sections, listed below |
| Work | `src/app/work/page.tsx` | Grid / list toggle of projects |
| Case study (x3) | `src/app/work/[slug]/page.tsx` | One editorial template, content from `src/data/projects.ts` |
| Services | `src/app/services/page.tsx` | |
| About | `src/app/about/page.tsx` | |
| Insights | `src/app/insights/page.tsx` | |
| Contact | `src/app/contact/page.tsx` | Form UI only, not wired to email |

Header and footer: `src/components/layout/`. Nav links: `src/data/nav.ts`.

### Home page section order (`src/components/home/`)
1. Hero (with partner badges)
2. Featured slider (case study cards)
3. Services motion (scroll-driven graphic)
4. Regions marquee ("Five markets": UAE, Saudi Arabia, Oman, Qatar, United States)
5. Services (stacking cards)
6. Process
7. Testimonials
8. Philosophy
9. Project quiz ("Plan Your Project" questionnaire, front-end only)
10. FAQ

## Where the copy lives (edit text here, not in components)

All in `src/data/`:
- `brand.ts` mission, values, contact details, regions
- `services.ts`, `process.ts`, `faqs.ts`, `testimonials.ts`, `partners.ts`
- `featured.ts` home slider cards
- `projects.ts` work cards **and full case study copy** (brief, 5 process chapters, deliverables, outcomes, gallery captions)

Case study images are placeholders. A figure with no `src` shows a dashed placeholder; add `src: "/work/file.jpg"` to replace it.

## Design tokens (`src/app/globals.css`)

| Token | Value |
|---|---|
| Red (accent) | `#ff4a4a` (hover `#e23c3c`) |
| Ink (dark bg) | `#141414`, sections use `#000000` |
| Mist | `#1c1c1c` dark / `#f4f1ee` light |
| Muted text | `#9a9a9a` dark / `#6b6b6b` light |
| Border | white 12% (dark) / `#141414` 12% (light) |

Section themes: dark, light (white bg), red (`#ff4a4a` bg, white text). Sections alternate between these.

**Fonts** (Google Fonts): Plus Jakarta Sans for headings, Inter for body. The brand font is General Sans; Jakarta is the stand-in.

**Type scale (desktop):** Display 88, H1 64, H2 48, H3 32, Body 22, Label 12 uppercase with wide tracking.

Logos: `public/logo/` (mark, wordmark on dark and light). Source logos in `logos/`.

## Custom animations (need Wix equivalents or simplifying)

| Effect | File |
|---|---|
| Preloader | `components/motion/Preloader.tsx` |
| Shiny/shimmer headline text | `ShinyText.tsx` + `.shiny-text` in `globals.css` |
| Fade/slide-up on scroll | `Reveal.tsx` |
| Horizontal scroll-driven marquees | `ScrollSlide.tsx` |
| Stacking cards on scroll | `StackCard.tsx` |
| Magnetic buttons | `MagneticButton.tsx` |
| Animated stars / galaxy / horizon bloom backgrounds | `Stars.tsx`, `Galaxy.tsx`, `HorizonBloom.tsx` |
| Services scroll graphic (logo draws, then fills) | `home/ServicesMotion.tsx` |
| Custom cursor hover (`data-cursor="hover"`) | layout |

In Wix Studio, scroll and entrance effects can be approximated with built-in interactions. The shimmer, galaxy and services graphic would need Velo/custom code, or a simpler static version.

## Not built / placeholders
- Contact form and project quiz do not submit anywhere. Connect to Wix Forms.
- Insights page has no articles.
- Featured cards for iSON Health, Arabia Health and clinics have no artwork or case study.
- Case study copy is draft and should be checked for accuracy. It contains no metrics by design.
- The "Brands that trust us" client list was removed from the home page.

## Running the code locally (optional, to see the animations)
```
npm install
npm run dev     # http://localhost:3000
```
Requires Node 20+. Open the live site beside this for reference.
