import type { Product } from "@/features/products/types/product";
import type { ProductRow } from "./products.types";

export function mapProductRow(row: ProductRow): Product {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    price: row.price,
    category: row.category,
    location: row.location,
    status: row.status,
    imageUrl: row.image_url,
    sellerId: row.seller_id,
    sellerName: row.seller_name,
    likeCount: row.like_count,
    chatCount: row.chat_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
