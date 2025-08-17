import React, { createContext, useEffect, useMemo, useState } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode, lightColors, darkColors, spacing, radii, shadow, typography } from '../theme/tokens';

type Theme = {
  colors: typeof lightColors;
  spacing: typeof spacing;
  radii: typeof radii;
  shadow: typeof shadow.light;
  typography: typeof typography;
};

type ThemeContextValue = {
  mode: ThemeMode;
  theme: Theme;
  toggle: () => void;
};

export const ThemeContext = createContext<ThemeContextValue>({
  mode: 'light',
  theme: { colors: lightColors, spacing, radii, shadow: shadow.light, typography },
  toggle: () => {},
});

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('@theme');
      if (saved === 'light' || saved === 'dark') setMode(saved);
      else setMode(Appearance.getColorScheme() === 'dark' ? 'dark' : 'light');
    })();
  }, []);

  const theme = useMemo<Theme>(() => ({
    colors: mode === 'dark' ? darkColors : lightColors,
    spacing,
    radii,
    shadow: mode === 'dark' ? shadow.dark : shadow.light,
    typography,
  }), [mode]);

  const value: ThemeContextValue = useMemo(() => ({
    mode,
    theme,
    toggle: async () => {
      const next = mode === 'light' ? 'dark' : 'light';
      setMode(next);
      await AsyncStorage.setItem('@theme', next);
    }
  }), [mode, theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
