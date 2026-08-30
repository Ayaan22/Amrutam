import React, { memo, useState, useCallback } from 'react';
import {
  View,
  ActivityIndicator,
  Image as RNImage,
  ImageSourcePropType,
  ImageResizeMode,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme';
import { ImageProps } from './Image.types';
import { createStyles } from './Image.styles';

export const Image: React.FC<ImageProps> = memo(({
  uri,
  source,
  thumbnailSource,
  defaultSource,
  placeholder,
  resizeMode,
  contentFit = 'cover',
  priority: _priority = 'normal',
  borderRadius,
  showLoader = false,
  style,
  testID,
  accessibilityLabel,
  ...rest
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
  }, []);

  const handleLoadEnd = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  const resolvedSource: ImageSourcePropType | null = source
    ? (typeof source === 'string' ? { uri: source } : source)
    : uri
    ? { uri }
    : null;

  const resolvedPlaceholder = placeholder || thumbnailSource || defaultSource;
  const placeholderSource: ImageSourcePropType | null = resolvedPlaceholder
    ? typeof resolvedPlaceholder === 'string'
      ? { uri: resolvedPlaceholder }
      : (resolvedPlaceholder as ImageSourcePropType)
    : null;

  const effectiveResizeMode: ImageResizeMode = resizeMode
    ? resizeMode
    : contentFit === 'contain'
    ? 'contain'
    : contentFit === 'center'
    ? 'center'
    : 'cover';

  return (
    <View
      style={[
        styles.container,
        borderRadius !== undefined ? { borderRadius } : undefined,
        style,
      ]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="image"
    >
      {!hasError && resolvedSource ? (
        <RNImage
          source={resolvedSource}
          resizeMode={effectiveResizeMode}
          onLoadStart={handleLoadStart}
          onLoad={handleLoadEnd}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
          style={[StyleSheet.absoluteFill, styles.image]}
          {...rest}
        />
      ) : placeholderSource ? (
        <RNImage
          source={placeholderSource}
          resizeMode={effectiveResizeMode}
          style={[StyleSheet.absoluteFill, styles.image]}
        />
      ) : (
        <View style={styles.fallbackContainer}>
          <MaterialCommunityIcons
            name="leaf"
            size={28}
            color={theme.colors.primary}
            style={styles.fallbackIcon}
          />
        </View>
      )}

      {showLoader && isLoading && !hasError && (
        <View style={styles.loaderOverlay} pointerEvents="none">
          <ActivityIndicator size="small" color={theme.colors.primary} />
        </View>
      )}
    </View>
  );
});

Image.displayName = 'Image';
export default Image;
