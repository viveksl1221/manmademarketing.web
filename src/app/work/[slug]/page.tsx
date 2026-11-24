import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import CaseFigure from "@/components/work/CaseFigure";
import ShinyText from "@/components/motion/ShinyText";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.client} Case Study | Man Made Marketing`,
    description: project.study.standfirst,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const { study } = project;

  const meta = [
    { label: "Client", value: project.client },
    { label: "Sector", value: project.category },
    { label: "Scope", value: project.services.join(", ") },
    { label: "Timeline", value: study.year },
  ];

  return (
    <article>
      {/* Masthead */}
      <header className="theme-dark relative pb-14 pt-16 sm:pb-20 sm:pt-24">
        <Container>
          <Reveal y={10}>
            <nav
              aria-label="Breadcrumb"
              className="text-label flex items-center gap-3 text-muted"
            >
              <Link href="/work" className="link-underline tap-area hover:text-white">
                Work
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-red">Case Study</span>
            </nav>
          </Reveal>

          <h1 className="text-display mt-8 max-w-5xl text-white">
            <ShinyText>{project.client}</ShinyText>
          </h1>
          <Reveal delay={0.1}>
            <p className="text-h3 mt-8 max-w-3xl font-normal text-muted">
              {study.standfirst}
            </p>
          </Reveal>

          <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-border pt-8 lg:grid-cols-4">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="text-label text-red">{item.label}</dt>
                <dd className="mt-3 text-base font-medium text-white sm:text-lg">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </header>

      {/* The brief */}
      <section className="theme-dark border-t border-border py-16 sm:py-24" aria-labelledby="brief">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <figure>
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-mist">
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 92vw"
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="text-label mt-4 text-muted">
                  Fig. 01 — {project.client}, campaign creative
                </figcaption>
              </figure>
            </Reveal>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <p className="text-label text-red">01 — The Brief</p>
                <h2 id="brief" className="text-h2 mt-5 text-white">
                  What the brand needed.
                </h2>
              </Reveal>
              <div className="mt-8 space-y-6">
                {study.brief.map((paragraph, i) => (
                  <Reveal key={i} delay={0.05 * i}>
                    <p
                      className={
                        i === 0
                          ? "text-body-lg text-white"
                          : "text-body-lg text-muted"
                      }
                    >
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Pull quote */}
      <section className="theme-red py-20 sm:py-28" aria-label="Pull quote">
        <Container>
          <Reveal>
            <blockquote className="text-h1 max-w-5xl text-white">
              <span aria-hidden="true" className="mr-2 opacity-60">
                &ldquo;
              </span>
              {study.pullQuote}
              <span aria-hidden="true" className="ml-1 opacity-60">
                &rdquo;
              </span>
            </blockquote>
          </Reveal>
        </Container>
      </section>

      {/* Process */}
      <section className="theme-dark py-16 sm:py-24" aria-labelledby="process">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Reveal>
                  <p className="text-label text-red">02 — The Process</p>
                  <h2 id="process" className="text-h2 mt-5 text-white">
                    From first look to finished work.
                  </h2>
                </Reveal>
                <ol className="mt-10 hidden space-y-3 lg:block">
                  {study.stages.map((stage, i) => (
                    <li key={stage.title}>
                      <a
                        href={`#stage-${i + 1}`}
                        data-cursor="hover"
                        className="group flex items-baseline gap-4 text-muted transition-colors duration-200 hover:text-white"
                      >
                        <span className="text-label text-red">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-lg font-medium">{stage.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="lg:col-span-8">
              {study.stages.map((stage, i) => (
                <Reveal key={stage.title}>
                  <section
                    id={`stage-${i + 1}`}
                    className="grid scroll-mt-28 grid-cols-1 gap-6 border-t border-border py-10 first:border-t-0 first:pt-0 sm:grid-cols-[6rem_1fr] sm:gap-10 sm:py-14"
                  >
                    <span
                      aria-hidden="true"
                      className="text-h1 leading-none text-red"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-h3 text-white">{stage.title}</h3>
                      <p className="text-label mt-3 text-muted">
                        {stage.summary}
                      </p>
                      <div className="mt-6 space-y-5">
                        {stage.body.map((paragraph, j) => (
                          <p key={j} className="text-body-lg max-w-2xl text-white/85">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      {stage.figure && (
                        <div
                          className={`mt-8 ${
                            stage.figure.ratio === "portrait" ? "max-w-sm" : ""
                          }`}
                        >
                          <CaseFigure
                            image={stage.figure}
                            figNumber={String(i + 2).padStart(2, "0")}
                          />
                        </div>
                      )}
                    </div>
                  </section>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Gallery */}
      <section className="theme-dark border-t border-border py-16 sm:py-24" aria-label="Gallery">
        <Container>
          <Reveal>
            <p className="text-label text-red">Selected Frames</p>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8">
            {study.gallery.map((image, i) => (
              <Reveal
                key={image.caption}
                delay={0.08 * i}
                className={
                  i === 0
                    ? "md:col-span-5"
                    : i === 1
                      ? "md:col-span-3 md:mt-24"
                      : "md:col-span-4 md:mt-10"
                }
              >
                <CaseFigure
                  image={image}
                  figNumber={String(study.stages.length + 2 + i).padStart(2, "0")}
                  sizes="(min-width: 768px) 40vw, 92vw"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Deliverables + outcomes */}
      <section className="theme-light py-16 sm:py-24" aria-label="Deliverables and outcomes">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <p className="text-label text-red">03 — Delivered</p>
              <ul className="mt-6 border-t border-border">
                {study.deliverables.map((item) => (
                  <li
                    key={item}
                    className="border-b border-border py-4 text-lg font-medium text-white"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.1}>
              <p className="text-label text-red">04 — The Result</p>
              <h2 className="text-h2 mt-5 text-white">What it gave the brand.</h2>
              <ul className="mt-8 space-y-6">
                {study.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="text-body-lg flex gap-4 text-white"
                  >
                    <span aria-hidden="true" className="mt-[0.6em] h-px w-6 shrink-0 bg-red" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Next case study */}
      <section className="theme-dark border-t border-border py-16 sm:py-24" aria-label="Next case study">
        <Container>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <Link
              href={`/work/${next.slug}`}
              data-cursor="hover"
              className="group block"
            >
              <p className="text-label text-red">Next Case Study</p>
              <p className="text-display mt-5 text-white transition-transform duration-300 ease-out group-hover:translate-x-2">
                {next.client}
                <span aria-hidden="true" className="ml-3 text-red">
                  →
                </span>
              </p>
              <p className="mt-3 text-muted">{next.category}</p>
            </Link>
            <Button href="/contact" variant="primary" className="shrink-0" magnetic>
              Start a Project
            </Button>
          </div>
        </Container>
      </section>
    </article>
  );
}
