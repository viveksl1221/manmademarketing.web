import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import WorkViewToggle from "@/components/work/WorkViewToggle";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work | Man Made Marketing",
  description: "Content and campaign work for Man Made Marketing clients across food, wellness, and professional services.",
};

export default function WorkPage() {
  return (
    <>
      <section className="theme-red py-20 sm:py-24 lg:py-28">
        <Container>
          <SectionHeading
            label="Selected Work"
            title={"Work we've built with\nambitious brands."}
            description="Real client work, shown honestly — the services listed reflect exactly what was delivered for each brand."
          />
        </Container>
      </section>

      <section className="theme-dark py-16 sm:py-20">
        <Container>
          <WorkViewToggle projects={projects} />
        </Container>
      </section>

      <section className="theme-light py-20 sm:py-24">
        <Container className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          <Reveal>
            <h2 className="text-h2 max-w-xl text-white">Want to see the brand&rsquo;s name here next?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/contact" variant="primary" className="shrink-0" magnetic>
              Start a Project
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
