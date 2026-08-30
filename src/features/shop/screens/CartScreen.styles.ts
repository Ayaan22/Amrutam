import { StyleSheet, Platform } from 'react-native';
import { Theme, ms, vs } from '@theme';

export const createStyles = (theme: Theme) => {
  const { colors, spacing } = theme;

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
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
    clearBtn: {
      minHeight: ms(32),
      paddingHorizontal: spacing.xs,
    },
    clearText: {
      fontWeight: '600',
      fontSize: ms(12),
    },
    listContent: {
      paddingTop: spacing.xs,
      paddingBottom: vs(110),
    },
    bottomBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
      paddingBottom: Platform.OS === 'ios' ? spacing.xl : spacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.borderLight,
      backgroundColor: colors.surface,
      elevation: 10,
      shadowColor: colors.textPrimary,
      shadowOffset: { width: 0, height: -3 },
      shadowOpacity: 0.08,
      shadowRadius: ms(8),
    },
    bottomPriceCol: {
      flex: 1,
    },
    bottomPrice: {
      fontWeight: '800',
      fontSize: ms(22),
    },
    placeOrderBtn: {
      flex: 1,
      marginLeft: spacing.md,
    },
  });
};
