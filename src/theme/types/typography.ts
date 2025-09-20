// React and React Native
import { TextStyle } from 'react-native';

export interface FontFamilies {
  regular: string;
  medium: string;
  semibold: string;
  bold: string;
  light: string;
  thin: string;
  black: string;
  italic: string;
  boldItalic: string;
}

// Font sizes
export interface FontSizes {
  xs: number; // 10
  sm: number; // 12
  md: number; // 14
  lg: number; // 16
  xl: number; // 18
  '2xl': number; // 20
  '3xl': number; // 24
  '4xl': number; // 30
  '5xl': number; // 36
  '6xl': number; // 48
  '7xl': number; // 60
  '8xl': number; // 72
  '9xl': number; // 96
}

// Line heights
export interface LineHeights {
  none: number; // 1
  tight: number; // 1.25
  snug: number; // 1.375
  normal: number; // 1.5
  relaxed: number; // 1.625
  loose: number; // 2
}

// Letter spacing
export interface LetterSpacing {
  tighter: number; // -0.05
  tight: number; // -0.025
  normal: number; // 0
  wide: number; // 0.025
  wider: number; // 0.05
  widest: number; // 0.1
}

// Font weights
export interface FontWeights {
  thin: TextStyle['fontWeight']; // 100
  extralight: TextStyle['fontWeight']; // 200
  light: TextStyle['fontWeight']; // 300
  normal: TextStyle['fontWeight']; // 400
  medium: TextStyle['fontWeight']; // 500
  semibold: TextStyle['fontWeight']; // 600
  bold: TextStyle['fontWeight']; // 700
  extrabold: TextStyle['fontWeight']; // 800
  black: TextStyle['fontWeight']; // 900
  '100': TextStyle['fontWeight'];
  '200': TextStyle['fontWeight'];
  '300': TextStyle['fontWeight'];
  '400': TextStyle['fontWeight'];
  '500': TextStyle['fontWeight'];
  '600': TextStyle['fontWeight'];
  '700': TextStyle['fontWeight'];
  '800': TextStyle['fontWeight'];
  '900': TextStyle['fontWeight'];
}

// Typography variants
export interface TypographyVariants {
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  h4: TextStyle;
  h5: TextStyle;
  h6: TextStyle;
  subtitle1: TextStyle;
  subtitle2: TextStyle;
  body1: TextStyle;
  body2: TextStyle;
  button: TextStyle;
  caption: TextStyle;
  overline: TextStyle;
  label: TextStyle;
}

export interface ThemeTypography {
  fontFamilies: FontFamilies;
  fontSizes: FontSizes;
  lineHeights: LineHeights;
  letterSpacing: LetterSpacing;
  fontWeights: FontWeights;
  variants: TypographyVariants;
}
