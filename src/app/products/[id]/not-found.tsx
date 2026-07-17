import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";
import PageLayout from "@/components/common/PageLayout";

export default function ProductNotFoundPage() {
  return (
    <PageLayout className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md rounded-[28px] border border-[#E6E6E6] bg-white px-6 py-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EDF3E9] text-[#4F6843]">
          <SearchX size={30} />
        </div>

        <h1 className="mt-5 text-xl font-bold text-[#333333]">상품을 찾을 수 없어요</h1>

        <p className="mt-3 text-sm leading-6 text-[#777777]">
          삭제되었거나 존재하지 않는 상품입니다. 상품 목록에서 다른 상품을 확인해보세요.
        </p>

        <Link
          href="/products"
          className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#6B8A58] px-6 text-sm font-semibold text-white transition hover:bg-[#4F6843]"
        >
          <ArrowLeft size={18} />
          상품 목록으로 이동
        </Link>
      </div>
    </PageLayout>
  );
}
