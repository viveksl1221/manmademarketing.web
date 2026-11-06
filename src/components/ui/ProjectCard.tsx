import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";

export default function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/work#${project.slug}`}
      data-cursor="hover"
      className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-mist">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(min-width: 1024px) 40vw, 90vw"
          priority={priority}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4 border-t border-border pt-4">
        <div>
          <h3 className="text-h3 text-white">{project.client}</h3>
          <p className="text-label mt-1 text-muted">{project.category}</p>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="mt-1 shrink-0 text-white transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
        >
          <path
            d="M4 12L12 4M12 4H5.5M12 4V10.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="mt-2 text-sm text-muted">{project.services.join(" · ")}</p>
    </Link>
  );
}
