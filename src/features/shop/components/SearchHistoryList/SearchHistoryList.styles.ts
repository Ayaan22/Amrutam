import { StyleSheet } from 'react-native';
import { Theme, ms, vs } from '@theme';

export const createStyles = (theme: Theme) => {
  const { colors, spacing } = theme;

  return StyleSheet.create({
    container: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.sm,
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.sm,
    },
    title: {
      fontWeight: '700',
      letterSpacing: 0.8,
    },
    clearBtn: {
      minHeight: ms(28),
      paddingHorizontal: spacing.xs,
    },
    clearText: {
      fontWeight: '600',
      fontSize: ms(12),
    },
    list: {
      marginTop: spacing.xs,
    },
    itemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    },
    itemMain: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      gap: spacing.md,
      paddingVertical: spacing.xs,
    },
    itemText: {
      fontWeight: '500',
      fontSize: ms(14),
    },
    removeBtn: {
      minHeight: ms(28),
      minWidth: ms(28),
      paddingHorizontal: 0,
      paddingVertical: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: vs(48),
      paddingHorizontal: spacing.xl,
    },
    emptyIcon: {
      opacity: 0.6,
      marginBottom: spacing.sm,
    },
    emptyPrompt: {
      textAlign: 'center',
    },
  });
};
