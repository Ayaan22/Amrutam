import { StyleSheet, Platform } from 'react-native';
import { Theme } from '../../../theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    headerWrapper: {
      paddingHorizontal: 16,
      paddingTop: Platform.OS === 'ios' ? 10 : 14,
      paddingBottom: 10,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.borderLight,
    },
    headerTitle: {
      ...theme.typography.h1,
      fontSize: 22,
      fontWeight: '800',
      color: theme.colors.textPrimary,
    },
    headerSubtitle: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      marginTop: 2,
      marginBottom: 10,
    },
    activeTagRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 6,
      backgroundColor: theme.colors.surfaceSubtle,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.borderLight,
      gap: 6,
    },
    activeTagLabel: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
    },
    activeTagPill: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.primaryLight,
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    activeTagText: {
      fontSize: 11,
      fontWeight: '700',
      color: theme.colors.primary,
      marginRight: 4,
    },
    listContent: {
      paddingBottom: 32,
    },
    emptyContainer: {
      padding: 32,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
    },
    emptyTitle: {
      ...theme.typography.h3,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginTop: 12,
      marginBottom: 6,
    },
    emptySubtitle: {
      ...theme.typography.bodySmall,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: 16,
    },
    clearButton: {
      paddingHorizontal: 18,
      paddingVertical: 8,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.primary,
    },
    clearButtonText: {
      ...theme.typography.bodySmall,
      fontWeight: '700',
      color: theme.colors.textInverse,
    },
  });
