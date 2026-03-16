// Supabase 클라이언트 설정
import {createClient} from "@supabase/supabase-js";

export const createSupabaseClient = (url: string, anonKey: string) => {
  return createClient(url, anonKey);
};
