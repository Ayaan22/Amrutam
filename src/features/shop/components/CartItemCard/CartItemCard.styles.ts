import { StyleSheet } from 'react-native';
import { Theme, ms } from '@theme';

export const createStyles = (theme: Theme) => {
  const { colors, spacing, radius } = theme;

  return StyleSheet.create({
    itemCard: {
      marginHorizontal: spacing.md,
      marginBottom: spacing.sm,
      padding: spacing.md,
    },
    itemRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    thumbnail: {
      width: ms(68),
      height: ms(68),
      backgroundColor: colors.surfaceSubtle,
    },
    itemDetails: {
      flex: 1,
      marginLeft: spacing.md,
    },
    itemTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    itemName: {
      fontWeight: '700',
      flex: 1,
      marginRight: spacing.sm,
    },
    deleteBtn: {
      minHeight: ms(28),
      minWidth: ms(28),
      paddingHorizontal: 0,
      paddingVertical: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemVolume: {
      marginTop: spacing.xxs,
      marginBottom: spacing.xs,
    },
    itemFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    itemPrice: {
      fontWeight: '700',
      fontSize: ms(15),
    },
    stepper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.borderLight,
      borderRadius: radius.xs,
      backgroundColor: colors.surfaceSubtle,
    },
    stepperBtn: {
      minHeight: ms(28),
      minWidth: ms(28),
      paddingHorizontal: 0,
      paddingVertical: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    stepperValue: {
      paddingHorizontal: spacing.xs,
      fontWeight: '700',
      fontSize: ms(13),
    },
  });
};
