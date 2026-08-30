import { StyleSheet, ViewStyle } from 'react-native';
import { Theme, ms } from '../../theme';

export const createStyles = (theme: Theme) => {
  const { colors, radius } = theme;

  const overlayBase: ViewStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  };

  return StyleSheet.create({
    container: {
      overflow: 'hidden',
      backgroundColor: colors.surfaceSubtle,
      borderRadius: radius.md,
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    loaderOverlay: {
      ...overlayBase,
      backgroundColor: 'transparent',
    },
    fallbackContainer: {
      ...overlayBase,
      backgroundColor: colors.primaryLight,
      padding: ms(8),
      alignItems: 'center',
      justifyContent: 'center',
    },
    fallbackIcon: {
      opacity: 0.8,
    },
  });
};
