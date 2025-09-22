/**
 * Storage Constants
 * Keys for AsyncStorage and other storage solutions
 */

// Storage Key Prefix
const PREFIX = '@BaseApp:';

// Storage Keys
export const STORAGE_KEYS = {
  // Authentication
  AUTH_TOKEN: `${PREFIX}auth_token`,
  USER: `${PREFIX}user`,

  // User Preferences
  THEME: `${PREFIX}theme`,

  // App State
  FIRST_LAUNCH: `${PREFIX}first_launch`,
  ONBOARDING_COMPLETED: `${PREFIX}onboarding_completed`,
} as const;
