import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";
import type { Product } from "@/features/products/types/product";
import ProductStatusBadge from "./ProductStatusBadge";

type ProductCardProps = {
  product: Product;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("ko-KR").format(price);
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group overflow-hidden rounded-2xl border border-[#E6E6E6] bg-white transition hover:-translate-y-1 hover:border-[#D5D5D5] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
    >
      <div className="relative aspect-square overflow-hidden bg-[#FAFAF8]">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3">
          <ProductStatusBadge status={product.status} />
        </div>

        <button
          type="button"
          aria-label="관심 상품"
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#777777] shadow-sm backdrop-blur transition hover:text-[#E5484D]"
        >
          <Heart size={18} />
        </button>
      </div>

      <div className="p-3 md:p-4">
        <h3 className="line-clamp-2 min-h-10 text-sm leading-5 font-medium text-[#333333] md:text-[15px]">
          {product.title}
        </h3>

        <p className="mt-2 text-lg font-bold tracking-[-0.02em] text-[#333333]">
          {formatPrice(product.price)}원
        </p>

        <p className="mt-1 text-xs leading-[18px] text-[#777777]">{product.location} · 방금 전</p>

        <div className="mt-3 flex items-center gap-3 text-xs text-[#777777]">
          <span className="flex items-center gap-1">
            <Heart size={14} />
            {product.likeCount}
          </span>

          <span className="flex items-center gap-1">
            <MessageCircle size={14} />
            {product.chatCount}
          </span>
        </div>
      </div>
    </Link>
  );
}
