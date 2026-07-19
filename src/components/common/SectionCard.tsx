import type { ReactNode } from "react";

type SectionCardSize = "default" | "compact";
type SectionCardSpacing = "default" | "sm" | "none";

type SectionCardProps = {
  children: ReactNode;
  className?: string;
  size?: SectionCardSize;
  spacing?: SectionCardSpacing;
};

const sizeClassNames: Record<SectionCardSize, string> = {
  default: "p-5 md:p-7",
  compact: "p-4 md:p-5",
};

const spacingClassNames: Record<SectionCardSpacing, string> = {
  default: "mt-6",
  sm: "mt-5",
  none: "",
};

export default function SectionCard({
  children,
  className = "",
  size = "default",
  spacing = "default",
}: SectionCardProps) {
  return (
    <section
      className={`rounded-[28px] border border-[#E6E6E6] bg-white ${sizeClassNames[size]} ${spacingClassNames[spacing]} ${className}`}
    >
      {children}
    </section>
  );
}
