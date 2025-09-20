/**
 * App Constants
 * Global constants used throughout the application
 */

// App Information
export const APP = {
  NAME: 'BaseApp',
  BUNDLE_ID: {
    IOS: 'com.baseapp',
    ANDROID: 'com.baseapp',
  },
  STORE_URL: {
    IOS: 'https://apps.apple.com/app/idYOUR_APP_ID',
    ANDROID: 'https://play.google.com/store/apps/details?id=com.baseapp',
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
    MIN_WIDTH: 120,
    BORDER_RADIUS: 8,
  },
  INPUT: {
    HEIGHT: 48,
    BORDER_RADIUS: 8,
  },
  AVATAR: {
    SMALL: 32,
    MEDIUM: 48,
    LARGE: 64,
    XLARGE: 96,
  },
  ICON: {
    SMALL: 16,
    MEDIUM: 24,
    LARGE: 32,
  },
  HEADER: {
    HEIGHT: 56,
  },
  TAB_BAR: {
    HEIGHT: 60,
  },
  BOTTOM_SHEET: {
    MAX_HEIGHT: 0.9, // 90% of screen height
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
    SEARCH: 500,
    INPUT: 300,
    BUTTON: 1000,
  },
  TIMEOUT: {
    API: 30000, // 30 seconds
    UPLOAD: 120000, // 2 minutes
    SESSION: 1800000, // 30 minutes
  },
  REFRESH: {
    PULL_TO_REFRESH: 2000,
    AUTO_REFRESH: 60000, // 1 minute
  },
} as const;

// Limits
export const LIMITS = {
  TEXT: {
    USERNAME_MIN: 3,
    USERNAME_MAX: 30,
    PASSWORD_MIN: 8,
    PASSWORD_MAX: 128,
    EMAIL_MAX: 254,
    PHONE_MAX: 15,
    NAME_MAX: 100,
    BIO_MAX: 500,
    MESSAGE_MAX: 1000,
    COMMENT_MAX: 500,
  },
  FILE: {
    IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
    VIDEO_SIZE: 50 * 1024 * 1024, // 50MB
    DOCUMENT_SIZE: 10 * 1024 * 1024, // 10MB
    AVATAR_SIZE: 2 * 1024 * 1024, // 2MB
  },
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
  },
  CACHE: {
    DEFAULT_TTL: 3600, // 1 hour in seconds
    LONG_TTL: 86400, // 24 hours in seconds
    SHORT_TTL: 300, // 5 minutes in seconds
  },
} as const;

// Regex Patterns
export const REGEX = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PHONE:
    /^[+]?[(]?[0-9]{1,3}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/,
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  USERNAME: /^[a-zA-Z0-9_]{3,30}$/,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  NUMERIC: /^\d+$/,
  ALPHABETIC: /^[a-zA-Z]+$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
} as const;

// Date Formats
export const DATE_FORMATS = {
  DEFAULT: 'DD/MM/YYYY',
  WITH_TIME: 'DD/MM/YYYY HH:mm',
  WITH_SECONDS: 'DD/MM/YYYY HH:mm:ss',
  TIME_ONLY: 'HH:mm',
  DATE_ONLY: 'DD/MM/YYYY',
  MONTH_YEAR: 'MMM YYYY',
  FULL_DATE: 'dddd, MMMM DD, YYYY',
  SHORT_DATE: 'MMM DD',
  ISO: 'YYYY-MM-DD',
  RELATIVE: {
    TODAY: 'Today',
    YESTERDAY: 'Yesterday',
    TOMORROW: 'Tomorrow',
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  TIMEOUT: 'Request timeout. Please try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access forbidden.',
  NOT_FOUND: 'Resource not found.',
  SERVER: 'Server error. Please try again later.',
  VALIDATION: {
    REQUIRED: 'This field is required.',
    EMAIL: 'Please enter a valid email address.',
    PHONE: 'Please enter a valid phone number.',
    PASSWORD:
      'Password must be at least 8 characters with uppercase, lowercase, number, and special character.',
    USERNAME:
      'Username must be 3-30 characters and can only contain letters, numbers, and underscores.',
    MIN_LENGTH: (min: number) => `Must be at least ${min} characters.`,
    MAX_LENGTH: (max: number) => `Must be no more than ${max} characters.`,
    MIN_VALUE: (min: number) => `Must be at least ${min}.`,
    MAX_VALUE: (max: number) => `Must be no more than ${max}.`,
    PATTERN: 'Invalid format.',
  },
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  SAVED: 'Saved successfully.',
  UPDATED: 'Updated successfully.',
  DELETED: 'Deleted successfully.',
  SENT: 'Sent successfully.',
  COPIED: 'Copied to clipboard.',
  UPLOADED: 'Uploaded successfully.',
  DOWNLOADED: 'Downloaded successfully.',
  REGISTERED: 'Registration successful.',
  LOGIN: 'Login successful.',
  LOGOUT: 'Logout successful.',
  PASSWORD_RESET: 'Password reset instructions sent to your email.',
} as const;

// Platform
export const PLATFORM = {
  IS_IOS: Platform.OS === 'ios',
  IS_ANDROID: Platform.OS === 'android',
  IS_WEB: Platform.OS === 'web',
} as const;

// Social Media
export const SOCIAL = {
  FACEBOOK: 'https://facebook.com/',
  TWITTER: 'https://twitter.com/',
  INSTAGRAM: 'https://instagram.com/',
  LINKEDIN: 'https://linkedin.com/in/',
  YOUTUBE: 'https://youtube.com/',
  TIKTOK: 'https://tiktok.com/@',
} as const;

// Permissions
export const PERMISSIONS_TEXT = {
  CAMERA: {
    TITLE: 'Camera Permission',
    MESSAGE: 'This app needs access to your camera to take photos.',
    BUTTON_POSITIVE: 'Allow',
    BUTTON_NEGATIVE: 'Deny',
  },
  GALLERY: {
    TITLE: 'Gallery Permission',
    MESSAGE: 'This app needs access to your gallery to select photos.',
    BUTTON_POSITIVE: 'Allow',
    BUTTON_NEGATIVE: 'Deny',
  },
  LOCATION: {
    TITLE: 'Location Permission',
    MESSAGE: 'This app needs access to your location to show nearby content.',
    BUTTON_POSITIVE: 'Allow',
    BUTTON_NEGATIVE: 'Deny',
  },
  NOTIFICATIONS: {
    TITLE: 'Notification Permission',
    MESSAGE: 'Enable notifications to receive updates and messages.',
    BUTTON_POSITIVE: 'Enable',
    BUTTON_NEGATIVE: 'Not Now',
  },
  CONTACTS: {
    TITLE: 'Contacts Permission',
    MESSAGE: 'This app needs access to your contacts to find friends.',
    BUTTON_POSITIVE: 'Allow',
    BUTTON_NEGATIVE: 'Deny',
  },
} as const;

import { Platform } from 'react-native';
