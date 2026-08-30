import { StyleSheet } from 'react-native';
import { Theme, ms } from '@theme';

export const createStyles = (theme: Theme) => {
  const { colors, typography } = theme;

  return StyleSheet.create({
    button: {
      padding: ms(6),
      position: 'relative',
      minHeight: ms(36),
      minWidth: ms(36),
      alignItems: 'center',
      justifyContent: 'center',
    },
    badge: {
      position: 'absolute',
      top: 0,
      right: 0,
      minWidth: ms(16),
      height: ms(16),
      borderRadius: ms(8),
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: ms(3),
    },
    badgeText: {
      ...typography.caption,
      color: colors.textInverse,
      fontSize: ms(9),
      fontWeight: '700',
    },
  });
};
