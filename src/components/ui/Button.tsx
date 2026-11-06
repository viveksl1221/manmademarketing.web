import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import MagneticButton from "@/components/motion/MagneticButton";

type Variant = "primary" | "secondary";

const base =
  "group inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold tracking-tight transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-red text-[#ffffff] hover:bg-red-dark",
  secondary: "border border-white/30 text-white hover:border-white hover:bg-white hover:text-ink",
};

function Arrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1"
    >
      <path
        d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface SharedProps {
  children: ReactNode;
  variant?: Variant;
  withArrow?: boolean;
  magnetic?: boolean;
  className?: string;
}

interface LinkButtonProps extends SharedProps {
  href: string;
}

interface NativeButtonProps
  extends SharedProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  href?: undefined;
}

export default function Button(props: LinkButtonProps | NativeButtonProps) {
  const { children, variant = "primary", withArrow = true, magnetic = false, className = "" } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  const content =
    "href" in props && props.href ? (
      <Link href={props.href} className={classes} data-cursor="hover">
        {children}
        {withArrow && <Arrow />}
      </Link>
    ) : (
      (() => {
        const { href: _href, variant: _v, withArrow: _wa, magnetic: _m, className: _c, ...rest } =
          props as NativeButtonProps;
        void _href;
        void _v;
        void _wa;
        void _m;
        void _c;
        return (
          <button className={classes} data-cursor="hover" {...rest}>
            {children}
            {withArrow && <Arrow />}
          </button>
        );
      })()
    );

  return magnetic ? <MagneticButton>{content}</MagneticButton> : content;
}
