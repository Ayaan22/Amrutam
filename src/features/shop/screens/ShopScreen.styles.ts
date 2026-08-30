import { StyleSheet } from 'react-native';
import { Theme, ms } from '@theme';

export const createStyles = (theme: Theme) => {
  const { spacing } = theme;

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    listContent: {
      paddingBottom: spacing.xl,
    },
    headerContainer: {
      paddingTop: spacing.md,
      paddingBottom: spacing.sm,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      marginBottom: spacing.md,
    },
    titleSection: {
      flex: 1,
      paddingRight: spacing.sm,
    },
    subtitle: {
      marginTop: spacing.xxs,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    searchBarWrapper: {
      paddingHorizontal: spacing.md,
      marginBottom: spacing.sm,
    },
    sectionTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      marginBottom: spacing.sm,
      marginTop: spacing.xs,
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
