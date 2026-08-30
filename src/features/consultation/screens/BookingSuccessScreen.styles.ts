import { StyleSheet, Platform } from 'react-native';
import { Theme, ms, vs } from '@theme';

export const createStyles = (theme: Theme) => {
  const { colors, spacing } = theme;

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
      paddingBottom: vs(110),
      alignItems: 'center',
    },
    celebrationSection: {
      alignItems: 'center',
      marginBottom: spacing.lg,
    },
    titleWrapper: {
      alignItems: 'center',
    },
    successCircleOuter: {
      width: ms(96),
      height: ms(96),
      borderRadius: ms(48),
      backgroundColor: colors.successLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.md,
    },
    successCircleInner: {
      width: ms(68),
      height: ms(68),
      borderRadius: ms(34),
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    badge: {
      marginBottom: spacing.sm,
    },
    title: {
      textAlign: 'center',
      marginBottom: spacing.xs,
    },
    subtitle: {
      textAlign: 'center',
      lineHeight: ms(22),
      paddingHorizontal: spacing.sm,
    },
    bottomBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: spacing.lg,
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
    actionButton: {
      width: '100%',
    },
  });
};
