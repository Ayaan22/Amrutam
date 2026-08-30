import { StyleSheet } from 'react-native';
import { Theme, ms } from '@theme';

export const createStyles = (theme: Theme) => {
  const { colors, spacing, radius } = theme;

  return StyleSheet.create({
    upcomingBanner: {
      marginHorizontal: spacing.md,
      marginBottom: spacing.md,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.primary,
      backgroundColor: colors.primaryLight,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    upcomingBannerPressed: {
      opacity: 0.85,
    },
    upcomingBannerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    upcomingIconCircle: {
      width: ms(34),
      height: ms(34),
      borderRadius: ms(17),
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    upcomingBannerText: {
      marginLeft: spacing.sm,
      flex: 1,
    },
    upcomingBannerTitle: {
      fontWeight: '700',
      fontSize: ms(13),
    },
  });
};
