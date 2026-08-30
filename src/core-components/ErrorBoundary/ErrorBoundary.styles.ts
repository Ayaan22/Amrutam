import { StyleSheet } from 'react-native';
import { Theme, ms } from '../../theme';

export const createStyles = (theme: Theme) => {
  const { colors, spacing, radius, typography } = theme;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.xl,
    },
    iconBox: {
      width: ms(80),
      height: ms(80),
      borderRadius: ms(40),
      backgroundColor: colors.errorLight,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.lg,
    },
    title: {
      ...typography.h2,
      color: colors.textPrimary,
      textAlign: 'center',
      marginBottom: spacing.xs,
    },
    subtitle: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: spacing.lg,
      lineHeight: ms(22),
    },
    errorMessageContainer: {
      backgroundColor: colors.surfaceSubtle,
      borderRadius: radius.md,
      padding: spacing.md,
      marginBottom: spacing.xl,
      width: '100%',
      borderWidth: 1,
      borderColor: colors.border,
    },
    errorText: {
      ...typography.caption,
      color: colors.error,
      fontFamily: 'monospace',
    },
    actionButton: {
      minWidth: ms(160),
    },
    supportText: {
      ...typography.caption,
      color: colors.textMuted,
      marginTop: spacing.xl,
      textAlign: 'center',
    },
  });
};
