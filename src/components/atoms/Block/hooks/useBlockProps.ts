/**
 * useBlockProps Hook
 * Extracts and memoizes View-compatible props from Block props
 */

import { useMemo } from 'react';
import type { ViewProps } from 'react-native';
import type { IBlockProps } from '../Block.types';
import { extractViewProps } from '../utils';

/**
 * Hook to extract View props with memoization
 */
export const useBlockProps = (props: IBlockProps): ViewProps => {
  return useMemo(() => extractViewProps(props), [props]);
};
