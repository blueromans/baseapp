/**
 * Storage Constants
 * Keys for AsyncStorage, MMKV, and other storage solutions
 */

// Storage Key Prefixes
const PREFIX = '@BaseApp:';

// Storage Keys
export const STORAGE_KEYS = {
  // Authentication
  AUTH: {
    TOKEN: `${PREFIX}auth_token`,
    REFRESH_TOKEN: `${PREFIX}refresh_token`,
    USER: `${PREFIX}user`,
    USER_ID: `${PREFIX}user_id`,
    IS_LOGGED_IN: `${PREFIX}is_logged_in`,
    REMEMBER_ME: `${PREFIX}remember_me`,
    BIOMETRIC_ENABLED: `${PREFIX}biometric_enabled`,
    SESSION_EXPIRE: `${PREFIX}session_expire`,
  },

  // User Preferences
  PREFERENCES: {
    THEME: `${PREFIX}theme`,
    THEME_MODE: `${PREFIX}theme_mode`,
    LANGUAGE: `${PREFIX}language`,
    NOTIFICATIONS_ENABLED: `${PREFIX}notifications_enabled`,
    SOUND_ENABLED: `${PREFIX}sound_enabled`,
    VIBRATION_ENABLED: `${PREFIX}vibration_enabled`,
    AUTO_PLAY_VIDEOS: `${PREFIX}auto_play_videos`,
    DATA_SAVER: `${PREFIX}data_saver`,
    FONT_SIZE: `${PREFIX}font_size`,
    REDUCED_MOTION: `${PREFIX}reduced_motion`,
  },

  // App State
  APP: {
    FIRST_LAUNCH: `${PREFIX}first_launch`,
    ONBOARDING_COMPLETED: `${PREFIX}onboarding_completed`,
    APP_VERSION: `${PREFIX}app_version`,
    LAST_UPDATE_CHECK: `${PREFIX}last_update_check`,
    CRASH_REPORTS_ENABLED: `${PREFIX}crash_reports_enabled`,
    ANALYTICS_ENABLED: `${PREFIX}analytics_enabled`,
    RATING_SHOWN: `${PREFIX}rating_shown`,
    RATING_TIMESTAMP: `${PREFIX}rating_timestamp`,
    INSTALL_DATE: `${PREFIX}install_date`,
  },

  // Cache
  CACHE: {
    USER_PROFILE: `${PREFIX}cache_user_profile`,
    FEED: `${PREFIX}cache_feed`,
    NOTIFICATIONS: `${PREFIX}cache_notifications`,
    MESSAGES: `${PREFIX}cache_messages`,
    DRAFTS: `${PREFIX}cache_drafts`,
    SEARCH_HISTORY: `${PREFIX}search_history`,
    RECENT_SEARCHES: `${PREFIX}recent_searches`,
    IMAGE_CACHE: `${PREFIX}image_cache`,
    API_CACHE: `${PREFIX}api_cache`,
  },

  // Navigation
  NAVIGATION: {
    LAST_SCREEN: `${PREFIX}last_screen`,
    DEEP_LINK: `${PREFIX}deep_link`,
    TAB_INDEX: `${PREFIX}tab_index`,
    NAVIGATION_STATE: `${PREFIX}navigation_state`,
  },

  // Security
  SECURITY: {
    PIN_CODE: `${PREFIX}pin_code`,
    PIN_ATTEMPTS: `${PREFIX}pin_attempts`,
    LOCK_TIME: `${PREFIX}lock_time`,
    ENCRYPTION_KEY: `${PREFIX}encryption_key`,
    PUBLIC_KEY: `${PREFIX}public_key`,
    PRIVATE_KEY: `${PREFIX}private_key`,
  },

  // Social
  SOCIAL: {
    FACEBOOK_TOKEN: `${PREFIX}facebook_token`,
    GOOGLE_TOKEN: `${PREFIX}google_token`,
    APPLE_TOKEN: `${PREFIX}apple_token`,
    TWITTER_TOKEN: `${PREFIX}twitter_token`,
    LINKED_ACCOUNTS: `${PREFIX}linked_accounts`,
  },

  // Media
  MEDIA: {
    CAMERA_PERMISSION: `${PREFIX}camera_permission`,
    GALLERY_PERMISSION: `${PREFIX}gallery_permission`,
    MICROPHONE_PERMISSION: `${PREFIX}microphone_permission`,
    LAST_PHOTO: `${PREFIX}last_photo`,
    LAST_VIDEO: `${PREFIX}last_video`,
    DOWNLOAD_PATH: `${PREFIX}download_path`,
  },

  // Location
  LOCATION: {
    PERMISSION_STATUS: `${PREFIX}location_permission`,
    LAST_LOCATION: `${PREFIX}last_location`,
    SAVED_LOCATIONS: `${PREFIX}saved_locations`,
    LOCATION_HISTORY: `${PREFIX}location_history`,
  },

  // Offline
  OFFLINE: {
    QUEUE: `${PREFIX}offline_queue`,
    SYNCED: `${PREFIX}last_synced`,
    PENDING_UPLOADS: `${PREFIX}pending_uploads`,
    FAILED_REQUESTS: `${PREFIX}failed_requests`,
  },

  // Development
  DEV: {
    API_ENDPOINT: `${PREFIX}dev_api_endpoint`,
    DEBUG_MODE: `${PREFIX}dev_debug_mode`,
    LOG_LEVEL: `${PREFIX}dev_log_level`,
    MOCK_DATA: `${PREFIX}dev_mock_data`,
    TEST_USER: `${PREFIX}dev_test_user`,
  },
} as const;

// Storage Expiry Times (in milliseconds)
export const STORAGE_EXPIRY = {
  NEVER: -1,
  IMMEDIATE: 0,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000,
  YEAR: 365 * 24 * 60 * 60 * 1000,
} as const;

// Helper function to get storage key with expiry
export const getStorageKeyWithExpiry = (key: string): string => {
  return `${key}_expiry`;
};

// Helper function to check if key exists
export const isValidStorageKey = (key: string): boolean => {
  const allKeys = Object.values(STORAGE_KEYS).reduce((acc, section) => {
    return [...acc, ...Object.values(section)];
  }, [] as string[]);
  return allKeys.includes(key);
};

// Storage Limits
export const STORAGE_LIMITS = {
  MAX_CACHE_SIZE: 50 * 1024 * 1024, // 50MB
  MAX_SEARCH_HISTORY: 50,
  MAX_RECENT_SEARCHES: 10,
  MAX_SAVED_LOCATIONS: 20,
  MAX_OFFLINE_QUEUE: 100,
  MAX_FAILED_REQUESTS: 50,
} as const;

// Clear patterns - keys to clear on certain events
export const CLEAR_PATTERNS = {
  ON_LOGOUT: [
    STORAGE_KEYS.AUTH.TOKEN,
    STORAGE_KEYS.AUTH.REFRESH_TOKEN,
    STORAGE_KEYS.AUTH.USER,
    STORAGE_KEYS.AUTH.USER_ID,
    STORAGE_KEYS.AUTH.IS_LOGGED_IN,
    STORAGE_KEYS.CACHE.USER_PROFILE,
    STORAGE_KEYS.CACHE.FEED,
    STORAGE_KEYS.CACHE.NOTIFICATIONS,
    STORAGE_KEYS.CACHE.MESSAGES,
    STORAGE_KEYS.SOCIAL.FACEBOOK_TOKEN,
    STORAGE_KEYS.SOCIAL.GOOGLE_TOKEN,
    STORAGE_KEYS.SOCIAL.APPLE_TOKEN,
  ],
  ON_CLEAR_CACHE: [
    STORAGE_KEYS.CACHE.FEED,
    STORAGE_KEYS.CACHE.NOTIFICATIONS,
    STORAGE_KEYS.CACHE.MESSAGES,
    STORAGE_KEYS.CACHE.IMAGE_CACHE,
    STORAGE_KEYS.CACHE.API_CACHE,
  ],
  ON_RESET_APP: Object.values(STORAGE_KEYS).reduce((acc, section) => {
    return [...acc, ...Object.values(section)];
  }, [] as string[]),
} as const;
