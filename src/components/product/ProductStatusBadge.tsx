import type { ProductStatus } from "@/features/products/types/product";

type ProductStatusBadgeProps = {
  status: ProductStatus;
};

const statusMap: Record<
  ProductStatus,
  {
    label: string;
    className: string;
  }
> = {
  selling: {
    label: "판매중",
    className: "bg-[#EDF3E9] text-[#4F6843]",
  },
  reserved: {
    label: "예약중",
    className: "bg-[#FFF1E3] text-[#D7772F]",
  },
  sold: {
    label: "거래완료",
    className: "bg-[#F1F1F1] text-[#777777]",
  },
};

export default function ProductStatusBadge({ status }: ProductStatusBadgeProps) {
  const statusInfo = statusMap[status];

  return (
    <span
      className={`inline-flex h-6 items-center rounded-full px-2.5 text-[11px] font-semibold ${statusInfo.className}`}
    >
      {statusInfo.label}
    </span>
  );
}
