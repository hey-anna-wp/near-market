import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string | number;
  icon?: ReactNode;
  className?: string;
  valueClassName?: string;
  align?: "left" | "center";
  valuePosition?: "top" | "bottom";
};

const alignClassNames: Record<NonNullable<StatCardProps["align"]>, string> = {
  left: "text-left",
  center: "text-center",
};

const paddingClassNames: Record<NonNullable<StatCardProps["valuePosition"]>, string> = {
  top: "p-4 md:p-5",
  bottom: "px-4 pt-5 pb-3 md:px-5 md:pt-6 md:pb-4",
};

export default function StatCard({
  label,
  value,
  icon,
  className = "",
  valueClassName = "text-[#4F6843]",
  align = "center",
  valuePosition = "top",
}: StatCardProps) {
  const labelElement = <p className="text-xs font-semibold text-[#777777]">{label}</p>;

  const valueElement = <p className={`text-2xl font-bold ${valueClassName}`}>{value}</p>;

  return (
    <div
      className={`rounded-2xl border border-[#E6E6E6] bg-white ${paddingClassNames[valuePosition]} ${alignClassNames[align]} ${className}`}
    >
      {icon && (
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#EDF3E9] text-[#4F6843]">
          {icon}
        </div>
      )}

      {valuePosition === "top" ? (
        <>
          {valueElement}
          <div className="mt-1">{labelElement}</div>
        </>
      ) : (
        <>
          {labelElement}
          <div className="mt-2">{valueElement}</div>
        </>
      )}
    </div>
  );
}
