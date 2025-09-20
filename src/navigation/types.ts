/**
 * Navigation Types
 * Type definitions for React Navigation
 */

import type {
  NavigatorScreenParams,
  CompositeScreenProps,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// Root Stack Navigator Types
export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Modal: undefined;
  NotFound: undefined;
};

// Main Tab Navigator Types
export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

// Auth Stack Navigator Types
export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string };
  VerifyEmail: { email: string };
};

// Screen Props Types
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  CompositeScreenProps<
    StackScreenProps<AuthStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

// Navigation Props for Screens
export type HomeScreenProps = MainTabScreenProps<'Home'>;
export type ProfileScreenProps = MainTabScreenProps<'Profile'>;
export type SettingsScreenProps = MainTabScreenProps<'Settings'>;

export type SignInScreenProps = AuthStackScreenProps<'SignIn'>;
export type SignUpScreenProps = AuthStackScreenProps<'SignUp'>;
export type ForgotPasswordScreenProps = AuthStackScreenProps<'ForgotPassword'>;
export type ResetPasswordScreenProps = AuthStackScreenProps<'ResetPassword'>;
export type VerifyEmailScreenProps = AuthStackScreenProps<'VerifyEmail'>;

// Navigation State Types
export interface NavigationState {
  isAuthenticated: boolean;
  isLoading: boolean;
  isOnboarded: boolean;
}

// Route Types
export interface RouteConfig {
  name: string;
  component: React.ComponentType<any>;
  options?: any;
  initialParams?: any;
}

// Linking Configuration Types
export interface LinkingConfig {
  prefixes: string[];
  config: {
    screens: Record<string, any>;
  };
}
