import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "dangerOutline";
type ButtonSize = "sm" | "md" | "lg";
type ButtonRadius = "full" | "xl" | "2xl";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  radius?: ButtonRadius;
  fullWidth?: boolean;
  iconOnly?: boolean;
};

const variantClassNames: Record<ButtonVariant, string> = {
  primary: "bg-[#6B8A58] text-white hover:bg-[#4F6843]",
  outline: "border border-[#D5D5D5] bg-white text-[#555555] hover:bg-[#FAFAF8]",
  dangerOutline: "border border-[#F3C1C3] bg-white text-[#E5484D] hover:bg-[#FFF5F5]",
};

const sizeClassNames: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-sm",
};

const radiusClassNames: Record<ButtonRadius, string> = {
  full: "rounded-full",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  radius = "full",
  fullWidth = false,
  iconOnly = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variantClassNames[variant]} ${sizeClassNames[size]} ${radiusClassNames[radius]} ${fullWidth ? "w-full" : ""} ${iconOnly ? "px-0" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
