import {Carousel, type CarouselApi, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useEffect, useState, type ReactNode} from "react";

interface SectionCarouselProps {
  items: ReactNode[];
}

export function SectionCarousel({items}: SectionCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const updateButtons = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    updateButtons();
    api.on("select", updateButtons);
    api.on("reInit", updateButtons);

    return () => {
      api.off("select", updateButtons);
      api.off("reInit", updateButtons);
    };
  }, [api]);

  return (
    <div className="relative ">
      {/* 왼쪽 화살표 */}
      <div className="shrink-0 w-10">
        {canScrollPrev && (
          <button
            onClick={() => api?.scrollPrev()}
            className="absolute -left-4 top-1/2  -translate-y-1/2 z-10  w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center
  hover:bg-gray-50 ">
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
      </div>
      <Carousel setApi={setApi} opts={{align: "start", slidesToScroll: "auto", duration: 45}} className="flex-1">
        <CarouselContent>
          {items.map((item, i) => (
            <CarouselItem key={i} className="basis-1/3 md:basis-1/4 lg:basis-1/6">
              {item}
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* 오른쪽 화살표 */}
        <div className="shrink-0 w-10">
          {canScrollNext && (
            <button
              onClick={() => api?.scrollNext()}
              className=" absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center
  hover:bg-gray-50">
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>
      </Carousel>
    </div>
  );
}
