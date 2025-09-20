// React and React Native
import { ColorValue } from 'react-native';

export interface SemanticColors {
  // Background colors
  background: {
    primary: ColorValue;
    secondary: ColorValue;
    tertiary: ColorValue;
    elevated: ColorValue;
    overlay: ColorValue;
  };

  // Text colors
  text: {
    primary: ColorValue;
    secondary: ColorValue;
    tertiary: ColorValue;
    disabled: ColorValue;
    inverse: ColorValue;
    link: ColorValue;
  };

  // Brand colors
  brand: {
    primary: ColorValue;
    secondary: ColorValue;
    tertiary: ColorValue;
  };

  // Status colors
  status: {
    success: ColorValue;
    warning: ColorValue;
    error: ColorValue;
    info: ColorValue;
  };

  // Interactive colors
  interactive: {
    default: ColorValue;
    hover: ColorValue;
    pressed: ColorValue;
    disabled: ColorValue;
    focus: ColorValue;
  };

  // Border colors
  border: {
    default: ColorValue;
    subtle: ColorValue;
    strong: ColorValue;
    focus: ColorValue;
  };

  // Surface colors
  surface: {
    card: ColorValue;
    modal: ColorValue;
    sheet: ColorValue;
  };

  // Shadow
  shadow: {
    default: ColorValue;
    strong: ColorValue;
  };
}

// Base palette
export interface ColorPalette {
  white: ColorValue;
  black: ColorValue;

  gray: {
    50: ColorValue;
    100: ColorValue;
    200: ColorValue;
    300: ColorValue;
    400: ColorValue;
    500: ColorValue;
    600: ColorValue;
    700: ColorValue;
    800: ColorValue;
    900: ColorValue;
  };

  red: {
    50: ColorValue;
    100: ColorValue;
    200: ColorValue;
    300: ColorValue;
    400: ColorValue;
    500: ColorValue;
    600: ColorValue;
    700: ColorValue;
    800: ColorValue;
    900: ColorValue;
  };

  green: {
    50: ColorValue;
    100: ColorValue;
    200: ColorValue;
    300: ColorValue;
    400: ColorValue;
    500: ColorValue;
    600: ColorValue;
    700: ColorValue;
    800: ColorValue;
    900: ColorValue;
  };

  blue: {
    50: ColorValue;
    100: ColorValue;
    200: ColorValue;
    300: ColorValue;
    400: ColorValue;
    500: ColorValue;
    600: ColorValue;
    700: ColorValue;
    800: ColorValue;
    900: ColorValue;
  };

  yellow: {
    50: ColorValue;
    100: ColorValue;
    200: ColorValue;
    300: ColorValue;
    400: ColorValue;
    500: ColorValue;
    600: ColorValue;
    700: ColorValue;
    800: ColorValue;
    900: ColorValue;
  };

  purple: {
    50: ColorValue;
    100: ColorValue;
    200: ColorValue;
    300: ColorValue;
    400: ColorValue;
    500: ColorValue;
    600: ColorValue;
    700: ColorValue;
    800: ColorValue;
    900: ColorValue;
  };
}

export interface ThemeColors extends SemanticColors {
  palette: ColorPalette;
}
