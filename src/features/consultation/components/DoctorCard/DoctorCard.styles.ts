import { StyleSheet } from 'react-native';
import { Theme, ms } from '@theme';

export const createStyles = (theme: Theme) => {
  const { colors, spacing, radius } = theme;

  return StyleSheet.create({
    card: {
      marginBottom: spacing.md,
      marginHorizontal: spacing.md,
      padding: spacing.md,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    avatar: {
      width: ms(64),
      height: ms(64),
      borderRadius: radius.md,
      backgroundColor: colors.surfaceSubtle,
    },
    headerInfo: {
      flex: 1,
      marginLeft: spacing.md,
      justifyContent: 'center',
    },
    nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.xxs,
    },
    name: {
      flex: 1,
      marginRight: spacing.xs,
    },
    degree: {
      marginBottom: spacing.xxs,
    },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: spacing.xs,
      marginTop: spacing.xxs,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ratingStar: {
      color: colors.warning,
      marginRight: ms(2),
    },
    specialtiesRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.xs,
      marginTop: spacing.sm,
      paddingTop: spacing.xs,
      borderTopWidth: 1,
      borderTopColor: colors.borderLight,
    },
    footerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: spacing.md,
      paddingTop: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: colors.borderLight,
    },
    feeContainer: {
      justifyContent: 'center',
    },
    feeAmount: {
      fontWeight: '700',
    },
    arrowButton: {
      minHeight: ms(36),
      minWidth: ms(36),
      borderRadius: radius.full,
      backgroundColor: colors.primaryLight,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
  });
};
