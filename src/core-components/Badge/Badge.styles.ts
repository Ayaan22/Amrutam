import { ViewStyle, TextStyle } from 'react-native';
import { Theme } from '../../theme/ThemeContext';
import { BadgeVariant } from './Badge.types';

export const createStyles = (theme: Theme) => {
  const { colors, spacing, radius, typography } = theme;

  const variantContainerStyles: Record<BadgeVariant, ViewStyle> = {
    primary: {
      backgroundColor: colors.primaryLight,
      borderColor: colors.primary,
    },
    success: {
      backgroundColor: colors.successLight,
      borderColor: colors.success,
    },
    warning: {
      backgroundColor: colors.warningLight,
      borderColor: colors.warning,
    },
    error: {
      backgroundColor: colors.errorLight,
      borderColor: colors.error,
    },
  };

  const variantTextStyles: Record<BadgeVariant, TextStyle> = {
    primary: {
      color: colors.primary,
    },
    success: {
      color: colors.success,
    },
    warning: {
      color: colors.warning,
    },
    error: {
      color: colors.error,
    },
  };

  return {
    container: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      alignSelf: 'flex-start' as const,
      paddingVertical: spacing.xxs,
      paddingHorizontal: spacing.sm,
      borderRadius: radius.full,
      borderWidth: 1,
    },
    text: {
      ...typography.caption,
      fontWeight: '600' as const,
    },
    variantContainers: variantContainerStyles,
    variantTexts: variantTextStyles,
  };
};
