/**
 * ProductList Component
 * An organism that displays a list of products with various layouts
 */

import React, { memo, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Block } from '@/components/atoms/Block';
import { Card } from '@/components/molecules/Card';
import {
  Body,
  Caption,
  Label,
  ErrorText,
  Overline,
} from '@/components/atoms/Typography/presets';

const { width: screenWidth } = Dimensions.get('window');

export interface IProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  rating?: number;
  discount?: number;
}

export interface IProductListProps {
  products: IProduct[];
  layout?: 'grid' | 'list';
  numColumns?: number;
  onProductPress?: (product: IProduct) => void;
  onEndReached?: () => void;
  ListHeaderComponent?: React.ReactElement;
  ListEmptyComponent?: React.ReactElement;
  testID?: string;
}

const ProductListComponent: React.FC<IProductListProps> = ({
  products,
  layout = 'grid',
  numColumns = 2,
  onProductPress,
  onEndReached,
  ListHeaderComponent,
  ListEmptyComponent,
  testID,
}) => {
  const itemWidth = useMemo(() => {
    if (layout === 'list') return screenWidth;
    return (screenWidth - (numColumns + 1) * 16) / numColumns;
  }, [layout, numColumns]);

  const renderProduct = useCallback(
    ({ item }: { item: IProduct }) => {
      if (layout === 'list') {
        return (
          <TouchableOpacity
            onPress={() => onProductPress?.(item)}
            activeOpacity={0.8}
          >
            <Card margin={8}>
              <Block row>
                <Image source={{ uri: item.image }} style={styles.listImage} />
                <Block flex={1} paddingLeft={12}>
                  <Body weight="500" numberOfLines={2}>
                    {item.name}
                  </Body>
                  {item.description && (
                    <Caption numberOfLines={2} marginTop={4}>
                      {item.description}
                    </Caption>
                  )}
                  <Block
                    row
                    align="center"
                    justify="space-between"
                    marginTop={8}
                  >
                    <Label weight="600" size={16}>
                      ${item.price.toFixed(2)}
                    </Label>
                    {item.discount && (
                      <ErrorText weight="600" size={12}>
                        -{item.discount}%
                      </ErrorText>
                    )}
                  </Block>
                </Block>
              </Block>
            </Card>
          </TouchableOpacity>
        );
      }

      return (
        <TouchableOpacity
          onPress={() => onProductPress?.(item)}
          activeOpacity={0.8}
          style={{ width: itemWidth }}
        >
          <Card margin={8} padding={8}>
            <Image
              source={{ uri: item.image }}
              style={[styles.gridImage, { width: itemWidth - 16 }]}
            />
            <Body weight="500" size={14} numberOfLines={1}>
              {item.name}
            </Body>
            <Block row align="center" justify="space-between" marginTop={4}>
              <Label weight="600" size={16}>
                ${item.price.toFixed(2)}
              </Label>
              {item.rating && <Caption size={12}>⭐ {item.rating}</Caption>}
            </Block>
            {item.discount && (
              <Block
                position="absolute"
                top={8}
                right={8}
                padding={4}
                radius={4}
                color="rgba(255, 0, 0, 0.8)"
              >
                <Overline color="#FFF" size={10} weight="600">
                  -{item.discount}%
                </Overline>
              </Block>
            )}
          </Card>
        </TouchableOpacity>
      );
    },
    [layout, itemWidth, onProductPress],
  );

  const keyExtractor = useCallback((item: IProduct) => item.id, []);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: layout === 'list' ? 120 : itemWidth + 16,
      offset: (layout === 'list' ? 120 : itemWidth + 16) * index,
      index,
    }),
    [layout, itemWidth],
  );

  if (!products.length && ListEmptyComponent) {
    return ListEmptyComponent;
  }

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={keyExtractor}
      numColumns={layout === 'grid' ? numColumns : 1}
      key={layout === 'grid' ? numColumns : 'list'}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      getItemLayout={getItemLayout}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      testID={testID}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  listImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  gridImage: {
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
});

export const ProductList = memo(ProductListComponent);
