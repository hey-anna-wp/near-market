export type ProductStatus = "selling" | "reserved" | "sold";

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  status: ProductStatus;
  imageUrl: string;
  sellerId: string;
  sellerName: string;
  likeCount: number;
  chatCount: number;
  createdAt: string;
  updatedAt: string;
};
