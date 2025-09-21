/**
 * ListTemplate Component
 * A template for screens with lists and search functionality
 */

import React, { memo, useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useThemeColors } from '@/theme/context/ThemeContext';
import { useTranslation } from 'react-i18next';

import {
  Block,
  Header,
  SearchBar,
  TabBar,
  Body,
  ITabItem,
  FlatList,
} from '@/components';
import { size } from '@/utils';

export interface IListTemplateProps<T> {
  headerTitle?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  tabs?: ITabItem[];
  activeTab?: string;
  onTabChange?: (tabKey: string) => void;
  data: T[];
  renderItem: (item: T, index: number) => React.ReactElement;
  keyExtractor: (item: T, index: number) => string;
  onRefresh?: () => void;
  refreshing?: boolean;
  onEndReached?: () => void;
  ListEmptyComponent?: React.ReactElement;
  ListHeaderComponent?: React.ReactElement;
  showTabBar?: boolean;
  testID?: string;
}

function ListTemplateComponent<T>({
  headerTitle,
  showSearch = false,
  searchPlaceholder,
  onSearch,
  tabs = [],
  activeTab = '',
  onTabChange,
  data,
  renderItem,
  keyExtractor,
  onRefresh,
  refreshing = false,
  onEndReached,
  ListEmptyComponent,
  ListHeaderComponent,
  showTabBar = false,
  testID,
}: IListTemplateProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const colors = useThemeColors();
  const { t } = useTranslation();

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      onSearch?.(query);
    },
    [onSearch],
  );

  const handleTabPress = useCallback(
    (tabKey: string) => {
      onTabChange?.(tabKey);
    },
    [onTabChange],
  );

  const renderListItem = useCallback(
    ({ item, index }: { item: T; index: number }) => {
      return renderItem(item, index);
    },
    [renderItem],
  );

  return (
    <Block flex={1} testID={testID}>
      {/* Header */}
      {headerTitle && (
        <Header
          title={headerTitle}
          variant={showSearch ? 'search' : 'default'}
          searchBar={
            showSearch ? (
              <SearchBar
                value={searchQuery}
                onChangeText={handleSearch}
                placeholder={searchPlaceholder}
              />
            ) : undefined
          }
        />
      )}

      {/* Search Bar (if not in header) */}
      {showSearch && !headerTitle && (
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder={searchPlaceholder}
        />
      )}

      {/* List */}
      <FlatList
        data={data}
        renderItem={renderListItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          ListEmptyComponent || (
            <Block flex={1} center padding={size(32)}>
              <Body color={colors.text.tertiary} align="center">
                {t('common.noItems')}
              </Body>
            </Block>
          )
        }
        ListHeaderComponent={ListHeaderComponent}
      />

      {/* Tab Bar */}
      {showTabBar && tabs.length > 0 && (
        <TabBar tabs={tabs} activeTab={activeTab} onTabPress={handleTabPress} />
      )}
    </Block>
  );
}

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
  },
});

export const ListTemplate = memo(
  ListTemplateComponent,
) as typeof ListTemplateComponent;
