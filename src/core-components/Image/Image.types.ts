import {
  StyleProp,
  ViewStyle,
  ImageStyle,
  ImageResizeMode,
  ImageSourcePropType,
  ImageProps as RNImageProps,
} from 'react-native';

export type ImagePriority = 'low' | 'normal' | 'high';
export type ImageContentFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down' | 'center';

export interface ImageProps extends Omit<RNImageProps, 'source' | 'style' | 'defaultSource'> {
  uri?: string;
  source?: ImageSourcePropType | string;
  thumbnailSource?: ImageSourcePropType | string;
  defaultSource?: ImageSourcePropType | string;
  placeholder?: ImageSourcePropType | string;
  resizeMode?: ImageResizeMode;
  contentFit?: ImageContentFit;
  priority?: ImagePriority;
  borderRadius?: number;
  showLoader?: boolean;
  style?: StyleProp<ViewStyle | ImageStyle>;
  testID?: string;
  accessibilityLabel?: string;
}
