// React and React Native
import { useWindowDimensions } from 'react-native';

// Local Components and Hooks
import { useTheme } from '../context/ThemeContext';

type ResponsiveValue<T> =
  | T
  | { xs?: T; sm?: T; md?: T; lg?: T; xl?: T; '2xl'?: T };

// Hook to get responsive values based on breakpoints
export const useResponsive = <T>(value: ResponsiveValue<T>): T | undefined => {
  const { width } = useWindowDimensions();
  const { theme } = useTheme();
  const { breakpoints } = theme;

  // If not an object, return the value directly
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  // Determine current breakpoint
  let currentBreakpoint = 'xs';
  if (width >= breakpoints['2xl']) currentBreakpoint = '2xl';
  else if (width >= breakpoints.xl) currentBreakpoint = 'xl';
  else if (width >= breakpoints.lg) currentBreakpoint = 'lg';
  else if (width >= breakpoints.md) currentBreakpoint = 'md';
  else if (width >= breakpoints.sm) currentBreakpoint = 'sm';

  // Get value for current breakpoint or fallback
  const responsiveObj = value as any;

  // Try to get value for current breakpoint
  if (responsiveObj[currentBreakpoint] !== undefined) {
    return responsiveObj[currentBreakpoint];
  }

  // Fallback to smaller breakpoints
  const breakpointOrder = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);

  for (let i = currentIndex + 1; i < breakpointOrder.length; i++) {
    const breakpoint = breakpointOrder[i];
    if (responsiveObj[breakpoint] !== undefined) {
      return responsiveObj[breakpoint];
    }
  }

  return undefined;
};

// Hook to check if current breakpoint matches
export const useBreakpoint = () => {
  const { width } = useWindowDimensions();
  const { theme } = useTheme();
  const { breakpoints } = theme;

  return {
    isXs: width >= breakpoints.xs && width < breakpoints.sm,
    isSm: width >= breakpoints.sm && width < breakpoints.md,
    isMd: width >= breakpoints.md && width < breakpoints.lg,
    isLg: width >= breakpoints.lg && width < breakpoints.xl,
    isXl: width >= breakpoints.xl && width < breakpoints['2xl'],
    is2xl: width >= breakpoints['2xl'],

    // Utilities
    isMobile: width < breakpoints.md,
    isTablet: width >= breakpoints.md && width < breakpoints.lg,
    isDesktop: width >= breakpoints.lg,
  };
};
