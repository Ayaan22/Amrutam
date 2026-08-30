import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { createStyles } from './FilterSortBar.styles';
import { FilterSortBarProps } from './FilterSortBar.types';

export const FilterSortBar: React.FC<FilterSortBarProps> = ({
  filters,
  sortOption,
  onOpenModal,
  onRemoveCategory,
  onRemoveDosha,
  onToggleInStock,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const activeCount =
    filters.categories.length +
    filters.doshas.length +
    (filters.inStockOnly ? 1 : 0) +
    (sortOption !== 'featured' ? 1 : 0);

  const sortLabel =
    sortOption === 'price_asc'
      ? STRINGS.shop.sort.priceAsc
      : sortOption === 'price_desc'
      ? STRINGS.shop.sort.priceDesc
      : sortOption === 'rating'
      ? STRINGS.shop.sort.rating
      : STRINGS.shop.sort.featured;

  const hasChips =
    filters.categories.length > 0 ||
    filters.doshas.length > 0 ||
    filters.inStockOnly;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {/* Filter & Sort Trigger Button */}
        <Pressable
          onPress={onOpenModal}
          style={[
            styles.filterButton,
            activeCount > 0 && styles.filterButtonActive,
          ]}
          accessibilityRole="button"
          accessibilityLabel={STRINGS.shop.filters.title}
        >
          <MaterialCommunityIcons
            name="tune-variant"
            size={18}
            color={activeCount > 0 ? theme.colors.primary : theme.colors.textPrimary}
          />
          <Text
            style={[
              styles.filterButtonText,
              activeCount > 0 && styles.filterButtonTextActive,
            ]}
          >
            {STRINGS.shop.filters.title}
          </Text>

          {activeCount > 0 && (
            <View style={styles.badgeCount}>
              <Text style={styles.badgeCountText}>{activeCount}</Text>
            </View>
          )}
        </Pressable>

        {/* Current Sort Indicator */}
        <Pressable onPress={onOpenModal} style={styles.sortPill}>
          <MaterialCommunityIcons
            name="sort-variant"
            size={16}
            color={theme.colors.primary}
          />
          <Text style={styles.sortLabel}>{sortLabel}</Text>
        </Pressable>
      </View>

      {/* Active Filter Chips */}
      {hasChips && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.activePillsScroll}
        >
          {filters.categories.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => onRemoveCategory(cat)}
              style={styles.activeChip}
              accessibilityRole="button"
            >
              <Text style={styles.activeChipText}>{cat}</Text>
              <MaterialCommunityIcons
                name="close-circle"
                size={14}
                color={theme.colors.primary}
              />
            </Pressable>
          ))}

          {filters.doshas.map((dosha) => (
            <Pressable
              key={dosha}
              onPress={() => onRemoveDosha(dosha)}
              style={styles.activeChip}
              accessibilityRole="button"
            >
              <Text style={styles.activeChipText}>{dosha} Dosha</Text>
              <MaterialCommunityIcons
                name="close-circle"
                size={14}
                color={theme.colors.primary}
              />
            </Pressable>
          ))}

          {filters.inStockOnly && (
            <Pressable
              onPress={onToggleInStock}
              style={styles.activeChip}
              accessibilityRole="button"
            >
              <Text style={styles.activeChipText}>
                {STRINGS.shop.filters.inStockOnly}
              </Text>
              <MaterialCommunityIcons
                name="close-circle"
                size={14}
                color={theme.colors.primary}
              />
            </Pressable>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default FilterSortBar;
