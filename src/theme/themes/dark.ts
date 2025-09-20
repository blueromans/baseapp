// Local Components and Hooks
import { lightTheme } from './light';
import { Theme } from '../types';
import { basePalette } from '../tokens/colors';

export const darkTheme: Theme = {
  ...lightTheme,
  name: 'dark',
  isDark: true,

  colors: {
    palette: basePalette,

    background: {
      primary: '#111827',
      secondary: '#1F2937',
      tertiary: '#374151',
      elevated: '#1F2937',
      overlay: 'rgba(0, 0, 0, 0.8)',
    },

    text: {
      primary: '#F9FAFB',
      secondary: '#D1D5DB',
      tertiary: '#9CA3AF',
      disabled: '#6B7280',
      inverse: '#111827',
      link: '#60A5FA',
    },

    brand: {
      primary: '#60A5FA',
      secondary: '#3B82F6',
      tertiary: '#1E3A8A',
    },

    status: {
      success: '#4ADE80',
      warning: '#FACC15',
      error: '#F87171',
      info: '#60A5FA',
    },

    interactive: {
      default: '#60A5FA',
      hover: '#3B82F6',
      pressed: '#2563EB',
      disabled: '#374151',
      focus: '#60A5FA',
    },

    border: {
      default: '#374151',
      subtle: '#1F2937',
      strong: '#4B5563',
      focus: '#60A5FA',
    },

    surface: {
      card: '#1F2937',
      modal: '#1F2937',
      sheet: '#1F2937',
    },

    shadow: {
      default: '#000000',
      strong: '#000000',
    },
  },

  shadows: {
    ...lightTheme.shadows,
    sm: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 2,
    },
    lg: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 6,
      elevation: 3,
    },
  },
};
