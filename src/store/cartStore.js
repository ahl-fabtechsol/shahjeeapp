// src/stores/cartStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      totalItems: 0,

      addToCart: (product, seller, quantity = 1) => {
        const { cart, totalItems } = get();

        set({
          cart: [...cart, { product, seller, quantity }],
          totalItems: totalItems + quantity,
        });
      },

      increaseQuantity: (productId, sellerId) => {
        const { cart, totalItems } = get();
        const idx = cart.findIndex(
          (item) => item.product._id === productId && item.seller === sellerId
        );
        if (idx === -1) return;
        const updated = cart.map((item, i) =>
          i === idx ? { ...item, quantity: item.quantity + 1 } : item
        );
        set({
          cart: updated,
          totalItems: totalItems + 1,
        });
      },

      decreaseQuantity: (productId, sellerId) => {
        const { cart, totalItems } = get();
        const idx = cart.findIndex(
          (item) => item.product._id === productId && item.seller === sellerId
        );
        if (idx === -1) return;

        const entry = cart[idx];
        if (entry.quantity > 1) {
          const updated = cart.map((item, i) =>
            i === idx ? { ...item, quantity: item.quantity - 1 } : item
          );
          set({
            cart: updated,
            totalItems: totalItems - 1,
          });
        } else {
          set({
            cart: cart.filter(
              (item) =>
                !(item.product._id === productId && item.seller === sellerId)
            ),
            totalItems: totalItems - 1,
          });
        }
      },

      clearCart: () => set({ cart: [], totalItems: 0 }),
    }),
    {
      name: "cart-storage",
      getStorage: () => localStorage,
    }
  )
);
