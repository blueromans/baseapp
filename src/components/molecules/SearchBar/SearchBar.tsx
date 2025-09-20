/**
 * SearchBar Component
 * A customizable search input molecule
 */

import React, { memo, useCallback, useState, useRef } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  TextInputProps,
} from 'react-native';
import { Block } from '@/components/atoms/Block';
import { Label, Link } from '@/components/atoms/Typography/presets';

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
  placeholder = 'Search...',
  showCancelButton = false,
  autoFocus = false,
  loading = false,
  testID,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

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

  return (
    <Block row align="center" paddingHorizontal={16} paddingVertical={8}>
      <Block
        flex={1}
        row
        align="center"
        padding={Platform.OS === 'ios' ? 8 : 4}
        radius={8}
        color="#F0F0F0"
        style={isFocused ? styles.focused : undefined}
      >
        {/* Search Icon */}
        <Label style={styles.searchIcon}>🔍</Label>

        {/* Input */}
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
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
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Label color="#999" size={18}>
              ✕
            </Label>
          </TouchableOpacity>
        )}

        {/* Loading Indicator */}
        {loading && <Label marginHorizontal={8}>⏳</Label>}
      </Block>

      {/* Cancel Button */}
      {showCancelButton && isFocused && (
        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Link>Cancel</Link>
        </TouchableOpacity>
      )}
    </Block>
  );
};

const styles = StyleSheet.create({
  focused: {
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  searchIcon: {
    marginHorizontal: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    padding: 0,
    height: 36,
  },
  clearButton: {
    padding: 4,
    marginRight: 4,
  },
  cancelButton: {
    marginLeft: 12,
  },
});

export const SearchBar = memo(SearchBarComponent);
