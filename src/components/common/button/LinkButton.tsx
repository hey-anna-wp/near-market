import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type LinkButtonVariant = "primary" | "outline" | "dangerOutline";
type LinkButtonSize = "sm" | "md" | "lg";
type LinkButtonRadius = "full" | "xl" | "2xl";

type LinkButtonProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
    variant?: LinkButtonVariant;
    size?: LinkButtonSize;
    radius?: LinkButtonRadius;
    fullWidth?: boolean;
  };

const variantClassNames: Record<LinkButtonVariant, string> = {
  primary: "bg-[#6B8A58] text-white hover:bg-[#4F6843]",
  outline: "border border-[#D5D5D5] bg-white text-[#333333] hover:bg-[#FAFAF8]",
  dangerOutline: "border border-[#F3C1C3] bg-white text-[#E5484D] hover:bg-[#FFF5F5]",
};

const sizeClassNames: Record<LinkButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-sm",
};

const radiusClassNames: Record<LinkButtonRadius, string> = {
  full: "rounded-full",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
};

export default function LinkButton({
  children,
  variant = "primary",
  size = "md",
  radius = "full",
  fullWidth = false,
  className = "",
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={`inline-flex items-center justify-center gap-2 font-semibold transition ${variantClassNames[variant]} ${sizeClassNames[size]} ${radiusClassNames[radius]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
