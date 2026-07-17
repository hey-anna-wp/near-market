import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export default function SectionHeader({
  title,
  description,
  action,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex items-start justify-between ${className}`}>
      <div>
        <h2 className="text-xl font-bold tracking-[-0.02em] text-[#333333]">{title}</h2>

        {description && <p className="mt-1 text-sm text-[#777777]">{description}</p>}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
