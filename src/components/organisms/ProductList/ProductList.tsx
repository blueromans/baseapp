/**
 * ProductList Component
 * An organism that displays a list of products with various layouts
 */

import React, { memo, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  View,
} from 'react-native';
import {
  Body,
  Caption,
  Label,
  ErrorText,
  Overline,
  Block,
  Card,
  FlatList,
} from '@/components';
import { useThemeColors } from '@/theme';
import { size, fontSize } from '@/utils';
import { useTranslation } from 'react-i18next';

const { width: screenWidth } = Dimensions.get('window');

export interface IProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  rating?: number;
  discount?: number;
  inStock?: boolean;
}

export interface IProductListProps {
  products: IProduct[];
  layout?: 'grid' | 'list';
  numColumns?: number;
  loading?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  onProductPress?: (product: IProduct) => void;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  ListHeaderComponent?: React.ReactElement;
  ListFooterComponent?: React.ReactElement;
  showEmptyState?: boolean;
  emptyStateText?: string;
  testID?: string;
}

const ProductListComponent: React.FC<IProductListProps> = ({
  products,
  layout = 'grid',
  numColumns = 2,
  loading = false,
  refreshing = false,
  onRefresh,
  onProductPress,
  onEndReached,
  onEndReachedThreshold = 0.5,
  ListHeaderComponent,
  ListFooterComponent,
  showEmptyState = true,
  emptyStateText,
  testID,
}) => {
  const colors = useThemeColors();
  const { t } = useTranslation();
  const styles = useMemo(() => getStyles(colors), [colors]);

  // Calculate item width for grid layout
  const itemWidth = useMemo(() => {
    if (layout === 'list') return screenWidth;
    const spacing = size(16);
    return (screenWidth - (numColumns + 1) * spacing) / numColumns;
  }, [layout, numColumns]);

  // Render product item
  const renderProduct = useCallback(
    ({ item }: { item: IProduct }) => {
      const isOutOfStock = item.inStock === false;

      if (layout === 'list') {
        return (
          <TouchableOpacity
            onPress={() => onProductPress?.(item)}
            activeOpacity={0.8}
            disabled={isOutOfStock}
          >
            <Card margin={size(8)}>
              <Block row opacity={isOutOfStock ? 0.5 : 1}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.listImage}
                  resizeMode="cover"
                />
                <Block flex={1} paddingLeft={size(12)}>
                  <Body weight="500" numberOfLines={2}>
                    {item.name}
                  </Body>
                  {item.description && (
                    <Caption numberOfLines={2} marginTop={size(4)}>
                      {item.description}
                    </Caption>
                  )}
                  <Block
                    row
                    align="center"
                    justify="space-between"
                    marginTop={size(8)}
                  >
                    <Block>
                      <Label weight="600" size={fontSize(16)}>
                        ${item.price.toFixed(2)}
                      </Label>
                      {isOutOfStock && (
                        <Caption
                          color={colors.status.error}
                          marginTop={size(2)}
                        >
                          {t('common.outOfStock', 'Out of Stock')}
                        </Caption>
                      )}
                    </Block>
                    {item.discount && !isOutOfStock && (
                      <ErrorText weight="600" size={fontSize(12)}>
                        -{item.discount}%
                      </ErrorText>
                    )}
                  </Block>
                  {item.rating && (
                    <Block row align="center" marginTop={size(4)}>
                      <Caption size={fontSize(12)}>⭐</Caption>
                      <Caption size={fontSize(12)} marginLeft={size(4)}>
                        {item.rating.toFixed(1)}
                      </Caption>
                    </Block>
                  )}
                </Block>
              </Block>
            </Card>
          </TouchableOpacity>
        );
      }

      // Grid layout
      return (
        <TouchableOpacity
          onPress={() => onProductPress?.(item)}
          activeOpacity={0.8}
          style={[styles.gridItem, { width: itemWidth }]}
          disabled={isOutOfStock}
        >
          <Card margin={size(8)} padding={size(8)}>
            <View style={{ opacity: isOutOfStock ? 0.5 : 1 }}>
              <Image
                source={{ uri: item.image }}
                style={[styles.gridImage, { width: itemWidth - size(16) }]}
                resizeMode="cover"
              />
              <Body weight="500" size={fontSize(14)} numberOfLines={1}>
                {item.name}
              </Body>
              <Block
                row
                align="center"
                justify="space-between"
                marginTop={size(4)}
              >
                <Label weight="600" size={fontSize(16)}>
                  ${item.price.toFixed(2)}
                </Label>
                {item.rating && (
                  <Caption size={fontSize(12)}>
                    ⭐ {item.rating.toFixed(1)}
                  </Caption>
                )}
              </Block>
              {isOutOfStock && (
                <Caption
                  color={colors.status.error}
                  marginTop={size(4)}
                  align="center"
                >
                  {t('common.outOfStock', 'Out of Stock')}
                </Caption>
              )}
            </View>
            {item.discount && !isOutOfStock && (
              <Block
                position="absolute"
                top={size(8)}
                right={size(8)}
                padding={size(4)}
                radius={size(4)}
                color={colors.status.error}
              >
                <Overline
                  color={colors.text.inverse}
                  size={fontSize(10)}
                  weight="600"
                >
                  -{item.discount}%
                </Overline>
              </Block>
            )}
          </Card>
        </TouchableOpacity>
      );
    },
    [layout, itemWidth, onProductPress, colors, styles, t],
  );

  // Key extractor
  const keyExtractor = useCallback((item: IProduct) => item.id, []);

  // Empty component
  const ListEmptyComponent = useMemo(() => {
    if (!showEmptyState) return null;
    if (loading && products.length === 0) {
      return (
        <Block flex={1} center padding={size(32)}>
          <ActivityIndicator size="large" color={colors.brand.primary} />
        </Block>
      );
    }

    return (
      <Block flex={1} center padding={size(32)}>
        <Label size={fontSize(48)} marginBottom={size(16)}>
          📦
        </Label>
        <Body color={colors.text.secondary} align="center">
          {emptyStateText || t('product.noProducts', 'No products available')}
        </Body>
        {onRefresh && (
          <Caption color={colors.text.tertiary} marginTop={size(8)}>
            {t('common.pullToRefresh', 'Pull down to refresh')}
          </Caption>
        )}
      </Block>
    );
  }, [
    showEmptyState,
    loading,
    products.length,
    colors,
    emptyStateText,
    t,
    onRefresh,
  ]);

  // Footer component for loading more
  const FooterComponent = useMemo(() => {
    if (ListFooterComponent) return ListFooterComponent;

    if (loading && products.length > 0) {
      return (
        <Block center padding={size(16)}>
          <ActivityIndicator size="small" color={colors.brand.primary} />
        </Block>
      );
    }
    return null;
  }, [ListFooterComponent, loading, products.length, colors.brand.primary]);

  return (
    <FlatList<IProduct>
      data={products}
      renderItem={renderProduct}
      keyExtractor={keyExtractor}
      numColumns={layout === 'grid' ? numColumns : 1}
      key={`${layout}-${numColumns}`}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={FooterComponent}
      ListEmptyComponent={ListEmptyComponent}
      scrollWhenEmpty={true}
      separatorHeight={0}
      testID={testID}
    />
  );
};

const getStyles = (_colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    container: {
      paddingVertical: size(8),
      flexGrow: 1,
    },
    gridItem: {
      marginBottom: size(8),
    },
    listImage: {
      width: size(80),
      height: size(80),
      borderRadius: size(8),
    },
    gridImage: {
      height: size(150),
      borderRadius: size(8),
      marginBottom: size(8),
    },
  });

export const ProductList = memo(ProductListComponent);
