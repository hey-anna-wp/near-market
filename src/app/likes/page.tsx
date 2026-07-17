"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";
import ProductCard from "@/components/product/ProductCard";
import { mockProducts } from "@/mocks/products";
import PageLayout from "@/components/common/PageLayout";

const initialLikedProductIds = ["1", "2", "3"];

export default function LikesPage() {
  const [likedProductIds, setLikedProductIds] = useState<string[]>(initialLikedProductIds);

  const likedProducts = useMemo(() => {
    return mockProducts.filter((product) => likedProductIds.includes(product.id));
  }, [likedProductIds]);

  const handleUnlike = (productId: string) => {
    setLikedProductIds((prev) => prev.filter((id) => id !== productId));
  };

  const handleClearLikes = () => {
    const isConfirmed = confirm("관심 상품을 모두 비우시겠어요?");

    if (!isConfirmed) return;

    setLikedProductIds([]);
  };

  return (
    <PageLayout>
      <section className="overflow-hidden rounded-[28px] bg-[#EDF3E9] px-6 py-7 md:px-8 md:py-9">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#4F6843]">
              <Heart size={14} />
              관심 상품
            </div>

            <h1 className="mt-4 text-[28px] leading-9 font-bold tracking-[-0.04em] text-[#333333] md:text-[36px] md:leading-[46px]">
              관심 있는 상품을
              <br className="md:hidden" /> 모아봤어요
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#66715F]">
              나중에 다시 보고 싶은 상품을 한곳에서 확인할 수 있습니다.
            </p>
          </div>

          <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_10px_30px_rgba(79,104,67,0.08)]">
            <p className="text-xs font-semibold text-[#777777]">현재 관심 상품</p>
            <p className="mt-1 text-2xl font-bold text-[#4F6843]">{likedProducts.length}개</p>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-[24px] border border-[#E6E6E6] bg-white p-4 md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-bold tracking-[-0.02em] text-[#333333]">관심 상품 목록</h2>

            <p className="mt-1 text-sm text-[#777777]">
              관심 상품은 로그인 후 계정에 저장되도록 연결할 예정입니다.
            </p>
          </div>

          {likedProducts.length > 0 && (
            <button
              type="button"
              onClick={handleClearLikes}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[#F3C1C3] bg-white px-4 text-sm font-semibold text-[#E5484D] transition hover:bg-[#FFF5F5]"
            >
              <Trash2 size={16} />
              전체 비우기
            </button>
          )}
        </div>
      </section>

      <section className="mt-6">
        {likedProducts.length > 0 ? (
          <>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-[#777777]">
                총 {likedProducts.length}개의 상품을 관심 상품으로 저장했어요.
              </p>

              <Link
                href="/products"
                className="hidden text-sm font-semibold text-[#4F6843] md:block"
              >
                더 둘러보기
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
              {likedProducts.map((product) => (
                <div key={product.id} className="relative">
                  <ProductCard product={product} showLikeButton={false} />

                  <button
                    type="button"
                    onClick={() => handleUnlike(product.id)}
                    aria-label="관심 상품 해제"
                    className="absolute top-9 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#E5484D] text-white shadow-sm transition hover:bg-[#C9363B]"
                  >
                    <Heart size={18} fill="currentColor" />
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>
            <EmptyState
              title="관심 상품이 없어요"
              description="마음에 드는 상품을 관심 상품으로 저장하면 이곳에서 다시 확인할 수 있어요."
            />

            <div className="mt-5 flex justify-center">
              <Link
                href="/products"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#6B8A58] px-6 text-sm font-semibold text-white transition hover:bg-[#4F6843]"
              >
                <ShoppingBag size={18} />
                상품 둘러보기
              </Link>
            </div>
          </div>
        )}
      </section>
    </PageLayout>
  );
}
