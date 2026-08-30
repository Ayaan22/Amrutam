import { StyleSheet, Platform } from 'react-native';
import { Theme, ms, vs } from '@theme';

export const createStyles = (theme: Theme) => {
  const { colors, spacing, radius } = theme;

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    categoryRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerTitle: {
      fontWeight: '700',
    },
    scrollContent: {
      paddingBottom: vs(110),
    },
    heroImageContainer: {
      marginHorizontal: spacing.md,
      marginTop: spacing.xs,
      height: vs(240),
    },
    heroImage: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.surfaceSubtle,
    },
    infoSection: {
      paddingHorizontal: spacing.md,
      marginTop: spacing.md,
    },
    productName: {
      fontSize: ms(20),
      fontWeight: '700',
      marginTop: spacing.xxs,
      marginBottom: spacing.xxs,
    },
    productSubtitle: {
      marginBottom: spacing.md,
    },
    priceRatingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: spacing.sm,
    },
    priceText: {
      fontSize: ms(22),
      fontWeight: '800',
    },
    originalPriceText: {
      textDecorationLine: 'line-through',
      fontSize: ms(13),
    },
    ratingBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.warningLight,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xxs,
      borderRadius: radius.xs,
      gap: spacing.xxs,
    },
    ratingStar: {
      color: colors.warning,
      fontSize: ms(13),
    },
    ratingText: {
      color: colors.warning,
      fontWeight: '700',
      fontSize: ms(12),
    },
    divider: {
      height: 1,
      backgroundColor: colors.borderLight,
      marginVertical: spacing.md,
    },
    detailsBlock: {
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      fontWeight: '700',
      marginBottom: spacing.sm,
    },
    descriptionText: {
      lineHeight: ms(20),
    },
    dosageCard: {
      padding: spacing.md,
    },
    dosageText: {
      lineHeight: ms(18),
    },
    bottomBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
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
    quantityBox: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.borderLight,
      borderRadius: radius.sm,
      backgroundColor: colors.surfaceSubtle,
    },
    quantityBtn: {
      minHeight: ms(36),
      minWidth: ms(36),
      paddingHorizontal: 0,
      paddingVertical: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    quantityValue: {
      paddingHorizontal: spacing.sm,
      fontWeight: '700',
      fontSize: ms(14),
    },
    addToCartButton: {
      flex: 1,
    },
  });
};
