import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export type BadgeVariant = 'primary' | 'success' | 'warning' | 'error';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  testID?: string;
}
