/**
 * Header Component
 * A reusable header organism with navigation and actions
 */

import React, { memo, useMemo } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Block } from '@/components/atoms/Block';
import { H6, Caption, Link } from '@/components/atoms/Typography/presets';
import { useThemeColors } from '@/theme/context/ThemeContext';
import { size } from '@/utils/helpers/size';

export interface IHeaderProps {
  title?: string;
  subtitle?: string;
  leftAction?: {
    icon?: React.ReactNode;
    text?: string;
    onPress: () => void;
  };
  rightAction?: {
    icon?: React.ReactNode;
    text?: string;
    onPress: () => void;
  };
  transparent?: boolean;
  variant?: 'default' | 'modal' | 'search';
  searchBar?: React.ReactNode;
  testID?: string;
}

const HeaderComponent: React.FC<IHeaderProps> = ({
  title,
  subtitle,
  leftAction,
  rightAction,
  transparent = false,
  variant = 'default',
  searchBar,
  testID,
}) => {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);

  const headerHeight = Platform.select({
    ios: size(44),
    android: size(56),
    default: size(56),
  });

  const getBackgroundColor = () => {
    if (transparent) return 'transparent';
    return colors.background.primary;
  };

  return (
    <Block
      color={getBackgroundColor()}
      shadow={!transparent ? 'sm' : false}
      style={[
        styles.container,
        { paddingTop: insets.top, height: headerHeight + insets.top },
      ]}
      testID={testID}
    >
      <StatusBar
        barStyle={transparent ? 'light-content' : 'dark-content'}
        translucent
        backgroundColor="transparent"
      />

      <Block
        row
        align="center"
        justify="space-between"
        flex={1}
        paddingHorizontal={size(16)}
      >
        {/* Left Action */}
        <Block style={styles.actionContainer}>
          {leftAction && (
            <TouchableOpacity
              onPress={leftAction.onPress}
              style={styles.actionButton}
              hitSlop={{
                top: size(10),
                bottom: size(10),
                left: size(10),
                right: size(10),
              }}
            >
              {leftAction.icon ? (
                leftAction.icon
              ) : (
                <Link size={28}>{leftAction.text || '‹'}</Link>
              )}
            </TouchableOpacity>
          )}
        </Block>

        {/* Center Content */}
        {variant === 'search' && searchBar ? (
          <Block flex={1}>{searchBar}</Block>
        ) : (
          <Block flex={1} align="center">
            {title && <H6 numberOfLines={1}>{title}</H6>}
            {subtitle && (
              <Caption numberOfLines={1} marginTop={size(2)}>
                {subtitle}
              </Caption>
            )}
          </Block>
        )}

        {/* Right Action */}
        <Block style={styles.actionContainer}>
          {rightAction && (
            <TouchableOpacity
              onPress={rightAction.onPress}
              style={styles.actionButton}
              hitSlop={{
                top: size(10),
                bottom: size(10),
                left: size(10),
                right: size(10),
              }}
            >
              {rightAction.icon ? (
                rightAction.icon
              ) : (
                <Link size={28}>{rightAction.text || '⋯'}</Link>
              )}
            </TouchableOpacity>
          )}
        </Block>
      </Block>
    </Block>
  );
};

const getStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    container: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border.subtle,
    },
    actionContainer: {
      minWidth: size(60),
    },
    actionButton: {
      padding: size(8),
    },
  });

export const Header = memo(HeaderComponent);
