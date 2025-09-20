// React and React Native
import { ViewStyle } from 'react-native';

// Local Components and Hooks
import { IBlockProps, BlockComputedStyles } from '../Block.types';

export const buildBlockStyles = (props: IBlockProps): BlockComputedStyles => {
  const {
    // Layout props
    flex = 1,
    row,
    wrap,
    justify,
    align,
    center,

    // Spacing props
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

    // Dimension props
    height,
    width,
    fullWidth,
    fullHeight,

    // Position props
    position,
    right,
    left,
    top,
    bottom,

    // Visual props
    opacity,
    overflow,

    // Radius props
    radius,
    topLeftRadius,
    topRightRadius,
    bottomLeftRadius,
    bottomRightRadius,
  } = props;

  const baseStyles: ViewStyle = {
    // Flex properties
    ...(flex !== undefined && { flex }),
    ...(row && { flexDirection: 'row' }),
    ...(wrap && { flexWrap: typeof wrap === 'boolean' ? 'wrap' : wrap }),
    ...(justify && { justifyContent: justify }),
    ...(align && { alignItems: align }),
    ...(center && {
      justifyContent: 'center',
      alignItems: 'center',
    }),

    // Spacing
    ...(margin !== undefined && { margin }),
    ...(marginBottom !== undefined && { marginBottom }),
    ...(marginTop !== undefined && { marginTop }),
    ...(marginHorizontal !== undefined && { marginHorizontal }),
    ...(marginVertical !== undefined && { marginVertical }),
    ...(marginRight !== undefined && { marginRight }),
    ...(marginLeft !== undefined && { marginLeft }),
    ...(padding !== undefined && { padding }),
    ...(paddingBottom !== undefined && { paddingBottom }),
    ...(paddingTop !== undefined && { paddingTop }),
    ...(paddingHorizontal !== undefined && { paddingHorizontal }),
    ...(paddingVertical !== undefined && { paddingVertical }),
    ...(paddingRight !== undefined && { paddingRight }),
    ...(paddingLeft !== undefined && { paddingLeft }),

    // Visual
    ...(opacity !== undefined && { opacity }),
    ...(overflow && { overflow }),

    // Dimensions
    ...(height !== undefined && { height }),
    ...(width !== undefined && { width }),
    ...(fullWidth && { width: '100%' }),
    ...(fullHeight && { height: '100%' }),

    // Border radius
    ...(radius !== undefined && { borderRadius: radius }),
    ...(topLeftRadius !== undefined && { borderTopLeftRadius: topLeftRadius }),
    ...(topRightRadius !== undefined && {
      borderTopRightRadius: topRightRadius,
    }),
    ...(bottomLeftRadius !== undefined && {
      borderBottomLeftRadius: bottomLeftRadius,
    }),
    ...(bottomRightRadius !== undefined && {
      borderBottomRightRadius: bottomRightRadius,
    }),

    // Position
    ...(position && { position }),
    ...(right !== undefined && { right }),
    ...(left !== undefined && { left }),
    ...(top !== undefined && { top }),
    ...(bottom !== undefined && { bottom }),
  };

  return baseStyles as BlockComputedStyles;
};
