import { StyleSheet } from 'react-native';
import { Theme, ms } from '@theme';

export const createStyles = (theme: Theme) => {
  const { colors, spacing, radius } = theme;

  return StyleSheet.create({
    card: {
      marginHorizontal: spacing.md,
      marginTop: spacing.xs,
      padding: spacing.md,
    },
    statusBadgeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.md,
    },
    livePill: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.successLight,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xxs,
      borderRadius: radius.full,
      gap: spacing.xxs,
    },
    liveDot: {
      width: ms(6),
      height: ms(6),
      borderRadius: ms(3),
      backgroundColor: colors.success,
    },
    liveText: {
      fontWeight: '700',
      fontSize: ms(11),
      color: colors.success,
    },
    timeBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.primaryLight,
      borderRadius: radius.md,
      padding: spacing.md,
      marginBottom: spacing.md,
    },
    timeCol: {
      flex: 1,
    },
    timeValue: {
      fontWeight: '800',
      marginTop: spacing.xxs,
      fontSize: ms(20),
    },
    datePill: {
      alignItems: 'flex-end',
    },
    dateValue: {
      fontWeight: '700',
    },
    doctorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.xs,
    },
    avatar: {
      width: ms(58),
      height: ms(58),
      backgroundColor: colors.surfaceSubtle,
    },
    doctorInfo: {
      flex: 1,
      marginLeft: spacing.md,
    },
    doctorName: {
      fontWeight: '700',
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      marginTop: spacing.xxs,
    },
    ratingStar: {
      color: colors.warning,
    },
    modeFeeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: spacing.md,
      marginTop: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: colors.borderLight,
    },
    modeTag: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    modeText: {
      fontWeight: '600',
    },
    feeText: {
      fontWeight: '700',
    },
    actionsContainer: {
      marginTop: spacing.md,
      gap: spacing.sm,
    },
    joinButton: {
      width: '100%',
    },
    cancelButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.sm,
      gap: spacing.xs,
      borderRadius: radius.md,
    },
    cancelButtonText: {
      fontWeight: '600',
      color: colors.error,
    },
  });
};
