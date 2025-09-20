/**
 * Navigation Configuration
 * Configuration options for React Navigation
 */

import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';

// Light Theme Configuration
export const LightNavigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007AFF',
    background: '#FFFFFF',
    card: '#F8F8F8',
    text: '#000000',
    border: '#E0E0E0',
    notification: '#FF3B30',
  },
};

// Dark Theme Configuration
export const DarkNavigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#60A5FA',
    background: '#111827',
    card: '#1F2937',
    text: '#F9FAFB',
    border: '#374151',
    notification: '#F87171',
  },
};

// Navigation Options Configuration
export const defaultScreenOptions = {
  headerShown: true,
  headerTitleAlign: 'center' as const,
  headerBackTitleVisible: false,
  headerShadowVisible: false,
  animation: 'slide_from_right' as const,
};

// Tab Bar Options Configuration
export const defaultTabOptions = {
  tabBarActiveTintColor: '#007AFF',
  tabBarInactiveTintColor: '#8E8E93',
  tabBarLabelStyle: {
    fontSize: 11,
    fontWeight: '500' as const,
  },
  tabBarStyle: {
    borderTopWidth: 0.5,
    borderTopColor: '#E0E0E0',
  },
  headerShown: false,
};

// Modal Options Configuration
export const modalOptions = {
  presentation: 'modal' as const,
  headerShown: true,
  headerTitleAlign: 'center' as const,
  animation: 'slide_from_bottom' as const,
  gestureEnabled: true,
  cardOverlayEnabled: true,
};

// Linking Configuration
export const linkingConfig = {
  prefixes: ['baseapp://', 'https://baseapp.com', 'https://*.baseapp.com'],
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
      `${options?.title ?? route?.name} - BaseApp`,
  },
  fallback: null,
};
