import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {useEffect, useState} from "react";

const sideCards = [
  {
    id: 1,
    image: "/banner1.avif",
    title: "오늘의집 키친 GRAND OPEN",
  },
  {
    id: 2,
    image: "/banner2.avif",
    title: "봄맞이 인테리어 특가",
  },
  {
    id: 3,
    image: "/banner3.avif",
    title: "신규 가입 혜택 모음",
  },
];

export default function HeroBanner() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const total = sideCards.length;

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="container-ohou  pt-6 aspect-21/9 ">
      <div className="flex gap-4  ">
        {/* 좌측 큰 이미지 */}
        <div className="w-3/4 relative rounded-sm overflow-hidden  aspect-2/1">
          <img
            src="/mainBanner.avif"
            alt="메인 배너"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          />

          <div className="absolute bottom-10 left-7 text-white">
            <h2 className="text-3xl font-bold mb-2">블랙 말곤 출입금지🖤 지독한 블랙 러버의 집 털어보기</h2>
            <div className="flex gap-1 items-center">
              <Avatar size="sm">
                <AvatarImage src="/profile.avif" alt="프로필 사진" />
                <AvatarFallback>프로필사진</AvatarFallback>
              </Avatar>
              <span className="text-sm">옥냥s2</span>
            </div>
          </div>
        </div>

        {/*우측 작은 캐러셀 */}
        <div className="w-1/4 hidden md:block ">
          <Carousel
            setApi={setApi}
            opts={{loop: true}}
            className="group h-full relative"
            plugins={[Autoplay({delay: 5000, stopOnInteraction: false})]}>
            <CarouselContent className="h-full">
              {sideCards.map((card) => (
                <CarouselItem key={card.id} className="basic-full h-full">
                  <div className="relative h-full rounded-sm overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* 페이지 인디케이터 */}
            <div className="absolute bottom-3 right-3 bg-black/50 rounded-full px-2 py-1 text-white  font-bold">
              {current}/{total} +
            </div>
            <CarouselPrevious
              size="icon"
              className="-left-6 size-14 opacity-0 group-hover:opacity-100 transition-opacity "
            />
            {/* 이전 버튼 */}
            <CarouselNext
              size="icon"
              className="-right-6 size-14 opacity-0 group-hover:opacity-100 transition-opacity"
            />
            {/* 다음 버튼 */}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
