/**
 * TabBar Component
 * A customizable tab bar organism for navigation
 */

import React, { memo, useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Block } from '@/components/atoms/Block';
import { Caption, Overline } from '@/components/atoms/Typography/presets';
import { useThemeColors } from '@/theme/context/ThemeContext';
import { size } from '@/utils/helpers/size';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const TabBarComponent: React.FC<BottomTabBarProps> = ({
  state,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);

  const getContainerStyle = useCallback(() => {
    return {
      backgroundColor: colors.background.primary,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border.subtle,
    };
  }, [colors]);

  const renderTab = useCallback(
    (route: any) => {
      const isFocused = state.index === route.index;
      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name, route.params);
        }
      };

      const onLongPress = () => {
        navigation.emit({
          type: 'tabLongPress',
          target: route.key,
        });
      };

      return (
        <TouchableOpacity
          key={route.key}
          style={styles.tab}
          onPress={onPress}
          onLongPress={onLongPress}
          activeOpacity={0.7}
        >
          {/* Icon */}
          {route.icon && (
            <Block
              style={
                isFocused
                  ? [styles.iconContainer, styles.activeIcon]
                  : styles.iconContainer
              }
            >
              {route.icon}
            </Block>
          )}

          <Caption
            size={!route.icon ? 14 : 11}
            color={isFocused ? colors.brand.primary : colors.text.tertiary}
            weight={isFocused ? '600' : '400'}
            numberOfLines={1}
          >
            {route.label}
          </Caption>

          {/* Badge */}
          {route.badge && (
            <Block
              position="absolute"
              top={0}
              right={size(20)}
              padding={size(2)}
              paddingHorizontal={size(6)}
              radius={size(10)}
              color={colors.status.error}
            >
              <Overline color={colors.text.inverse} size={10} weight="600">
                {typeof route.badge === 'number' && route.badge > 99
                  ? '99+'
                  : String(route.badge)}
              </Overline>
            </Block>
          )}
        </TouchableOpacity>
      );
    },
    [
      state.index,
      styles.tab,
      styles.iconContainer,
      styles.activeIcon,
      colors.brand.primary,
      colors.text.tertiary,
      colors.text.inverse,
      colors.status.error,
      navigation,
    ],
  );

  return (
    <Block
      row
      justify="space-around"
      align="center"
      paddingBottom={insets.bottom}
      style={[styles.container, getContainerStyle()]}
    >
      {state.routes.map(renderTab)}
    </Block>
  );
};

const getStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    container: {
      paddingTop: size(8),
      paddingHorizontal: size(8),
    },
    floatingShadow: {
      ...Platform.select({
        ios: {
          shadowColor: colors.shadow.default,
          shadowOffset: { width: 0, height: size(4) },
          shadowOpacity: 0.15,
          shadowRadius: size(12),
        },
        android: {
          elevation: size(8),
        },
        default: {},
      }),
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: size(8),
    },
    iconContainer: {
      marginBottom: size(4),
    },
    activeIcon: {
      transform: [{ scale: 1.1 }],
    },
  });

export const TabBar = memo(TabBarComponent);
