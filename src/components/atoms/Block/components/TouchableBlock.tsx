// React and React Native
import React, { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';

interface TouchableBlockProps {
  children: ReactNode;
  onPress: () => void;
}

export const TouchableBlock: React.FC<TouchableBlockProps> = ({
  children,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};
