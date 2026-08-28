import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Theme } from '../../theme/ThemeContext';
import { ButtonVariant, ButtonSize } from './Button.types';

export const createStyles = (theme: Theme) => {
  const { colors, spacing, radius, typography } = theme;

  const sizeContainerStyles: Record<ButtonSize, ViewStyle> = {
    small: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      minHeight: 36,
      borderRadius: radius.sm,
    },
    medium: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      minHeight: 46,
      borderRadius: radius.md,
    },
    large: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      minHeight: 54,
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
