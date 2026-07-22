import { useId } from "react";
import { ChevronDown } from "lucide-react";

type SelectOption<T extends string> = {
  label: string;
  value: T;
};

type LabelVariant = "filter" | "form";
type SelectRadius = "xl" | "2xl";

type SelectFieldProps<T extends string> = {
  id?: string;
  label?: string;
  value: T;
  options: readonly SelectOption<T>[];
  onChange: (value: T) => void;
  className?: string;
  labelVariant?: LabelVariant;
  radius?: SelectRadius;
  selectClassName?: string;
};

const labelVariantClassNames: Record<LabelVariant, string> = {
  filter: "text-xs text-[#777777]",
  form: "text-sm text-[#333333]",
};

const radiusClassNames: Record<SelectRadius, string> = {
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
};

export default function SelectField<T extends string>({
  id,
  label,
  value,
  options,
  onChange,
  className = "",
  labelVariant = "filter",
  radius = "xl",
  selectClassName = "",
}: SelectFieldProps<T>) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={selectId}
          className={`mb-2 block font-semibold ${labelVariantClassNames[labelVariant]}`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          value={value}
          onChange={(event) => onChange(event.target.value as T)}
          className={`h-12 w-full appearance-none border border-[#E6E6E6] bg-white px-4 pr-10 text-sm font-medium text-[#333333] outline-none focus:border-[#6B8A58] ${radiusClassNames[radius]} ${selectClassName}`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#777777]"
        />
      </div>
    </div>
  );
}
