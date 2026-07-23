import { supabase } from "@/lib/supabase/client";
import { mapProductRow } from "./products.adapter";
import type { ProductRow } from "./products.types";

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
