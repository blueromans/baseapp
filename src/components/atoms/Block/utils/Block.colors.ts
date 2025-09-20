// React and React Native
import { ColorValue } from 'react-native';

// Local Components and Hooks
import { IBlockProps } from '../Block.types';

export const resolveBlockColor = (
  props: IBlockProps,
  colors: any,
): ColorValue | undefined => {
  const {
    color,
    primary,
    secondary,
    tertiary,
    black,
    white,
    gray,
    danger,
    warning,
    success,
    info,
    card,
  } = props;

  if (color) return color;
  if (primary) return colors.primary;
  if (secondary) return colors.secondary;
  if (tertiary) return colors.tertiary;
  if (black) return colors.black;
  if (white) return colors.white;
  if (gray) return colors.gray;
  if (danger) return colors.danger;
  if (warning) return colors.warning;
  if (success) return colors.success;
  if (info) return colors.info;
  if (card) return colors.card;

  return undefined;
};
