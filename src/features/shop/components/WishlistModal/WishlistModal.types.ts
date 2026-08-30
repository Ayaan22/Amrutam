import { Product } from '../../types';

export interface WishlistModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}
