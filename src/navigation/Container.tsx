// React and React Native
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';

// Third Party Libraries
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Components and Hooks
import { ThemeProvider } from '@/theme';

// Assets
import { storage } from '@/utils';

interface NavigationContainerProps {
  children: React.ReactNode;
}

const NavigationContainer: React.FC<NavigationContainerProps> = ({
  children,
}) => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.flex}>
        <ThemeProvider storage={storage}>{children}</ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default memo(NavigationContainer);
