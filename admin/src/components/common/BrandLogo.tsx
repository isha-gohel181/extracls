import { APP_DISPLAY_NAME, LOGO_PATH } from "../../constants/brand";

type BrandLogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: "h-9 w-auto max-w-[140px]",
  md: "h-16 w-auto max-w-[220px]",
  lg: "h-24 w-auto max-w-[280px]",
};

/** EXTRACLS logo — rounded frame aligned with web navbar logo. */
export default function BrandLogo({
  size = "md",
  className = "",
}: BrandLogoProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center overflow-hidden rounded-xl border border-slate-300/50 bg-black shadow-sm transition-transform duration-300 hover:scale-[1.02] ${className}`}
    >
      <img
        className={`object-contain ${sizeClasses[size]}`}
        src={LOGO_PATH}
        alt={APP_DISPLAY_NAME}
      />
    </span>
  );
}
