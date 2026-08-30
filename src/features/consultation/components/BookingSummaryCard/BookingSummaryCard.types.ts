import { Animated } from 'react-native';
import { Booking } from '../../types';

export interface BookingSummaryCardProps {
  booking: Booking;
  fadeAnim: Animated.Value;
}
