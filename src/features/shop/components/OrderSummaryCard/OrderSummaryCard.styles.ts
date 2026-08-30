import { StyleSheet } from 'react-native';
import { Theme } from '@theme';

export const createStyles = (theme: Theme) => {
  const { colors, spacing } = theme;

  return StyleSheet.create({
    container: {
      width: '100%',
    },
    card: {
      width: '100%',
      padding: spacing.lg,
    },
    cardHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    orderIdText: {
      fontWeight: '800',
      marginTop: spacing.xxs,
    },
    divider: {
      height: 1,
      backgroundColor: colors.borderLight,
      marginVertical: spacing.md,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.sm,
    },
    valueText: {
      fontWeight: '600',
    },
    deliveryText: {
      fontWeight: '700',
    },
    assuranceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      paddingTop: spacing.xs,
    },
    assuranceText: {
      flex: 1,
      lineHeight: 16,
    },
  });
};
