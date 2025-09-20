/**
 * Block Component Constants
 * Centralized configuration values
 */

import { Platform } from 'react-native';

/**
 * Default shadow configurations for different platforms
 */
export const SHADOW_PRESETS = {
  none: {},
  sm: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
    default: {},
  }),
  md: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
    default: {},
  }),
  lg: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: {
      elevation: 8,
    },
    default: {},
  }),
};

/**
 * Default card configuration
 */
export const CARD_DEFAULTS = {
  padding: 16,
  borderRadius: 12,
  backgroundColor: '#FFFFFF',
  shadow: true,
};

/**
 * Default outlined configuration
 */
export const OUTLINED_DEFAULTS = {
  borderWidth: 1,
  borderRadius: 8,
  borderColor: '#E0E0E0',
};

/**
 * Performance optimization thresholds
 */
export const PERFORMANCE_CONFIG = {
  STYLE_CACHE_SIZE: 100,
  MEMOIZE_THRESHOLD: 5, // Number of props to trigger memoization
};

/**
 * Prop extraction filters
 */
export const BLOCK_CUSTOM_PROPS = [
  // Style props
  'flex',
  'row',
  'wrap',
  'center',
  'overflow',
  'justify',
  'align',
  'color',
  'radius',
  'topLeftRadius',
  'topRightRadius',
  'bottomLeftRadius',
  'bottomRightRadius',
  'height',
  'width',
  'fullWidth',
  'fullHeight',
  'position',
  'right',
  'left',
  'top',
  'bottom',
  'opacity',
  'borderColor',
  'shadow',
  'card',
  'outlined',

  // Behavior props
  'safe',
  'keyboard',
  'scroll',
  'onKeyboardChange',
  'isLoading',

  // Spacing props
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingHorizontal',
  'paddingVertical',
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginHorizontal',
  'marginVertical',

  // Color props
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark',
  'gray',
  'white',
  'black',
  'transparent',

  // ScrollView props
  'bounces',
  'contentContainerStyle',
  'horizontal',
  'showsVerticalScrollIndicator',
  'showsHorizontalScrollIndicator',
  'keyboardShouldPersistTaps',
  'keyboardDismissMode',
  'scrollEnabled',
];
