// React and React Native
import React from 'react';

// Third Party Libraries
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Components and Hooks
import { useThemeColors } from '@/theme';

// Local Components and Hooks
import { MainTabParamList } from '../types';
import { getDefaultTabOptions } from '../config';

// Assets
import { Tab1Screen, Tab2Screen, Tab3Screen, Tab4Screen } from '@/screens';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabNavigator = () => {
  const colors = useThemeColors();

  return (
    <Tab.Navigator
      screenOptions={{
        ...getDefaultTabOptions(colors),
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background.primary as string,
        },
        headerTintColor: colors.text.primary as string,
        headerShadowVisible: false,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={Tab1Screen}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={Tab2Screen}
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Dashboard',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Tab3Screen}
        options={{
          title: 'Settings',
          tabBarLabel: 'Settings',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Tab4Screen}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
