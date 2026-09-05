import { supabase } from "@/lib/supabase/client";

const PRODUCT_IMAGE_BUCKET = "product-images";

export async function uploadProductImage(file: File) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { error } = await supabase.storage.from(PRODUCT_IMAGE_BUCKET).upload(filePath, file);

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from(PRODUCT_IMAGE_BUCKET).getPublicUrl(filePath);

  return data.publicUrl;
}
