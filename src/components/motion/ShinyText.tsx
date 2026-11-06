import { CSSProperties, ReactNode } from "react";

/**
 * Text with a soft highlight that sweeps across it.
 * Colours default to the section theme (--shiny-base / --shiny-hi in globals.css).
 */
export default function ShinyText({
  text,
  children,
  color,
  shineColor,
  speed = 3,
  shineWidth = 40,
  softness = 0.8,
  trigger = "loop",
  grouped = false,
  className = "",
}: {
  text?: string;
  children?: ReactNode;
  color?: string;
  shineColor?: string;
  /** Seconds for one sweep. */
  speed?: number;
  /** Width of the highlight band, in % of the text. */
  shineWidth?: number;
  /** 0 = hard-edged band, 1 = fully feathered. */
  softness?: number;
  trigger?: "loop" | "hover";
  /** Sweep is driven by a parent `.shiny-group` so several lines move together. */
  grouped?: boolean;
  className?: string;
}) {
  const w = Math.max(2, shineWidth) / 2;
  const plateau = w * (1 - Math.min(1, Math.max(0, softness)));
  const style = {
    "--shiny-w": `${w}`,
    "--shiny-plateau": `${plateau}`,
    "--shiny-speed": `${speed}s`,
    ...(color ? { "--shiny-base": color } : null),
    ...(shineColor ? { "--shiny-hi": shineColor } : null),
  } as CSSProperties;

  return (
    <span
      className={`shiny-text ${trigger === "hover" ? "shiny-hover" : ""} ${grouped ? "shiny-grouped" : ""} ${className}`}
      style={style}
    >
      {children ?? text}
    </span>
  );
}
