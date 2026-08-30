import { StyleProp, ViewStyle } from 'react-native';

export interface LoaderProps {
  fullScreen?: boolean;
  size?: 'small' | 'large';
  color?: string;
  message?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
