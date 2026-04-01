import {Button} from "@/components/ui/button";
import {useCartStore} from "@/features/cart/store";

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <div className="container-ohou py-20 text-center flex flex-col items-center h-full">
        <p className="text-xl font-bold">장바구니에 담긴 상품이 없어요</p>
        <p className="text-muted-foreground pb-2 text-md">원하는 상품을 담아보세요</p>
        <Button size="lg">상품 담으러 가기</Button>
      </div>
    );
  }

  return (
    <div className="container-ohou py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* 좌 :상품 리스트 */}
        <div className="flex-1 ">
          <div className="flex flex-col gap-4">
            {items.map((item) => {
              return (
                <div className="border border-border rounded-sm p-4">
                  <div className="flex gap-4">
                    {/* 상품 이미지 */}
                    <img src={item.image_url} alt={item.name} className="w-20 h-20 object-cover rounded-sm" />

                    {/* 상품 정보 */}
                    <div className="flex-1">
                      <div className="flex ">{item.name}</div>
                    </div>

                    {/* 수량 + 가격 */}
                    <div className="flex items-center">
                      <span className="px-3 text-sm">{item.quantity}</span>
                      <p className="font-bold"> {item.price}원</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* 우: 결제요약*/}
        <div className="lg:w-80 ">
          <div className="border border-border rounded-sm p-4 top-20">
            <div className="flex justify-between text-sm mb-2">
              <span>총 상품 금액</span>
              <span>0원</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>총 배송비</span>
              <span>0원</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>총 할인금액</span>
              <span>0원</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>결제 금액</span>
              <span className="text-2xl font-bold">0원</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
