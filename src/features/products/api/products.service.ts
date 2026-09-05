import { supabase } from "@/lib/supabase/client";
import { mapProductRow } from "./products.adapter";
import type { CreateProductRow, ProductRow } from "./products.types";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data as ProductRow[]).map(mapProductRow);
}

export async function getProductById(id: string) {
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single();

  if (error) {
    throw new Error(error.message);
  }

  return mapProductRow(data as ProductRow);
}

export async function createProduct(values: CreateProductRow) {
  const { data, error } = await supabase.from("products").insert(values).select("*").single();

  if (error) {
    throw new Error(error.message);
  }

  return mapProductRow(data as ProductRow);
}
