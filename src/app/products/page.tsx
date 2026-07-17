"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import Header from "@/components/common/Header";
import BottomNavigation from "@/components/common/BottomNavigation";
import EmptyState from "@/components/common/EmptyState";
import ProductCard from "@/components/product/ProductCard";
import { categories } from "@/constants/categories";
import { mockProducts } from "@/mocks/products";
import type { ProductStatus } from "@/features/products/types/product";
import SectionHeader from "@/components/common/SectionHeader";

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
    <div className="min-h-screen bg-[#F7F6F2] pb-20 md:pb-0">
      <Header />

      <main className="mx-auto w-full max-w-[1200px] px-5 py-6 md:px-6 md:py-10">
        <section className="rounded-[28px] bg-white px-5 py-6 md:px-8 md:py-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#6B8A58]">Near Market</p>

              <h1 className="mt-2 text-[28px] leading-9 font-bold tracking-[-0.04em] text-[#333333] md:text-[36px] md:leading-[46px]">
                동네 상품 둘러보기
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#777777]">
                지역과 카테고리를 기준으로 원하는 중고 상품을 찾아보세요.
              </p>
            </div>

            <Link
              href="/products/new"
              className="flex h-12 items-center justify-center rounded-full bg-[#6B8A58] px-6 text-sm font-semibold text-white transition hover:bg-[#4F6843]"
            >
              상품 등록하기
            </Link>
          </div>

          <div className="mt-6 flex h-12 items-center gap-2 rounded-2xl border border-[#E6E6E6] bg-[#FAFAF8] px-4">
            <Search size={19} className="shrink-0 text-[#777777]" />

            <input
              type="text"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="상품명, 설명, 지역으로 검색"
              className="w-full bg-transparent text-sm text-[#333333] outline-none placeholder:text-[#AAAAAA]"
            />
          </div>
        </section>

        <section className="mt-5 rounded-[24px] border border-[#E6E6E6] bg-white p-4 md:p-5">
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
            <div>
              <p className="mb-2 text-xs font-semibold text-[#777777]">거래 상태</p>

              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(event) => setSelectedStatus(event.target.value as StatusFilter)}
                  className="h-12 w-full appearance-none rounded-xl border border-[#E6E6E6] bg-white px-4 pr-10 text-sm font-medium text-[#333333] outline-none focus:border-[#6B8A58]"
                >
                  {statusOptions.map((option) => (
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

            <div>
              <p className="mb-2 text-xs font-semibold text-[#777777]">정렬</p>

              <div className="relative">
                <select
                  value={selectedSort}
                  onChange={(event) => setSelectedSort(event.target.value as SortOption)}
                  className="h-12 w-full appearance-none rounded-xl border border-[#E6E6E6] bg-white px-4 pr-10 text-sm font-medium text-[#333333] outline-none focus:border-[#6B8A58]"
                >
                  {sortOptions.map((option) => (
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
          </div>
        </section>

        <section className="mt-8">
          <SectionHeader
            title="상품 목록"
            description={`총 ${filteredProducts.length}개의 상품이 있어요.`}
            action={
              hasFilter && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="rounded-full border border-[#D5D5D5] bg-white px-4 py-2 text-sm font-semibold text-[#555555] transition hover:bg-[#FAFAF8]"
                >
                  초기화
                </button>
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
      </main>

      <BottomNavigation />
    </div>
  );
}
