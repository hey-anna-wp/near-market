import type { Product } from "@/features/products/types/product";

export type ProductRow = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  status: Product["status"];
  image_url: string;
  seller_id: string;
  seller_name: string;
  like_count: number;
  chat_count: number;
  created_at: string;
  updated_at: string;
};
