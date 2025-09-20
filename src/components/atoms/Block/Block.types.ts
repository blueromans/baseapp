// React and React Native
import {
  ScrollViewProps,
  ViewProps,
  ViewStyle,
  ColorValue,
} from 'react-native';

// Third Party Libraries
import { KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view';

// Global Types
import { ISpacing, IColorProps } from '@/types';

export interface IBlockStyleProps {
  /**
   * Renders a View flex style
   */
  flex?: ViewStyle['flex'];
  /**
   * Renders a View flexDirection: row style
   */
  row?: boolean;
  /**
   * Renders a View flexWrap style
   */
  wrap?: ViewStyle['flexWrap'];
  /**
   * Renders a View with predefined justifyContent: center
   */
  center?: boolean;
  /**
   * Renders a View style overflow
   */
  overflow?: ViewStyle['overflow'];
  /**
   * Renders a flex justifyContent
   */
  justify?: ViewStyle['justifyContent'];
  /**
   * Renders a flex alignItems
   */
  align?: ViewStyle['alignItems'];
  /**
   * Custom backgroundColor
   */
  color?: ColorValue;
  /**
   * Custom border radius values
   */
  radius?: ViewStyle['borderRadius'];
  topLeftRadius?: ViewStyle['borderTopLeftRadius'];
  topRightRadius?: ViewStyle['borderTopRightRadius'];
  bottomLeftRadius?: ViewStyle['borderBottomLeftRadius'];
  bottomRightRadius?: ViewStyle['borderBottomRightRadius'];
  /**
   * Dimensions
   */
  height?: ViewStyle['height'];
  width?: ViewStyle['width'];
  fullWidth?: boolean;
  fullHeight?: boolean;
  /**
   * Position props
   */
  position?: ViewStyle['position'];
  right?: ViewStyle['right'];
  left?: ViewStyle['left'];
  top?: ViewStyle['top'];
  bottom?: ViewStyle['bottom'];
  /**
   * Visual props
   */
  opacity?: ViewStyle['opacity'];
  borderColor?: ColorValue;
  /**
   * Pre-defined styles
   */
  shadow?: boolean | 'none' | 'sm' | 'md' | 'lg' | 'xl';
  card?: boolean;
  outlined?: boolean;
}

// Container behavior props
export interface IBlockBehaviorProps {
  /**
   * Renders a SafeAreaView component
   */
  safe?: boolean;
  /**
   * Renders a KeyboardAwareScrollView component
   */
  keyboard?: boolean;
  /**
   * Renders a ScrollView component
   */
  scroll?: boolean;
  /**
   * Callback when keyboard changes
   */
  onKeyboardChange?: (isVisible: boolean) => void;
  /**
   * Press handler
   */
  onPress?: () => void;
  /**
   * Loading state
   */
  isLoading?: boolean;
}

/**
 * ## Block Component Props
 * Extends ViewProps with custom styling and behavior
 *
 * @example
 * ```tsx
 * <Block flex row center padding={16}>
 *   <Text>Content</Text>
 * </Block>
 * ```
 */
export interface IBlockProps
  extends Omit<ViewProps, 'style'>,
    ISpacing,
    IColorProps,
    IBlockStyleProps,
    IBlockBehaviorProps,
    Partial<ScrollViewProps>,
    Partial<KeyboardAwareScrollViewProps> {
  /**
   * Custom style prop, merged last to override all other styles
   */
  style?: ViewStyle | ViewStyle[];
  /**
   * Children content
   */
  children?: React.ReactNode;
}

// Type for computed styles
export type BlockComputedStyles = ViewStyle & {
  // Ensures type safety for all style computations
};

// Helper type for style builder
export type StyleBuilder = (
  props: IBlockProps,
  theme: any,
) => BlockComputedStyles;
