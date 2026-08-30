import { StyleSheet } from 'react-native';
import { Theme } from '@theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    typeBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: theme.radius.full,
    },
    typeBadgeText: {
      ...theme.typography.caption,
      fontWeight: '700',
      fontSize: 11,
      marginLeft: 4,
    },
    dateText: {
      ...theme.typography.caption,
      color: theme.colors.textMuted,
      fontSize: 11,
    },
  });
