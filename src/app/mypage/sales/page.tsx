"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Package, Pencil, Plus, Trash2 } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";
import ProductCard from "@/components/product/ProductCard";
import type { ProductStatus } from "@/features/products/types/product";
import { mockUser } from "@/mocks/user";
import { mockProducts } from "@/mocks/products";
import PageLayout from "@/components/common/PageLayout";
import SectionHeader from "@/components/common/SectionHeader";
import HeroCard from "@/components/common/HeroCard";
import PageTitle from "@/components/common/PageTitle";
import StatCard from "@/components/common/StatCard";
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
    <PageLayout>
      <div className="mb-4 md:mb-6">
        <Link
          href="/mypage"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#555555] transition hover:text-[#333333]"
        >
          <ArrowLeft size={18} />
          마이페이지로
        </Link>
      </div>

      <HeroCard
        variant="green"
        className="overflow-hidden px-6 py-7 md:px-8 md:py-9"
        aside={
          <LinkButton href="/products/new" fullWidth className="md:w-auto">
            <Plus size={18} />
            상품 등록
          </LinkButton>
        }
      >
        <PageTitle
          badge={
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#4F6843]">
              <Package size={14} />내 판매글
            </div>
          }
          title={
            <>
              내가 등록한 상품을
              <br className="md:hidden" /> 관리해요
            </>
          }
          description="상품 수정, 삭제, 거래 상태 변경은 Supabase 연동 후 실제 기능으로 연결할 예정입니다."
        />
      </HeroCard>

      <section className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        <StatCard label="전체" value={myProducts.length} align="left" valuePosition="bottom" />

        <StatCard
          label="판매중"
          value={getStatusCount("selling")}
          align="left"
          valuePosition="bottom"
        />

        <StatCard
          label="예약중"
          value={getStatusCount("reserved")}
          align="left"
          valuePosition="bottom"
          valueClassName="text-[#D7772F]"
        />

        <StatCard
          label="거래완료"
          value={getStatusCount("sold")}
          align="left"
          valuePosition="bottom"
          valueClassName="text-[#777777]"
        />
      </section>

      <section className="mt-6 rounded-[24px] border border-[#E6E6E6] bg-white p-4 md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <SearchInput
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="내 판매글 검색"
            ariaLabel="내 판매글 검색"
            className="flex-1"
          />

          <div className="grid grid-cols-2 gap-3 md:flex">
            <SelectField
              value={selectedStatus}
              options={statusOptions}
              onChange={setSelectedStatus}
              radius="2xl"
              className="md:w-[150px]"
            />

            <SelectField
              value={selectedSort}
              options={sortOptions}
              onChange={setSelectedSort}
              radius="2xl"
              className="md:w-[150px]"
            />
          </div>
        </div>

        {hasFilter && (
          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm" onClick={resetFilters}>
              필터 초기화
            </Button>
          </div>
        )}
      </section>

      <section className="mt-8">
        <SectionHeader
          title="판매글 목록"
          description={`총 ${filteredProducts.length}개의 판매글이 있어요.`}
        />

        {filteredProducts.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <div key={product.id} className="rounded-[24px] border border-[#E6E6E6] bg-white p-3">
                <ProductCard product={product} />

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <LinkButton
                    href={`/products/${product.id}/edit`}
                    variant="outline"
                    radius="xl"
                    fullWidth
                  >
                    <Pencil size={17} />
                    수정
                  </LinkButton>

                  <Button
                    variant="dangerOutline"
                    radius="xl"
                    fullWidth
                    onClick={() => handleDelete(product.title)}
                  >
                    <Trash2 size={17} />
                    삭제
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="판매글이 없어요"
            description={
              hasFilter
                ? "검색어나 거래 상태 필터를 초기화해서 다시 확인해보세요."
                : "아직 등록한 상품이 없습니다. 판매할 물건이 있다면 상품을 등록해보세요."
            }
            action={
              !hasFilter && (
                <LinkButton href="/products/new">
                  <Plus size={18} />
                  상품 등록하기
                </LinkButton>
              )
            }
          />
        )}
      </section>
    </PageLayout>
  );
}
