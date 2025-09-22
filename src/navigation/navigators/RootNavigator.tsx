// React and React Native
import React from 'react';

// Third Party Libraries
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Components and Hooks
import { useMainRoutes } from '@/hooks';
import type { RootStackParamList } from '@/constants';

// Local Components and Hooks
import { screenNames, type RouteItem } from '../types';
import useNavigationTheme from '../useNavigationTheme';

const RootStack = createNativeStackNavigator<RootStackParamList>();

// Main Component
const RootNavigator: React.FC = React.memo(() => {
  const mainRoutes = useMainRoutes() as RouteItem[];
  const theme = useNavigationTheme();
  return (
    <NavigationContainer theme={theme}>
      <RootStack.Navigator>
        {mainRoutes?.map((screen, index) => (
          <RootStack.Group key={index} screenOptions={screen.options}>
            {screen.routes?.map((route, _index) => (
              <RootStack.Screen
                key={_index}
                name={route.name}
                component={screenNames[route.name]}
                options={route.options}
              />
            ))}
          </RootStack.Group>
        ))}
      </RootStack.Navigator>
    </NavigationContainer>
  );
});

export default RootNavigator;
