import { useWishlistStore } from '../wishlistStore';
import { Product } from '../../features/shop/types';

const mockProduct: Product = {
  id: 'p1',
  name: 'Amrutam Kuntal Care Hair Oil',
  subtitle: 'Herbal Hair Revitalizer',
  category: 'Hair Care',
  price: 649,
  originalPrice: 799,
  discountPercentage: 18,
  rating: 4.8,
  reviewCount: 312,
  inStock: true,
  doshaSuitability: ['Vata', 'Pitta'],
  keyIngredients: ['Bhringraj', 'Amla', 'Brahmi'],
  benefits: ['Strengthens hair roots'],
  description: 'Authentic Ayurvedic hair oil.',
  dosage: 'Apply to scalp gently.',
  volume: '200ml',
  imageUrl: 'https://images.unsplash.com/photo-1608248597359-467612f00b95?w=500',
};

describe('WishlistStore Unit Tests', () => {
  beforeEach(() => {
    useWishlistStore.getState().clearWishlist();
  });

  it('should initialize with an empty wishlist', () => {
    const state = useWishlistStore.getState();
    expect(state.items).toEqual([]);
    expect(state.getWishlistCount()).toBe(0);
  });

  it('should toggle a product into wishlist', () => {
    useWishlistStore.getState().toggleWishlist(mockProduct);

    const state = useWishlistStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.isInWishlist('p1')).toBe(true);
    expect(state.getWishlistCount()).toBe(1);
  });

  it('should remove a product from wishlist by ID', () => {
    useWishlistStore.getState().toggleWishlist(mockProduct);
    expect(useWishlistStore.getState().isInWishlist('p1')).toBe(true);

    useWishlistStore.getState().removeFromWishlist('p1');

    const state = useWishlistStore.getState();
    expect(state.items.length).toBe(0);
    expect(state.isInWishlist('p1')).toBe(false);
  });

  it('should toggle product out of wishlist if already present', () => {
    useWishlistStore.getState().toggleWishlist(mockProduct);
    expect(useWishlistStore.getState().isInWishlist('p1')).toBe(true);

    useWishlistStore.getState().toggleWishlist(mockProduct);
    expect(useWishlistStore.getState().isInWishlist('p1')).toBe(false);
    expect(useWishlistStore.getState().getWishlistCount()).toBe(0);
  });

  it('should clear all wishlist items', () => {
    useWishlistStore.getState().toggleWishlist(mockProduct);
    useWishlistStore.getState().clearWishlist();

    expect(useWishlistStore.getState().items).toEqual([]);
    expect(useWishlistStore.getState().getWishlistCount()).toBe(0);
  });
});
