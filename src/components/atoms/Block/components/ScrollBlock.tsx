// React and React Native
import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

interface ScrollBlockProps {
  children: ReactNode;
  bounces?: boolean;
  contentContainerStyle?: any;
  horizontal?: boolean;
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  keyboardShouldPersistTaps?: boolean | 'never' | 'always' | 'handled';
  keyboardDismissMode?: 'none' | 'on-drag' | 'interactive';
}

export const ScrollBlock: React.FC<ScrollBlockProps> = ({
  children,
  bounces = false,
  contentContainerStyle,
  horizontal,
  showsVerticalScrollIndicator,
  showsHorizontalScrollIndicator,
  keyboardShouldPersistTaps,
  keyboardDismissMode,
}) => {
  return (
    <ScrollView
      bounces={bounces}
      style={styles.flex}
      contentContainerStyle={contentContainerStyle}
      horizontal={horizontal}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps as any}
      keyboardDismissMode={keyboardDismissMode}
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexGrow: 1,
  },
});
