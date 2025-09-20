/**
 * Typography Component
 * A flexible text component with theme integration
 */

import React, { memo, useMemo } from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';
import { ITypographyProps } from './Typography.types';

const TypographyComponent: React.FC<ITypographyProps> = ({
  children,
  variant = 'body1',
  size,
  color,
  weight,
  align,
  transform,
  italic = false,
  underline = false,
  strikethrough = false,
  lineHeight,
  letterSpacing,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginHorizontal,
  marginVertical,
  selectable = false,
  numberOfLines,
  ellipsizeMode,
  adjustsFontSizeToFit,
  minimumFontScale,
  primary = false,
  secondary = false,
  tertiary = false,
  disabled = false,
  inverse = false,
  link = false,
  error = false,
  warning = false,
  success = false,
  info = false,
  style,
  testID,
  ...textProps
}) => {
  const { theme } = useTheme();

  const computedStyle = useMemo(() => {
    const styles: TextStyle[] = [];

    // Apply variant styles
    const variantStyle = theme.typography.variants[variant];
    if (variantStyle) {
      styles.push(variantStyle as TextStyle);
    }

    // Color based on semantic props or custom color
    let textColor = color;
    if (!textColor) {
      if (primary) textColor = theme.colors.text.primary;
      else if (secondary) textColor = theme.colors.text.secondary;
      else if (tertiary) textColor = theme.colors.text.tertiary;
      else if (disabled) textColor = theme.colors.text.disabled;
      else if (inverse) textColor = theme.colors.text.inverse;
      else if (link) textColor = theme.colors.text.link;
      else if (error) textColor = theme.colors.status.error;
      else if (warning) textColor = theme.colors.status.warning;
      else if (success) textColor = theme.colors.status.success;
      else if (info) textColor = theme.colors.status.info;
      else textColor = theme.colors.text.primary;
    }
    styles.push({ color: textColor as string });

    // Custom size
    if (size) {
      styles.push({ fontSize: size });
    }

    // Font weight
    if (weight) {
      const fontWeight = theme.typography.fontWeights[weight];
      styles.push({ fontWeight });
    }

    // Text alignment
    if (align) {
      styles.push({ textAlign: align });
    }

    // Text transform
    if (transform) {
      styles.push({ textTransform: transform });
    }

    // Text decorations
    const decorations: ('underline' | 'line-through')[] = [];
    if (underline) decorations.push('underline');
    if (strikethrough) decorations.push('line-through');
    if (decorations.length > 0) {
      styles.push({
        textDecorationLine: decorations.join(
          ' ',
        ) as TextStyle['textDecorationLine'],
      });
    }

    // Italic
    if (italic) {
      styles.push({ fontStyle: 'italic' });
    }

    // Line height
    if (lineHeight) {
      styles.push({ lineHeight });
    }

    // Letter spacing
    if (letterSpacing) {
      styles.push({ letterSpacing });
    }

    // Margins
    const marginStyle: TextStyle = {};
    if (margin !== undefined) marginStyle.margin = margin;
    if (marginTop !== undefined) marginStyle.marginTop = marginTop;
    if (marginBottom !== undefined) marginStyle.marginBottom = marginBottom;
    if (marginLeft !== undefined) marginStyle.marginLeft = marginLeft;
    if (marginRight !== undefined) marginStyle.marginRight = marginRight;
    if (marginHorizontal !== undefined)
      marginStyle.marginHorizontal = marginHorizontal;
    if (marginVertical !== undefined)
      marginStyle.marginVertical = marginVertical;
    if (Object.keys(marginStyle).length > 0) {
      styles.push(marginStyle);
    }

    // Custom styles
    if (style) {
      if (Array.isArray(style)) {
        styles.push(...style);
      } else {
        styles.push(style);
      }
    }

    return StyleSheet.flatten(styles);
  }, [
    theme,
    variant,
    size,
    color,
    weight,
    align,
    transform,
    italic,
    underline,
    strikethrough,
    lineHeight,
    letterSpacing,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    marginVertical,
    primary,
    secondary,
    tertiary,
    disabled,
    inverse,
    link,
    error,
    warning,
    success,
    info,
    style,
  ]);

  return (
    <Text
      style={computedStyle}
      selectable={selectable}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      minimumFontScale={minimumFontScale}
      testID={testID}
      {...textProps}
    >
      {children}
    </Text>
  );
};

export const Typography = memo(TypographyComponent);
