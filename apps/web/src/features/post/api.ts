import {supabase} from "@/lib/supabase";
import type {Post} from "@ohou/shared";

// 전체 커뮤니티 포스트 조회
export async function fetchPosts() {
  const {data, error} = await supabase.from("posts").select("*").order("created_at", {ascending: false});
  if (error) throw error;
  return data as Post[];
}

// 단일 커뮤니티 포스트 조회
export async function fetchPost(id: string) {
  const {data, error} = await supabase.from("posts").select("*").eq("id", id).single();
  if (error) throw error;
  return data as Post;
}

