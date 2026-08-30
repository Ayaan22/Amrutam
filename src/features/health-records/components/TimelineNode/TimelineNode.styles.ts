import { StyleSheet } from 'react-native';
import { Theme } from '@theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: 32,
      alignItems: 'center',
    },
    node: {
      width: 28,
      height: 28,
      borderRadius: theme.radius.full,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2,
    },
    connectingLine: {
      position: 'absolute',
      top: 28,
      bottom: -14,
      width: 2,
      backgroundColor: theme.colors.border,
      zIndex: 1,
    },
  });
