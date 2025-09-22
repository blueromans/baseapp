/**
 * Navigation Types
 * Type definitions for React Navigation
 */

import type { NavigatorScreenParams } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import * as initialScreenNames from '@/screens';

import TabNavigator from './navigators/TabNavigator';

// Root Stack Navigator Types
export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
};

// Main Tab Navigator Types
export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
};

// Auth Stack Navigator Types
export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

// Screen Props Types
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  BottomTabScreenProps<MainTabParamList, T>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  StackScreenProps<AuthStackParamList, T>;

export type ScreenNames = typeof initialScreenNames & {
  TabNavigator: typeof TabNavigator;
};

export interface ScreenItem {
  name: keyof ScreenNames;
  options: any;
}

export interface RouteItem {
  name: keyof ScreenNames;
  options: any;
  routes?: ScreenItem[];
}

const screenNames: ScreenNames = Object.assign({}, initialScreenNames, {
  TabNavigator,
});

export { screenNames };
