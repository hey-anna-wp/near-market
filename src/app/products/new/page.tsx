"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductForm from "@/features/products/components/ProductForm";
import type { ProductFormSubmitValues } from "@/features/products/types/product-form";
import PageLayout from "@/components/common/PageLayout";

export default function ProductNewPage() {
  const handleCreateProduct = (values: ProductFormSubmitValues) => {
    // const submitData = {
    //   ...values,
    //   status: "selling" as const,
    // };

    // console.log("상품 등록 데이터:", submitData);
    console.log("상품 등록 데이터:", values);

    alert("현재는 더미 UI 단계입니다. 콘솔에서 등록 데이터를 확인해주세요.");
  };

  return (
    <PageLayout maxWidth="max-w-[960px]">
      <div className="mb-4 md:mb-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#555555] transition hover:text-[#333333]"
        >
          <ArrowLeft size={18} />
          상품 목록으로
        </Link>
      </div>

      <section className="rounded-[28px] bg-[#EDF3E9] px-6 py-7 md:px-8 md:py-9">
        <p className="text-sm font-semibold text-[#4F6843]">Sell Product</p>

        <h1 className="mt-2 text-[28px] leading-9 font-bold tracking-[-0.04em] text-[#333333] md:text-[36px] md:leading-[46px]">
          판매할 상품을
          <br className="md:hidden" /> 등록해보세요
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#66715F]">
          사진과 설명을 자세히 입력하면 이웃들이 상품을 더 쉽게 확인할 수 있어요.
        </p>
      </section>

      <ProductForm mode="create" onSubmit={handleCreateProduct} />
    </PageLayout>
  );
}
