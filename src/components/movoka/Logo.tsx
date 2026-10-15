import logoLight from "@/assets/movoka-logo-transparent.png";
import logoDark from "@/assets/movoka-logo-dark.png";
import { cn } from "@/lib/utils";

/** Locally bundled, background-free original MOVOKA mark. */
export function Logo({ className, variant = "adaptive" }: { className?: string; variant?: "adaptive" | "black" | "white" }) {
  return <span className={cn("inline-flex items-center justify-center", className)}>
    {variant !== "black" && <img src={logoLight} alt="MOVOKA — Digital Design Studio" className={cn("block h-full w-full object-contain", variant === "adaptive" && "dark:block hidden")} />}
    {variant !== "white" && <img src={logoDark} alt={variant === "black" ? "MOVOKA — Digital Design Studio" : ""} aria-hidden={variant === "adaptive"} className={cn("block h-full w-full object-contain", variant === "adaptive" && "dark:hidden block")} />}
  </span>;
}
