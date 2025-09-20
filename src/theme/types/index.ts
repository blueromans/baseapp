// React and React Native
import { ViewStyle } from 'react-native';

// Third Party Libraries
import { Theme as NavigationTheme } from '@react-navigation/native';

// Local Components and Hooks
import { ThemeColors } from './colors';
import { ThemeSpacing } from './spacing';
import { ThemeTypography } from './typography';

export interface BorderRadii {
  none: number; // 0
  sm: number; // 2
  md: number; // 4
  lg: number; // 8
  xl: number; // 12
  '2xl': number; // 16
  '3xl': number; // 24
  full: number; // 9999

  // Component specific
  button: number;
  card: number;
  input: number;
  modal: number;
  avatar: number;
}

// Shadows
export interface ThemeShadows {
  none: ViewStyle;
  sm: ViewStyle;
  md: ViewStyle;
  lg: ViewStyle;
  xl: ViewStyle;
  '2xl': ViewStyle;
  inner: ViewStyle;
}

// Breakpoints
export interface Breakpoints {
  xs: number; // 0
  sm: number; // 640
  md: number; // 768
  lg: number; // 1024
  xl: number; // 1280
  '2xl': number; // 1536
}

// Z-index layers
export interface ZIndices {
  hide: number; // -1
  base: number; // 0
  dropdown: number; // 1000
  sticky: number; // 1100
  overlay: number; // 1300
  modal: number; // 1400
  popover: number; // 1500
  tooltip: number; // 1600
  toast: number; // 1700
}

// Animation durations
export interface AnimationDurations {
  instant: number; // 0
  fast: number; // 150
  normal: number; // 300
  slow: number; // 500
  slower: number; // 700
}

// Complete theme interface
export interface Theme {
  // Core
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;

  // Visual
  borderRadii: BorderRadii;
  shadows: ThemeShadows;

  // Layout
  breakpoints: Breakpoints;
  zIndices: ZIndices;

  // Animation
  animations: AnimationDurations;

  // Meta
  isDark: boolean;
  name: string;
}

// Theme context value
export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Partial<Theme>) => void;
  navigationTheme: NavigationTheme;
  isDark: boolean;
  isAuto: boolean;
  setIsAuto: (auto: boolean) => void;
}

// Theme mode
export type ThemeMode = 'light' | 'dark' | 'auto';

// Theme configuration
export interface ThemeConfig {
  mode: ThemeMode;
  customColors?: Partial<ThemeColors>;
  fontScale?: number;
  reducedMotion?: boolean;
}

export * from './colors';
export * from './spacing';
export * from './typography';
