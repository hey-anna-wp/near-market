import type { ProductFormErrors, ProductFormValues } from "@/features/products/types/product-form";

const DIGITS_ONLY_PATTERN = /^\d+$/;

const PRODUCT_FORM_ERROR_MESSAGES = {
  imageUrl: {
    required: "상품 이미지를 1장 이상 등록해주세요.",
  },
  title: {
    minLength: "상품명은 2자 이상 입력해주세요.",
  },
  category: {
    required: "카테고리를 선택해주세요.",
  },
  price: {
    required: "가격을 입력해주세요.",
    invalid: "가격은 숫자만 입력해주세요.",
    min: "가격은 1원 이상 입력해주세요.",
  },
  location: {
    required: "거래 지역을 입력해주세요.",
  },
  description: {
    minLength: "상품 설명은 5자 이상 입력해주세요.",
  },
} as const;

export function validateProductForm(
  values: ProductFormValues,
  imagePreview: string,
): ProductFormErrors {
  const errors: ProductFormErrors = {};

  const trimmedTitle = values.title.trim();
  const trimmedPrice = values.price.trim();
  const trimmedLocation = values.location.trim();
  const trimmedDescription = values.description.trim();

  if (!imagePreview) {
    errors.imageUrl = PRODUCT_FORM_ERROR_MESSAGES.imageUrl.required;
  }

  if (trimmedTitle.length < 2) {
    errors.title = PRODUCT_FORM_ERROR_MESSAGES.title.minLength;
  }

  if (!values.category) {
    errors.category = PRODUCT_FORM_ERROR_MESSAGES.category.required;
  }

  if (!trimmedPrice) {
    errors.price = PRODUCT_FORM_ERROR_MESSAGES.price.required;
  } else if (!DIGITS_ONLY_PATTERN.test(trimmedPrice)) {
    errors.price = PRODUCT_FORM_ERROR_MESSAGES.price.invalid;
  } else if (Number(trimmedPrice) < 1) {
    errors.price = PRODUCT_FORM_ERROR_MESSAGES.price.min;
  }

  if (!trimmedLocation) {
    errors.location = PRODUCT_FORM_ERROR_MESSAGES.location.required;
  }

  if (trimmedDescription.length < 5) {
    errors.description = PRODUCT_FORM_ERROR_MESSAGES.description.minLength;
  }

  return errors;
}
