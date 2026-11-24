import Image from "next/image";
import type { CaseImage } from "@/data/projects";

const ratios = {
  landscape: { cls: "aspect-[16/10]", label: "16:10" },
  portrait: { cls: "aspect-[4/5]", label: "4:5" },
  square: { cls: "aspect-square", label: "1:1" },
} as const;

/** Editorial figure. Renders the real image when `src` is set, otherwise a
 *  clearly marked placeholder so the layout can be reviewed before artwork lands. */
export default function CaseFigure({
  image,
  figNumber,
  sizes = "(min-width: 1024px) 50vw, 92vw",
}: {
  image: CaseImage;
  figNumber: string;
  sizes?: string;
}) {
  const ratio = ratios[image.ratio];
  return (
    <figure>
      <div className={`relative w-full overflow-hidden bg-mist ${ratio.cls}`}>
        {image.src ? (
          <Image
            src={image.src}
            alt={image.alt ?? image.caption}
            fill
            sizes={sizes}
            className="object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={`Image placeholder: ${image.caption}`}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 border border-dashed border-border-dark p-6 text-center"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent 0 14px, var(--color-border) 14px 15px)",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-muted">
              <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="9" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.5" />
              <path d="M4 18l5-5 4 4 3-3 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <span className="text-label text-muted">
              Image placeholder · {ratio.label}
            </span>
          </div>
        )}
      </div>
      <figcaption className="text-label mt-4 text-muted">
        Fig. {figNumber} — {image.caption}
      </figcaption>
    </figure>
  );
}
