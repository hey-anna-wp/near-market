"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProduct } from "@/features/products/api/products.service";
import { uploadProductImage } from "@/features/products/api/products.storage";
import type { ProductFormSubmitValues } from "@/features/products/types/product-form";

export function useCreateProduct() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: ProductFormSubmitValues) => {
      if (!values.imageFile) {
        throw new Error("상품 이미지를 선택해주세요.");
      }

      const imageUrl = await uploadProductImage(values.imageFile);

      return createProduct({
        title: values.title,
        description: values.description,
        price: values.price,
        category: values.category,
        location: values.location,
        status: values.status,
        image_url: imageUrl,
        seller_id: "temp-user",
        seller_name: "동네이웃",
        like_count: 0,
        chat_count: 0,
      });
    },

    onSuccess: async (product) => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      router.push(`/products/${product.id}`);
    },

    onError: (error) => {
      console.error(error);
      alert("상품 등록에 실패했습니다.");
    },
  });
}
