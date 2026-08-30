import { Animated } from 'react-native';

export interface OrderCelebrationHeaderProps {
  scaleAnim: Animated.Value;
  fadeAnim: Animated.Value;
  isOfflineQueued?: boolean;
}
