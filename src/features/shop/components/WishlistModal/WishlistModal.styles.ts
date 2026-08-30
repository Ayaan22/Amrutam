import { StyleSheet, Platform } from 'react-native';
import { Theme, ms } from '@theme';

export const createStyles = (theme: Theme) => {
  const { colors, spacing, radius } = theme;

  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: `${colors.textPrimary}75`,
      justifyContent: 'flex-end',
    },
    sheetContainer: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: radius.lg,
      borderTopRightRadius: radius.lg,
      maxHeight: '85%',
      minHeight: '50%',
      paddingTop: spacing.md,
      paddingBottom: Platform.OS === 'ios' ? spacing.xl : spacing.lg,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    },
    headerTitle: {
      fontWeight: '700',
    },
    closeBtn: {
      minHeight: ms(36),
      minWidth: ms(36),
      paddingHorizontal: 0,
      paddingVertical: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    listContent: {
      paddingVertical: spacing.md,
    },
    itemCard: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    },
    itemPressable: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    itemImage: {
      width: ms(56),
      height: ms(56),
      borderRadius: radius.sm,
      backgroundColor: colors.surfaceSubtle,
    },
    itemInfo: {
      flex: 1,
      marginLeft: spacing.md,
    },
    itemTitle: {
      fontWeight: '700',
      fontSize: ms(13),
    },
    itemPrice: {
      fontWeight: '700',
      color: colors.primary,
      marginTop: spacing.xxs,
      fontSize: ms(13),
    },
    itemActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    moveToCartBtn: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
    },
    removeBtn: {
      minHeight: ms(32),
      minWidth: ms(32),
      paddingHorizontal: 0,
      paddingVertical: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
