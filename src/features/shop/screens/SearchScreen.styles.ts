import { StyleSheet } from 'react-native';
import { Theme, ms } from '@theme';

export const createStyles = (theme: Theme) => {
  const { spacing } = theme;

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      gap: spacing.xs,
    },
    iconButton: {
      minHeight: ms(36),
      minWidth: ms(36),
      paddingHorizontal: 0,
      paddingVertical: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchBarWrapper: {
      flex: 1,
    },
    resultsCountRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
    },
    listContent: {
      paddingTop: spacing.xs,
      paddingBottom: spacing.xl,
    },
    footerLoader: {
      paddingVertical: spacing.md,
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.xs,
    },
    footerText: {
      fontSize: ms(12),
    },
  });
};
