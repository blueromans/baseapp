// Main exports - Primary API
export {
  ThemeProvider,
  useTheme,
  useThemeProperty,
  useThemeColors,
  useThemeSpacing,
  useThemeTypography,
} from './context/ThemeContext';

// Legacy support - maintains backward compatibility
export { ThemeProvider as default } from './context/ThemeContext';
export { useLegacyTheme } from './migration/useLegacyTheme';

// For apps using the old path
export { useTheme as useThemeHook } from './context/ThemeContext';

// Theme objects
export { lightTheme } from './themes/light';
export { darkTheme } from './themes/dark';

// Types
export * from './types';

// Hooks
export { useResponsive, useBreakpoint } from './hooks/useResponsive';
export {
  useThemeStyle,
  useThemeStyles,
  useConditionalStyle,
} from './hooks/useThemeStyle';

// Utils
export * from './utils/colorHelpers';

// Tokens
export { basePalette } from './tokens/colors';
