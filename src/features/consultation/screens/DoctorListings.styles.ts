import { StyleSheet } from 'react-native';
import { Theme } from '@theme';

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
      paddingTop: spacing.xs,
      paddingBottom: spacing.sm,
    },
    titleSection: {
      paddingHorizontal: spacing.md,
      marginBottom: spacing.md,
    },
    subtitle: {
      marginTop: spacing.xxs,
    },
    searchBar: {
      paddingHorizontal: spacing.md,
      marginBottom: spacing.md,
    },
    filterScroll: {
      paddingHorizontal: spacing.md,
      gap: spacing.sm,
      paddingBottom: spacing.sm,
    },
    chip: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
    },
    selectedChip: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
    },
    countRow: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.sm,
    },
  });
};
