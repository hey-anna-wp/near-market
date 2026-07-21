"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";
import ProductCard from "@/components/product/ProductCard";
import { mockProducts } from "@/mocks/products";
import PageLayout from "@/components/common/PageLayout";
import SectionHeader from "@/components/common/SectionHeader";
import HeroCard from "@/components/common/HeroCard";
import PageTitle from "@/components/common/PageTitle";
import SectionCard from "@/components/common/SectionCard";
import LinkButton from "@/components/common/button/LinkButton";

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
      <HeroCard
        variant="green"
        className="overflow-hidden"
        aside={
          <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_10px_30px_rgba(79,104,67,0.08)]">
            <p className="text-xs font-semibold text-[#777777]">현재 관심 상품</p>
            <p className="mt-1 text-2xl font-bold text-[#4F6843]">{likedProducts.length}개</p>
          </div>
        }
      >
        <PageTitle
          badge={
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#4F6843]">
              <Heart size={14} />
              관심 상품
            </div>
          }
          title={
            <>
              관심 있는 상품을
              <br className="md:hidden" /> 모아봤어요
            </>
          }
          description="나중에 다시 보고 싶은 상품을 한곳에서 확인할 수 있습니다."
        />
      </HeroCard>

      <SectionCard>
        <SectionHeader
          title="관심 상품 목록"
          description="관심 상품은 로그인 후 계정에 저장되도록 연결할 예정입니다."
          action={
            likedProducts.length > 0 && (
              <button
                type="button"
                onClick={handleClearLikes}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[#F3C1C3] bg-white px-4 text-sm font-semibold text-[#E5484D] transition hover:bg-[#FFF5F5]"
              >
                <Trash2 size={16} />
                전체 비우기
              </button>
            )
          }
        />
      </SectionCard>

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
                <ProductCard
                  key={product.id}
                  product={product}
                  isLiked
                  onLikeClick={handleUnlike}
                />
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            title="관심 상품이 없어요"
            description="마음에 드는 상품을 관심 상품으로 저장하면 이곳에서 다시 확인할 수 있어요."
            action={
              <LinkButton href="/products">
                <ShoppingBag size={18} />
                상품 둘러보기
              </LinkButton>
            }
          />
        )}
      </section>
    </PageLayout>
  );
}
