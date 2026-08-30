import { StyleSheet } from 'react-native';
import { Theme } from '../../../../theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 8,
    },
    iconBox: {
      width: 24,
      height: 24,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.primaryLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
    },
    title: {
      ...theme.typography.body,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginRight: 8,
    },
    countBadge: {
      paddingHorizontal: 7,
      paddingVertical: 2,
      borderRadius: theme.radius.sm,
      backgroundColor: theme.colors.surfaceSubtle,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    countText: {
      fontSize: 10,
      fontWeight: '700',
      color: theme.colors.textMuted,
    },
  });
