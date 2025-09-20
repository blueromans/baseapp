/**
 * Card Component
 * A reusable card molecule that combines Block with common card patterns
 */

import React, { memo, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { Block } from '@/components/atoms/Block';
import { H5, Subtitle } from '@/components/atoms/Typography/presets';

export interface ICardProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: number;
  margin?: number;
  testID?: string;
}

const CardComponent: React.FC<ICardProps> = ({
  title,
  subtitle,
  children,
  onPress,
  variant = 'default',
  padding = 16,
  margin = 8,
  testID,
}) => {
  const getVariantProps = useCallback(() => {
    switch (variant) {
      case 'outlined':
        return { outlined: true, shadow: false };
      case 'elevated':
        return { shadow: 'lg' as const, card: true };
      default:
        return { shadow: 'md' as const, card: true };
    }
  }, [variant]);

  const cardContent = (
    <Block
      {...getVariantProps()}
      padding={padding}
      margin={margin}
      radius={12}
      testID={testID}
    >
      {title && (
        <H5 numberOfLines={1} marginBottom={4}>
          {title}
        </H5>
      )}
      {subtitle && (
        <Subtitle numberOfLines={2} marginBottom={8}>
          {subtitle}
        </Subtitle>
      )}
      {children}
    </Block>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {cardContent}
      </TouchableOpacity>
    );
  }

  return cardContent;
};

export const Card = memo(CardComponent);
