import logo from "@/assets/movoka-logo.png.asset.json";
import { cn } from "@/lib/utils";

/** Original MOVOKA logo (unaltered artwork, cropped to its content), shown on its native dark plate. */
export function Logo({ className, plate = true }: { className?: string; plate?: boolean }) {
  return (
    <span
      className={cn(
        "inline-block overflow-hidden align-top",
        plate && "movoka-logo-surface",
        className,
      )}
    >
      <img src={logo.url} alt="MOVOKA — Digital Design Studio" className="block h-full w-full object-contain" width={1080} height={290} />
    </span>
  );
}
