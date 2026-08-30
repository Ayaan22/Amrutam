import { ReactNode } from 'react';
import { StyleProp, ViewStyle, GestureResponderEvent, AccessibilityRole } from 'react-native';

export type CardVariant = 'default' | 'outlined' | 'elevated';

export interface CardProps {
  children?: ReactNode;
  variant?: CardVariant;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
  testID?: string;
}
