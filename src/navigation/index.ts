// Components
export { default as NavigationContainer } from './Container';
export { default as StoreWrapper } from './Wrapper';

// Navigators
export { RootNavigator, AuthNavigator, TabNavigator } from './navigators';

// Types
export type {
  RootStackParamList,
  MainTabParamList,
  AuthStackParamList,
  RootStackScreenProps,
  MainTabScreenProps,
  AuthStackScreenProps,
  NavigationState,
  RouteConfig,
  LinkingConfig,
  HomeScreenProps,
  ProfileScreenProps,
  SettingsScreenProps,
  SignInScreenProps,
  SignUpScreenProps,
  ForgotPasswordScreenProps,
  ResetPasswordScreenProps,
  VerifyEmailScreenProps,
} from './types';

// Hooks
export {
  useRootNavigation,
  useMainTabNavigation,
  useAuthNavigation,
  useTypedRoute,
  useBackHandler,
  useScreenFocus,
  useNavigationState,
  useDeepLinking,
  useNavigationAnalytics,
  usePreventNavigation,
} from './hooks';

export { useNavigationTheme } from './useNavigationTheme';

// Configuration
export {
  defaultScreenOptions,
  getDefaultTabOptions,
  modalOptions,
  linkingConfig,
  navigationContainerProps,
} from './config';
