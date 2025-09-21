/**
 * Navigation Configuration
 * Configuration options for React Navigation
 */

import { Config } from '@/config';
import { size } from '@/utils/helpers/size';

// Navigation themes are now handled by useNavigationTheme hook
// which integrates with the app's theme system

// Navigation Options Configuration
export const defaultScreenOptions = {
  headerShown: true,
  headerTitleAlign: 'center' as const,
  headerBackTitleVisible: false,
  headerShadowVisible: false,
  animation: 'slide_from_right' as const,
};

// Tab Bar Options Configuration
// Colors will be provided at runtime through theme integration
export const getDefaultTabOptions = (themeColors: any) => ({
  tabBarActiveTintColor: themeColors.brand.primary,
  tabBarInactiveTintColor: themeColors.text.tertiary,
  tabBarLabelStyle: {
    fontSize: size(11),
    fontWeight: '500' as const,
  },
  tabBarStyle: {
    borderTopWidth: 0.5,
    borderTopColor: themeColors.border.subtle,
  },
  headerShown: false,
});

// Modal Options Configuration
export const modalOptions = {
  presentation: 'modal' as const,
  headerShown: true,
  headerTitleAlign: 'center' as const,
  animation: 'slide_from_bottom' as const,
  gestureEnabled: true,
  cardOverlayEnabled: true,
};

// Linking Configuration - using app config for environment-specific URLs
export const linkingConfig = {
  prefixes: [
    `${Config.deepLinking.scheme}://`,
    ...Config.deepLinking.universalLinks.ios,
    ...Config.deepLinking.universalLinks.android,
  ],
  config: {
    screens: {
      Main: {
        screens: {
          Home: 'home',
          Profile: 'profile/:id?',
          Settings: 'settings',
        },
      },
      Auth: {
        screens: {
          SignIn: 'signin',
          SignUp: 'signup',
          ForgotPassword: 'forgot-password',
          ResetPassword: 'reset-password/:token',
          VerifyEmail: 'verify-email/:email',
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

// Navigation Container Props
export const navigationContainerProps = {
  documentTitle: {
    formatter: (options: any, route: any) =>
      `${options?.title ?? route?.name} - ${Config.displayName}`,
  },
  fallback: null,
};
