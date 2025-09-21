// React and React Native
import React from 'react';

// Third Party Libraries
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Components and Hooks
import { useThemeColors } from '@/theme';

// Local Components and Hooks
import { AuthStackParamList } from '../types';
import { defaultScreenOptions } from '../config';

// Assets
import { SignInScreen, SignUpScreen } from '@/screens';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  const colors = useThemeColors();

  return (
    <Stack.Navigator
      screenOptions={{
        ...defaultScreenOptions,
        headerStyle: {
          backgroundColor: colors.background.primary as string,
        },
        headerTintColor: colors.text.primary as string,
        headerShadowVisible: false,
      }}
      initialRouteName="SignIn"
    >
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          title: 'Sign In',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          title: 'Create Account',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
