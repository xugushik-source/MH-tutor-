import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
  tone?: "burgundy" | "cream" | "espresso";
}

/**
 * Typographic MH mark. No external logo asset was supplied for this build,
 * so the identity is built directly from the brand initials in Playfair
 * Display rather than an invented emblem — swap this for the real asset
 * when it is provided.
 */
export function LogoMark({ className, tone = "burgundy" }: LogoMarkProps) {
  const toneClass =
    tone === "burgundy"
      ? "text-burgundy"
      : tone === "cream"
        ? "text-cream"
        : "text-espresso";

  return (
    <span
      className={cn(
        "font-display font-semibold leading-none tracking-tight select-none",
        toneClass,
        className,
      )}
      aria-hidden={false}
    >
      MH
    </span>
  );
}

interface LogoFullProps {
  className?: string;
  tone?: "burgundy" | "cream" | "espresso";
  align?: "left" | "center";
}

export function LogoFull({ className, tone = "espresso", align = "left" }: LogoFullProps) {
  const toneClass =
    tone === "burgundy"
      ? "text-burgundy"
      : tone === "cream"
        ? "text-cream"
        : "text-espresso";

  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <LogoMark tone={tone} className="text-2xl" />
      <span className={cn("eyebrow", toneClass, "opacity-80")}>
        Marianna Hayrapetyan
      </span>
      <span className={cn("eyebrow", toneClass, "opacity-50")}>
        Tutoring Center
      </span>
    </div>
  );
}
