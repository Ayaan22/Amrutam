import React, { memo, useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { useTheme } from '../../theme';
import { SearchBarProps } from './SearchBar.types';
import { createStyles } from './SearchBar.styles';

export const SearchBar: React.FC<SearchBarProps> = memo(({
  value = '',
  placeholder = 'Search...',
  onChangeText,
  onSubmit,
  onClear,
  showFilter = false,
  onFilterPress,
  disabled = false,
  style,
  testID,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();
  const styles = createStyles(theme);

  const handleClear = () => {
    onChangeText?.('');
    onClear?.();
  };

  return (
    <View style={[styles.container, style]} testID={testID}>
      <View
        style={[
          styles.searchContainer,
          isFocused && styles.searchContainerFocused,
        ]}
      >
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textMuted}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          returnKeyType="search"
          accessibilityRole="search"
          accessibilityLabel={placeholder}
          style={styles.input}
        />

        {value.length > 0 && (
          <Pressable
            onPress={handleClear}
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            style={styles.iconButton}
          >
            <Text style={styles.clearText}>✕</Text>
          </Pressable>
        )}
      </View>

      {showFilter && (
        <Pressable
          onPress={onFilterPress}
          accessibilityRole="button"
          accessibilityLabel="Filter options"
          style={styles.filterButton}
        >
          <Text style={styles.filterIconText}>Filter</Text>
        </Pressable>
      )}
    </View>
  );
});

SearchBar.displayName = 'SearchBar';
