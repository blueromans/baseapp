/**
 * Card Component Types
 */

import { ViewStyle } from 'react-native';

export interface ICardStyles {
  container?: ViewStyle;
  title?: ViewStyle;
  subtitle?: ViewStyle;
  content?: ViewStyle;
}

export type CardVariant = 'default' | 'outlined' | 'elevated';

export interface ICardTheme {
  backgroundColor: string;
  titleColor: string;
  subtitleColor: string;
  borderColor?: string;
}
