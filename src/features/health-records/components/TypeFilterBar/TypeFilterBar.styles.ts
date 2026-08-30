import { StyleSheet } from 'react-native';
import { Theme } from '@theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingVertical: 8,
    },
    scrollContent: {
      paddingHorizontal: 16,
      gap: 8,
      alignItems: 'center',
    },
    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    chipActive: {
      backgroundColor: theme.colors.primaryLight,
      borderColor: theme.colors.primary,
    },
    chipText: {
      ...theme.typography.caption,
      fontWeight: '600',
      color: theme.colors.textSecondary,
      marginLeft: 4,
    },
    chipTextActive: {
      color: theme.colors.primary,
      fontWeight: '700',
    },
  });
