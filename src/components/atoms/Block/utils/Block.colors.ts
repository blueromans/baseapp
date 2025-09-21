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

  // Return early if colors is not available
  if (!colors) {
    if (color) return color;
    // Provide fallback colors when theme is not available
    if (black) return '#000000';
    if (white) return '#FFFFFF';
    if (gray) return '#808080';
    return undefined;
  }

  if (color) return color;
  if (primary) return colors.primary || '#007AFF';
  if (secondary) return colors.secondary || '#5856D6';
  if (tertiary) return colors.tertiary || '#FF3B30';
  if (black) return colors.black || '#000000';
  if (white) return colors.white || '#FFFFFF';
  if (gray) return colors.gray || '#808080';
  if (danger) return colors.danger || '#FF3B30';
  if (warning) return colors.warning || '#FF9500';
  if (success) return colors.success || '#4CD964';
  if (info) return colors.info || '#007AFF';
  if (card) return colors.card || '#FFFFFF';

  return undefined;
};
