import { ViewStyle, Dimensions } from 'react-native';
import { scale, verticalScale, moderateScale, s, vs, ms, mvs } from 'react-native-size-matters';
import { lightColors } from './colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Standard percentage helper if screen percentage is needed
export const wp = (percentage: number) => (SCREEN_WIDTH * percentage) / 100;
export const hp = (percentage: number) => (SCREEN_HEIGHT * percentage) / 100;

// Re-export size-matters scaling functions
export { scale, verticalScale, moderateScale, s, vs, ms, mvs, SCREEN_WIDTH, SCREEN_HEIGHT };

export const spacing = {
  none: 0,
  xxs: ms(2),
  xs: ms(4),
  sm: ms(8),
  md: ms(12),
  lg: ms(16),
  xl: ms(20),
  xxl: ms(24),
  xxxl: ms(32),
  huge: ms(48),
  massive: ms(64),
};

export const borderRadius = {
  none: 0,
  xs: ms(4),
  sm: ms(8),
  md: ms(12),
  lg: ms(16),
  xl: ms(20),
  xxl: ms(28),
  full: 9999,
};

export const elevation: Record<'none' | 'sm' | 'md' | 'lg' | 'sheet', ViewStyle> = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: lightColors.textPrimary,
    shadowOffset: { width: 0, height: vs(1) },
    shadowOpacity: 0.05,
    shadowRadius: ms(3),
    elevation: 2,
  },
  md: {
    shadowColor: lightColors.textPrimary,
    shadowOffset: { width: 0, height: vs(3) },
    shadowOpacity: 0.08,
    shadowRadius: ms(8),
    elevation: 4,
  },
  lg: {
    shadowColor: lightColors.textPrimary,
    shadowOffset: { width: 0, height: vs(6) },
    shadowOpacity: 0.12,
    shadowRadius: ms(16),
    elevation: 8,
  },
  sheet: {
    shadowColor: lightColors.textPrimary,
    shadowOffset: { width: 0, height: vs(-4) },
    shadowOpacity: 0.14,
    shadowRadius: ms(20),
    elevation: 12,
  },
};

export type SpacingTokens = typeof spacing;
export type BorderRadiusTokens = typeof borderRadius;
