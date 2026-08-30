import { StyleSheet } from 'react-native';
import { Theme, ms } from '@theme';

export const createStyles = (theme: Theme) => {
  const { colors, spacing, radius } = theme;

  return StyleSheet.create({
    container: {
      paddingHorizontal: spacing.md,
      marginBottom: spacing.sm,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.sm,
    },
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    filterButtonActive: {
      borderColor: colors.primary,
      backgroundColor: colors.primaryLight,
    },
    filterButtonText: {
      fontSize: ms(13),
      fontWeight: '600',
      color: colors.textPrimary,
    },
    filterButtonTextActive: {
      color: colors.primary,
      fontWeight: '700',
    },
    badgeCount: {
      backgroundColor: colors.primary,
      minWidth: ms(18),
      height: ms(18),
      borderRadius: ms(9),
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: ms(4),
    },
    badgeCountText: {
      color: colors.textInverse,
      fontSize: ms(10),
      fontWeight: '700',
    },
    sortPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xxs,
    },
    sortLabel: {
      fontSize: ms(12),
      fontWeight: '600',
      color: colors.primary,
    },
    activePillsScroll: {
      marginTop: spacing.xs,
      gap: spacing.xs,
      paddingVertical: spacing.xxs,
    },
    activeChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xxs,
      backgroundColor: colors.primaryLight,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xxs,
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    activeChipText: {
      fontSize: ms(11),
      color: colors.primary,
      fontWeight: '600',
    },
  });
};
