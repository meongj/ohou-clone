import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {BookmarkIcon, ChevronRight} from "lucide-react";
import {Link} from "react-router-dom";
import {SectionCarousel} from "./SectionCarousel";
import type {Post} from "@ohou/shared";
import {fetchPosts} from "@/features/post/api";
import {useQuery} from "@tanstack/react-query";
import { usePostBookmarks } from "@/features/bookmark/usePostBookmarks";

export function RecommendPhotos() {

  // 커뮤니티 포스트 + 북마크 데이터 로딩
  const {data: posts} = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const {bookmarkedIds, toggleBookmark}=usePostBookmarks();

 
  return (
    <div className="container-ohou py-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold">이런 사진 찾고 있나요?</h2>
          <p className="text-sm ">좋아하실 만한 인테리어 콘텐츠를 추천해드려요</p>
        </div>
        <Link to="/community" className="text-sm text-primary flex items-center">
          더보기
        </Link>
      </div>

      {/* 사진 그리드 */}
      <SectionCarousel
        items={[
          ...(posts ?? []).map((post) => (
            <div key={post.id} className="group cursor-pointer relative">
              <div className="aspect-3/4 rounded-sm overflow-hidden">
                <img
                  src={post.image_url}
                  alt={post.nickname}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-1.5 mt-2 absolute bottom-2 left-2 right-2">
                <div className="flex justify-between w-full">
                  <div className="flex gap-1  items-center">
                    <Avatar className="w-5 h-5">
                      <AvatarImage src={post.avatar_url ?? undefined} />
                      <AvatarFallback>{post.nickname[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-white font-bold text-xs">{post.nickname}</span>
                  </div>

                  <div className="flex">
                    <button type="button" onClick={() => toggleBookmark(post.id)} className="cursor-pointer">
                      <BookmarkIcon
                        className={bookmarkedIds.has(post.id) ? "text-primary fill-primary" : "text-white"}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )),
          // 마지막 더보기 카드
          <Link
            to="/community"
            key="more"
            className="flex flex-col items-center justify-center aspect-3/4 rounded-sm
   hover:bg-gray-50 transition-colors">
            <ChevronRight className="w-8 h-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground mt-2">더보기</span>
          </Link>,
        ]}
      />
    </div>
  );
}
