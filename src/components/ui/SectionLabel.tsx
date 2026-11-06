import Reveal from "@/components/motion/Reveal";

export default function SectionLabel({ children, number }: { children: string; number?: string }) {
  return (
    <Reveal y={10}>
      <div className="text-label flex items-center gap-3 text-muted">
        {number && <span className="text-red">{number}</span>}
        <span>{children}</span>
      </div>
    </Reveal>
  );
}
