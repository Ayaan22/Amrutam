import { StyleSheet } from 'react-native';
import { Theme, ms } from '@theme';

export const createStyles = (theme: Theme) => {
  const { colors, spacing } = theme;

  return StyleSheet.create({
    container: {
      width: '100%',
    },
    card: {
      width: '100%',
      padding: spacing.lg,
    },
    cardHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    doctorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: spacing.md,
    },
    avatar: {
      width: ms(52),
      height: ms(52),
      backgroundColor: colors.surfaceSubtle,
    },
    doctorInfo: {
      flex: 1,
      marginLeft: spacing.md,
    },
    doctorName: {
      fontWeight: '700',
      fontSize: ms(15),
    },
    divider: {
      height: 1,
      backgroundColor: colors.borderLight,
      marginVertical: spacing.md,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.sm,
    },
    detailValue: {
      fontWeight: '600',
    },
  });
};
