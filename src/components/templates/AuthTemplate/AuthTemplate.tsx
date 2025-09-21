/**
 * AuthTemplate Component
 * A template for authentication screens (login, signup, etc.)
 */

import React, { memo } from 'react';
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColors } from '@/theme/context/ThemeContext';

import { Block, Header } from '@/components';
import { size } from '@/utils/helpers/size';

export interface IAuthTemplateProps {
  children: React.ReactNode;
  headerTitle?: string;
  headerSubtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  backgroundColor?: string;
  contentPadding?: number;
  scrollable?: boolean;
  testID?: string;
}

const AuthTemplateComponent: React.FC<IAuthTemplateProps> = ({
  children,
  headerTitle,
  headerSubtitle,
  showBackButton = false,
  onBackPress,
  backgroundColor,
  contentPadding = size(24),
  scrollable = true,
  testID,
}) => {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const bgColor = backgroundColor || colors.background.primary;

  const content = (
    <Block flex={1} padding={contentPadding}>
      {children}
    </Block>
  );

  return (
    <Block flex={1} color={bgColor} testID={testID}>
      {/* Header */}
      {(headerTitle || showBackButton) && (
        <Header
          title={headerTitle}
          subtitle={headerSubtitle}
          leftAction={
            showBackButton
              ? {
                  text: '‹',
                  onPress: onBackPress || (() => {}),
                }
              : undefined
          }
        />
      )}

      {/* Content */}
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : size(20)}
      >
        {scrollable ? (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: insets.bottom + size(20) },
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {content}
          </ScrollView>
        ) : (
          content
        )}
      </KeyboardAvoidingView>
    </Block>
  );
};

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export const AuthTemplate = memo(AuthTemplateComponent);
