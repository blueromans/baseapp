/**
 * FlatList Types
 * Type definitions for the FlatList component
 */

import { FlashList, FlashListProps } from '@shopify/flash-list';
import { RefreshControlProps } from 'react-native';

export interface CustomRefreshControlProps
  extends Partial<RefreshControlProps> {
  iconBackgroundColor?: string;
  logoSize?: number;
}

export interface CustomFlatListProps<T = any>
  extends Omit<FlashListProps<T>, 'refreshing' | 'onRefresh'> {
  /**
   * Whether the list is currently refreshing
   */
  refreshing?: boolean;

  /**
   * Callback fired when pull-to-refresh is triggered
   */
  onRefresh?: () => void;

  /**
   * Custom refresh control props
   */
  refreshControlProps?: CustomRefreshControlProps;

  /**
   * Height of the separator between items
   * @default size(12)
   */
  separatorHeight?: number;

  /**
   * Whether to show a loading indicator when the list is empty
   * @default false
   */
  showEmptyLoading?: boolean;

  /**
   * Component to show when the list is empty and not loading
   */
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;

  /**
   * Whether to enable scroll when list is empty
   * @default false
   */
  scrollWhenEmpty?: boolean;

  /**
   * Test ID for testing
   */
  testID?: string;
}

export type FlatListRef<T = any> = React.ComponentRef<typeof FlashList<T>>;
