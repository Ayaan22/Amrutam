import { StyleSheet } from 'react-native';
import { Theme } from '@theme';

export const createStyles = (theme: Theme) => {
  const { spacing } = theme;

  return StyleSheet.create({
    section: {
      paddingHorizontal: spacing.md,
      marginTop: spacing.sm,
      marginBottom: spacing.xl,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginBottom: spacing.sm,
    },
    title: {
      fontWeight: '700',
    },
    card: {
      padding: spacing.md,
    },
    list: {
      gap: spacing.sm,
    },
    itemRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacing.sm,
    },
    itemText: {
      flex: 1,
      lineHeight: 18,
    },
  });
};
