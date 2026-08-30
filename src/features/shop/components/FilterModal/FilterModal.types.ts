import { SortOption, ProductFilterState } from '../../types';

export interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: ProductFilterState;
  sortOption: SortOption;
  onApply: (filters: ProductFilterState, sort: SortOption) => void;
  onReset: () => void;
}
