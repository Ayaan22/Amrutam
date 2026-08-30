import React, { memo } from 'react';
import { View, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, Button } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { createStyles } from './SearchHistoryList.styles';
import { SearchHistoryListProps } from './SearchHistoryList.types';

export const SearchHistoryList: React.FC<SearchHistoryListProps> = memo(({
  history,
  onSelectTerm,
  onRemoveTerm,
  onClearAll,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  if (history.length === 0) {
    return (
      <View style={styles.emptyState}>
        <MaterialCommunityIcons
          name="magnify"
          size={40}
          color={theme.colors.textMuted}
          style={styles.emptyIcon}
        />
        <Text variant="body" color="secondary" style={styles.emptyPrompt}>
          {STRINGS.shop.search.emptyHistoryPrompt}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="caption" color="muted" style={styles.title}>
          {STRINGS.shop.search.recentSearchesTitle}
        </Text>
        <Button
          variant="ghost"
          size="small"
          onPress={onClearAll}
          accessibilityLabel={STRINGS.shop.search.clearAllHistoryCta}
          style={styles.clearBtn}
        >
          <Text variant="caption" color="primary" style={styles.clearText}>
            {STRINGS.shop.search.clearAllHistoryCta}
          </Text>
        </Button>
      </View>

      <View style={styles.list}>
        {history.map((term) => (
          <View key={term} style={styles.itemRow}>
            <Pressable
              onPress={() => onSelectTerm(term)}
              style={styles.itemMain}
              accessibilityRole="button"
              accessibilityLabel={`${STRINGS.common.search} ${term}`}
            >
              <MaterialCommunityIcons
                name="history"
                size={18}
                color={theme.colors.textMuted}
              />
              <Text variant="body" color="primary" style={styles.itemText}>
                {term}
              </Text>
            </Pressable>

            <Button
              variant="ghost"
              size="small"
              onPress={() => onRemoveTerm(term)}
              accessibilityLabel={`${STRINGS.common.delete} ${term}`}
              style={styles.removeBtn}
            >
              <MaterialCommunityIcons
                name="close"
                size={16}
                color={theme.colors.textMuted}
              />
            </Button>
          </View>
        ))}
      </View>
    </View>
  );
});

SearchHistoryList.displayName = 'SearchHistoryList';
export default SearchHistoryList;
