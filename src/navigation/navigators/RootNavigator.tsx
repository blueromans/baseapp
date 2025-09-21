// React and React Native
import React from 'react';

// Third Party Libraries
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Local Components and Hooks
import { RootStackParamList } from '../types';
import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';
import { useNavigationTheme } from '../useNavigationTheme';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface RootNavigatorProps {
  isAuthenticated?: boolean;
}

const RootNavigator: React.FC<RootNavigatorProps> = ({
  isAuthenticated = true,
}) => {
  const theme = useNavigationTheme();

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{
              animationTypeForReplace: !isAuthenticated ? 'pop' : 'push',
            }}
          />
        ) : (
          <Stack.Screen name="Main" component={TabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
