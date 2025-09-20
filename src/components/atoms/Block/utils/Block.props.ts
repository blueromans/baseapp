// React and React Native
import { ViewProps } from 'react-native';

// Local Components and Hooks
import { IBlockProps } from '../Block.types';

export const extractViewProps = (props: IBlockProps): ViewProps => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    // Remove style props
    flex,
    row,
    wrap,
    justify,
    align,
    center,
    margin,
    marginBottom,
    marginTop,
    marginHorizontal,
    marginVertical,
    marginRight,
    marginLeft,
    padding,
    paddingBottom,
    paddingTop,
    paddingHorizontal,
    paddingVertical,
    paddingRight,
    paddingLeft,
    gap,
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
    shadow,
    card,
    outlined,
    opacity,
    borderColor,
    overflow,
    height,
    width,
    fullWidth,
    fullHeight,
    radius,
    topLeftRadius,
    topRightRadius,
    bottomLeftRadius,
    bottomRightRadius,
    position,
    right,
    left,
    top,
    bottom,
    style,
    safe,

    // Remove behavior props
    keyboard,
    scroll,
    onPress,
    isLoading,
    onKeyboardChange,

    // Remove scroll view props
    horizontal,
    showsVerticalScrollIndicator,
    showsHorizontalScrollIndicator,
    contentContainerStyle,
    scrollEnabled,
    keyboardShouldPersistTaps,
    keyboardDismissMode,
    bounces,

    ...restViewProps
  } = props;
  /* eslint-enable @typescript-eslint/no-unused-vars */

  return restViewProps as ViewProps;
};
