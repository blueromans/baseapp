/**
 * Block Container Component
 * Handles the main composition logic for Block component
 */

import React, { forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/theme';

// Types
import type { IBlockProps } from './Block.types';

// Components
import {
  BaseBlock,
  ScrollBlock,
  KeyboardBlock,
  TouchableBlock,
} from './components';

// Hooks
import { useBlockStyles } from './hooks/useBlockStyles';
import { useBlockProps } from './hooks/useBlockProps';

/**
 * Main Block component with container logic
 */
const BlockContainer = forwardRef<View, IBlockProps>((props, ref) => {
  const { children, keyboard, scroll, onPress, isLoading } = props;

  const theme = useTheme();
  const insets = useSafeAreaInsets();

  // Compute styles using custom hook
  const computedStyles = useBlockStyles(props, theme, insets);

  // Extract View props using custom hook
  const viewProps = useBlockProps(props);

  // Create base block content
  const baseBlockContent = useMemo(
    () => (
      <BaseBlock
        ref={ref}
        style={computedStyles}
        viewProps={viewProps}
        isLoading={isLoading}
      >
        {children}
      </BaseBlock>
    ),
    [ref, computedStyles, viewProps, isLoading, children],
  );

  // Handle scroll container
  if (scroll) {
    return (
      <ScrollBlock
        bounces={props.bounces}
        contentContainerStyle={props.contentContainerStyle}
        horizontal={props.horizontal ?? undefined}
        showsVerticalScrollIndicator={props.showsVerticalScrollIndicator}
        showsHorizontalScrollIndicator={props.showsHorizontalScrollIndicator}
        keyboardShouldPersistTaps={props.keyboardShouldPersistTaps}
        keyboardDismissMode={props.keyboardDismissMode}
      >
        {baseBlockContent}
      </ScrollBlock>
    );
  }

  // Handle keyboard container
  if (keyboard) {
    return (
      <KeyboardBlock
        scrollEnabled={props.scrollEnabled}
        keyboardShouldPersistTaps={props.keyboardShouldPersistTaps}
      >
        {baseBlockContent}
      </KeyboardBlock>
    );
  }

  // Handle touchable container
  if (onPress) {
    return (
      <TouchableBlock onPress={onPress}>{baseBlockContent}</TouchableBlock>
    );
  }

  // Default: return base block
  return baseBlockContent;
});

BlockContainer.displayName = 'Block';

export default React.memo(BlockContainer);
