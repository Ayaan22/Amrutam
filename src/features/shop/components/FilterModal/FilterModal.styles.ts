import { StyleSheet, Platform } from 'react-native';
import { Theme, ms } from '@theme';

export const createStyles = (theme: Theme) => {
  const { colors, spacing, radius } = theme;

  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: `${colors.textPrimary}75`,
      justifyContent: 'flex-end',
    },
    sheetContainer: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: radius.lg,
      borderTopRightRadius: radius.lg,
      maxHeight: '85%',
      paddingTop: spacing.md,
      paddingBottom: Platform.OS === 'ios' ? spacing.xl : spacing.lg,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    },
    headerTitle: {
      fontWeight: '700',
    },
    closeBtn: {
      minHeight: ms(36),
      minWidth: ms(36),
      paddingHorizontal: 0,
      paddingVertical: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentScroll: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
    },
    section: {
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      fontWeight: '700',
      marginBottom: spacing.sm,
    },
    pillsWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.xs,
    },
    pill: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    pillActive: {
      backgroundColor: colors.primaryLight,
      borderColor: colors.primary,
    },
    pillText: {
      fontSize: ms(13),
      color: colors.textPrimary,
      fontWeight: '500',
    },
    pillTextActive: {
      color: colors.primary,
      fontWeight: '700',
    },
    stockRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: spacing.xs,
    },
    stockCheckbox: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    checkboxBox: {
      width: ms(22),
      height: ms(22),
      borderRadius: radius.xs,
      borderWidth: 1.5,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxBoxActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    footerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.borderLight,
      gap: spacing.md,
    },
    resetBtn: {
      flex: 1,
    },
    applyBtn: {
      flex: 2,
    },
  });
};
