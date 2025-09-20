// React and React Native
import { ReactNode } from 'react';
import { TextProps as RNTextProps, TextStyle, ColorValue } from 'react-native';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'overline'
  | 'label';

export type FontWeight =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';
export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';

export interface ITypographyProps extends Omit<RNTextProps, 'style'> {
  // Content
  children?: ReactNode;

  // Variant
  variant?: TypographyVariant;

  // Text styling
  size?: number;
  color?: ColorValue;
  weight?: FontWeight;
  align?: TextAlign;
  transform?: TextTransform;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;

  // Spacing
  lineHeight?: number;
  letterSpacing?: number;

  // Layout
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;

  // Behavior
  selectable?: boolean;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  adjustsFontSizeToFit?: boolean;
  minimumFontScale?: number;

  // Theme
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  disabled?: boolean;
  inverse?: boolean;
  link?: boolean;
  error?: boolean;
  warning?: boolean;
  success?: boolean;
  info?: boolean;

  // Custom style
  style?: TextStyle | TextStyle[];

  // Testing
  testID?: string;
}
