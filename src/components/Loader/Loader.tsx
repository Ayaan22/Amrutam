import React, { memo } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useTheme } from '../../theme';
import { LoaderProps } from './Loader.types';
import { createStyles } from './Loader.styles';

export const Loader: React.FC<LoaderProps> = memo(({
  fullScreen = false,
  size = 'large',
  color,
  message,
  style,
  testID,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const loaderColor = color || theme.colors.primary;

  return (
    <View
      testID={testID}
      accessibilityRole="progressbar"
      accessibilityLabel={message || 'Loading'}
      style={[
        fullScreen ? styles.fullScreen : styles.container,
        style,
      ]}
    >
      <ActivityIndicator size={size} color={loaderColor} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
});

Loader.displayName = 'Loader';
