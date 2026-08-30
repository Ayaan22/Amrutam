import { StyleSheet } from 'react-native';
import { Theme } from '@theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderTopWidth: 1,
      borderTopColor: theme.colors.borderLight,
      paddingTop: 8,
      marginTop: 2,
    },
    list: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 6,
      paddingHorizontal: 8,
      borderRadius: theme.radius.sm,
      backgroundColor: theme.colors.surfaceSubtle,
      borderWidth: 1,
      borderColor: theme.colors.border,
      maxWidth: '100%',
    },
    pdfIconBox: {
      width: 24,
      height: 24,
      borderRadius: 4,
      backgroundColor: theme.colors.errorLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 6,
    },
    imageThumb: {
      width: 24,
      height: 24,
      borderRadius: 4,
      marginRight: 6,
    },
    infoCol: {
      flexShrink: 1,
    },
    name: {
      fontSize: 11,
      fontWeight: '600',
      color: theme.colors.textPrimary,
    },
    size: {
      fontSize: 10,
      color: theme.colors.textMuted,
    },
  });
