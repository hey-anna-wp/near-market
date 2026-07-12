"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Camera, ChevronDown, ImagePlus, MapPin, Save, Trash2, X } from "lucide-react";
import Header from "@/components/common/Header";
import BottomNavigation from "@/components/common/BottomNavigation";
import ProductStatusBadge from "@/components/product/ProductStatusBadge";
import { categories } from "@/constants/categories";
import type { ProductStatus } from "@/features/products/types/product";
import { mockProducts } from "@/mocks/products";

type ProductFormValues = {
  title: string;
  category: string;
  price: string;
  location: string;
  status: ProductStatus;
  description: string;
};

type ProductFormErrors = Partial<Record<keyof ProductFormValues | "image", string>>;

const statusOptions: {
  label: string;
  value: ProductStatus;
}[] = [
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
];

const emptyFormValues: ProductFormValues = {
  title: "",
  category: "",
  price: "",
  location: "",
  status: "selling",
  description: "",
};

export default function ProductEditPage() {
  const params = useParams<{ id: string }>();
  const product = mockProducts.find((item) => item.id === params.id);

  const [formValues, setFormValues] = useState<ProductFormValues>(() => {
    if (!product) return emptyFormValues;

    return {
      title: product.title,
      category: product.category,
      price: String(product.price),
      location: product.location,
      status: product.status,
      description: product.description,
    };
  });

  const [imagePreview, setImagePreview] = useState<string>(() => product?.imageUrl ?? "");
  const [isNewImage, setIsNewImage] = useState(false);
  const [errors, setErrors] = useState<ProductFormErrors>({});

  const productCategories = categories.filter((category) => category !== "전체");

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] pb-20 md:pb-0">
        <Header />

        <main className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-[1200px] items-center justify-center px-5 py-10 md:px-6">
          <div className="w-full max-w-md rounded-[28px] border border-[#E6E6E6] bg-white px-6 py-10 text-center">
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
        </main>

        <BottomNavigation />
      </div>
    );
  }

  const handleInputChange = (field: keyof ProductFormValues, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleStatusChange = (value: ProductStatus) => {
    setFormValues((prev) => ({
      ...prev,
      status: value,
    }));

    setErrors((prev) => ({
      ...prev,
      status: "",
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setIsNewImage(true);

    setErrors((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const removeImage = () => {
    setImagePreview("");
    setIsNewImage(false);
  };

  const validateForm = () => {
    const nextErrors: ProductFormErrors = {};

    if (!imagePreview) {
      nextErrors.image = "상품 이미지를 1장 이상 등록해주세요.";
    }

    if (formValues.title.trim().length < 2) {
      nextErrors.title = "제목은 2자 이상 입력해주세요.";
    }

    if (!formValues.category) {
      nextErrors.category = "카테고리를 선택해주세요.";
    }

    if (!formValues.price.trim()) {
      nextErrors.price = "가격을 입력해주세요.";
    } else if (!/^[0-9]+$/.test(formValues.price)) {
      nextErrors.price = "가격은 숫자만 입력해주세요.";
    }

    if (!formValues.location.trim()) {
      nextErrors.location = "거래 지역을 입력해주세요.";
    }

    if (!formValues.status) {
      nextErrors.status = "거래 상태를 선택해주세요.";
    }

    if (formValues.description.trim().length < 5) {
      nextErrors.description = "상품 설명은 5자 이상 입력해주세요.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    const submitData = {
      id: product.id,
      ...formValues,
      price: Number(formValues.price),
      imageUrl: imagePreview,
      isNewImage,
    };

    console.log("상품 수정 데이터:", submitData);
    alert("현재는 더미 UI 단계입니다. 콘솔에서 수정 데이터를 확인해주세요.");
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] pb-20 md:pb-0">
      <Header />

      <main className="mx-auto w-full max-w-[960px] px-5 py-5 md:px-6 md:py-10">
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
              <ProductStatusBadge status={formValues.status} />
            </div>
          </div>
        </section>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <section className="rounded-[28px] border border-[#E6E6E6] bg-white p-5 md:p-7">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold tracking-[-0.02em] text-[#333333]">상품 이미지</h2>
                <p className="mt-1 text-sm text-[#777777]">
                  기존 이미지를 유지하거나 새 이미지로 변경할 수 있어요.
                </p>
              </div>

              <Camera size={22} className="text-[#6B8A58]" />
            </div>

            <div className="mt-5">
              {imagePreview ? (
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#FAFAF8] md:aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="상품 이미지 미리보기"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#4F6843] shadow-sm">
                    {isNewImage ? "새 이미지" : "기존 이미지"}
                  </div>

                  <button
                    type="button"
                    onClick={removeImage}
                    aria-label="이미지 삭제"
                    className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#333333] shadow-sm"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#D5D5D5] bg-[#FAFAF8] px-5 text-center transition hover:bg-[#F5F5F2] md:aspect-[4/3]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EDF3E9] text-[#4F6843]">
                    <ImagePlus size={28} />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-[#333333]">이미지 다시 업로드</p>

                  <p className="mt-2 text-xs leading-5 text-[#777777]">
                    클릭해서 상품 이미지를 선택해주세요.
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}

              {imagePreview && (
                <label className="mt-3 inline-flex h-10 cursor-pointer items-center justify-center rounded-full border border-[#D5D5D5] bg-white px-4 text-sm font-semibold text-[#333333] transition hover:bg-[#FAFAF8]">
                  이미지 변경하기
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}

              {errors.image && <p className="mt-2 text-sm text-[#E5484D]">{errors.image}</p>}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#E6E6E6] bg-white p-5 md:p-7">
            <h2 className="text-lg font-bold tracking-[-0.02em] text-[#333333]">상품 정보</h2>

            <div className="mt-5 space-y-5">
              <div>
                <label htmlFor="title" className="mb-2 block text-sm font-semibold text-[#333333]">
                  상품명
                </label>

                <input
                  id="title"
                  type="text"
                  value={formValues.title}
                  onChange={(event) => handleInputChange("title", event.target.value)}
                  placeholder="예: 아이패드 에어 5세대"
                  className="h-12 w-full rounded-xl border border-[#E6E6E6] bg-white px-4 text-sm outline-none placeholder:text-[#AAAAAA] focus:border-[#6B8A58]"
                />

                {errors.title && <p className="mt-2 text-sm text-[#E5484D]">{errors.title}</p>}
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-semibold text-[#333333]"
                >
                  카테고리
                </label>

                <div className="relative">
                  <select
                    id="category"
                    value={formValues.category}
                    onChange={(event) => handleInputChange("category", event.target.value)}
                    className="h-12 w-full appearance-none rounded-xl border border-[#E6E6E6] bg-white px-4 pr-10 text-sm outline-none focus:border-[#6B8A58]"
                  >
                    <option value="">카테고리를 선택해주세요</option>
                    {productCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#777777]"
                  />
                </div>

                {errors.category && (
                  <p className="mt-2 text-sm text-[#E5484D]">{errors.category}</p>
                )}
              </div>

              <div>
                <label htmlFor="price" className="mb-2 block text-sm font-semibold text-[#333333]">
                  가격
                </label>

                <div className="relative">
                  <input
                    id="price"
                    type="text"
                    inputMode="numeric"
                    value={formValues.price}
                    onChange={(event) =>
                      handleInputChange("price", event.target.value.replaceAll(",", ""))
                    }
                    placeholder="가격을 입력해주세요"
                    className="h-12 w-full rounded-xl border border-[#E6E6E6] bg-white px-4 pr-10 text-sm outline-none placeholder:text-[#AAAAAA] focus:border-[#6B8A58]"
                  />

                  <span className="absolute top-1/2 right-4 -translate-y-1/2 text-sm font-semibold text-[#777777]">
                    원
                  </span>
                </div>

                {errors.price && <p className="mt-2 text-sm text-[#E5484D]">{errors.price}</p>}
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-semibold text-[#333333]"
                >
                  거래 지역
                </label>

                <div className="relative">
                  <input
                    id="location"
                    type="text"
                    value={formValues.location}
                    onChange={(event) => handleInputChange("location", event.target.value)}
                    placeholder="거래 지역을 입력해주세요"
                    className="h-12 w-full rounded-xl border border-[#E6E6E6] bg-white px-4 pl-11 text-sm outline-none placeholder:text-[#AAAAAA] focus:border-[#6B8A58]"
                  />

                  <MapPin
                    size={18}
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-[#6B8A58]"
                  />
                </div>

                {errors.location && (
                  <p className="mt-2 text-sm text-[#E5484D]">{errors.location}</p>
                )}
              </div>

              <div>
                <label htmlFor="status" className="mb-2 block text-sm font-semibold text-[#333333]">
                  거래 상태
                </label>

                <div className="relative">
                  <select
                    id="status"
                    value={formValues.status}
                    onChange={(event) => handleStatusChange(event.target.value as ProductStatus)}
                    className="h-12 w-full appearance-none rounded-xl border border-[#E6E6E6] bg-white px-4 pr-10 text-sm outline-none focus:border-[#6B8A58]"
                  >
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#777777]"
                  />
                </div>

                {errors.status && <p className="mt-2 text-sm text-[#E5484D]">{errors.status}</p>}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-[#333333]"
                >
                  상품 설명
                </label>

                <textarea
                  id="description"
                  value={formValues.description}
                  onChange={(event) => handleInputChange("description", event.target.value)}
                  placeholder="상품 상태, 사용 기간, 거래 희망 장소 등을 자세히 적어주세요."
                  rows={8}
                  className="w-full resize-none rounded-xl border border-[#E6E6E6] bg-white px-4 py-3 text-sm leading-6 outline-none placeholder:text-[#AAAAAA] focus:border-[#6B8A58]"
                />

                <div className="mt-2 flex items-center justify-between">
                  {errors.description ? (
                    <p className="text-sm text-[#E5484D]">{errors.description}</p>
                  ) : (
                    <p className="text-xs text-[#777777]">
                      수정한 내용은 저장 후 상세 페이지에 반영될 예정입니다.
                    </p>
                  )}

                  <span className="text-xs text-[#AAAAAA]">{formValues.description.length}자</span>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#E6E6E6] bg-white p-5 md:p-7">
            <h2 className="text-lg font-bold tracking-[-0.02em] text-[#333333]">수정 전 확인</h2>

            <ul className="mt-4 space-y-2 text-sm leading-6 text-[#777777]">
              <li>• 가격과 거래 상태가 현재 상황과 맞는지 확인해주세요.</li>
              <li>• 거래완료 상품은 목록에서 거래완료 배지로 표시됩니다.</li>
              <li>• 실제 저장 기능은 Supabase 연동 후 연결할 예정입니다.</li>
            </ul>
          </section>

          <div className="sticky bottom-0 -mx-5 border-t border-[#E6E6E6] bg-white p-4 md:static md:mx-0 md:border-0 md:bg-transparent md:p-0">
            <div className="mx-auto flex max-w-[960px] gap-3">
              <button
                type="button"
                className="flex h-12 w-14 items-center justify-center rounded-2xl border border-[#F3C1C3] bg-white text-[#E5484D] transition hover:bg-[#FFF5F5]"
                aria-label="상품 삭제"
              >
                <Trash2 size={19} />
              </button>

              <Link
                href={`/products/${product.id}`}
                className="flex h-12 w-24 items-center justify-center rounded-2xl border border-[#D5D5D5] bg-white text-sm font-semibold text-[#333333] transition hover:bg-[#FAFAF8]"
              >
                취소
              </Link>

              <button
                type="submit"
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#6B8A58] text-sm font-semibold text-white transition hover:bg-[#4F6843]"
              >
                <Save size={18} />
                수정 완료
              </button>
            </div>
          </div>
        </form>
      </main>

      <BottomNavigation />
    </div>
  );
}
