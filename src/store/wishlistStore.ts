import { create } from 'zustand';
import { Product } from '@features/shop/types';
import { storage } from '../services/storage';

interface WishlistState {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  getWishlistCount: () => number;
}

const WISHLIST_STORAGE_KEY = 'amrutam_wishlist_items';

const loadWishlistFromStorage = (): Product[] => {
  try {
    const raw = storage.getString(WISHLIST_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Failed to load wishlist from MMKV', e);
  }
  return [];
};

const saveWishlistToStorage = (items: Product[]) => {
  try {
    storage.set(WISHLIST_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn('Failed to save wishlist to MMKV', e);
  }
};

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: loadWishlistFromStorage(),

  toggleWishlist: (product: Product) => {
    set((state) => {
      const exists = state.items.some((item) => item.id === product.id);
      let updated: Product[];
      if (exists) {
        updated = state.items.filter((item) => item.id !== product.id);
      } else {
        updated = [product, ...state.items];
      }
      saveWishlistToStorage(updated);
      return { items: updated };
    });
  },

  isInWishlist: (productId: string) => {
    return get().items.some((item) => item.id === productId);
  },

  removeFromWishlist: (productId: string) => {
    set((state) => {
      const updated = state.items.filter((item) => item.id !== productId);
      saveWishlistToStorage(updated);
      return { items: updated };
    });
  },

  clearWishlist: () => {
    saveWishlistToStorage([]);
    set({ items: [] });
  },

  getWishlistCount: () => {
    return get().items.length;
  },
}));

export default useWishlistStore;
