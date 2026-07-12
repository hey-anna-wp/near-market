"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Camera, ChevronDown, ImagePlus, MapPin, X } from "lucide-react";
import Header from "@/components/common/Header";
import BottomNavigation from "@/components/common/BottomNavigation";
import { categories } from "@/constants/categories";

type ProductFormValues = {
  title: string;
  category: string;
  price: string;
  location: string;
  description: string;
};

type ProductFormErrors = Partial<Record<keyof ProductFormValues | "image", string>>;

const initialFormValues: ProductFormValues = {
  title: "",
  category: "",
  price: "",
  location: "창원시 성산구",
  description: "",
};

export default function ProductNewPage() {
  const [formValues, setFormValues] = useState<ProductFormValues>(initialFormValues);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [errors, setErrors] = useState<ProductFormErrors>({});

  const productCategories = categories.filter((category) => category !== "전체");

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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    setErrors((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const removeImage = () => {
    setImagePreview("");
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
      ...formValues,
      price: Number(formValues.price),
      status: "selling",
      imagePreview,
    };

    console.log("상품 등록 데이터:", submitData);
    alert("현재는 더미 UI 단계입니다. 콘솔에서 등록 데이터를 확인해주세요.");
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] pb-20 md:pb-0">
      <Header />

      <main className="mx-auto w-full max-w-[960px] px-5 py-5 md:px-6 md:py-10">
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

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <section className="rounded-[28px] border border-[#E6E6E6] bg-white p-5 md:p-7">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold tracking-[-0.02em] text-[#333333]">상품 이미지</h2>
                <p className="mt-1 text-sm text-[#777777]">대표 이미지를 등록해주세요.</p>
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

                  <p className="mt-4 text-sm font-semibold text-[#333333]">이미지 업로드</p>

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
                      구매자가 이해하기 쉽게 자세히 작성해주세요.
                    </p>
                  )}

                  <span className="text-xs text-[#AAAAAA]">{formValues.description.length}자</span>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#E6E6E6] bg-white p-5 md:p-7">
            <h2 className="text-lg font-bold tracking-[-0.02em] text-[#333333]">등록 전 확인</h2>

            <ul className="mt-4 space-y-2 text-sm leading-6 text-[#777777]">
              <li>• 실제 상품 사진을 등록해주세요.</li>
              <li>• 가격과 거래 지역을 정확히 입력해주세요.</li>
              <li>• 등록 후에는 내 판매글에서 수정할 수 있습니다.</li>
            </ul>
          </section>

          <div className="sticky bottom-0 -mx-5 border-t border-[#E6E6E6] bg-white p-4 md:static md:mx-0 md:border-0 md:bg-transparent md:p-0">
            <div className="mx-auto flex max-w-[960px] gap-3">
              <Link
                href="/products"
                className="flex h-12 w-28 items-center justify-center rounded-2xl border border-[#D5D5D5] bg-white text-sm font-semibold text-[#333333] transition hover:bg-[#FAFAF8]"
              >
                취소
              </Link>

              <button
                type="submit"
                className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-[#6B8A58] text-sm font-semibold text-white transition hover:bg-[#4F6843]"
              >
                등록하기
              </button>
            </div>
          </div>
        </form>
      </main>

      <BottomNavigation />
    </div>
  );
}
