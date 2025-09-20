/**
 * Navigation Constants
 * Screen names and navigation-related constants
 */

// Stack Names
export const STACKS = {
  AUTH: 'AuthStack',
  MAIN: 'MainStack',
  TAB: 'TabStack',
  MODAL: 'ModalStack',
} as const;

// Screen Names
export const SCREENS = {
  // Auth Screens
  AUTH: {
    WELCOME: 'Welcome',
    LOGIN: 'Login',
    REGISTER: 'Register',
    FORGOT_PASSWORD: 'ForgotPassword',
    RESET_PASSWORD: 'ResetPassword',
    VERIFY_EMAIL: 'VerifyEmail',
    VERIFY_PHONE: 'VerifyPhone',
    ONBOARDING: 'Onboarding',
  },

  // Tab Screens
  TABS: {
    HOME: 'Home',
    EXPLORE: 'Explore',
    CREATE: 'Create',
    NOTIFICATIONS: 'Notifications',
    PROFILE: 'Profile',
  },

  // Main Screens
  MAIN: {
    // Profile
    PROFILE_VIEW: 'ProfileView',
    PROFILE_EDIT: 'ProfileEdit',
    SETTINGS: 'Settings',
    ACCOUNT_SETTINGS: 'AccountSettings',
    PRIVACY_SETTINGS: 'PrivacySettings',
    NOTIFICATION_SETTINGS: 'NotificationSettings',
    APPEARANCE_SETTINGS: 'AppearanceSettings',

    // Social
    POST_DETAIL: 'PostDetail',
    USER_PROFILE: 'UserProfile',
    FOLLOWERS: 'Followers',
    FOLLOWING: 'Following',
    COMMENTS: 'Comments',
    LIKES: 'Likes',

    // Chat
    CHAT_LIST: 'ChatList',
    CHAT_DETAIL: 'ChatDetail',
    CHAT_SETTINGS: 'ChatSettings',
    NEW_CHAT: 'NewChat',

    // Media
    CAMERA: 'Camera',
    GALLERY: 'Gallery',
    IMAGE_VIEWER: 'ImageViewer',
    VIDEO_PLAYER: 'VideoPlayer',

    // Others
    SEARCH: 'Search',
    SEARCH_RESULTS: 'SearchResults',
    FILTER: 'Filter',
    MAP: 'Map',
    WEB_VIEW: 'WebView',
    QR_SCANNER: 'QRScanner',
    ABOUT: 'About',
    HELP: 'Help',
    FAQ: 'FAQ',
    CONTACT: 'Contact',
    TERMS: 'Terms',
    PRIVACY: 'Privacy',
  },

  // Modal Screens
  MODALS: {
    ALERT: 'AlertModal',
    CONFIRM: 'ConfirmModal',
    SELECT: 'SelectModal',
    DATE_PICKER: 'DatePickerModal',
    TIME_PICKER: 'TimePickerModal',
    PHOTO_OPTIONS: 'PhotoOptionsModal',
    SHARE: 'ShareModal',
    REPORT: 'ReportModal',
    BLOCK_USER: 'BlockUserModal',
    DELETE_ACCOUNT: 'DeleteAccountModal',
    LOGOUT: 'LogoutModal',
    RATE_APP: 'RateAppModal',
    SUCCESS: 'SuccessModal',
    ERROR: 'ErrorModal',
    INFO: 'InfoModal',
  },
} as const;

// Navigation Params Types
export type RootStackParamList = {
  // Auth Stack
  [SCREENS.AUTH.WELCOME]: undefined;
  [SCREENS.AUTH.LOGIN]: { email?: string };
  [SCREENS.AUTH.REGISTER]: undefined;
  [SCREENS.AUTH.FORGOT_PASSWORD]: undefined;
  [SCREENS.AUTH.RESET_PASSWORD]: { token: string };
  [SCREENS.AUTH.VERIFY_EMAIL]: { email: string };
  [SCREENS.AUTH.VERIFY_PHONE]: { phone: string };
  [SCREENS.AUTH.ONBOARDING]: undefined;

  // Tab Stack
  [SCREENS.TABS.HOME]: undefined;
  [SCREENS.TABS.EXPLORE]: undefined;
  [SCREENS.TABS.CREATE]: undefined;
  [SCREENS.TABS.NOTIFICATIONS]: undefined;
  [SCREENS.TABS.PROFILE]: undefined;

  // Main Stack
  [SCREENS.MAIN.PROFILE_VIEW]: { userId: string };
  [SCREENS.MAIN.PROFILE_EDIT]: undefined;
  [SCREENS.MAIN.POST_DETAIL]: { postId: string };
  [SCREENS.MAIN.USER_PROFILE]: { userId: string };
  [SCREENS.MAIN.COMMENTS]: { postId: string };
  [SCREENS.MAIN.CHAT_DETAIL]: { chatId: string; userId?: string };
  [SCREENS.MAIN.IMAGE_VIEWER]: { images: string[]; initialIndex?: number };
  [SCREENS.MAIN.VIDEO_PLAYER]: { videoUrl: string };
  [SCREENS.MAIN.WEB_VIEW]: { url: string; title?: string };
  [SCREENS.MAIN.SEARCH_RESULTS]: { query: string; type?: string };

  // Modal Stack
  [SCREENS.MODALS.ALERT]: { title: string; message: string };
  [SCREENS.MODALS.CONFIRM]: {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
  };
  [SCREENS.MODALS.SELECT]: {
    title: string;
    options: Array<{ label: string; value: any }>;
    onSelect: (value: any) => void;
  };
};

// Tab Bar Icons
export const TAB_ICONS = {
  [SCREENS.TABS.HOME]: {
    focused: 'home',
    unfocused: 'home-outline',
  },
  [SCREENS.TABS.EXPLORE]: {
    focused: 'search',
    unfocused: 'search-outline',
  },
  [SCREENS.TABS.CREATE]: {
    focused: 'add-circle',
    unfocused: 'add-circle-outline',
  },
  [SCREENS.TABS.NOTIFICATIONS]: {
    focused: 'notifications',
    unfocused: 'notifications-outline',
  },
  [SCREENS.TABS.PROFILE]: {
    focused: 'person',
    unfocused: 'person-outline',
  },
} as const;

// Navigation Options
export const NAVIGATION_OPTIONS = {
  HEADER_SHOWN: true,
  HEADER_TRANSPARENT: false,
  HEADER_TITLE_ALIGN: 'center' as const,
  GESTURE_ENABLED: true,
  ANIMATION: 'slide_from_right' as const,
  PRESENTATION: 'card' as const,
} as const;

// Deep Link Paths
export const DEEP_LINK_PATHS = {
  POST: 'post/:id',
  USER: 'user/:id',
  CHAT: 'chat/:id',
  SETTINGS: 'settings',
  PROFILE: 'profile',
  EXPLORE: 'explore',
  NOTIFICATIONS: 'notifications',
} as const;

// Navigation Events
export const NAVIGATION_EVENTS = {
  FOCUS: 'focus',
  BLUR: 'blur',
  BEFORE_REMOVE: 'beforeRemove',
  STATE_CHANGE: 'state',
} as const;
