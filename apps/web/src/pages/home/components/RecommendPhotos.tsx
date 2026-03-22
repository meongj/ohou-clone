import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {BookmarkIcon} from "lucide-react";
import {Link} from "react-router-dom";
import {SectionCarousel} from "./SectionCarousel";

const photos = [
  {id: 1, image: "/main-recommend/image1.avif", nickname: "퓌치", profile: "/main-recommend/profile1.avif"},
  {id: 2, image: "/main-recommend/image2.webp", nickname: "282house_", profile: "/main-recommend/default_profile.png"},
  {id: 3, image: "/main-recommend/image3.avif", nickname: "옐로우동동", profile: "/main-recommend/default_profile.png"},
  {id: 4, image: "/main-recommend/image3.avif", nickname: "옐로우동동", profile: "/main-recommend/default_profile.png"},
  {id: 5, image: "/main-recommend/image3.avif", nickname: "옐로우동동", profile: "/main-recommend/default_profile.png"},
  {id: 6, image: "/main-recommend/image3.avif", nickname: "옐로우동동", profile: "/main-recommend/default_profile.png"},
  {id: 7, image: "/main-recommend/image3.avif", nickname: "옐로우동동", profile: "/main-recommend/default_profile.png"},
  {id: 8, image: "/main-recommend/image3.avif", nickname: "옐로우동동", profile: "/main-recommend/default_profile.png"},
  {id: 9, image: "/main-recommend/image3.avif", nickname: "옐로우동동", profile: "/main-recommend/default_profile.png"},
  {
    id: 10,
    image: "/main-recommend/image3.avif",
    nickname: "옐로우동동",
    profile: "/main-recommend/default_profile.png",
  },
  {
    id: 11,
    image: "/main-recommend/image3.avif",
    nickname: "옐로우동동",
    profile: "/main-recommend/default_profile.png",
  },
  {
    id: 12,
    image: "/main-recommend/image3.avif",
    nickname: "옐로우동동",
    profile: "/main-recommend/default_profile.png",
  },
];

export function RecommendPhotos() {
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
        items={photos.map((photo) => (
          <div className="group cursor-pointer relative">
            <div className="aspect-3/4 rounded-sm overflow-hidden">
              <img
                src={photo.image}
                alt={photo.nickname}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center gap-1.5 mt-2 absolute bottom-2 left-2 right-2">
              <div className="flex justify-between w-full">
                <div className="flex gap-1  items-center">
                  <Avatar className="w-5 h-5">
                    <AvatarImage src={photo.profile} />
                    <AvatarFallback>{photo.nickname[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-white font-bold text-xs">{photo.nickname}</span>
                </div>

                <div className="flex">
                  <BookmarkIcon className="text-white" />
                </div>
              </div>
            </div>
          </div>
        ))}
      />
    </div>
  );
}
