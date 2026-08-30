import { StyleSheet } from 'react-native';
import { Theme } from '@theme';

export const createStyles = (theme: Theme) => {
  const { colors, spacing } = theme;

  return StyleSheet.create({
    container: {
      paddingHorizontal: spacing.md,
      marginTop: spacing.md,
      marginBottom: spacing.lg,
    },
    card: {
      padding: spacing.md,
    },
    title: {
      fontWeight: '700',
      marginBottom: spacing.md,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.sm,
    },
    value: {
      fontWeight: '600',
    },
    divider: {
      height: 1,
      backgroundColor: colors.borderLight,
      marginVertical: spacing.sm,
    },
    totalValue: {
      fontWeight: '800',
    },
  });
};
