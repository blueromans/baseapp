// Main export
export { default as Block } from './Block';
export type { IBlockProps } from './Block.types';

// Additional type exports for external use
export type {
  IBlockStyleProps,
  IBlockBehaviorProps,
  BlockComputedStyles,
} from './Block.types';

// Export component variants if needed externally
export {
  BaseBlock,
  ScrollBlock,
  KeyboardBlock,
  TouchableBlock,
} from './components';

// Export hooks for custom implementations
export { useBlockStyles, useBlockProps } from './hooks';

// Export constants for external reference
export * from './constants';
