import { cn } from "@/lib/utils";

type Tone = "burgundy" | "espresso" | "champagne";

const toneClasses: Record<Tone, string> = {
  burgundy: "bg-gradient-to-br from-burgundy-soft via-burgundy to-burgundy-deep",
  espresso: "bg-gradient-to-br from-espresso-soft via-espresso to-[#150d0a]",
  champagne: "bg-gradient-to-br from-champagne-soft via-champagne to-[#a9895c]",
};

interface PlaceholderPortraitProps {
  initial: string;
  tone?: Tone;
  className?: string;
}

/**
 * Stands in for a tutor/student photo: no photo assets exist for this
 * build, so rather than fabricate stock imagery of real people, portraits
 * are rendered as a brand-toned field with the person's initial in
 * Playfair Display. Swap for next/image once real photography exists —
 * ImageReveal's mask/scale treatment wraps either the same way.
 */
export function PlaceholderPortrait({ initial, tone = "burgundy", className }: PlaceholderPortraitProps) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        toneClasses[tone],
        className,
      )}
    >
      <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay [background-image:radial-gradient(circle_at_30%_20%,#fff,transparent_60%)]" />
      <span className="font-display text-[3.2rem] leading-none text-cream/90 select-none">
        {initial}
      </span>
    </div>
  );
}
