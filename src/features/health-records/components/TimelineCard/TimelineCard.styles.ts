import { StyleSheet } from 'react-native';
import { Theme } from '../../../../theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      marginBottom: 14,
    },
    cardContent: {
      flex: 1,
      marginLeft: 10,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.md,
      padding: 14,
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
      shadowColor: theme.colors.textPrimary,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 4,
      elevation: 2,
    },
    title: {
      ...theme.typography.body,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      fontSize: 15,
      marginBottom: 4,
    },
    doctorRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    doctorIcon: {
      marginRight: 4,
      marginTop: 2,
    },
    doctorDetailsText: {
      ...theme.typography.caption,
      flex: 1,
      lineHeight: 16,
    },
    doctorName: {
      color: theme.colors.primaryMuted,
      fontWeight: '600',
    },
    facilityName: {
      color: theme.colors.textMuted,
    },
    notes: {
      ...theme.typography.bodySmall,
      color: theme.colors.textSecondary,
      lineHeight: 18,
      marginBottom: 10,
    },
  });
