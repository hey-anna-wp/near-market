import Link from "next/link";
import { ArrowRight, MapPin, Plus } from "lucide-react";
import Header from "@/components/common/Header";
import BottomNavigation from "@/components/common/BottomNavigation";
import ProductCard from "@/components/product/ProductCard";
import { categories } from "@/constants/categories";
import { mockProducts } from "@/mocks/products";

export default function HomePage() {
  const popularProducts = mockProducts.slice(0, 4);
  const recentProducts = mockProducts;

  return (
    <div className="min-h-screen bg-[#F7F6F2] pb-20 md:pb-0">
      <Header />

      <main className="mx-auto w-full max-w-[1200px] px-5 py-6 md:px-6 md:py-10">
        <section className="overflow-hidden rounded-[28px] bg-[#EDF3E9] px-6 py-8 md:grid md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-8 md:px-10 md:py-12">
          <div>
            <div className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#4F6843]">
              <MapPin size={14} />
              창원시 성산구 기준
            </div>

            <h1 className="mt-5 text-[30px] leading-[38px] font-bold tracking-[-0.04em] text-[#333333] md:text-[44px] md:leading-[54px]">
              우리 동네에서
              <br />
              가볍게 사고팔아요
            </h1>

            <p className="mt-4 max-w-md text-sm leading-6 text-[#66715F] md:text-base">
              가까운 이웃과 필요한 물건을 거래하고, 관심 상품과 내 판매글을 한곳에서 관리해보세요.
            </p>

            <div className="mt-6 flex gap-3">
              <Link
                href="/products"
                className="flex h-12 items-center justify-center rounded-full bg-[#6B8A58] px-6 text-sm font-semibold text-white transition hover:bg-[#4F6843]"
              >
                상품 둘러보기
              </Link>

              <Link
                href="/products/new"
                className="flex h-12 items-center justify-center rounded-full border border-[#D5D5D5] bg-white px-6 text-sm font-semibold text-[#333333] transition hover:bg-[#FAFAF8]"
              >
                판매하기
              </Link>
            </div>
          </div>

          <div className="mt-8 rounded-[24px] bg-white p-4 shadow-[0_16px_40px_rgba(79,104,67,0.12)] md:mt-0">
            <div className="rounded-[20px] bg-[#FAFAF8] p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#333333]">오늘의 추천</span>
                <span className="rounded-full bg-[#FFF1E3] px-3 py-1 text-xs font-semibold text-[#D7772F]">
                  인기
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {popularProducts.slice(0, 3).map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="flex items-center gap-3 rounded-2xl bg-white p-3"
                  >
                    <div className="h-14 w-14 rounded-xl bg-[#EDF3E9]" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[#333333]">{product.title}</p>
                      <p className="mt-1 text-xs text-[#777777]">{product.location}</p>
                    </div>
                    <p className="text-sm font-bold text-[#333333]">
                      {product.price.toLocaleString("ko-KR")}원
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 md:mt-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-[-0.02em] text-[#333333]">카테고리</h2>
              <p className="mt-1 text-sm text-[#777777]">원하는 물건을 빠르게 찾아보세요.</p>
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category, index) => (
              <button
                key={category}
                type="button"
                className={`h-10 shrink-0 rounded-full px-4 text-sm font-semibold ${
                  index === 0
                    ? "bg-[#6B8A58] text-white"
                    : "border border-[#E6E6E6] bg-white text-[#555555]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8 md:mt-12">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-[-0.02em] text-[#333333]">인기 상품</h2>
              <p className="mt-1 text-sm text-[#777777]">이웃들이 많이 관심 가진 상품이에요.</p>
            </div>

            <Link
              href="/products"
              className="hidden items-center gap-1 text-sm font-semibold text-[#4F6843] md:flex"
            >
              전체보기
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="mt-8 md:mt-12">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-[-0.02em] text-[#333333]">
                최근 등록 상품
              </h2>
              <p className="mt-1 text-sm text-[#777777]">방금 올라온 동네 상품을 확인해보세요.</p>
            </div>

            <Link
              href="/products"
              className="hidden items-center gap-1 text-sm font-semibold text-[#4F6843] md:flex"
            >
              더보기
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {recentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <Link
        href="/products/new"
        className="fixed right-5 bottom-20 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#6B8A58] text-white shadow-[0_8px_24px_rgba(79,104,67,0.35)] md:hidden"
        aria-label="상품 등록"
      >
        <Plus size={26} />
      </Link>

      <BottomNavigation />
    </div>
  );
}
