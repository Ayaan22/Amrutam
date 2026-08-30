import { ProductFilterState, SortOption, ProductCategory } from '../../types';

export interface FilterSortBarProps {
  filters: ProductFilterState;
  sortOption: SortOption;
  onOpenModal: () => void;
  onRemoveCategory: (category: ProductCategory) => void;
  onRemoveDosha: (dosha: string) => void;
  onToggleInStock: () => void;
}
