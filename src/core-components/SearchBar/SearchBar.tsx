import React, { memo } from 'react';
import { View, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme';
import { STRINGS } from '../../constants/strings';
import { Input } from '../Input';
import { SearchBarProps } from './SearchBar.types';
import { createStyles } from './SearchBar.styles';

export const SearchBar: React.FC<SearchBarProps> = memo(({
  value = '',
  placeholder = STRINGS.common.search,
  onChangeText,
  onSubmit,
  onClear,
  onPress,
  showFilter = false,
  onFilterPress,
  disabled = false,
  autoFocus = false,
  style,
  testID,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const handleClear = () => {
    if (onChangeText) {
      onChangeText('');
    }
    if (onClear) {
      onClear();
    }
  };

  const leftSearchIcon = (
    <MaterialCommunityIcons
      name="magnify"
      size={20}
      color={theme.colors.primary}
    />
  );

  const rightClearIcon =
    value.length > 0 && !onPress ? (
      <Pressable
        onPress={handleClear}
        accessibilityRole="button"
        accessibilityLabel={STRINGS.common.clearSearch}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <MaterialCommunityIcons
          name="close-circle"
          size={18}
          color={theme.colors.textMuted}
        />
      </Pressable>
    ) : undefined;

  return (
    <View style={[styles.container, style]} testID={testID}>
      {onPress ? (
        <Pressable
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel={placeholder}
          style={styles.inputWrapper}
        >
          <View pointerEvents="none">
            <Input
              value={value}
              placeholder={placeholder}
              leftIcon={leftSearchIcon}
              editable={false}
              containerStyle={styles.noMarginInput}
            />
          </View>
        </Pressable>
      ) : (
        <View style={styles.inputWrapper}>
          <Input
            value={value}
            placeholder={placeholder}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmit}
            leftIcon={leftSearchIcon}
            rightIcon={rightClearIcon}
            disabled={disabled}
            autoFocus={autoFocus}
            returnKeyType="search"
            accessibilityRole="search"
            accessibilityLabel={placeholder}
            containerStyle={styles.noMarginInput}
          />
        </View>
      )}

      {showFilter && (
        <Pressable
          onPress={onFilterPress}
          accessibilityRole="button"
          accessibilityLabel={STRINGS.common.filterOptions}
          style={styles.filterButton}
        >
          <MaterialCommunityIcons
            name="tune-variant"
            size={20}
            color={theme.colors.primary}
          />
        </Pressable>
      )}
    </View>
  );
});

SearchBar.displayName = 'SearchBar';
export default SearchBar;
