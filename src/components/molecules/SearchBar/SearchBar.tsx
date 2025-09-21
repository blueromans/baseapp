/**
 * SearchBar Component
 * A customizable search input molecule
 */

import React, { memo, useCallback, useState, useRef, useMemo } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  TextInputProps,
} from 'react-native';
import { Block, Label, Link } from '@/components';
import { useThemeColors } from '@/theme/context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { size, fontSize } from '@/utils/helpers/size';

// Icon constants
const ICONS = {
  SEARCH: '🔍',
  CLEAR: '✕',
  LOADING: '⏳',
} as const;

export interface ISearchBarProps extends Omit<TextInputProps, 'onChangeText'> {
  value?: string;
  onChangeText?: (text: string) => void;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  placeholder?: string;
  showCancelButton?: boolean;
  autoFocus?: boolean;
  loading?: boolean;
  testID?: string;
}

const SearchBarComponent: React.FC<ISearchBarProps> = ({
  value = '',
  onChangeText,
  onSearch,
  onClear,
  placeholder,
  showCancelButton = false,
  autoFocus = false,
  loading = false,
  testID,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const colors = useThemeColors();
  const { t } = useTranslation();

  const handleClear = useCallback(() => {
    onChangeText?.('');
    onClear?.();
    inputRef.current?.focus();
  }, [onChangeText, onClear]);

  const handleCancel = useCallback(() => {
    handleClear();
    inputRef.current?.blur();
    setIsFocused(false);
  }, [handleClear]);

  const handleSubmit = useCallback(() => {
    onSearch?.(value);
  }, [onSearch, value]);

  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <Block
      row
      align="center"
      paddingHorizontal={size(16)}
      paddingVertical={size(8)}
    >
      <Block
        flex={1}
        row
        align="center"
        padding={Platform.OS === 'ios' ? size(8) : size(4)}
        radius={size(8)}
        color={colors.background.secondary}
        style={isFocused ? styles.focused : undefined}
      >
        {/* Search Icon */}
        <Label style={styles.searchIcon}>{ICONS.SEARCH}</Label>

        {/* Input */}
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder || t('search.placeholder')}
          placeholderTextColor={colors.text.tertiary}
          autoFocus={autoFocus}
          returnKeyType="search"
          onSubmitEditing={handleSubmit}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          testID={testID}
          {...textInputProps}
        />

        {/* Clear Button */}
        {value.length > 0 && (
          <TouchableOpacity
            onPress={handleClear}
            style={styles.clearButton}
            accessibilityLabel={t('search.clearAccessibility')}
            accessibilityRole="button"
          >
            <Label color={colors.text.tertiary} size={18}>
              {ICONS.CLEAR}
            </Label>
          </TouchableOpacity>
        )}

        {/* Loading Indicator */}
        {loading && <Label marginHorizontal={size(8)}>{ICONS.LOADING}</Label>}
      </Block>

      {/* Cancel Button */}
      {showCancelButton && isFocused && (
        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Link>{t('search.cancel')}</Link>
        </TouchableOpacity>
      )}
    </Block>
  );
};

const getStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    focused: {
      borderWidth: size(1),
      borderColor: colors.border.focus,
    },
    searchIcon: {
      marginHorizontal: size(8),
    },
    input: {
      flex: 1,
      fontSize: fontSize(16),
      color: colors.text.primary,
      padding: 0,
      height: size(36),
    },
    clearButton: {
      padding: size(4),
      marginRight: size(4),
    },
    cancelButton: {
      marginLeft: size(12),
    },
  });

export const SearchBar = memo(SearchBarComponent);
