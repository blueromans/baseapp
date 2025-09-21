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

export interface ITabItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number | string;
}

export interface ITabBarProps {
  tabs: ITabItem[];
  activeTab: string;
  onTabPress: (tabKey: string) => void;
  variant?: 'default' | 'floating' | 'minimal';
  showLabel?: boolean;
  testID?: string;
}

const TabBarComponent: React.FC<ITabBarProps> = ({
  tabs,
  activeTab,
  onTabPress,
  variant = 'default',
  showLabel = true,
  testID,
}) => {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);

  const handleTabPress = useCallback(
    (tabKey: string) => {
      onTabPress(tabKey);
    },
    [onTabPress],
  );

  const getContainerStyle = useCallback(() => {
    switch (variant) {
      case 'floating':
        return {
          margin: size(16),
          marginBottom: insets.bottom + size(16),
          borderRadius: size(24),
          backgroundColor: colors.surface.card,
          ...styles.floatingShadow,
        };
      case 'minimal':
        return {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
        };
      default:
        return {
          backgroundColor: colors.background.primary,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: colors.border.subtle,
        };
    }
  }, [variant, insets.bottom, colors, styles.floatingShadow]);

  const renderTab = useCallback(
    (tab: ITabItem) => {
      const isActive = activeTab === tab.key;

      return (
        <TouchableOpacity
          key={tab.key}
          style={styles.tab}
          onPress={() => handleTabPress(tab.key)}
          activeOpacity={0.7}
        >
          {/* Icon */}
          {tab.icon && (
            <Block
              style={
                isActive
                  ? [styles.iconContainer, styles.activeIcon]
                  : styles.iconContainer
              }
            >
              {tab.icon}
            </Block>
          )}

          {/* Label */}
          {showLabel && (
            <Caption
              size={!tab.icon ? 14 : 11}
              color={isActive ? colors.brand.primary : colors.text.tertiary}
              weight={isActive ? '600' : '400'}
              numberOfLines={1}
            >
              {tab.label}
            </Caption>
          )}

          {/* Badge */}
          {tab.badge && (
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
                {typeof tab.badge === 'number' && tab.badge > 99
                  ? '99+'
                  : String(tab.badge)}
              </Overline>
            </Block>
          )}
        </TouchableOpacity>
      );
    },
    [
      activeTab,
      showLabel,
      handleTabPress,
      colors.brand.primary,
      colors.text.tertiary,
      colors.status.error,
      colors.text.inverse,
      styles.tab,
      styles.iconContainer,
      styles.activeIcon,
    ],
  );

  return (
    <Block
      row
      justify="space-around"
      align="center"
      paddingBottom={insets.bottom}
      style={[styles.container, getContainerStyle()]}
      testID={testID}
    >
      {tabs.map(renderTab)}
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
