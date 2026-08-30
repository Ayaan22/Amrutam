import { StyleSheet } from 'react-native';
import { Theme, ms } from '@theme';

export const createStyles = (theme: Theme) => {
  const { colors, spacing } = theme;

  return StyleSheet.create({
    card: {
      marginHorizontal: spacing.md,
      marginBottom: spacing.sm,
      padding: spacing.sm,
    },
    contentRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: ms(80),
      height: ms(80),
      backgroundColor: colors.surfaceSubtle,
    },
    infoCol: {
      flex: 1,
      marginLeft: spacing.md,
      justifyContent: 'center',
    },
    topCategoryRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    categoryLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      flex: 1,
    },
    heartBtn: {
      minHeight: ms(32),
      minWidth: ms(32),
      paddingHorizontal: 0,
      paddingVertical: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontWeight: '700',
      marginTop: spacing.xxs,
      marginBottom: spacing.xxs,
    },
    subtitle: {
      marginBottom: spacing.xs,
    },
    bottomRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: spacing.xs,
    },
    price: {
      fontWeight: '700',
      fontSize: ms(16),
    },
    originalPrice: {
      textDecorationLine: 'line-through',
      fontSize: ms(12),
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
    },
    ratingStar: {
      color: colors.warning,
      fontSize: ms(12),
    },
    ratingText: {
      fontWeight: '600',
      fontSize: ms(12),
    },
  });
};
