import React, { createContext, useContext, useState, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { lightColors, darkColors, ColorTokens } from './colors';
import { typography, TypographyTokens } from './typography';
import { spacing, borderRadius, elevation, SpacingTokens, BorderRadiusTokens } from './spacing';
import { ThemeMode } from '../types/common';

export interface Theme {
  mode: ThemeMode;
  isDark: boolean;
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  borderRadius: BorderRadiusTokens;
  radius: BorderRadiusTokens;
  elevation: typeof elevation;
}

export interface ThemeContextType extends Theme {
  setThemeMode: (mode: ThemeMode) => void;
}

export const defaultTheme: Theme = {
  mode: 'light',
  isDark: false,
  colors: lightColors,
  typography,
  spacing,
  borderRadius,
  radius: borderRadius,
  elevation,
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
  initialMode?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialMode = 'light',
}) => {
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(initialMode);

  const isDark = useMemo(() => {
    return mode === 'dark' || (mode === 'light' ? false : systemColorScheme === 'dark');
  }, [mode, systemColorScheme]);

  const colors = useMemo<ColorTokens>(() => {
    return isDark ? darkColors : lightColors;
  }, [isDark]);

  const value = useMemo<ThemeContextType>(() => ({
    mode,
    isDark,
    colors,
    typography,
    spacing,
    borderRadius,
    radius: borderRadius,
    elevation,
    setThemeMode: setMode,
  }), [mode, isDark, colors]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      ...defaultTheme,
      setThemeMode: () => {},
    };
  }
  return context;
};

export default ThemeProvider;
