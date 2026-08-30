import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onActionPress?: () => void;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
