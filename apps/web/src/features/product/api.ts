import {supabase} from "@/lib/supabase";
import type {Product} from "@ohou/shared";

// 전체 상품 조회
export async function fetchProducts() {
  const {data, error} = await supabase.from("products").select("*").order("created_at", {ascending: false});
  if (error) throw error;
  return data as Product[];
}

// 단일 상품 조회
export async function fetchProduct(id: string) {
  const {data, error} = await supabase.from("products").select("*").eq("id", id).single();
  if (error) throw error;
  return data as Product;
}
