// React and React Native
import React, { forwardRef } from 'react';
import { View, ViewStyle, ActivityIndicator } from 'react-native';

interface BaseBlockProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  isLoading?: boolean;
  viewProps?: any;
}

export const BaseBlock = forwardRef<View, BaseBlockProps>(
  ({ children, style, isLoading, viewProps = {} }, ref) => {
    return (
      <View {...viewProps} ref={ref} style={style}>
        {children}
        {isLoading && <ActivityIndicator />}
      </View>
    );
  },
);

BaseBlock.displayName = 'BaseBlock';
