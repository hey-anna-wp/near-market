import { SearchX } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
};

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="mt-5 flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#D5D5D5] bg-white px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EDF3E9] text-[#4F6843]">
        <SearchX size={26} />
      </div>

      <h3 className="mt-4 text-base font-semibold text-[#333333]">{title}</h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-[#777777]">{description}</p>
    </div>
  );
}
