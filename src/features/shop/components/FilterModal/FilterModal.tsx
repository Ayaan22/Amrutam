import React, { useState, useEffect } from 'react';
import {
  View,
  Modal,
  ScrollView,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, Button } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { ProductCategory, SortOption } from '../../types';
import { createStyles } from './FilterModal.styles';
import { FilterModalProps } from './FilterModal.types';

const CATEGORIES: ProductCategory[] = [
  'Hair Care',
  'Skin Care',
  'Digestive',
  'Immunity',
  'Stress & Sleep',
  'Joint Care',
];

const DOSHAS = ['Vata', 'Pitta', 'Kapha'];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: STRINGS.shop.sort.featured, value: 'featured' },
  { label: STRINGS.shop.sort.priceAsc, value: 'price_asc' },
  { label: STRINGS.shop.sort.priceDesc, value: 'price_desc' },
  { label: STRINGS.shop.sort.rating, value: 'rating' },
];

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  filters,
  sortOption,
  onApply,
  onReset,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [tempCategories, setTempCategories] = useState<ProductCategory[]>(filters.categories);
  const [tempDoshas, setTempDoshas] = useState<string[]>(filters.doshas);
  const [tempInStock, setTempInStock] = useState<boolean>(filters.inStockOnly);
  const [tempSort, setTempSort] = useState<SortOption>(sortOption);

  useEffect(() => {
    if (visible) {
      setTempCategories(filters.categories);
      setTempDoshas(filters.doshas);
      setTempInStock(filters.inStockOnly);
      setTempSort(sortOption);
    }
  }, [visible, filters, sortOption]);

  const toggleCategory = (cat: ProductCategory) => {
    setTempCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleDosha = (dosha: string) => {
    setTempDoshas((prev) =>
      prev.includes(dosha) ? prev.filter((d) => d !== dosha) : [...prev, dosha]
    );
  };

  const activeFiltersCount =
    tempCategories.length + tempDoshas.length + (tempInStock ? 1 : 0);

  const handleApply = () => {
    onApply(
      {
        categories: tempCategories,
        doshas: tempDoshas,
        inStockOnly: tempInStock,
      },
      tempSort
    );
    onClose();
  };

  const handleReset = () => {
    setTempCategories([]);
    setTempDoshas([]);
    setTempInStock(false);
    setTempSort('featured');
    onReset();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.sheetContainer}>
              {/* Header */}
              <View style={styles.header}>
                <Text variant="h3" color="primary" style={styles.headerTitle}>
                  {STRINGS.shop.filters.title}
                </Text>
                <Button
                  variant="ghost"
                  size="small"
                  onPress={onClose}
                  accessibilityLabel={STRINGS.common.close}
                  style={styles.closeBtn}
                >
                  <MaterialCommunityIcons
                    name="close"
                    size={22}
                    color={theme.colors.textPrimary}
                  />
                </Button>
              </View>

              {/* Body */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentScroll}
              >
                {/* Sort By Section */}
                <View style={styles.section}>
                  <Text variant="h3" color="primary" style={styles.sectionTitle}>
                    {STRINGS.shop.sort.title}
                  </Text>
                  <View style={styles.pillsWrap}>
                    {SORT_OPTIONS.map((opt) => {
                      const isSelected = tempSort === opt.value;
                      return (
                        <Pressable
                          key={opt.value}
                          onPress={() => setTempSort(opt.value)}
                          style={[styles.pill, isSelected && styles.pillActive]}
                          accessibilityRole="button"
                        >
                          <Text
                            style={[
                              styles.pillText,
                              isSelected && styles.pillTextActive,
                            ]}
                          >
                            {opt.label}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>

                {/* Categories Section */}
                <View style={styles.section}>
                  <Text variant="h3" color="primary" style={styles.sectionTitle}>
                    {STRINGS.shop.filters.categories}
                  </Text>
                  <View style={styles.pillsWrap}>
                    {CATEGORIES.map((cat) => {
                      const isSelected = tempCategories.includes(cat);
                      return (
                        <Pressable
                          key={cat}
                          onPress={() => toggleCategory(cat)}
                          style={[styles.pill, isSelected && styles.pillActive]}
                          accessibilityRole="button"
                        >
                          <Text
                            style={[
                              styles.pillText,
                              isSelected && styles.pillTextActive,
                            ]}
                          >
                            {cat}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>

                {/* Dosha Section */}
                <View style={styles.section}>
                  <Text variant="h3" color="primary" style={styles.sectionTitle}>
                    {STRINGS.shop.filters.doshas}
                  </Text>
                  <View style={styles.pillsWrap}>
                    {DOSHAS.map((dosha) => {
                      const isSelected = tempDoshas.includes(dosha);
                      return (
                        <Pressable
                          key={dosha}
                          onPress={() => toggleDosha(dosha)}
                          style={[styles.pill, isSelected && styles.pillActive]}
                          accessibilityRole="button"
                        >
                          <Text
                            style={[
                              styles.pillText,
                              isSelected && styles.pillTextActive,
                            ]}
                          >
                            {dosha} Dosha
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>

                {/* In Stock Only */}
                <View style={styles.section}>
                  <Text variant="h3" color="primary" style={styles.sectionTitle}>
                    {STRINGS.shop.filters.availability}
                  </Text>
                  <Pressable
                    onPress={() => setTempInStock(!tempInStock)}
                    style={styles.stockRow}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: tempInStock }}
                  >
                    <View style={styles.stockCheckbox}>
                      <View
                        style={[
                          styles.checkboxBox,
                          tempInStock && styles.checkboxBoxActive,
                        ]}
                      >
                        {tempInStock && (
                          <MaterialCommunityIcons
                            name="check"
                            size={16}
                            color={theme.colors.textInverse}
                          />
                        )}
                      </View>
                      <Text variant="body" color="primary">
                        {STRINGS.shop.filters.inStockOnly}
                      </Text>
                    </View>
                  </Pressable>
                </View>
              </ScrollView>

              {/* Footer Actions */}
              <View style={styles.footerRow}>
                <Button
                  title={STRINGS.shop.filters.resetAll}
                  variant="outline"
                  size="medium"
                  onPress={handleReset}
                  style={styles.resetBtn}
                />
                <Button
                  title={STRINGS.shop.filters.applyFilters(activeFiltersCount)}
                  variant="primary"
                  size="medium"
                  onPress={handleApply}
                  style={styles.applyBtn}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FilterModal;
