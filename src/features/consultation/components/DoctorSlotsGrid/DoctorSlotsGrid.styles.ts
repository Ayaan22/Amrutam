import { StyleSheet } from 'react-native';
import { Theme, ms } from '@theme';

export const createStyles = (theme: Theme) => {
  const { colors, spacing, radius } = theme;

  return StyleSheet.create({
    section: {
      paddingHorizontal: spacing.md,
      marginBottom: spacing.xl,
    },
    slotsHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.sm,
    },
    sectionTitle: {
      fontWeight: '700',
    },
    slotsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    slotPill: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: radius.md,
      borderWidth: 1,
      minWidth: ms(96),
      alignItems: 'center',
      justifyContent: 'center',
    },
    slotPillAvailable: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    slotPillSelected: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    slotPillBooked: {
      backgroundColor: colors.surfaceSubtle,
      borderColor: colors.borderLight,
      opacity: 0.6,
    },
    slotPillExpired: {
      backgroundColor: colors.surfaceSubtle,
      borderColor: colors.borderLight,
      opacity: 0.45,
    },
    slotTimeText: {
      fontWeight: '600',
      fontSize: ms(13),
    },
    slotTimeTextAvailable: {
      color: colors.textPrimary,
    },
    slotTimeTextSelected: {
      color: colors.textInverse,
      fontWeight: '700',
    },
    slotTimeTextUnavailable: {
      color: colors.textMuted,
      textDecorationLine: 'line-through',
    },
    badgeTextBooked: {
      color: colors.error,
      fontSize: ms(9),
      fontWeight: '700',
      marginTop: spacing.xxs,
    },
    badgeTextExpired: {
      color: colors.textMuted,
      fontSize: ms(9),
      marginTop: spacing.xxs,
    },
  });
};
