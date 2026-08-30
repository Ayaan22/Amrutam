import { useCartStore } from '../cartStore';
import { Product } from '../../features/shop/types';

const mockProduct1: Product = {
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
  benefits: ['Strengthens hair roots', 'Prevents hair fall'],
  description: 'Authentic Ayurvedic hair oil prepared via classical Kshir Pak Vidhi.',
  dosage: 'Apply to scalp gently 2-3 times a week.',
  volume: '200ml',
  imageUrl: 'https://images.unsplash.com/photo-1608248597359-467612f00b95?w=500',
};

const mockProduct2: Product = {
  id: 'p2',
  name: 'Amrutam Brainkey Gold Malt',
  subtitle: 'Cognitive & Memory Tonic',
  category: 'Immunity',
  price: 899,
  originalPrice: 1049,
  discountPercentage: 14,
  rating: 4.9,
  reviewCount: 420,
  inStock: true,
  doshaSuitability: ['Vata', 'Kapha'],
  keyIngredients: ['Brahmi', 'Shankhpushpi', 'Ashwagandha'],
  benefits: ['Enhances memory focus', 'Reduces mental fatigue'],
  description: 'Traditional Ayurvedic jam formulation for cognitive vitality.',
  dosage: '1-2 tablespoons twice daily with warm milk.',
  volume: '400g',
  imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500',
};

describe('CartStore Unit Tests', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it('should initialize with an empty cart', () => {
    const state = useCartStore.getState();
    expect(state.items).toEqual([]);
    expect(state.getTotalCount()).toBe(0);
    expect(state.getTotalPrice()).toBe(0);
  });

  it('should add a product to cart with quantity 1 by default', () => {
    useCartStore.getState().addToCart(mockProduct1);

    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.items[0].product.id).toBe('p1');
    expect(state.items[0].quantity).toBe(1);
    expect(state.getTotalCount()).toBe(1);
    expect(state.getTotalPrice()).toBe(649);
  });

  it('should increment quantity when adding the same product again', () => {
    useCartStore.getState().addToCart(mockProduct1, 2);
    useCartStore.getState().addToCart(mockProduct1, 1);

    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(3);
    expect(state.getTotalCount()).toBe(3);
    expect(state.getTotalPrice()).toBe(649 * 3);
  });

  it('should update item quantity directly', () => {
    useCartStore.getState().addToCart(mockProduct1, 1);
    useCartStore.getState().updateQuantity('p1', 5);

    const state = useCartStore.getState();
    expect(state.items[0].quantity).toBe(5);
    expect(state.getTotalCount()).toBe(5);
  });

  it('should remove item from cart when quantity is updated to 0', () => {
    useCartStore.getState().addToCart(mockProduct1, 2);
    useCartStore.getState().updateQuantity('p1', 0);

    const state = useCartStore.getState();
    expect(state.items.length).toBe(0);
    expect(state.getTotalCount()).toBe(0);
  });

  it('should remove an item explicitly by productId', () => {
    useCartStore.getState().addToCart(mockProduct1);
    useCartStore.getState().addToCart(mockProduct2);
    expect(useCartStore.getState().items.length).toBe(2);

    useCartStore.getState().removeFromCart('p1');

    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.items[0].product.id).toBe('p2');
  });

  it('should clear all items in the cart', () => {
    useCartStore.getState().addToCart(mockProduct1);
    useCartStore.getState().addToCart(mockProduct2);
    useCartStore.getState().clearCart();

    expect(useCartStore.getState().items).toEqual([]);
    expect(useCartStore.getState().getTotalCount()).toBe(0);
  });
});
