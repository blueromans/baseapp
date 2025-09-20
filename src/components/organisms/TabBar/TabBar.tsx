/**
 * TabBar Component
 * A customizable tab bar organism for navigation
 */

import React, { memo, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Block } from '@/components/atoms/Block';
import { Caption, Overline } from '@/components/atoms/Typography/presets';

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
          margin: 16,
          marginBottom: insets.bottom + 16,
          borderRadius: 24,
          backgroundColor: '#FFFFFF',
          ...styles.floatingShadow,
        };
      case 'minimal':
        return {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
        };
      default:
        return {
          backgroundColor: '#FFFFFF',
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: '#E0E0E0',
        };
    }
  }, [variant, insets.bottom]);

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
              color={isActive ? '#007AFF' : '#999'}
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
              right={20}
              padding={2}
              paddingHorizontal={6}
              radius={10}
              color="#FF0000"
            >
              <Overline color="#FFF" size={10} weight="600">
                {typeof tab.badge === 'number' && tab.badge > 99
                  ? '99+'
                  : String(tab.badge)}
              </Overline>
            </Block>
          )}
        </TouchableOpacity>
      );
    },
    [activeTab, showLabel, handleTabPress],
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

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  floatingShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
      default: {},
    }),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    marginBottom: 4,
  },
  activeIcon: {
    transform: [{ scale: 1.1 }],
  },
});

export const TabBar = memo(TabBarComponent);
