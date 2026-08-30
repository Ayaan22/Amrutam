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
      paddingBottom: vs(110),
    },
    profileCard: {
      marginHorizontal: spacing.md,
      marginTop: spacing.xs,
      padding: spacing.md,
    },
    profileRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    avatar: {
      width: ms(76),
      height: ms(76),
      backgroundColor: colors.surfaceSubtle,
    },
    profileInfo: {
      flex: 1,
      marginLeft: spacing.md,
      justifyContent: 'center',
    },
    doctorName: {
      fontWeight: '700',
      marginBottom: spacing.xxs,
      fontSize: ms(18),
    },
    degreeText: {
      marginBottom: spacing.xs,
      fontSize: ms(13),
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    ratingStar: {
      color: colors.warning,
      fontSize: ms(13),
    },
    ratingScore: {
      fontWeight: '700',
    },
    divider: {
      height: 1,
      backgroundColor: colors.borderLight,
      marginVertical: spacing.md,
    },
    statsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    statItem: {
      alignItems: 'center',
      gap: spacing.xxs,
    },
    statValue: {
      fontWeight: '700',
      fontSize: ms(14),
    },
    statDivider: {
      width: 1,
      height: ms(26),
      backgroundColor: colors.borderLight,
    },
    section: {
      paddingHorizontal: spacing.md,
      marginTop: spacing.md,
    },
    sectionTitle: {
      fontWeight: '700',
      marginBottom: spacing.sm,
    },
    aboutText: {
      lineHeight: ms(20),
    },
    chipsWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
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
    feeBlock: {
      flex: 1,
    },
    feeValue: {
      fontWeight: '800',
      fontSize: ms(22),
    },
    bookButton: {
      flex: 1,
      marginLeft: spacing.md,
    },
  });
};
