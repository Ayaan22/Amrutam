import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/ThemeContext';

export const createStyles = (theme: Theme) => {
  const { colors, spacing, radius, typography } = theme;

  return StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: spacing.md,
    },
    label: {
      ...typography.label,
      color: colors.textPrimary,
      marginBottom: spacing.xs,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
      minHeight: 48,
      paddingHorizontal: spacing.md,
    },
    inputWrapperFocused: {
      borderColor: colors.primary,
    },
    inputWrapperError: {
      borderColor: colors.error,
    },
    inputWrapperDisabled: {
      backgroundColor: colors.surfaceSubtle,
      borderColor: colors.borderLight,
    },
    input: {
      flex: 1,
      ...typography.body,
      color: colors.textPrimary,
      paddingVertical: spacing.sm,
      paddingHorizontal: 0,
    },
    inputDisabled: {
      color: colors.textMuted,
    },
    iconContainer: {
      marginHorizontal: spacing.xs,
      justifyContent: 'center',
      alignItems: 'center',
    },
    helperText: {
      ...typography.caption,
      color: colors.textMuted,
      marginTop: spacing.xxs,
    },
    errorText: {
      ...typography.caption,
      color: colors.error,
      marginTop: spacing.xxs,
    },
  });
};
