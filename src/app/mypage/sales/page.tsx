"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ChevronDown, Package, Pencil, Plus, Search, Trash2 } from "lucide-react";
import Header from "@/components/common/Header";
import BottomNavigation from "@/components/common/BottomNavigation";
import EmptyState from "@/components/common/EmptyState";
import ProductCard from "@/components/product/ProductCard";
import type { ProductStatus } from "@/features/products/types/product";
import { mockProducts } from "@/mocks/products";

const mockUser = {
  id: "user-1",
  nickname: "동네이웃",
};

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

function getStatusCount(status: ProductStatus) {
  return mockProducts.filter(
    (product) => product.sellerId === mockUser.id && product.status === status,
  ).length;
}

export default function MySalesPage() {
  const [keyword, setKeyword] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("all");
  const [selectedSort, setSelectedSort] = useState<SortOption>("recent");

  const myProducts = useMemo(() => {
    return mockProducts.filter((product) => product.sellerId === mockUser.id);
  }, []);

  const filteredProducts = useMemo(() => {
    const filtered = myProducts.filter((product) => {
      const matchesKeyword =
        product.title.toLowerCase().includes(keyword.toLowerCase()) ||
        product.description.toLowerCase().includes(keyword.toLowerCase()) ||
        product.location.toLowerCase().includes(keyword.toLowerCase());

      const matchesStatus = selectedStatus === "all" || product.status === selectedStatus;

      return matchesKeyword && matchesStatus;
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
  }, [keyword, myProducts, selectedSort, selectedStatus]);

  const hasFilter = keyword || selectedStatus !== "all" || selectedSort !== "recent";

  const resetFilters = () => {
    setKeyword("");
    setSelectedStatus("all");
    setSelectedSort("recent");
  };

  const handleDelete = (productTitle: string) => {
    alert(
      `현재는 더미 UI 단계입니다.\n"${productTitle}" 삭제 기능은 Supabase 연동 후 구현할 예정입니다.`,
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] pb-20 md:pb-0">
      <Header />

      <main className="mx-auto w-full max-w-[1200px] px-5 py-6 md:px-6 md:py-10">
        <div className="mb-4 md:mb-6">
          <Link
            href="/mypage"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#555555] transition hover:text-[#333333]"
          >
            <ArrowLeft size={18} />
            마이페이지로
          </Link>
        </div>

        <section className="overflow-hidden rounded-[28px] bg-[#EDF3E9] px-6 py-7 md:px-8 md:py-9">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#4F6843]">
                <Package size={14} />내 판매글
              </div>

              <h1 className="mt-4 text-[28px] leading-9 font-bold tracking-[-0.04em] text-[#333333] md:text-[36px] md:leading-[46px]">
                내가 등록한 상품을
                <br className="md:hidden" /> 관리해요
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#66715F]">
                상품 수정, 삭제, 거래 상태 변경은 Supabase 연동 후 실제 기능으로 연결할 예정입니다.
              </p>
            </div>

            <Link
              href="/products/new"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#6B8A58] px-6 text-sm font-semibold text-white transition hover:bg-[#4F6843]"
            >
              <Plus size={18} />
              상품 등록
            </Link>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <div className="rounded-2xl border border-[#E6E6E6] bg-white p-4 md:p-5">
            <p className="text-xs font-semibold text-[#777777]">전체</p>
            <p className="mt-2 text-2xl font-bold text-[#4F6843]">{myProducts.length}</p>
          </div>

          <div className="rounded-2xl border border-[#E6E6E6] bg-white p-4 md:p-5">
            <p className="text-xs font-semibold text-[#777777]">판매중</p>
            <p className="mt-2 text-2xl font-bold text-[#4F6843]">{getStatusCount("selling")}</p>
          </div>

          <div className="rounded-2xl border border-[#E6E6E6] bg-white p-4 md:p-5">
            <p className="text-xs font-semibold text-[#777777]">예약중</p>
            <p className="mt-2 text-2xl font-bold text-[#D7772F]">{getStatusCount("reserved")}</p>
          </div>

          <div className="rounded-2xl border border-[#E6E6E6] bg-white p-4 md:p-5">
            <p className="text-xs font-semibold text-[#777777]">거래완료</p>
            <p className="mt-2 text-2xl font-bold text-[#777777]">{getStatusCount("sold")}</p>
          </div>
        </section>

        <section className="mt-6 rounded-[24px] border border-[#E6E6E6] bg-white p-4 md:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex h-12 flex-1 items-center gap-2 rounded-2xl border border-[#E6E6E6] bg-[#FAFAF8] px-4">
              <Search size={19} className="shrink-0 text-[#777777]" />

              <input
                type="text"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="내 판매글 검색"
                className="w-full bg-transparent text-sm text-[#333333] outline-none placeholder:text-[#AAAAAA]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 md:flex">
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(event) => setSelectedStatus(event.target.value as StatusFilter)}
                  className="h-12 w-full appearance-none rounded-2xl border border-[#E6E6E6] bg-white px-4 pr-10 text-sm font-medium text-[#333333] outline-none focus:border-[#6B8A58] md:w-[150px]"
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

              <div className="relative">
                <select
                  value={selectedSort}
                  onChange={(event) => setSelectedSort(event.target.value as SortOption)}
                  className="h-12 w-full appearance-none rounded-2xl border border-[#E6E6E6] bg-white px-4 pr-10 text-sm font-medium text-[#333333] outline-none focus:border-[#6B8A58] md:w-[150px]"
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

          {hasFilter && (
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-full border border-[#D5D5D5] bg-white px-4 py-2 text-sm font-semibold text-[#555555] transition hover:bg-[#FAFAF8]"
              >
                필터 초기화
              </button>
            </div>
          )}
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-[-0.02em] text-[#333333]">판매글 목록</h2>

              <p className="mt-1 text-sm text-[#777777]">
                총 {filteredProducts.length}개의 판매글이 있어요.
              </p>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-[24px] border border-[#E6E6E6] bg-white p-3"
                >
                  <ProductCard product={product} />

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Link
                      href={`/products/${product.id}/edit`}
                      className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#D5D5D5] bg-white text-sm font-semibold text-[#333333] transition hover:bg-[#FAFAF8]"
                    >
                      <Pencil size={17} />
                      수정
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(product.title)}
                      className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#F3C1C3] bg-white text-sm font-semibold text-[#E5484D] transition hover:bg-[#FFF5F5]"
                    >
                      <Trash2 size={17} />
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <EmptyState
                title="판매글이 없어요"
                description={
                  hasFilter
                    ? "검색어나 거래 상태 필터를 초기화해서 다시 확인해보세요."
                    : "아직 등록한 상품이 없습니다. 판매할 물건이 있다면 상품을 등록해보세요."
                }
              />

              {!hasFilter && (
                <div className="mt-5 flex justify-center">
                  <Link
                    href="/products/new"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#6B8A58] px-6 text-sm font-semibold text-white transition hover:bg-[#4F6843]"
                  >
                    <Plus size={18} />
                    상품 등록하기
                  </Link>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
}
