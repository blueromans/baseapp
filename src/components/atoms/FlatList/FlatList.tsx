/**
 * FlatList Component
 * An optimized list component built on top of FlashList
 */

import React, { memo, useMemo, forwardRef } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { size } from '@/utils';
import { useThemeColors } from '@/theme';

import type { CustomFlatListProps, FlatListRef } from './FlatList.types';

// Memoized separator component
const ItemSeparator = memo<{ height: number }>(({ height }) => (
  <View style={{ height }} />
));

ItemSeparator.displayName = 'ItemSeparator';

/**
 * Generic FlatList component with TypeScript support
 * @template T - The type of items in the data array
 */
function FlatListInner<T = any>(
  props: CustomFlatListProps<T>,
  ref: React.Ref<FlatListRef<T>>,
) {
  const {
    showsHorizontalScrollIndicator = false,
    showsVerticalScrollIndicator = false,
    bounces = true,
    refreshing = false,
    onRefresh,
    refreshControlProps,
    separatorHeight = size(12),
    showEmptyLoading = false,
    ListEmptyComponent,
    scrollWhenEmpty = false,
    data,
    testID,
    ...restProps
  } = props;

  const colors = useThemeColors();

  // Memoize separator component with height
  const ItemSeparatorComponent = useMemo(
    () =>
      separatorHeight > 0
        ? () => <ItemSeparator height={separatorHeight} />
        : undefined,
    [separatorHeight],
  );

  // Calculate if scroll should be enabled
  const isScrollEnabled = useMemo(() => {
    if (refreshing) return false;
    if (!data || data.length === 0) return scrollWhenEmpty;
    return true;
  }, [data, refreshing, scrollWhenEmpty]);

  // Create refresh control if needed
  const refreshControl = useMemo(() => {
    if (!onRefresh) return undefined;

    return (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        tintColor={colors.brand.primary}
        colors={[colors.brand.primary]}
        {...refreshControlProps}
      />
    );
  }, [refreshing, onRefresh, colors.brand.primary, refreshControlProps]);

  // Handle empty component
  const EmptyComponent = useMemo(() => {
    if (showEmptyLoading && refreshing) {
      return null; // Could return a loading component here
    }
    return ListEmptyComponent;
  }, [showEmptyLoading, refreshing, ListEmptyComponent]);

  return (
    <View style={styles.container} testID={testID}>
      <FlashList<T>
        ref={ref as any}
        data={data}
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        bounces={bounces}
        ItemSeparatorComponent={ItemSeparatorComponent}
        scrollEnabled={isScrollEnabled}
        refreshControl={refreshControl}
        ListEmptyComponent={EmptyComponent}
        drawDistance={size(200)}
        {...restProps}
      />
    </View>
  );
}

// Create the ForwardRef component with proper typing
const FlatListForwardRef = forwardRef(FlatListInner);

// Type the component properly
const FlatListComponent = FlatListForwardRef as <T = any>(
  props: CustomFlatListProps<T> & {
    ref?: React.Ref<FlatListRef<T>>;
  },
) => React.ReactElement;

// Export the memoized component
export const FlatList = memo(FlatListComponent) as typeof FlatListComponent;

// Default export for backward compatibility
export default FlatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
