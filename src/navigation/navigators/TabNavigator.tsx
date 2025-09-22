// React and React Native
import React, { useCallback } from 'react';

// Third Party Libraries
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

// Components and Hooks
import { TabBar } from '@/components';
import { TabRoute, useTabRoutes } from '@/hooks';
import { useThemeColors } from '@/theme';

// Local Components and Hooks
import { screenNames } from '../types';
import { getDefaultTabOptions } from '../config';

const Tab = createBottomTabNavigator();

// Main Component
function TabNavigator() {
  const colors = useThemeColors();
  const tabRoutes = useTabRoutes();

  const TabBarComponent = useCallback(
    (props: BottomTabBarProps) => <TabBar {...props} />,
    [],
  );

  return (
    <Tab.Navigator
      tabBar={TabBarComponent}
      screenOptions={{
        ...getDefaultTabOptions(colors),
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background.primary as string,
        },
        headerTintColor: colors.text.primary as string,
        headerShadowVisible: false,
      }}
    >
      {tabRoutes?.map((screen: TabRoute) => (
        <Tab.Screen
          key={screen?.name}
          name={screen?.name}
          component={screenNames?.[screen?.name as keyof typeof screenNames]}
        />
      ))}
    </Tab.Navigator>
  );
}

export default TabNavigator;
