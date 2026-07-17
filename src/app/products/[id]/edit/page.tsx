"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ProductStatusBadge from "@/components/product/ProductStatusBadge";
import ProductForm from "@/features/products/components/ProductForm";
import type { ProductFormSubmitValues } from "@/features/products/types/product-form";
import { mockProducts } from "@/mocks/products";
import PageLayout from "@/components/common/PageLayout";

export default function ProductEditPage() {
  const params = useParams<{ id: string }>();

  const product = mockProducts.find((item) => item.id === params.id);

  if (!product) {
    return (
      <PageLayout maxWidth="max-w-[960px]">
        <div className="mx-auto w-full max-w-md rounded-[28px] border border-[#E6E6E6] bg-white px-6 py-10 text-center">
          <h1 className="text-xl font-bold text-[#333333]">수정할 상품을 찾을 수 없어요</h1>

          <p className="mt-3 text-sm leading-6 text-[#777777]">
            삭제되었거나 존재하지 않는 상품입니다. 상품 목록에서 다시 확인해주세요.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[#6B8A58] px-6 text-sm font-semibold text-white transition hover:bg-[#4F6843]"
          >
            상품 목록으로 이동
          </Link>
        </div>
      </PageLayout>
    );
  }

  const handleUpdateProduct = (values: ProductFormSubmitValues) => {
    const submitData = {
      id: product.id,
      ...values,
    };

    console.log("상품 수정 데이터:", submitData);

    alert("현재는 더미 UI 단계입니다. 콘솔에서 수정 데이터를 확인해주세요.");
  };

  const handleDeleteProduct = () => {
    const isConfirmed = window.confirm("이 상품을 삭제하시겠어요?");

    if (!isConfirmed) return;

    console.log("상품 삭제:", product.id);

    alert("현재는 더미 UI 단계입니다. 콘솔에서 삭제할 상품을 확인해주세요.");
  };

  return (
    <PageLayout maxWidth="max-w-[960px]">
      <div className="mb-4 md:mb-6">
        <Link
          href={`/products/${product.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#555555] transition hover:text-[#333333]"
        >
          <ArrowLeft size={18} />
          상품 상세로
        </Link>
      </div>

      <section className="rounded-[28px] bg-[#EDF3E9] px-6 py-7 md:px-8 md:py-9">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#4F6843]">Edit Product</p>

            <h1 className="mt-2 text-[28px] leading-9 font-bold tracking-[-0.04em] text-[#333333] md:text-[36px] md:leading-[46px]">
              판매글 정보를
              <br className="md:hidden" /> 수정해보세요
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#66715F]">
              상품 정보, 가격, 거래 상태를 변경할 수 있습니다.
            </p>
          </div>

          <div className="hidden md:block">
            <ProductStatusBadge status={product.status} />
          </div>
        </div>
      </section>

      <ProductForm
        mode="edit"
        initialProduct={product}
        onSubmit={handleUpdateProduct}
        onDelete={handleDeleteProduct}
      />
    </PageLayout>
  );
}
