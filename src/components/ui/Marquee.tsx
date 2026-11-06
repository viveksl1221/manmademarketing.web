const variants = {
  label: { wrap: "text-label gap-10 px-10", text: "text-muted", dot: "h-1.5 w-1.5" },
  display: { wrap: "text-h1 gap-14 px-14", text: "text-white/90", dot: "h-3 w-3 sm:h-4 sm:w-4" },
};

export default function Marquee({
  items,
  variant = "label",
  className = "",
}: {
  items: string[];
  variant?: keyof typeof variants;
  className?: string;
}) {
  const loop = [...items, ...items];
  const { wrap, text, dot } = variants[variant];
  const itemClasses = `flex shrink-0 items-center ${wrap}`;

  return (
    <div aria-hidden="true" className={`flex overflow-hidden ${className}`}>
      {[0, 1].map((copy) => (
        <div key={copy} className={`animate-marquee ${itemClasses}`}>
          {loop.map((item, i) => (
            <span key={`${copy}-${i}`} className={`flex shrink-0 items-center gap-4 ${text}`}>
              {item}
              <span className={`shrink-0 rounded-full bg-red ${dot}`} />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
