import { create } from 'zustand';
import { Product } from '@features/shop/types';
import { storage } from '../services/storage';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalCount: () => number;
}

const CART_STORAGE_KEY = 'amrutam_cart_items';

const loadCartFromStorage = (): CartItem[] => {
  try {
    const raw = storage.getString(CART_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Failed to load cart from MMKV', e);
  }
  return [];
};

const saveCartToStorage = (items: CartItem[]) => {
  try {
    storage.set(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn('Failed to save cart to MMKV', e);
  }
};

export const useCartStore = create<CartState>((set, get) => ({
  items: loadCartFromStorage(),

  addToCart: (product: Product, quantity: number = 1) => {
    set((state) => {
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );

      let updatedItems: CartItem[];
      if (existingIndex >= 0) {
        updatedItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedItems = [...state.items, { product, quantity }];
      }

      saveCartToStorage(updatedItems);
      return { items: updatedItems };
    });
  },

  removeFromCart: (productId: string) => {
    set((state) => {
      const updatedItems = state.items.filter(
        (item) => item.product.id !== productId
      );
      saveCartToStorage(updatedItems);
      return { items: updatedItems };
    });
  },

  updateQuantity: (productId: string, quantity: number) => {
    set((state) => {
      let updatedItems: CartItem[];
      if (quantity <= 0) {
        updatedItems = state.items.filter(
          (item) => item.product.id !== productId
        );
      } else {
        updatedItems = state.items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        );
      }
      saveCartToStorage(updatedItems);
      return { items: updatedItems };
    });
  },

  clearCart: () => {
    saveCartToStorage([]);
    set({ items: [] });
  },

  getTotalPrice: () => {
    const { items } = get();
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },

  getTotalCount: () => {
    const { items } = get();
    return items.reduce((count, item) => count + item.quantity, 0);
  },
}));

export default useCartStore;
