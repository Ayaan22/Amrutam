import { StyleSheet } from 'react-native';
import { Theme, ms } from '@theme';

export const createStyles = (theme: Theme) => {
  const { colors } = theme;

  return StyleSheet.create({
    button: {
      position: 'relative',
      minHeight: ms(40),
      minWidth: ms(40),
      paddingHorizontal: 0,
      paddingVertical: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badge: {
      position: 'absolute',
      top: ms(2),
      right: ms(2),
      backgroundColor: colors.error,
      minWidth: ms(16),
      height: ms(16),
      borderRadius: ms(8),
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: ms(3),
    },
    badgeText: {
      color: colors.textInverse,
      fontSize: ms(10),
      fontWeight: '700',
      lineHeight: ms(12),
    },
  });
};
