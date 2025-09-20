// React and React Native
import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';

// Third Party Libraries
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface KeyboardBlockProps {
  children: ReactNode;
  scrollEnabled?: boolean;
  keyboardShouldPersistTaps?: boolean | 'never' | 'always' | 'handled';
}

export const KeyboardBlock: React.FC<KeyboardBlockProps> = ({
  children,
  scrollEnabled,
  keyboardShouldPersistTaps,
}) => {
  return (
    <KeyboardAwareScrollView
      style={styles.flex}
      scrollEnabled={scrollEnabled}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps as any}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexGrow: 1,
  },
});
