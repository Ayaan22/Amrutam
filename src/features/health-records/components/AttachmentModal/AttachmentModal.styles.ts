import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '../../../../theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: `${theme.colors.textPrimary}CC`,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    modalCard: {
      width: SCREEN_WIDTH - 32,
      maxHeight: SCREEN_HEIGHT * 0.75,
      backgroundColor: theme.colors.surfaceElevated,
      borderRadius: theme.radius.lg,
      overflow: 'hidden',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.borderLight,
      backgroundColor: theme.colors.surface,
    },
    headerInfo: {
      flex: 1,
      marginRight: 10,
    },
    title: {
      ...theme.typography.bodySmall,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    subtitle: {
      ...theme.typography.caption,
      color: theme.colors.textMuted,
      fontSize: 11,
    },
    closeButton: {
      padding: 4,
    },
    previewArea: {
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    previewImage: {
      width: SCREEN_WIDTH - 64,
      height: SCREEN_HEIGHT * 0.45,
      borderRadius: theme.radius.md,
    },
    pdfNotice: {
      marginTop: 12,
      padding: 10,
      borderRadius: theme.radius.sm,
      backgroundColor: theme.colors.surfaceSubtle,
      width: '100%',
      alignItems: 'center',
    },
    pdfNoticeText: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
  });
