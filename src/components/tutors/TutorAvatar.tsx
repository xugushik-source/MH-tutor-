import Image from "next/image";
import type { Tutor } from "@/data/tutors";
import { PlaceholderPortrait } from "@/components/ui/PlaceholderPortrait";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { cn } from "@/lib/utils";

interface TutorAvatarProps {
  tutor: Tutor;
  className?: string;
  sizes?: string;
  textClassName?: string;
}

/** Small, non-animated avatar for compact contexts (sticky booking card, mini lists). */
export function TutorAvatar({ tutor, className, sizes, textClassName }: TutorAvatarProps) {
  if (tutor.photo) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={tutor.photo}
          alt={tutor.name}
          fill
          sizes={sizes ?? "80px"}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <PlaceholderPortrait
      initial={tutor.avatarInitial}
      tone={tutor.avatarTone}
      className={className}
      textClassName={textClassName}
    />
  );
}

interface TutorPortraitRevealProps {
  tutor: Tutor;
  className?: string;
  delay?: number;
  sizes?: string;
  priority?: boolean;
}

/** Full reveal-animated portrait for cards and profile headers. */
export function TutorPortraitReveal({
  tutor,
  className,
  delay,
  sizes,
  priority,
}: TutorPortraitRevealProps) {
  return (
    <ImageReveal className={className} delay={delay}>
      {tutor.photo ? (
        <Image
          src={tutor.photo}
          alt={tutor.name}
          fill
          priority={priority}
          sizes={sizes ?? "(max-width: 768px) 50vw, 25vw"}
          className="object-cover"
        />
      ) : (
        <PlaceholderPortrait initial={tutor.avatarInitial} tone={tutor.avatarTone} className="h-full w-full" />
      )}
    </ImageReveal>
  );
}
