import type { ProductStatus } from "./product";

export type ProductFormMode = "create" | "edit";

export type ProductFormValues = {
  title: string;
  category: string;
  price: string;
  location: string;
  description: string;
  status: ProductStatus;
  imageUrl: string;
};

export type ProductFormErrors = Partial<Record<keyof ProductFormValues, string>>;

export type ProductFormSubmitValues = {
  title: string;
  category: string;
  price: number;
  location: string;
  description: string;
  status: ProductStatus;
  imageUrl: string;
  imageFile: File | null;
};
