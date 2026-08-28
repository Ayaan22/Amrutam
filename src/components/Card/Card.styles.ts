import { StyleSheet, ViewStyle } from 'react-native';
import { Theme } from '../../theme/ThemeContext';
import { CardVariant } from './Card.types';

export const createStyles = (theme: Theme) => {
  const { colors, spacing, radius, elevation } = theme;

  const variantStyles: Record<CardVariant, ViewStyle> = {
    default: {
      backgroundColor: colors.surface,
      borderColor: colors.borderLight,
      borderWidth: 1,
    },
    outlined: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1.5,
    },
    elevated: {
      backgroundColor: colors.surfaceElevated,
      ...elevation.md,
    },
  };

  return StyleSheet.create({
    base: {
      borderRadius: radius.md,
      padding: spacing.lg,
      overflow: 'hidden',
    },
    default: variantStyles.default,
    outlined: variantStyles.outlined,
    elevated: variantStyles.elevated,
  });
};
