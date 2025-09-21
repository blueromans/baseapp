/**
 * Navigation Theme Hook
 * Integrates app theme colors with React Navigation theme
 */

import { useMemo } from 'react';
import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';
import { useTheme, useThemeColors } from '@/theme';

export const useNavigationTheme = (): Theme => {
  const colors = useThemeColors();
  const { isDark } = useTheme();

  const navigationTheme = useMemo<Theme>(() => {
    const baseTheme = isDark ? DarkTheme : DefaultTheme;

    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        primary: colors.brand.primary as string,
        background: colors.background.primary as string,
        card: colors.surface.card as string,
        text: colors.text.primary as string,
        border: colors.border.default as string,
        notification: colors.status.error as string,
      },
    };
  }, [colors, isDark]);

  return navigationTheme;
};

export default useNavigationTheme;
