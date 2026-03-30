import {supabase} from "@/lib/supabase";
import {getDeviceId} from "@/shared/lib/deviceId";

const deviceId = getDeviceId();

// 내 북마크 목록 조회
export async function fetchBookmarks() {
  const {data, error} = await supabase.from("bookmarks").select("product_id").eq("device_id", deviceId);
  if (error) throw error;
  return data.map((b) => b.product_id) as string[];
}

// 내 포스트 북마크 목록 조회
export async function fetchPostBookmarks() {
  const {data, error} = await supabase.from("bookmarks").select("post_id").eq("device_id", deviceId);
  if (error) throw error;
  return data.map((b) => b.post_id).filter(Boolean) as string[];
}

// 북마크 여부 확인
export async function isBookmarked(productId: string) {
  const {data} = await supabase
    .from("bookmarks")
    .select("id")
    .eq("device_id", deviceId)
    .eq("product_id", productId)
    .single();
  return !!data;
}

// 포스트 북마크 여부 확인
export async function isPostBookmarked(postId: string) {
  const {data} = await supabase
    .from("bookmarks")
    .select("id")
    .eq("device_id", deviceId)
    .eq("post_id", postId)
    .single();
  return !!data;
}

// 북마크 추가
export async function addBookmark(productId: string) {
  const {error} = await supabase.from("bookmarks").insert({device_id: deviceId, product_id: productId});
  if (error) throw error;
}

// 포스트 북마크 추가
export async function addPostBookmark(postId: string) {
  const {error} = await supabase.from("bookmarks").insert({device_id: deviceId, post_id: postId});
  if (error) throw error;
}

// 북마크 삭제
export async function removeBookmark(productId: string) {
  const {error} = await supabase.from("bookmarks").delete().eq("device_id", deviceId).eq("product_id", productId);
  if (error) throw error;
}

// 포스트 북마크 삭제
export async function removePostBookmark(postId: string) {
  const {error} = await supabase.from("bookmarks").delete().eq("device_id", deviceId).eq("post_id", postId);
  if (error) throw error;
}

// 북마크 토글
export async function toggleBookmark(productId: string) {
  const bookmarked = await isBookmarked(productId);
  if (bookmarked) {
    await removeBookmark(productId);
  } else {
    await addBookmark(productId);
  }
  return !bookmarked;
}

// 포스트 북마크 토글
export async function togglePostBookmark(postId: string) {
  const bookmarked = await isPostBookmarked(postId);
  if (bookmarked) {
    await removePostBookmark(postId);
  } else {
    await addPostBookmark(postId);
  }
  return !bookmarked;
}
