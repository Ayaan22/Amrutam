import { StyleSheet } from 'react-native';
import { Theme, ms } from '@theme';

export const createStyles = (theme: Theme) => {
  const { colors, spacing } = theme;

  return StyleSheet.create({
    celebrationSection: {
      alignItems: 'center',
      marginBottom: spacing.lg,
    },
    titleWrapper: {
      alignItems: 'center',
    },
    successCircleOuter: {
      width: ms(96),
      height: ms(96),
      borderRadius: ms(48),
      backgroundColor: colors.successLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.md,
    },
    successCircleInner: {
      width: ms(68),
      height: ms(68),
      borderRadius: ms(34),
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    badge: {
      marginBottom: spacing.sm,
    },
    title: {
      textAlign: 'center',
      marginBottom: spacing.xs,
    },
    subtitle: {
      textAlign: 'center',
      lineHeight: ms(22),
      paddingHorizontal: spacing.sm,
    },
  });
};
