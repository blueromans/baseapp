// React and React Native
import React, {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useEffect,
  useRef,
  PropsWithChildren,
} from 'react';
import { useColorScheme } from 'react-native';

// Third Party Libraries
import type { MMKV } from 'react-native-mmkv';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import type { Theme as NavigationTheme } from '@react-navigation/native';

// Local Components and Hooks
import { Theme, ThemeContextValue, ThemeMode } from '../types';
import { darkTheme } from '../themes/dark';
import { lightTheme } from '../themes/light';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Props for ThemeProvider
interface ThemeProviderProps extends PropsWithChildren {
  storage: MMKV;
  initialTheme?: Theme;
  initialMode?: ThemeMode;
}

// Theme storage keys
const STORAGE_KEYS = {
  MODE: 'theme_mode',
  CUSTOM_COLORS: 'theme_custom_colors',
  FONT_SCALE: 'theme_font_scale',
  REDUCED_MOTION: 'theme_reduced_motion',
} as const;

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  storage,
  initialTheme,
  initialMode = 'auto',
}) => {
  const systemColorScheme = useColorScheme();

  // Use refs for performance optimization
  const storageRef = useRef(storage);
  const modeRef = useRef<ThemeMode>(
    (storageRef.current.getString(STORAGE_KEYS.MODE) as ThemeMode) ||
      initialMode,
  );
  const isAutoRef = useRef(modeRef.current === 'auto');

  // Determine current theme based on mode
  const getCurrentTheme = useCallback((): Theme => {
    if (modeRef.current === 'auto') {
      return systemColorScheme === 'dark' ? darkTheme : lightTheme;
    }
    return modeRef.current === 'dark' ? darkTheme : lightTheme;
  }, [systemColorScheme]);

  // State for theme (using ref for performance)
  const [theme, setThemeState] = React.useState<Theme>(
    initialTheme || getCurrentTheme(),
  );

  // Update theme when system color scheme changes (in auto mode)
  useEffect(() => {
    if (isAutoRef.current) {
      setThemeState(getCurrentTheme());
    }
  }, [systemColorScheme, getCurrentTheme]);

  // Toggle between light and dark theme
  const toggleTheme = useCallback(() => {
    const newMode: ThemeMode = theme.isDark ? 'light' : 'dark';
    modeRef.current = newMode;
    isAutoRef.current = false;
    storageRef.current.set(STORAGE_KEYS.MODE, newMode);
    setThemeState(newMode === 'dark' ? darkTheme : lightTheme);
  }, [theme.isDark]);

  // Set custom theme
  const setTheme = useCallback((customTheme: Partial<Theme>) => {
    setThemeState(current => ({
      ...current,
      ...customTheme,
    }));
  }, []);

  // Set auto mode
  const setIsAuto = useCallback(
    (auto: boolean) => {
      isAutoRef.current = auto;
      if (auto) {
        modeRef.current = 'auto';
        storageRef.current.set(STORAGE_KEYS.MODE, 'auto');
        setThemeState(getCurrentTheme());
      }
    },
    [getCurrentTheme],
  );

  // Create navigation theme
  const navigationTheme = useMemo<NavigationTheme>(() => {
    const baseTheme = theme.isDark ? DarkTheme : DefaultTheme;

    return {
      ...baseTheme,
      dark: theme.isDark,
      colors: {
        ...baseTheme.colors,
        primary: String(theme.colors.brand.primary),
        background: String(theme.colors.background.primary),
        card: String(theme.colors.surface.card),
        text: String(theme.colors.text.primary),
        border: String(theme.colors.border.default),
        notification: String(theme.colors.status.info),
      },
    };
  }, [theme]);

  // Memoize context value
  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme,
      setTheme,
      navigationTheme,
      isDark: theme.isDark,
      isAuto: isAutoRef.current,
      setIsAuto,
    }),
    [theme, toggleTheme, setTheme, navigationTheme, setIsAuto],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use theme context
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

// Hook to use specific theme properties (optimized)
export const useThemeProperty = <K extends keyof Theme>(
  property: K,
): Theme[K] => {
  const { theme } = useTheme();
  return theme[property];
};

// Hook to use theme colors
export const useThemeColors = () => {
  return useThemeProperty('colors');
};

// Hook to use theme spacing
export const useThemeSpacing = () => {
  return useThemeProperty('spacing');
};

// Hook to use theme typography
export const useThemeTypography = () => {
  return useThemeProperty('typography');
};
