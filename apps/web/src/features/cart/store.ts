import type {Product} from "@ohou/shared";
import {create} from "zustand";
import {persist} from "zustand/middleware";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  add: (product: Product, quantity?: number) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      add: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === product.id);
          // 있는 상품이면 수량만 증가
          if (existing) {
            return {
              items: state.items.map((i) => (i.productId === product.id ? {...i, quantity: i.quantity + quantity} : i)),
            };
          }

          // 없는 상품이면 저장
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                name: product.name,
                price: product.price,
                image_url: product.image_url,
                quantity,
              },
            ],
          };
        }),
    }),
    {name: "ohou-cart"},
  ),
);
