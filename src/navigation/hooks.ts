/**
 * Navigation Hooks
 * Custom hooks for navigation functionality
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
  NavigationProp,
  RouteProp,
} from '@react-navigation/native';
import type {
  RootStackParamList,
  MainTabParamList,
  AuthStackParamList,
} from './types';

/**
 * Typed navigation hook for Root Stack
 */
export const useRootNavigation = () => {
  return useNavigation<NavigationProp<RootStackParamList>>();
};

/**
 * Typed navigation hook for Main Tab
 */
export const useMainTabNavigation = () => {
  return useNavigation<NavigationProp<MainTabParamList>>();
};

/**
 * Typed navigation hook for Auth Stack
 */
export const useAuthNavigation = () => {
  return useNavigation<NavigationProp<AuthStackParamList>>();
};

/**
 * Typed route hook
 */
export const useTypedRoute = <T extends keyof RootStackParamList>() => {
  return useRoute<RouteProp<RootStackParamList, T>>();
};

/**
 * Hook to handle back navigation
 */
export const useBackHandler = (onBack: () => boolean) => {
  const navigation = useNavigation();

  useEffect(() => {
    const subscription = navigation.addListener('beforeRemove', e => {
      if (onBack()) {
        return;
      }
      e.preventDefault();
    });

    return subscription;
  }, [navigation, onBack]);
};

/**
 * Hook to track screen focus state
 */
export const useScreenFocus = (
  callback: () => void,
  deps: React.DependencyList = [],
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useFocusEffect(
    useCallback(() => {
      callbackRef.current();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps]),
  );
};

/**
 * Hook to handle navigation state persistence
 */
export const useNavigationState = () => {
  const navigation = useNavigation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      setIsReady(true);
    });

    return unsubscribe;
  }, [navigation]);

  return { isReady };
};

/**
 * Hook to handle deep linking
 */
export const useDeepLinking = (url: string | null) => {
  const navigation = useNavigation();
  const processedUrls = useRef(new Set<string>());

  useEffect(() => {
    if (url && !processedUrls.current.has(url)) {
      processedUrls.current.add(url);
      handleDeepLink(url, navigation);
    }
  }, [url, navigation]);
};

/**
 * Hook for navigation analytics
 */
export const useNavigationAnalytics = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      // Track screen view
      const currentRoute = route.name;
      const params = route.params;

      console.log('Screen View:', {
        screen: currentRoute,
        params,
        timestamp: new Date().toISOString(),
      });

      // Here you would integrate with your analytics service
      // analytics.track('screen_view', { screen: currentRoute, params });
    });

    return unsubscribe;
  }, [navigation, route]);
};

/**
 * Hook to prevent navigation when form has unsaved changes
 */
export const usePreventNavigation = (
  hasUnsavedChanges: boolean,
  message?: string,
) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const unsubscribe = navigation.addListener('beforeRemove', e => {
      e.preventDefault();

      // Show confirmation dialog
      Alert.alert(
        'Discard changes?',
        message || 'You have unsaved changes. Are you sure you want to leave?',
        [
          { text: "Don't leave", style: 'cancel' },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.dispatch(e.data.action),
          },
        ],
      );
    });

    return unsubscribe;
  }, [navigation, hasUnsavedChanges, message]);
};

// Helper function for deep linking
function handleDeepLink(url: string, navigation: any) {
  // Parse URL and navigate accordingly
  const route = url.replace(/.*?:\/\//g, '');
  const routeName = route.split('/')[0];
  const params = route.split('/').slice(1);

  if (routeName) {
    navigation.navigate(
      routeName,
      params.length > 0 ? { id: params[0] } : undefined,
    );
  }
}
