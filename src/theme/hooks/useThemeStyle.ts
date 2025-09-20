// React and React Native
import { useMemo } from 'react';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

// Local Components and Hooks
import { useTheme } from '../context/ThemeContext';

type StyleProp = ViewStyle | TextStyle | ImageStyle;
type ThemedStyleFactory<T extends StyleProp> = (
  theme: ReturnType<typeof useTheme>['theme'],
) => T;

// Hook to create themed styles
export const useThemeStyle = <T extends StyleProp>(
  styleFactory: ThemedStyleFactory<T>,
): T => {
  const { theme } = useTheme();

  return useMemo(() => styleFactory(theme), [theme, styleFactory]);
};

// Hook to create multiple themed styles
export const useThemeStyles = <T extends Record<string, StyleProp>>(
  stylesFactory: (theme: ReturnType<typeof useTheme>['theme']) => T,
): T => {
  const { theme } = useTheme();

  return useMemo(() => stylesFactory(theme), [theme, stylesFactory]);
};

// Hook to conditionally apply styles based on theme mode
export const useConditionalStyle = <T extends StyleProp>(
  lightStyle: T,
  darkStyle: T,
): T => {
  const { isDark } = useTheme();

  return isDark ? darkStyle : lightStyle;
};
