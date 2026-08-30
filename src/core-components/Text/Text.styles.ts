import { StyleSheet, TextStyle } from 'react-native';
import { ColorTokens } from '../../theme/colors';
import { TypographyTokens } from '../../theme/typography';
import { TextVariant, TextColor } from './Text.types';

export const getTextColor = (color: TextColor, colors: ColorTokens): string => {
  switch (color) {
    case 'primary':
      return colors.textPrimary;
    case 'secondary':
      return colors.textSecondary;
    case 'muted':
      return colors.textMuted;
    case 'inverse':
      return colors.textInverse;
    case 'error':
      return colors.error;
    case 'success':
      return colors.success;
    case 'warning':
      return colors.warning;
    case 'info':
      return colors.info;
    default:
      return colors.textPrimary;
  }
};

export const createStyles = (typography: TypographyTokens) => {
  return StyleSheet.create<{ [key in TextVariant]: TextStyle }>({
    h1: typography.h1,
    h2: typography.h2,
    h3: typography.h3,
    body: typography.body,
    bodySmall: typography.bodySmall,
    caption: typography.caption,
    label: typography.label,
  });
};
