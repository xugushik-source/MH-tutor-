import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
  tone?: "burgundy" | "cream";
  priority?: boolean;
}

/**
 * The provided MH monogram, cropped from the supplied brand lockup and
 * re-rendered as a transparent PNG in both tones (burgundy for light
 * surfaces, cream for dark ones) so it drops onto any section background.
 * `className` sets height (e.g. "h-8"); width follows the source aspect
 * ratio automatically.
 */
export function LogoMark({ className, tone = "burgundy", priority }: LogoMarkProps) {
  const src = tone === "cream" ? "/brand/mh-monogram-cream.png" : "/brand/mh-monogram-burgundy.png";

  return (
    <span className={cn("relative inline-block aspect-[840/605]", className)}>
      <Image src={src} alt="" fill priority={priority} className="object-contain" />
    </span>
  );
}
