import React, { memo } from 'react';
import { Pressable, Text, ActivityIndicator, View } from 'react-native';
import { useTheme } from '../../theme';
import { ButtonProps } from './Button.types';
import { createStyles } from './Button.styles';

export const Button: React.FC<ButtonProps> = memo(({
  title,
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  ...rest
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const isInteractive = !disabled && !loading;

  const containerStyle = [
    styles.baseContainer,
    styles.sizeContainers[size],
    disabled ? styles.disabledContainers[variant] : styles.variantContainers[variant],
    fullWidth && styles.fullWidth,
    style,
  ];

  const textColor = disabled
    ? styles.disabledTexts[variant].color
    : styles.variantTexts[variant].color;

  const labelStyle = [
    styles.sizeTexts[size],
    disabled ? styles.disabledTexts[variant] : styles.variantTexts[variant],
    textStyle,
  ];

  return (
    <Pressable
      onPress={isInteractive ? onPress : undefined}
      disabled={!isInteractive}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{
        disabled: !isInteractive,
        busy: loading,
      }}
      style={({ pressed }) => [
        containerStyle,
        pressed && isInteractive && { opacity: 0.8 },
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={textColor}
        />
      ) : children ? (
        children
      ) : (
        <>
          {leftIcon && <View style={styles.iconGap}>{leftIcon}</View>}
          {title ? (
            <Text style={labelStyle} numberOfLines={1}>
              {title}
            </Text>
          ) : null}
          {rightIcon && <View style={styles.iconGap}>{rightIcon}</View>}
        </>
      )}
    </Pressable>
  );
});

Button.displayName = 'Button';
export default Button;
