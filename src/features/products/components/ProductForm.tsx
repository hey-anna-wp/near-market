"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Camera, ChevronDown, ImagePlus, Save, Trash2, X } from "lucide-react";
import { categories } from "@/constants/categories";
import type { Product, ProductStatus } from "@/features/products/types/product";
import type {
  ProductFormErrors,
  ProductFormMode,
  ProductFormSubmitValues,
  ProductFormValues,
} from "@/features/products/types/product-form";
import { validateProductForm } from "@/features/products/utils/validate-product-form";
import SectionHeader from "@/components/common/SectionHeader";

type ProductFormProps = {
  mode: ProductFormMode;
  initialProduct?: Product;
  onSubmit: (values: ProductFormSubmitValues) => void;
  onDelete?: () => void;
  isSubmitting?: boolean;
};

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

const productCategories = categories.filter((category) => category !== "전체");

const defaultFormValues: ProductFormValues = {
  title: "",
  category: "",
  price: "",
  location: "창원시 성산구",
  description: "",
  status: "selling",
  imageUrl: "",
};

function getInitialFormValues(product?: Product): ProductFormValues {
  if (!product) {
    return defaultFormValues;
  }

  return {
    title: product.title,
    category: product.category,
    price: String(product.price),
    location: product.location,
    description: product.description,
    status: product.status,
    imageUrl: product.imageUrl,
  };
}

export default function ProductForm({
  mode,
  initialProduct,
  onSubmit,
  onDelete,
  isSubmitting = false,
}: ProductFormProps) {
  const isEditMode = mode === "edit";

  const [formValues, setFormValues] = useState<ProductFormValues>(() =>
    getInitialFormValues(initialProduct),
  );

  const [errors, setErrors] = useState<ProductFormErrors>({});

  const [imagePreview, setImagePreview] = useState<string>(initialProduct?.imageUrl ?? "");

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [isNewImage, setIsNewImage] = useState(false);

  useEffect(() => {
    return () => {
      if (imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

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

  const handlePriceChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");

    handleInputChange("price", numericValue);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setImageFile(file);
    setImagePreview(previewUrl);
    setIsNewImage(true);

    setFormValues((prev) => ({
      ...prev,
      imageUrl: previewUrl,
    }));

    setErrors((prev) => ({
      ...prev,
      imageUrl: "",
    }));

    event.target.value = "";
  };

  const handleRemoveImage = () => {
    if (imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview("");
    setImageFile(null);
    setIsNewImage(false);

    setFormValues((prev) => ({
      ...prev,
      imageUrl: "",
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateProductForm(formValues, imagePreview);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSubmit({
      title: formValues.title.trim(),
      category: formValues.category,
      price: Number(formValues.price),
      location: formValues.location.trim(),
      description: formValues.description.trim(),
      status: formValues.status,
      imageUrl: formValues.imageUrl,
      imageFile,
    });
  };

  const cancelHref = isEditMode && initialProduct ? `/products/${initialProduct.id}` : "/products";

  const submitButtonText = isSubmitting ? "처리 중..." : isEditMode ? "수정 완료" : "등록하기";

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <section className="rounded-[28px] border border-[#E6E6E6] bg-white p-5 md:p-7">
        <SectionHeader
          title="상품 이미지"
          description={
            isEditMode
              ? "기존 이미지를 유지하거나 새 이미지로 변경할 수 있어요."
              : "대표 이미지를 등록해주세요."
          }
          action={<Camera size={22} className="text-[#6B8A58]" />}
        />

        <div className="mt-5">
          {imagePreview ? (
            <>
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#FAFAF8] md:aspect-[4/3]">
                <Image
                  src={imagePreview}
                  alt="상품 이미지 미리보기"
                  fill
                  unoptimized={imagePreview.startsWith("blob:")}
                  className="object-cover"
                />

                {isEditMode && (
                  <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#4F6843] shadow-sm">
                    {isNewImage ? "새 이미지" : "기존 이미지"}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleRemoveImage}
                  aria-label="이미지 삭제"
                  className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#333333] shadow-sm transition hover:bg-white"
                >
                  <X size={18} />
                </button>
              </div>

              <label className="mt-3 inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-full border border-[#D5D5D5] bg-white px-4 text-sm font-semibold text-[#333333] transition hover:bg-[#FAFAF8]">
                <Camera size={16} />
                이미지 변경하기
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </>
          ) : (
            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#D5D5D5] bg-[#FAFAF8] px-5 text-center transition hover:border-[#6B8A58] hover:bg-[#F4F7F2] md:aspect-[4/3]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EDF3E9] text-[#4F6843]">
                <ImagePlus size={28} />
              </div>

              <p className="mt-4 text-sm font-semibold text-[#333333]">이미지 업로드</p>

              <p className="mt-2 text-xs leading-5 text-[#777777]">
                클릭해서 상품 이미지를 선택해주세요.
              </p>

              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          )}

          {errors.imageUrl && <p className="mt-2 text-sm text-[#E5484D]">{errors.imageUrl}</p>}
        </div>
      </section>

      <section className="rounded-[28px] border border-[#E6E6E6] bg-white p-5 md:p-7">
        <SectionHeader title="상품 정보" />

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
            <label htmlFor="category" className="mb-2 block text-sm font-semibold text-[#333333]">
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

            {errors.category && <p className="mt-2 text-sm text-[#E5484D]">{errors.category}</p>}
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
                onChange={(event) => handlePriceChange(event.target.value)}
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
            <label htmlFor="location" className="mb-2 block text-sm font-semibold text-[#333333]">
              거래 지역
            </label>

            <input
              id="location"
              type="text"
              value={formValues.location}
              onChange={(event) => handleInputChange("location", event.target.value)}
              placeholder="예: 창원시 성산구"
              className="h-12 w-full rounded-xl border border-[#E6E6E6] bg-white px-4 text-sm outline-none placeholder:text-[#AAAAAA] focus:border-[#6B8A58]"
            />

            {errors.location && <p className="mt-2 text-sm text-[#E5484D]">{errors.location}</p>}
          </div>

          {isEditMode && (
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
          )}

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

            <div className="mt-2 flex items-center justify-between gap-4">
              {errors.description ? (
                <p className="text-sm text-[#E5484D]">{errors.description}</p>
              ) : (
                <p className="text-xs text-[#777777]">
                  구매자가 이해하기 쉽게 자세히 작성해주세요.
                </p>
              )}

              <span className="shrink-0 text-xs text-[#AAAAAA]">
                {formValues.description.length}자
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-[#E6E6E6] bg-white p-5 md:p-7">
        <SectionHeader title={isEditMode ? "수정 전 확인" : "등록 전 확인"} />

        <ul className="mt-4 space-y-2 text-sm leading-6 text-[#777777]">
          <li>• 실제 상품 사진을 등록해주세요.</li>
          <li>• 가격과 거래 지역을 정확히 입력해주세요.</li>

          {isEditMode ? (
            <li>• 거래 상태가 현재 상황과 맞는지 확인해주세요.</li>
          ) : (
            <li>• 등록 후 내 판매글에서 수정할 수 있습니다.</li>
          )}
        </ul>
      </section>

      <div className="sticky bottom-0 -mx-5 border-t border-[#E6E6E6] bg-white p-4 md:static md:mx-0 md:border-0 md:bg-transparent md:p-0">
        <div className="mx-auto flex max-w-[960px] gap-3">
          {isEditMode && onDelete && (
            <button
              type="button"
              onClick={onDelete}
              disabled={isSubmitting}
              aria-label="상품 삭제"
              className="flex h-12 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#F3C1C3] bg-white text-[#E5484D] transition hover:bg-[#FFF5F5] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 size={19} />
            </button>
          )}

          <Link
            href={cancelHref}
            className="flex h-12 w-24 shrink-0 items-center justify-center rounded-2xl border border-[#D5D5D5] bg-white text-sm font-semibold text-[#333333] transition hover:bg-[#FAFAF8]"
          >
            취소
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#6B8A58] text-sm font-semibold text-white transition hover:bg-[#4F6843] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={18} />

            {submitButtonText}
          </button>
        </div>
      </div>
    </form>
  );
}
