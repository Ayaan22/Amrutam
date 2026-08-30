export type ProductCategory =
  | 'All'
  | 'Hair Care'
  | 'Skin Care'
  | 'Digestive'
  | 'Immunity'
  | 'Stress & Sleep'
  | 'Joint Care';

export type SortOption =
  | 'featured'
  | 'price_asc'
  | 'price_desc'
  | 'rating';

export interface ProductFilterState {
  categories: ProductCategory[];
  doshas: string[];
  inStockOnly: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  badge?: string;
  inStock: boolean;
  volume: string;
  keyIngredients: string[];
  benefits: string[];
  description: string;
  dosage: string;
  doshaSuitability: string[];
}
