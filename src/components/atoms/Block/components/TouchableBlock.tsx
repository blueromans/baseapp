// React and React Native
import React, { ReactNode } from 'react';
import { TouchableWithoutFeedback } from 'react-native';

interface TouchableBlockProps {
  children: ReactNode;
  onPress: () => void;
}

export const TouchableBlock: React.FC<TouchableBlockProps> = ({
  children,
  onPress,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      {children}
    </TouchableWithoutFeedback>
  );
};
