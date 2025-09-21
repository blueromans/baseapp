/**
 * Legacy ThemeProvider location
 * This file re-exports from the new location for backward compatibility
 *
 * @deprecated Use imports from '@/theme' directly
 */

// Re-export everything from the new ThemeContext
export {
  ThemeProvider as default,
  useTheme,
  useThemeProperty,
  useThemeColors,
  useThemeSpacing,
  useThemeTypography,
} from '../context/ThemeContext';

// Re-export types
export type { ThemeContextValue, ThemeMode } from '../types';
