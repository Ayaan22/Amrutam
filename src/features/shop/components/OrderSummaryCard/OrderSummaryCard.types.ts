import { Animated } from 'react-native';

export interface OrderSummaryCardProps {
  fadeAnim: Animated.Value;
  orderId: string;
  itemCount: number;
  totalAmount: number;
}
