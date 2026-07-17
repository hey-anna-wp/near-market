import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Heart,
  MapPin,
  MessageCircle,
  MoreVertical,
  Pencil,
  ShieldCheck,
  Trash2,
  User,
} from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import ProductStatusBadge from "@/components/product/ProductStatusBadge";
import { mockProducts } from "@/mocks/products";
import { formatDate, formatPrice } from "@/lib/format";
import PageLayout from "@/components/common/PageLayout";

type ProductDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;

  const product = mockProducts.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  const relatedProducts = mockProducts.filter((item) => item.id !== product.id).slice(0, 4);

  return (
    <PageLayout>
      <div className="mb-4 flex items-center justify-between md:mb-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#555555] transition hover:text-[#333333]"
        >
          <ArrowLeft size={18} />
          상품 목록으로
        </Link>

        <button
          type="button"
          aria-label="더보기"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E6E6E6] bg-white text-[#777777] md:hidden"
        >
          <MoreVertical size={20} />
        </button>
      </div>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="overflow-hidden rounded-[28px] border border-[#E6E6E6] bg-white">
          <div className="relative aspect-square bg-[#FAFAF8] md:aspect-[4/3]">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute top-4 left-4">
              <ProductStatusBadge status={product.status} />
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-[#E6E6E6] bg-white p-5 md:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#6B8A58]">{product.category}</p>

              <h1 className="mt-2 text-[26px] leading-9 font-bold tracking-[-0.04em] text-[#333333] md:text-[34px] md:leading-[44px]">
                {product.title}
              </h1>
            </div>

            <button
              type="button"
              aria-label="관심 상품"
              className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E6E6E6] bg-white text-[#777777] transition hover:text-[#E5484D] md:flex"
            >
              <Heart size={22} />
            </button>
          </div>

          <p className="mt-4 text-[28px] font-bold tracking-[-0.04em] text-[#333333]">
            {formatPrice(product.price)}원
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 rounded-2xl bg-[#FAFAF8] p-4 text-sm text-[#555555]">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-[#6B8A58]" />
              <span>{product.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays size={18} className="text-[#6B8A58]" />
              <span>{formatDate(product.createdAt)} 등록</span>
            </div>

            <div className="flex items-center gap-2">
              <Heart size={18} className="text-[#6B8A58]" />
              <span>관심 {product.likeCount}</span>
            </div>

            <div className="flex items-center gap-2">
              <MessageCircle size={18} className="text-[#6B8A58]" />
              <span>문의 {product.chatCount}</span>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[#E6E6E6] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EDF3E9] text-[#4F6843]">
                <User size={22} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold text-[#333333]">{product.sellerName}</p>
                <p className="mt-1 text-xs text-[#777777]">{product.location} 이웃</p>
              </div>

              <div className="flex items-center gap-1 rounded-full bg-[#EDF3E9] px-3 py-1.5 text-xs font-semibold text-[#4F6843]">
                <ShieldCheck size={14} />
                인증
              </div>
            </div>
          </div>

          <div className="mt-6 hidden gap-3 md:flex">
            <button
              type="button"
              className="flex h-13 flex-1 items-center justify-center gap-2 rounded-2xl border border-[#D5D5D5] bg-white text-sm font-semibold text-[#333333] transition hover:bg-[#FAFAF8]"
            >
              <Heart size={19} />
              관심
            </button>

            <button
              type="button"
              className="flex h-13 flex-[1.4] items-center justify-center gap-2 rounded-2xl bg-[#6B8A58] text-sm font-semibold text-white transition hover:bg-[#4F6843]"
            >
              <MessageCircle size={19} />
              문의하기
            </button>
          </div>

          <div className="mt-4 hidden rounded-2xl bg-[#FFF1E3] px-4 py-3 text-sm leading-6 text-[#9A5A23] md:block">
            현재는 더미데이터 단계라 문의 기능은 연결되지 않았습니다. 추후 로그인과 Supabase 연동 후
            채팅 또는 문의 기능으로 확장할 예정입니다.
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-[28px] border border-[#E6E6E6] bg-white p-5 md:mt-8 md:p-7">
        <h2 className="text-lg font-bold tracking-[-0.02em] text-[#333333]">상품 설명</h2>

        <p className="mt-4 text-sm leading-7 whitespace-pre-line text-[#555555] md:text-base md:leading-8">
          {product.description}
        </p>
      </section>

      <section className="mt-6 rounded-[28px] border border-[#E6E6E6] bg-white p-5 md:mt-8 md:p-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold tracking-[-0.02em] text-[#333333]">
              판매자 관리 영역
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#777777]">
              로그인 후 본인이 등록한 상품일 경우 수정, 삭제, 거래 상태 변경 버튼을 노출할
              예정입니다.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          <Link
            href={`/products/${product.id}/edit`}
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#D5D5D5] bg-white text-sm font-semibold text-[#333333] transition hover:bg-[#FAFAF8]"
          >
            <Pencil size={18} />
            수정하기
          </Link>

          <button
            type="button"
            className="flex h-12 items-center justify-center rounded-xl border border-[#D5D5D5] bg-white text-sm font-semibold text-[#333333] transition hover:bg-[#FAFAF8]"
          >
            거래 상태 변경
          </button>

          <button
            type="button"
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#F3C1C3] bg-white text-sm font-semibold text-[#E5484D] transition hover:bg-[#FFF5F5]"
          >
            <Trash2 size={18} />
            삭제하기
          </button>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="mt-8 md:mt-12">
          <div className="mb-4">
            <h2 className="text-xl font-bold tracking-[-0.02em] text-[#333333]">비슷한 상품</h2>
            <p className="mt-1 text-sm text-[#777777]">
              같은 동네에서 올라온 다른 상품도 확인해보세요.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}

      <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-[#E6E6E6] bg-white p-4 md:hidden">
        <div className="mx-auto flex max-w-md gap-3">
          <button
            type="button"
            aria-label="관심 상품"
            className="flex h-12 w-14 items-center justify-center rounded-2xl border border-[#D5D5D5] bg-white text-[#777777]"
          >
            <Heart size={22} />
          </button>

          <button
            type="button"
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#6B8A58] text-sm font-semibold text-white"
          >
            <MessageCircle size={19} />
            문의하기
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
