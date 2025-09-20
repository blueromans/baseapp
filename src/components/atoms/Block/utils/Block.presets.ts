// React and React Native
import { ViewStyle } from 'react-native';

export const applyShadowStyles = (
  shadow: boolean | 'none' | 'sm' | 'md' | 'lg' | 'xl' | undefined,
  colors: any,
  sizes: any,
): ViewStyle => {
  if (!shadow || shadow === 'none') return {};

  const shadowMap = {
    sm: {
      shadowOpacity: 0.1,
      shadowRadius: 2,
      shadowOffset: { width: 0, height: 1 },
      elevation: 2,
    },
    md: {
      shadowOpacity: 0.15,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 4,
    },
    lg: {
      shadowOpacity: 0.2,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 8,
    },
    xl: {
      shadowOpacity: 0.25,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 12,
    },
  };

  if (typeof shadow === 'string' && shadow in shadowMap) {
    return {
      shadowColor: colors.shadow || '#000',
      ...shadowMap[shadow as keyof typeof shadowMap],
    };
  }

  // Default shadow for boolean true
  return {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: sizes.shadowOffsetWidth || 0,
      height: sizes.shadowOffsetHeight || 4,
    },
    shadowOpacity: sizes.shadowOpacity || 0.25,
    shadowRadius: sizes.shadowRadius || 3.84,
    elevation: 5,
  };
};

export const applyCardStyles = (
  card: boolean | undefined,
  backgroundColor: any,
  shadow: boolean | 'none' | 'sm' | 'md' | 'lg' | 'xl' | undefined,
  colors: any,
  sizes: any,
): ViewStyle => {
  if (!card) return {};

  return {
    backgroundColor: backgroundColor || colors.card,
    borderRadius: sizes.cardRadius,
    padding: sizes.cardPadding,
    ...(shadow !== false &&
      shadow !== 'none' &&
      applyShadowStyles(shadow || 'md', colors, sizes)),
  };
};

export const applyOutlinedStyles = (
  outlined: boolean | undefined,
  backgroundColor: any,
  customBorderColor: any,
  colors: any,
): ViewStyle => {
  if (!outlined) return {};

  return {
    borderWidth: 1,
    borderColor: customBorderColor || backgroundColor || colors.gray,
    backgroundColor: 'transparent',
  };
};

export const applySafeAreaStyles = (
  safe: boolean | undefined,
  insets: any,
  paddingTop?: number,
  paddingBottom?: number,
  paddingLeft?: number,
  paddingRight?: number,
): ViewStyle => {
  if (!safe) return {};

  return {
    paddingTop: (paddingTop || 0) + insets.top,
    paddingBottom: (paddingBottom || 0) + insets.bottom,
    paddingLeft: (paddingLeft || 0) + insets.left,
    paddingRight: (paddingRight || 0) + insets.right,
  };
};
