import {Button} from "@/components/ui/button";
import {useCartStore} from "@/features/cart/store";
import {fetchProduct} from "@/features/product/api";
import type {Product} from "@ohou/shared";
import {Minus, Plus} from "lucide-react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function ProductDetailPage() {
  const {id} = useParams<{id: string}>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const add = useCartStore((state) => state.add);

  useEffect(() => {
    if (id) {
      fetchProduct(id).then(setProduct);
    }
  }, [id]);

  if (!product) return <div className="container-ohou py-10 text-center">로딩 중...</div>;

  const handleAddToCart = () => {
    add(product, quantity);
    alert(`${product.name}이(가) 장바구니에 담겼습니다.`);
  };

  return (
    <div className="container-ohou py-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* 상품 이미지 */}
        <div className="md:w-1/2">
          <div className="aspect-square rounded-sm overflow-hidden bg-gray-300">
            <img src="" alt="이미지" className=" w-full h-full object-cover" />
          </div>
        </div>

        {/* 상품 정보 */}
        <div className="md:w-1/2">
          <h1 className="text-xl font-bold">{product?.name}</h1>
          {/* 가격 */}
          <div>
            <span>{product?.price}원</span>
          </div>
          {/* 설명 */}
          <div>{product?.description}</div>
          {/* 수량 선택 */}
          <div className="flex items-center gap-3">
            <span>수량</span>
            <div className="flex items-center border border-border rounded-sm">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                <Minus />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>
                <Plus />
              </button>
            </div>
          </div>
          {/* 주문 금액 */}
          {/* 장바구니 버튼 */}
          <div className="flex gap-5">
            <Button variant="outline" onClick={handleAddToCart}>
              장바구니
            </Button>
            <Button>바로구매</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
