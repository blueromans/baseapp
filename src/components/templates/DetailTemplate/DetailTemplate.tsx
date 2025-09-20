/**
 * DetailTemplate Component
 * A template for detail/content screens with hero images and actions
 */

import React, { memo } from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Block, Header, H2, Body, ButtonText } from '@/components';

const { width: screenWidth } = Dimensions.get('window');

export interface IDetailTemplateProps {
  children: React.ReactNode;
  headerTitle?: string;
  headerTransparent?: boolean;
  heroImage?: string;
  heroHeight?: number;
  title?: string;
  subtitle?: string;
  actions?: Array<{
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary';
  }>;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightAction?: {
    icon?: React.ReactNode;
    onPress: () => void;
  };
  contentPadding?: number;
  testID?: string;
}

const DetailTemplateComponent: React.FC<IDetailTemplateProps> = ({
  children,
  headerTitle,
  headerTransparent = false,
  heroImage,
  heroHeight = 300,
  title,
  subtitle,
  actions = [],
  showBackButton = true,
  onBackPress,
  rightAction,
  contentPadding = 16,
  testID,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Block flex={1} testID={testID}>
      {/* Header */}
      <Header
        title={!headerTransparent ? headerTitle : undefined}
        transparent={headerTransparent}
        leftAction={
          showBackButton
            ? {
                text: '‹',
                onPress: onBackPress || (() => {}),
              }
            : undefined
        }
        rightAction={rightAction}
      />

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Hero Image */}
        {heroImage && (
          <Image
            source={{ uri: heroImage }}
            style={[styles.heroImage, { height: heroHeight }]}
            resizeMode="cover"
          />
        )}

        {/* Content Container */}
        <Block padding={contentPadding}>
          {/* Title Section */}
          {(title || subtitle) && (
            <Block marginBottom={16}>
              {title && <H2 marginBottom={8}>{title}</H2>}
              {subtitle && (
                <Body color="#666" lineHeight={22}>
                  {subtitle}
                </Body>
              )}
            </Block>
          )}

          {/* Actions */}
          {actions.length > 0 && (
            <Block row gap={12} marginBottom={24}>
              {actions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.actionButton,
                    action.variant === 'secondary'
                      ? styles.secondaryButton
                      : styles.primaryButton,
                    { flex: 1 },
                  ]}
                  onPress={action.onPress}
                  activeOpacity={0.8}
                >
                  <ButtonText
                    color={
                      action.variant === 'secondary' ? '#007AFF' : '#FFFFFF'
                    }
                  >
                    {action.label}
                  </ButtonText>
                </TouchableOpacity>
              ))}
            </Block>
          )}

          {/* Main Content */}
          {children}

          {/* Bottom Padding for Safe Area */}
          <Block height={insets.bottom + 20} />
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  heroImage: {
    width: screenWidth,
  },
  actionButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
});

export const DetailTemplate = memo(DetailTemplateComponent);
