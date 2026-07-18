import type { ReactNode } from "react";

type HeroCardVariant = "white" | "green";
type HeroCardAlign = "start" | "center" | "end";

type HeroCardProps = {
  children: ReactNode;
  aside?: ReactNode;
  bottom?: ReactNode;
  variant?: HeroCardVariant;
  align?: HeroCardAlign;
  className?: string;
  contentClassName?: string;
};

const variantClassNames: Record<HeroCardVariant, string> = {
  white: "bg-white",
  green: "bg-[#EDF3E9]",
};

const alignClassNames: Record<HeroCardAlign, string> = {
  start: "md:items-start",
  center: "md:items-center",
  end: "md:items-end",
};

export default function HeroCard({
  children,
  aside,
  bottom,
  variant = "white",
  align = "end",
  className = "",
  contentClassName = "",
}: HeroCardProps) {
  return (
    <section
      className={`rounded-[28px] ${variantClassNames[variant]} px-5 py-6 md:px-8 md:py-8 ${className}`}
    >
      <div
        className={`flex flex-col gap-5 md:flex-row ${alignClassNames[align]} md:justify-between ${contentClassName}`}
      >
        <div>{children}</div>

        {aside && <div className="shrink-0">{aside}</div>}
      </div>

      {bottom && <div className="mt-6">{bottom}</div>}
    </section>
  );
}
