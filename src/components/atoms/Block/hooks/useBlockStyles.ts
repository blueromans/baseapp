/**
 * useBlockStyles Hook
 * Computes and memoizes all styles for Block component
 */

import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import type { IBlockProps, BlockComputedStyles } from '../Block.types';
import {
  buildBlockStyles,
  resolveBlockColor,
  applyShadowStyles,
  applyCardStyles,
  applyOutlinedStyles,
  applySafeAreaStyles,
} from '../utils';

/**
 * Hook to compute Block styles with memoization
 */
export const useBlockStyles = (
  props: IBlockProps,
  theme: any,
  insets: any,
): BlockComputedStyles => {
  return useMemo(() => {
    const { colors, sizes } = theme;
    const { shadow, card, outlined, borderColor, safe, style } = props;

    // Get base styles
    const baseStyles = buildBlockStyles(props, colors, sizes);

    // Resolve background color
    const backgroundColor = resolveBlockColor(props, colors);

    // Apply preset styles
    const shadowStyles = applyShadowStyles(shadow, colors, sizes);
    const cardStyles = applyCardStyles(
      card,
      backgroundColor,
      shadow,
      colors,
      sizes,
    );
    const outlinedStyles = applyOutlinedStyles(
      outlined,
      backgroundColor,
      borderColor,
      colors,
    );
    const safeAreaStyles = applySafeAreaStyles(
      safe,
      insets,
      props.paddingTop as number,
      props.paddingBottom as number,
      props.paddingLeft as number,
      props.paddingRight as number,
    );

    // Merge all styles
    return StyleSheet.flatten([
      baseStyles,
      backgroundColor && { backgroundColor },
      shadowStyles,
      cardStyles,
      outlinedStyles,
      safeAreaStyles,
      style,
    ]) as BlockComputedStyles;
  }, [props, theme, insets]);
};
