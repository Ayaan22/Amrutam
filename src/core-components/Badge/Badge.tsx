import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../theme';
import { BadgeProps } from './Badge.types';
import { createStyles } from './Badge.styles';

export const Badge: React.FC<BadgeProps> = memo(({
  label,
  variant = 'primary',
  style,
  textStyle,
  testID,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        styles.variantContainers[variant],
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          styles.variantTexts[variant],
          textStyle,
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
});

Badge.displayName = 'Badge';
