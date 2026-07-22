import { Search } from "lucide-react";
import type { ChangeEventHandler } from "react";

type SearchInputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
  inputClassName?: string;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = "검색어를 입력하세요",
  ariaLabel = "검색",
  className = "",
  inputClassName = "",
}: SearchInputProps) {
  return (
    <div
      className={`flex h-12 items-center gap-2 rounded-2xl border border-[#E6E6E6] bg-[#FAFAF8] px-4 ${className}`}
    >
      <Search size={19} className="shrink-0 text-[#777777]" />

      <input
        type="text"
        aria-label={ariaLabel}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-transparent text-sm text-[#333333] outline-none placeholder:text-[#AAAAAA] ${inputClassName}`}
      />
    </div>
  );
}
