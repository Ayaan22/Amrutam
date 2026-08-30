import { StyleSheet, Platform } from 'react-native';
import { Theme, ms } from '../../theme';

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography, radius } = theme;

  return StyleSheet.create({
    container: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: Platform.OS === 'ios' ? spacing.xs : spacing.xxs,
      zIndex: 9999,
    },
    offlineBanner: {
      backgroundColor: colors.accent,
    },
    syncingBanner: {
      backgroundColor: colors.primaryDark,
    },
    successToast: {
      backgroundColor: colors.success,
    },
    contentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    icon: {
      marginRight: spacing.xs,
    },
    text: {
      ...typography.caption,
      color: colors.textInverse,
      fontWeight: '600',
      fontSize: ms(11),
      textAlign: 'center',
    },
    toggleButton: {
      paddingHorizontal: spacing.xs,
      paddingVertical: spacing.xxs,
      backgroundColor: `${colors.textInverse}33`,
      borderRadius: radius.xs,
      marginLeft: spacing.sm,
    },
    toggleButtonText: {
      ...typography.caption,
      color: colors.textInverse,
      fontWeight: '700',
      fontSize: ms(10),
    },
  });
};
