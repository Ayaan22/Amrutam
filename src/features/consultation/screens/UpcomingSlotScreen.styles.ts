import { StyleSheet } from 'react-native';
import { Theme, ms } from '@theme';

export const createStyles = (theme: Theme) => {
  const { spacing } = theme;

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      gap: spacing.sm,
    },
    backButton: {
      minHeight: ms(36),
      minWidth: ms(36),
      paddingHorizontal: 0,
      paddingVertical: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitle: {
      fontWeight: '700',
    },
    scrollContent: {
      paddingBottom: spacing.xl,
    },
  });
};
