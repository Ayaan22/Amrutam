import { TextStyle, Platform } from 'react-native';

export const fontFamilies = {
  // Primary Sans-Serif Font: Inter
  primary: {
    regular: Platform.select({ ios: 'Inter-Regular', android: 'Inter-Regular', default: 'System' }),
    medium: Platform.select({ ios: 'Inter-Medium', android: 'Inter-Medium', default: 'System' }),
    semiBold: Platform.select({ ios: 'Inter-SemiBold', android: 'Inter-SemiBold', default: 'System' }),
    bold: Platform.select({ ios: 'Inter-Bold', android: 'Inter-Bold', default: 'System' }),
  },
  // Secondary Classical Editorial Font: Playfair Display
  secondary: {
    regular: Platform.select({ ios: 'PlayfairDisplay-Regular', android: 'PlayfairDisplay-Regular', default: 'serif' }),
    semiBold: Platform.select({ ios: 'PlayfairDisplay-SemiBold', android: 'PlayfairDisplay-SemiBold', default: 'serif' }),
    bold: Platform.select({ ios: 'PlayfairDisplay-Bold', android: 'PlayfairDisplay-Bold', default: 'serif' }),
  },
};

export const typography: Record<string, TextStyle> = {
  // Headings
  h1: {
    fontFamily: fontFamilies.primary.bold,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  h2: {
    fontFamily: fontFamilies.primary.semiBold,
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: -0.2,
  },
  h3: {
    fontFamily: fontFamilies.primary.semiBold,
    fontSize: 16,
    lineHeight: 22,
  },
  
  // Body Text
  body: {
    fontFamily: fontFamilies.primary.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: fontFamilies.primary.regular,
    fontSize: 12,
    lineHeight: 16,
  },

  // Supporting Text
  caption: {
    fontFamily: fontFamilies.primary.medium,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.2,
  },
  label: {
    fontFamily: fontFamilies.primary.semiBold,
    fontSize: 13,
    lineHeight: 18,
  },
};

export type TypographyTokens = typeof typography;
