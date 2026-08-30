import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Edge, NativeSafeAreaViewProps } from 'react-native-safe-area-context';

export interface SurfaceProps extends Omit<NativeSafeAreaViewProps, 'style' | 'children'> {
  children?: ReactNode;
  edges?: Edge[];
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}
