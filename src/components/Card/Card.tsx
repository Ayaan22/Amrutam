import React, { memo } from 'react';
import { View, Pressable } from 'react-native';
import { useTheme } from '../../theme';
import { CardProps } from './Card.types';
import { createStyles } from './Card.styles';

export const Card: React.FC<CardProps> = memo(({
  children,
  variant = 'default',
  onPress,
  disabled = false,
  style,
  accessibilityLabel,
  testID,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const cardStyle = [styles.base, styles[variant], style];

  if (onPress) {
    return (
      <Pressable
        onPress={disabled ? undefined : onPress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled }}
        testID={testID}
        style={({ pressed }) => [
          cardStyle,
          pressed && !disabled && { opacity: 0.92 },
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View
      style={cardStyle}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      {children}
    </View>
  );
});

Card.displayName = 'Card';
