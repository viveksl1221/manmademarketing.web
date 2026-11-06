import SplitLines from "@/components/motion/SplitLines";
import Reveal from "@/components/motion/Reveal";

export default function SectionHeading({
  label,
  number,
  title,
  description,
  align = "left",
}: {
  label: string;
  number?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const lines = title.split("\n");

  return (
    <div className={`flex flex-col gap-5 ${align === "center" ? "items-center text-center" : "items-start"}`}>
      <Reveal>
        <div className="text-label flex items-center gap-3 text-muted">
          {number && <span className="text-red">{number}</span>}
          <span>{label}</span>
        </div>
      </Reveal>
      <h2 className="text-h2 max-w-2xl text-white">
        <SplitLines lines={lines} />
      </h2>
      {description && (
        <Reveal delay={0.15}>
          <p className="text-body-lg max-w-xl text-muted">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
