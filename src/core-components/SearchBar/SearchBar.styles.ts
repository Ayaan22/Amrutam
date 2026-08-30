import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/ThemeContext';

export const createStyles = (theme: Theme) => {
  const { colors, spacing, radius, typography } = theme;

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      width: '100%',
    },
    inputWrapper: {
      flex: 1,
    },
    noMarginInput: {
      marginBottom: 0,
    },
    searchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surfaceSubtle,
      borderRadius: radius.md,
      paddingHorizontal: spacing.md,
      minHeight: 46,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    searchContainerFocused: {
      borderColor: colors.primary,
      backgroundColor: colors.surface,
    },
    input: {
      flex: 1,
      ...typography.body,
      color: colors.textPrimary,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.xs,
    },
    iconButton: {
      padding: spacing.xs,
      justifyContent: 'center',
      alignItems: 'center',
    },
    filterButton: {
      backgroundColor: colors.surfaceSubtle,
      borderRadius: radius.md,
      minHeight: 46,
      minWidth: 46,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    filterButtonActive: {
      backgroundColor: colors.primaryLight,
      borderColor: colors.primary,
    },
    clearText: {
      ...typography.caption,
      color: colors.textMuted,
      fontWeight: '600',
    },
    filterIconText: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '600',
    },
  });
};
