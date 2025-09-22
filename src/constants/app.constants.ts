/**
 * App Constants
 * Global constants used throughout the application
 */

import { Platform } from 'react-native';

// App Information
export const APP = {
  NAME: 'BaseApp',
  BUNDLE_ID: {
    IOS: 'com.baseapp',
    ANDROID: 'com.baseapp',
  },
} as const;

// Dimensions
export const DIMENSIONS = {
  SCREEN: {
    PADDING_HORIZONTAL: 16,
    PADDING_VERTICAL: 16,
  },
  BUTTON: {
    HEIGHT: 48,
    BORDER_RADIUS: 8,
  },
  INPUT: {
    HEIGHT: 48,
    BORDER_RADIUS: 8,
  },
  ICON: {
    SMALL: 16,
    MEDIUM: 24,
    LARGE: 32,
  },
  TAB_BAR: {
    HEIGHT: 60,
  },
} as const;

// Timing
export const TIMING = {
  ANIMATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
  },
  DEBOUNCE: {
    INPUT: 300,
    BUTTON: 1000,
  },
} as const;

// Regex Patterns
export const REGEX = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PASSWORD: /^.{8,}$/, // Simple: minimum 8 characters
} as const;

// Platform
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';
