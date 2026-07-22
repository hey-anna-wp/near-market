"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";
import ProductCard from "@/components/product/ProductCard";
import { categories } from "@/constants/categories";
import { mockProducts } from "@/mocks/products";
import type { ProductStatus } from "@/features/products/types/product";
import SectionHeader from "@/components/common/SectionHeader";
import PageLayout from "@/components/common/PageLayout";
import PageTitle from "@/components/common/PageTitle";
import HeroCard from "@/components/common/HeroCard";
import SectionCard from "@/components/common/SectionCard";
import { Button, LinkButton } from "@/components/common/button";
import { SearchInput, SelectField } from "@/components/common/input";

const statusOptions = [
  {
    label: "전체",
    value: "all",
  },
  {
    label: "판매중",
    value: "selling",
  },
  {
    label: "예약중",
    value: "reserved",
  },
  {
    label: "거래완료",
    value: "sold",
  },
] as const;

const sortOptions = [
  {
    label: "최신순",
    value: "recent",
  },
  {
    label: "낮은 가격순",
    value: "low-price",
  },
  {
    label: "높은 가격순",
    value: "high-price",
  },
  {
    label: "관심 많은순",
    value: "popular",
  },
] as const;

type StatusFilter = "all" | ProductStatus;
type SortOption = (typeof sortOptions)[number]["value"];

export default function ProductsPage() {
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("all");
  const [selectedSort, setSelectedSort] = useState<SortOption>("recent");

  const filteredProducts = useMemo(() => {
    const filtered = mockProducts.filter((product) => {
      const matchesKeyword =
        product.title.toLowerCase().includes(keyword.toLowerCase()) ||
        product.description.toLowerCase().includes(keyword.toLowerCase()) ||
        product.location.toLowerCase().includes(keyword.toLowerCase());

      const matchesCategory = selectedCategory === "전체" || product.category === selectedCategory;

      const matchesStatus = selectedStatus === "all" || product.status === selectedStatus;

      return matchesKeyword && matchesCategory && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
      if (selectedSort === "low-price") {
        return a.price - b.price;
      }

      if (selectedSort === "high-price") {
        return b.price - a.price;
      }

      if (selectedSort === "popular") {
        return b.likeCount - a.likeCount;
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [keyword, selectedCategory, selectedStatus, selectedSort]);

  const hasFilter =
    keyword || selectedCategory !== "전체" || selectedStatus !== "all" || selectedSort !== "recent";

  const resetFilters = () => {
    setKeyword("");
    setSelectedCategory("전체");
    setSelectedStatus("all");
    setSelectedSort("recent");
  };

  return (
    <PageLayout>
      <HeroCard
        aside={<LinkButton href="/products/new">상품 등록하기</LinkButton>}
        bottom={
          <SearchInput
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="상품명, 설명, 지역으로 검색"
            ariaLabel="상품 검색"
          />
        }
      >
        <PageTitle
          eyebrow="Near Market"
          title="동네 상품 둘러보기"
          description="지역과 카테고리를 기준으로 원하는 중고 상품을 찾아보세요."
          descriptionClassName="text-[#777777]"
        />
      </HeroCard>
      <SectionCard>
        <div className="flex items-center gap-2 text-sm font-semibold text-[#333333]">
          <SlidersHorizontal size={18} />
          필터
        </div>

        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold text-[#777777]">카테고리</p>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`h-10 shrink-0 rounded-full px-4 text-sm font-semibold transition ${
                  selectedCategory === category
                    ? "bg-[#6B8A58] text-white"
                    : "border border-[#E6E6E6] bg-white text-[#555555] hover:bg-[#FAFAF8]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          <SelectField
            label="거래 상태"
            value={selectedStatus}
            options={statusOptions}
            onChange={setSelectedStatus}
          />

          <SelectField
            label="정렬"
            value={selectedSort}
            options={sortOptions}
            onChange={setSelectedSort}
          />
        </div>
      </SectionCard>

      <section className="mt-8">
        <SectionHeader
          title="상품 목록"
          description={`총 ${filteredProducts.length}개의 상품이 있어요.`}
          action={
            hasFilter && (
              <Button variant="outline" size="sm" onClick={resetFilters}>
                초기화
              </Button>
            )
          }
        />

        {filteredProducts.length > 0 ? (
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="검색 결과가 없어요"
            description="검색어를 바꾸거나 카테고리, 거래 상태 필터를 초기화해 다시 확인해보세요."
          />
        )}
      </section>
    </PageLayout>
  );
}
