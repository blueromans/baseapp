/**
 * ListItem Component
 * A flexible list item molecule for various list presentations
 */

import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { Block } from '@/components/atoms/Block';
import { Body, Caption } from '@/components/atoms/Typography/presets';

export interface IListItemProps {
  title: string;
  subtitle?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  imageSource?: { uri: string } | number;
  onPress?: () => void;
  disabled?: boolean;
  selected?: boolean;
  divider?: boolean;
  testID?: string;
}

const ListItemComponent: React.FC<IListItemProps> = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  imageSource,
  onPress,
  disabled = false,
  selected = false,
  divider = true,
  testID,
}) => {
  const content = (
    <Block
      row
      align="center"
      paddingHorizontal={16}
      paddingVertical={12}
      color={selected ? '#F0F8FF' : 'transparent'}
      testID={testID}
    >
      {/* Left Section */}
      {(leftIcon || imageSource) && (
        <Block marginRight={12}>
          {imageSource ? (
            <Image source={imageSource} style={styles.image} />
          ) : (
            leftIcon
          )}
        </Block>
      )}

      {/* Center Section */}
      <Block flex={1}>
        <Body
          weight={selected ? '600' : '500'}
          color={disabled ? '#999' : selected ? '#007AFF' : '#000'}
          numberOfLines={1}
        >
          {title}
        </Body>
        {subtitle && (
          <Caption
            color={disabled ? '#999' : '#666'}
            numberOfLines={2}
            marginTop={2}
          >
            {subtitle}
          </Caption>
        )}
      </Block>

      {/* Right Section */}
      {rightIcon && <Block marginLeft={12}>{rightIcon}</Block>}
    </Block>
  );

  const itemContent = (
    <>
      {content}
      {divider && <View style={styles.divider} />}
    </>
  );

  if (onPress && !disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        disabled={disabled}
      >
        {itemContent}
      </TouchableOpacity>
    );
  }

  return <View>{itemContent}</View>;
};

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E0E0E0',
    marginLeft: 16,
  },
});

export const ListItem = memo(ListItemComponent);
