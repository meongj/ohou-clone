import {fetchProducts} from "@/features/product/api";
import type {Product} from "@ohou/shared";
import {useQuery} from "@tanstack/react-query";
import {SectionCarousel} from "./SectionCarousel";
import {useNavigate} from "react-router-dom";

export function BestProducts() {
  const navigate = useNavigate();

  const {data: products} = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const handleClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <div>
      <h1>베스트</h1>

      <SectionCarousel
        items={
          products?.map((product) => (
            <div onClick={() => handleClick(product.id)}>
              <img src={product.image_url} />
            </div>
          )) ?? []
        }
      />
    </div>
  );
}
