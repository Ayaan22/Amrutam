import { ViewStyle, TextStyle } from 'react-native';
import { Theme } from '../../theme/ThemeContext';
import { ButtonVariant, ButtonSize } from './Button.types';

export const createStyles = (theme: Theme) => {
  const { colors, spacing, radius, typography } = theme;

  const sizeContainerStyles: Record<ButtonSize, ViewStyle> = {
    small: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      minHeight: 32,
      borderRadius: radius.sm,
    },
    medium: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      minHeight: 44,
      borderRadius: radius.md,
    },
    large: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      minHeight: 52,
      borderRadius: radius.lg,
    },
  };

  const sizeTextStyles: Record<ButtonSize, TextStyle> = {
    small: {
      ...typography.bodySmall,
      fontWeight: '600',
    },
    medium: {
      ...typography.body,
      fontWeight: '600',
    },
    large: {
      ...typography.body,
      fontSize: 16,
      lineHeight: 22,
      fontWeight: '700',
    },
  };

  const variantContainerStyles: Record<ButtonVariant, ViewStyle> = {
    primary: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      borderWidth: 1,
    },
    secondary: {
      backgroundColor: colors.primaryLight,
      borderColor: colors.primaryLight,
      borderWidth: 1,
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: colors.primary,
      borderWidth: 1.5,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderWidth: 0,
      paddingHorizontal: spacing.xs,
    },
    text: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderWidth: 0,
      paddingHorizontal: spacing.xs,
    },
    danger: {
      backgroundColor: colors.error,
      borderColor: colors.error,
      borderWidth: 1,
    },
  };

  const variantTextStyles: Record<ButtonVariant, TextStyle> = {
    primary: {
      color: colors.textInverse,
    },
    secondary: {
      color: colors.primaryDark,
    },
    outline: {
      color: colors.primary,
    },
    ghost: {
      color: colors.primary,
    },
    text: {
      color: colors.primary,
    },
    danger: {
      color: colors.textInverse,
    },
  };

  const disabledContainerStyles: Record<ButtonVariant, ViewStyle> = {
    primary: {
      backgroundColor: colors.border,
      borderColor: colors.border,
    },
    secondary: {
      backgroundColor: colors.borderLight,
      borderColor: colors.borderLight,
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: colors.border,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    text: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    danger: {
      backgroundColor: colors.border,
      borderColor: colors.border,
    },
  };

  const disabledTextStyles: Record<ButtonVariant, TextStyle> = {
    primary: {
      color: colors.textMuted,
    },
    secondary: {
      color: colors.textMuted,
    },
    outline: {
      color: colors.textMuted,
    },
    ghost: {
      color: colors.textMuted,
    },
    text: {
      color: colors.textMuted,
    },
    danger: {
      color: colors.textMuted,
    },
  };

  return {
    baseContainer: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    fullWidth: {
      width: '100%' as const,
    },
    iconGap: {
      marginHorizontal: spacing.xs,
    },
    sizeContainers: sizeContainerStyles,
    sizeTexts: sizeTextStyles,
    variantContainers: variantContainerStyles,
    variantTexts: variantTextStyles,
    disabledContainers: disabledContainerStyles,
    disabledTexts: disabledTextStyles,
  };
};
