import React, { useState, useMemo, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import { Surface, Text, SearchBar, Button, EmptyState } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS, MOCK_PRODUCTS } from '@utils';
import { Product, ProductCategory, SortOption, ProductFilterState } from '@features/shop/types';
import {
  ProductCard,
  CartBadgeButton,
  WishlistBadgeButton,
  WishlistModal,
  FilterModal,
  FilterSortBar,
} from '@features/shop/components';
import { AppStackParamList } from '@app/navigation/types';
import { useCartStore, useWishlistStore } from '@store';
import { createStyles } from './ShopScreen.styles';

type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

const PAGE_SIZE = 4;

export const ShopScreen: React.FC = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NavigationProp>();

  const cartTotalCount = useCartStore((state) => state.getTotalCount());
  const wishlistTotalCount = useWishlistStore((state) => state.getWishlistCount());

  // Multi-filter & Sorting State
  const [filters, setFilters] = useState<ProductFilterState>({
    categories: [],
    doshas: [],
    inStockOnly: false,
  });
  const [sortOption, setSortOption] = useState<SortOption>('featured');

  // Modals visibility
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);

  // Infinite Scroll Pagination State
  const [displayedCount, setDisplayedCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleSearchPress = () => {
    navigation.navigate(STRINGS.navigation.routes.search, undefined);
  };

  const handleProductPress = useCallback(
    (product: Product) => {
      navigation.navigate(STRINGS.navigation.routes.productDetails, { product });
    },
    [navigation]
  );

  // Filter and sort all products
  const processedProducts = useMemo(() => {
    let list = [...MOCK_PRODUCTS];

    // Filter by Categories
    if (filters.categories.length > 0) {
      list = list.filter((p) => filters.categories.includes(p.category));
    }

    // Filter by Doshas
    if (filters.doshas.length > 0) {
      list = list.filter((p) =>
        p.doshaSuitability.some((dosha) => filters.doshas.includes(dosha))
      );
    }

    // Filter by In-Stock
    if (filters.inStockOnly) {
      list = list.filter((p) => p.inStock);
    }

    // Sorting
    if (sortOption === 'price_asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price_desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [filters, sortOption]);

  // Paginated slice for infinite scrolling
  const visibleProducts = useMemo(() => {
    return processedProducts.slice(0, displayedCount);
  }, [processedProducts, displayedCount]);

  const hasMore = displayedCount < processedProducts.length;

  const handleEndReached = () => {
    if (!hasMore || isLoadingMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayedCount((prev) => Math.min(prev + PAGE_SIZE, processedProducts.length));
      setIsLoadingMore(false);
    }, 400);
  };

  const handleApplyFilters = (newFilters: ProductFilterState, newSort: SortOption) => {
    setFilters(newFilters);
    setSortOption(newSort);
    setDisplayedCount(PAGE_SIZE);
  };

  const handleResetFilters = () => {
    setFilters({ categories: [], doshas: [], inStockOnly: false });
    setSortOption('featured');
    setDisplayedCount(PAGE_SIZE);
  };

  const handleRemoveCategory = (category: ProductCategory) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== category),
    }));
  };

  const handleRemoveDosha = (dosha: string) => {
    setFilters((prev) => ({
      ...prev,
      doshas: prev.doshas.filter((d) => d !== dosha),
    }));
  };

  const handleToggleInStock = () => {
    setFilters((prev) => ({ ...prev, inStockOnly: !prev.inStockOnly }));
  };

  const renderProductItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard product={item} onPress={handleProductPress} />
    ),
    [handleProductPress]
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.titleRow}>
        <View style={styles.titleSection}>
          <Text variant="h1" color="primary">
            {STRINGS.shop.title}
          </Text>
          <Text variant="body" color="secondary" style={styles.subtitle}>
            {STRINGS.shop.subtitle}
          </Text>
        </View>

        {/* Wishlist and Cart Header Action Buttons */}
        <View style={styles.headerActions}>
          <WishlistBadgeButton
            count={wishlistTotalCount}
            onPress={() => setIsWishlistModalOpen(true)}
          />
          <CartBadgeButton
            count={cartTotalCount}
            onPress={() => navigation.navigate(STRINGS.navigation.routes.cart as any)}
          />
        </View>
      </View>

      {/* Tappable Search Bar Trigger */}
      <View style={styles.searchBarWrapper}>
        <SearchBar
          placeholder={STRINGS.shop.searchPlaceholder}
          onPress={handleSearchPress}
        />
      </View>

      {/* Multi-filter & Sort Bar */}
      <FilterSortBar
        filters={filters}
        sortOption={sortOption}
        onOpenModal={() => setIsFilterModalOpen(true)}
        onRemoveCategory={handleRemoveCategory}
        onRemoveDosha={handleRemoveDosha}
        onToggleInStock={handleToggleInStock}
      />

      {/* Formulations Section Title */}
      <View style={styles.sectionTitleRow}>
        <Text variant="h2" color="primary">
          {STRINGS.shop.featuredTitle}
        </Text>
        <Text variant="caption" color="muted">
          {processedProducts.length} items
        </Text>
      </View>
    </View>
  );

  const renderFooter = () => {
    if (processedProducts.length === 0) return null;

    return (
      <View style={styles.footerLoader}>
        {isLoadingMore ? (
          <>
            <ActivityIndicator size="small" color={theme.colors.primary} />
            <Text variant="caption" color="muted" style={styles.footerText}>
              {STRINGS.shop.pagination.loadingMore}
            </Text>
          </>
        ) : hasMore ? (
          <Button
            title={STRINGS.shop.pagination.loadMore}
            variant="ghost"
            size="small"
            onPress={handleEndReached}
          />
        ) : (
          <Text variant="caption" color="muted" style={styles.footerText}>
            {STRINGS.shop.pagination.allLoaded}
          </Text>
        )}
      </View>
    );
  };

  return (
    <Surface style={styles.container}>
      <FlashList
        data={visibleProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <EmptyState
            title={STRINGS.shop.emptySearch.title}
            description={STRINGS.shop.emptySearch.description}
            actionLabel={STRINGS.shop.filters.resetAll}
            onActionPress={handleResetFilters}
          />
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.4}
        contentContainerStyle={styles.listContent}
      />

      {/* Multi-filter & Sorting Modal */}
      <FilterModal
        visible={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        sortOption={sortOption}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        visible={isWishlistModalOpen}
        onClose={() => setIsWishlistModalOpen(false)}
        onSelectProduct={handleProductPress}
      />
    </Surface>
  );
};

export default ShopScreen;
