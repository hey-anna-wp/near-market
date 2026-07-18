import type { ReactNode } from "react";

type PageTitleSize = "default" | "compact";

type PageTitleProps = {
  eyebrow?: string;
  badge?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  size?: PageTitleSize;
  className?: string;
  descriptionClassName?: string;
};

const titleSizeClassNames: Record<PageTitleSize, string> = {
  default: "text-[28px] leading-9 md:text-[36px] md:leading-[46px]",
  compact: "text-[28px] leading-9 md:text-[34px] md:leading-[44px]",
};

export default function PageTitle({
  eyebrow,
  badge,
  title,
  description,
  size = "default",
  className = "",
  descriptionClassName = "text-[#66715F]",
}: PageTitleProps) {
  return (
    <div className={className}>
      {badge}

      {!badge && eyebrow && <p className="text-sm font-semibold text-[#6B8A58]">{eyebrow}</p>}

      <h1
        className={`${badge ? "mt-4" : "mt-2"} ${titleSizeClassNames[size]} font-bold tracking-[-0.04em] text-[#333333]`}
      >
        {title}
      </h1>

      {description && (
        <p className={`mt-3 text-sm leading-6 ${descriptionClassName}`}>{description}</p>
      )}
    </div>
  );
}
