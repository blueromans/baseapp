/**
 * ListItem Component
 * A flexible list item molecule for various list presentations
 */

import React, { memo, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { Block, Body, Caption } from '@/components';
import { size } from '@/utils/helpers/size';
import { useThemeColors } from '@/theme';

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
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);
  const content = (
    <Block
      row
      align="center"
      paddingHorizontal={size(16)}
      paddingVertical={size(12)}
      color={selected ? colors.background.elevated : 'transparent'}
      testID={testID}
    >
      {/* Left Section */}
      {(leftIcon || imageSource) && (
        <Block marginRight={size(12)}>
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
          color={
            disabled
              ? colors.text.disabled
              : selected
              ? colors.brand.primary
              : colors.text.primary
          }
          numberOfLines={1}
        >
          {title}
        </Body>
        {subtitle && (
          <Caption
            color={disabled ? colors.text.disabled : colors.text.secondary}
            numberOfLines={2}
            marginTop={size(2)}
          >
            {subtitle}
          </Caption>
        )}
      </Block>

      {/* Right Section */}
      {rightIcon && <Block marginLeft={size(12)}>{rightIcon}</Block>}
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

const getStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    image: {
      width: size(40),
      height: size(40),
      borderRadius: size(20),
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.border.subtle,
      marginLeft: size(16),
    },
  });

export const ListItem = memo(ListItemComponent);
